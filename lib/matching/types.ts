/**
 * Matching Algorithm Types
 *
 * These types define the inputs, outputs, and configurations for the
 * university program matching algorithm.
 *
 * Based on: DOC_2_matching-algo IX.md
 */

// ============================================
// COURSE AND SUBJECT TYPES
// ============================================

/** IB course level (Higher Level or Standard Level) */
export type CourseLevel = 'HL' | 'SL'

/** IB grade (1-7 scale) */
export type IBGrade = 1 | 2 | 3 | 4 | 5 | 6 | 7

/** TOK/EE grade (A-E scale) */
export type CoreGrade = 'A' | 'B' | 'C' | 'D' | 'E'

/** Student's course with grade */
export interface StudentCourse {
  courseId: string
  courseName: string
  level: CourseLevel
  grade: IBGrade
}

/** Program's subject requirement */
export interface SubjectRequirement {
  courseId: string
  courseName: string
  level: CourseLevel
  minimumGrade: IBGrade
  isCritical: boolean // e.g., required Math, Physics for Engineering
}

/** OR-group requirement (e.g., "Physics HL 5 OR Chemistry HL 5") */
export interface ORGroupRequirement {
  options: SubjectRequirement[]
  isCritical: boolean
}

// ============================================
// STUDENT PROFILE
// ============================================

/** Student's complete profile for matching */
export interface StudentProfile {
  /** Student's IB courses with grades */
  courses: StudentCourse[]

  /** Student's total IB points (0-45) */
  totalIBPoints: number

  /** Theory of Knowledge grade */
  tokGrade: CoreGrade

  /** Extended Essay grade */
  eeGrade: CoreGrade

  /** Preferred fields of study (IDs) */
  interestedFields: string[]

  /** Preferred countries (IDs) */
  preferredCountries: string[]
}

// ============================================
// PROGRAM REQUIREMENTS
// ============================================

/** Program type based on requirements */
export type ProgramType = 'FULL_REQUIREMENTS' | 'POINTS_ONLY' | 'SUBJECTS_ONLY'

/** University program with requirements */
export interface ProgramRequirements {
  programId: string
  programName: string
  universityId: string
  universityName: string

  /** Program type */
  type: ProgramType

  /** Field of study ID */
  fieldId: string

  /** Country ID */
  countryId: string

  /** Minimum IB points required (if applicable) */
  minimumIBPoints?: number

  /** Required subjects */
  requiredSubjects: SubjectRequirement[]

  /** OR-group requirements */
  orGroupRequirements: ORGroupRequirement[]
}

// ============================================
// MATCH SCORES
// ============================================

/** Field match score (F_M) */
export interface FieldMatchScore {
  /** Score from 0 to 1 */
  score: number

  /** Whether student's field preferences include this program's field */
  isMatch: boolean

  /** Student has no field preferences */
  noPreferences: boolean
}

/** Location match score (L_M) */
export interface LocationMatchScore {
  /** Score from 0 to 1 */
  score: number

  /** Whether student's country preferences include this program's country */
  isMatch: boolean

  /** Student has no location preferences */
  noPreferences: boolean
}

/** Subject match detail for a single requirement */
export interface SubjectMatchDetail {
  requirement: SubjectRequirement | ORGroupRequirement
  score: number // 0 to 1
  status: 'FULL_MATCH' | 'PARTIAL_MATCH' | 'NO_MATCH'
  reason?: string // e.g., "Grade 1 point below", "Level mismatch (SL vs HL)"
  /** The actual courseId that produced the best match (for OR-groups) */
  matchedCourseId?: string
  /** Human-readable name of the matched course (for display) */
  matchedCourseName?: string
}

/** Academic match score (G_M) */
export interface AcademicMatchScore {
  /** Overall academic match score from 0 to 1 */
  score: number

  /** Subject requirements match score (average of all subject scores) */
  subjectsMatchScore: number

  /** Whether student meets IB points requirement */
  meetsPointsRequirement: boolean

  /** Points shortfall if any */
  pointsShortfall: number

  /** Individual subject match details */
  subjectMatches: SubjectMatchDetail[]

  /** Number of missing critical subjects */
  missingCriticalCount: number

  /** Number of missing non-critical subjects */
  missingNonCriticalCount: number
}

// ============================================
// WEIGHT CONFIGURATION
// ============================================

/** Matching mode weight configurations */
export interface WeightConfig {
  /** Academic match weight (w_G) */
  academic: number

  /** Location match weight (w_L) */
  location: number

  /** Field match weight (w_F) */
  field: number
}

/** Predefined matching modes */
export type MatchingMode = 'BALANCED' | 'ACADEMIC_FOCUSED' | 'LOCATION_FOCUSED'

/** Default weight configurations for each mode */
export const WEIGHT_CONFIGS: Record<MatchingMode, WeightConfig> = {
  BALANCED: {
    academic: 0.6,
    location: 0.3,
    field: 0.1
  },
  ACADEMIC_FOCUSED: {
    academic: 0.8,
    location: 0.1,
    field: 0.1
  },
  LOCATION_FOCUSED: {
    academic: 0.4,
    location: 0.5,
    field: 0.1
  }
}

// ============================================
// MATCH INPUT AND RESULT
// ============================================

/** Input for matching calculation */
export interface MatchInput {
  /** Student profile */
  student: StudentProfile

  /** Program requirements */
  program: ProgramRequirements

  /** Weight configuration (defaults to BALANCED) */
  weights?: WeightConfig

  /** Matching mode (alternative to specifying weights) */
  mode?: MatchingMode
}

/** Complete match result with all components */
export interface MatchResult {
  /** Program ID */
  programId: string

  /** Overall match score (0 to 1) */
  overallScore: number

  /** Academic match details */
  academicMatch: AcademicMatchScore

  /** Location match details */
  locationMatch: LocationMatchScore

  /** Field match details */
  fieldMatch: FieldMatchScore

  /** Weights used in calculation */
  weightsUsed: WeightConfig

  /** Any caps or penalties applied */
  adjustments: MatchAdjustments
}

/** Adjustments applied to the match score */
export interface MatchAdjustments {
  /** Raw weighted score before adjustments */
  rawScore: number

  /** Final score after adjustments */
  finalScore: number

  /** Caps applied */
  caps: {
    missingCriticalSubject?: number // e.g., 0.45
    missingNonCriticalSubject?: number // e.g., 0.70
    criticalNearMiss?: number // e.g., 0.80
    unmetRequirements?: number // e.g., 0.90
  }

  /** Penalty factor for multiple missing/low requirements */
  multipleRequirementsPenalty?: number

  /** Non-academic score floor applied */
  nonAcademicFloor?: number

  /** Minimum score guarantee applied */
  minimumScoreGuarantee?: number

  /** Reasons for adjustments */
  reasons: string[]
}

// ============================================
// HELPER TYPES
// ============================================

/** Normalized weights (ensure they sum to 1.0) */
export function normalizeWeights(weights: WeightConfig): WeightConfig {
  const sum = weights.academic + weights.location + weights.field
  return {
    academic: weights.academic / sum,
    location: weights.location / sum,
    field: weights.field / sum
  }
}

/** Get weights for a specific mode or use custom weights */
export function getWeights(mode?: MatchingMode, customWeights?: WeightConfig): WeightConfig {
  if (customWeights) {
    return normalizeWeights(customWeights)
  }
  return WEIGHT_CONFIGS[mode || 'BALANCED']
}
