/**
 * The core of scripts/purge-ratelimit-analytics.ts (MAINT 5.28), with the Redis calls passed in, so
 * the rules are tested without a Redis.
 *
 * `analytics: true` made the rate limiters write one sorted set per limiter per hour, named
 * `ratelimit:<limiter>:events:<hour in ms>`, holding `{"identifier": <account ID or IP address>,
 * "success": …}` with no expiry. This finds exactly those sets and, only when asked, deletes them.
 * It never reports an identifier, and it leaves the live counters (`ratelimit:<limiter>:…` without
 * `events`) alone.
 */

/** `ratelimit:api:events:1788084000000`: a limiter's name and the hour (ms) the set covers */
const EVENTS_KEY = /^ratelimit:([a-z]+):events:(\d{13})$/

export function parseEventsKey(key: string): { limiter: string; hour: number } | null {
  const match = EVENTS_KEY.exec(key)
  return match ? { limiter: match[1], hour: Number(match[2]) } : null
}

export interface PurgeOps {
  /** Every key that starts `ratelimit:` */
  scan(): Promise<string[]>
  /** Each key's Redis type, in the order given */
  types(keys: string[]): Promise<string[]>
  /** The number of members of each sorted set, in the order given */
  sizes(keys: string[]): Promise<number[]>
  /** Delete without blocking (UNLINK) */
  unlink(keys: string[]): Promise<void>
}

export interface LimiterSummary {
  keys: number
  /** Members: how many identifiers were recorded across the hours, not how many requests */
  entries: number
  oldest: number
  newest: number
}

export interface PurgeReport {
  applied: boolean
  /** The live counters, left alone */
  liveCounters: number
  byLimiter: Record<string, LimiterSummary>
  /** Event-named keys that are not sorted sets: never deleted, listed by name */
  notSortedSets: string[]
  deleted: number
  /** After applying: event sets still there (new ones if analytics are still on somewhere) */
  remaining: number | null
}

const BATCH = 100

function chunks<T>(items: T[], size: number): T[][] {
  const out: T[][] = []
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size))
  return out
}

export async function purgeRateLimitAnalytics(ops: PurgeOps, apply: boolean): Promise<PurgeReport> {
  const all = await ops.scan()
  const eventKeys = all.filter((key) => parseEventsKey(key) !== null)

  const types: string[] = []
  for (const batch of chunks(eventKeys, BATCH)) types.push(...(await ops.types(batch)))
  const sortedSets = eventKeys.filter((_, i) => types[i] === 'zset')
  const notSortedSets = eventKeys.filter((_, i) => types[i] !== 'zset')

  const sizes: number[] = []
  for (const batch of chunks(sortedSets, BATCH)) sizes.push(...(await ops.sizes(batch)))

  const byLimiter: Record<string, LimiterSummary> = {}
  sortedSets.forEach((key, i) => {
    const { limiter, hour } = parseEventsKey(key)!
    const summary = (byLimiter[limiter] ??= { keys: 0, entries: 0, oldest: hour, newest: hour })
    summary.keys += 1
    summary.entries += sizes[i] ?? 0
    summary.oldest = Math.min(summary.oldest, hour)
    summary.newest = Math.max(summary.newest, hour)
  })

  let deleted = 0
  let remaining: number | null = null
  if (apply) {
    for (const batch of chunks(sortedSets, BATCH)) {
      await ops.unlink(batch)
      deleted += batch.length
    }
    remaining = (await ops.scan()).filter((key) => parseEventsKey(key) !== null).length
  }

  return {
    applied: apply,
    liveCounters: all.length - eventKeys.length,
    byLimiter,
    notSortedSets,
    deleted,
    remaining
  }
}

function day(ms: number): string {
  return new Date(ms).toISOString().slice(0, 13).replace('T', ' ') + ':00 UTC'
}

/** What the script prints. Counts and hours only, never an identifier */
export function formatReport(report: PurgeReport): string {
  const lines: string[] = []
  const limiters = Object.keys(report.byLimiter).sort()
  const totalKeys = limiters.reduce((sum, name) => sum + report.byLimiter[name].keys, 0)
  const totalEntries = limiters.reduce((sum, name) => sum + report.byLimiter[name].entries, 0)

  lines.push(report.applied ? 'APPLIED' : 'DRY RUN: nothing was deleted')
  lines.push('')
  if (limiters.length === 0) {
    lines.push('No analytics records found (ratelimit:<limiter>:events:<hour>).')
  } else {
    lines.push('limiter    sets   identifiers   oldest hour            newest hour')
    for (const name of limiters) {
      const s = report.byLimiter[name]
      lines.push(
        `${name.padEnd(10)} ${String(s.keys).padStart(5)} ${String(s.entries).padStart(13)}   ${day(s.oldest)}   ${day(s.newest)}`
      )
    }
    lines.push(
      `${'total'.padEnd(10)} ${String(totalKeys).padStart(5)} ${String(totalEntries).padStart(13)}`
    )
  }
  lines.push('')
  lines.push(`Live counters, left alone: ${report.liveCounters}`)
  if (report.notSortedSets.length > 0) {
    lines.push(
      `Event-named keys that are not sorted sets, never deleted: ${report.notSortedSets.length}`
    )
    for (const key of report.notSortedSets) lines.push(`  ${key}`)
  }
  if (report.applied) {
    lines.push(`Deleted: ${report.deleted} sets`)
    lines.push(`Event sets remaining: ${report.remaining}`)
  } else if (totalKeys > 0) {
    lines.push('')
    lines.push('To delete these, run again with --apply.')
  }
  return lines.join('\n')
}
