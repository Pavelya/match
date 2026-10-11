import { describe, expect, it } from 'vitest'
import { deriveMatchStatus } from '@/lib/matching/match-status'
import type { CachedProgram } from '@/lib/matching/program-cache'
import { calculateMatch } from '@/lib/matching/scorer'
import { transformProgram, transformStudent } from '@/lib/matching/transformers'
import { programFit } from './fit'

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

  it('meets a program with no IB minimum and no named subjects', () => {
    expect(fit(program({ minIBPoints: null, courseRequirements: [] }))).toEqual({
      status: 'meets',
      badge: 'Meets all requirements'
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
})
