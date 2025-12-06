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
 * Based on: DOC_2_matching-algo IX.md
 */

import type {
  StudentProfile,
  ProgramRequirements,
  AcademicMatchScore,
  SubjectMatchDetail
} from './types'
import { calculateSubjectMatch, calculateORGroupMatch } from './subject-matcher'

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
    // Calculate proportional score for shortfall
    const deficit = pointsShortfall
    const raw = 1 - deficit / program.minimumIBPoints
    // Cap at 0.90 and floor at 0.30
    score = Math.max(0.3, Math.min(raw, 0.9))
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
    // Calculate penalty factor based on how far below
    const deficit = pointsShortfall
    // Near miss (1-3 points): keep 80%
    // Larger gap: scale down more
    let penaltyFactor = 0.8
    if (deficit > 3) {
      penaltyFactor = Math.max(0.5, 1 - deficit / program.minimumIBPoints)
    }

    score = subjectsMatchScore * penaltyFactor
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
