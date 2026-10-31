/**
 * Explore's Best fit (MAINT_tasks.md 5.27, board "D3.5 Sort · best fit", approved 22 October
 * 2026): the order Matches calls "Best fit", over a list that also holds programs outside the
 * student's countries and fields, and, with the switch off, programs they don't meet.
 *
 * - the tier: their fields and countries, their fields, their countries, then the rest, as the
 *   matcher decides it ("Open to anywhere" counts every country; field above country since board
 *   "D3.1 No IB minimum", 31 October 2026);
 * - the status: the ones they meet, within reach, no set grades, then missing a requirement;
 * - the minimum closest to their total, then no minimum, then university and program A–Z.
 *
 * With "Only ones I qualify for" on, every program meets the academic part, and the matcher's
 * score (academic 60%, field 30%, country 10%) orders the tiers the same way, so inside a status
 * this is Matches' own order (`compareBestFit`). Pure: the search and its tests share it.
 */

import { calculateFieldMatch } from '@/lib/matching/field-matcher'
import { calculateLocationMatch } from '@/lib/matching/location-matcher'
import type { CardStatus } from '@/lib/matching/match-status'
import type { StudentProfile } from '@/lib/matching/types'
import { isId } from './query'
import { fitProgram, programFit, type FitRecord } from './fit'

type Preferences = Pick<StudentProfile, 'interestedFields' | 'preferredCountries'>

/** 0: their fields and countries; 1: their fields; 2: their countries; 3: neither */
export function fitTier(
  student: Preferences,
  record: Pick<FitRecord, 'countryId' | 'fieldOfStudyId'>
): number {
  const country = calculateLocationMatch(student.preferredCountries, record.countryId ?? '')
  const field = calculateFieldMatch(student.interestedFields, record.fieldOfStudyId ?? '')
  const inCountries = country.isMatch || country.noPreferences
  const inFields = field.isMatch || field.noPreferences
  return inFields ? (inCountries ? 0 : 1) : inCountries ? 2 : 3
}

/** What the order reads of each program */
export interface Placed {
  tier: number
  status: CardStatus
  minIBPoints: number | null
  university: string
  name: string
}

const STATUS_RANK: Record<CardStatus, number> = { meets: 0, close: 1, neutral: 2, gap: 3 }

export function compareExploreBestFit(total: number): (a: Placed, b: Placed) => number {
  const distance = (p: Placed) =>
    p.minIBPoints == null ? Number.POSITIVE_INFINITY : Math.abs(total - p.minIBPoints)
  return (a, b) =>
    a.tier - b.tier ||
    STATUS_RANK[a.status] - STATUS_RANK[b.status] ||
    compareNumbers(distance(a), distance(b)) ||
    a.university.localeCompare(b.university, 'en') ||
    a.name.localeCompare(b.name, 'en')
}

/** Search records in Best fit's order */
export function bestFitOrder<T extends FitRecord>(
  records: readonly T[],
  student: StudentProfile
): T[] {
  const compare = compareExploreBestFit(student.totalIBPoints)
  return records
    .map((record) => ({
      record,
      placed: {
        tier: fitTier(student, record),
        status: programFit(student, fitProgram(record)).status,
        minIBPoints: record.minimumIBPoints ?? null,
        university: record.universityName,
        name: record.programName
      }
    }))
    .sort((a, b) => compare(a.placed, b.placed))
    .map(({ record }) => record)
}

/**
 * The fallback switch's order (`EXPLORE_BEST_FIT=lifted`): the tiers first, the search's own
 * order inside each, as the index's `optionalFilters` rank them.
 */
export function liftedOrder<T extends FitRecord>(records: readonly T[], student: Preferences): T[] {
  return records
    .map((record) => ({ record, tier: fitTier(student, record) }))
    .sort((a, b) => a.tier - b.tier)
    .map(({ record }) => record)
}

/**
 * The same tiers as `optionalFilters` for the search: a field of theirs scores 2, a country of
 * theirs 1, and a program's scores add up, so 3, 2, 1, 0 are the four tiers. Open to anywhere,
 * no country group: every country is theirs.
 */
export function liftingFilters(student: Preferences): string[][] {
  const countries = student.preferredCountries.filter(isId)
  const fields = student.interestedFields.filter(isId)
  return [
    ...(fields.length > 0 ? [fields.map((id) => `fieldOfStudyId:${id}<score=2>`)] : []),
    ...(countries.length > 0 ? [countries.map((id) => `countryId:${id}<score=1>`)] : [])
  ]
}

/** Infinity minus Infinity is NaN, which sort reads as "equal" only by luck. */
function compareNumbers(a: number, b: number): number {
  return a === b ? 0 : a < b ? -1 : 1
}
