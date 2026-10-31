import { describe, expect, it } from 'vitest'
import {
  hasSubjects,
  isWidened,
  matchItem,
  matchItems,
  profileSteps,
  profileSummary,
  rankedResults,
  type ListedProfile
} from './match-list'
import { GROUPS, sortMatches } from './match-groups'
import type { CachedProgram } from './program-cache'
import { calculateMatch } from './scorer'
import { transformProgram, transformStudent } from './transformers'

const PROFILE: ListedProfile = {
  totalIBPoints: 38,
  tokGrade: 'B',
  eeGrade: 'B',
  openToAllFields: false,
  openToAllLocations: false,
  courses: [
    { level: 'SL', grade: 6, ibCourse: { id: 'eng-lit', name: 'English A: Literature' } },
    {
      level: 'HL',
      grade: 6,
      ibCourse: { id: 'maths-aa', name: 'Mathematics: Analysis and Approaches' }
    },
    { level: 'SL', grade: 6, ibCourse: { id: 'spa-b', name: 'Spanish B' } },
    { level: 'HL', grade: 6, ibCourse: { id: 'physics', name: 'Physics' } }
  ],
  preferredFields: [
    { id: 'cs', name: 'Computer Science' },
    { id: 'econ', name: 'Business & Economics' }
  ],
  preferredCountries: [
    { id: 'us', name: 'United States' },
    { id: 'ca', name: 'Canada' },
    { id: 'uk', name: 'United Kingdom' },
    { id: 'nl', name: 'Netherlands' },
    { id: 'ie', name: 'Ireland' }
  ]
}

function program(overrides: Partial<CachedProgram> = {}): CachedProgram {
  return {
    id: 'mit-econ',
    name: 'Economics (Course 14-1)',
    universityId: 'mit',
    university: {
      id: 'mit',
      name: 'Massachusetts Institute of Technology',
      abbreviatedName: 'MIT',
      image: null,
      city: 'Cambridge',
      admitRate: 4.6,
      internationalAdmitRate: null,
      admitRateYear: 2025,
      country: { id: 'us', name: 'United States', code: 'US', flagEmoji: '' }
    },
    fieldOfStudyId: 'econ',
    fieldOfStudy: { id: 'econ', name: 'Business & Economics', iconName: null, description: null },
    degreeType: 'BSc',
    duration: '4 years',
    campusCity: null,
    minIBPoints: null,
    requirementsEntryYear: 2026,
    programUrl: 'https://economics.mit.edu',
    courseRequirements: [],
    ...overrides
  }
}

describe('matchItem', () => {
  it('a US program: initials, the admit-rate chip, and "Why this match" from the same result', () => {
    const p = program()
    const result = calculateMatch({
      student: transformStudent(PROFILE),
      program: transformProgram(p)
    })
    const item = matchItem(result, p, 38, new Date('2026-10-10T12:00:00Z'))
    expect(item).toMatchObject({
      id: 'mit-econ',
      university: 'Massachusetts Institute of Technology',
      country: 'United States',
      image: null,
      initials: 'MIT',
      minIBPoints: null,
      score: 100,
      status: 'meets',
      badge: 'Meets all requirements',
      chips: [
        {
          kind: 'info',
          label: 'No IB minimum · admits 4.6%',
          spokenAfter: ' of first-year applicants'
        },
        { kind: 'info', label: 'No named subjects' },
        { kind: 'info', label: 'Checked for 2026 entry' }
      ]
    })
    expect(item.why.rows[0].detail).toBe(
      'Holistic admission. Massachusetts Institute of Technology admitted 4.6% of first-year applicants for fall 2025.'
    )
    expect(item.why.intake).toEqual({ status: 'older', entryYear: 2026, currentYear: 2027 })
    expect(item.why.programUrl).toBe('https://economics.mit.edu')
  })
})

describe('rankedResults', () => {
  const STUDENT = { ...PROFILE, totalIBPoints: 36 }

  /** Physics HL at the given grade is required, so a 7 is one this student misses */
  const physics = (minGrade: number): CachedProgram['courseRequirements'] => [
    {
      id: 'req-physics',
      ibCourse: { id: 'physics', name: 'Physics', code: 'PHYS', group: 4 },
      requiredLevel: 'HL',
      minGrade,
      isCritical: true,
      orGroupId: null
    }
  ]

  const CATALOGUE = [
    program({ id: 'gap', minIBPoints: 36, courseRequirements: physics(7) }),
    program({ id: 'close', minIBPoints: 38 }),
    program({ id: 'none', minIBPoints: null }),
    program({ id: 'far-under', minIBPoints: 24 }),
    program({ id: 'near-under', minIBPoints: 34 }),
    // Met, in a country the student did not choose: it scores below the program 2 short
    program({
      id: 'elsewhere',
      minIBPoints: 30,
      university: {
        ...program().university,
        country: { id: 'jp', name: 'Japan', code: 'JP', flagEmoji: '' }
      }
    })
  ]

  const score = (programs: CachedProgram[]) =>
    programs.map((p) =>
      calculateMatch({ student: transformStudent(STUDENT), program: transformProgram(p) })
    )

  const byId = new Map(CATALOGUE.map((p) => [p.id, p]))

  it('puts meets before close before gap, whatever the scores', () => {
    const results = score(CATALOGUE)
    const of = (id: string) => results.find((r) => r.programId === id)!.overallScore
    expect(of('elsewhere')).toBeLessThan(of('close'))

    expect(rankedResults(results, byId, 36).map((r) => r.programId)).toEqual([
      'near-under',
      'far-under',
      'none',
      'elsewhere',
      'close',
      'gap'
    ])
  })

  it('inside a status, the closest minimum comes first and no minimum last', () => {
    const results = score(
      CATALOGUE.filter((p) => ['near-under', 'far-under', 'none'].includes(p.id))
    )

    expect(rankedResults(results, byId, 36).map((r) => r.programId)).toEqual([
      'near-under',
      'far-under',
      'none'
    ])
  })

  it('leaves out a result whose program has gone', () => {
    const results = score(CATALOGUE)
    const left = new Map(CATALOGUE.filter((p) => p.id !== 'close').map((p) => [p.id, p]))

    expect(rankedResults(results, left, 36).map((r) => r.programId)).not.toContain('close')
  })

  it('returns the results themselves, with everything the coordinator response spreads', () => {
    const results = score(CATALOGUE).map((r) => ({ ...r, category: 'MATCH' as const }))

    const ranked = rankedResults(results, byId, 36)

    expect(ranked).toHaveLength(results.length)
    expect(ranked[0]).toBe(results.find((r) => r.programId === 'near-under'))
  })

  it('gives the same ids in the same order as flattening the student’s groups', () => {
    const results = score(CATALOGUE)
    // What MatchesClient does with the route's cards, in its default order
    const sorted = sortMatches(matchItems(results, byId, 36), 'fit', 36)
    const groups = GROUPS.flatMap((g) => sorted.filter((m) => m.status === g.status))

    expect(rankedResults(results, byId, 36).map((r) => r.programId)).toEqual(
      groups.map((m) => m.id)
    )
  })
})

describe('isWidened', () => {
  const at = (field: boolean, country: boolean, open = false) => ({
    fieldMatch: { score: 1, isMatch: field, noPreferences: open },
    locationMatch: { score: 1, isMatch: country, noPreferences: open }
  })

  it('is true only when a match is outside a field or country the student chose', () => {
    expect(isWidened([at(true, true), at(true, true)])).toBe(false)
    expect(isWidened([at(true, true), at(true, false)])).toBe(true)
    expect(isWidened([at(false, true)])).toBe(true)
    // Open to every field and country: nothing is outside them
    expect(isWidened([at(false, false, true)])).toBe(false)
  })
})

describe('the profile beside the list', () => {
  it('total, subjects HL first by short name, TOK and EE with their points, sorted choices', () => {
    expect(profileSummary(PROFILE)).toEqual({
      total: 38,
      subjects: [
        { name: 'Maths AA', level: 'HL', grade: 6 },
        { name: 'Physics', level: 'HL', grade: 6 },
        { name: 'English A Lit', level: 'SL', grade: 6 },
        { name: 'Spanish B', level: 'SL', grade: 6 }
      ],
      core: 'B · B (+2)',
      fields: ['Business & Economics', 'Computer Science'],
      countries: ['Canada', 'Ireland', 'Netherlands', 'United Kingdom', 'United States']
    })
    expect(profileSummary({ ...PROFILE, tokGrade: 'E' }).core).toBe('E · B')
    expect(profileSummary({ ...PROFILE, eeGrade: null }).core).toBeNull()
  })
})

describe('first run’s steps (F6)', () => {
  it('ticks what is saved, naming the countries as a sentence does', () => {
    const noSubjects = { ...PROFILE, courses: [], totalIBPoints: null }
    expect(hasSubjects(noSubjects)).toBe(false)
    expect(profileSteps(noSubjects)).toEqual([
      { name: 'Interests', done: true, detail: 'Business & Economics, Computer Science' },
      {
        name: 'Countries',
        done: true,
        detail: 'Canada, Ireland, the Netherlands, the UK and the USA'
      },
      { name: 'Subjects and grades', done: false, detail: 'Not added yet' }
    ])
  })

  it('with no profile, nothing is done', () => {
    expect(hasSubjects(null)).toBe(false)
    expect(profileSteps(null).map((s) => [s.done, s.detail])).toEqual([
      [false, 'Not added yet'],
      [false, 'Not added yet'],
      [false, 'Not added yet']
    ])
  })
})
