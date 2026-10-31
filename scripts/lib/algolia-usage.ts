/**
 * The arithmetic behind scripts/algolia-usage.ts (MAINT_tasks.md 5.27, step 4): Algolia's daily
 * search requests summed for this calendar month and the last 30 days, and the month's pace to
 * its end, against the free plan's 10,000. Pure, so it is tested without the network.
 */

/** The free plan's search requests a month */
export const FREE_PLAN = 10_000

/** At about this many on pace, keep Best fit's list on the server first, then `lifted` */
export const WATCH_AT = 8_000

const DAY = 86_400_000

/** One day of the usage API's answer: its start in milliseconds (UTC) and its requests */
export interface UsagePoint {
  t: number
  v: number
}

/** The first moment of the window to ask for: 30 days back, or the month's start if earlier */
export function windowStart(now: Date): Date {
  const month = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)
  const thirty = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()) - 29 * DAY
  return new Date(Math.min(month, thirty))
}

/** The usage API's URL for the daily search requests from `start` to `now` */
export function usageUrl(start: Date, now: Date): string {
  const params = new URLSearchParams({
    startDate: start.toISOString(),
    endDate: now.toISOString(),
    granularity: 'daily'
  })
  return `https://usage.algolia.com/1/usage/total_search_requests?${params}`
}

export interface Usage {
  month: number
  last30: number
  /** This month's requests so far, spread over the whole month */
  pace: number
}

export function summarise(points: readonly UsagePoint[], now: Date): Usage {
  const monthStart = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)
  const monthEnd = Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1)
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  const sum = (from: number) => points.filter((p) => p.t >= from).reduce((n, p) => n + p.v, 0)
  const month = sum(monthStart)
  // Days gone, today's part included, so the first hours of a month don't count a whole day
  const elapsed = Math.max(now.getTime() - monthStart, DAY / 24)
  return {
    month,
    last30: sum(today - 29 * DAY),
    pace: Math.round(((month / elapsed) * (monthEnd - monthStart)) / 100) * 100
  }
}

const number = new Intl.NumberFormat('en-GB')

/** "6,200 of 10,000 this month (62%), on pace for 8,900", and the last 30 days */
export function usageReport(usage: Usage): string[] {
  const percent = Math.round((usage.month / FREE_PLAN) * 100)
  const lines = [
    `${number.format(usage.month)} of ${number.format(FREE_PLAN)} this month (${percent}%), on pace for ${number.format(usage.pace)}`,
    `${number.format(usage.last30)} in the last 30 days`
  ]
  if (usage.pace >= WATCH_AT) {
    lines.push(
      `On pace for ${number.format(WATCH_AT)} or more: keep Best fit's list on the server first, then EXPLORE_BEST_FIT=lifted (MAINT_tasks.md 5.27)`
    )
  }
  return lines
}
