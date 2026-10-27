import { describe, expect, it } from 'vitest'
import { cardChips, deriveMatchStatus, subjectChips } from './match-status'
import { requirementRows, whyThisMatch } from './match-why'
import { calculateMatch } from './scorer'
import type { IBGrade, ORGroupRequirement, ProgramRequirements, StudentProfile } from './types'

/*
 * The words for a requirement that needs a course of its own (MAINT 5.18), as the board
 * "D2.7 Chip · a second subject" approved them on 26 October 2026: real programs, with their
 * stored requirements and the flags step 5 sets, through the production matcher.
 */

const AA = 'Mathematics: Analysis and Approaches'
const AI = 'Mathematics: Applications and Interpretation'
type Option = [course: string, level: 'HL' | 'SL', grade: number]

const at = (courses: string[], level: 'HL' | 'SL', grade: number): Option[] =>
  courses.map((c) => [c, level, grade])

function group(options: Option[], own = false, critical = true): ORGroupRequirement {
  return {
    options: options.map(([course, level, grade]) => ({
      courseId: course,
      courseName: course,
      level,
      minimumGrade: grade as IBGrade,
      isCritical: critical,
      ...(own && { ownCourse: true })
    })),
    isCritical: critical,
    ...(own && { ownCourse: true })
  }
}

function program(name: string, min: number, groups: ORGroupRequirement[]): ProgramRequirements {
  return {
    programId: name,
    programName: name,
    universityId: 'u',
    universityName: 'University',
    type: 'FULL_REQUIREMENTS',
    fieldId: 'f',
    countryId: 'c',
    minimumIBPoints: min,
    requiredSubjects: [],
    orGroupRequirements: groups
  }
}

function student(points: number, courses: Option[]): StudentProfile {
  return {
    courses: courses.map(([course, level, grade]) => ({
      courseId: course,
      courseName: course,
      level,
      grade: grade as IBGrade
    })),
    totalIBPoints: points,
    tokGrade: 'B',
    eeGrade: 'B',
    interestedFields: ['f'],
    preferredCountries: ['c']
  }
}

const ENGLISH = group(
  at(['English A: Literature', 'English A: Language & Literature', 'English B'], 'SL', 4),
  false,
  false
)
const SCIENCES = ['Biology', 'Chemistry', 'Physics']
const TRINITY_MEDICINE = program('Medicine', 38, [
  group(at(SCIENCES, 'HL', 5), true),
  group([
    [AA, 'SL', 5],
    [AI, 'SL', 5],
    ['Physics', 'SL', 1]
  ]),
  group(at(SCIENCES, 'HL', 6), true),
  group(at([AA, AI], 'SL', 4)),
  ENGLISH
])
const STRAND = ['Biology', 'Chemistry', 'Computer Science', 'Geography', AA, AI, 'Physics']
const TRINITY_BIOCHEMISTRY = program('Biochemistry', 34, [
  group(at([AA, AI], 'SL', 5)),
  group(at(STRAND, 'HL', 5), true),
  ENGLISH,
  group(at(STRAND, 'HL', 5), true)
])
const UCL_SCIENCES = ['Biology', 'Chemistry', AA, AI, 'Physics', 'Psychology']
const UCL_PSYCHOLOGY = program('BSc Psychology', 39, [
  group(at(UCL_SCIENCES, 'HL', 6), true),
  group(at(UCL_SCIENCES, 'HL', 6), true)
])
const MANCHESTER = program('MBChB Medicine', 36, [
  group(at(['Biology', 'Chemistry'], 'HL', 6), true),
  group(at(['Biology', 'Chemistry', AA, AI, 'Physics', 'Psychology'], 'HL', 6), true)
])

const OTHERS: Option[] = [
  ['Economics', 'HL', 7],
  ['English A: Literature', 'HL', 7],
  ['Spanish B', 'SL', 7],
  ['History', 'SL', 7]
]

function judge(p: ProgramRequirements, s: StudentProfile) {
  const result = calculateMatch({ student: s, program: p, mode: 'BALANCED' })
  const status = deriveMatchStatus({
    result,
    studentPoints: s.totalIBPoints,
    minIBPoints: p.minimumIBPoints ?? null,
    fieldName: 'Medicine & Health',
    countryName: 'Ireland',
    requirementsEntryYear: 2027
  })
  const why = whyThisMatch({
    result,
    status: status.status,
    studentPoints: s.totalIBPoints,
    minIBPoints: p.minimumIBPoints ?? null,
    fieldName: 'Medicine & Health',
    countryName: 'Ireland',
    countryCode: 'IE',
    universityName: 'Trinity College Dublin',
    admitRate: null,
    internationalAdmitRate: null,
    admitRateYear: null,
    requirementsEntryYear: 2027,
    programUrl: null
  })
  return { result, status, why }
}

describe('a second subject: the chip and the badge (D2.7)', () => {
  it('Trinity Medicine: names the courses left and why Biology is not one of them', () => {
    const s = student(40, [['Biology', 'HL', 6], [AA, 'SL', 5], ...OTHERS])
    const { status } = judge(TRINITY_MEDICINE, s)
    expect(status.badge).toBe('Needs Chemistry or Physics HL')
    expect(cardChips(status.chips).map((c) => [c.kind, c.label])).toEqual([
      ['gap', 'Chemistry or Physics HL 5 · Biology counts once'],
      ['met', '40 / 38 points'],
      ['met', 'Maths AA SL 5'],
      ['met', 'Biology HL 6'],
      ['met', '+2 met']
    ])
  })

  it('Trinity Biochemistry: a long list names its first course and counts the rest', () => {
    const s = student(36, [[AA, 'HL', 5], ...OTHERS])
    const { status, result } = judge(TRINITY_BIOCHEMISTRY, s)
    expect(status.badge).toBe('Needs Biology or 5 others at HL')
    expect(subjectChips(result.academicMatch.subjectMatches)[0].label).toBe(
      'Biology HL 5 or 5 others · Maths AA counts once'
    )
  })

  it('UCL Psychology: a second subject a grade short counts the others without Biology', () => {
    const s = student(39, [['Biology', 'HL', 7], ['Chemistry', 'HL', 5], ...OTHERS])
    const { status } = judge(UCL_PSYCHOLOGY, s)
    expect(status.badge).toBe('Within reach · 1 grade short')
    expect(status.chips[0].label).toBe('Chemistry HL 6 or 4 others · you 5')
  })

  it('Manchester MBChB: the level gap counts the others without Biology too', () => {
    const s = student(37, [['Biology', 'HL', 7], [AA, 'SL', 6], ...OTHERS])
    const { status } = judge(MANCHESTER, s)
    expect(status.badge).toBe('Needs Maths AA HL')
    expect(status.chips[0].label).toBe('Maths AA HL 6 or 4 others · you SL')
  })

  it('a program without the flag keeps today’s words', () => {
    const unflagged = program('MBChB Medicine', 36, [
      group(at(['Biology', 'Chemistry'], 'HL', 6)),
      group(at(['Biology', 'Chemistry', AA, AI, 'Physics', 'Psychology'], 'HL', 6))
    ])
    const { status } = judge(unflagged, student(37, [['Biology', 'HL', 7], ...OTHERS]))
    expect(status.badge).toBe('Meets all requirements')
  })
})

describe('a second subject: "Why this match" (D3.2)', () => {
  it('Trinity Medicine: the row says where Biology went, and the note what would meet it', () => {
    const s = student(40, [['Biology', 'HL', 6], [AA, 'SL', 5], ...OTHERS])
    const { why } = judge(TRINITY_MEDICINE, s)
    const missing = why.rows.find((r) => r.kind === 'gap')
    expect(missing).toMatchObject({
      name: 'Chemistry or Physics',
      needed: 'HL 5',
      you: '–',
      reason: 'Your Biology counts once, for the HL 6 requirement'
    })
    expect(why.rows.find((r) => r.name === 'Biology')?.detail).toBe(
      'or Chemistry or Physics at HL 6'
    )
    expect(why.note).toEqual({
      kind: 'gap',
      text: 'Biology counts once, so the other requirement needs Chemistry or Physics at HL 5. Better grades alone won’t meet it.'
    })
  })

  it('names the other requirement it went to, never an unmarked row that shares it', () => {
    // Maths AA HL 5 meets the maths SL 5 row too, which may share it
    const { why } = judge(TRINITY_BIOCHEMISTRY, student(36, [[AA, 'HL', 5], ...OTHERS]))
    expect(why.rows.find((r) => r.kind === 'gap')?.reason).toBe(
      'Your Maths AA counts once, for the other HL 5 requirement'
    )
  })

  it('UCL Psychology: "or …" lines leave out the course the other requirement uses', () => {
    const s = student(39, [['Biology', 'HL', 7], ['Chemistry', 'HL', 5], ...OTHERS])
    const { why } = judge(UCL_PSYCHOLOGY, s)
    expect(why.rows.find((r) => r.name === 'Chemistry')?.detail).toBe(
      'or Maths AA, Maths AI, Physics or Psychology at HL 6'
    )
    expect(why.note.text).toBe('To close it: a 6 in Chemistry HL.')
  })
})

describe('a second subject: the checklist signed out (D3.4)', () => {
  it('each row that needs a subject of its own says so, against the other', () => {
    let id = 0
    const rows = TRINITY_MEDICINE.orGroupRequirements.flatMap((g, gi) =>
      g.options.map((o) => ({
        id: String(id++),
        requiredLevel: o.level,
        minGrade: o.minimumGrade,
        orGroupId: `g${gi}`,
        ownCourse: o.ownCourse ?? false,
        ibCourse: { id: o.courseId, name: o.courseName }
      }))
    )
    const out = requirementRows({
      minIBPoints: 38,
      requirements: rows,
      universityName: 'Trinity College Dublin',
      admitRate: null,
      internationalAdmitRate: null,
      admitRateYear: null
    })
    expect(out.map((r) => [r.name, r.needed, r.own])).toEqual([
      ['IB Diploma points', '38', undefined],
      ['Biology, Chemistry or Physics', 'HL 5', 'A different subject from the HL 6 one'],
      ['Maths AA or Maths AI', 'SL 5', undefined],
      ['Biology, Chemistry or Physics', 'HL 6', 'A different subject from the HL 5 one'],
      ['Maths AA or Maths AI', 'SL 4', undefined],
      ['English A Lit, English A Lang & Lit or English B', 'SL 4', undefined]
    ])
  })

  it('two rows asking for the same say "the other"', () => {
    const rows = [0, 1].flatMap((gi) =>
      ['Biology', 'Chemistry'].map((c, ci) => ({
        id: `${gi}${ci}`,
        requiredLevel: 'HL',
        minGrade: 6,
        orGroupId: `g${gi}`,
        ownCourse: true,
        ibCourse: { id: c, name: c }
      }))
    )
    const out = requirementRows({
      minIBPoints: 39,
      requirements: rows,
      universityName: 'University College London',
      admitRate: null,
      internationalAdmitRate: null,
      admitRateYear: null
    })
    expect(out[1].own).toBe('A different subject from the other HL 6 one')
  })
})
