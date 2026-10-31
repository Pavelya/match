import { describe, expect, it } from 'vitest'
import { transformStudent } from '@/lib/matching/transformers'
import { pointsMark, shortlistItem, type SavedProgramRow, type ShortlistViewer } from './items'

// The D4.10 student: 38 points, and five countries (UK, Ireland, Canada, the US, the Netherlands)
const STUDENT = transformStudent({
  totalIBPoints: 38,
  tokGrade: 'B',
  eeGrade: 'B',
  courses: [
    {
      level: 'HL',
      grade: 6,
      ibCourse: { id: 'maths-aa', name: 'Mathematics: Analysis and Approaches' }
    },
    { level: 'HL', grade: 6, ibCourse: { id: 'physics', name: 'Physics' } },
    { level: 'HL', grade: 6, ibCourse: { id: 'economics', name: 'Economics' } },
    { level: 'SL', grade: 6, ibCourse: { id: 'eng-lit', name: 'English A: Literature' } },
    { level: 'SL', grade: 6, ibCourse: { id: 'spa-b', name: 'Spanish B' } },
    { level: 'SL', grade: 6, ibCourse: { id: 'chemistry', name: 'Chemistry' } }
  ],
  preferredFields: [],
  preferredCountries: []
})

const VIEWER: ShortlistViewer = {
  student: STUDENT,
  countryIds: ['uk', 'ie', 'ca', 'us', 'nl'],
  openToAllLocations: false
}

// October 2026: students apply for 2027 entry
const NOW = new Date('2026-10-13T12:00:00Z')

function requirement(id: string, name: string, level: 'HL' | 'SL', minGrade: number) {
  return {
    requiredLevel: level,
    minGrade,
    isCritical: true,
    orGroupId: null,
    ibCourse: { id, name }
  }
}

function program(overrides: Partial<SavedProgramRow> = {}): SavedProgramRow {
  return {
    id: 'imperial-efds',
    name: 'Economics, Finance and Data Science',
    degreeType: 'Bachelor of Science',
    duration: '3 years',
    campusCity: null,
    minIBPoints: 39,
    programUrl: 'https://www.imperial.ac.uk/',
    requirementsEntryYear: 2027,
    fieldOfStudy: { id: 'business' },
    university: {
      id: 'imperial',
      name: 'Imperial College London',
      abbreviatedName: 'London',
      image: 'https://example.org/imperial.jpg',
      city: 'London',
      admitRate: null,
      country: { id: 'uk', name: 'United Kingdom' }
    },
    courseRequirements: [requirement('maths-aa', 'Mathematics: Analysis and Approaches', 'HL', 7)],
    ...overrides
  }
}

describe('a saved program', () => {
  it('is the result row, with the compare table’s facts', () => {
    const item = shortlistItem(program(), VIEWER, NOW)
    expect(item).toMatchObject({
      id: 'imperial-efds',
      university: 'Imperial College London',
      city: 'London',
      country: 'United Kingdom',
      length: '3 years',
      minIBPoints: 39,
      initials: 'ICL',
      degree: 'Bachelor of Science',
      programUrl: 'https://www.imperial.ac.uk/',
      intake: { year: 2027, earlier: false },
      notYourCountry: false
    })
  })

  it('has the Matches badge, the points against the total and the subject in chip words', () => {
    expect(shortlistItem(program(), VIEWER, NOW).fit).toEqual({
      status: 'close',
      badge: 'Within reach · 1 point, 1 grade',
      points: { kind: 'close', text: '1 point short' },
      subjects: [{ kind: 'close', label: 'Maths AA HL 7 · you 6' }]
    })
  })

  it('lists every subject, missing first, met ones too', () => {
    const trinity = program({
      minIBPoints: 34,
      courseRequirements: [
        requirement('eng-lit', 'English A: Literature', 'SL', 4),
        requirement('maths-aa', 'Mathematics: Analysis and Approaches', 'HL', 5),
        requirement('spa-b', 'Spanish B', 'HL', 5)
      ]
    })
    expect(shortlistItem(trinity, VIEWER, NOW).fit).toMatchObject({
      status: 'gap',
      points: { kind: 'met', text: 'Met' },
      subjects: [
        { kind: 'gap', label: 'Spanish B HL 5 · you SL' },
        { kind: 'met', label: 'English A Lit SL 4' },
        { kind: 'met', label: 'Maths AA HL 5' }
      ]
    })
  })

  it('has no points and no subjects where the program sets none (MIT)', () => {
    const mit = program({
      minIBPoints: null,
      courseRequirements: [],
      requirementsEntryYear: 2026,
      university: {
        ...program().university,
        name: 'Massachusetts Institute of Technology',
        abbreviatedName: 'MIT',
        admitRate: 4.6,
        country: { id: 'us', name: 'United States' }
      }
    })
    const item = shortlistItem(mit, VIEWER, NOW)
    expect(item.fit).toEqual({
      status: 'neutral',
      badge: 'No set grades',
      points: null,
      subjects: []
    })
    expect(item).toMatchObject({ admitRate: 4.6, initials: 'MIT' })
    expect(item.intake).toEqual({ year: 2026, earlier: true })
  })

  it('says when the country isn’t one of the student’s', () => {
    const ntu = program({
      university: { ...program().university, country: { id: 'sg', name: 'Singapore' } }
    })
    expect(shortlistItem(ntu, VIEWER, NOW).notYourCountry).toBe(true)
    // Open to every country, or none chosen: no country is outside them
    expect(shortlistItem(ntu, { ...VIEWER, openToAllLocations: true }).notYourCountry).toBe(false)
    expect(shortlistItem(ntu, { ...VIEWER, countryIds: [] }).notYourCountry).toBe(false)
  })

  it('takes the campus city, and says when the requirements haven’t been checked', () => {
    const item = shortlistItem(
      program({ campusCity: 'Reims', requirementsEntryYear: null }),
      VIEWER
    )
    expect(item.city).toBe('Reims')
    expect(item.intake).toBeNull()
  })

  it('has no fit before subjects and grades', () => {
    expect(shortlistItem(program(), { ...VIEWER, student: null }).fit).toBeUndefined()
  })
})

describe('the IB minimum against the total', () => {
  it('meets, falls close or falls short in the points chip’s statuses', () => {
    expect(pointsMark(38, 37)).toEqual({ kind: 'met', text: 'Met' })
    expect(pointsMark(38, 38)).toEqual({ kind: 'met', text: 'Met' })
    expect(pointsMark(38, 40)).toEqual({ kind: 'close', text: '2 points short' })
    expect(pointsMark(38, 41)).toEqual({ kind: 'close', text: '3 points short' })
    expect(pointsMark(38, 45)).toEqual({ kind: 'gap', text: '7 points short' })
  })

  it('has nothing to say without a minimum', () => {
    expect(pointsMark(38, null)).toBeNull()
    expect(pointsMark(38, 0)).toBeNull()
  })
})
