/**
 * Subject Requirement Matching
 *
 * Calculates how well a student's courses meet a program's subject requirements.
 *
 * Handles:
 * - Full matches (correct level and grade)
 * - Grade shortfalls (took subject but grade below requirement)
 * - Level mismatches (HL vs SL differences)
 * - OR-group requirements (Physics OR Chemistry)
 *
 * Based on: DOC_2_matching-algo IX.md
 */

import type {
  StudentCourse,
  SubjectRequirement,
  ORGroupRequirement,
  CourseLevel,
  IBGrade,
  SubjectMatchDetail
} from './types'

/**
 * Calculate match score for a single subject requirement
 *
 * @param requirement - The subject requirement
 * @param studentCourses - All student's courses
 * @returns SubjectMatchDetail with score 0-1 and match status
 */
export function calculateSubjectMatch(
  requirement: SubjectRequirement,
  studentCourses: StudentCourse[]
): SubjectMatchDetail {
  // Find if student took this course
  const studentCourse = studentCourses.find((c) => c.courseId === requirement.courseId)

  // Case 1: Student didn't take this course at all
  if (!studentCourse) {
    return {
      requirement,
      score: 0.0,
      status: 'NO_MATCH',
      reason: 'Subject not taken'
    }
  }

  // Case 2: Check level and grade
  const levelMatch = compareLevels(studentCourse.level, requirement.level)
  const gradeMatch = studentCourse.grade >= requirement.minimumGrade

  // Case 2a: Perfect match (level ok and grade met)
  if (levelMatch === 'EXACT_OR_HIGHER' && gradeMatch) {
    return {
      requirement,
      score: 1.0,
      status: 'FULL_MATCH'
    }
  }

  // Case 2b: Level mismatch (HL required but student has SL, or vice versa)
  if (levelMatch === 'SL_FOR_HL') {
    // Student has SL, program requires HL
    const score = calculateSLForHLScore(studentCourse.grade, requirement.minimumGrade)
    return {
      requirement,
      score,
      status: 'PARTIAL_MATCH',
      reason: `Level mismatch: SL instead of HL (grade ${studentCourse.grade})`
    }
  }

  // Case 2c: Grade shortfall (same level or HL for SL, but grade below)
  if (levelMatch === 'EXACT_OR_HIGHER' && !gradeMatch) {
    const gradeGap = requirement.minimumGrade - studentCourse.grade
    const score = calculateGradeShortfallScore(
      gradeGap,
      requirement.minimumGrade,
      requirement.isCritical
    )
    return {
      requirement,
      score,
      status: 'PARTIAL_MATCH',
      reason: `Grade ${gradeGap} point${gradeGap > 1 ? 's' : ''} below requirement`
    }
  }

  // Shouldn't reach here, but handle edge case
  return {
    requirement,
    score: 0.25,
    status: 'PARTIAL_MATCH',
    reason: 'Minimal credit for taking the subject'
  }
}

/**
 * Calculate match score for an OR-group requirement
 * Takes the best match among all options
 *
 * @param orGroup - The OR-group requirement
 * @param studentCourses - All student's courses
 * @returns SubjectMatchDetail with best score from options
 */
export function calculateORGroupMatch(
  orGroup: ORGroupRequirement,
  studentCourses: StudentCourse[]
): SubjectMatchDetail {
  let bestMatch: SubjectMatchDetail = {
    requirement: orGroup,
    score: 0.0,
    status: 'NO_MATCH',
    reason: 'None of the OR options met'
  }

  // Check each option and keep the best score
  for (const option of orGroup.options) {
    const match = calculateSubjectMatch(option, studentCourses)

    if (match.score > bestMatch.score) {
      bestMatch = {
        requirement: orGroup,
        score: match.score,
        status: match.status,
        reason: `Best match via ${option.courseName}: ${match.reason || 'Fully met'}`,
        // Track which specific course matched for display purposes
        matchedCourseId: option.courseId,
        matchedCourseName: option.courseName
      }
    }

    // If we found a full match, no need to check other options
    if (match.score === 1.0) {
      break
    }
  }

  return bestMatch
}

/**
 * Compare student's course level with required level
 *
 * @param studentLevel - Level student took (HL or SL)
 * @param requiredLevel - Level required by program
 * @returns Comparison result
 */
function compareLevels(
  studentLevel: CourseLevel,
  requiredLevel: CourseLevel
): 'EXACT_OR_HIGHER' | 'SL_FOR_HL' {
  // Same level is exact match
  if (studentLevel === requiredLevel) {
    return 'EXACT_OR_HIGHER'
  }

  // HL covers SL requirement
  if (requiredLevel === 'SL' && studentLevel === 'HL') {
    return 'EXACT_OR_HIGHER'
  }

  // SL doesn't cover HL requirement
  return 'SL_FOR_HL'
}

/**
 * Calculate score when student has SL but HL is required
 *
 * Based on algorithm:
 * - SL 7 for HL 6 requirement: ~0.80
 * - Lower SL grades: scaled down further
 *
 * @param studentGrade - Student's SL grade (1-7)
 * @param requiredGrade - Required HL grade (1-7)
 * @returns Partial credit score
 */
function calculateSLForHLScore(studentGrade: IBGrade, requiredGrade: IBGrade): number {
  // If student has very high SL grade and requirement is reasonable, give good credit
  // SL 7 should get ~0.80 for HL 6 or lower requirements
  if (studentGrade === 7 && requiredGrade <= 6) {
    return 0.8
  }

  // If student has SL 6 for HL 5 or lower, also give 0.8
  if (studentGrade === 6 && requiredGrade <= 5) {
    return 0.8
  }

  // Otherwise, treat SL as roughly 2 points lower than HL
  const hlEquivalent = Math.max(1, studentGrade - 2) as IBGrade

  // If the equivalent would meet the requirement, give proportional credit
  if (hlEquivalent >= requiredGrade) {
    return 0.75 // Solid knowledge but not quite at 0.80
  }

  // Calculate the gap and give proportional score, with extra penalty for level mismatch
  const gap = requiredGrade - hlEquivalent
  const baseScore = calculateGradeShortfallScore(gap, requiredGrade, false)

  // Apply level mismatch penalty (multiply by 0.7 for more significant reduction)
  return Math.max(0.25, baseScore * 0.7)
}

/**
 * Calculate score when grade is below requirement (same level)
 *
 * Based on algorithm:
 * - Critical subject, 1 point below: 0.85
 * - Non-critical, 1 point below: ~0.75-0.80
 * - Larger gaps: proportional with minimum 0.25
 *
 * @param gradeGap - How many points below (1, 2, 3, etc.)
 * @param requiredGrade - The required grade
 * @param isCritical - Whether this is a critical subject
 * @returns Partial credit score
 */
function calculateGradeShortfallScore(
  gradeGap: number,
  requiredGrade: IBGrade,
  isCritical: boolean
): number {
  // One point below gets special treatment
  if (gradeGap === 1) {
    return isCritical ? 0.85 : 0.78
  }

  // For larger gaps, use proportional formula
  // base = 1 - (gap / (requiredGrade - 1))
  const base = 1 - gradeGap / (requiredGrade - 1)

  // Scale by 0.9 to avoid over-crediting
  const scaled = base * 0.9

  // Enforce minimum of 0.25
  return Math.max(0.25, scaled)
}
