import { describe, expect, it } from 'vitest'
import { deriveMatchStatus } from './match-status'
import { requirementRows, whyThisMatch, type WhyInput } from './match-why'
import { calculateMatch } from './scorer'
import { transformProgram } from './transformers'
import type { IBGrade, StudentProfile } from './types'

/*
 * "Why this match" for the student on the canvas boards D3.1 and D3.2, from the production
 * matcher: 38 points; Maths AA HL 6, Physics HL 6, Economics HL 6, English A Lit SL 6, Spanish B
 * SL 6, Chemistry SL 6; fields Business & Economics and Computer Science.
 */

const COURSE_NAMES = {
  mathsAA: 'Mathematics: Analysis and Approaches',
  mathsAI: 'Mathematics: Applications and Interpretation',
  physics: 'Physics',
  economics: 'Economics',
  chemistry: 'Chemistry',
  biology: 'Biology',
  englishLit: 'English A: Literature',
  englishLL: 'English A: Language & Literature',
  englishB: 'English B',
  spanishB: 'Spanish B',
  frenchB: 'French B',
  germanB: 'German B',
  italianB: 'Italian B',
  dutchB: 'Dutch B',
  russianB: 'Russian B',
  arabicB: 'Arabic B',
  mandarinB: 'Mandarin B',
  japaneseB: 'Japanese B',
  koreanB: 'Korean B',
  hindiB: 'Hindi B',
  spanishAb: 'Spanish ab initio',
  frenchAb: 'French ab initio',
  business: 'Business Management',
  psychology: 'Psychology',
  history: 'History'
}
type Course = keyof typeof COURSE_NAMES

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
    courseId: course,
    courseName: COURSE_NAMES[course],
    level,
    grade
  })),
  totalIBPoints: 38,
  tokGrade: 'B',
  eeGrade: 'B',
  interestedFields: ['economics', 'computing'],
  preferredCountries: ['uk', 'ie', 'us']
}

/** [course, level, grade, critical?]; an array of them is an either/or */
type Row = [Course, 'HL' | 'SL', IBGrade, boolean?]

interface Program {
  minIBPoints?: number | null
  requires?: (Row | Row[])[]
  field?: string
  country?: string
  countryCode?: string
  admitRate?: number | null
  internationalAdmitRate?: number | null
  requirementsEntryYear?: number | null
}

function why(program: Program, student: Partial<StudentProfile> = {}) {
  const courseRequirements = (program.requires ?? []).flatMap((entry, i) => {
    const rows = Array.isArray(entry[0]) ? (entry as Row[]) : [entry as Row]
    const orGroupId = Array.isArray(entry[0]) ? `group-${i}` : null
    return rows.map(([course, requiredLevel, minGrade, critical]) => ({
      ibCourse: { id: course, name: COURSE_NAMES[course] },
      requiredLevel,
      minGrade,
      isCritical: Boolean(critical),
      orGroupId
    }))
  })
  const minIBPoints = program.minIBPoints === undefined ? 34 : program.minIBPoints
  const profile = { ...STUDENT, ...student }
  const result = calculateMatch({
    student: profile,
    program: transformProgram({
      id: 'program',
      name: 'Program',
      minIBPoints,
      university: { id: 'u', name: 'University', country: { id: program.country ?? 'uk' } },
      fieldOfStudy: { id: program.field ?? 'economics' },
      courseRequirements
    })
  })
  const now = new Date('2026-10-10T12:00:00Z')
  const requirementsEntryYear =
    program.requirementsEntryYear === undefined ? 2027 : program.requirementsEntryYear
  const status = deriveMatchStatus({
    result,
    studentPoints: profile.totalIBPoints,
    minIBPoints,
    fieldName: 'Arts & Humanities',
    countryName: 'Germany',
    requirementsEntryYear,
    now
  })
  const input: WhyInput = {
    result,
    status: status.status,
    studentPoints: profile.totalIBPoints,
    minIBPoints,
    fieldName: program.field === 'arts' ? 'Arts & Humanities' : 'Business & Economics',
    countryName: program.country === 'de' ? 'Germany' : 'United Kingdom',
    countryCode: program.countryCode ?? 'GB',
    universityName: 'Massachusetts Institute of Technology',
    admitRate: program.admitRate ?? null,
    internationalAdmitRate: program.internationalAdmitRate ?? null,
    admitRateYear: 2025,
    requirementsEntryYear,
    programUrl: 'https://example.edu/program',
    now
  }
  return whyThisMatch(input)
}

const LANGUAGES: Course[] = [
  'frenchB',
  'germanB',
  'italianB',
  'dutchB',
  'russianB',
  'arabicB',
  'mandarinB',
  'japaneseB',
  'koreanB',
  'hindiB'
]

describe('the requirement rows (D3.4 at 14px)', () => {
  it('points first, then problems, then what is met', () => {
    const { rows } = why({
      minIBPoints: 39,
      requires: [
        ['physics', 'HL', 6],
        ['biology', 'HL', 5]
      ]
    })
    expect(rows.map((r) => [r.kind, r.name, r.needed, r.you])).toEqual([
      ['close', 'IB Diploma points', '39', '38'],
      ['gap', 'Biology', 'HL 5', null],
      ['met', 'Physics', 'HL 6', 'HL 6']
    ])
    expect(rows[1].reason).toBe('Not in your diploma')
  })

  it('an either/or is named by the course taken, with the others at their own levels', () => {
    const { rows } = why({
      requires: [
        [
          ['mathsAA', 'HL', 7, true],
          ['mathsAI', 'HL', 7, true]
        ]
      ]
    })
    expect(rows[1]).toMatchObject({
      kind: 'close',
      name: 'Maths AA',
      needed: 'HL 7',
      you: 'HL 6',
      reason: 'One grade below',
      detail: 'or Maths AI at HL 7'
    })
  })

  it('says when an HL counts for SL, after the other courses (TUM, Economics)', () => {
    const { rows } = why({
      requires: [
        [
          ['economics', 'SL', 4],
          ['business', 'SL', 4],
          ['psychology', 'SL', 4],
          ['history', 'SL', 4]
        ]
      ]
    })
    expect(rows[1]).toMatchObject({
      kind: 'met',
      name: 'Economics',
      needed: 'SL 4',
      you: 'HL 6',
      detail: 'or Business Management, Psychology or History at SL 4. Your HL counts.'
    })
  })

  it('SL where HL is needed, and two grades below', () => {
    const { rows } = why({
      requires: [
        ['chemistry', 'HL', 5],
        ['physics', 'HL', 8 as IBGrade]
      ]
    })
    expect(rows.find((r) => r.name === 'Chemistry')).toMatchObject({
      kind: 'gap',
      you: 'SL 6',
      reason: 'SL where HL is needed'
    })
    expect(rows.find((r) => r.name === 'Physics')).toMatchObject({
      kind: 'gap',
      reason: '2 grades below'
    })
  })

  it('a group of more than eight courses opens from "All N options", by level and grade', () => {
    const languages: Row[] = [
      ['spanishB', 'HL', 4],
      ['spanishB', 'SL', 6],
      ...LANGUAGES.flatMap((c): Row[] => [
        [c, 'HL', 4],
        [c, 'SL', 6]
      ]),
      ['spanishAb', 'SL', 6],
      ['frenchAb', 'SL', 6]
    ]
    const { rows } = why({ requires: [languages] })
    expect(rows[1]).toMatchObject({
      kind: 'met',
      name: 'Spanish B',
      needed: 'HL 4 or SL 6',
      you: 'SL 6',
      detail: 'Any one of 13 courses counts.'
    })
    expect(rows[1].options).toEqual({
      count: 13,
      groups: [
        {
          label: 'HL 4 or SL 6 · 10 more',
          courses:
            'French B, German B, Italian B, Dutch B, Russian B, Arabic B, Mandarin B, Japanese B, Korean B, Hindi B'
        },
        { label: 'SL 6 · 2 courses', courses: 'Spanish ab initio, French ab initio' }
      ]
    })
  })

  it('a group not taken: named by its courses, or counted when there are many', () => {
    const noSpanish = STUDENT.courses.filter((c) => c.courseId !== 'spanishB')
    const two = why(
      {
        requires: [
          [
            ['frenchB', 'HL', 5],
            ['spanishB', 'HL', 5]
          ]
        ]
      },
      { courses: noSpanish }
    )
    expect(two.rows[1]).toMatchObject({
      name: 'French B or Spanish B',
      needed: 'HL 5',
      you: null,
      reason: 'Not in your diploma'
    })

    const many = why(
      { requires: [[...LANGUAGES, 'spanishB' as Course].map((c): Row => [c, 'HL', 6])] },
      { courses: noSpanish }
    )
    expect(many.rows[1]).toMatchObject({ name: 'One of 11 courses', needed: 'HL 6', you: null })
    expect(many.rows[1].options?.groups).toHaveLength(1)
    expect(many.rows[1].options?.groups[0].label).toBe('HL 6 · 11 courses')
  })

  it('no IB minimum: the admit rates, with the year, and "Named subjects: none"', () => {
    const { rows } = why({
      minIBPoints: null,
      countryCode: 'US',
      admitRate: 88.4,
      internationalAdmitRate: 89.9
    })
    expect(rows).toEqual([
      {
        kind: 'info',
        type: 'points',
        name: 'IB Diploma points',
        needed: 'No minimum',
        you: '38',
        detail:
          'Holistic admission. Massachusetts Institute of Technology admitted 88.4% of first-year applicants for fall 2025, and 89.9% of international applicants.'
      },
      { kind: 'info', type: 'none', name: 'Named subjects', needed: 'None', you: '–' }
    ])
    expect(why({ minIBPoints: null }).rows[0].detail).toBe('Holistic admission.')
  })
})

describe('the note: what would close it', () => {
  it('within reach: the point and the grade (Imperial, Economics, Finance and Data Science)', () => {
    const { note } = why({ minIBPoints: 39, requires: [['mathsAA', 'HL', 7, true]] })
    expect(note).toEqual({
      kind: 'close',
      text: 'To close it: one more point overall, and a 7 in Maths AA HL.'
    })
  })

  it('missing: why better grades alone can’t (TUM, Informatics)', () => {
    expect(why({ requires: [['germanB', 'HL', 5, true]] }).note).toEqual({
      kind: 'gap',
      text: 'German B isn’t in your diploma, so better grades alone won’t meet this.'
    })
    expect(why({ requires: [['chemistry', 'HL', 5]] }).note.text).toBe(
      'Your Chemistry is SL where HL is needed, so better grades alone won’t meet this.'
    )
  })

  it('missing, but grades would close it', () => {
    expect(why({ minIBPoints: 44 }).note.text).toBe('To close it: 6 more points overall.')
  })

  it('meets all, outside the student’s fields (Trinity, Linguistics)', () => {
    expect(why({ field: 'arts' }).note).toEqual({
      kind: 'met',
      text: 'You meet every requirement. Arts & Humanities isn’t one of your fields, so it ranks below the programs in your fields.'
    })
  })

  it('no IB minimum, in the US, with its subjects met', () => {
    expect(
      why({ minIBPoints: null, countryCode: 'US', requires: [['mathsAA', 'HL', 5]] }).note
    ).toEqual({
      kind: 'info',
      text: 'Meeting the requirements doesn’t secure a place. US universities read the whole application, not a points total.'
    })
  })
})

describe('no set grades (board "D3.1 No IB minimum")', () => {
  it('has no fit score, at 24 or with no minimum', () => {
    expect(why({ minIBPoints: 24 }).fit).toBeNull()
    expect(why({ minIBPoints: null }).fit).toBeNull()
  })

  it('still has one for a student under 24, for whom the 24 is a bar', () => {
    expect(why({ minIBPoints: 24 }, { totalIBPoints: 22 }).fit).not.toBeNull()
  })

  it('at 24: the points row is a note, and the Diploma itself', () => {
    const { rows, note } = why({ minIBPoints: 24 })
    expect(rows).toEqual([
      {
        kind: 'info',
        type: 'points',
        name: 'IB Diploma points',
        needed: '24',
        you: '38',
        detail: '24 is the Diploma itself.'
      },
      { kind: 'info', type: 'none', name: 'Named subjects', needed: 'None', you: '–' }
    ])
    expect(note).toEqual({
      kind: 'info',
      text: 'There’s nothing here to check your grades against, so we can’t say how you compare. See how the university decides on its own page.'
    })
  })

  it('with no minimum: the admit rate stays in the points row', () => {
    const { rows } = why({ minIBPoints: null, admitRate: 4.6 })
    expect(rows[0]).toMatchObject({ kind: 'info', needed: 'No minimum', you: '38' })
    expect(rows[0].detail).toMatch(/^Holistic admission\. /)
  })

  it('in the US', () => {
    expect(why({ minIBPoints: null, countryCode: 'US' }).note).toEqual({
      kind: 'info',
      text: 'US universities read the whole application, not a points total, so we can’t say how you compare.'
    })
  })
})

describe('field, country and the intake', () => {
  it('says whether each is one of the student’s', () => {
    const result = why({ field: 'arts', country: 'de' })
    expect(result.field).toEqual({
      kind: 'info',
      text: 'Arts & Humanities, not one of your fields'
    })
    expect(result.country).toEqual({ kind: 'info', text: 'Germany, not one of your countries' })
    expect(why({}).field).toEqual({ kind: 'met', text: 'Business & Economics, one of yours' })
  })

  it('cautions when the requirements are from an earlier intake or unchecked', () => {
    expect(why({ requirementsEntryYear: 2026 }).intake).toEqual({
      status: 'older',
      entryYear: 2026,
      currentYear: 2027
    })
    expect(why({ requirementsEntryYear: null }).intake).toEqual({ status: 'unchecked' })
    expect(why({}).intake).toBeNull()
  })
})

/** The score's panel, for a program that has one */
function fitOf(...args: Parameters<typeof why>) {
  const { fit } = why(...args)
  if (!fit) throw new Error('no fit score')
  return fit
}

describe('the fit score and its working', () => {
  it('shows the three weighted parts and a cap in plain words (Imperial)', () => {
    const fit = fitOf({ minIBPoints: 39, requires: [['mathsAA', 'HL', 7, true]] })
    expect(fit.parts.map((p) => [p.label, p.calc.split(' × ')[1]])).toEqual([
      ['Academic', '60%'],
      ['Country', '10%'],
      ['Field', '30%']
    ])
    expect(fit.parts.reduce((sum, p) => sum + p.value, 0)).toBeGreaterThan(fit.score)
    expect(fit.sentence).toMatch(
      /^Adds up to \d+%, capped at 80% because a required subject is one grade short\.$/
    )
    expect(fit.score).toBe(80)
  })

  it('a missing required subject (TUM)', () => {
    const fit = fitOf({
      minIBPoints: 38,
      country: 'de',
      requires: [
        ['germanB', 'HL', 5, true],
        ['economics', 'SL', 4],
        ['englishLit', 'SL', 4],
        ['mathsAA', 'HL', 5],
        ['chemistry', 'SL', 4]
      ]
    })
    expect(fit.parts.map((p) => p.value)).toEqual([48, 0, 30])
    expect(fit).toMatchObject({
      score: 45,
      sentence: 'Adds up to 78%, lowered to 45% because a required subject is missing.'
    })
  })

  it('nothing lowers it; a program with no minimum says the score ignores admit rates', () => {
    expect(fitOf({ field: 'arts' }).sentence).toBe('Adds up to 70%. Nothing lowers it.')
    expect(
      fitOf({ minIBPoints: null, admitRate: 4.6, requires: [['mathsAA', 'HL', 5]] })
    ).toMatchObject({
      score: 100,
      sentence: 'Adds up to 100%. Nothing lowers it. The score doesn’t use admit rates.'
    })
  })

  it('a points shortfall alone', () => {
    expect(fitOf({ minIBPoints: 39 }).sentence).toBe(
      'Adds up to 91%, capped at 90% because you’re 1 point short.'
    )
  })

  it.each([
    ['no fields', { interestedFields: [] }, [86, 14, 0], '86%'],
    ['no countries', { preferredCountries: [] }, [67, 0, 33], '67%'],
    [
      'no fields or countries',
      { interestedFields: [], preferredCountries: [] },
      [100, 0, 0],
      '100%'
    ]
  ])('%s: the parts add up to a perfect 100%%', (_, preferences, values, academicWeight) => {
    const fit = fitOf({ minIBPoints: 30 }, preferences)
    expect(fit.parts.map((p) => p.value)).toEqual(values)
    expect(fit.parts[0].calc).toBe(`100% × ${academicWeight}`)
    expect(fit.score).toBe(100)
    expect(fit.parts.reduce((sum, p) => sum + p.value, 0)).toBe(fit.score)
    expect(fit.sentence).toBe('Adds up to 100%. Nothing lowers it.')
  })

  it('no fields: the field is an open choice at 0%, as a country is', () => {
    const { field } = why({ minIBPoints: 30 }, { interestedFields: [] })
    const fit = fitOf({ minIBPoints: 30 }, { interestedFields: [] })
    expect(fit.parts[2]).toEqual({ label: 'Field', calc: '100% × 0%', value: 0, percent: 100 })
    expect(field).toEqual({
      kind: 'info',
      text: 'Business & Economics; you’re open to every field'
    })
  })

  it('a shortfall nothing caps is counted in Academic, not “Nothing lowers it”', () => {
    expect(fitOf({ minIBPoints: 40 }).sentence).toBe(
      'Adds up to 89%. The 2 points you’re short are counted in Academic.'
    )
    expect(fitOf({ minIBPoints: 39 }, { interestedFields: [] }).sentence).toMatch(
      /^Adds up to \d+%\. The 1 point you’re short is counted in Academic\.$/
    )
    expect(fitOf({ minIBPoints: 30 }).sentence).toBe('Adds up to 100%. Nothing lowers it.')
  })

  it('5 short reads lower than 1 short (MAINT 5.43)', () => {
    expect(fitOf({ minIBPoints: 43 }).score).toBeLessThan(fitOf({ minIBPoints: 39 }).score)
  })
})

describe('the checklist without grades (D3.4, signed out or before grades)', () => {
  const rows = (requires: (Row | Row[])[], minIBPoints: number | null = 38) =>
    requirementRows({
      minIBPoints,
      universityName: 'Arizona State University',
      admitRate: 88.4,
      internationalAdmitRate: 89.9,
      admitRateYear: 2025,
      requirements: requires.flatMap((entry, i) => {
        const group = Array.isArray(entry[0]) ? (entry as Row[]) : [entry as Row]
        return group.map(([course, requiredLevel, minGrade], j) => ({
          id: `${i}-${j}`,
          ibCourse: { id: course, name: COURSE_NAMES[course] },
          requiredLevel,
          minGrade,
          orGroupId: Array.isArray(entry[0]) ? `group-${i}` : null
        }))
      })
    })

  it('the minimum, then each requirement in the order the program lists them (Imperial)', () => {
    expect(
      rows([
        ['chemistry', 'HL', 6],
        [...LANGUAGES.slice(0, 8), 'spanishB' as Course].flatMap((c): Row[] => [
          [c, 'HL', 5],
          [c, 'SL', 6]
        ]),
        [
          ['biology', 'HL', 6],
          ['mathsAA', 'HL', 6],
          ['mathsAI', 'HL', 6],
          ['physics', 'HL', 6]
        ]
      ])
    ).toEqual([
      { kind: 'info', type: 'points', name: 'IB Diploma points', needed: '38', you: null },
      {
        kind: 'info',
        type: 'subject',
        name: 'Chemistry',
        needed: 'HL 6',
        you: null,
        detail: undefined
      },
      {
        kind: 'info',
        type: 'subject',
        name: 'One of 9 courses',
        needed: 'HL 5 or SL 6',
        you: null,
        options: {
          count: 9,
          groups: [
            {
              label: 'HL 5 or SL 6 · 9 courses',
              courses:
                'French B, German B, Italian B, Dutch B, Russian B, Arabic B, Mandarin B, Japanese B, Spanish B'
            }
          ]
        }
      },
      {
        kind: 'info',
        type: 'subject',
        name: 'Biology, Maths AA, Maths AI or Physics',
        needed: 'HL 6',
        you: null,
        detail: undefined
      }
    ])
  })

  it('names the first option and lists the others at their own levels (Toronto)', () => {
    expect(
      rows([
        [
          ['mathsAA', 'SL', 6],
          ['mathsAI', 'HL', 6]
        ]
      ])[1]
    ).toMatchObject({ name: 'Maths AA', needed: 'SL 6', detail: 'or Maths AI at HL 6' })
  })

  it('no IB minimum: the admit rates; no subjects: "None"', () => {
    expect(rows([], null)).toEqual([
      {
        kind: 'info',
        type: 'points',
        name: 'IB Diploma points',
        needed: 'No minimum',
        you: null,
        detail:
          'Holistic admission. Arizona State University admitted 88.4% of first-year applicants for fall 2025, and 89.9% of international applicants.'
      },
      { kind: 'info', type: 'none', name: 'Named subjects', needed: 'None', you: null }
    ])
  })
})
