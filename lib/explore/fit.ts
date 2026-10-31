/**
 * A student's fit on Explore (rebranding 2.3, board "D3.3 Result row"): the Matches badge, word
 * for word. The status is requirement-based (2.1), so it needs only the academic match: the
 * student's points and subjects against the program's minimum and named subjects. Field and
 * country are notes on a card, never the status, and Explore lists programs outside both.
 * "Only ones I qualify for" keeps the programs whose status is "meets" or "No set grades".
 *
 * The program's side comes from its search record, which the list fetches anyway: the minimum
 * and every requirement with its either/or group. So Explore never reads the programs cache, a
 * 3 MB read from Upstash each time (MAINT_tasks.md 5.19).
 */

import { calculateAcademicMatch } from '@/lib/matching/academic-matcher'
import { deriveMatchStatus } from '@/lib/matching/match-status'
import { transformProgram } from '@/lib/matching/transformers'
import type { AcademicMatchScore, ProgramRequirements, StudentProfile } from '@/lib/matching/types'
import type { ExploreFit } from './types'

/** What the fit reads of a program */
export interface FitProgram {
  requirements: ProgramRequirements
  minIBPoints: number | null
}

/** A search record's fields the fit reads, as lib/algolia/sync.ts writes them */
export interface FitRecord {
  objectID: string
  programName: string
  universityId?: string
  universityName: string
  countryId?: string
  fieldOfStudyId?: string
  minimumIBPoints?: number
  requiredCourses?: {
    courseId: string
    courseName: string
    level: string
    minimumGrade: number
    isCritical: boolean
    orGroupId?: string | null
    ownCourse?: boolean
  }[]
}

/** The search record retrieves these too when there is a fit to work out */
export const FIT_ATTRIBUTES = ['universityId', 'countryId', 'fieldOfStudyId', 'requiredCourses']

/** A search record as the matcher reads a program: the same shape the programs cache gives it */
export function fitProgram(record: FitRecord): FitProgram {
  return {
    minIBPoints: record.minimumIBPoints ?? null,
    requirements: transformProgram({
      id: record.objectID,
      name: record.programName,
      minIBPoints: record.minimumIBPoints ?? null,
      university: {
        id: record.universityId ?? '',
        name: record.universityName,
        country: { id: record.countryId ?? '' }
      },
      fieldOfStudy: { id: record.fieldOfStudyId ?? '' },
      courseRequirements: (record.requiredCourses ?? []).map((req) => ({
        ibCourse: { id: req.courseId, name: req.courseName },
        requiredLevel: req.level,
        minGrade: req.minimumGrade,
        isCritical: req.isCritical,
        orGroupId: req.orGroupId ?? null,
        ownCourse: req.ownCourse
      }))
    })
  }
}

/**
 * "Only ones I qualify for": the programs the student can apply to as they stand, and how many of
 * them have no set grades. Dropped, a student who filters to the US would see almost nothing
 * (board "D3.1 No IB minimum").
 */
export function qualifying<T extends FitRecord>(
  records: readonly T[],
  student: StudentProfile
): { records: T[]; noSetGrades: number } {
  const kept: T[] = []
  let noSetGrades = 0
  for (const record of records) {
    const { status } = programFit(student, fitProgram(record))
    if (status !== 'meets' && status !== 'neutral') continue
    kept.push(record)
    if (status === 'neutral') noSetGrades++
  }
  return { records: kept, noSetGrades }
}

/** Field and country don't decide the status, so they are left out of it */
const NO_PREFERENCE = { score: 1, isMatch: true, noPreferences: true }

export function programFit(student: StudentProfile, program: FitProgram): ExploreFit {
  const { status, badge } = academicFit(student, program)
  return { status, badge }
}

/**
 * The fit with the academic match it was worked out from, whose subjects the Shortlist's
 * compare table lists (rebranding 2.5).
 */
export function academicFit(
  student: StudentProfile,
  program: FitProgram
): ExploreFit & { academicMatch: AcademicMatchScore } {
  const academicMatch = calculateAcademicMatch(student, program.requirements)
  const { status, badge } = deriveMatchStatus({
    result: { academicMatch, fieldMatch: NO_PREFERENCE, locationMatch: NO_PREFERENCE },
    studentPoints: student.totalIBPoints,
    minIBPoints: program.minIBPoints,
    fieldName: '',
    countryName: '',
    requirementsEntryYear: null
  })
  return { status, badge, academicMatch }
}
