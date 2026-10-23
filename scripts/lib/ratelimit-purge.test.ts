import { describe, expect, it, vi } from 'vitest'
import {
  formatReport,
  parseEventsKey,
  purgeRateLimitAnalytics,
  type PurgeOps
} from './ratelimit-purge'

const HOUR_1 = 1_788_084_000_000
const HOUR_2 = HOUR_1 + 3_600_000

/** A fake Redis: key -> type and member count. Anything not a zset is reported as 'string' */
function fakeOps(keys: Record<string, { type: string; size?: number }>) {
  const live = new Map(Object.entries(keys))
  const unlink = vi.fn(async (batch: string[]) => {
    for (const key of batch) live.delete(key)
  })
  const ops: PurgeOps = {
    scan: async () => [...live.keys()],
    types: async (batch) => batch.map((key) => live.get(key)?.type ?? 'none'),
    sizes: async (batch) => batch.map((key) => live.get(key)?.size ?? 0),
    unlink
  }
  return { ops, unlink, live }
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
    'ratelimit:search:events:1788084000000x': { type: 'zset', size: 99 }
  }

  it('reports per limiter and deletes nothing in a dry run', async () => {
    const { ops, unlink, live } = fakeOps(keys)

    const report = await purgeRateLimitAnalytics(ops, false)

    expect(unlink).not.toHaveBeenCalled()
    expect(live.size).toBe(6)
    expect(report.applied).toBe(false)
    expect(report.byLimiter).toEqual({
      api: { keys: 2, entries: 42, oldest: HOUR_1, newest: HOUR_2 },
      auth: { keys: 1, entries: 7, oldest: HOUR_1, newest: HOUR_1 }
    })
    expect(report.liveCounters).toBe(3)
    expect(report.deleted).toBe(0)
    expect(report.remaining).toBeNull()
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
        'ratelimit:search:events:1788084000000x'
      ].sort()
    )
    expect(unlink.mock.calls.flat(2)).not.toContain(`ratelimit:api:${HOUR_1}`)
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
    const many: Record<string, { type: string; size: number }> = {}
    for (let i = 0; i < 250; i++)
      many[`ratelimit:api:events:${HOUR_1 + i * 3_600_000}`] = { type: 'zset', size: 1 }
    const { ops, unlink } = fakeOps(many)

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
    expect(text).toContain('run again with --apply')
  })

  it('says so when there are no records, and does not suggest --apply', async () => {
    const { ops } = fakeOps({})

    const text = formatReport(await purgeRateLimitAnalytics(ops, false))

    expect(text).toContain('No analytics records found')
    expect(text).not.toContain('--apply')
  })

  it('after applying, reports what was deleted and what is left', async () => {
    const { ops } = fakeOps({ [`ratelimit:api:events:${HOUR_1}`]: { type: 'zset', size: 3 } })

    const text = formatReport(await purgeRateLimitAnalytics(ops, true))

    expect(text).toContain('APPLIED')
    expect(text).toContain('Deleted: 1 sets')
    expect(text).toContain('Event sets remaining: 0')
  })
})
