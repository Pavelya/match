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
  invalidateStudentCache,
  invalidateProgramCache,
  clearAllMatchCache,
  getCacheStats
} from './cache'

// Component matchers (for testing/debugging)
export { calculateFieldMatch } from './field-matcher'
export { calculateLocationMatch } from './location-matcher'
export { calculateAcademicMatch } from './academic-matcher'
export { calculateSubjectMatch, calculateORGroupMatch } from './subject-matcher'
export { applyPenaltiesAndCaps } from './penalties'

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
