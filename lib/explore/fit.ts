/**
 * A student's fit on Explore (rebranding 2.3, board "D3.3 Result row"): the Matches badge, word
 * for word. The status is requirement-based (2.1), so it needs only the academic match: the
 * student's points and subjects against the program's minimum and named subjects. Field and
 * country are notes on a card, never the status, and Explore lists programs outside both.
 * "Only ones I qualify for" keeps the programs whose status is "meets".
 */

import { calculateAcademicMatch } from '@/lib/matching/academic-matcher'
import { deriveMatchStatus } from '@/lib/matching/match-status'
import type { ProgramRequirements, StudentProfile } from '@/lib/matching/types'
import type { ExploreFit } from './types'

/** What the fit reads of a program */
export interface FitProgram {
  requirements: ProgramRequirements
  minIBPoints: number | null
}

/** Field and country don't decide the status, so they are left out of it */
const NO_PREFERENCE = { score: 1, isMatch: true, noPreferences: true }

export function programFit(student: StudentProfile, program: FitProgram): ExploreFit {
  const { status, badge } = deriveMatchStatus({
    result: {
      academicMatch: calculateAcademicMatch(student, program.requirements),
      fieldMatch: NO_PREFERENCE,
      locationMatch: NO_PREFERENCE
    },
    studentPoints: student.totalIBPoints,
    minIBPoints: program.minIBPoints,
    fieldName: '',
    countryName: '',
    requirementsEntryYear: null
  })
  return { status, badge }
}
