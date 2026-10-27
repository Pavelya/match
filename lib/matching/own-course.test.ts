import { describe, expect, it } from 'vitest'
import { calculateAcademicMatch } from './academic-matcher'
import { transformProgram } from './transformers'
import type {
  IBGrade,
  ORGroupRequirement,
  ProgramRequirements,
  StudentCourse,
  StudentProfile,
  SubjectRequirement
} from './types'

// Requirements that need a course of their own (MAINT 5.18), on the programs that need it:
// docs/matching/5.18-shared-courses.md

const NAMES: Record<string, string> = {
  bio: 'Biology',
  chem: 'Chemistry',
  phys: 'Physics',
  psych: 'Psychology',
  'maths-aa': 'Mathematics: Analysis and Approaches',
  'maths-ai': 'Mathematics: Applications and Interpretation',
  eng: 'English A: Literature',
  hist: 'History'
}

function req(courseId: string, level: 'HL' | 'SL', grade: number): SubjectRequirement {
  return {
    courseId,
    courseName: NAMES[courseId],
    level,
    minimumGrade: grade as IBGrade,
    isCritical: true
  }
}

function group(
  courseIds: string[],
  level: 'HL' | 'SL',
  grade: number,
  ownCourse = false
): ORGroupRequirement {
  return {
    options: courseIds.map((id) => ({ ...req(id, level, grade), ...(ownCourse && { ownCourse }) })),
    isCritical: true,
    ...(ownCourse && { ownCourse })
  }
}

function program(
  orGroupRequirements: ORGroupRequirement[],
  requiredSubjects: SubjectRequirement[] = []
): ProgramRequirements {
  return {
    programId: 'p',
    programName: 'Program',
    universityId: 'u',
    universityName: 'University',
    type: 'SUBJECTS_ONLY',
    fieldId: 'f',
    countryId: 'c',
    requiredSubjects,
    orGroupRequirements
  }
}

function student(...courses: [string, 'HL' | 'SL', number][]): StudentProfile {
  return {
    courses: courses.map(([courseId, level, grade]): StudentCourse => ({
      courseId,
      courseName: NAMES[courseId],
      level,
      grade: grade as IBGrade
    })),
    totalIBPoints: 38,
    tokGrade: 'B',
    eeGrade: 'B',
    interestedFields: [],
    preferredCountries: []
  }
}

const OTHERS: [string, 'HL' | 'SL', number][] = [
  ['eng', 'SL', 6],
  ['hist', 'HL', 6]
]

const statuses = (s: StudentProfile, p: ProgramRequirements) =>
  calculateAcademicMatch(s, p).subjectMatches.map((m) => m.status)

// Manchester MBChB: "Chemistry or Biology, plus another science", all at HL 6
const MANCHESTER = (own: boolean) =>
  program([
    group(['bio', 'chem'], 'HL', 6, own),
    group(['bio', 'chem', 'maths-aa', 'maths-ai', 'phys', 'psych'], 'HL', 6, own)
  ])

describe('requirements that need a course of their own', () => {
  it('Manchester MBChB: Biology HL 6 alone no longer meets both', () => {
    const result = calculateAcademicMatch(student(['bio', 'HL', 6], ...OTHERS), MANCHESTER(true))
    const [first, second] = result.subjectMatches
    expect(first).toMatchObject({ status: 'FULL_MATCH', matchedCourseId: 'bio' })
    expect(second).toMatchObject({
      status: 'NO_MATCH',
      kind: 'not_taken',
      score: 0,
      courseUsedElsewhere: { courseId: 'bio', courseName: 'Biology' }
    })
    expect(result.missingCriticalCount).toBe(1)
  })

  it('Manchester MBChB: Biology HL 6 with Chemistry HL 6 is met, each on the course it uses alone', () => {
    const s = student(['bio', 'HL', 6], ['chem', 'HL', 6], ...OTHERS)
    const result = calculateAcademicMatch(s, MANCHESTER(true))
    expect(result.subjectMatches.map((m) => m.matchedCourseId)).toEqual(['bio', 'chem'])
    expect(result.subjectMatches.every((m) => m.status === 'FULL_MATCH')).toBe(true)
    expect(result.subjectMatches.some((m) => m.courseUsedElsewhere)).toBe(false)
  })

  it('unmarked, the same rows still let one course meet both, as before', () => {
    expect(statuses(student(['bio', 'HL', 6], ...OTHERS), MANCHESTER(false))).toEqual([
      'FULL_MATCH',
      'FULL_MATCH'
    ])
  })

  it('finds the arrangement that meets both where taking the first fit would not', () => {
    // Trinity Medicine stores HL 5 before HL 6. Alone, both would use Biology HL 7; taking it for
    // HL 5 first would leave Chemistry HL 5 for HL 6, a grade short.
    const trinity = program([
      group(['bio', 'chem', 'phys'], 'HL', 5, true),
      group(['bio', 'chem', 'phys'], 'HL', 6, true)
    ])
    const result = calculateAcademicMatch(
      student(['bio', 'HL', 7], ['chem', 'HL', 5], ...OTHERS),
      trinity
    )
    expect(result.subjectMatches.map((m) => [m.status, m.matchedCourseId])).toEqual([
      ['FULL_MATCH', 'chem'],
      ['FULL_MATCH', 'bio']
    ])
  })

  it('Trinity Medicine: no Physics, so Maths counts for both unmarked rows', () => {
    // HL 6 and HL 5 in two of Biology, Chemistry, Physics (marked); "if you do not have a
    // qualification in Physics", Maths SL 5; and the minimum maths, SL 4 (both unmarked)
    const medicine = program([
      group(['bio', 'chem', 'phys'], 'HL', 5, true),
      group(['maths-aa', 'maths-ai', 'phys'], 'SL', 5),
      group(['bio', 'chem', 'phys'], 'HL', 6, true),
      group(['maths-aa', 'maths-ai'], 'SL', 4)
    ])
    const accepted = student(['bio', 'HL', 6], ['chem', 'HL', 5], ['maths-aa', 'SL', 5], ...OTHERS)
    expect(statuses(accepted, medicine).every((s) => s === 'FULL_MATCH')).toBe(true)

    const oneScience = student(['bio', 'HL', 6], ['maths-aa', 'SL', 5], ...OTHERS)
    expect(statuses(oneScience, medicine)).toEqual([
      'NO_MATCH',
      'FULL_MATCH',
      'FULL_MATCH',
      'FULL_MATCH'
    ])
  })

  it("Trinity's science strands: Maths HL 5 may be one of the two HLs and the maths too", () => {
    const sciences = ['phys', 'chem', 'bio', 'maths-aa', 'maths-ai']
    const strand = program([
      group(['maths-aa', 'maths-ai'], 'SL', 5),
      group(sciences, 'HL', 5, true),
      group(sciences, 'HL', 5, true)
    ])
    const two = student(['maths-aa', 'HL', 5], ['bio', 'HL', 5], ...OTHERS)
    expect(statuses(two, strand)).toEqual(['FULL_MATCH', 'FULL_MATCH', 'FULL_MATCH'])

    const one = calculateAcademicMatch(student(['maths-aa', 'HL', 5], ...OTHERS), strand)
    expect(one.subjectMatches.map((m) => m.status)).toEqual([
      'FULL_MATCH',
      'FULL_MATCH',
      'NO_MATCH'
    ])
    expect(one.subjectMatches[2].courseUsedElsewhere?.courseId).toBe('maths-aa')
  })

  it('UCL Psychology: a second science a grade short says so, not "used elsewhere"', () => {
    const ucl = program([
      group(['bio', 'chem', 'maths-aa', 'phys', 'psych'], 'HL', 6, true),
      group(['bio', 'chem', 'maths-aa', 'phys', 'psych'], 'HL', 6, true)
    ])
    const [first, second] = calculateAcademicMatch(
      student(['bio', 'HL', 6], ['chem', 'HL', 5], ...OTHERS),
      ucl
    ).subjectMatches
    expect(first).toMatchObject({ status: 'FULL_MATCH', matchedCourseId: 'bio' })
    expect(second).toMatchObject({
      status: 'PARTIAL_MATCH',
      kind: 'grade_short',
      matchedCourseId: 'chem',
      studentGrade: 5
    })
    expect(second.courseUsedElsewhere).toBeUndefined()
  })

  it('a standalone row and a group can need their own courses too', () => {
    const p = program(
      [group(['bio', 'chem', 'phys'], 'HL', 5, true)],
      [{ ...req('chem', 'HL', 5), ownCourse: true }]
    )
    expect(statuses(student(['chem', 'HL', 6], ...OTHERS), p)).toEqual(['FULL_MATCH', 'NO_MATCH'])
    expect(statuses(student(['chem', 'HL', 6], ['phys', 'HL', 5], ...OTHERS), p)).toEqual([
      'FULL_MATCH',
      'FULL_MATCH'
    ])
  })

  it('one marked requirement alone changes nothing: there is nothing to share with', () => {
    const p = program([
      group(['bio', 'chem'], 'HL', 6, true),
      group(['bio', 'chem', 'phys'], 'HL', 6)
    ])
    expect(statuses(student(['bio', 'HL', 6], ...OTHERS), p)).toEqual(['FULL_MATCH', 'FULL_MATCH'])
  })

  it('Lausanne Law, unmarked: Maths AA HL alone still meets both maths requirements', () => {
    const lausanne = program([
      group(['maths-aa', 'maths-ai'], 'SL', 4),
      group(['bio', 'chem', 'maths-aa', 'maths-ai', 'phys'], 'HL', 4)
    ])
    expect(statuses(student(['maths-aa', 'HL', 5], ...OTHERS), lausanne)).toEqual([
      'FULL_MATCH',
      'FULL_MATCH'
    ])
  })
})

describe('transformProgram and ownCourse', () => {
  const row = (id: string, orGroupId: string | null, ownCourse?: boolean) => ({
    ibCourse: { id, name: NAMES[id] },
    requiredLevel: 'HL',
    minGrade: 6,
    isCritical: true,
    orGroupId,
    ...(ownCourse !== undefined && { ownCourse })
  })
  const base = {
    id: 'p',
    name: 'MBChB',
    minIBPoints: 36,
    university: { id: 'u', name: 'Manchester', country: { id: 'gb' } },
    fieldOfStudy: { id: 'med' }
  }

  it('marks a group whose rows have it, and a standalone row', () => {
    const p = transformProgram({
      ...base,
      courseRequirements: [row('bio', 'g1', true), row('chem', 'g1', true), row('phys', null, true)]
    })
    expect(p.orGroupRequirements[0].ownCourse).toBe(true)
    expect(p.requiredSubjects[0].ownCourse).toBe(true)
  })

  it('adds no key when it is false or absent, so unmarked programs come out as before', () => {
    const p = transformProgram({
      ...base,
      courseRequirements: [row('bio', 'g1', false), row('chem', 'g1'), row('phys', null, false)]
    })
    expect('ownCourse' in p.orGroupRequirements[0]).toBe(false)
    expect('ownCourse' in p.orGroupRequirements[0].options[0]).toBe(false)
    expect('ownCourse' in p.requiredSubjects[0]).toBe(false)
  })
})
