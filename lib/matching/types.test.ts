/**
 * Test file to verify matching types compile correctly
 */

import type {
  StudentProfile,
  ProgramRequirements,
  MatchInput,
  MatchResult,
  WeightConfig
} from './types'
import { getWeights, normalizeWeights } from './types'

// Test 1: Student Profile compilation
const testStudent: StudentProfile = {
  courses: [
    { courseId: '1', courseName: 'Biology', level: 'HL', grade: 7 },
    { courseId: '2', courseName: 'Chemistry', level: 'HL', grade: 6 },
    { courseId: '3', courseName: 'Math', level: 'HL', grade: 7 },
    { courseId: '4', courseName: 'English', level: 'SL', grade: 7 },
    { courseId: '5', courseName: 'Spanish', level: 'SL', grade: 6 },
    { courseId: '6', courseName: 'Economics', level: 'SL', grade: 7 }
  ],
  totalIBPoints: 42,
  tokGrade: 'A',
  eeGrade: 'B',
  interestedFields: ['field-engineering', 'field-medicine'],
  preferredCountries: ['country-usa', 'country-uk']
}

// Test 2: Program Requirements compilation
const testProgram: ProgramRequirements = {
  programId: 'prog-1',
  programName: 'Engineering',
  universityId: 'uni-1',
  universityName: 'MIT',
  type: 'FULL_REQUIREMENTS',
  fieldId: 'field-engineering',
  countryId: 'country-usa',
  minimumIBPoints: 40,
  requiredSubjects: [
    {
      courseId: '2',
      courseName: 'Math',
      level: 'HL',
      minimumGrade: 6,
      isCritical: true
    }
  ],
  orGroupRequirements: [
    {
      options: [
        { courseId: '1', courseName: 'Physics', level: 'HL', minimumGrade: 6, isCritical: true },
        { courseId: '2', courseName: 'Chemistry', level: 'HL', minimumGrade: 6, isCritical: true }
      ],
      isCritical: true
    }
  ]
}

// Test 3: Weight configuration
const testWeights: WeightConfig = {
  academic: 0.6,
  location: 0.3,
  field: 0.1
}

// Test 4: Helper functions
const balancedWeights = getWeights('BALANCED')
const _customWeights = normalizeWeights({ academic: 60, location: 30, field: 10 })

// Test 5: Match Input compilation
const testMatchInput: MatchInput = {
  student: testStudent,
  program: testProgram,
  mode: 'BALANCED'
}

// Test 6: Match Result compilation
const testMatchResult: MatchResult = {
  programId: 'prog-1',
  overallScore: 0.92,
  academicMatch: {
    score: 0.95,
    subjectsMatchScore: 1.0,
    meetsPointsRequirement: true,
    pointsShortfall: 0,
    subjectMatches: [
      {
        requirement: testProgram.requiredSubjects[0],
        score: 1.0,
        status: 'FULL_MATCH'
      }
    ],
    missingCriticalCount: 0,
    missingNonCriticalCount: 0
  },
  locationMatch: {
    score: 1.0,
    isMatch: true,
    noPreferences: false
  },
  fieldMatch: {
    score: 1.0,
    isMatch: true,
    noPreferences: false
  },
  weightsUsed: balancedWeights,
  adjustments: {
    rawScore: 0.92,
    finalScore: 0.92,
    caps: {},
    reasons: []
  }
}

// Export for testing
export { testStudent, testProgram, testWeights, testMatchInput, testMatchResult }
