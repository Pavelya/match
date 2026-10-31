/**
 * Academic Match (G_M) Calculator
 *
 * Calculates how well a student's IB performance fits program requirements.
 * Combines both subject requirements and total IB points.
 *
 * Handles three program types:
 * - FULL_REQUIREMENTS: Both points and subjects
 * - POINTS_ONLY: Only IB points cutoff
 * - SUBJECTS_ONLY: Only subject requirements
 *
 * Based on: DOC_2_matching-algo XI.md
 */

import type {
  StudentProfile,
  ProgramRequirements,
  AcademicMatchScore,
  SubjectMatchDetail
} from './types'
import { calculateSubjectMatch, calculateORGroupMatch } from './subject-matcher'
import { assignOwnCourses, type Requirement } from './own-course'

/**
 * What is kept of the academic match when points are short (MAINT 5.43): 0.85 at one short, 0.03
 * less for each point after it, and never under 0.5. It does not read the program's minimum, so a
 * bigger gap can never keep more than a smaller one.
 */
export function pointsShortFactor(pointsShortfall: number): number {
  return Math.max(0.5, 0.85 - 0.03 * (pointsShortfall - 1))
}

/**
 * Calculate academic match score (G_M)
 *
 * @param student - Student's academic profile
 * @param program - Program's requirements
 * @returns AcademicMatchScore with overall score and details
 */
export function calculateAcademicMatch(
  student: StudentProfile,
  program: ProgramRequirements
): AcademicMatchScore {
  const meetsPointsRequirement =
    !program.minimumIBPoints || student.totalIBPoints >= program.minimumIBPoints
  const pointsShortfall = program.minimumIBPoints
    ? Math.max(0, program.minimumIBPoints - student.totalIBPoints)
    : 0

  // Handle different program types
  switch (program.type) {
    case 'POINTS_ONLY':
      return calculatePointsOnlyMatch(student, program, meetsPointsRequirement, pointsShortfall)

    case 'SUBJECTS_ONLY':
      return calculateSubjectsOnlyMatch(student, program)

    case 'FULL_REQUIREMENTS':
    default:
      return calculateFullRequirementsMatch(
        student,
        program,
        meetsPointsRequirement,
        pointsShortfall
      )
  }
}

/**
 * Calculate match for programs with only IB points requirement
 */
function calculatePointsOnlyMatch(
  student: StudentProfile,
  program: ProgramRequirements,
  meetsPoints: boolean,
  pointsShortfall: number
): AcademicMatchScore {
  let score = 1.0

  if (!meetsPoints && program.minimumIBPoints) {
    score = pointsShortFactor(pointsShortfall)
  }

  return {
    score,
    subjectsMatchScore: 1.0, // No subject requirements
    meetsPointsRequirement: meetsPoints,
    pointsShortfall,
    subjectMatches: [],
    missingCriticalCount: 0,
    missingNonCriticalCount: 0
  }
}

/**
 * Calculate match for programs with only subject requirements
 */
function calculateSubjectsOnlyMatch(
  student: StudentProfile,
  program: ProgramRequirements
): AcademicMatchScore {
  const subjectMatches = evaluateAllRequirements(student, program)
  const subjectsMatchScore = calculateSubjectsMatchScore(subjectMatches)

  const { missingCriticalCount, missingNonCriticalCount } = countMissingSubjects(subjectMatches)

  return {
    score: subjectsMatchScore,
    subjectsMatchScore,
    meetsPointsRequirement: true, // No points requirement
    pointsShortfall: 0,
    subjectMatches,
    missingCriticalCount,
    missingNonCriticalCount
  }
}

/**
 * Calculate match for programs with both points and subjects
 */
function calculateFullRequirementsMatch(
  student: StudentProfile,
  program: ProgramRequirements,
  meetsPoints: boolean,
  pointsShortfall: number
): AcademicMatchScore {
  const subjectMatches = evaluateAllRequirements(student, program)
  const subjectsMatchScore = calculateSubjectsMatchScore(subjectMatches)

  const { missingCriticalCount, missingNonCriticalCount } = countMissingSubjects(subjectMatches)

  let score = subjectsMatchScore

  // If student doesn't meet points requirement, scale down
  if (!meetsPoints && program.minimumIBPoints) {
    score = subjectsMatchScore * pointsShortFactor(pointsShortfall)
  }

  return {
    score,
    subjectsMatchScore,
    meetsPointsRequirement: meetsPoints,
    pointsShortfall,
    subjectMatches,
    missingCriticalCount,
    missingNonCriticalCount
  }
}

/**
 * Evaluate all subject requirements and OR-groups
 */
function evaluateAllRequirements(
  student: StudentProfile,
  program: ProgramRequirements
): SubjectMatchDetail[] {
  const matches: SubjectMatchDetail[] = []

  // Evaluate individual subject requirements
  for (const requirement of program.requiredSubjects) {
    matches.push(calculateSubjectMatch(requirement, student.courses))
  }

  // Evaluate OR-group requirements
  for (const orGroup of program.orGroupRequirements) {
    matches.push(calculateORGroupMatch(orGroup, student.courses))
  }

  // Requirements that need a course of their own get different ones (MAINT 5.18). A program
  // without any is left exactly as above.
  const requirements: Requirement[] = [...program.requiredSubjects, ...program.orGroupRequirements]
  const own = requirements.flatMap((r, i) => (r.ownCourse ? [i] : []))
  if (own.length > 1) {
    const assigned = assignOwnCourses(
      own.map((i) => requirements[i]),
      student.courses,
      own.map((i) => matches[i])
    )
    own.forEach((i, k) => (matches[i] = assigned[k]))
  }

  return matches
}

/**
 * Calculate average subject match score
 */
function calculateSubjectsMatchScore(subjectMatches: SubjectMatchDetail[]): number {
  if (subjectMatches.length === 0) {
    return 1.0 // No requirements means full match
  }

  const sum = subjectMatches.reduce((total, match) => total + match.score, 0)
  return sum / subjectMatches.length
}

/**
 * Count missing critical and non-critical subjects
 */
function countMissingSubjects(subjectMatches: SubjectMatchDetail[]): {
  missingCriticalCount: number
  missingNonCriticalCount: number
} {
  let missingCriticalCount = 0
  let missingNonCriticalCount = 0

  for (const match of subjectMatches) {
    if (match.status === 'NO_MATCH') {
      // Check if requirement is critical
      if ('isCritical' in match.requirement && match.requirement.isCritical) {
        missingCriticalCount++
      } else {
        missingNonCriticalCount++
      }
    }
  }

  return { missingCriticalCount, missingNonCriticalCount }
}
