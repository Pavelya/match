import { describe, expect, it } from 'vitest'
import { summarise, usageReport, usageUrl, windowStart, type UsagePoint } from './algolia-usage'

// The usage check (MAINT_tasks.md 5.27, step 4): this month's search requests against the free
// plan's 10,000, the last 30 days, and the month's pace.

const DAY = 86_400_000
const day = (iso: string, v: number): UsagePoint => ({ t: Date.parse(`${iso}T00:00:00Z`), v })

// 22 September to 22 October 2026: 100 a day in September, 300 a day in October
const POINTS = [
  ...Array.from({ length: 9 }, (_, i) => ({
    t: Date.parse('2026-09-22T00:00:00Z') + i * DAY,
    v: 100
  })),
  ...Array.from({ length: 22 }, (_, i) => ({
    t: Date.parse('2026-10-01T00:00:00Z') + i * DAY,
    v: 300
  }))
]
const NOON_22_OCTOBER = new Date('2026-10-22T12:00:00Z')

describe('the usage check', () => {
  it('asks for 30 days back, or from the month’s start when that is earlier', () => {
    expect(windowStart(NOON_22_OCTOBER).toISOString()).toBe('2026-09-23T00:00:00.000Z')
    expect(windowStart(new Date('2026-10-31T09:00:00Z')).toISOString()).toBe(
      '2026-10-01T00:00:00.000Z'
    )
    expect(usageUrl(new Date('2026-09-23T00:00:00Z'), NOON_22_OCTOBER)).toBe(
      'https://usage.algolia.com/1/usage/total_search_requests?startDate=2026-09-23T00%3A00%3A00.000Z&endDate=2026-10-22T12%3A00%3A00.000Z&granularity=daily'
    )
  })

  it('sums this month and the last 30 days', () => {
    const usage = summarise(POINTS, NOON_22_OCTOBER)
    expect(usage.month).toBe(22 * 300)
    // 23 to 30 September, then 1 to 22 October
    expect(usage.last30).toBe(8 * 100 + 22 * 300)
  })

  it('spreads the month so far over the whole month', () => {
    // 6,600 in 21.5 days, over 31: 9,516, to the nearest hundred
    expect(summarise(POINTS, NOON_22_OCTOBER).pace).toBe(9500)
    expect(summarise([day('2026-10-01', 0)], new Date('2026-10-01T00:00:00Z')).pace).toBe(0)
  })

  it('prints the month against the free plan, and says what to do at about 8,000', () => {
    expect(usageReport({ month: 6200, last30: 7100, pace: 8900 })).toEqual([
      '6,200 of 10,000 this month (62%), on pace for 8,900',
      '7,100 in the last 30 days',
      "On pace for 8,000 or more: keep Best fit's list on the server first, then EXPLORE_BEST_FIT=lifted (MAINT_tasks.md 5.27)"
    ])
    expect(usageReport({ month: 2000, last30: 3208, pace: 3000 })).toHaveLength(2)
  })
})
