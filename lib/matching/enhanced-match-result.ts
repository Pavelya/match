/**
 * Enhanced Match Result (V10)
 *
 * Extends the base MatchResult with V10-specific fields:
 * - Match category (SAFETY/MATCH/REACH/UNLIKELY)
 * - Confidence scoring (high/medium/low with factors)
 * - Fit quality breakdown (points fit, selectivity boost, tier)
 *
 * This module provides:
 * 1. Extended types for V10 match results
 * 2. Function to enhance base MatchResult with V10 fields
 * 3. Backward-compatible serialization for API responses
 *
 * Based on: DOC_2_matching-algo X.md - Integration
 */

import type { MatchResult, StudentProfile, ProgramRequirements } from './types'
import { categorizeMatch, type MatchCategory } from './categorization'
import { calculateConfidence, type ConfidenceResult, type ConfidenceInput } from './confidence'
import { calculatePointsFitQuality, getFitQualityCategory } from './fit-quality'
import {
  calculateSelectivityTier,
  applySelectivityBoost,
  type SelectivityTier
} from './selectivity'
// SelectivityTier already imported above

// ============================================
// Types
// ============================================

/** V10 Enhanced Match Result */
export interface EnhancedMatchResult extends MatchResult {
  // V10: Match categorization
  category: MatchCategory
  categoryInfo: {
    label: string
    description: string
    confidenceIndicator: 'high' | 'medium' | 'low'
  }

  // V10: Confidence scoring
  confidence: ConfidenceResult

  // V10: Fit quality breakdown
  fitQuality: FitQualityBreakdown
}

/** Detailed fit quality breakdown */
export interface FitQualityBreakdown {
  /** Points fit score (0-1) */
  pointsFitScore: number
  /** Points fit category (under/optimal/over) */
  pointsFitCategory: 'OPTIMAL' | 'ABOVE' | 'BELOW' | 'FAR_BELOW' | 'FAR_ABOVE'
  /** Selectivity boost applied (0-0.05) */
  selectivityBoost: number
  /** Program's selectivity tier (1-4) */
  selectivityTier: SelectivityTier
  /** Tier name for display */
  tierName: string
}

/** Configuration for enhancing match results */
export interface EnhanceMatchConfig {
  // Student data quality flags
  gradesAreFinal?: boolean
  hasCompleteProfile?: boolean

  // Program data quality flags
  requirementsVerified?: boolean
  requirementsUpdatedAt?: Date

  // Enable/disable specific enhancements
  includeCategory?: boolean
  includeConfidence?: boolean
  includeFitQuality?: boolean
}

// ============================================
// Main Enhancement Function
// ============================================

/**
 * Enhance a base MatchResult with V10 fields
 *
 * @param baseResult - Base match result from V9 scorer
 * @param student - Student profile
 * @param program - Program requirements
 * @param config - Enhancement configuration
 * @returns EnhancedMatchResult with all V10 fields
 *
 * @example
 * const baseResult = calculateMatch({ student, program })
 * const enhanced = enhanceMatchResult(baseResult, student, program, {
 *   gradesAreFinal: true,
 *   requirementsVerified: true
 * })
 *
 * console.log(enhanced.category) // 'MATCH'
 * console.log(enhanced.confidence.level) // 'high'
 */
export function enhanceMatchResult(
  baseResult: MatchResult,
  student: StudentProfile,
  program: ProgramRequirements,
  config: EnhanceMatchConfig = {}
): EnhancedMatchResult {
  const {
    gradesAreFinal = true,
    hasCompleteProfile = true,
    requirementsVerified = false,
    requirementsUpdatedAt,
    includeCategory = true,
    includeConfidence = true,
    includeFitQuality = true
  } = config

  // Calculate category
  let category: MatchCategory = 'MATCH'
  let categoryInfo: EnhancedMatchResult['categoryInfo'] = {
    label: 'Match',
    description: 'Good chance of admission',
    confidenceIndicator: 'medium'
  }

  if (includeCategory) {
    const categorizationResult = categorizeMatch(
      baseResult.overallScore,
      student.totalIBPoints,
      program.minimumIBPoints,
      baseResult.academicMatch
    )
    category = categorizationResult.category
    categoryInfo = {
      label: categorizationResult.label,
      description: categorizationResult.description,
      confidenceIndicator: categorizationResult.confidenceIndicator
    }
  }

  // Calculate confidence
  let confidence: ConfidenceResult = {
    score: 1.0,
    level: 'high',
    factors: []
  }

  if (includeConfidence) {
    const confidenceInput: ConfidenceInput = {
      gradesAreFinal,
      totalSubjectsEntered: student.courses.length,
      hasCompleteProfile,
      requirementsVerified,
      requirementsUpdatedAt,
      hasPointsRequirement: program.minimumIBPoints !== undefined,
      subjectRequirementCount: program.requiredSubjects.length + program.orGroupRequirements.length
    }
    confidence = calculateConfidence(confidenceInput)
  }

  // Calculate fit quality
  let fitQuality: FitQualityBreakdown = {
    pointsFitScore: 1.0,
    pointsFitCategory: 'OPTIMAL',
    selectivityBoost: 0,
    selectivityTier: 3,
    tierName: 'Standard'
  }

  if (includeFitQuality) {
    const requiredPoints = program.minimumIBPoints ?? 30
    const pointsFitScore = calculatePointsFitQuality(student.totalIBPoints, requiredPoints)
    const pointsFitCategory = getFitQualityCategory(student.totalIBPoints, requiredPoints)

    const selectivityTier = calculateSelectivityTier(requiredPoints)
    const boostedScore = applySelectivityBoost(
      baseResult.overallScore,
      student.totalIBPoints,
      selectivityTier
    )
    const boost = boostedScore - baseResult.overallScore

    const tierNames: Record<SelectivityTier, string> = {
      1: 'Highly Selective',
      2: 'Selective',
      3: 'Standard',
      4: 'Open'
    }

    fitQuality = {
      pointsFitScore,
      pointsFitCategory,
      selectivityBoost: boost,
      selectivityTier,
      tierName: tierNames[selectivityTier]
    }
  }

  // Return enhanced result
  return {
    ...baseResult,
    category,
    categoryInfo,
    confidence,
    fitQuality
  }
}

// ============================================
// Batch Enhancement
// ============================================

/**
 * Enhance multiple match results
 */
export function enhanceMatchResults(
  results: MatchResult[],
  student: StudentProfile,
  programsMap: Map<string, ProgramRequirements>,
  config: EnhanceMatchConfig = {}
): EnhancedMatchResult[] {
  return results.map((result) => {
    const program = programsMap.get(result.programId)
    if (!program) {
      // Fallback: return with default V10 fields
      return {
        ...result,
        category: 'MATCH' as MatchCategory,
        categoryInfo: {
          label: 'Match',
          description: 'Good chance of admission',
          confidenceIndicator: 'medium' as const
        },
        confidence: { score: 1.0, level: 'high' as const, factors: [] },
        fitQuality: {
          pointsFitScore: 1.0,
          pointsFitCategory: 'OPTIMAL' as const,
          selectivityBoost: 0,
          selectivityTier: 3 as SelectivityTier,
          tierName: 'Standard'
        }
      }
    }
    return enhanceMatchResult(result, student, program, config)
  })
}

// ============================================
// API Serialization
// ============================================

/**
 * Serialize enhanced result for API response
 * (Backward compatible - old clients ignore new fields)
 */
export function serializeEnhancedResult(result: EnhancedMatchResult): Record<string, unknown> {
  return {
    // Base fields
    programId: result.programId,
    overallScore: result.overallScore,
    academicMatch: result.academicMatch,
    locationMatch: result.locationMatch,
    fieldMatch: result.fieldMatch,
    weightsUsed: result.weightsUsed,
    adjustments: result.adjustments,

    // V10 fields (additive, won't break old clients)
    category: result.category,
    categoryInfo: result.categoryInfo,
    confidence: {
      score: result.confidence.score,
      level: result.confidence.level,
      factors: result.confidence.factors.map((f) => ({
        type: f.type,
        description: f.description
      }))
    },
    fitQuality: result.fitQuality
  }
}

/**
 * Serialize array of enhanced results
 */
export function serializeEnhancedResults(
  results: EnhancedMatchResult[]
): Record<string, unknown>[] {
  return results.map(serializeEnhancedResult)
}

// ============================================
// Type Guards
// ============================================

/**
 * Check if a match result is enhanced (has V10 fields)
 */
export function isEnhancedMatchResult(result: unknown): result is EnhancedMatchResult {
  return (
    typeof result === 'object' &&
    result !== null &&
    'category' in result &&
    'confidence' in result &&
    'fitQuality' in result
  )
}
