import { describe, expect, it } from 'vitest'
import { deriveMatchStatus } from '@/lib/matching/match-status'
import { calculateOptimizedMatches } from '@/lib/matching/optimized-matcher'
import type { CachedProgram } from '@/lib/matching/program-cache'
import { calculateMatch } from '@/lib/matching/scorer'
import { transformProgram, transformStudent } from '@/lib/matching/transformers'
import type { CardStatus } from '@/lib/matching/match-status'
import type { StudentProfile } from '@/lib/matching/types'
import { fitProgram, programFit, qualifying, type FitRecord } from './fit'

// The D3.1 student, 38 points, with no preferences: Explore lists programs outside them anyway
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
    { level: 'SL', grade: 6, ibCourse: { id: 'spa-b', name: 'Spanish B' } }
  ],
  preferredFields: [],
  preferredCountries: []
})

function requirement(
  id: string,
  name: string,
  level: 'HL' | 'SL',
  minGrade: number,
  orGroupId: string | null = null
) {
  return {
    id: `${id}-${level}-${minGrade}`,
    ibCourse: { id, name, code: id, group: 5 },
    requiredLevel: level,
    minGrade,
    isCritical: true,
    orGroupId
  }
}

function program(overrides: Partial<CachedProgram> = {}): CachedProgram {
  return {
    id: 'p',
    name: 'Computer Science',
    universityId: 'u',
    university: {
      id: 'u',
      name: 'University of Toronto',
      abbreviatedName: null,
      image: null,
      city: 'Toronto',
      admitRate: null,
      internationalAdmitRate: null,
      admitRateYear: null,
      // Not one of the student's countries, and the field isn't theirs either
      country: { id: 'ca', name: 'Canada', code: 'CA', flagEmoji: '' }
    },
    fieldOfStudyId: 'cs',
    fieldOfStudy: { id: 'cs', name: 'Computer Science', iconName: null, description: null },
    degreeType: 'BSc',
    duration: '4 years',
    campusCity: null,
    minIBPoints: 37,
    requirementsEntryYear: 2026,
    programUrl: null,
    courseRequirements: [requirement('maths-aa', 'Mathematics: Analysis and Approaches', 'HL', 6)],
    ...overrides
  }
}

const fit = (p: CachedProgram) =>
  programFit(STUDENT, { requirements: transformProgram(p), minIBPoints: p.minIBPoints })

describe('qualifying', () => {
  const record = (objectID: string, minimumIBPoints?: number, course?: string): FitRecord => ({
    objectID,
    programName: objectID,
    universityName: 'University',
    ...(minimumIBPoints === undefined ? {} : { minimumIBPoints }),
    requiredCourses: course
      ? [
          {
            courseId: course,
            courseName: course,
            level: 'HL',
            minimumGrade: 5,
            isCritical: true
          }
        ]
      : []
  })
  const RECORDS = [
    record('real-bar', 30),
    record('no-minimum'),
    record('diploma', 24),
    record('diploma-with-a-subject', 24, 'biology'),
    record('too-high', 45)
  ]

  it('keeps what the student meets and what has no set grades, and counts the second', () => {
    const { records, noSetGrades } = qualifying(RECORDS, STUDENT)
    expect(records.map((r) => r.objectID)).toEqual(['real-bar', 'no-minimum', 'diploma'])
    expect(noSetGrades).toBe(2)
  })

  it('its split adds up to its total', () => {
    const { records, noSetGrades } = qualifying(RECORDS, STUDENT)
    const meets = records.filter((r) => programFit(STUDENT, fitProgram(r)).status === 'meets')
    expect(meets.length + noSetGrades).toBe(records.length)
  })
})

describe('programFit', () => {
  it('meets every requirement, whatever the field and country', () => {
    expect(fit(program())).toEqual({ status: 'meets', badge: 'Meets all requirements' })
  })

  it('is within reach a point and a grade short', () => {
    expect(
      fit(
        program({
          minIBPoints: 39,
          courseRequirements: [
            requirement('maths-aa', 'Mathematics: Analysis and Approaches', 'HL', 7)
          ]
        })
      )
    ).toEqual({ status: 'close', badge: 'Within reach · 1 point, 1 grade' })
  })

  it('misses a subject not taken', () => {
    expect(
      fit(
        program({
          minIBPoints: 34,
          courseRequirements: [requirement('chem', 'Chemistry', 'HL', 5)]
        })
      )
    ).toEqual({ status: 'gap', badge: 'Needs Chemistry HL' })
  })

  it('has no set grades for a program with no IB minimum and no named subjects', () => {
    expect(fit(program({ minIBPoints: null, courseRequirements: [] }))).toEqual({
      status: 'neutral',
      badge: 'No set grades'
    })
  })

  it('says what the Matches badge says for the same program', () => {
    const p = program({
      minIBPoints: 40,
      courseRequirements: [
        requirement('spa-b', 'Spanish B', 'HL', 5, 'lang'),
        requirement('fre-b', 'French B', 'HL', 5, 'lang')
      ]
    })
    const result = calculateMatch({ student: STUDENT, program: transformProgram(p) })
    const matches = deriveMatchStatus({
      result,
      studentPoints: 38,
      minIBPoints: p.minIBPoints,
      fieldName: p.fieldOfStudy.name,
      countryName: p.university.country.name,
      requirementsEntryYear: p.requirementsEntryYear
    })
    expect(fit(p)).toEqual({ status: matches.status, badge: matches.badge })
  })

  it('reads a search record as it reads the programs cache', () => {
    const p = program({
      minIBPoints: 36,
      courseRequirements: [
        requirement('maths-aa', 'Mathematics: Analysis and Approaches', 'HL', 7),
        requirement('spa-b', 'Spanish B', 'HL', 5, 'lang'),
        requirement('fre-b', 'French B', 'HL', 5, 'lang')
      ]
    })
    const record = {
      objectID: p.id,
      programName: p.name,
      universityId: p.university.id,
      universityName: p.university.name,
      countryId: p.university.country.id,
      fieldOfStudyId: p.fieldOfStudyId,
      minimumIBPoints: p.minIBPoints ?? undefined,
      requiredCourses: p.courseRequirements.map((r) => ({
        courseId: r.ibCourse.id,
        courseName: r.ibCourse.name,
        level: r.requiredLevel,
        minimumGrade: r.minGrade,
        isCritical: r.isCritical,
        orGroupId: r.orGroupId
      }))
    }
    expect(fitProgram(record).requirements).toEqual(transformProgram(p))
    expect(programFit(STUDENT, fitProgram(record))).toEqual(fit(p))
  })

  it('gives each requirement that needs its own course a different one, as Matches does', () => {
    // Two sciences from Maths and Physics, each needing its own course (MAINT 5.18)
    const science = (ownCourse?: true) => [
      {
        ...requirement('maths-aa', 'Mathematics: Analysis and Approaches', 'HL', 6, 'a'),
        ownCourse
      },
      { ...requirement('physics', 'Physics', 'HL', 6, 'a'), ownCourse },
      {
        ...requirement('maths-aa', 'Mathematics: Analysis and Approaches', 'HL', 6, 'b'),
        ownCourse
      },
      { ...requirement('physics', 'Physics', 'HL', 6, 'b'), ownCourse }
    ]
    const record = (ownCourse?: true) => ({
      objectID: 'p',
      programName: 'Physics',
      universityName: 'University',
      minimumIBPoints: 36,
      requiredCourses: science(ownCourse).map((r) => ({
        courseId: r.ibCourse.id,
        courseName: r.ibCourse.name,
        level: r.requiredLevel,
        minimumGrade: r.minGrade,
        isCritical: r.isCritical,
        orGroupId: r.orGroupId,
        ...(ownCourse && { ownCourse })
      }))
    })
    // The student has both, so both are met either way; without Maths, only when unmarked
    const physicsOnly = {
      ...STUDENT,
      courses: STUDENT.courses.filter((c) => c.courseId !== 'maths-aa')
    }
    expect(programFit(STUDENT, fitProgram(record(true))).status).toBe('meets')
    expect(programFit(physicsOnly, fitProgram(record())).status).toBe('meets')
    expect(programFit(physicsOnly, fitProgram(record(true))).status).not.toBe('meets')
    expect(programFit(physicsOnly, fitProgram(record(true)))).toEqual(
      programFit(physicsOnly, {
        requirements: transformProgram(
          program({ minIBPoints: 36, courseRequirements: science(true) })
        ),
        minIBPoints: 36
      })
    )
  })
})

describe('Matches agrees with "Only ones I qualify for" (5.40)', () => {
  const maths = requirement('maths-aa', 'Mathematics: Analysis and Approaches', 'HL', 6)
  const physics = requirement('physics', 'Physics', 'HL', 6)
  const chemistry = requirement('chem', 'Chemistry', 'HL', 5)
  const orGroup = (id: string) => [
    { ...maths, orGroupId: id },
    { ...physics, orGroupId: id }
  ]

  // In turn: nothing, a subject they have, either/or, two needing their own course, one they lack
  const REQUIREMENTS = [
    [],
    [maths],
    [chemistry, physics].map((r) => ({ ...r, orGroupId: 'science' })),
    [...orGroup('a'), ...orGroup('b')].map((r) => ({ ...r, ownCourse: true as const })),
    [chemistry]
  ]
  const FIELDS = ['cs', 'law', 'arts']
  const COUNTRIES = ['ca', 'uk', 'nl', 'fr']

  function place(fieldId: string, countryId: string): Partial<CachedProgram> {
    const { university, fieldOfStudy } = program()
    return {
      fieldOfStudyId: fieldId,
      fieldOfStudy: { ...fieldOfStudy, id: fieldId },
      university: { ...university, country: { ...university.country, id: countryId } }
    }
  }

  // Minimums of 24 to 45 and none, across every field, country and kind of requirement
  const CATALOGUE = Array.from({ length: 132 }, (_, i) =>
    program({
      id: `p-${i}`,
      minIBPoints: i % 7 === 0 ? null : 24 + (i % 22),
      courseRequirements: REQUIREMENTS[i % REQUIREMENTS.length],
      ...place(FIELDS[i % FIELDS.length], COUNTRIES[i % COUNTRIES.length])
    })
  )

  function student(total: number, fields: string[], countries: string[]): StudentProfile {
    return {
      ...STUDENT,
      totalIBPoints: total,
      interestedFields: fields,
      preferredCountries: countries
    }
  }

  const QUALIFY: CardStatus[] = ['meets', 'neutral']

  /** The ids Matches gives each status, as getCachedMatchesV10 calls it, and the tier it used */
  function matchesMeets(s: StudentProfile, programs: CachedProgram[], statuses = QUALIFY) {
    const byId = new Map(programs.map((p) => [p.id, p]))
    const { results, stats } = calculateOptimizedMatches(s, programs.map(transformProgram), {
      useIndex: true,
      useCache: true,
      pointsMargin: 10
    })
    const meets = results.filter((result) => {
      const p = byId.get(result.programId)!
      const { status } = deriveMatchStatus({
        result,
        studentPoints: s.totalIBPoints,
        minIBPoints: p.minIBPoints,
        fieldName: p.fieldOfStudy.name,
        countryName: p.university.country.name,
        requirementsEntryYear: p.requirementsEntryYear
      })
      return statuses.includes(status)
    })
    return { meets: meets.map((r) => byId.get(r.programId)!), tier: stats.fallbackTierUsed }
  }

  /** The student's fields and countries, as Explore's two filters keep them */
  const inPreferences = (s: StudentProfile) => (p: CachedProgram) =>
    s.interestedFields.includes(p.fieldOfStudyId) &&
    s.preferredCountries.includes(p.university.country.id)

  const exploreMeets = (s: StudentProfile, programs: CachedProgram[], statuses = QUALIFY) =>
    programs.filter(inPreferences(s)).filter((p) => {
      const fit = programFit(s, { requirements: transformProgram(p), minIBPoints: p.minIBPoints })
      return statuses.includes(fit.status)
    })

  const ids = (programs: CachedProgram[]) => programs.map((p) => p.id).sort()

  it.each([24, 30, 35, 36, 38, 45])('finds the same programs for a total of %i', (total) => {
    const s = student(total, ['cs', 'law'], ['ca', 'uk'])

    const { meets, tier } = matchesMeets(s, CATALOGUE)
    const explore = exploreMeets(s, CATALOGUE)

    expect(tier).toBe(1)
    expect(explore.length).toBeGreaterThan(0)
    expect(ids(meets.filter(inPreferences(s)))).toEqual(ids(explore))
    // Holds at 24 and up, so from 35 this is a program the old window dropped
    expect(explore.some((p) => p.minIBPoints === 24)).toBe(true)
  })

  it.each([24, 30, 38, 45])('agrees on who has no set grades, for a total of %i', (total) => {
    const s = student(total, ['cs', 'law'], ['ca', 'uk'])
    const group: CardStatus[] = ['neutral']

    const explore = exploreMeets(s, CATALOGUE, group)

    expect(explore.length).toBeGreaterThan(0)
    expect(ids(matchesMeets(s, CATALOGUE, group).meets.filter(inPreferences(s)))).toEqual(
      ids(explore)
    )
  })

  it('a widened list holds everything Explore finds, and more', () => {
    // Too few in this field and country for tier 2, enough in the field for tier 3
    const rare = Array.from({ length: 12 }, (_, i) =>
      program({
        id: `rare-${i}`,
        minIBPoints: 24 + i,
        courseRequirements: [],
        ...place('medicine', i < 3 ? 'ie' : COUNTRIES[i % COUNTRIES.length])
      })
    )
    const programs = [...CATALOGUE, ...rare]
    const s = student(38, ['medicine'], ['ie'])

    const { meets, tier } = matchesMeets(s, programs)
    const explore = ids(exploreMeets(s, programs))

    expect(tier).toBe(3)
    expect(explore).toHaveLength(3)
    expect(ids(meets)).toEqual(expect.arrayContaining(explore))
    expect(meets.length).toBeGreaterThan(explore.length)
  })
})
