import { describe, expect, it, vi } from 'vitest'
import {
  formatReport,
  MAX_ROUNDS,
  parseEventsKey,
  purgeRateLimitAnalytics,
  scanAllKeys,
  type PurgeOps
} from './ratelimit-purge'

const HOUR_1 = 1_788_084_000_000
const HOUR_2 = HOUR_1 + 3_600_000

type Entry = { type: string; size?: number }

/**
 * A fake Redis: key -> type and member count. `pageLimit` makes `scan` list only the first N keys by
 * name, as the real one did on production (500 of them each time); `keepsKeys` makes `unlink` do
 * nothing, as if the delete were refused.
 */
function fakeOps(
  keys: Record<string, Entry>,
  { pageLimit, keepsKeys = false }: { pageLimit?: number; keepsKeys?: boolean } = {}
) {
  const live = new Map(Object.entries(keys))
  const unlink = vi.fn(async (batch: string[]) => {
    if (!keepsKeys) for (const key of batch) live.delete(key)
  })
  const scan = vi.fn(async () => {
    const names = [...live.keys()].sort()
    return pageLimit === undefined ? names : names.slice(0, pageLimit)
  })
  const ops: PurgeOps = {
    scan,
    dbsize: async () => live.size,
    types: async (batch) => batch.map((key) => live.get(key)?.type ?? 'none'),
    sizes: async (batch) => batch.map((key) => live.get(key)?.size ?? 0),
    unlink
  }
  return { ops, unlink, scan, live }
}

function eventSets(count: number, limiter = 'api'): Record<string, Entry> {
  const sets: Record<string, Entry> = {}
  for (let i = 0; i < count; i++) {
    sets[`ratelimit:${limiter}:events:${HOUR_1 + i * 3_600_000}`] = { type: 'zset', size: 1 }
  }
  return sets
}

describe('parseEventsKey', () => {
  it('reads the limiter and the hour from an analytics key', () => {
    expect(parseEventsKey(`ratelimit:api:events:${HOUR_1}`)).toEqual({
      limiter: 'api',
      hour: HOUR_1
    })
  })

  it.each([
    'ratelimit:api:1788084000000', // a live counter
    'ratelimit:api:events:abc',
    'ratelimit:api:events:178808400000', // 12 digits
    'ratelimit:api:events:1788084000000:extra',
    'ratelimit:Api:events:1788084000000',
    'xratelimit:api:events:1788084000000',
    'programs:all:v3',
    'matches:events:1788084000000'
  ])('ignores %s', (key) => {
    expect(parseEventsKey(key)).toBeNull()
  })
})

describe('purgeRateLimitAnalytics', () => {
  const keys = {
    [`ratelimit:api:events:${HOUR_1}`]: { type: 'zset', size: 40 },
    [`ratelimit:api:events:${HOUR_2}`]: { type: 'zset', size: 2 },
    [`ratelimit:auth:events:${HOUR_1}`]: { type: 'zset', size: 7 },
    [`ratelimit:api:${HOUR_1}`]: { type: 'string' },
    [`ratelimit:auth:${HOUR_2}`]: { type: 'string' },
    'ratelimit:search:events:1788084000000x': { type: 'zset', size: 99 },
    'programs:all:v3': { type: 'string' }
  }

  it('reports per limiter and deletes nothing in a dry run', async () => {
    const { ops, unlink, live } = fakeOps(keys)

    const report = await purgeRateLimitAnalytics(ops, false)

    expect(unlink).not.toHaveBeenCalled()
    expect(live.size).toBe(7)
    expect(report.applied).toBe(false)
    expect(report.byLimiter).toEqual({
      api: { keys: 2, entries: 42, oldest: HOUR_1, newest: HOUR_2 },
      auth: { keys: 1, entries: 7, oldest: HOUR_1, newest: HOUR_1 }
    })
    expect(report.liveCounters).toBe(3)
    expect(report.deleted).toBe(0)
    expect(report.rounds).toBe(1)
    expect(report.remaining).toBeNull()
    expect(report.scanLooksIncomplete).toBe(false)
  })

  it('with apply, deletes the analytics sets and nothing else', async () => {
    const { ops, unlink, live } = fakeOps(keys)

    const report = await purgeRateLimitAnalytics(ops, true)

    expect(report.deleted).toBe(3)
    expect(report.remaining).toBe(0)
    expect([...live.keys()].sort()).toEqual(
      [
        `ratelimit:api:${HOUR_1}`,
        `ratelimit:auth:${HOUR_2}`,
        'ratelimit:search:events:1788084000000x',
        'programs:all:v3'
      ].sort()
    )
    expect(unlink.mock.calls.flat(2)).not.toContain(`ratelimit:api:${HOUR_1}`)
    expect(unlink.mock.calls.flat(2)).not.toContain('programs:all:v3')
  })

  it('never deletes an event-named key that is not a sorted set, and lists it', async () => {
    const { ops, live } = fakeOps({
      [`ratelimit:api:events:${HOUR_1}`]: { type: 'string' },
      [`ratelimit:auth:events:${HOUR_1}`]: { type: 'zset', size: 1 }
    })

    const report = await purgeRateLimitAnalytics(ops, true)

    expect(report.notSortedSets).toEqual([`ratelimit:api:events:${HOUR_1}`])
    expect(live.has(`ratelimit:api:events:${HOUR_1}`)).toBe(true)
    expect(live.has(`ratelimit:auth:events:${HOUR_1}`)).toBe(false)
  })

  it('deletes in batches of 100', async () => {
    const { ops, unlink } = fakeOps(eventSets(250))

    const report = await purgeRateLimitAnalytics(ops, true)

    expect(unlink.mock.calls.map(([batch]) => batch.length)).toEqual([100, 100, 50])
    expect(report.deleted).toBe(250)
    expect(report.remaining).toBe(0)
  })

  it('does nothing when there is nothing to purge', async () => {
    const { ops, unlink } = fakeOps({ [`ratelimit:api:${HOUR_1}`]: { type: 'string' } })

    const report = await purgeRateLimitAnalytics(ops, true)

    expect(unlink).not.toHaveBeenCalled()
    expect(report.deleted).toBe(0)
    expect(report.byLimiter).toEqual({})
    expect(report.remaining).toBe(0)
  })

  // Production, 23 October 2026: every run listed exactly 500 sets, deleted them, and the next run
  // found 500 more. A scan that stops early must not stop the purge.
  describe('when a scan lists only a page of the keys', () => {
    it('repeats scan and delete until none are left', async () => {
      const { ops, live, scan } = fakeOps(
        { ...eventSets(1250), 'programs:all:v3': { type: 'string' } },
        { pageLimit: 500 }
      )

      const report = await purgeRateLimitAnalytics(ops, true)

      expect(report.deleted).toBe(1250)
      expect(report.rounds).toBe(4) // 500, 500, 250, then a scan that finds none
      expect(scan).toHaveBeenCalledTimes(4)
      expect(report.remaining).toBe(0)
      expect([...live.keys()]).toEqual(['programs:all:v3'])
    })

    it('adds up the counts over every round', async () => {
      const { ops } = fakeOps(
        { ...eventSets(700, 'api'), ...eventSets(300, 'search') },
        { pageLimit: 500 }
      )

      const report = await purgeRateLimitAnalytics(ops, true)

      expect(report.byLimiter.api.keys + report.byLimiter.search.keys).toBe(1000)
      expect(report.byLimiter.api.keys).toBe(700)
      expect(report.byLimiter.search.keys).toBe(300)
    })

    it('warns in a dry run that the counts may be low', async () => {
      const { ops, unlink } = fakeOps(
        { ...eventSets(1250), 'programs:all:v3': { type: 'string' } },
        { pageLimit: 500 }
      )

      const report = await purgeRateLimitAnalytics(ops, false)

      expect(unlink).not.toHaveBeenCalled()
      expect(report.scannedKeys).toBe(500)
      expect(report.databaseKeys).toBe(1251)
      expect(report.scanLooksIncomplete).toBe(true)
      expect(formatReport(report)).toContain('WARNING: the scan listed fewer keys')
      expect(formatReport(report)).toContain('repeats until none are left')
    })
  })

  it('does not warn when a few keys expire between the scan and the count', async () => {
    const { ops } = fakeOps(eventSets(100))
    const real = ops.dbsize
    ops.dbsize = async () => (await real()) + 3

    expect((await purgeRateLimitAnalytics(ops, false)).scanLooksIncomplete).toBe(false)
  })

  it('stops with an error if deleted sets are still listed, rather than looping', async () => {
    const { ops, unlink } = fakeOps(eventSets(5), { keepsKeys: true })

    await expect(purgeRateLimitAnalytics(ops, true)).rejects.toThrow(/still listed/)
    expect(unlink).toHaveBeenCalledTimes(1)
  })

  it('stops at the round limit and says so', async () => {
    let n = 0
    const ops: PurgeOps = {
      // a new set every round, so there is always something left
      scan: async () => [`ratelimit:api:events:${HOUR_1 + n++ * 3_600_000}`],
      dbsize: async () => 1,
      types: async (batch) => batch.map(() => 'zset'),
      sizes: async (batch) => batch.map(() => 1),
      unlink: async () => {}
    }

    const report = await purgeRateLimitAnalytics(ops, true)

    expect(report.rounds).toBe(MAX_ROUNDS)
    expect(report.stoppedAtLimit).toBe(true)
    expect(formatReport(report)).toContain('run it again')
  })
})

describe('formatReport', () => {
  it('prints counts and hours, labels a dry run, and points at --apply', async () => {
    const { ops } = fakeOps({
      [`ratelimit:api:events:${HOUR_1}`]: { type: 'zset', size: 40 },
      [`ratelimit:api:${HOUR_1}`]: { type: 'string' }
    })

    const text = formatReport(await purgeRateLimitAnalytics(ops, false))

    expect(text).toContain('DRY RUN: nothing was deleted')
    expect(text).toMatch(/api\s+1\s+40\s+2026-/)
    expect(text).toContain('Live counters, left alone: 1')
    expect(text).toContain('Keys in the database: 2. Listed by the first scan: 2')
    expect(text).toContain('run again with --apply')
    expect(text).not.toContain('WARNING')
  })

  it('says so when there are no records, and does not suggest --apply', async () => {
    const { ops } = fakeOps({})

    const text = formatReport(await purgeRateLimitAnalytics(ops, false))

    expect(text).toContain('No analytics records found')
    expect(text).not.toContain('--apply')
  })

  it('after applying, reports what was deleted, in how many rounds, and what is left', async () => {
    const { ops } = fakeOps({ [`ratelimit:api:events:${HOUR_1}`]: { type: 'zset', size: 3 } })

    const text = formatReport(await purgeRateLimitAnalytics(ops, true))

    expect(text).toContain('APPLIED')
    expect(text).toContain('Deleted: 1 sets, in 2 round(s)')
    expect(text).toContain('Event sets remaining: 0')
  })
})

describe('scanAllKeys', () => {
  it('passes each cursor back exactly as it came, even above 2^53', async () => {
    const big = '9223372036854775807' // Number() would turn this into 9223372036854776000
    const pages: Record<string, [string, string[]]> = {
      '0': [big, ['a', 'b']],
      [big]: ['18446744073709551615', ['c']],
      '18446744073709551615': ['0', ['d']]
    }
    const asked: string[] = []

    const keys = await scanAllKeys(async (cursor) => {
      asked.push(cursor)
      const page = pages[cursor]
      if (!page) throw new Error(`unknown cursor ${cursor}`)
      return page
    })

    expect(keys).toEqual(['a', 'b', 'c', 'd'])
    expect(asked).toEqual(['0', big, '18446744073709551615'])
  })

  it('accepts a numeric cursor from the client', async () => {
    const pages: Record<string, [number, string[]]> = { '0': [7, ['a']], '7': [0, ['b']] }

    expect(await scanAllKeys(async (cursor) => pages[cursor])).toEqual(['a', 'b'])
  })

  it('stops if the server hands back a cursor it already gave', async () => {
    const scanPage = vi.fn(async (): Promise<[string, string[]]> => ['5', ['a']])

    expect(await scanAllKeys(scanPage)).toEqual(['a', 'a'])
    expect(scanPage).toHaveBeenCalledTimes(2)
  })
})
