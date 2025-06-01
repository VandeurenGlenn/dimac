import nodeResolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import { copyFile, mkdir, cp } from 'fs/promises'
import materialSymbols from 'rollup-plugin-material-symbols'
import { glob } from 'fs/promises'
import { cssModules } from 'rollup-plugin-css-modules'

try {
  await copyFile('src/index.html', 'www/index.html')
} catch (error) {
  await mkdir('www', { recursive: true })
  await copyFile('src/index.html', 'www/index.html')
  await copyFile('src/assets/favicon.ico', 'www/favicon.ico')
}

await cp('node_modules/@vandeurenglenn/lite-elements/exports/themes', 'www/themes', { recursive: true })
await cp('src/assets', 'www/assets', { recursive: true })
await cp('src/manifest.json', 'www/manifest.json')
const views = await Array.fromAsync(glob('src/views/*.ts'))

export default [
  {
    input: ['src/shell.ts', ...views],
    output: {
      dir: 'www',
      format: 'es'
    },

    plugins: [cssModules(), nodeResolve(), typescript(), materialSymbols({ placeholderPrefix: 'symbol' })]
  }
]
