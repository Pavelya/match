import { describe, expect, it } from 'vitest'
import { calculateORGroupMatch } from './subject-matcher'
import type {
  CourseLevel,
  IBGrade,
  ORGroupRequirement,
  StudentCourse,
  SubjectRequirement
} from './types'

/*
 * The OR-group display fix: `matchedCourseId` and `matchedCourseName` name the option the
 * student actually took, and the reason names it too.
 */

const took = (
  courseId: string,
  courseName: string,
  level: CourseLevel,
  grade: IBGrade
): StudentCourse => ({ courseId, courseName, level, grade })

const option = (courseId: string, courseName: string): SubjectRequirement => ({
  courseId,
  courseName,
  level: 'HL',
  minimumGrade: 5,
  isCritical: true
})

const group = (...options: SubjectRequirement[]): ORGroupRequirement => ({
  options,
  isCritical: true
})

const BIOLOGY = option('bio-hl', 'Biology')
const COMPUTER_SCIENCE = option('cs-hl', 'Computer Science')
const ECONOMICS = option('econ-hl', 'Economics')

describe('calculateORGroupMatch display', () => {
  it('Full match: Computer Science, not Biology', () => {
    const result = calculateORGroupMatch(group(BIOLOGY, COMPUTER_SCIENCE, ECONOMICS), [
      took('cs-hl', 'Computer Science', 'HL', 6)
    ])
    expect(result.status).toBe('FULL_MATCH')
    expect(result.score).toBe(1.0)
    expect(result.matchedCourseId).toBe('cs-hl')
    expect(result.matchedCourseName).toBe('Computer Science')
    expect(result.reason?.includes('Computer Science') ?? false).toBe(true)
    expect(result.reason?.includes('Biology') ?? true).toBe(false)
  })

  it('Partial match: SL instead of HL', () => {
    // Requires HL but the student has SL
    const result = calculateORGroupMatch(group(BIOLOGY, option('cs-sl', 'Computer Science')), [
      took('cs-sl', 'Computer Science', 'SL', 6)
    ])
    expect(result.status).toBe('PARTIAL_MATCH')
    expect(result.matchedCourseId).toBe('cs-sl')
    expect(result.matchedCourseName).toBe('Computer Science')
  })

  it('No match: the student has different subjects', () => {
    const result = calculateORGroupMatch(group(BIOLOGY, COMPUTER_SCIENCE), [
      took('hist-sl', 'History', 'SL', 6)
    ])
    expect(result.status).toBe('NO_MATCH')
    expect(result.score).toBe(0.0)
    expect(result.matchedCourseId).toBe(undefined)
    expect(result.matchedCourseName).toBe(undefined)
    expect(result.reason?.includes('None of the OR options met') ?? false).toBe(true)
  })

  it('Low grade: tracks the matched course even when the grade is low', () => {
    // Below the minimum of 5
    const result = calculateORGroupMatch(group(BIOLOGY, COMPUTER_SCIENCE), [
      took('cs-hl', 'Computer Science', 'HL', 4)
    ])
    expect(result.status).toBe('PARTIAL_MATCH')
    expect(result.matchedCourseId).toBe('cs-hl')
    expect(result.reason?.includes('Computer Science') ?? false).toBe(true)
  })

  it('Empty OR-group: handled gracefully', () => {
    const result = calculateORGroupMatch(group(), [])
    expect(result.status).toBe('NO_MATCH')
    expect(result.score).toBe(0.0)
  })

  it('Single option OR-group', () => {
    const result = calculateORGroupMatch(group(COMPUTER_SCIENCE), [
      took('cs-hl', 'Computer Science', 'HL', 6)
    ])
    expect(result.status).toBe('FULL_MATCH')
    expect(result.matchedCourseId).toBe('cs-hl')
    expect(result.matchedCourseName).toBe('Computer Science')
  })

  it('Multiple matching courses: the first full match wins', () => {
    const result = calculateORGroupMatch(group(BIOLOGY, COMPUTER_SCIENCE), [
      took('bio-hl', 'Biology', 'HL', 5),
      took('cs-hl', 'Computer Science', 'HL', 7)
    ])
    expect(result.status).toBe('FULL_MATCH')
    expect(result.score).toBe(1.0)
    // The algorithm stops at the first full match, Biology here
    expect(result.matchedCourseId).toBe('bio-hl')
  })
})
