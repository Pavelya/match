import { describe, expect, it } from 'vitest'
import type { MatchStatus as BadgeStatus, RequirementKind } from '@/components/ds/StatusBadge'
import { cardChips, deriveMatchStatus, type MatchChip, type MatchStatusInput } from './match-status'
import { calculateMatch } from './scorer'
import { calculateORGroupMatch } from './subject-matcher'
import { transformProgram } from './transformers'
import type { AcademicMatchScore, IBGrade, StudentProfile, SubjectMatchDetail } from './types'

/*
 * One test per row of the chip table in 04-design-system.md §9, then the card status and its
 * badge. Results come from the production matcher, so these also cover the fields it adds.
 * Courses carry their stored names, as the matcher gets them; the chips shorten them.
 */

const COURSES = {
  mathsAA: { id: 'maths-aa', name: 'Mathematics: Analysis and Approaches' },
  mathsAI: { id: 'maths-ai', name: 'Mathematics: Applications and Interpretation' },
  physics: { id: 'physics', name: 'Physics' },
  economics: { id: 'economics', name: 'Economics' },
  chemistry: { id: 'chemistry', name: 'Chemistry' },
  biology: { id: 'biology', name: 'Biology' },
  englishLit: { id: 'eng-lit', name: 'English A: Literature' },
  englishLL: { id: 'eng-ll', name: 'English A: Language & Literature' },
  englishB: { id: 'eng-b', name: 'English B' },
  spanishB: { id: 'spa-b', name: 'Spanish B' },
  frenchB: { id: 'fra-b', name: 'French B' }
}
type Course = keyof typeof COURSES

/** The student on the canvas board "Match card · every state". */
const STUDENT: StudentProfile = {
  courses: (
    [
      ['mathsAA', 'HL', 6],
      ['physics', 'HL', 6],
      ['economics', 'HL', 6],
      ['englishLit', 'SL', 6],
      ['spanishB', 'SL', 6],
      ['chemistry', 'SL', 6]
    ] as const
  ).map(([course, level, grade]) => ({
    courseId: COURSES[course].id,
    courseName: COURSES[course].name,
    level,
    grade
  })),
  totalIBPoints: 38,
  tokGrade: 'B',
  eeGrade: 'B',
  interestedFields: ['economics'],
  preferredCountries: ['uk']
}

/** [course, level, grade] stands alone; an array of them is an either/or. */
type Row = [Course, 'HL' | 'SL', IBGrade]

interface Program {
  minIBPoints?: number | null
  requires?: (Row | Row[])[]
  field?: string
  country?: string
  requirementsEntryYear?: number | null
}

const OCTOBER_2026 = new Date('2026-10-09T12:00:00Z')

function status(program: Program, student: Partial<StudentProfile> = {}) {
  const courseRequirements = (program.requires ?? []).flatMap((entry, i) => {
    const rows = Array.isArray(entry[0]) ? (entry as Row[]) : [entry as Row]
    const orGroupId = Array.isArray(entry[0]) ? `group-${i}` : null
    return rows.map(([course, requiredLevel, minGrade]) => ({
      ibCourse: COURSES[course],
      requiredLevel,
      minGrade,
      isCritical: false,
      orGroupId
    }))
  })
  const minIBPoints = program.minIBPoints === undefined ? 34 : program.minIBPoints
  const result = calculateMatch({
    student: { ...STUDENT, ...student },
    program: transformProgram({
      id: 'program',
      name: 'Program',
      minIBPoints,
      university: {
        id: 'university',
        name: 'University',
        country: { id: program.country ?? 'uk' }
      },
      fieldOfStudy: { id: program.field ?? 'economics' },
      courseRequirements
    })
  })
  return deriveMatchStatus({
    result,
    studentPoints: student.totalIBPoints ?? STUDENT.totalIBPoints,
    minIBPoints,
    fieldName: 'Medicine & Health',
    countryName: 'Germany',
    requirementsEntryYear:
      program.requirementsEntryYear === undefined ? 2027 : program.requirementsEntryYear,
    now: OCTOBER_2026
  })
}

const chip = (kind: MatchChip['kind'], label: string): MatchChip => ({ kind, label })

describe('requirement chips (04-design-system.md §9)', () => {
  it('points met: ✓ 38 / 37 points', () => {
    expect(status({ minIBPoints: 37 }).chips).toContainEqual(chip('met', '38 / 37 points'))
  })

  it('points short by 1–3: – 38 / 39 points', () => {
    expect(status({ minIBPoints: 39 }).chips).toContainEqual(chip('close', '38 / 39 points'))
    expect(status({ minIBPoints: 41 }).chips).toContainEqual(chip('close', '38 / 41 points'))
  })

  it('points short by 4 or more: × 33 / 39 points', () => {
    expect(status({ minIBPoints: 39 }, { totalIBPoints: 33 }).chips).toContainEqual(
      chip('gap', '33 / 39 points')
    )
  })

  it('FULL_MATCH: ✓ Maths HL 6', () => {
    expect(status({ requires: [['mathsAA', 'HL', 6]] }).chips).toContainEqual(
      chip('met', 'Maths AA HL 6')
    )
  })

  it('FULL_MATCH with HL for SL: ✓ Maths SL 6 · your HL 6', () => {
    expect(status({ requires: [['mathsAA', 'SL', 6]] }).chips).toContainEqual(
      chip('met', 'Maths AA SL 6 · your HL 6')
    )
  })

  it('either/or met: names the course that counted (§9: "English A SL 6 · via Literature")', () => {
    const englishA: Row[] = [
      ['englishLit', 'SL', 6],
      ['englishLL', 'SL', 6]
    ]
    expect(status({ requires: [englishA] }).chips).toContainEqual(chip('met', 'English A Lit SL 6'))
  })

  it('PARTIAL_MATCH, grade 1 below: – Maths HL 7 · you 6', () => {
    expect(status({ requires: [['mathsAA', 'HL', 7]] }).chips).toContainEqual(
      chip('close', 'Maths AA HL 7 · you 6')
    )
  })

  it('PARTIAL_MATCH, grade 2+ below: × Maths HL 7 · you 5', () => {
    const grade5 = STUDENT.courses.map((c) =>
      c.courseId === COURSES.mathsAA.id ? { ...c, grade: 5 as const } : c
    )
    expect(status({ requires: [['mathsAA', 'HL', 7]] }, { courses: grade5 }).chips).toContainEqual(
      chip('gap', 'Maths AA HL 7 · you 5')
    )
  })

  it('PARTIAL_MATCH, SL instead of HL: × Chemistry HL 5 · you SL', () => {
    expect(status({ requires: [['chemistry', 'HL', 5]] }).chips).toContainEqual(
      chip('gap', 'Chemistry HL 5 · you SL')
    )
  })

  it('NO_MATCH, not taken: × Biology HL 5 · not taken', () => {
    expect(status({ requires: [['biology', 'HL', 5]] }).chips).toContainEqual(
      chip('gap', 'Biology HL 5 · not taken')
    )
  })

  it('either/or, none met: × French or Spanish HL 5 · not taken', () => {
    const noSpanish = STUDENT.courses.filter((c) => c.courseId !== COURSES.spanishB.id)
    const languages: Row[] = [
      ['frenchB', 'HL', 5],
      ['spanishB', 'HL', 5]
    ]
    expect(status({ requires: [languages] }, { courses: noSpanish }).chips).toContainEqual(
      chip('gap', 'French B or Spanish B HL 5 · not taken')
    )
  })

  it('a long either/or, none met: names its first course and counts the rest', () => {
    const noSpanish = STUDENT.courses.filter((c) => c.courseId !== COURSES.spanishB.id)
    const result = status(
      {
        requires: [
          [
            ['frenchB', 'HL', 5],
            ['englishB', 'HL', 5],
            ['biology', 'SL', 5]
          ]
        ]
      },
      { courses: noSpanish }
    )
    expect(result.chips).toContainEqual(chip('gap', 'French B HL 5 or 2 others · not taken'))
    expect(result.badge).toBe('Needs French B or 2 others')
  })

  it('no named subjects (POINTS_ONLY): • No named subjects', () => {
    expect(status({ minIBPoints: 33 }).chips).toEqual([
      chip('met', '38 / 33 points'),
      chip('info', 'No named subjects')
    ])
  })

  it('no IB minimum (US, content 6): • No IB minimum · holistic admission, and meets all', () => {
    const result = status({ minIBPoints: null }, { totalIBPoints: 26 })
    expect(result.chips).toEqual([
      chip('info', 'No IB minimum · holistic admission'),
      chip('info', 'No named subjects')
    ])
    expect(result.status).toBe('meets')
  })

  it('field or country not preferred: • Medicine & Health · not your field', () => {
    const { chips } = status({ field: 'medicine', country: 'germany' })
    expect(chips).toContainEqual(chip('info', 'Medicine & Health · not your field'))
    expect(chips).toContainEqual(chip('info', 'Germany · not one of your countries'))
  })

  it('no field or country note when the student has no preferences', () => {
    const { chips } = status(
      { field: 'medicine', country: 'germany' },
      { interestedFields: [], preferredCountries: [] }
    )
    expect(chips.filter((c) => c.kind === 'info')).toEqual([chip('info', 'No named subjects')])
  })

  it('requirements from an earlier intake: • Checked for 2026 entry', () => {
    expect(status({ requirementsEntryYear: 2026 }).chips).toContainEqual(
      chip('info', 'Checked for 2026 entry')
    )
    // In October 2026 students apply for 2027 entry; unchecked programs get no chip.
    for (const requirementsEntryYear of [2027, null]) {
      const { chips } = status({ requirementsEntryYear })
      expect(chips.some((c) => c.label.startsWith('Checked for'))).toBe(false)
    }
  })
})

describe('card status and badge', () => {
  it('meets all requirements: every chip met, whatever the notes say', () => {
    const result = status({
      minIBPoints: 37,
      requires: [['mathsAA', 'SL', 6]],
      field: 'medicine',
      requirementsEntryYear: 2026
    })
    expect(result.status).toBe('meets')
    expect(result.badge).toBe('Meets all requirements')
  })

  it('within reach · 1 point short, and up to 3', () => {
    expect(status({ minIBPoints: 39 })).toMatchObject({
      status: 'close',
      badge: 'Within reach · 1 point short'
    })
    expect(status({ minIBPoints: 41 }).badge).toBe('Within reach · 3 points short')
    expect(status({ minIBPoints: 42 }).status).toBe('gap')
  })

  it('within reach · 1 grade short', () => {
    expect(status({ requires: [['mathsAA', 'HL', 7]] })).toMatchObject({
      status: 'close',
      badge: 'Within reach · 1 grade short'
    })
  })

  it('within reach · 1 point, 1 grade', () => {
    expect(status({ minIBPoints: 39, requires: [['mathsAA', 'HL', 7]] })).toMatchObject({
      status: 'close',
      badge: 'Within reach · 1 point, 1 grade'
    })
  })

  it('within reach: judged at their own level when an either/or accepts it ("HL 5 or SL 7")', () => {
    const mathsSL6 = STUDENT.courses.map((c) =>
      c.courseId === COURSES.mathsAA.id ? { ...c, level: 'SL' as const } : c
    )
    // The matcher reports the HL option: SL 6 for HL 5 scores 0.80, a grade short at SL 0.78.
    const option = (level: 'HL' | 'SL', minimumGrade: IBGrade) => ({
      courseId: COURSES.mathsAA.id,
      courseName: COURSES.mathsAA.name,
      level,
      minimumGrade,
      isCritical: false
    })
    const group = { options: [option('HL', 5), option('SL', 7)], isCritical: false }
    expect(calculateORGroupMatch(group, mathsSL6).kind).toBe('level_short')

    const mathsAA: Row[] = [
      ['mathsAA', 'HL', 5],
      ['mathsAA', 'SL', 7]
    ]
    const result = status({ requires: [mathsAA] }, { courses: mathsSL6 })
    expect(result).toMatchObject({ status: 'close', badge: 'Within reach · 1 grade short' })
    expect(result.chips).toContainEqual(chip('close', 'Maths AA HL 5 or SL 7 · you SL 6'))
  })

  it('missing: two subjects a grade short is more than within reach', () => {
    expect(
      status({
        requires: [
          ['mathsAA', 'HL', 7],
          ['physics', 'HL', 7]
        ]
      })
    ).toMatchObject({
      status: 'gap',
      badge: 'Needs a 7 in Maths AA and a 7 in Physics'
    })
  })

  it('missing: 4 or more points short', () => {
    expect(status({ minIBPoints: 44 })).toMatchObject({
      status: 'gap',
      badge: 'Needs 6 more points'
    })
  })

  it('missing: a subject not taken and one at SL, as on the board (Biomedical Sciences)', () => {
    const result = status({
      minIBPoints: 34,
      field: 'medicine',
      requires: [
        ['biology', 'HL', 5],
        ['chemistry', 'HL', 5],
        [
          ['englishLit', 'SL', 5],
          ['englishLL', 'SL', 5],
          ['englishB', 'SL', 5]
        ],
        [
          ['mathsAA', 'SL', 5],
          ['mathsAI', 'SL', 5]
        ]
      ]
    })
    expect(result.status).toBe('gap')
    expect(result.badge).toBe('Needs Biology HL and Chemistry HL')
    expect(result.chips).toEqual([
      chip('gap', 'Biology HL 5 · not taken'),
      chip('gap', 'Chemistry HL 5 · you SL'),
      chip('met', '38 / 34 points'),
      chip('met', 'English A Lit SL 5'),
      chip('met', 'Maths AA SL 5 · your HL 6'),
      chip('info', 'Medicine & Health · not your field')
    ])
    expect(cardChips(result.chips)).toEqual([
      chip('gap', 'Biology HL 5 · not taken'),
      chip('gap', 'Chemistry HL 5 · you SL'),
      chip('met', '38 / 34 points'),
      chip('info', 'Medicine & Health · not your field'),
      { kind: 'met', label: '+2 met', collapsed: true }
    ])
  })

  it('missing: an either/or not taken needs any of its courses', () => {
    const noSpanish = STUDENT.courses.filter((c) => c.courseId !== COURSES.spanishB.id)
    const languages: Row[] = [
      ['frenchB', 'HL', 5],
      ['spanishB', 'HL', 5]
    ]
    expect(status({ requires: [languages] }, { courses: noSpanish }).badge).toBe(
      'Needs French B or Spanish B HL'
    )
  })

  it('missing: names two needs and counts the rest', () => {
    const result = status({
      minIBPoints: 44,
      requires: [
        ['biology', 'HL', 5],
        ['chemistry', 'HL', 5]
      ]
    })
    expect(result.badge).toBe('Needs 6 more points, Biology HL and 1 more')
  })

  it('passes straight to StatusBadge and RequirementChip', () => {
    const result = status({ minIBPoints: 39, requires: [['chemistry', 'HL', 5]] })
    const badge: BadgeStatus = result.status
    const kinds: RequirementKind[] = result.chips.map((c) => c.kind)
    expect([badge, kinds]).toEqual(['gap', ['gap', 'close']])
  })
})

describe('chip order and cardChips', () => {
  it('orders missing, within reach, met, then notes', () => {
    const { chips } = status({
      minIBPoints: 39,
      field: 'medicine',
      requires: [
        ['physics', 'HL', 6],
        ['mathsAA', 'HL', 7],
        ['biology', 'HL', 5]
      ]
    })
    expect(chips.map((c) => c.kind)).toEqual(['gap', 'close', 'close', 'met', 'info'])
    expect(chips[1].label).toBe('38 / 39 points')
  })

  it('keeps four or fewer as they are', () => {
    const four = [chip('met', 'a'), chip('met', 'b'), chip('met', 'c'), chip('info', 'd')]
    expect(cardChips(four)).toBe(four)
  })

  it('never hides a problem, and adds no "+0 met"', () => {
    const gaps = ['a', 'b', 'c', 'd', 'e'].map((label) => chip('gap', label))
    expect(cardChips(gaps)).toEqual(gaps)
    expect(cardChips([...gaps, chip('met', 'f')])).toEqual([
      ...gaps,
      { kind: 'met', label: '+1 met', collapsed: true }
    ])
  })
})

describe('details without the display fields', () => {
  // Fixture-shaped details, or results cached before the fields existed
  const academic = (subjectMatches: SubjectMatchDetail[]): AcademicMatchScore => ({
    score: 1,
    subjectsMatchScore: 1,
    meetsPointsRequirement: true,
    pointsShortfall: 0,
    subjectMatches,
    missingCriticalCount: 0,
    missingNonCriticalCount: 0
  })
  const requirement = {
    courseId: 'physics',
    courseName: 'Physics',
    level: 'HL' as const,
    minimumGrade: 6 as const,
    isCritical: false
  }
  const input = (subjectMatches: SubjectMatchDetail[]): MatchStatusInput => ({
    result: {
      academicMatch: academic(subjectMatches),
      fieldMatch: { score: 1, isMatch: true, noPreferences: false },
      locationMatch: { score: 1, isMatch: true, noPreferences: false }
    },
    studentPoints: 38,
    minIBPoints: null,
    fieldName: 'Economics',
    countryName: 'United Kingdom',
    requirementsEntryYear: null
  })

  it('falls back on the status, and shows a partial match as missing', () => {
    const result = deriveMatchStatus(
      input([
        { requirement, score: 1, status: 'FULL_MATCH' },
        { requirement, score: 0.8, status: 'PARTIAL_MATCH' },
        { requirement, score: 0, status: 'NO_MATCH' }
      ])
    )
    expect(result.status).toBe('gap')
    expect(result.chips).toEqual([
      chip('gap', 'Physics HL 6'),
      chip('gap', 'Physics HL 6 · not taken'),
      chip('met', 'Physics HL 6'),
      chip('info', 'No IB minimum · holistic admission')
    ])
  })
})
