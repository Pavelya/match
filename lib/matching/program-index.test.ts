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
  // Student with 38 points, ±10 margin = 28-48 range
  const pointsFilter = index.filterByPoints(38, 10)

  it('Filter by points: a reasonable count', () => {
    // Most programs match, since the range covers 28-48 and includes the no-requirement bucket
    expect(pointsFilter.size).toBeGreaterThan(0)
    expectBetween(pointsFilter.size, 10, 100)
  })

  it('Filter by narrow points: fewer results', () => {
    expect(index.filterByPoints(40, 3).size).toBeLessThan(pointsFilter.size)
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

  it('Combined filter: has results', () => {
    expect(combined.length).toBeGreaterThan(0)
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
    expect(calculateReductionRatio(100, typicalFilter.length)).toBeGreaterThan(1)
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
