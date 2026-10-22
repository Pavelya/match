/**
 * Algolia search requests against the free plan (MAINT_tasks.md 5.27, step 4): this calendar
 * month, the last 30 days, and the month's pace to its end. Run it each week after release; at
 * about 8,000 on pace, keep Best fit's list on the server first, then EXPLORE_BEST_FIT=lifted.
 *
 *   npx tsx scripts/algolia-usage.ts
 *
 * Read-only: one request to Algolia's usage API with the admin key from `.env`. No database,
 * no write. The `/1/` path is the one that answers; `/2/` gives 404.
 */
import 'dotenv/config'
import { summarise, usageReport, usageUrl, windowStart, type UsagePoint } from './lib/algolia-usage'

async function main() {
  const appId = process.env.ALGOLIA_APP_ID
  const apiKey = process.env.ALGOLIA_ADMIN_API_KEY
  if (!appId || !apiKey) {
    console.error('Missing ALGOLIA_APP_ID or ALGOLIA_ADMIN_API_KEY in .env')
    process.exit(1)
  }

  const now = new Date()
  const response = await fetch(usageUrl(windowStart(now), now), {
    headers: { 'X-Algolia-Application-Id': appId, 'X-Algolia-API-Key': apiKey }
  })
  if (!response.ok) {
    console.error(`The usage API answered ${response.status}: ${await response.text()}`)
    process.exit(1)
  }
  const body = (await response.json()) as { total_search_requests?: UsagePoint[] }

  console.log('Algolia search requests')
  for (const line of usageReport(summarise(body.total_search_requests ?? [], now))) {
    console.log(line)
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
