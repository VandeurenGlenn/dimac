#!/usr/bin/env node
/**
 * Build-time Google reviews fetcher.
 *
 * Scrapes the public Google Maps place page for reviews and writes them
 * to src/generated/reviews.json. The build (rollup.config.js) copies that
 * file to www/reviews.json.
 *
 * Caveats:
 * - Uses an undocumented Google Maps endpoint. May break when Google
 *   changes their HTML/JSON layout.
 * - GitHub Actions IPs may sporadically get rate-limited or served a
 *   consent page instead of reviews.
 *
 * Failure mode:
 * - If the fetch / parse fails, this script exits 0 WITHOUT touching the
 *   existing src/generated/reviews.json. The build then ships the most
 *   recent successful crawl (or the seed file committed to the repo).
 *
 * Configuration:
 * - DIMAC_PLACE_ID env var (Google Place ID, e.g. ChIJ...). Required.
 *   Get it via https://developers.google.com/maps/documentation/places/web-service/place-id
 */

import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_PATH = resolve(__dirname, '../src/generated/reviews.json')

const PLACE_ID = process.env.DIMAC_PLACE_ID
const MAX_REVIEWS = 12

const log = (...args) => console.log('[fetch-reviews]', ...args)
const warn = (...args) => console.warn('[fetch-reviews]', ...args)

async function readExisting() {
  if (!existsSync(OUT_PATH)) return null
  try {
    return JSON.parse(await readFile(OUT_PATH, 'utf8'))
  } catch {
    return null
  }
}

/**
 * Fetch reviews via the public reviews page Google uses for the
 * "see all reviews" view. Returns parsed array or throws.
 */
async function fetchFromGoogle(placeId) {
  const url = `https://search.google.com/local/reviews?placeid=${encodeURIComponent(placeId)}&hl=nl&sort=newestFirst`
  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
      'Accept-Language': 'nl-BE,nl;q=0.9,en;q=0.8'
    }
  })

  if (!res.ok) throw new Error(`HTTP ${res.status}`)

  const html = await res.text()

  // The reviews page embeds a large JSON blob. We extract review entries
  // by matching the documented review structure.
  // Each review chunk contains: ["reviewer name", "profile url", null, rating, ...]
  // and somewhere later: ["review text", null, [date, ms]]
  // Because the structure is nested + minified, we parse pragmatically.

  const reviews = []
  // Quick regex pass: capture reviewer name, rating, snippet, and relative date.
  // This is intentionally lenient: it should still grab something even if Google
  // tweaks adjacent fields.
  const rx =
    /\["([^"]{2,80})",\s*"https:\/\/www\.google\.com\/maps\/contrib\/[^"]+"[\s\S]{0,400}?\["(\d{1,2}(?:[\.,]\d)?)\s+(?:star|ster)[^"]*"[\s\S]{0,2000}?\["((?:[^"\\]|\\.){10,1200})"/g

  let m
  while ((m = rx.exec(html)) !== null && reviews.length < MAX_REVIEWS) {
    const [, name, ratingRaw, textRaw] = m
    const rating = Math.round(parseFloat(ratingRaw.replace(',', '.')))
    if (!rating || rating < 1 || rating > 5) continue
    const text = textRaw
      .replace(/\\n/g, '\n')
      .replace(/\\"/g, '"')
      .replace(/\\u003c/g, '<')
      .replace(/\\u003e/g, '>')
      .replace(/\\u0026/g, '&')
      .trim()
    if (text.length < 12) continue
    reviews.push({ name, rating, text })
  }

  if (reviews.length === 0) {
    throw new Error('no reviews extracted from response')
  }

  return reviews
}

async function main() {
  await mkdir(dirname(OUT_PATH), { recursive: true })

  if (!PLACE_ID) {
    warn('DIMAC_PLACE_ID env var not set — skipping crawl, keeping existing reviews.json')
    if (!existsSync(OUT_PATH)) {
      // Seed empty payload so the build always has a file to copy.
      await writeFile(
        OUT_PATH,
        JSON.stringify({ updatedAt: null, source: 'seed', reviews: [] }, null, 2)
      )
    }
    return
  }

  try {
    log('crawling reviews for place', PLACE_ID)
    const reviews = await fetchFromGoogle(PLACE_ID)
    log(`got ${reviews.length} reviews`)
    await writeFile(
      OUT_PATH,
      JSON.stringify(
        {
          updatedAt: new Date().toISOString(),
          source: 'google-maps-public',
          reviews
        },
        null,
        2
      )
    )
  } catch (err) {
    warn('crawl failed:', err.message)
    const existing = await readExisting()
    if (existing) {
      warn('keeping existing reviews.json (last update:', existing.updatedAt || 'unknown', ')')
    } else {
      warn('no existing reviews.json — writing empty seed')
      await writeFile(
        OUT_PATH,
        JSON.stringify({ updatedAt: null, source: 'seed', reviews: [] }, null, 2)
      )
    }
  }
}

main()
