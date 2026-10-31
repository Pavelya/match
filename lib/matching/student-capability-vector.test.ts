import { describe, expect, it } from 'vitest'
import {
  createStudentCapabilityVector,
  createEmptyCapabilityVector,
  canMeetRequirements,
  measureLookupPerformance
} from './student-capability-vector'
import type { StudentCourse } from './types'

const testCourses: StudentCourse[] = [
  { courseId: 'math-hl', courseName: 'Mathematics', level: 'HL', grade: 6 },
  { courseId: 'phys-hl', courseName: 'Physics', level: 'HL', grade: 5 },
  { courseId: 'chem-hl', courseName: 'Chemistry', level: 'HL', grade: 7 },
  { courseId: 'eng-sl', courseName: 'English', level: 'SL', grade: 6 },
  { courseId: 'hist-sl', courseName: 'History', level: 'SL', grade: 5 },
  { courseId: 'span-sl', courseName: 'Spanish', level: 'SL', grade: 4 }
]

const vector = createStudentCapabilityVector(testCourses)

describe('getSubject', () => {
  it('Get Math HL: found, with its name, level and grade', () => {
    const mathHL = vector.getSubject('Mathematics', 'HL')
    expect(mathHL).not.toBe(null)
    expect(mathHL?.courseName).toBe('Mathematics')
    expect(mathHL?.level).toBe('HL')
    expect(mathHL?.grade).toBe(6)
  })

  it('Get math (lowercase) HL: found', () => {
    expect(vector.getSubject('mathematics', 'HL')).not.toBe(null)
  })

  it('Get Biology HL: not found', () => {
    expect(vector.getSubject('Biology', 'HL')).toBe(null)
  })

  it('Get Math SL when has HL: not found', () => {
    expect(vector.getSubject('Mathematics', 'SL')).toBe(null)
  })
})

describe('getSubjectAnyLevel', () => {
  it('Get Math any level: prefers HL', () => {
    const mathAny = vector.getSubjectAnyLevel('Mathematics')
    expect(mathAny).not.toBe(null)
    expect(mathAny?.level).toBe('HL')
  })

  it('Get English any level: returns SL (only option)', () => {
    const engAny = vector.getSubjectAnyLevel('English')
    expect(engAny).not.toBe(null)
    expect(engAny?.level).toBe('SL')
  })

  it('Get Biology any level: not found', () => {
    expect(vector.getSubjectAnyLevel('Biology')).toBe(null)
  })
})

describe('hasSubject and hasSubjectAtLevel', () => {
  it.each([
    ['Mathematics', true],
    ['Biology', false]
  ])('hasSubject %s: %s', (name, expected) => {
    expect(vector.hasSubject(name)).toBe(expected)
  })

  it.each([
    ['Mathematics', 'HL', true],
    ['Mathematics', 'SL', false],
    ['English', 'SL', true],
    ['Biology', 'HL', false]
  ] as const)('hasSubjectAtLevel %s %s: %s', (name, level, expected) => {
    expect(vector.hasSubjectAtLevel(name, level)).toBe(expected)
  })
})

describe('meetsRequirement', () => {
  it.each([
    ['Mathematics', 5, true], // has 6
    ['Mathematics', 6, true], // has 6
    ['Mathematics', 7, false], // has 6
    ['Chemistry', 7, true], // has 7
    ['Biology', 5, false] // missing
  ] as const)('Meets %s HL %s: %s', (name, grade, expected) => {
    expect(vector.meetsRequirement(name, 'HL', grade)).toBe(expected)
  })
})

describe('computed properties', () => {
  it('counts and maxima', () => {
    expect(vector.hlCount).toBe(3)
    expect(vector.slCount).toBe(3)
    expect(vector.maxHLGrade).toBe(7)
    expect(vector.maxSLGrade).toBe(6)
    expect(vector.courses.length).toBe(6)
  })

  it('averageGrade: 5.5', () => {
    // (6+5+7+6+5+4)/6 = 33/6 = 5.5
    expect(vector.averageGrade).toBe((6 + 5 + 7 + 6 + 5 + 4) / 6)
  })
})

describe('createEmptyCapabilityVector', () => {
  it('has no subjects, no counts and no maximum', () => {
    const empty = createEmptyCapabilityVector()
    expect(empty.getSubject('Math', 'HL')).toBe(null)
    expect(empty.hasSubject('Math')).toBe(false)
    expect(empty.hlCount).toBe(0)
    expect(empty.slCount).toBe(0)
    expect(empty.maxHLGrade).toBe(null)
  })
})

describe('canMeetRequirements', () => {
  it('Can meet Math HL + Physics HL: true', () => {
    expect(
      canMeetRequirements(vector, [
        { name: 'Mathematics', level: 'HL' },
        { name: 'Physics', level: 'HL' }
      ])
    ).toBe(true)
  })

  it('Can meet Math HL + Biology HL: false', () => {
    expect(
      canMeetRequirements(vector, [
        { name: 'Mathematics', level: 'HL' },
        { name: 'Biology', level: 'HL' }
      ])
    ).toBe(false)
  })
})

describe('performance', () => {
  it('Performance: 1000 lookups < 10ms', () => {
    expect(measureLookupPerformance(vector, 1000).totalMs).toBeLessThan(10)
  })
})
