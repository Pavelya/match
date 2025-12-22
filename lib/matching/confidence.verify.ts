/**
 * Confidence Scoring Tests
 *
 * Run with: npx tsx lib/matching/confidence.verify.ts
 */

import {
  calculateConfidence,
  getConfidenceLevel,
  getConfidenceLevelInfo,
  createQuickConfidence,
  CONFIDENCE_CONSTANTS,
  type ConfidenceInput
} from './confidence'

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

function testRange(
  name: string,
  min: number,
  max: number,
  actual: number,
  priority: 'P0' | 'P1' = 'P0'
): void {
  const passed = actual >= min - 0.001 && actual <= max + 0.001
  results.push({
    name,
    passed,
    expected: `${min.toFixed(2)}-${max.toFixed(2)}`,
    actual: actual.toFixed(3),
    priority
  })
}

console.log('\n🧪 Confidence Scoring Verification Tests\n')
console.log('='.repeat(70))

// ============================================
// Test 1: All data complete, verified program
// ============================================

console.log('\n📋 Complete Data Tests:\n')

const completeInput: ConfidenceInput = {
  gradesAreFinal: true,
  totalSubjectsEntered: 6,
  hasCompleteProfile: true,
  requirementsVerified: true,
  hasPointsRequirement: true,
  subjectRequirementCount: 3
}

const complete = calculateConfidence(completeInput)
test('Complete: score = 1.0', 1.0, complete.score)
test('Complete: level = high', 'high', complete.level)
test('Complete: no factors', 0, complete.factors.length)

// ============================================
// Test 2: Predicted grades (not final)
// ============================================

console.log('\n📋 Predicted Grades Tests:\n')

const predictedInput: ConfidenceInput = {
  ...completeInput,
  gradesAreFinal: false
}

const predicted = calculateConfidence(predictedInput)
testRange('Predicted: score ~0.92', 0.9, 0.95, predicted.score, 'P1')
test('Predicted: level = high', 'high', predicted.level)
test('Predicted: has factors', true, predicted.factors.length > 0)
test(
  'Predicted: has PREDICTED_GRADES factor',
  true,
  predicted.factors.some((f) => f.type === 'PREDICTED_GRADES')
)

// ============================================
// Test 3: Missing some subject grades
// ============================================

console.log('\n📋 Missing Subjects Tests:\n')

const missingSubjectsInput: ConfidenceInput = {
  ...completeInput,
  totalSubjectsEntered: 4 // Missing 2
}

const missingSubjects = calculateConfidence(missingSubjectsInput)
testRange('Missing subjects: score ~0.90', 0.85, 0.95, missingSubjects.score, 'P1')
test(
  'Missing subjects: has factor',
  true,
  missingSubjects.factors.some((f) => f.type === 'MISSING_SUBJECT_GRADES')
)

// ============================================
// Test 4: Incomplete program requirements
// ============================================

console.log('\n📋 Unverified Requirements Tests:\n')

const unverifiedInput: ConfidenceInput = {
  ...completeInput,
  requirementsVerified: false
}

const unverified = calculateConfidence(unverifiedInput)
testRange('Unverified: score ~0.88', 0.85, 0.92, unverified.score, 'P1')
test(
  'Unverified: has factor',
  true,
  unverified.factors.some((f) => f.type === 'UNVERIFIED_REQUIREMENTS')
)

// ============================================
// Test 5: Multiple data gaps → low confidence
// ============================================

console.log('\n📋 Multiple Gaps Tests:\n')

const multipleGapsInput: ConfidenceInput = {
  gradesAreFinal: false,
  totalSubjectsEntered: 2, // Missing 4
  hasCompleteProfile: false,
  requirementsVerified: false,
  hasPointsRequirement: false,
  subjectRequirementCount: 0
}

const multipleGaps = calculateConfidence(multipleGapsInput)
test('Multiple gaps: score < 0.70', true, multipleGaps.score < 0.7, 'P1')
test('Multiple gaps: level = low', 'low', multipleGaps.level, 'P1')
test('Multiple gaps: multiple factors', true, multipleGaps.factors.length >= 3)

// ============================================
// Test 6: Factors array populated correctly
// ============================================

console.log('\n📋 Factors Array Tests:\n')

test(
  'Factors: each has type',
  true,
  multipleGaps.factors.every((f) => !!f.type)
)
test(
  'Factors: each has impact',
  true,
  multipleGaps.factors.every((f) => f.impact > 0)
)
test(
  'Factors: each has description',
  true,
  multipleGaps.factors.every((f) => !!f.description)
)

// ============================================
// Test 7: Level thresholds
// ============================================

console.log('\n📋 Level Threshold Tests:\n')

test('Level: 1.0 = high', 'high', getConfidenceLevel(1.0))
test('Level: 0.85 = high', 'high', getConfidenceLevel(0.85))
test('Level: 0.84 = medium', 'medium', getConfidenceLevel(0.84))
test('Level: 0.65 = medium', 'medium', getConfidenceLevel(0.65))
test('Level: 0.64 = low', 'low', getConfidenceLevel(0.64))
test('Level: 0.30 = low', 'low', getConfidenceLevel(0.3))

// ============================================
// Test 8: Level info
// ============================================

console.log('\n📋 Level Info Tests:\n')

const highInfo = getConfidenceLevelInfo('high')
test('Level info: high has label', 'High Confidence', highInfo.label)
test('Level info: high has color', 'green', highInfo.color)

const mediumInfo = getConfidenceLevelInfo('medium')
test('Level info: medium has label', 'Medium Confidence', mediumInfo.label)
test('Level info: medium has color', 'amber', mediumInfo.color)

const lowInfo = getConfidenceLevelInfo('low')
test('Level info: low has label', 'Low Confidence', lowInfo.label)
test('Level info: low has color', 'red', lowInfo.color)

// ============================================
// Test 9: Quick confidence helpers
// ============================================

console.log('\n📋 Quick Confidence Tests:\n')

const quickComplete = createQuickConfidence('complete')
test('Quick complete: score = 1.0', 1.0, quickComplete.score)
test('Quick complete: level = high', 'high', quickComplete.level)

const quickPredicted = createQuickConfidence('predicted')
test('Quick predicted: level = high', 'high', quickPredicted.level)

const quickPartial = createQuickConfidence('partial')
test(
  'Quick partial: level = medium or high',
  true,
  quickPartial.level === 'medium' || quickPartial.level === 'high'
)

const quickMinimal = createQuickConfidence('minimal')
test('Quick minimal: level = low', 'low', quickMinimal.level)

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
// Factor Impact Summary
// ============================================

console.log('\n📊 Factor Impacts:')
console.log(
  `   PREDICTED_GRADES:        -${(CONFIDENCE_CONSTANTS.FACTOR_IMPACTS.PREDICTED_GRADES * 100).toFixed(0)}%`
)
console.log(
  `   MISSING_SUBJECT_GRADES:  -${(CONFIDENCE_CONSTANTS.FACTOR_IMPACTS.MISSING_SUBJECT_GRADES * 100).toFixed(0)}% per subject`
)
console.log(
  `   INCOMPLETE_PROFILE:      -${(CONFIDENCE_CONSTANTS.FACTOR_IMPACTS.INCOMPLETE_PROFILE * 100).toFixed(0)}%`
)
console.log(
  `   UNVERIFIED_REQUIREMENTS: -${(CONFIDENCE_CONSTANTS.FACTOR_IMPACTS.UNVERIFIED_REQUIREMENTS * 100).toFixed(0)}%`
)
console.log(
  `   OUTDATED_REQUIREMENTS:   -${(CONFIDENCE_CONSTANTS.FACTOR_IMPACTS.OUTDATED_REQUIREMENTS * 100).toFixed(0)}%`
)
console.log(
  `   FEW_DATA_POINTS:         -${(CONFIDENCE_CONSTANTS.FACTOR_IMPACTS.FEW_DATA_POINTS * 100).toFixed(0)}%`
)

console.log('\n📊 Level Thresholds:')
console.log(`   HIGH:   >= ${(CONFIDENCE_CONSTANTS.HIGH_THRESHOLD * 100).toFixed(0)}%`)
console.log(`   MEDIUM: >= ${(CONFIDENCE_CONSTANTS.MEDIUM_THRESHOLD * 100).toFixed(0)}%`)
console.log(`   LOW:    < ${(CONFIDENCE_CONSTANTS.MEDIUM_THRESHOLD * 100).toFixed(0)}%`)

console.log('\n✅ Verification complete.\n')
