/**
 * Fit Quality Score (FQS) Tests
 *
 * These tests verify the behavior specified in DOC_2_matching-algo X.md
 * and the migration plan Task 1.2.
 *
 * Run with: npx ts-node lib/matching/fit-quality.verify.ts
 */

import {
  calculatePointsFitQuality,
  getFitQualityCategory,
  FIT_QUALITY_CONSTANTS
} from './fit-quality'

const { OPTIMAL_BUFFER } = FIT_QUALITY_CONSTANTS

interface TestCase {
  name: string
  studentPoints: number
  requiredPoints: number
  expectedScore?: number
  expectedMin?: number
  expectedMax?: number
  priority: 'P0' | 'P1'
}

const testCases: TestCase[] = [
  // P0 Tests from migration plan
  {
    name: 'Exact optimal (+3 buffer)',
    studentPoints: 43,
    requiredPoints: 40,
    expectedScore: 1.0,
    priority: 'P0'
  },
  {
    name: 'Exactly meeting requirement',
    studentPoints: 40,
    requiredPoints: 40,
    expectedScore: 0.95,
    priority: 'P0'
  },
  {
    name: 'Slightly over (+5, 2 above optimal)',
    studentPoints: 45,
    requiredPoints: 40,
    // At 45 pts for 40 req: optimal is 43, so 45 is 2 above optimal
    // This triggers over-qualification penalty to 0.80
    expectedMin: 0.8,
    expectedMax: 0.85,
    priority: 'P0'
  },
  {
    name: 'Significantly over (+15)',
    studentPoints: 45,
    requiredPoints: 30,
    expectedMin: 0.8,
    expectedMax: 0.9,
    priority: 'P0'
  },
  {
    name: 'Near miss (-2)',
    studentPoints: 38,
    requiredPoints: 40,
    expectedMin: 0.8,
    expectedMax: 0.9,
    priority: 'P0'
  },

  // P1 Tests
  {
    name: 'Far miss (-10)',
    studentPoints: 30,
    requiredPoints: 40,
    expectedMin: 0.5,
    expectedMax: 0.6,
    priority: 'P1'
  },
  {
    name: 'Minimum threshold',
    studentPoints: 24,
    requiredPoints: 40,
    expectedScore: 0.3,
    priority: 'P1'
  },

  // Edge cases
  {
    name: 'High requirement (44 points)',
    studentPoints: 45,
    requiredPoints: 44,
    expectedMin: 0.95,
    expectedMax: 1.0,
    priority: 'P1'
  },
  {
    name: 'Low requirement (25 points)',
    studentPoints: 45,
    requiredPoints: 25,
    expectedMin: 0.8,
    expectedMax: 0.85,
    priority: 'P1'
  },
  {
    name: 'Student exactly at minimum diploma',
    studentPoints: 24,
    requiredPoints: 24,
    expectedScore: 0.95,
    priority: 'P1'
  }
]

function runTests(): void {
  console.log('\n🧪 Fit Quality Score (FQS) Verification Tests\n')
  console.log('='.repeat(70))

  let passedCount = 0
  let failedCount = 0
  const failures: string[] = []

  for (const tc of testCases) {
    const score = calculatePointsFitQuality(tc.studentPoints, tc.requiredPoints)
    let passed = false

    if (tc.expectedScore !== undefined) {
      passed = Math.abs(score - tc.expectedScore) < 0.001
    } else if (tc.expectedMin !== undefined && tc.expectedMax !== undefined) {
      passed = score >= tc.expectedMin && score <= tc.expectedMax
    }

    const status = passed ? '✅' : '❌'
    const expectedStr =
      tc.expectedScore !== undefined
        ? tc.expectedScore.toFixed(2)
        : `${tc.expectedMin?.toFixed(2)}-${tc.expectedMax?.toFixed(2)}`

    console.log(
      `${status} [${tc.priority}] ${tc.name.padEnd(35)} | ` +
        `${tc.studentPoints} pts, ${tc.requiredPoints} req | ` +
        `Got: ${score.toFixed(3)} | Expected: ${expectedStr}`
    )

    if (passed) {
      passedCount++
    } else {
      failedCount++
      failures.push(tc.name)
    }
  }

  console.log('\n' + '='.repeat(70))

  // Test: 1 pt above vs 1 pt below (P0)
  console.log('\n📊 Comparative Tests:\n')

  const scoreAbove = calculatePointsFitQuality(41, 40)
  const scoreBelow = calculatePointsFitQuality(39, 40)
  const aboveGtBelow = scoreAbove > scoreBelow

  console.log(
    `${aboveGtBelow ? '✅' : '❌'} [P0] 1 pt above > 1 pt below: ` +
      `${scoreAbove.toFixed(3)} > ${scoreBelow.toFixed(3)}`
  )
  if (aboveGtBelow) passedCount++
  else {
    failedCount++
    failures.push('1 pt above > 1 pt below')
  }

  // Test: Monotonicity (P1)
  console.log('\n📈 Monotonicity Test (24-45 pts, req=38):')
  const requiredPoints = 38
  const optimalPoints = requiredPoints + OPTIMAL_BUFFER
  let prevScore = 0
  let monotonicUntilOptimal = true

  for (let pts = 24; pts <= optimalPoints; pts++) {
    const score = calculatePointsFitQuality(pts, requiredPoints)
    if (score < prevScore - 0.001) {
      // Allow tiny floating point errors
      monotonicUntilOptimal = false
      console.log(
        `   ❌ Score decreased: ${pts - 1}pts (${prevScore.toFixed(3)}) -> ${pts}pts (${score.toFixed(3)})`
      )
    }
    prevScore = score
  }

  console.log(
    `${monotonicUntilOptimal ? '✅' : '❌'} [P1] Scores increase monotonically from 24 to ${optimalPoints} pts`
  )
  if (monotonicUntilOptimal) passedCount++
  else {
    failedCount++
    failures.push('Monotonicity check')
  }

  // Summary
  console.log('\n' + '='.repeat(70))
  console.log(`\n📋 Summary: ${passedCount} passed, ${failedCount} failed\n`)

  if (failures.length > 0) {
    console.log('❌ Failed tests:')
    for (const f of failures) {
      console.log(`   - ${f}`)
    }
  }

  // Category test
  console.log('\n📌 Fit Quality Categories:')
  const categories = [
    { pts: 30, req: 40, expected: 'FAR_BELOW' },
    { pts: 38, req: 40, expected: 'BELOW' },
    { pts: 40, req: 40, expected: 'OPTIMAL' },
    { pts: 42, req: 40, expected: 'OPTIMAL' },
    { pts: 45, req: 40, expected: 'ABOVE' },
    { pts: 45, req: 30, expected: 'FAR_ABOVE' }
  ]

  for (const cat of categories) {
    const result = getFitQualityCategory(cat.pts, cat.req)
    const passed = result === cat.expected
    console.log(
      `   ${passed ? '✅' : '❌'} ${cat.pts}pts / ${cat.req}req -> ${result} (expected: ${cat.expected})`
    )
  }

  // Score distribution visualization
  console.log('\n📊 Score Distribution (req=38):')
  console.log('   Points | Score | Category')
  console.log('   -------|-------|----------')
  for (let pts = 24; pts <= 45; pts += 3) {
    const score = calculatePointsFitQuality(pts, 38)
    const cat = getFitQualityCategory(pts, 38)
    const bar = '█'.repeat(Math.round(score * 20))
    console.log(`   ${pts.toString().padStart(6)} | ${score.toFixed(2)}  | ${bar} ${cat}`)
  }

  console.log('\n✅ Verification complete.\n')
}

// Run if executed directly
runTests()
