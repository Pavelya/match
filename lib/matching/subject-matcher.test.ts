import { describe, expect, it } from 'vitest'
import { calculateORGroupMatch, calculateSubjectMatch } from './subject-matcher'
import type {
  CourseLevel,
  IBGrade,
  ORGroupRequirement,
  StudentCourse,
  SubjectRequirement
} from './types'

/*
 * The display fields the subject matcher adds for the new cards (rebranding 2.1): `kind`,
 * `gradeGap`, `studentLevel` and `studentGrade`; then the scores, from the matching suite's old
 * subject-matcher.verify.ts.
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

describe('scores', () => {
  // The student every score below is for
  const studentCourses: StudentCourse[] = [
    { courseId: 'bio', courseName: 'Biology', level: 'HL', grade: 7 },
    { courseId: 'chem', courseName: 'Chemistry', level: 'HL', grade: 6 },
    { courseId: 'math', courseName: 'Math', level: 'HL', grade: 5 },
    { courseId: 'eng', courseName: 'English', level: 'SL', grade: 7 },
    { courseId: 'spa', courseName: 'Spanish', level: 'SL', grade: 6 },
    { courseId: 'econ', courseName: 'Economics', level: 'SL', grade: 4 }
  ]

  // === Test 1: Full Matches ===

  it('Full match: exact level and grade met', () => {
    const req: SubjectRequirement = {
      courseId: 'bio',
      courseName: 'Biology',
      level: 'HL',
      minimumGrade: 6,
      isCritical: true
    }
    const result = calculateSubjectMatch(req, studentCourses)
    expect(result.score).toBe(1.0)
    expect(result.status).toBe('FULL_MATCH')
  })

  it('Full match: student grade exceeds requirement', () => {
    const req: SubjectRequirement = {
      courseId: 'bio',
      courseName: 'Biology',
      level: 'HL',
      minimumGrade: 5,
      isCritical: false
    }
    const result = calculateSubjectMatch(req, studentCourses)
    expect(result.score).toBe(1.0)
    expect(result.status).toBe('FULL_MATCH')
  })

  it('Full match: HL student for SL requirement', () => {
    const req: SubjectRequirement = {
      courseId: 'eng',
      courseName: 'English',
      level: 'SL',
      minimumGrade: 6,
      isCritical: false
    }
    // Student has English SL 7, which meets SL 6
    const result = calculateSubjectMatch(req, studentCourses)
    expect(result.score).toBe(1.0)
    expect(result.status).toBe('FULL_MATCH')
  })

  // === Test 2: No Match (Subject Not Taken) ===

  it('No match: student did not take physics', () => {
    const req: SubjectRequirement = {
      courseId: 'phys',
      courseName: 'Physics',
      level: 'HL',
      minimumGrade: 6,
      isCritical: true
    }
    const result = calculateSubjectMatch(req, studentCourses)
    expect(result.score).toBe(0.0)
    expect(result.status).toBe('NO_MATCH')
  })

  // === Test 3: Grade Shortfall (Same Level) ===

  it('Grade shortfall: critical subject, 1 point below → 0.85', () => {
    const req: SubjectRequirement = {
      courseId: 'math',
      courseName: 'Math',
      level: 'HL',
      minimumGrade: 6,
      isCritical: true
    }
    // Student has Math HL 5, requirement is 6
    const result = calculateSubjectMatch(req, studentCourses)
    expect(result.score).toBe(0.85)
    expect(result.status).toBe('PARTIAL_MATCH')
  })

  it('Grade shortfall: non-critical subject, 1 point below → ~0.78', () => {
    const req: SubjectRequirement = {
      courseId: 'spa',
      courseName: 'Spanish',
      level: 'SL',
      minimumGrade: 7,
      isCritical: false
    }
    // Student has Spanish SL 6, requirement is 7
    const result = calculateSubjectMatch(req, studentCourses)
    expect(result.score).toBe(0.78)
    expect(result.status).toBe('PARTIAL_MATCH')
  })

  it('Grade shortfall: 2 points below → proportional score', () => {
    const req: SubjectRequirement = {
      courseId: 'econ',
      courseName: 'Economics',
      level: 'SL',
      minimumGrade: 7,
      isCritical: false
    }
    // Student has Economics SL 4, requirement is 7 (3 points below)
    // This tests larger gap scores
    const result = calculateSubjectMatch(req, studentCourses)
    expect(result.score).toBeGreaterThan(0.25) // At least minimum
    expect(result.score).toBeLessThan(0.78) // Less than 1-point shortfall
    expect(result.status).toBe('PARTIAL_MATCH')
  })

  it('Grade shortfall: minimum floor of 0.25', () => {
    // A 1 against a required 7: the formula gives 0, so the floor decides. This test used to be
    // 3 points short, which scores 0.45 and never reached the floor
    const result = calculateSubjectMatch(req('econ', 'SL', 7), [took('econ', 'SL', 1)])
    expect(result.score).toBe(0.25)
    expect(result.status).toBe('PARTIAL_MATCH')
  })

  // === Test 4: Level Mismatch (SL for HL) ===

  it('Level mismatch: SL 7 for HL 6 requirement → ~0.80', () => {
    const req: SubjectRequirement = {
      courseId: 'eng',
      courseName: 'English',
      level: 'HL',
      minimumGrade: 6,
      isCritical: false
    }
    // Student has English SL 7, requirement is HL 6
    const result = calculateSubjectMatch(req, studentCourses)
    expect(result.score).toBeCloseTo(0.8, 1)
    expect(result.status).toBe('PARTIAL_MATCH')
  })

  it('Level mismatch: SL 4 for HL 6 → low partial score', () => {
    const req: SubjectRequirement = {
      courseId: 'econ',
      courseName: 'Economics',
      level: 'HL',
      minimumGrade: 6,
      isCritical: false
    }
    // Student has Economics SL 4, requirement is HL 6
    const result = calculateSubjectMatch(req, studentCourses)
    expect(result.score).toBeCloseTo(0.25, 1) // Should be around minimum
    expect(result.status).toBe('PARTIAL_MATCH')
  })

  it('Level mismatch: minimum floor of 0.25', () => {
    // SL 1 for HL 7: the shortfall's own floor gives 0.25 and the level penalty takes it to 0.175,
    // so the level-mismatch floor decides
    const result = calculateSubjectMatch(req('econ', 'HL', 7), [took('econ', 'SL', 1)])
    expect(result.score).toBe(0.25)
    expect(result.status).toBe('PARTIAL_MATCH')
    expect(result.kind).toBe('level_short')
  })

  // === Test 5: OR-Group Requirements ===

  it('OR-group: one option fully met → score 1.0', () => {
    const orGroup: ORGroupRequirement = {
      options: [
        { courseId: 'phys', courseName: 'Physics', level: 'HL', minimumGrade: 6, isCritical: true },
        {
          courseId: 'chem',
          courseName: 'Chemistry',
          level: 'HL',
          minimumGrade: 6,
          isCritical: true
        }
      ],
      isCritical: true
    }
    // Student has Chemistry HL 6, which fully meets one option
    const result = calculateORGroupMatch(orGroup, studentCourses)
    expect(result.score).toBe(1.0)
    expect(result.status).toBe('FULL_MATCH')
  })

  it('OR-group: best partial match taken', () => {
    const orGroup: ORGroupRequirement = {
      options: [
        {
          courseId: 'phys',
          courseName: 'Physics',
          level: 'HL',
          minimumGrade: 6,
          isCritical: false
        },
        { courseId: 'math', courseName: 'Math', level: 'HL', minimumGrade: 6, isCritical: true }
      ],
      isCritical: true
    }
    // Student has Math HL 5 (1 below), no Physics
    // Should take Math's partial score (0.85 for critical 1-below)
    const result = calculateORGroupMatch(orGroup, studentCourses)
    expect(result.score).toBe(0.85)
    expect(result.status).toBe('PARTIAL_MATCH')
  })

  it('OR-group: no options met → score 0.0', () => {
    const orGroup: ORGroupRequirement = {
      options: [
        {
          courseId: 'phys',
          courseName: 'Physics',
          level: 'HL',
          minimumGrade: 6,
          isCritical: false
        },
        {
          courseId: 'cs',
          courseName: 'Computer Science',
          level: 'HL',
          minimumGrade: 6,
          isCritical: false
        }
      ],
      isCritical: false
    }
    // Student took neither Physics nor CS
    const result = calculateORGroupMatch(orGroup, studentCourses)
    expect(result.score).toBe(0.0)
    expect(result.status).toBe('NO_MATCH')
  })
})
