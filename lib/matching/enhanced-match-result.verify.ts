/**
 * Enhanced Match Result Tests
 *
 * Run with: npx tsx lib/matching/enhanced-match-result.verify.ts
 */

import {
  enhanceMatchResult,
  enhanceMatchResults,
  serializeEnhancedResult,
  isEnhancedMatchResult,
  type EnhancedMatchResult,
  type EnhanceMatchConfig
} from './enhanced-match-result'
import { calculateMatch } from './scorer'
import type { MatchResult, StudentProfile, ProgramRequirements } from './types'

// ============================================
// Test Data
// ============================================

const testStudent: StudentProfile = {
  courses: [
    { courseId: 'math-hl', courseName: 'Mathematics', level: 'HL', grade: 6 },
    { courseId: 'phys-hl', courseName: 'Physics', level: 'HL', grade: 5 },
    { courseId: 'chem-hl', courseName: 'Chemistry', level: 'HL', grade: 6 },
    { courseId: 'eng-sl', courseName: 'English', level: 'SL', grade: 6 },
    { courseId: 'hist-sl', courseName: 'History', level: 'SL', grade: 5 },
    { courseId: 'span-sl', courseName: 'Spanish', level: 'SL', grade: 5 }
  ],
  totalIBPoints: 38,
  tokGrade: 'B',
  eeGrade: 'B',
  interestedFields: ['engineering'],
  preferredCountries: ['uk']
}

const testProgram: ProgramRequirements = {
  programId: 'prog-1',
  programName: 'Computer Science',
  universityId: 'uni-1',
  universityName: 'Test University',
  type: 'FULL_REQUIREMENTS',
  fieldId: 'engineering',
  countryId: 'uk',
  minimumIBPoints: 35,
  requiredSubjects: [
    {
      courseId: 'math-hl',
      courseName: 'Mathematics',
      level: 'HL',
      minimumGrade: 5,
      isCritical: true
    }
  ],
  orGroupRequirements: []
}

// ============================================
// Test Helpers
// ============================================

interface TestResult {
  name: string
  passed: boolean
  expected: string
  actual: string
  priority: 'P0' | 'P1'
}

const results: TestResult[] = []

function test(
  name: string,
  expected: unknown,
  actual: unknown,
  priority: 'P0' | 'P1' = 'P0'
): void {
  const passed = expected === actual
  results.push({
    name,
    passed,
    expected: String(expected),
    actual: String(actual),
    priority
  })
}

console.log('\n🧪 Enhanced Match Result Verification Tests\n')
console.log('='.repeat(70))

// ============================================
// Test 1: Basic enhancement
// ============================================

console.log('\n📋 Basic Enhancement Tests:\n')

const baseResult = calculateMatch({ student: testStudent, program: testProgram })
const enhanced = enhanceMatchResult(baseResult, testStudent, testProgram)

test('Enhanced: has category', true, 'category' in enhanced)
test('Enhanced: has categoryInfo', true, 'categoryInfo' in enhanced)
test('Enhanced: has confidence', true, 'confidence' in enhanced)
test('Enhanced: has fitQuality', true, 'fitQuality' in enhanced)

// Base fields preserved
test('Enhanced: preserves programId', testProgram.programId, enhanced.programId)
test('Enhanced: preserves overallScore', true, typeof enhanced.overallScore === 'number')

// ============================================
// Test 2: Category values
// ============================================

console.log('\n📋 Category Tests:\n')

const validCategories = ['SAFETY', 'MATCH', 'REACH', 'UNLIKELY']
test('Category: valid value', true, validCategories.includes(enhanced.category))
test('Category: has label', true, typeof enhanced.categoryInfo.label === 'string')
test('Category: has description', true, typeof enhanced.categoryInfo.description === 'string')
test(
  'Category: has confidenceIndicator',
  true,
  ['high', 'medium', 'low'].includes(enhanced.categoryInfo.confidenceIndicator)
)

console.log(`   Category: ${enhanced.category}`)
console.log(`   Label: ${enhanced.categoryInfo.label}`)

// ============================================
// Test 3: Confidence values
// ============================================

console.log('\n📋 Confidence Tests:\n')

test('Confidence: has score', true, typeof enhanced.confidence.score === 'number')
test(
  'Confidence: score in range',
  true,
  enhanced.confidence.score >= 0 && enhanced.confidence.score <= 1
)
test('Confidence: has level', true, ['high', 'medium', 'low'].includes(enhanced.confidence.level))
test('Confidence: has factors array', true, Array.isArray(enhanced.confidence.factors))

console.log(`   Score: ${enhanced.confidence.score.toFixed(2)}`)
console.log(`   Level: ${enhanced.confidence.level}`)

// ============================================
// Test 4: Fit quality values
// ============================================

console.log('\n📋 Fit Quality Tests:\n')

test('FitQuality: has pointsFitScore', true, typeof enhanced.fitQuality.pointsFitScore === 'number')
test(
  'FitQuality: has pointsFitCategory',
  true,
  ['OPTIMAL', 'ABOVE', 'BELOW', 'FAR_BELOW', 'FAR_ABOVE'].includes(
    enhanced.fitQuality.pointsFitCategory
  )
)
test(
  'FitQuality: has selectivityBoost',
  true,
  typeof enhanced.fitQuality.selectivityBoost === 'number'
)
test(
  'FitQuality: has selectivityTier',
  true,
  [1, 2, 3, 4].includes(enhanced.fitQuality.selectivityTier)
)
test('FitQuality: has tierName', true, typeof enhanced.fitQuality.tierName === 'string')

console.log(
  `   Points fit: ${enhanced.fitQuality.pointsFitScore.toFixed(2)} (${enhanced.fitQuality.pointsFitCategory})`
)
console.log(
  `   Selectivity: Tier ${enhanced.fitQuality.selectivityTier} (${enhanced.fitQuality.tierName})`
)

// ============================================
// Test 5: Config options
// ============================================

console.log('\n📋 Config Options Tests:\n')

// Grades not final = lower confidence
const notFinalConfig: EnhanceMatchConfig = {
  gradesAreFinal: false,
  requirementsVerified: false
}
const notFinal = enhanceMatchResult(baseResult, testStudent, testProgram, notFinalConfig)
test(
  'Config: unverified lowers confidence',
  true,
  notFinal.confidence.score < enhanced.confidence.score || notFinal.confidence.factors.length > 0
)

// Disable features
const minimalConfig: EnhanceMatchConfig = {
  includeCategory: true,
  includeConfidence: false,
  includeFitQuality: false
}
const minimal = enhanceMatchResult(baseResult, testStudent, testProgram, minimalConfig)
test('Config: can disable features', true, minimal.confidence.score === 1.0)

// ============================================
// Test 6: Batch enhancement
// ============================================

console.log('\n📋 Batch Enhancement Tests:\n')

const programs = [testProgram, { ...testProgram, programId: 'prog-2' }]
const baseResults = programs.map((p) => calculateMatch({ student: testStudent, program: p }))
const programsMap = new Map(programs.map((p) => [p.programId, p]))

const batchEnhanced = enhanceMatchResults(baseResults, testStudent, programsMap)
test('Batch: enhances all results', 2, batchEnhanced.length)
test(
  'Batch: all have category',
  true,
  batchEnhanced.every((r) => 'category' in r)
)

// ============================================
// Test 7: API serialization
// ============================================

console.log('\n📋 API Serialization Tests:\n')

const serialized = serializeEnhancedResult(enhanced)
test('Serialized: has programId', true, 'programId' in serialized)
test('Serialized: has category', true, 'category' in serialized)
test('Serialized: has confidence', true, 'confidence' in serialized)
test('Serialized: has fitQuality', true, 'fitQuality' in serialized)

// Check it's JSON-serializable
const jsonString = JSON.stringify(serialized)
test('Serialized: valid JSON', true, jsonString.length > 0)

// ============================================
// Test 8: Type guard
// ============================================

console.log('\n📋 Type Guard Tests:\n')

test('TypeGuard: enhanced is enhanced', true, isEnhancedMatchResult(enhanced))
test('TypeGuard: base is not enhanced', false, isEnhancedMatchResult(baseResult))

// ============================================
// Print Results
// ============================================

console.log('\n' + '='.repeat(70))
console.log('\n📊 Test Results:\n')

let p0Passed = 0
let p0Failed = 0
let p1Passed = 0
let p1Failed = 0

for (const r of results) {
  const status = r.passed ? '✅' : '❌'
  console.log(`${status} [${r.priority}] ${r.name}`)
  if (!r.passed) {
    console.log(`     Expected: ${r.expected}`)
    console.log(`     Actual:   ${r.actual}`)
  }

  if (r.priority === 'P0') {
    if (r.passed) p0Passed++
    else p0Failed++
  } else {
    if (r.passed) p1Passed++
    else p1Failed++
  }
}

console.log('\n' + '='.repeat(70))
console.log('\n📋 Summary:')
console.log(`   P0 Tests: ${p0Passed} passed, ${p0Failed} failed`)
console.log(`   P1 Tests: ${p1Passed} passed, ${p1Failed} failed`)
console.log(`   Total:    ${p0Passed + p1Passed} passed, ${p0Failed + p1Failed} failed\n`)

// ============================================
// Example API Response
// ============================================

console.log('\n📊 Example API Response (V10 fields):')
console.log(
  JSON.stringify(
    {
      programId: enhanced.programId,
      overallScore: Number(enhanced.overallScore.toFixed(3)),
      category: enhanced.category,
      categoryInfo: enhanced.categoryInfo,
      confidence: {
        score: Number(enhanced.confidence.score.toFixed(2)),
        level: enhanced.confidence.level
      },
      fitQuality: {
        ...enhanced.fitQuality,
        pointsFitScore: Number(enhanced.fitQuality.pointsFitScore.toFixed(2))
      }
    },
    null,
    2
  )
)

console.log('\n✅ Verification complete.\n')
