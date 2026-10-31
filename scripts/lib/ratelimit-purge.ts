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
  /** Every key in the database, by name only */
  scan(): Promise<string[]>
  /** The number of keys the database says it holds (DBSIZE), to check that `scan` listed them all */
  dbsize(): Promise<number>
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
  /** The live counters (`ratelimit:` keys that are not analytics), left alone */
  liveCounters: number
  /** Over every round when applying, so a scan that stops early still adds up */
  byLimiter: Record<string, LimiterSummary>
  /** Event-named keys that are not sorted sets: never deleted, listed by name */
  notSortedSets: string[]
  deleted: number
  /** Scan, delete, scan again: how many times the script did that */
  rounds: number
  /** After applying: event-named keys still there (new ones if analytics are still on somewhere) */
  remaining: number | null
  /** What the first scan listed, and what the database says it holds */
  scannedKeys: number
  databaseKeys: number
  /** The first scan listed clearly fewer keys than the database holds */
  scanLooksIncomplete: boolean
  /** Applying hit MAX_ROUNDS with sets still left: run it again */
  stoppedAtLimit: boolean
}

const BATCH = 100

/** A round is one scan and one delete. A scan that lists only a page needs one round per page */
export const MAX_ROUNDS = 200

function chunks<T>(items: T[], size: number): T[][] {
  const out: T[][] = []
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size))
  return out
}

/**
 * Every key name, page by page. The cursor is passed back exactly as it came: Number() rounds one
 * above 2^53, and a wrong cursor ends the scan early (on production the first version listed only
 * the first 500 keys each time). A cursor seen twice ends the loop rather than spinning.
 */
export async function scanAllKeys(
  scanPage: (cursor: string) => Promise<[string | number, string[]]>
): Promise<string[]> {
  const keys: string[] = []
  const seen = new Set<string>()
  let cursor = '0'
  do {
    const [next, page] = await scanPage(cursor)
    keys.push(...page)
    cursor = String(next)
    if (seen.has(cursor)) break
    seen.add(cursor)
  } while (cursor !== '0')
  return keys
}

/** Fewer keys listed than the database holds, beyond what keys expiring during the scan explains */
function looksIncomplete(scanned: number, total: number): boolean {
  return scanned < total - Math.max(25, total * 0.05)
}

export async function purgeRateLimitAnalytics(ops: PurgeOps, apply: boolean): Promise<PurgeReport> {
  const byLimiter: Record<string, LimiterSummary> = {}
  const notSortedSets = new Set<string>()
  const deletedKeys = new Set<string>()
  let liveCounters = 0
  let scannedKeys = 0
  let databaseKeys = 0
  let deleted = 0
  let rounds = 0
  let remaining: number | null = null
  let stoppedAtLimit = false

  for (;;) {
    rounds += 1
    const all = await ops.scan()
    const eventKeys = all.filter((key) => parseEventsKey(key) !== null)
    if (rounds === 1) {
      scannedKeys = all.length
      databaseKeys = await ops.dbsize()
      liveCounters = all.filter(
        (key) => key.startsWith('ratelimit:') && parseEventsKey(key) === null
      ).length
    }

    const types: string[] = []
    for (const batch of chunks(eventKeys, BATCH)) types.push(...(await ops.types(batch)))
    const sortedSets = eventKeys.filter((_, i) => types[i] === 'zset')
    eventKeys.filter((_, i) => types[i] !== 'zset').forEach((key) => notSortedSets.add(key))

    if (sortedSets.some((key) => deletedKeys.has(key))) {
      throw new Error(
        'Sets that were just deleted are still listed. Stopping; nothing more was changed.'
      )
    }

    const sizes: number[] = []
    for (const batch of chunks(sortedSets, BATCH)) sizes.push(...(await ops.sizes(batch)))
    sortedSets.forEach((key, i) => {
      const { limiter, hour } = parseEventsKey(key)!
      const summary = (byLimiter[limiter] ??= { keys: 0, entries: 0, oldest: hour, newest: hour })
      summary.keys += 1
      summary.entries += sizes[i] ?? 0
      summary.oldest = Math.min(summary.oldest, hour)
      summary.newest = Math.max(summary.newest, hour)
    })

    if (!apply) break
    if (sortedSets.length === 0) {
      remaining = eventKeys.length
      break
    }
    for (const batch of chunks(sortedSets, BATCH)) {
      await ops.unlink(batch)
      batch.forEach((key) => deletedKeys.add(key))
      deleted += batch.length
    }
    if (rounds >= MAX_ROUNDS) {
      stoppedAtLimit = true
      break
    }
  }

  return {
    applied: apply,
    liveCounters,
    byLimiter,
    notSortedSets: [...notSortedSets],
    deleted,
    rounds,
    remaining,
    scannedKeys,
    databaseKeys,
    scanLooksIncomplete: looksIncomplete(scannedKeys, databaseKeys),
    stoppedAtLimit
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
  lines.push(
    `Keys in the database: ${report.databaseKeys}. Listed by the first scan: ${report.scannedKeys}`
  )
  if (report.scanLooksIncomplete) {
    lines.push(
      'WARNING: the scan listed fewer keys than the database holds, so the counts above may be low.' +
        (report.applied ? '' : ' With --apply the script repeats until none are left.')
    )
  }
  if (report.notSortedSets.length > 0) {
    lines.push(
      `Event-named keys that are not sorted sets, never deleted: ${report.notSortedSets.length}`
    )
    for (const key of report.notSortedSets) lines.push(`  ${key}`)
  }
  if (report.applied) {
    lines.push(`Deleted: ${report.deleted} sets, in ${report.rounds} round(s)`)
    if (report.stoppedAtLimit) {
      lines.push(`Stopped after ${MAX_ROUNDS} rounds with sets still left: run it again.`)
    } else {
      lines.push(`Event sets remaining: ${report.remaining}`)
    }
  } else if (totalKeys > 0) {
    lines.push('')
    lines.push('To delete these, run again with --apply.')
  }
  return lines.join('\n')
}
