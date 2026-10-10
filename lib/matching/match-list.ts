/**
 * Builds the Matches list on the server (rebranding 2.2): each match as its card and "Why this
 * match" show it, the profile beside the list, and first run's steps for a profile without
 * subjects. The page receives words and numbers, not the matcher's results, so a card costs a
 * fraction of the old 3.3 KB and the page downloads none of this logic.
 */

import type { CachedProgram } from './program-cache'
import type { MatchResult } from './types'
import { cardChips, deriveMatchStatus } from './match-status'
import { whyThisMatch } from './match-why'
import {
  compareBestFit,
  type MatchItem,
  type MatchesProfile,
  type ProfileStep
} from './match-groups'
import { shortCourseName } from '@/lib/ib/course-names'
import { getCorePoints } from '@/lib/ib/core-points'
import { universityInitials } from '@/lib/programs/university-initials'

type ListedResult = Pick<
  MatchResult,
  | 'programId'
  | 'overallScore'
  | 'academicMatch'
  | 'fieldMatch'
  | 'locationMatch'
  | 'weightsUsed'
  | 'adjustments'
>

export function matchItem(
  result: ListedResult,
  program: CachedProgram,
  studentPoints: number,
  now?: Date
): MatchItem {
  const { university } = program
  const status = deriveMatchStatus({
    result,
    studentPoints,
    minIBPoints: program.minIBPoints,
    fieldName: program.fieldOfStudy.name,
    countryName: university.country.name,
    requirementsEntryYear: program.requirementsEntryYear,
    admitRate: university.admitRate,
    now
  })
  return {
    id: program.id,
    name: program.name,
    university: university.name,
    country: university.country.name,
    image: university.image,
    initials: universityInitials(university.name, university.abbreviatedName),
    minIBPoints: program.minIBPoints,
    score: Math.round(result.overallScore * 100),
    status: status.status,
    badge: status.badge,
    chips: cardChips(status.chips),
    why: whyThisMatch({
      result,
      status: status.status,
      studentPoints,
      minIBPoints: program.minIBPoints,
      fieldName: program.fieldOfStudy.name,
      countryName: university.country.name,
      countryCode: university.country.code,
      universityName: university.name,
      admitRate: university.admitRate,
      internationalAdmitRate: university.internationalAdmitRate,
      admitRateYear: university.admitRateYear,
      requirementsEntryYear: program.requirementsEntryYear,
      programUrl: program.programUrl,
      now
    })
  }
}

/** Every match as a card, best fit first. Results whose program has gone are left out. */
export function matchItems(
  results: ListedResult[],
  programs: Map<string, CachedProgram>,
  studentPoints: number,
  now?: Date
): MatchItem[] {
  return results
    .flatMap((r) => {
      const program = programs.get(r.programId)
      return program ? [matchItem(r, program, studentPoints, now)] : []
    })
    .sort(compareBestFit(studentPoints))
}

/**
 * True when the list reaches beyond the student's fields and countries. The matcher widens its
 * search only when fewer than ten programs in them are near the student's total (tier 3 and
 * up, optimized-matcher.ts), and every widened tier adds programs outside them; tiers 1 and 2
 * never do. So the results say it, and the shared match cache keeps its shape.
 */
export function isWidened(results: Pick<MatchResult, 'fieldMatch' | 'locationMatch'>[]): boolean {
  return results.some(
    (r) =>
      (!r.fieldMatch.isMatch && !r.fieldMatch.noPreferences) ||
      (!r.locationMatch.isMatch && !r.locationMatch.noPreferences)
  )
}

/** The profile as the matches route selects it. */
export interface ListedProfile {
  totalIBPoints: number | null
  tokGrade: string | null
  eeGrade: string | null
  openToAllFields: boolean
  openToAllLocations: boolean
  courses: { level: string; grade: number; ibCourse: { id: string; name: string } }[]
  preferredFields: { id: string; name: string }[]
  preferredCountries: { id: string; name: string }[]
}

/** Matching needs subjects and a total; fields and countries are optional to it. */
export function hasSubjects(profile: ListedProfile | null): profile is ListedProfile {
  return Boolean(profile && profile.courses.length > 0 && profile.totalIBPoints !== null)
}

export function profileSummary(profile: ListedProfile): MatchesProfile {
  const core = getCorePoints(profile.tokGrade, profile.eeGrade)
  const subjects = [...profile.courses]
    // HL first, as the student lists them otherwise
    .sort((a, b) => (a.level === b.level ? 0 : a.level === 'HL' ? -1 : 1))
    .map((c) => ({ name: shortCourseName(c.ibCourse.name), level: c.level, grade: c.grade }))
  return {
    total: profile.totalIBPoints,
    subjects,
    core:
      profile.tokGrade && profile.eeGrade
        ? `${profile.tokGrade} · ${profile.eeGrade}${typeof core === 'number' ? ` (+${core})` : ''}`
        : null,
    fields: names(profile.preferredFields),
    countries: names(profile.preferredCountries)
  }
}

/** First run's steps, ticked where saved: "Complete your academic profile" (D2.11). */
export function profileSteps(profile: ListedProfile | null): ProfileStep[] {
  const fields = profile ? names(profile.preferredFields) : []
  const countries = profile ? names(profile.preferredCountries).map(inProse) : []
  return [
    {
      name: 'Interests',
      done: fields.length > 0 || Boolean(profile?.openToAllFields),
      detail:
        fields.length > 0 ? fields.join(', ') : profile?.openToAllFields ? 'Every field' : NOT_YET
    },
    {
      name: 'Countries',
      done: countries.length > 0 || Boolean(profile?.openToAllLocations),
      detail:
        countries.length > 0
          ? joinWithAnd(countries)
          : profile?.openToAllLocations
            ? 'Every country'
            : NOT_YET
    },
    { name: 'Subjects and grades', done: hasSubjects(profile), detail: NOT_YET }
  ]
}

const NOT_YET = 'Not added yet'

function names(items: { name: string }[]): string[] {
  return items.map((i) => i.name).sort((a, b) => a.localeCompare(b, 'en'))
}

/** Countries as a sentence names them: "the UK", "the Netherlands" */
const IN_PROSE: Record<string, string> = {
  'United Kingdom': 'the UK',
  'United States': 'the USA',
  Netherlands: 'the Netherlands',
  'United Arab Emirates': 'the UAE',
  'Czech Republic': 'the Czech Republic',
  Philippines: 'the Philippines'
}

function inProse(country: string): string {
  return IN_PROSE[country] ?? country
}

/** "Canada, Ireland and the UK" */
function joinWithAnd(items: string[]): string {
  if (items.length <= 1) return items[0] ?? ''
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`
}
