/**
 * IB Diploma rules shared by onboarding, the new subject editor, the coordinator's edit form and
 * both profile APIs. Pure: no React, no database.
 *
 * The authority is the IB's "DP passing criteria" page (ibo.org, updated 19 February 2026) and
 * "General regulations: Diploma Programme" for 2026 (dp-2026-general-regulations.pdf), checked on
 * 18 October 2026 (MAINT 5.20). ibo.org refuses scripts and that session had no browser, so both
 * were checked through a search index's copy of ibo.org: every condition below matched it.
 */

import {
  CORE_FAILING_MESSAGE,
  getCorePoints,
  hasFailingCoreGrade,
  isCoreGrade
} from './core-points'

/** A diploma has six subjects. Totals and subject rules apply once all six are in. */
export const DIPLOMA_SUBJECT_COUNT = 6

export interface DiplomaCourse {
  level: string
  grade: number
}

export interface NamedDiplomaCourse extends DiplomaCourse {
  courseId: string
  courseName: string
}

export interface DiplomaValidationResult {
  isValid: boolean
  failingReasons: string[]
}

export interface DiplomaCheck {
  /** Every failing reason, in the order the forms show them; empty for a diploma the IB awards */
  reasons: string[]
  /** The reasons besides the shape, the core and the Higher Level count: what the editor lists */
  conditions: string[]
  /** The total to store, worked out here: null whenever there is a reason */
  total: number | null
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
 * Grades that can be saved as a diploma at all: six different subjects, each SL or HL with a
 * grade from 1 to 7, and TOK and the EE from A to E. The forms can't produce anything else, so
 * only the coordinator's form, while it is incomplete, and a direct request see these.
 */
function shapeReasons(
  courses: NamedDiplomaCourse[],
  tokGrade: string | null | undefined,
  eeGrade: string | null | undefined
): string[] {
  const reasons: string[] = []
  if (courses.length !== DIPLOMA_SUBJECT_COUNT) {
    reasons.push(`Choose six subjects (you have ${courses.length}).`)
  }
  if (new Set(courses.map((c) => c.courseId)).size !== courses.length) {
    reasons.push('Choose each subject only once.')
  }
  if (!courses.every((c) => c.level === 'SL' || c.level === 'HL')) {
    reasons.push('Choose SL or HL for every subject.')
  }
  if (!courses.every((c) => Number.isInteger(c.grade) && c.grade >= 1 && c.grade <= 7)) {
    reasons.push('Choose a grade from 1 to 7 for every subject.')
  }
  if (!isCoreGrade(tokGrade) || !isCoreGrade(eeGrade)) {
    reasons.push('Choose TOK and Extended Essay grades from A to E.')
  }
  return reasons
}

/** "Physics", "Physics and Chemistry", "Physics, Chemistry and Biology" */
function listNames(names: string[]): string {
  if (names.length <= 1) return names.join('')
  return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`
}

/**
 * The IB's failing conditions besides an E in the core and the Higher Level count, in the words
 * every form shows (rebranding 3.2, board "D3.6 Subject editor"; the four Higher Level and two
 * Standard Level cases approved 16 October 2026): a 1, too many 2s or low grades, too few points
 * at Higher or Standard Level, or in all. For six subjects and both core grades; an E adds no
 * core points to the total.
 */
function otherFailingConditions(
  selections: NamedDiplomaCourse[],
  tokGrade: string | null | undefined,
  eeGrade: string | null | undefined
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

  // With four Higher Level subjects the three highest grades count. Any count but 3 or 4 has
  // already failed on the count, so the floors there don't matter.
  const hl = selections.filter((s) => s.level === 'HL').map((s) => s.grade)
  if (hl.length === 4) {
    const bestThree = [...hl].sort((a, b) => b - a).slice(0, 3)
    const hlPoints = bestThree.reduce((sum, grade) => sum + grade, 0)
    if (hlPoints < 12) {
      reasons.push(
        `Your three best Higher Level grades need 12 points or more (you have ${hlPoints}).`
      )
    }
  } else {
    const hlPoints = hl.reduce((sum, grade) => sum + grade, 0)
    if (hlPoints < 12) {
      reasons.push(`Your Higher Level grades need 12 points or more (you have ${hlPoints}).`)
    }
  }

  // With two Standard Level subjects the floor is 5, not 9
  const sl = selections.filter((s) => s.level === 'SL')
  const slPoints = sumGrades(sl)
  if (sl.length === 2) {
    if (slPoints < 5) {
      reasons.push(`Your two Standard Level grades need 5 points or more (you have ${slPoints}).`)
    }
  } else if (slPoints < 9) {
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
 * The one diploma check: whether these grades are a diploma the IB would award, and so can be
 * saved with a total. Every form, both profile APIs and the new editor's footer call it. A wrong
 * shape is the only reason given until it is fixed; then an E in the core, the Higher Level
 * count, and the other conditions.
 */
export function checkDiploma(
  courses: NamedDiplomaCourse[],
  tokGrade: string | null | undefined,
  eeGrade: string | null | undefined
): DiplomaCheck {
  const shape = shapeReasons(courses, tokGrade, eeGrade)
  if (shape.length > 0) return { reasons: shape, conditions: [], total: null }

  const reasons: string[] = []
  if (hasFailingCoreGrade(tokGrade, eeGrade)) reasons.push(CORE_FAILING_MESSAGE)
  const higherLevelReason = checkHigherLevelCount(courses)
  if (higherLevelReason) reasons.push(higherLevelReason)
  const conditions = otherFailingConditions(courses, tokGrade, eeGrade)
  reasons.push(...conditions)

  return {
    reasons,
    conditions,
    total: reasons.length === 0 ? calculateTotalPoints(courses, tokGrade, eeGrade) : null
  }
}

/** The diploma check for today's subject step, which waits for six subjects and both core grades */
export function validateDiploma(
  selections: NamedDiplomaCourse[],
  tokGrade: string | null,
  eeGrade: string | null
): DiplomaValidationResult {
  // Only validate if we have enough data
  if (selections.length < DIPLOMA_SUBJECT_COUNT || !tokGrade || !eeGrade) {
    return { isValid: true, failingReasons: [] }
  }

  const { reasons } = checkDiploma(selections, tokGrade, eeGrade)
  return { isValid: reasons.length === 0, failingReasons: reasons }
}
