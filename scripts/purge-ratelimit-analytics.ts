/**
 * Purge the rate limiters' analytics records from Upstash (MAINT 5.28)
 *
 * Until 5.28 every limiter in lib/rate-limit.ts was built with `analytics: true`, which wrote an
 * entry for each request, with the account ID or IP address in it, to a sorted set named
 * `ratelimit:<limiter>:events:<hour in ms>` that never expires. Nothing reads them. 5.28 turns the
 * flag off; this deletes what is already there.
 *
 *   (no option)   Dry run. Lists, per limiter, how many sets there are, how many identifiers they
 *                 hold and the oldest and newest hour. It prints no identifier and deletes nothing.
 *   --apply       Deletes those sets (UNLINK, in batches of 100), then scans again and repeats until
 *                 none are left, and prints how many rounds that took.
 *
 * It lists every key's name (never a value) and compares that with DBSIZE; a warning means the
 * scan stopped early. Only keys named exactly `ratelimit:<letters>:events:<13 digits>` that are
 * sorted sets are touched. The live counters, `programs:all:v3`, and the match cache are never read
 * for their contents or deleted. Deleting is permanent: read the dry run first.
 *
 * Reads UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN from .env, which is the production
 * database. Run with:
 *   npx tsx scripts/purge-ratelimit-analytics.ts
 *   npx tsx scripts/purge-ratelimit-analytics.ts --apply
 */

import 'dotenv/config'
import { Redis } from '@upstash/redis'
import {
  formatReport,
  purgeRateLimitAnalytics,
  scanAllKeys,
  type PurgeOps
} from './lib/ratelimit-purge'

function opsFor(redis: Redis): PurgeOps {
  return {
    scan: () => scanAllKeys((cursor) => redis.scan(cursor, { count: 1000 })),
    dbsize: () => redis.dbsize(),
    async types(keys) {
      const pipeline = redis.pipeline()
      for (const key of keys) pipeline.type(key)
      return (await pipeline.exec()) as string[]
    },
    async sizes(keys) {
      const pipeline = redis.pipeline()
      for (const key of keys) pipeline.zcard(key)
      return (await pipeline.exec()) as number[]
    },
    async unlink(keys) {
      if (keys.length > 0) await redis.unlink(...keys)
    }
  }
}

async function main() {
  const apply = process.argv.includes('--apply')
  const unknown = process.argv.slice(2).filter((arg) => arg !== '--apply')
  if (unknown.length > 0) {
    console.error(`Unknown option: ${unknown.join(' ')}. The only option is --apply.`)
    process.exit(1)
  }
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    console.error('UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are not set (.env).')
    process.exit(1)
  }

  const report = await purgeRateLimitAnalytics(opsFor(Redis.fromEnv()), apply)
  console.log(formatReport(report))
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
