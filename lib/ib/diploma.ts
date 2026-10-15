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

/** "Physics", "Physics and Chemistry", "Physics, Chemistry and Biology" */
function listNames(names: string[]): string {
  if (names.length <= 1) return names.join('')
  return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`
}

/**
 * The IB's failing conditions besides an E in the core and the Higher Level count, in the words
 * every form shows (rebranding 3.2, board "D3.6 Subject editor"): a 1, too many 2s or low grades,
 * too few points at Higher or Standard Level, or in all. For six subjects and both core grades;
 * an E adds no core points to the total.
 */
export function otherFailingConditions(
  selections: NamedDiplomaCourse[],
  tokGrade: string | null,
  eeGrade: string | null
): string[] {
  const reasons: string[] = []

  const ones = selections.filter((s) => s.grade === 1).map((s) => s.courseName)
  if (ones.length > 0) {
    reasons.push(`No subject can have a 1 (you have a 1 in ${listNames(ones)}).`)
  }

  const twos = selections.filter((s) => s.grade === 2).length
  if (twos > 2) {
    reasons.push(`Have no more than two grades of 2 (you have ${twos}).`)
  }

  const low = selections.filter((s) => s.grade <= 3).length
  if (low > 3) {
    reasons.push(`Have no more than three grades of 3 or below (you have ${low}).`)
  }

  const hlPoints = sumGrades(selections.filter((s) => s.level === 'HL'))
  if (hlPoints < 12) {
    reasons.push(`Your Higher Level grades need 12 points or more (you have ${hlPoints}).`)
  }

  const slPoints = sumGrades(selections.filter((s) => s.level === 'SL'))
  if (slPoints < 9) {
    reasons.push(`Your Standard Level grades need 9 points or more (you have ${slPoints}).`)
  }

  const corePoints = getCorePoints(tokGrade, eeGrade)
  const totalPoints = sumGrades(selections) + (typeof corePoints === 'number' ? corePoints : 0)
  if (totalPoints < 24) {
    reasons.push(`Your total needs to be 24 or more (you have ${totalPoints}).`)
  }

  return reasons
}

/**
 * Every IB failing condition onboarding checks, once six subjects and both core grades are in:
 * an E in the core, the Higher Level count, then the others.
 */
export function validateDiploma(
  selections: NamedDiplomaCourse[],
  tokGrade: string | null,
  eeGrade: string | null
): DiplomaValidationResult {
  // Only validate if we have enough data
  if (selections.length < DIPLOMA_SUBJECT_COUNT || !tokGrade || !eeGrade) {
    return { isValid: true, failingReasons: [] }
  }

  const failingReasons: string[] = []
  if (hasFailingCoreGrade(tokGrade, eeGrade)) failingReasons.push(CORE_FAILING_MESSAGE)
  const higherLevelReason = checkHigherLevelCount(selections)
  if (higherLevelReason) failingReasons.push(higherLevelReason)
  failingReasons.push(...otherFailingConditions(selections, tokGrade, eeGrade))

  return {
    isValid: failingReasons.length === 0,
    failingReasons
  }
}
