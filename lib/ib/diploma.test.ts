import { describe, expect, it } from 'vitest'
import { CORE_FAILING_MESSAGE } from './core-points'
import {
  calculateTotalPoints,
  checkHigherLevelCount,
  getSaveBlocker,
  validateDiploma,
  type NamedDiplomaCourse
} from './diploma'

/** Six subjects, the first `hlCount` at Higher Level, every grade `grade`. */
function subjects(hlCount: number, grade = 6): NamedDiplomaCourse[] {
  return Array.from({ length: 6 }, (_, i) => ({
    courseName: `Subject ${i + 1}`,
    level: i < hlCount ? 'HL' : 'SL',
    grade
  }))
}

describe('calculateTotalPoints', () => {
  it('adds the matrix core points to six subject grades', () => {
    // The task's check: six subjects totalling 36, TOK B and EE C → 38.
    expect(calculateTotalPoints(subjects(3), 'B', 'C')).toBe(38)
    expect(calculateTotalPoints(subjects(3, 7), 'A', 'A')).toBe(45)
    expect(calculateTotalPoints(subjects(3), 'D', 'D')).toBe(36)
  })

  it('is null until six subjects and both core grades are in', () => {
    expect(calculateTotalPoints(subjects(3).slice(0, 5), 'A', 'A')).toBeNull()
    expect(calculateTotalPoints(subjects(3), 'A', null)).toBeNull()
  })

  it('is null when the core fails', () => {
    expect(calculateTotalPoints(subjects(3), 'E', 'A')).toBeNull()
  })
})

describe('checkHigherLevelCount', () => {
  it.each([
    [2, 'Take 3 or 4 subjects at Higher Level (you have 2).'],
    [3, null],
    [4, null],
    [5, 'Take 3 or 4 subjects at Higher Level (you have 5).']
  ])('%i HL subjects → %s', (hlCount, expected) => {
    expect(checkHigherLevelCount(subjects(hlCount))).toBe(expected)
  })

  it('waits for all six subjects', () => {
    expect(checkHigherLevelCount(subjects(2).slice(0, 4))).toBeNull()
  })
})

describe('getSaveBlocker', () => {
  it('blocks an E in either core grade', () => {
    expect(getSaveBlocker(subjects(3), 'E', 'A')).toBe(CORE_FAILING_MESSAGE)
    expect(getSaveBlocker(subjects(3), 'A', 'E')).toBe(CORE_FAILING_MESSAGE)
  })

  it('blocks six subjects without 3 or 4 at Higher Level', () => {
    expect(getSaveBlocker(subjects(2), 'A', 'A')).toMatch(/you have 2/)
  })

  it('lets a valid profile through', () => {
    expect(getSaveBlocker(subjects(3), 'A', 'A')).toBeNull()
    expect(getSaveBlocker(subjects(4), 'D', 'D')).toBeNull()
  })
})

describe('validateDiploma', () => {
  it('passes three or four HL subjects', () => {
    expect(validateDiploma(subjects(3), 'B', 'C')).toEqual({ isValid: true, failingReasons: [] })
    expect(validateDiploma(subjects(4), 'B', 'C').isValid).toBe(true)
  })

  // Two HL subjects at 7 used to pass: 14 HL points clears the 12-point floor.
  it('fails two HL subjects even with 14 HL points', () => {
    const result = validateDiploma(subjects(2, 7), 'A', 'A')
    expect(result.isValid).toBe(false)
    expect(result.failingReasons).toEqual(['Take 3 or 4 subjects at Higher Level (you have 2).'])
  })

  // One SL subject also misses the 9-point SL floor, but the HL count is the reason to show.
  it('fails five HL subjects', () => {
    expect(validateDiploma(subjects(5), 'A', 'A').failingReasons).toContain(
      'Take 3 or 4 subjects at Higher Level (you have 5).'
    )
  })

  it('fails an E in the core with one message', () => {
    expect(validateDiploma(subjects(3), 'E', 'E').failingReasons).toEqual([CORE_FAILING_MESSAGE])
  })

  it('counts the core points from the matrix towards the 24-point floor', () => {
    // 22 subject points (HL 4 4 4, SL 4 3 3): TOK B / EE C adds 2, reaching 24; the old
    // onboarding formula added 1.
    const courses = subjects(3, 4).map((c, i) => (i >= 4 ? { ...c, grade: 3 } : c))
    expect(validateDiploma(courses, 'B', 'C').isValid).toBe(true)
    expect(validateDiploma(courses, 'C', 'C').failingReasons).toEqual([
      'Total points below 24 results in diploma failure (you have 23)'
    ])
  })

  it('waits for six subjects and both core grades', () => {
    expect(validateDiploma(subjects(2).slice(0, 5), 'E', 'E').isValid).toBe(true)
    expect(validateDiploma(subjects(2), 'A', null).isValid).toBe(true)
  })
})
