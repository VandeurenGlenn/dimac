import nodeResolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import { copyFile, mkdir, cp, readFile, unlink, writeFile } from 'fs/promises'
import materialSymbols from 'rollup-plugin-material-symbols'
import { glob } from 'fs/promises'
import { cssModules } from 'rollup-plugin-css-modules'
import { generateSW } from 'rollup-plugin-workbox'
import { exec, execSync } from 'child_process'
import imageSize from 'image-size'
import sharp from 'sharp'
import terser from '@rollup/plugin-terser'

const isProduction = process.env.NODE_ENV === 'production'

try {
  await Promise.all((await Array.fromAsync(glob('www/**/*'))).map((file) => unlink(file)))
  await mkdir('www', { recursive: true })
} catch (error) {
  await mkdir('www', { recursive: true })
}

const assets = await Array.fromAsync(glob('src/assets/**/*.{png,jpg,heic,JPG,HEIC}'))

const existingAssets = await Array.fromAsync(glob('src/assets/**/*.{png,jpg,heic,JPG,HEIC}'))
const target_width = 1200
await Promise.all(
  assets.map(async (asset) => {
    const buffer = await readFile(asset)
    const size = await imageSize(buffer)
    if (!size || !size.width || !size.height) {
      console.warn(`Skipping asset ${asset} due to missing dimensions`)
      return null
    }
    if (size.width < target_width) {
      console.warn(`Skipping asset ${asset} due to width < ${target_width}`)
      return null
    }
    if (size.height <= 0 || size.width <= 0) {
      console.warn(`Skipping asset ${asset} due to invalid dimensions: ${size.width}x${size.height}`)
      return null
    }
    console.log(`Processing asset ${asset} with size ${size.width}x${size.height}`)
    // Calculate target size maintaining aspect ratio
    const target = { width: target_width, height: Math.round((size.height / size.width) * target_width) }
    const mobileTarget = { width: 600, height: Math.round((size.height / size.width) * 600) }
    const tabletTarget = { width: 960, height: Math.round((size.height / size.width) * 960) }
    const info = execSync(`exiftool ${asset}`).toString()

    for (const string of info.split('\n')) {
      if (string.includes('Orientation')) {
        const orientation = string.split(':')[1].trim()
        console.log(`Found EXIF orientation in ${asset}: ${orientation}`)
      }
    }

    await sharp(buffer)
      .resize({ width: target.width })
      .keepExif()
      .withMetadata()
      .rotate() // Automatically rotate based on EXIF orientation
      .webp({ quality: 100, effort: 6 })
      .toFile(asset.replace(`.${asset.split('.').pop()}`, `_${target.width}x${target.height}.webp`))

    await sharp(buffer)
      .resize({ width: mobileTarget.width })
      .keepExif()
      .withMetadata()
      .rotate() // Automatically rotate based on EXIF orientation
      .webp({ quality: 100, effort: 6 })
      .toFile(asset.replace(`.${asset.split('.').pop()}`, `_${mobileTarget.width}x${mobileTarget.height}.webp`))

    await sharp(buffer)
      .resize({ width: tabletTarget.width })
      .keepExif()
      .withMetadata()
      .rotate() // Automatically rotate based on EXIF orientation
      .webp({ quality: 100, effort: 6 })
      .toFile(asset.replace(`.${asset.split('.').pop()}`, `_${tabletTarget.width}x${tabletTarget.height}.webp`))

    console.log(`Processed asset ${asset} to ${target.width}x${target.height}`)
    // Return the asset with its size and target dimensions
    await unlink(asset) // Remove original asset after processing
    return { asset, sizes: { size, target } }
  })
)

const indexHTML = await readFile('src/index.html', 'utf8')

if (isProduction) {
  const serviceWorkerScript = `<script>
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('./service-worker.js')
        })
      }
    </script>`
  indexHTML.replace('</head>', `${serviceWorkerScript}\n</head>`)
}

try {
  await writeFile('www/index.html', indexHTML)
} catch (error) {
  await mkdir('www', { recursive: true })
  await writeFile('www/index.html', indexHTML)
}

await copyFile('src/assets/favicon.ico', 'www/favicon.ico')
await cp('node_modules/@vandeurenglenn/lite-elements/exports/themes', 'www/themes', { recursive: true })
await cp('src/assets', 'www/assets', { recursive: true })
await cp('src/manifest.json', 'www/manifest.json')

const buildAssets = await Array.fromAsync(glob('www/assets/**/*.webp'))

const realizationsManifest = {}

for (const asset of buildAssets) {
  const parts = asset.split('/')
  console.log({ parts })
  if (parts.length < 4) continue // Skip if not in the expected format
  const filename = parts[parts.length - 1]
  const target = parts[parts.length - 2]
  const targetPath = `./assets/${target}/${filename}`

  realizationsManifest[target] = realizationsManifest[target] || []
  realizationsManifest[target].push(targetPath)
}

await writeFile('www/realizations-manifest.json', JSON.stringify(realizationsManifest, null, 2))

const views = await Array.fromAsync(glob('src/views/*.ts'))

const plugins = [cssModules(), nodeResolve(), typescript(), materialSymbols({ placeholderPrefix: 'symbol' })]

if (isProduction) {
  plugins.push([
    generateSW({
      swDest: 'www/service-worker.js',
      globDirectory: 'www',
      globPatterns: ['**/*.{html,js,css,svg,png,jpg}']
    }),
    terser()
  ])
}

export default [
  {
    input: ['src/shell.ts', ...views],
    output: {
      dir: 'www',
      format: 'es'
    },

    plugins
  }
]
