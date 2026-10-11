/**
 * The Matches list as the page shows it (rebranding 2.2, boards "D4.6 Matches" and "D4.6
 * Matches · phone", approved 10 October 2026): what the matches API sends for each match, the
 * three status groups, the three sort orders and the words around them. The page and the API
 * share it, so it stays small and imports nothing that runs: the browser downloads it.
 */

import type { CardStatus, MatchChip } from './match-status'
import type { WhyThisMatch } from './match-why'

/** One match, as a card and its "Why this match" need it. Nothing else crosses the wire. */
export interface MatchItem {
  /** The program's id */
  id: string
  name: string
  university: string
  country: string
  /** The university's image; null shows `initials` on brand-soft */
  image: string | null
  initials: string
  minIBPoints: number | null
  /** The fit score as a whole percent. It orders cards within a group and shows only in "Why". */
  score: number
  status: CardStatus
  badge: string
  /** The chips the card shows, already collapsed into "+N met" */
  chips: MatchChip[]
  why: WhyThisMatch
}

/** The panel beside the list, from the same response (desktop). */
export interface MatchesProfile {
  total: number | null
  /** HL first: "Maths AA", HL, 6 */
  subjects: { name: string; level: string; grade: number }[]
  /** "B · B (+2)" */
  core: string | null
  fields: string[]
  countries: string[]
}

/** First run's three steps, for "Complete your academic profile" (D2.11, F6). */
export interface ProfileStep {
  name: 'Interests' | 'Countries' | 'Subjects and grades'
  done: boolean
  /** "Business & Economics, Computer Science", or "Not added yet" */
  detail: string
}

export type MatchesResponse =
  | { complete: false; steps: ProfileStep[] }
  | {
      complete: true
      profile: MatchesProfile
      /** Every match, best fit first. Grouped on the page, before any cap. */
      matches: MatchItem[]
      /**
       * The list goes beyond the student's fields and countries: the matcher found fewer than
       * ten programs in them near their total and widened its search.
       */
      widened: boolean
      /** The student's shortlist, so each Save starts in the right state */
      savedIds: string[]
    }

export type SortOrder = 'fit' | 'points' | 'country'

export const SORT_ORDERS: { value: SortOrder; label: string }[] = [
  { value: 'fit', label: 'Best fit' },
  { value: 'points', label: 'Lowest points needed' },
  { value: 'country', label: 'Country' }
]

/**
 * Best fit: the score, then the minimum closest to the student's total, then programs with no
 * IB minimum, then university and program A–Z. 139 programs tie at 100% for the D4.6 student,
 * so the second key decides what they see first.
 */
export function compareBestFit(total: number): (a: MatchItem, b: MatchItem) => number {
  const distance = (m: MatchItem) =>
    m.minIBPoints == null ? Number.POSITIVE_INFINITY : Math.abs(total - m.minIBPoints)
  return (a, b) => b.score - a.score || compareNumbers(distance(a), distance(b)) || byName(a, b)
}

/** The list in the chosen order. "Lowest points needed" and "Country" put no minimum last too. */
export function sortMatches(items: MatchItem[], order: SortOrder, total: number): MatchItem[] {
  const fit = compareBestFit(total)
  const points = (m: MatchItem) => m.minIBPoints ?? Number.POSITIVE_INFINITY
  const noMinimum = (m: MatchItem) => (m.minIBPoints == null ? 1 : 0)
  const compare =
    order === 'points'
      ? (a: MatchItem, b: MatchItem) => compareNumbers(points(a), points(b)) || fit(a, b)
      : order === 'country'
        ? (a: MatchItem, b: MatchItem) =>
            a.country.localeCompare(b.country, 'en') || noMinimum(a) - noMinimum(b) || fit(a, b)
        : fit
  return [...items].sort(compare)
}

export const GROUPS: { status: CardStatus; id: string; title: string }[] = [
  { status: 'meets', id: 'meets-all', title: 'Meets all requirements' },
  { status: 'close', id: 'within-reach', title: 'Within reach' },
  { status: 'gap', id: 'missing', title: 'Missing a requirement' }
]

/** Each open group shows five cards, then "Show 20 more". */
export const FIRST_SHOWN = 5
export const SHOW_MORE = 20

/** "139 meet all requirements", "21 within reach", "11 missing a requirement" */
export function jumpLabel(status: CardStatus, count: number): string {
  if (status === 'meets') return `${count} ${count === 1 ? 'meets' : 'meet'} all requirements`
  if (status === 'close') return `${count} within reach`
  return `${count} missing a requirement`
}

/** "Show 20 more", or the remainder: "Show 16 more" */
export function showMoreLabel(shown: number, total: number): string {
  return `Show ${Math.min(SHOW_MORE, total - shown)} more`
}

/**
 * "171 programs in your fields and countries, grouped by how close you are." On a phone, where
 * the profile panel isn't, it counts them: "in your 2 fields and 5 countries".
 */
export function summaryText(
  count: number,
  fields: number,
  countries: number,
  counted: boolean
): string {
  const programs = `${count} ${count === 1 ? 'program' : 'programs'}`
  const field = fields === 1 ? 'field' : counted ? `${fields} fields` : 'fields'
  const country = countries === 1 ? 'country' : counted ? `${countries} countries` : 'countries'
  const where =
    fields > 0 && countries > 0
      ? `in your ${field} and ${country}`
      : fields > 0
        ? `in your ${field}`
        : countries > 0
          ? `in your ${country}`
          : 'near your total'
  return `${programs} ${where}, grouped by how close you are.`
}

export const WIDENED_SUMMARY =
  'Few programs fit your fields and countries, so this list also includes others near your total.'

function byName(a: MatchItem, b: MatchItem): number {
  return a.university.localeCompare(b.university, 'en') || a.name.localeCompare(b.name, 'en')
}

/** Infinity minus Infinity is NaN, which sort reads as "equal" only by luck. */
function compareNumbers(a: number, b: number): number {
  return a === b ? 0 : a < b ? -1 : 1
}
