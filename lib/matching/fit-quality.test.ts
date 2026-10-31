import { describe, expect, it } from 'vitest'
import {
  calculatePointsFitQuality,
  getFitQualityCategory,
  FIT_QUALITY_CONSTANTS
} from './fit-quality'

/*
 * The behaviour specified in DOC_2_matching-algo X.md and the migration plan's Task 1.2.
 */

const { OPTIMAL_BUFFER } = FIT_QUALITY_CONSTANTS

describe('calculatePointsFitQuality', () => {
  it.each([
    // From the migration plan
    { name: 'Exact optimal (+3 buffer)', studentPoints: 43, requiredPoints: 40, expected: 1.0 },
    { name: 'Exactly meeting requirement', studentPoints: 40, requiredPoints: 40, expected: 0.95 },
    { name: 'Minimum threshold', studentPoints: 24, requiredPoints: 40, expected: 0.3 },
    {
      name: 'Student exactly at minimum diploma',
      studentPoints: 24,
      requiredPoints: 24,
      expected: 0.95
    }
  ])('$name: $studentPoints pts for $requiredPoints is $expected', (tc) => {
    expect(
      Math.abs(calculatePointsFitQuality(tc.studentPoints, tc.requiredPoints) - tc.expected)
    ).toBeLessThan(0.001)
  })

  it.each([
    // At 45 pts for 40 req the optimum is 43, so 45 is 2 above it: the over-qualification
    // penalty takes it to 0.80
    {
      name: 'Slightly over (+5, 2 above optimal)',
      studentPoints: 45,
      requiredPoints: 40,
      min: 0.8,
      max: 0.85
    },
    { name: 'Significantly over (+15)', studentPoints: 45, requiredPoints: 30, min: 0.8, max: 0.9 },
    { name: 'Near miss (-2)', studentPoints: 38, requiredPoints: 40, min: 0.8, max: 0.9 },
    { name: 'Far miss (-10)', studentPoints: 30, requiredPoints: 40, min: 0.5, max: 0.6 },
    {
      name: 'High requirement (44 points)',
      studentPoints: 45,
      requiredPoints: 44,
      min: 0.95,
      max: 1.0
    },
    {
      name: 'Low requirement (25 points)',
      studentPoints: 45,
      requiredPoints: 25,
      min: 0.8,
      max: 0.85
    }
  ])('$name: $studentPoints pts for $requiredPoints is $min–$max', (tc) => {
    const score = calculatePointsFitQuality(tc.studentPoints, tc.requiredPoints)
    expect(score).toBeGreaterThanOrEqual(tc.min)
    expect(score).toBeLessThanOrEqual(tc.max)
  })

  it('1 pt above > 1 pt below', () => {
    expect(calculatePointsFitQuality(41, 40)).toBeGreaterThan(calculatePointsFitQuality(39, 40))
  })

  it('scores increase monotonically from 24 points to the optimum (req=38)', () => {
    const requiredPoints = 38
    let prevScore = 0
    for (let pts = 24; pts <= requiredPoints + OPTIMAL_BUFFER; pts++) {
      const score = calculatePointsFitQuality(pts, requiredPoints)
      // Allow tiny floating point errors
      expect(score, `${pts} pts`).toBeGreaterThanOrEqual(prevScore - 0.001)
      prevScore = score
    }
  })
})

describe('getFitQualityCategory', () => {
  // The old script printed these without counting them, so they are asserted for the first time.
  it.each([
    { pts: 30, req: 40, expected: 'FAR_BELOW' },
    { pts: 38, req: 40, expected: 'BELOW' },
    { pts: 40, req: 40, expected: 'OPTIMAL' },
    { pts: 42, req: 40, expected: 'OPTIMAL' },
    { pts: 45, req: 40, expected: 'ABOVE' },
    { pts: 45, req: 30, expected: 'FAR_ABOVE' }
  ])('$pts pts for $req is $expected', ({ pts, req, expected }) => {
    expect(getFitQualityCategory(pts, req)).toBe(expected)
  })
})
