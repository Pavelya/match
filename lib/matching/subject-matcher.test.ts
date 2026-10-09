import { describe, expect, it } from 'vitest'
import { calculateORGroupMatch, calculateSubjectMatch } from './subject-matcher'
import type { CourseLevel, IBGrade, StudentCourse, SubjectRequirement } from './types'

/*
 * The display fields the subject matcher adds for the new cards (rebranding 2.1): `kind`,
 * `gradeGap`, `studentLevel` and `studentGrade`. Scores are covered by subject-matcher.verify.ts.
 */

const req = (
  courseId: string,
  level: CourseLevel,
  minimumGrade: IBGrade,
  isCritical = false
): SubjectRequirement => ({ courseId, courseName: courseId, level, minimumGrade, isCritical })

const took = (courseId: string, level: CourseLevel, grade: IBGrade): StudentCourse => ({
  courseId,
  courseName: courseId,
  level,
  grade
})

describe('calculateSubjectMatch display fields', () => {
  it('met: the level and grade, and no gap', () => {
    expect(calculateSubjectMatch(req('maths', 'HL', 6), [took('maths', 'HL', 7)])).toMatchObject({
      status: 'FULL_MATCH',
      kind: 'met',
      gradeGap: 0,
      studentLevel: 'HL',
      studentGrade: 7
    })
  })

  it('met with HL for an SL requirement carries the student’s HL', () => {
    expect(calculateSubjectMatch(req('maths', 'SL', 6), [took('maths', 'HL', 6)])).toMatchObject({
      kind: 'met',
      studentLevel: 'HL',
      studentGrade: 6
    })
  })

  it('grade short: how many grades below', () => {
    expect(calculateSubjectMatch(req('maths', 'HL', 7), [took('maths', 'HL', 5)])).toMatchObject({
      status: 'PARTIAL_MATCH',
      kind: 'grade_short',
      gradeGap: 2,
      studentLevel: 'HL',
      studentGrade: 5
    })
  })

  it('SL where HL is required is a level gap, with any grade gap beside it', () => {
    expect(calculateSubjectMatch(req('chem', 'HL', 5), [took('chem', 'SL', 6)])).toMatchObject({
      status: 'PARTIAL_MATCH',
      kind: 'level_short',
      gradeGap: 0,
      studentLevel: 'SL',
      studentGrade: 6
    })
    expect(calculateSubjectMatch(req('chem', 'HL', 6), [took('chem', 'SL', 5)])).toMatchObject({
      kind: 'level_short',
      gradeGap: 1
    })
  })

  it('not taken: no student values', () => {
    const detail = calculateSubjectMatch(req('bio', 'HL', 5), [took('maths', 'HL', 7)])
    expect(detail).toMatchObject({ status: 'NO_MATCH', kind: 'not_taken' })
    expect(detail.gradeGap).toBeUndefined()
    expect(detail.studentLevel).toBeUndefined()
    expect(detail.studentGrade).toBeUndefined()
  })
})

describe('calculateORGroupMatch display fields', () => {
  const group = { options: [req('phys', 'HL', 6), req('chem', 'HL', 6)], isCritical: false }

  it('carries the matched course’s values', () => {
    expect(calculateORGroupMatch(group, [took('chem', 'HL', 5)])).toMatchObject({
      kind: 'grade_short',
      gradeGap: 1,
      studentLevel: 'HL',
      studentGrade: 5,
      matchedCourseId: 'chem'
    })
  })

  it('takes the option the student meets when one course is accepted at two levels', () => {
    const englishB = { options: [req('engb', 'HL', 4), req('engb', 'SL', 5)], isCritical: false }
    expect(calculateORGroupMatch(englishB, [took('engb', 'SL', 5)])).toMatchObject({
      status: 'FULL_MATCH',
      kind: 'met',
      gradeGap: 0,
      studentLevel: 'SL'
    })
  })

  it('none taken: not taken, with no student values', () => {
    const detail = calculateORGroupMatch(group, [took('bio', 'HL', 7)])
    expect(detail).toMatchObject({ status: 'NO_MATCH', kind: 'not_taken' })
    expect(detail.studentGrade).toBeUndefined()
  })
})
