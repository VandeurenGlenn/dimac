#!/usr/bin/env node
/**
 * Build-time Google reviews fetcher using the official Places API (New).
 *
 * Reads GOOGLE_PLACES_API_KEY and DIMAC_PLACE_ID from env, fetches up to
 * 5 most recent reviews (Google's API max), and writes them to
 * src/generated/reviews.json. The rollup build copies that to www/.
 *
 * On any failure (missing env, network, quota), the existing reviews.json
 * is preserved and the script exits 0 so the build still ships.
 *
 * Setup:
 *   1. Enable "Places API (New)" in your Google Cloud project.
 *   2. Create an API key (restrict it to the Places API).
 *   3. Find your business Place ID via:
 *        https://developers.google.com/maps/documentation/places/web-service/place-id
 *   4. Add GitHub secrets GOOGLE_PLACES_API_KEY and DIMAC_PLACE_ID.
 */

import { readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_PATH = resolve(__dirname, '../src/generated/reviews.json')

const API_KEY = process.env.GOOGLE_PLACES_API_KEY
const PLACE_ID = process.env.DIMAC_PLACE_ID

const log = (...args) => console.log('[fetch-reviews]', ...args)
const warn = (...args) => console.warn('[fetch-reviews]', ...args)

async function preserveExisting(reason) {
  warn(reason, '— preserving existing reviews.json')
  if (!existsSync(OUT_PATH)) {
    await writeFile(
      OUT_PATH,
      JSON.stringify({ updatedAt: null, source: 'seed', reviews: [] }, null, 2)
    )
  }
  process.exit(0)
}

if (!API_KEY) await preserveExisting('GOOGLE_PLACES_API_KEY not set')
if (!PLACE_ID) await preserveExisting('DIMAC_PLACE_ID not set')

const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(PLACE_ID)}?languageCode=nl&regionCode=BE`

let res
try {
  res = await fetch(url, {
    headers: {
      'X-Goog-Api-Key': API_KEY,
      'X-Goog-FieldMask': 'id,displayName,rating,userRatingCount,reviews'
    }
  })
} catch (err) {
  await preserveExisting(`Network error: ${err.message}`)
}

if (!res.ok) {
  const body = await res.text().catch(() => '')
  await preserveExisting(`HTTP ${res.status}: ${body.slice(0, 300)}`)
}

const data = await res.json()
const reviews = (data.reviews || [])
  .map((r) => ({
    name: r.authorAttribution?.displayName || 'Anoniem',
    photo: r.authorAttribution?.photoUri || null,
    rating: r.rating ?? null,
    text: r.originalText?.text || r.text?.text || '',
    relativeTime: r.relativePublishTimeDescription || null,
    publishTime: r.publishTime || null
  }))
  .filter((r) => r.text)

if (!reviews.length) {
  await preserveExisting('Places API returned no reviews')
}

const out = {
  updatedAt: new Date().toISOString(),
  source: 'google-places-api',
  placeName: data.displayName?.text || null,
  rating: data.rating ?? null,
  ratingCount: data.userRatingCount ?? null,
  reviews
}

await writeFile(OUT_PATH, JSON.stringify(out, null, 2))
log(`Wrote ${reviews.length} reviews (avg ${out.rating} from ${out.ratingCount}).`)
