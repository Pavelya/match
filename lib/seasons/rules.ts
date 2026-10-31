import { MAX_SEASON_DAYS, SEASONS, daysInWindow, isCalendarDay, type SeasonKey } from './seasons'

/*
 * What /admin/seasonal-themes may save (rebranding 6.1). The page and its route share these
 * checks, so the page says what the route would refuse before anything is sent.
 */

/** One season as the admin page edits it: a switch and two dates, empty until set. */
export interface SeasonInput {
  key: SeasonKey
  enabled: boolean
  startsOn: string | null
  endsOn: string | null
}

export interface ScheduleInput {
  seasons: SeasonInput[]
  allOff: boolean
}

/** What is wrong with each season, by key. Empty when the schedule can be saved. */
export type ScheduleErrors = Partial<Record<SeasonKey, string>>

function nameOf(key: SeasonKey): string {
  return SEASONS.find((season) => season.key === key)?.name ?? key
}

/**
 * Refuses a window longer than 21 days, an end before its start, one date without the other, a
 * season switched on without dates, and two switched-on seasons that overlap. A season switched
 * off may keep its dates, so it can be switched on again next year after a change of dates.
 */
export function checkSchedule(seasons: readonly SeasonInput[]): ScheduleErrors {
  const errors: ScheduleErrors = {}
  for (const season of seasons) {
    const { startsOn, endsOn } = season
    if (startsOn === null && endsOn === null) {
      if (season.enabled) errors[season.key] = 'Choose its first and last day to switch it on.'
    } else if (startsOn === null || endsOn === null) {
      errors[season.key] = 'Choose both days, or neither.'
    } else if (!isCalendarDay(startsOn) || !isCalendarDay(endsOn)) {
      errors[season.key] = 'Choose a real day for both.'
    } else if (endsOn < startsOn) {
      errors[season.key] = 'The last day comes before the first.'
    } else if (daysInWindow(startsOn, endsOn) > MAX_SEASON_DAYS) {
      errors[season.key] = `A season lasts ${MAX_SEASON_DAYS} days at most, both days counted.`
    }
  }

  const on = seasons.filter((season) => season.enabled && !errors[season.key])
  for (const season of on) {
    const other = on.find(
      (o) => o !== season && o.startsOn! <= season.endsOn! && season.startsOn! <= o.endsOn!
    )
    if (other) errors[season.key] = `Its days overlap ${nameOf(other.key)}.`
  }
  return errors
}

/**
 * The request body, read strictly: every season built in code exactly once, a boolean switch,
 * and dates that are a string or null. Anything else is null, which the route answers with 400.
 */
export function parseScheduleInput(body: unknown): ScheduleInput | null {
  if (typeof body !== 'object' || body === null) return null
  const { seasons, allOff } = body as Record<string, unknown>
  if (typeof allOff !== 'boolean' || !Array.isArray(seasons)) return null
  if (seasons.length !== SEASONS.length) return null

  const parsed: SeasonInput[] = []
  for (const { key } of SEASONS) {
    const season = seasons.find(
      (s): s is Record<string, unknown> => typeof s === 'object' && s !== null && s.key === key
    )
    if (!season || typeof season.enabled !== 'boolean') return null
    const day = (value: unknown) => (value === null || value === '' ? null : value)
    const startsOn = day(season.startsOn)
    const endsOn = day(season.endsOn)
    if (!(startsOn === null || typeof startsOn === 'string')) return null
    if (!(endsOn === null || typeof endsOn === 'string')) return null
    parsed.push({ key, enabled: season.enabled, startsOn, endsOn })
  }
  return { seasons: parsed, allOff }
}
