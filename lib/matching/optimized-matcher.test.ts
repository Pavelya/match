import { describe, expect, it } from 'vitest'
import {
  calculateOptimizedMatches,
  calculateMatchesWithIndex,
  benchmarkMatching,
  getGlobalProgramIndex,
  invalidateGlobalProgramIndex
} from './optimized-matcher'
import { createProgramIndex } from './program-index'
import type { StudentProfile, ProgramRequirements } from './types'

const testStudent: StudentProfile = {
  courses: [
    { courseId: 'math-hl', courseName: 'Mathematics', level: 'HL', grade: 6 },
    { courseId: 'phys-hl', courseName: 'Physics', level: 'HL', grade: 5 },
    { courseId: 'chem-hl', courseName: 'Chemistry', level: 'HL', grade: 6 },
    { courseId: 'eng-sl', courseName: 'English', level: 'SL', grade: 6 },
    { courseId: 'hist-sl', courseName: 'History', level: 'SL', grade: 5 },
    { courseId: 'span-sl', courseName: 'Spanish', level: 'SL', grade: 5 }
  ],
  totalIBPoints: 38,
  tokGrade: 'B',
  eeGrade: 'B',
  interestedFields: ['engineering', 'science'],
  preferredCountries: ['uk', 'germany']
}

function generateTestPrograms(count: number): ProgramRequirements[] {
  const fields = ['engineering', 'medicine', 'business', 'arts', 'science']
  const countries = ['uk', 'germany', 'usa', 'netherlands', 'sweden']
  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Economics']

  const programs: ProgramRequirements[] = []

  for (let i = 0; i < count; i++) {
    const field = fields[i % fields.length]
    const country = countries[i % countries.length]
    const points = 28 + (Math.floor(i / 10) % 15) // 28-42 range

    programs.push({
      programId: `prog-${i}`,
      programName: `Program ${i}`,
      universityId: `uni-${i % 20}`,
      universityName: `University ${i % 20}`,
      type: 'FULL_REQUIREMENTS',
      fieldId: field,
      countryId: country,
      minimumIBPoints: points,
      requiredSubjects: [
        {
          courseId: `${subjects[i % 5].toLowerCase()}-hl`,
          courseName: subjects[i % 5],
          level: 'HL',
          minimumGrade: 5,
          isCritical: i % 3 === 0
        }
      ],
      orGroupRequirements: []
    })
  }

  return programs
}

/** A points-only program; the tiered-fallback cases differ only in field and country. */
function pointsOnly(
  programId: string,
  programName: string,
  i: number,
  fieldId: string,
  countryId: string
): ProgramRequirements {
  return {
    programId,
    programName,
    universityId: `uni-${i}`,
    universityName: `University ${i}`,
    type: 'POINTS_ONLY',
    fieldId,
    countryId,
    minimumIBPoints: 35,
    requiredSubjects: [],
    orGroupRequirements: []
  }
}

const smallPrograms = generateTestPrograms(50)
const largePrograms = generateTestPrograms(500)

/* Each describe computes its result at collection time, in file order, as the old script did. */

describe('basic optimized matching', () => {
  const basicResult = calculateOptimizedMatches(testStudent, smallPrograms)

  it('Basic: returns results', () => {
    expect(basicResult.results.length).toBeGreaterThan(0)
  })

  it('Basic: has stats', () => {
    expect(basicResult.stats.totalPrograms).toBe(50)
  })

  it('Basic: results sorted by score', () => {
    expect(basicResult.results[0].overallScore).toBeGreaterThanOrEqual(
      basicResult.results[basicResult.results.length - 1].overallScore
    )
  })
})

describe('candidate filtering with index', () => {
  const filteredResult = calculateOptimizedMatches(testStudent, largePrograms, {
    useIndex: true,
    pointsMargin: 5
  })

  it('Filtering: reduces candidates', () => {
    expect(filteredResult.stats.candidatesAfterFilter).toBeLessThan(
      filteredResult.stats.totalPrograms
    )
  })

  it('Filtering: reduction ratio > 1', () => {
    expect(filteredResult.stats.reductionRatio).toBeGreaterThan(1)
  })
})

describe('cache', () => {
  const cachedResult = calculateOptimizedMatches(testStudent, smallPrograms, { useCache: true })

  it('Cache: has stats', () => {
    expect(cachedResult.stats.cacheStats).not.toBe(undefined)
  })

  it('Cache: tracks operations', () => {
    // The first run is all misses, so only the counting is checked
    expect(
      (cachedResult.stats.cacheStats?.hits ?? 0) + (cachedResult.stats.cacheStats?.misses ?? 0)
    ).toBeGreaterThan(0)
  })
})

describe('pre-built index', () => {
  const indexResult = calculateMatchesWithIndex(testStudent, createProgramIndex(largePrograms), {
    pointsMargin: 10
  })

  it('Index matching: returns results', () => {
    expect(indexResult.results.length).toBeGreaterThan(0)
  })

  it('Index matching: has filter time and match time', () => {
    expect(indexResult.stats.filterTimeMs).toBeGreaterThanOrEqual(0)
    expect(indexResult.stats.matchTimeMs).toBeGreaterThanOrEqual(0)
  })
})

describe('global index', () => {
  invalidateGlobalProgramIndex()
  const globalIndex1 = getGlobalProgramIndex(largePrograms)
  const globalIndex2 = getGlobalProgramIndex(largePrograms)
  invalidateGlobalProgramIndex()
  const globalIndex3 = getGlobalProgramIndex(largePrograms)

  it('Global index: returns same instance', () => {
    expect(globalIndex1).toBe(globalIndex2)
  })

  it('Global index: new after invalidate', () => {
    expect(globalIndex1).not.toBe(globalIndex3)
  })
})

describe('score equivalence', () => {
  const benchmark = benchmarkMatching(testStudent, smallPrograms)

  it('Benchmark: top 10 scores match', () => {
    expect(benchmark.scoresMatch).toBe(true)
  })

  it('Benchmark: has speedup data', () => {
    expect(benchmark.speedup).toBeGreaterThan(0)
  })
})

describe('performance', () => {
  const perfResult = calculateOptimizedMatches(testStudent, generateTestPrograms(200), {
    useIndex: true,
    useCache: true
  })

  it('Performance: total time < 500ms', () => {
    expect(perfResult.stats.totalTimeMs).toBeGreaterThanOrEqual(0)
    expect(perfResult.stats.totalTimeMs).toBeLessThanOrEqual(500)
  })
})

describe('config options', () => {
  const noIndexResult = calculateOptimizedMatches(testStudent, smallPrograms, { useIndex: false })
  const noCacheResult = calculateOptimizedMatches(testStudent, smallPrograms, { useCache: false })

  it('No index: processes all programs', () => {
    expect(noIndexResult.stats.candidatesAfterFilter).toBe(50)
  })

  it('No cache: no cache stats', () => {
    expect(noCacheResult.stats.cacheStats).toBe(undefined)
  })
})

describe('tiered fallback', () => {
  const ukEngineeringStudent: StudentProfile = {
    ...testStudent,
    interestedFields: ['engineering'],
    preferredCountries: ['uk']
  }

  // Only 3 programs match the student's field
  const sparseFieldResult = calculateOptimizedMatches(
    ukEngineeringStudent,
    [
      ...Array.from({ length: 3 }, (_, i) =>
        pointsOnly(`sparse-field-${i}`, `Engineering Program ${i}`, i, 'engineering', 'uk')
      ),
      ...Array.from({ length: 50 }, (_, j) =>
        pointsOnly(`sparse-field-${j + 3}`, `Arts Program ${j + 3}`, j + 3, 'arts', 'uk')
      )
    ],
    { useIndex: true }
  )

  // Only 5 programs match the student's country
  const sparseCountryResult = calculateOptimizedMatches(
    ukEngineeringStudent,
    [
      ...Array.from({ length: 5 }, (_, i) =>
        pointsOnly(`sparse-country-${i}`, `UK Program ${i}`, i, 'engineering', 'uk')
      ),
      ...Array.from({ length: 50 }, (_, j) =>
        pointsOnly(`sparse-country-${j + 5}`, `USA Program ${j + 5}`, j + 5, 'engineering', 'usa')
      )
    ],
    { useIndex: true }
  )

  // No program matches both field and country
  const emptyIntResult = calculateOptimizedMatches(
    ukEngineeringStudent,
    [
      ...Array.from({ length: 30 }, (_, i) =>
        pointsOnly(`empty-int-${i}`, `Engineering USA ${i}`, i, 'engineering', 'usa')
      ),
      ...Array.from({ length: 30 }, (_, j) =>
        pointsOnly(`empty-int-${j + 30}`, `UK Arts ${j + 30}`, j + 30, 'arts', 'uk')
      )
    ],
    { useIndex: true }
  )

  // The normal student with the large catalogue has enough matches
  const normalFallbackResult = calculateOptimizedMatches(testStudent, largePrograms, {
    useIndex: true
  })

  it('Sparse field: returns at least 10 results, from a fallback tier > 1', () => {
    expect(sparseFieldResult.results.length).toBeGreaterThanOrEqual(10)
    expect(sparseFieldResult.stats.fallbackTierUsed ?? 1).toBeGreaterThan(1)
  })

  it('Sparse country: returns at least 10 results, from a fallback tier > 1', () => {
    expect(sparseCountryResult.results.length).toBeGreaterThanOrEqual(10)
    expect(sparseCountryResult.stats.fallbackTierUsed ?? 1).toBeGreaterThan(1)
  })

  it('Empty intersection: returns at least 10 results, from a fallback tier >= 3', () => {
    expect(emptyIntResult.results.length).toBeGreaterThanOrEqual(10)
    expect(emptyIntResult.stats.fallbackTierUsed ?? 1).toBeGreaterThanOrEqual(3)
  })

  it('Normal case: returns at least 10 results with no fallback (tier 1)', () => {
    expect(normalFallbackResult.results.length).toBeGreaterThanOrEqual(10)
    expect(normalFallbackResult.stats.fallbackTierUsed ?? 1).toBe(1)
  })
})
