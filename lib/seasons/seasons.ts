/**
 * Seasonal themes (rebranding 6.1, board "D1.7 Seasonal themes", approved 25 October 2026). For a
 * few days around a holiday, four fixed places in the new design wear a small drawing: beside the
 * mark in the header, under "match" in Home's hero, in the lime band that ends Home and every
 * guide, and on the 404. The art is code (a stylesheet and its drawings in `public/seasons/{key}/`);
 * the schedule is data, set at /admin/seasonal-themes with no deploy.
 *
 * A plain module, shared by the admin page, its route and the root layout.
 */

/**
 * Every season built in code, in the order the admin page lists them. Each later one adds a board
 * ("D1.7 Season · {name}"), its folder in `public/seasons/` and a line here (6.2).
 */
export const SEASONS = [
  {
    key: 'winter',
    name: 'Winter holidays and New Year',
    usualWindow: '14 December to 1 January'
  }
] as const

export type SeasonKey = (typeof SEASONS)[number]['key']

export const SEASON_KEYS: readonly SeasonKey[] = SEASONS.map((season) => season.key)

export function isSeasonKey(value: unknown): value is SeasonKey {
  return typeof value === 'string' && (SEASON_KEYS as readonly string[]).includes(value)
}

/** The row that holds "All seasonal decorations off", for a day when decoration would be wrong. */
export const ALL_OFF_KEY = 'all-off'

/** The cache tag the root layout reads the schedule under, and a save expires. */
export const SEASON_TAG = 'seasonal-themes'

/** The longest window the admin page accepts, in days, both ends counted. */
export const MAX_SEASON_DAYS = 21

/** A season's window: its key and two calendar days, `YYYY-MM-DD`, both inclusive. */
export type SeasonWindow = readonly [key: SeasonKey, startsOn: string, endsOn: string]

const DAY = /^\d{4}-\d{2}-\d{2}$/

/** A real calendar day written `YYYY-MM-DD`, so 2027-02-30 is not one. */
export function isCalendarDay(value: unknown): value is string {
  if (typeof value !== 'string' || !DAY.test(value)) return false
  const date = new Date(`${value}T00:00:00Z`)
  return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value)
}

/** Days from `from` to `to`, both counted: 14 December to 1 January is 19. */
export function daysInWindow(from: string, to: string): number {
  const ms = Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)
  return Math.round(ms / 86_400_000) + 1
}

/** A stored date (a Prisma `@db.Date`, midnight UTC) as `YYYY-MM-DD`. */
export function dayOf(date: Date): string {
  return date.toISOString().slice(0, 10)
}

/** The visitor's own date, from their clock and time zone, as `YYYY-MM-DD`. */
export function localDay(now: Date): string {
  const two = (n: number) => String(n).padStart(2, '0')
  return `${now.getFullYear()}-${two(now.getMonth() + 1)}-${two(now.getDate())}`
}
