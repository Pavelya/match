/**
 * Confidence Scoring Module
 *
 * NEW in Matching Algorithm V10
 *
 * Provides a confidence indicator showing how reliable the match prediction is.
 * Confidence is reduced when:
 * - Student data is incomplete (missing grades, predicted vs final)
 * - Program requirements are unverified or incomplete
 * - There are data quality issues
 *
 * Confidence Levels:
 * - HIGH (0.85-1.0): Match prediction is reliable
 * - MEDIUM (0.65-0.84): Some uncertainty exists
 * - LOW (< 0.65): Significant uncertainty, treat as estimate
 *
 * Based on: DOC_2_matching-algo X.md
 */

// ============================================
// Types
// ============================================

export type ConfidenceLevel = 'high' | 'medium' | 'low'

export interface ConfidenceResult {
  score: number // 0.0 - 1.0
  level: ConfidenceLevel
  factors: ConfidenceFactor[]
}

export interface ConfidenceFactor {
  type: ConfidenceFactorType
  impact: number // How much this factor reduces confidence (0-1)
  description: string
}

export type ConfidenceFactorType =
  | 'PREDICTED_GRADES'
  | 'MISSING_SUBJECT_GRADES'
  | 'INCOMPLETE_PROFILE'
  | 'UNVERIFIED_REQUIREMENTS'
  | 'OUTDATED_REQUIREMENTS'
  | 'MISSING_POINTS_REQUIREMENT'
  | 'FEW_DATA_POINTS'
  | 'ESTIMATION_USED'

// ============================================
// Configuration
// ============================================

export interface ConfidenceInput {
  // Student data quality
  gradesAreFinal: boolean
  totalSubjectsEntered: number // Out of expected 6
  hasCompleteProfile: boolean // All required fields filled

  // Program data quality
  requirementsVerified: boolean
  requirementsUpdatedAt?: Date
  hasPointsRequirement: boolean
  subjectRequirementCount: number
}

// Factor impacts (how much each factor reduces confidence)
const FACTOR_IMPACTS: Record<ConfidenceFactorType, number> = {
  PREDICTED_GRADES: 0.08,
  MISSING_SUBJECT_GRADES: 0.05, // Per missing subject
  INCOMPLETE_PROFILE: 0.1,
  UNVERIFIED_REQUIREMENTS: 0.12,
  OUTDATED_REQUIREMENTS: 0.08,
  MISSING_POINTS_REQUIREMENT: 0.05,
  FEW_DATA_POINTS: 0.15,
  ESTIMATION_USED: 0.1
}

// Level thresholds
const HIGH_THRESHOLD = 0.85
const MEDIUM_THRESHOLD = 0.65

// ============================================
// Main Function
// ============================================

/**
 * Calculate confidence score for a match prediction
 *
 * @param input - Data quality indicators
 * @returns ConfidenceResult with score, level, and factors
 *
 * @example
 * // All data complete and verified
 * calculateConfidence({
 *   gradesAreFinal: true,
 *   totalSubjectsEntered: 6,
 *   hasCompleteProfile: true,
 *   requirementsVerified: true,
 *   hasPointsRequirement: true,
 *   subjectRequirementCount: 3
 * })
 * // returns { score: 1.0, level: 'high', factors: [] }
 */
export function calculateConfidence(input: ConfidenceInput): ConfidenceResult {
  const factors: ConfidenceFactor[] = []

  // Start with full confidence
  let score = 1.0

  // Check: Predicted vs Final grades
  if (!input.gradesAreFinal) {
    factors.push({
      type: 'PREDICTED_GRADES',
      impact: FACTOR_IMPACTS.PREDICTED_GRADES,
      description: 'Grades are predicted, not final IB results'
    })
    score -= FACTOR_IMPACTS.PREDICTED_GRADES
  }

  // Check: Missing subject grades
  const expectedSubjects = 6
  const missingSubjects = Math.max(0, expectedSubjects - input.totalSubjectsEntered)
  if (missingSubjects > 0) {
    const impact = missingSubjects * FACTOR_IMPACTS.MISSING_SUBJECT_GRADES
    factors.push({
      type: 'MISSING_SUBJECT_GRADES',
      impact,
      description: `${missingSubjects} subject grade(s) not entered`
    })
    score -= impact
  }

  // Check: Incomplete profile
  if (!input.hasCompleteProfile) {
    factors.push({
      type: 'INCOMPLETE_PROFILE',
      impact: FACTOR_IMPACTS.INCOMPLETE_PROFILE,
      description: 'Student profile is incomplete'
    })
    score -= FACTOR_IMPACTS.INCOMPLETE_PROFILE
  }

  // Check: Unverified requirements
  if (!input.requirementsVerified) {
    factors.push({
      type: 'UNVERIFIED_REQUIREMENTS',
      impact: FACTOR_IMPACTS.UNVERIFIED_REQUIREMENTS,
      description: 'Program requirements have not been verified'
    })
    score -= FACTOR_IMPACTS.UNVERIFIED_REQUIREMENTS
  }

  // Check: Outdated requirements (older than 1 year)
  if (input.requirementsUpdatedAt) {
    const oneYearAgo = new Date()
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)

    if (input.requirementsUpdatedAt < oneYearAgo) {
      factors.push({
        type: 'OUTDATED_REQUIREMENTS',
        impact: FACTOR_IMPACTS.OUTDATED_REQUIREMENTS,
        description: 'Program requirements may be outdated (>1 year old)'
      })
      score -= FACTOR_IMPACTS.OUTDATED_REQUIREMENTS
    }
  }

  // Check: Missing points requirement
  if (!input.hasPointsRequirement) {
    factors.push({
      type: 'MISSING_POINTS_REQUIREMENT',
      impact: FACTOR_IMPACTS.MISSING_POINTS_REQUIREMENT,
      description: 'Program has no published points requirement'
    })
    score -= FACTOR_IMPACTS.MISSING_POINTS_REQUIREMENT
  }

  // Check: Few data points for matching
  if (input.subjectRequirementCount === 0 && !input.hasPointsRequirement) {
    factors.push({
      type: 'FEW_DATA_POINTS',
      impact: FACTOR_IMPACTS.FEW_DATA_POINTS,
      description: 'Limited program requirements data available'
    })
    score -= FACTOR_IMPACTS.FEW_DATA_POINTS
  }

  // Ensure score stays in valid range
  score = Math.max(0, Math.min(1, score))

  // Determine level
  const level = getConfidenceLevel(score)

  return {
    score,
    level,
    factors
  }
}

/**
 * Quick confidence level check (without full factor analysis)
 */
export function getConfidenceLevel(score: number): ConfidenceLevel {
  if (score >= HIGH_THRESHOLD) return 'high'
  if (score >= MEDIUM_THRESHOLD) return 'medium'
  return 'low'
}

/**
 * Get display information for a confidence level
 */
export function getConfidenceLevelInfo(level: ConfidenceLevel): {
  label: string
  description: string
  color: string
} {
  switch (level) {
    case 'high':
      return {
        label: 'High Confidence',
        description: 'Match prediction is reliable based on complete data',
        color: 'green'
      }
    case 'medium':
      return {
        label: 'Medium Confidence',
        description: 'Some uncertainty exists due to incomplete data',
        color: 'amber'
      }
    case 'low':
      return {
        label: 'Low Confidence',
        description: 'Significant uncertainty - treat as rough estimate',
        color: 'red'
      }
  }
}

/**
 * Create a simple confidence result for common scenarios
 */
export function createQuickConfidence(
  level: 'complete' | 'predicted' | 'partial' | 'minimal'
): ConfidenceResult {
  switch (level) {
    case 'complete':
      return calculateConfidence({
        gradesAreFinal: true,
        totalSubjectsEntered: 6,
        hasCompleteProfile: true,
        requirementsVerified: true,
        hasPointsRequirement: true,
        subjectRequirementCount: 3
      })
    case 'predicted':
      return calculateConfidence({
        gradesAreFinal: false, // Main difference
        totalSubjectsEntered: 6,
        hasCompleteProfile: true,
        requirementsVerified: true,
        hasPointsRequirement: true,
        subjectRequirementCount: 3
      })
    case 'partial':
      return calculateConfidence({
        gradesAreFinal: false,
        totalSubjectsEntered: 4, // Missing some
        hasCompleteProfile: true,
        requirementsVerified: false, // Unverified
        hasPointsRequirement: true,
        subjectRequirementCount: 2
      })
    case 'minimal':
      return calculateConfidence({
        gradesAreFinal: false,
        totalSubjectsEntered: 2,
        hasCompleteProfile: false,
        requirementsVerified: false,
        hasPointsRequirement: false,
        subjectRequirementCount: 0
      })
  }
}

// ============================================
// Constants Export
// ============================================

export const CONFIDENCE_CONSTANTS = {
  HIGH_THRESHOLD,
  MEDIUM_THRESHOLD,
  FACTOR_IMPACTS
} as const
