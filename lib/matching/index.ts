/**
 * Matching Algorithm - Main Entry Point
 *
 * This module exports all matching algorithm functions and types.
 * Use this as the primary import point for the matching system.
 *
 * @example
 * ```typescript
 * import { calculateMatch, calculateMatches } from '@/lib/matching'
 *
 * const result = calculateMatch({ student, program, mode: 'BALANCED' })
 * const results = calculateMatches(student, programs, 'BALANCED')
 * ```
 */

// Main scoring functions
export { calculateMatch, calculateMatches } from './scorer'

// Cache functions
export {
  getCachedMatch,
  getCachedMatches,
  getCachedMatchesV10,
  invalidateStudentCache,
  invalidateProgramCache,
  clearAllMatchCache,
  getCacheStats,
  type V10MatchResult
} from './cache'

// Component matchers (for testing/debugging)
export { calculateFieldMatch } from './field-matcher'
export { calculateLocationMatch } from './location-matcher'
export { calculateAcademicMatch } from './academic-matcher'
export { calculateSubjectMatch, calculateORGroupMatch } from './subject-matcher'
export { applyPenaltiesAndCaps } from './penalties'

// V10: Fit Quality Score (for testing/debugging)
export {
  calculatePointsFitQuality,
  getFitQualityCategory,
  FIT_QUALITY_CONSTANTS
} from './fit-quality'

// V10: Selectivity Tiers (for testing/debugging)
export {
  calculateSelectivityTier,
  applySelectivityBoost,
  isHighAchiever,
  getSelectivityTierName,
  getBoostAmount,
  SELECTIVITY_CONSTANTS,
  type SelectivityTier
} from './selectivity'

// V10: Preference Validator (anti-gaming)
export {
  validatePreferences,
  calculateFieldMatchV10,
  calculateLocationMatchV10,
  PREFERENCE_CONSTANTS,
  type PreferenceConfig,
  type PreferenceValidationResult
} from './preference-validator'

// V10: Unified Penalty System
export {
  applyUnifiedPenalties,
  UNIFIED_PENALTY_CONSTANTS,
  type UnifiedPenaltyResult,
  type PenaltyItem,
  type CapItem,
  type PenaltyType,
  type CapType
} from './unified-penalties'

// V10: Match Categorization
export {
  categorizeMatch,
  getMatchCategory,
  getCategoryInfo,
  CATEGORIZATION_CONSTANTS,
  type MatchCategory,
  type CategorizationResult,
  type CategorizationFactor
} from './categorization'

// V10: Confidence Scoring
export {
  calculateConfidence,
  getConfidenceLevel,
  getConfidenceLevelInfo,
  createQuickConfidence,
  CONFIDENCE_CONSTANTS,
  type ConfidenceLevel,
  type ConfidenceResult,
  type ConfidenceFactor,
  type ConfidenceInput
} from './confidence'

// V10: Performance - Student Capability Vector
export {
  createStudentCapabilityVector,
  createEmptyCapabilityVector,
  canMeetRequirements,
  measureLookupPerformance,
  type StudentCapabilityVector,
  type SubjectCapability
} from './student-capability-vector'

// V10: Performance - Program Index
export {
  createProgramIndex,
  createEmptyProgramIndex,
  calculateReductionRatio,
  type ProgramIndex,
  type FilterCriteria,
  type IndexStats
} from './program-index'

// V10: Performance - Memoization Cache
export {
  createMemoCache,
  createMatchCacheKey,
  createSubjectCacheKey,
  createOrGroupCacheKey,
  getGlobalMatchCache,
  clearGlobalMatchCache,
  measureCachePerformance,
  type MemoCache,
  type CacheStats,
  type CacheOptions
} from './memo-cache'

// V10: Performance - Optimized Matcher (integrates all performance features)
export {
  calculateOptimizedMatches,
  calculateMatchesWithIndex,
  benchmarkMatching,
  getGlobalProgramIndex,
  invalidateGlobalProgramIndex,
  type OptimizedMatcherConfig,
  type OptimizedMatchResult,
  type OptimizedMatchStats,
  type FallbackTier
} from './optimized-matcher'

// V10: Enhanced Match Result (extends base with V10 fields)
export {
  enhanceMatchResult,
  enhanceMatchResults,
  serializeEnhancedResult,
  serializeEnhancedResults,
  isEnhancedMatchResult,
  type EnhancedMatchResult,
  type EnhanceMatchConfig,
  type FitQualityBreakdown
} from './enhanced-match-result'

// V10: Metrics and Observability
export {
  recordMatchingMetrics,
  getAggregatedMetrics,
  resetMetrics,
  getRawMetrics,
  createMatchingMetrics,
  checkAlgorithmHealth,
  METRICS_CONSTANTS,
  type MatchingMetrics,
  type AggregatedMetrics,
  type HealthCheckResult
} from './matching-metrics'

// Types
export type {
  // Course types
  CourseLevel,
  IBGrade,
  CoreGrade,
  StudentCourse,
  SubjectRequirement,
  ORGroupRequirement,
  // Profiles
  StudentProfile,
  ProgramRequirements,
  ProgramType,
  // Match scores
  FieldMatchScore,
  LocationMatchScore,
  AcademicMatchScore,
  SubjectMatchDetail,
  // Weights
  WeightConfig,
  MatchingMode,
  // Input/Output
  MatchInput,
  MatchResult,
  MatchAdjustments
} from './types'

// Constants
export { WEIGHT_CONFIGS } from './types'

// Helpers
export { normalizeWeights, getWeights } from './types'
