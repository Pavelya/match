import { describe, expect, it } from 'vitest'
import {
  calculateConfidence,
  getConfidenceLevel,
  getConfidenceLevelInfo,
  createQuickConfidence,
  type ConfidenceInput
} from './confidence'

/** Inclusive, with the 0.001 slack the old script allowed at both ends. */
function expectBetween(actual: number, min: number, max: number) {
  expect(actual).toBeGreaterThanOrEqual(min - 0.001)
  expect(actual).toBeLessThanOrEqual(max + 0.001)
}

const completeInput: ConfidenceInput = {
  gradesAreFinal: true,
  totalSubjectsEntered: 6,
  hasCompleteProfile: true,
  requirementsVerified: true,
  hasPointsRequirement: true,
  subjectRequirementCount: 3
}

describe('complete data, verified program', () => {
  const complete = calculateConfidence(completeInput)

  it('Complete: score = 1.0', () => {
    expect(complete.score).toBe(1.0)
  })

  it('Complete: level = high', () => {
    expect(complete.level).toBe('high')
  })

  it('Complete: no factors', () => {
    expect(complete.factors.length).toBe(0)
  })
})

describe('predicted grades', () => {
  const predicted = calculateConfidence({ ...completeInput, gradesAreFinal: false })

  it('Predicted: score ~0.92', () => {
    expectBetween(predicted.score, 0.9, 0.95)
  })

  it('Predicted: level = high', () => {
    expect(predicted.level).toBe('high')
  })

  it('Predicted: has factors', () => {
    expect(predicted.factors.length > 0).toBe(true)
  })

  it('Predicted: has PREDICTED_GRADES factor', () => {
    expect(predicted.factors.some((f) => f.type === 'PREDICTED_GRADES')).toBe(true)
  })
})

describe('missing subject grades', () => {
  const missingSubjects = calculateConfidence({
    ...completeInput,
    totalSubjectsEntered: 4 // Missing 2
  })

  it('Missing subjects: score ~0.90', () => {
    expectBetween(missingSubjects.score, 0.85, 0.95)
  })

  it('Missing subjects: has factor', () => {
    expect(missingSubjects.factors.some((f) => f.type === 'MISSING_SUBJECT_GRADES')).toBe(true)
  })
})

describe('unverified requirements', () => {
  const unverified = calculateConfidence({ ...completeInput, requirementsVerified: false })

  it('Unverified: score ~0.88', () => {
    expectBetween(unverified.score, 0.85, 0.92)
  })

  it('Unverified: has factor', () => {
    expect(unverified.factors.some((f) => f.type === 'UNVERIFIED_REQUIREMENTS')).toBe(true)
  })
})

describe('multiple data gaps', () => {
  const multipleGaps = calculateConfidence({
    gradesAreFinal: false,
    totalSubjectsEntered: 2, // Missing 4
    hasCompleteProfile: false,
    requirementsVerified: false,
    hasPointsRequirement: false,
    subjectRequirementCount: 0
  })

  it('Multiple gaps: score < 0.70', () => {
    expect(multipleGaps.score).toBeLessThan(0.7)
  })

  it('Multiple gaps: level = low', () => {
    expect(multipleGaps.level).toBe('low')
  })

  it('Multiple gaps: multiple factors', () => {
    expect(multipleGaps.factors.length).toBeGreaterThanOrEqual(3)
  })

  it('Factors: each has type', () => {
    expect(multipleGaps.factors.every((f) => !!f.type)).toBe(true)
  })

  it('Factors: each has impact', () => {
    expect(multipleGaps.factors.every((f) => f.impact > 0)).toBe(true)
  })

  it('Factors: each has description', () => {
    expect(multipleGaps.factors.every((f) => !!f.description)).toBe(true)
  })
})

describe('level thresholds', () => {
  it.each([
    [1.0, 'high'],
    [0.85, 'high'],
    [0.84, 'medium'],
    [0.65, 'medium'],
    [0.64, 'low'],
    [0.3, 'low']
  ] as const)('Level: %s = %s', (score, level) => {
    expect(getConfidenceLevel(score)).toBe(level)
  })
})

describe('level info', () => {
  it.each([
    ['high', 'High Confidence', 'green'],
    ['medium', 'Medium Confidence', 'amber'],
    ['low', 'Low Confidence', 'red']
  ] as const)('Level info: %s has label %s and color %s', (level, label, color) => {
    const info = getConfidenceLevelInfo(level)
    expect(info.label).toBe(label)
    expect(info.color).toBe(color)
  })
})

describe('quick confidence', () => {
  it('Quick complete: score = 1.0 and level = high', () => {
    const quickComplete = createQuickConfidence('complete')
    expect(quickComplete.score).toBe(1.0)
    expect(quickComplete.level).toBe('high')
  })

  it('Quick predicted: level = high', () => {
    expect(createQuickConfidence('predicted').level).toBe('high')
  })

  it('Quick partial: level = medium or high', () => {
    expect(['medium', 'high']).toContain(createQuickConfidence('partial').level)
  })

  it('Quick minimal: level = low', () => {
    expect(createQuickConfidence('minimal').level).toBe('low')
  })
})
