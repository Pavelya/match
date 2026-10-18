import { describe, expect, it } from 'vitest'
import { CORE_FAILING_MESSAGE } from './core-points'
import {
  calculateTotalPoints,
  checkDiploma,
  checkHigherLevelCount,
  validateDiploma,
  type NamedDiplomaCourse
} from './diploma'

/** Six subjects, the first `hlCount` at Higher Level, every grade `grade`. */
function subjects(hlCount: number, grade = 6): NamedDiplomaCourse[] {
  return Array.from({ length: 6 }, (_, i) => ({
    courseId: `course-${i + 1}`,
    courseName: `Subject ${i + 1}`,
    level: i < hlCount ? 'HL' : 'SL',
    grade
  }))
}

/** Subjects with these Higher Level grades, then these Standard Level grades. */
function graded(hl: number[], sl: number[]): NamedDiplomaCourse[] {
  return [
    ...hl.map((grade) => ({ level: 'HL', grade })),
    ...sl.map((grade) => ({ level: 'SL', grade }))
  ].map((c, i) => ({ ...c, courseId: `course-${i + 1}`, courseName: `Subject ${i + 1}` }))
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

describe('checkDiploma', () => {
  it('passes a diploma the IB would award, with its total', () => {
    expect(checkDiploma(subjects(3), 'B', 'C')).toEqual({ reasons: [], conditions: [], total: 38 })
    expect(checkDiploma(subjects(4), 'D', 'D').total).toBe(36)
  })

  it('blocks an E in either core grade', () => {
    expect(checkDiploma(subjects(3), 'E', 'A').reasons).toEqual([CORE_FAILING_MESSAGE])
    expect(checkDiploma(subjects(3), 'A', 'E')).toEqual({
      reasons: [CORE_FAILING_MESSAGE],
      conditions: [],
      total: null
    })
  })

  it('gives the core, the Higher Level count, then the others', () => {
    // HL 7 7, SL 2 2 2 2: four 2s, four grades of 3 or below, and an E adds no core points
    const courses = graded([7, 7], [2, 2, 2, 2])
    expect(checkDiploma(courses, 'E', 'A').reasons).toEqual([
      CORE_FAILING_MESSAGE,
      'Take 3 or 4 subjects at Higher Level (you have 2).',
      'Have no more than two grades of 2 (you have 4).',
      'Have no more than three grades of 3 or below (you have 4).',
      'Your Standard Level grades need 9 points or more (you have 8).',
      'Your total needs to be 24 or more (you have 22).'
    ])
    expect(checkDiploma(courses, 'E', 'A').conditions).toEqual([
      'Have no more than two grades of 2 (you have 4).',
      'Have no more than three grades of 3 or below (you have 4).',
      'Your Standard Level grades need 9 points or more (you have 8).',
      'Your total needs to be 24 or more (you have 22).'
    ])
  })

  describe('four Higher Level subjects: the three highest grades count', () => {
    // 34 points before the core: refused until 16 October 2026, which summed all four against 12
    // and both SL grades against 9
    it('passes HL 7 7 6 6 with SL 4 4', () => {
      expect(checkDiploma(graded([7, 7, 6, 6], [4, 4]), 'B', 'C')).toEqual({
        reasons: [],
        conditions: [],
        total: 36
      })
    })

    it('fails HL 7 7 6 6 with SL 2 2: 4 points against 5', () => {
      expect(checkDiploma(graded([7, 7, 6, 6], [2, 2]), 'B', 'C').reasons).toEqual([
        'Your two Standard Level grades need 5 points or more (you have 4).'
      ])
    })

    // 13 from all four used to pass
    it('fails HL 4 4 3 2 with 11 from the three best', () => {
      expect(checkDiploma(graded([4, 4, 3, 2], [6, 6]), 'B', 'C').reasons).toEqual([
        'Your three best Higher Level grades need 12 points or more (you have 11).'
      ])
    })

    it('passes exactly 12 from the three best, and exactly 5 at Standard Level', () => {
      expect(checkDiploma(graded([4, 4, 4, 3], [6, 6]), 'B', 'C').reasons).toEqual([])
      expect(checkDiploma(graded([7, 7, 7, 6], [3, 2]), 'B', 'C').reasons).toEqual([])
    })
  })

  describe('three and three, unchanged', () => {
    it('fails 8 points at Standard Level', () => {
      expect(checkDiploma(graded([6, 6, 6], [3, 3, 2]), 'B', 'C').reasons).toEqual([
        'Your Standard Level grades need 9 points or more (you have 8).'
      ])
    })

    it('fails 11 points at Higher Level', () => {
      expect(checkDiploma(graded([4, 4, 3], [6, 6, 6]), 'B', 'C').reasons).toEqual([
        'Your Higher Level grades need 12 points or more (you have 11).'
      ])
    })
  })

  // The words D3.6 approved (14 October 2026), shared by every form that shows them
  it('names the subjects with a 1', () => {
    const courses = subjects(3).map((c, i) =>
      i === 1 ? { ...c, courseName: 'Physics', grade: 1 } : c
    )
    expect(checkDiploma(courses, 'B', 'C').reasons).toEqual([
      'No subject can have a 1 (you have a 1 in Physics).'
    ])
    const two = courses.map((c, i) => (i === 4 ? { ...c, courseName: 'Chemistry', grade: 1 } : c))
    expect(checkDiploma(two, 'B', 'C').reasons[0]).toBe(
      'No subject can have a 1 (you have a 1 in Physics and Chemistry).'
    )
  })

  it('counts 2s and grades of 3 or below', () => {
    // HL 7 7 7, SL 2 2 2: three 2s, and three grades of 3 or below is still allowed
    expect(checkDiploma(graded([7, 7, 7], [2, 2, 2]), 'A', 'A').reasons).toEqual([
      'Have no more than two grades of 2 (you have 3).',
      'Your Standard Level grades need 9 points or more (you have 6).'
    ])
    expect(checkDiploma(graded([7, 7, 3], [3, 3, 3]), 'A', 'A').reasons).toContain(
      'Have no more than three grades of 3 or below (you have 4).'
    )
  })

  it('says what each points floor needs and what the student has', () => {
    // HL 4 4 3 = 11, SL 4 4 3 = 11, core C/D = 0: 22 in all
    expect(checkDiploma(graded([4, 4, 3], [4, 4, 3]), 'C', 'D').reasons).toEqual([
      'Your Higher Level grades need 12 points or more (you have 11).',
      'Your total needs to be 24 or more (you have 22).'
    ])
  })

  it('counts the core points from the matrix towards the 24-point floor', () => {
    // 22 subject points (HL 4 4 4, SL 4 3 3): TOK B / EE C adds 2, reaching 24; the old
    // onboarding formula added 1.
    const courses = graded([4, 4, 4], [4, 3, 3])
    expect(checkDiploma(courses, 'B', 'C').total).toBe(24)
    expect(checkDiploma(courses, 'C', 'C').reasons).toEqual([
      'Your total needs to be 24 or more (you have 23).'
    ])
  })

  describe('refuses grades that are not a diploma’s shape, alone', () => {
    it.each([
      ['a grade of 0', 0, 'Choose a grade from 1 to 7 for every subject.'],
      ['a grade of 8', 8, 'Choose a grade from 1 to 7 for every subject.'],
      ['a grade of 6.5', 6.5, 'Choose a grade from 1 to 7 for every subject.']
    ])('%s', (_, grade, reason) => {
      const courses = subjects(3).map((c, i) => (i === 0 ? { ...c, grade } : c))
      expect(checkDiploma(courses, 'B', 'C')).toEqual({
        reasons: [reason],
        conditions: [],
        total: null
      })
    })

    it('an unknown level', () => {
      const courses = subjects(3).map((c, i) => (i === 0 ? { ...c, level: 'XL' } : c))
      expect(checkDiploma(courses, 'B', 'C').reasons).toEqual([
        'Choose SL or HL for every subject.'
      ])
    })

    it('a repeated subject', () => {
      const courses = subjects(3).map((c, i) => (i === 5 ? { ...c, courseId: 'course-1' } : c))
      expect(checkDiploma(courses, 'B', 'C').reasons).toEqual(['Choose each subject only once.'])
    })

    it('five subjects, or seven', () => {
      expect(checkDiploma(subjects(3).slice(0, 5), 'B', 'C').reasons).toEqual([
        'Choose six subjects (you have 5).'
      ])
      const seven = [...subjects(3), { ...subjects(3)[0], courseId: 'course-7' }]
      expect(checkDiploma(seven, 'B', 'C').reasons).toEqual(['Choose six subjects (you have 7).'])
    })

    it('a core grade missing or not A to E', () => {
      expect(checkDiploma(subjects(3), 'B', null).reasons).toEqual([
        'Choose TOK and Extended Essay grades from A to E.'
      ])
      expect(checkDiploma(subjects(3), 'F', 'C').reasons).toEqual([
        'Choose TOK and Extended Essay grades from A to E.'
      ])
    })
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

  it('takes the corrected floors', () => {
    expect(validateDiploma(graded([7, 7, 6, 6], [4, 4]), 'B', 'C').isValid).toBe(true)
    expect(validateDiploma(graded([4, 4, 3, 2], [6, 6]), 'B', 'C').failingReasons).toEqual([
      'Your three best Higher Level grades need 12 points or more (you have 11).'
    ])
  })

  it('waits for six subjects and both core grades', () => {
    expect(validateDiploma(subjects(2).slice(0, 5), 'E', 'E').isValid).toBe(true)
    expect(validateDiploma(subjects(2), 'A', null).isValid).toBe(true)
  })
})
