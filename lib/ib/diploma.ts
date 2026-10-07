/**
 * IB Diploma rules shared by onboarding, the coordinator's edit form and both profile APIs.
 * Pure: no React, no database.
 */

import { CORE_FAILING_MESSAGE, getCorePoints, hasFailingCoreGrade } from './core-points'

/** A diploma has six subjects. Totals and subject rules apply once all six are in. */
export const DIPLOMA_SUBJECT_COUNT = 6

export interface DiplomaCourse {
  level: string
  grade: number
}

export interface NamedDiplomaCourse extends DiplomaCourse {
  courseName: string
}

export interface DiplomaValidationResult {
  isValid: boolean
  failingReasons: string[]
}

const sumGrades = (courses: DiplomaCourse[]) => courses.reduce((sum, c) => sum + c.grade, 0)

/**
 * The IB total, 0-45: six subject grades plus the core points. Null until all six subjects
 * and both core grades are in, and when the core fails.
 */
export function calculateTotalPoints(
  courses: DiplomaCourse[],
  tokGrade: string | null | undefined,
  eeGrade: string | null | undefined
): number | null {
  const corePoints = getCorePoints(tokGrade, eeGrade)
  if (courses.length !== DIPLOMA_SUBJECT_COUNT || typeof corePoints !== 'number') return null
  return sumGrades(courses) + corePoints
}

/** "Take 3 or 4 subjects at Higher Level", once all six subjects are in; otherwise null. */
export function checkHigherLevelCount(courses: DiplomaCourse[]): string | null {
  if (courses.length !== DIPLOMA_SUBJECT_COUNT) return null
  const hlCount = courses.filter((c) => c.level === 'HL').length
  if (hlCount === 3 || hlCount === 4) return null
  return `Take 3 or 4 subjects at Higher Level (you have ${hlCount}).`
}

/**
 * Why a profile cannot be saved, or null. Every form and both profile APIs enforce these:
 * an E in TOK or the EE, and six subjects without 3 or 4 at Higher Level.
 */
export function getSaveBlocker(
  courses: DiplomaCourse[],
  tokGrade: string | null | undefined,
  eeGrade: string | null | undefined
): string | null {
  if (hasFailingCoreGrade(tokGrade, eeGrade)) return CORE_FAILING_MESSAGE
  return checkHigherLevelCount(courses)
}

/**
 * Every IB failing condition onboarding checks, once six subjects and both core grades are in.
 */
export function validateDiploma(
  selections: NamedDiplomaCourse[],
  tokGrade: string | null,
  eeGrade: string | null
): DiplomaValidationResult {
  const failingReasons: string[] = []

  // Only validate if we have enough data
  if (selections.length < DIPLOMA_SUBJECT_COUNT || !tokGrade || !eeGrade) {
    return { isValid: true, failingReasons: [] }
  }

  // 1. E in TOK or EE = automatic fail
  if (hasFailingCoreGrade(tokGrade, eeGrade)) {
    failingReasons.push(CORE_FAILING_MESSAGE)
  }

  // 2. 3 or 4 subjects at Higher Level
  const higherLevelReason = checkHigherLevelCount(selections)
  if (higherLevelReason) {
    failingReasons.push(higherLevelReason)
  }

  // 3. Grade 1 in any subject = automatic fail
  const grade1Subjects = selections.filter((s) => s.grade === 1)
  if (grade1Subjects.length > 0) {
    const subjectNames = grade1Subjects.map((s) => s.courseName).join(', ')
    failingReasons.push(`Grade 1 in any subject results in diploma failure (${subjectNames})`)
  }

  // 4. More than two grades of 2 = fail
  const grade2Count = selections.filter((s) => s.grade === 2).length
  if (grade2Count > 2) {
    failingReasons.push(
      `More than two grades of 2 results in diploma failure (you have ${grade2Count})`
    )
  }

  // 5. More than three grades of 3 or below = fail
  const lowGradeCount = selections.filter((s) => s.grade <= 3).length
  if (lowGradeCount > 3) {
    failingReasons.push(
      `More than three grades of 3 or below results in diploma failure (you have ${lowGradeCount})`
    )
  }

  // 6. Fewer than 12 points in HL subjects = fail
  const hlPoints = sumGrades(selections.filter((s) => s.level === 'HL'))
  if (hlPoints < 12) {
    failingReasons.push(
      `Fewer than 12 points in HL subjects results in diploma failure (you have ${hlPoints})`
    )
  }

  // 7. Fewer than 9 points in SL subjects = fail
  const slPoints = sumGrades(selections.filter((s) => s.level === 'SL'))
  if (slPoints < 9) {
    failingReasons.push(
      `Fewer than 9 points in SL subjects results in diploma failure (you have ${slPoints})`
    )
  }

  // 8. Total points less than 24 = fail. A failing core adds nothing.
  const corePoints = getCorePoints(tokGrade, eeGrade)
  const totalPoints = sumGrades(selections) + (typeof corePoints === 'number' ? corePoints : 0)
  if (totalPoints < 24) {
    failingReasons.push(
      `Total points below 24 results in diploma failure (you have ${totalPoints})`
    )
  }

  return {
    isValid: failingReasons.length === 0,
    failingReasons
  }
}
