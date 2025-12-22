/**
 * Match Categorization Module
 *
 * NEW in Matching Algorithm V10
 *
 * Categorizes match results into intuitive categories that help students
 * understand their chances of admission:
 *
 * - SAFETY: Very likely to be admitted (student exceeds requirements)
 * - MATCH: Good chance of admission (student meets requirements)
 * - REACH: Aspirational choice (student slightly below requirements)
 * - UNLIKELY: Low chance of admission (significant gaps)
 *
 * Categorization considers:
 * 1. Overall match score
 * 2. Points margin (student points - required points)
 * 3. Whether all subject requirements are met
 *
 * Based on: DOC_2_matching-algo X.md
 */

import type { AcademicMatchScore } from './types'

// ============================================
// Types
// ============================================

export type MatchCategory = 'SAFETY' | 'MATCH' | 'REACH' | 'UNLIKELY'

export interface CategorizationResult {
  category: MatchCategory
  label: string
  description: string
  confidenceIndicator: 'high' | 'medium' | 'low'
  factors: CategorizationFactor[]
}

export interface CategorizationFactor {
  type: 'SCORE' | 'POINTS' | 'SUBJECTS' | 'CRITICAL'
  contribution: 'positive' | 'neutral' | 'negative'
  description: string
}

// ============================================
// Constants
// ============================================

// Score thresholds
const SAFETY_MIN_SCORE = 0.92
const MATCH_MIN_SCORE = 0.78
const REACH_MIN_SCORE = 0.55
const REACH_NEAR_MISS_SCORE = 0.45

// Points margin thresholds
const SAFETY_MIN_MARGIN = 5
const MATCH_MIN_MARGIN = 0
const REACH_MIN_MARGIN = -3

// Category display info
const CATEGORY_INFO: Record<MatchCategory, { label: string; description: string }> = {
  SAFETY: {
    label: 'Safety',
    description: 'You exceed the requirements. High likelihood of admission.'
  },
  MATCH: {
    label: 'Match',
    description: 'You meet the requirements. Good chance of admission.'
  },
  REACH: {
    label: 'Reach',
    description: 'Aspirational choice. You may need to strengthen your application in other areas.'
  },
  UNLIKELY: {
    label: 'Unlikely',
    description: 'Significant gaps exist. Consider this as a backup or for future planning.'
  }
}

// ============================================
// Main Functions
// ============================================

/**
 * Categorize a match result
 *
 * @param matchScore - Overall match score (0-1)
 * @param studentPoints - Student's total IB points
 * @param requiredPoints - Program's minimum required points
 * @param academicMatch - Academic match details (for subject analysis)
 * @returns CategorizationResult with category, labels, and contributing factors
 *
 * @example
 * // SAFETY: 42 pts for 35 req, 0.95 score, all subjects met
 * categorizeMatch(0.95, 42, 35, academicMatch)
 * // returns { category: 'SAFETY', ... }
 */
export function categorizeMatch(
  matchScore: number,
  studentPoints: number,
  requiredPoints: number | null | undefined,
  academicMatch: AcademicMatchScore
): CategorizationResult {
  const pointsMargin = requiredPoints != null ? studentPoints - requiredPoints : studentPoints - 30
  const meetsAllSubjects = checkMeetsAllSubjects(academicMatch)
  const hasMissingCritical = academicMatch.missingCriticalCount > 0

  const factors: CategorizationFactor[] = []
  let category: MatchCategory

  // Collect factors
  factors.push(...analyzeScoreFactor(matchScore))
  factors.push(...analyzePointsFactor(pointsMargin))
  factors.push(...analyzeSubjectsFactor(academicMatch, meetsAllSubjects, hasMissingCritical))

  // Determine category
  if (
    matchScore >= SAFETY_MIN_SCORE &&
    pointsMargin >= SAFETY_MIN_MARGIN &&
    meetsAllSubjects &&
    !hasMissingCritical
  ) {
    category = 'SAFETY'
  } else if (
    matchScore >= MATCH_MIN_SCORE &&
    pointsMargin >= MATCH_MIN_MARGIN &&
    meetsAllSubjects
  ) {
    category = 'MATCH'
  } else if (
    matchScore >= REACH_MIN_SCORE ||
    (pointsMargin >= REACH_MIN_MARGIN && matchScore >= REACH_NEAR_MISS_SCORE)
  ) {
    category = 'REACH'
  } else {
    category = 'UNLIKELY'
  }

  // Determine confidence indicator based on factors
  const negativeCount = factors.filter((f) => f.contribution === 'negative').length
  const confidenceIndicator: 'high' | 'medium' | 'low' =
    category === 'SAFETY' || category === 'MATCH'
      ? negativeCount === 0
        ? 'high'
        : 'medium'
      : negativeCount <= 1
        ? 'medium'
        : 'low'

  return {
    category,
    ...CATEGORY_INFO[category],
    confidenceIndicator,
    factors
  }
}

/**
 * Quick categorization (without full factor analysis)
 *
 * Use this for performance-sensitive contexts where you only need the category
 */
export function getMatchCategory(
  matchScore: number,
  studentPoints: number,
  requiredPoints: number | null | undefined,
  meetsAllSubjects: boolean
): MatchCategory {
  const pointsMargin = requiredPoints != null ? studentPoints - requiredPoints : studentPoints - 30

  if (matchScore >= SAFETY_MIN_SCORE && pointsMargin >= SAFETY_MIN_MARGIN && meetsAllSubjects) {
    return 'SAFETY'
  }

  if (matchScore >= MATCH_MIN_SCORE && pointsMargin >= MATCH_MIN_MARGIN && meetsAllSubjects) {
    return 'MATCH'
  }

  if (
    matchScore >= REACH_MIN_SCORE ||
    (pointsMargin >= REACH_MIN_MARGIN && matchScore >= REACH_NEAR_MISS_SCORE)
  ) {
    return 'REACH'
  }

  return 'UNLIKELY'
}

/**
 * Get display information for a category
 */
export function getCategoryInfo(category: MatchCategory): {
  label: string
  description: string
  color: string
  icon: string
} {
  const info = CATEGORY_INFO[category]
  const colors: Record<MatchCategory, string> = {
    SAFETY: 'green',
    MATCH: 'blue',
    REACH: 'amber',
    UNLIKELY: 'red'
  }
  const icons: Record<MatchCategory, string> = {
    SAFETY: 'shield-check',
    MATCH: 'check-circle',
    REACH: 'trending-up',
    UNLIKELY: 'alert-triangle'
  }

  return {
    ...info,
    color: colors[category],
    icon: icons[category]
  }
}

// ============================================
// Helper Functions
// ============================================

function checkMeetsAllSubjects(academicMatch: AcademicMatchScore): boolean {
  if (academicMatch.subjectMatches.length === 0) {
    return true // No requirements = meets all
  }

  return academicMatch.subjectMatches.every((m) => m.status === 'FULL_MATCH')
}

function analyzeScoreFactor(matchScore: number): CategorizationFactor[] {
  if (matchScore >= SAFETY_MIN_SCORE) {
    return [
      {
        type: 'SCORE',
        contribution: 'positive',
        description: `Excellent match score (${(matchScore * 100).toFixed(0)}%)`
      }
    ]
  }
  if (matchScore >= MATCH_MIN_SCORE) {
    return [
      {
        type: 'SCORE',
        contribution: 'positive',
        description: `Good match score (${(matchScore * 100).toFixed(0)}%)`
      }
    ]
  }
  if (matchScore >= REACH_MIN_SCORE) {
    return [
      {
        type: 'SCORE',
        contribution: 'neutral',
        description: `Moderate match score (${(matchScore * 100).toFixed(0)}%)`
      }
    ]
  }
  return [
    {
      type: 'SCORE',
      contribution: 'negative',
      description: `Low match score (${(matchScore * 100).toFixed(0)}%)`
    }
  ]
}

function analyzePointsFactor(pointsMargin: number): CategorizationFactor[] {
  if (pointsMargin >= SAFETY_MIN_MARGIN) {
    return [
      {
        type: 'POINTS',
        contribution: 'positive',
        description: `${pointsMargin} points above requirement`
      }
    ]
  }
  if (pointsMargin >= MATCH_MIN_MARGIN) {
    return [
      {
        type: 'POINTS',
        contribution: 'positive',
        description:
          pointsMargin === 0
            ? 'Meets points requirement'
            : `${pointsMargin} points above requirement`
      }
    ]
  }
  if (pointsMargin >= REACH_MIN_MARGIN) {
    return [
      {
        type: 'POINTS',
        contribution: 'neutral',
        description: `${Math.abs(pointsMargin)} points below requirement`
      }
    ]
  }
  return [
    {
      type: 'POINTS',
      contribution: 'negative',
      description: `${Math.abs(pointsMargin)} points below requirement`
    }
  ]
}

function analyzeSubjectsFactor(
  academicMatch: AcademicMatchScore,
  meetsAllSubjects: boolean,
  hasMissingCritical: boolean
): CategorizationFactor[] {
  const factors: CategorizationFactor[] = []

  if (hasMissingCritical) {
    factors.push({
      type: 'CRITICAL',
      contribution: 'negative',
      description: `Missing ${academicMatch.missingCriticalCount} critical subject(s)`
    })
  }

  if (meetsAllSubjects) {
    factors.push({
      type: 'SUBJECTS',
      contribution: 'positive',
      description: 'All subject requirements met'
    })
  } else if (!hasMissingCritical && academicMatch.missingNonCriticalCount > 0) {
    factors.push({
      type: 'SUBJECTS',
      contribution: 'neutral',
      description: `${academicMatch.missingNonCriticalCount} non-critical subject(s) not met`
    })
  } else if (academicMatch.subjectMatches.some((m) => m.status === 'PARTIAL_MATCH')) {
    factors.push({
      type: 'SUBJECTS',
      contribution: 'neutral',
      description: 'Some subjects partially match requirements'
    })
  }

  return factors
}

// ============================================
// Constants Export
// ============================================

export const CATEGORIZATION_CONSTANTS = {
  SAFETY_MIN_SCORE,
  SAFETY_MIN_MARGIN,
  MATCH_MIN_SCORE,
  MATCH_MIN_MARGIN,
  REACH_MIN_SCORE,
  REACH_MIN_MARGIN,
  REACH_NEAR_MISS_SCORE
} as const
