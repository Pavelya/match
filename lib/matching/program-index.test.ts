import { describe, expect, it } from 'vitest'
import {
  createProgramIndex,
  createEmptyProgramIndex,
  calculateReductionRatio
} from './program-index'
import type { ProgramRequirements } from './types'

function generateTestPrograms(count: number): ProgramRequirements[] {
  const fields = ['engineering', 'medicine', 'business', 'arts', 'science']
  const countries = ['uk', 'germany', 'usa', 'netherlands', 'sweden']
  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Economics']

  const programs: ProgramRequirements[] = []

  for (let i = 0; i < count; i++) {
    const field = fields[i % fields.length]
    const country = countries[i % countries.length]
    const points = 24 + Math.floor(i / 5) // Points from 24 to 44

    programs.push({
      programId: `prog-${i}`,
      programName: `Program ${i}`,
      universityId: `uni-${i % 20}`,
      universityName: `University ${i % 20}`,
      type: 'FULL_REQUIREMENTS',
      fieldId: field,
      countryId: country,
      minimumIBPoints: points > 45 ? 45 : points,
      requiredSubjects: [
        {
          courseId: `${subjects[i % 5].toLowerCase()}-hl`,
          courseName: subjects[i % 5],
          level: 'HL',
          minimumGrade: 5,
          isCritical: true
        }
      ],
      orGroupRequirements: []
    })
  }

  return programs
}

function expectBetween(actual: number, min: number, max: number) {
  expect(actual).toBeGreaterThanOrEqual(min)
  expect(actual).toBeLessThanOrEqual(max)
}

const testPrograms = generateTestPrograms(100)
const index = createProgramIndex(testPrograms)

describe('filterByPoints', () => {
  // Student with 38 points, margin 10: every minimum up to the 45-49 bucket
  const pointsFilter = index.filterByPoints(38, 10)

  it('Filter by points: a reasonable count', () => {
    // Every program matches: the minimums stop at 43, under the top of the window
    expect(pointsFilter.size).toBeGreaterThan(0)
    expectBetween(pointsFilter.size, 10, 100)
  })

  it('Filter by narrow points: fewer results', () => {
    expect(index.filterByPoints(30, 3).size).toBeLessThan(pointsFilter.size)
  })
})

describe('no lower end (5.40)', () => {
  function program(
    programId: string,
    minimumIBPoints: number | undefined,
    fieldId = 'engineering',
    countryId = 'uk'
  ): ProgramRequirements {
    return { ...testPrograms[0], programId, minimumIBPoints, fieldId, countryId }
  }

  const programs = [24, 25, 40, 44, 45, 49, 50].map((min) => program(`min-${min}`, min))
  const window = createProgramIndex([...programs, program('no-minimum', undefined)])

  it('keeps every minimum from 0 up to the top of the bucket 10 above the total', () => {
    expect([...window.filterByPoints(36, 10)].sort()).toEqual(
      ['min-24', 'min-25', 'min-40', 'min-44', 'min-45', 'min-49', 'no-minimum'].sort()
    )
  })

  it('a lower total stops at a lower bucket', () => {
    const kept = window.filterByPoints(30, 10)
    expect(kept.has('min-24')).toBe(true)
    expect(kept.has('min-44')).toBe(true)
    expect(kept.has('min-45')).toBe(false)
  })

  it('a program under the total still has to be in the field and the country', () => {
    const mixed = createProgramIndex([
      program('theirs', 24),
      program('other-field', 24, 'arts'),
      program('other-country', 24, 'engineering', 'germany')
    ])
    expect(
      mixed.filterCandidates({ studentPoints: 36, fieldIds: ['engineering'], countryIds: ['uk'] })
    ).toEqual(['theirs'])
  })
})

describe('filterByField', () => {
  const engineeringProgs = index.filterByField(['engineering'])

  it('Filter by engineering: approx 20', () => {
    // With 5 fields and 100 programs, expect ~20 engineering
    expect(engineeringProgs.size).toBeGreaterThan(0)
    expectBetween(engineeringProgs.size, 15, 25)
  })

  it('Multiple fields: at least as many as single', () => {
    expect(index.filterByField(['engineering', 'medicine']).size).toBeGreaterThanOrEqual(
      engineeringProgs.size
    )
  })

  it('Non-existent field: empty', () => {
    expect(index.filterByField(['nonexistent']).size).toBe(0)
  })
})

describe('filterByCountry', () => {
  it('Filter by UK: approx 20', () => {
    const ukProgs = index.filterByCountry(['uk'])
    expect(ukProgs.size).toBeGreaterThan(0)
    expectBetween(ukProgs.size, 15, 25)
  })

  it('Filter UK+Germany: approx 40', () => {
    expectBetween(index.filterByCountry(['uk', 'germany']).size, 30, 50)
  })
})

describe('filterCandidates', () => {
  const combined = index.filterCandidates({
    studentPoints: 38,
    pointsMargin: 10,
    fieldIds: ['engineering'],
    countryIds: ['uk']
  })

  it('Combined filter: every engineering program in the UK', () => {
    expect(combined.length).toBe(20)
  })

  it('Combined filter: no more than either filter alone', () => {
    expect(combined.length).toBeLessThanOrEqual(
      Math.min(index.filterByField(['engineering']).size, index.filterByCountry(['uk']).size)
    )
  })

  it('Open to all: at least as many results as combined', () => {
    const openToAll = index.filterCandidates({
      studentPoints: 38,
      includeOpenFields: true,
      includeOpenLocations: true
    })
    expect(openToAll.length).toBeGreaterThanOrEqual(combined.length)
  })

  it('Candidate reduction: > 1x', () => {
    const typicalFilter = index.filterCandidates({
      studentPoints: 36,
      fieldIds: ['engineering', 'science'],
      countryIds: ['uk', 'germany', 'netherlands']
    })
    expect(typicalFilter.length).toBe(20)
    expect(calculateReductionRatio(100, typicalFilter.length)).toBe(5)
  })
})

describe('getStats', () => {
  it('counts the programs and every index', () => {
    const stats = index.getStats()
    expect(stats.totalPrograms).toBe(100)
    expect(stats.pointsBuckets).toBeGreaterThan(0)
    expect(stats.fieldsIndexed).toBeGreaterThan(0)
    expect(stats.countriesIndexed).toBeGreaterThan(0)
    expect(stats.subjectsIndexed).toBeGreaterThan(0)
  })
})

describe('invalidate and rebuild', () => {
  it('empties the index, then rebuilds it from new programs', () => {
    const tempIndex = createProgramIndex(testPrograms.slice(0, 10))
    expect(tempIndex.size).toBe(10)

    tempIndex.invalidate()
    expect(tempIndex.size).toBe(0)

    tempIndex.rebuild(testPrograms.slice(0, 5))
    expect(tempIndex.size).toBe(5)
  })
})

describe('createEmptyProgramIndex', () => {
  it('Empty: size = 0 and the filter returns nothing', () => {
    const empty = createEmptyProgramIndex()
    expect(empty.size).toBe(0)
    expect(empty.filterByPoints(38).size).toBe(0)
  })
})
