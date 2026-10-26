import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { MATCHING_V10_FLAGS } from '@/lib/feature-flags'
import { calculateMatch, calculateMatches } from './scorer'
import { calculateOptimizedMatches } from './optimized-matcher'
import {
  getCachedMatch,
  getCachedMatches,
  getCachedMatchesV10,
  invalidateStudentCache,
  invalidateProgramCache,
  clearAllMatchCache,
  getCacheStats
} from './cache'
import type { ProgramRequirements, StudentProfile, WeightConfig } from './types'

/*
 * The Redis match cache. Five API routes call `invalidateStudentCache` after a student's grades or
 * preferences change; a missed invalidation shows matches for grades the student no longer has.
 * Redis is a Map of JSON strings, as Upstash returns a parsed copy and never the object stored.
 * The scorer and the optimised matcher are the real ones, wrapped so each test sees whether a
 * result was computed or read.
 */

const { store, redisMock, loggerMock } = vi.hoisted(() => {
  const store = new Map<string, string>()
  const glob = (pattern: string) =>
    new RegExp(`^${pattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*')}$`)
  return {
    store,
    redisMock: {
      get: vi.fn(async (key: string) => {
        const value = store.get(key)
        return value === undefined ? null : JSON.parse(value)
      }),
      set: vi.fn(async (key: string, value: unknown) => {
        store.set(key, JSON.stringify(value))
        return 'OK'
      }),
      del: vi.fn(async (...keys: string[]) => keys.filter((key) => store.delete(key)).length),
      // Like Redis, `count` is how many keys one call examines, not how many it returns
      scan: vi.fn(async (cursor: number, { match, count }: { match: string; count: number }) => {
        const keys = [...store.keys()]
        const next = cursor + count < keys.length ? cursor + count : 0
        const page = keys.slice(cursor, cursor + count).filter((key) => glob(match).test(key))
        return [String(next), page] as [string, string[]]
      })
    },
    loggerMock: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() }
  }
})

vi.mock('@/lib/redis/client', () => ({ redis: redisMock }))
vi.mock('@/lib/logger', () => ({ logger: loggerMock }))
vi.mock('./scorer', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./scorer')>()
  return {
    ...actual,
    calculateMatch: vi.fn(actual.calculateMatch),
    calculateMatches: vi.fn(actual.calculateMatches)
  }
})
vi.mock('./optimized-matcher', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./optimized-matcher')>()
  return { ...actual, calculateOptimizedMatches: vi.fn(actual.calculateOptimizedMatches) }
})

const student: StudentProfile = {
  courses: [
    { courseId: 'math', courseName: 'Mathematics', level: 'HL', grade: 6 },
    { courseId: 'phys', courseName: 'Physics', level: 'HL', grade: 5 },
    { courseId: 'chem', courseName: 'Chemistry', level: 'HL', grade: 6 },
    { courseId: 'eng', courseName: 'English', level: 'SL', grade: 6 },
    { courseId: 'hist', courseName: 'History', level: 'SL', grade: 5 },
    { courseId: 'span', courseName: 'Spanish', level: 'SL', grade: 5 }
  ],
  totalIBPoints: 36,
  tokGrade: 'B',
  eeGrade: 'B',
  interestedFields: ['engineering'],
  preferredCountries: ['uk']
}

const program = (i: number, minimumIBPoints: number): ProgramRequirements => ({
  programId: `prog-${i}`,
  programName: `Program ${i}`,
  universityId: `uni-${i}`,
  universityName: `University ${i}`,
  type: 'FULL_REQUIREMENTS',
  fieldId: 'engineering',
  countryId: 'uk',
  minimumIBPoints,
  requiredSubjects: [
    { courseId: 'math', courseName: 'Mathematics', level: 'HL', minimumGrade: 6, isCritical: true }
  ],
  orGroupRequirements: []
})

const programs = [program(1, 34), program(2, 36), program(3, 38)]
const BALANCED: WeightConfig = { academic: 0.6, location: 0.3, field: 0.1 }
const ACADEMIC: WeightConfig = { academic: 0.8, location: 0.1, field: 0.1 }

beforeEach(() => {
  store.clear()
  vi.clearAllMocks()
  // Production's `.env` sets MATCHING_V10_FULL; each test sets the flags it needs
  for (const flag of MATCHING_V10_FLAGS) {
    vi.stubEnv(flag, undefined)
    vi.stubEnv(`${flag}_ROLLOUT`, undefined)
  }
})

afterEach(() => {
  vi.unstubAllEnvs()
})

describe('getCachedMatch', () => {
  it('a miss computes the match and stores it for 30 minutes', async () => {
    const result = await getCachedMatch('student-1', { student, program: programs[0] })

    expect(calculateMatch).toHaveBeenCalledTimes(1)
    expect(result.programId).toBe('prog-1')
    expect(redisMock.set).toHaveBeenCalledWith('match:student-1:prog-1:0.60_0.30_0.10', result, {
      ex: 1800
    })
  })

  it('a hit returns the stored result without computing', async () => {
    const first = await getCachedMatch('student-1', { student, program: programs[0] })
    vi.mocked(calculateMatch).mockClear()

    const second = await getCachedMatch('student-1', { student, program: programs[0] })

    expect(calculateMatch).not.toHaveBeenCalled()
    expect(second).toEqual(first)
  })

  it('the default weights and the same weights given are one key', async () => {
    await getCachedMatch('student-1', { student, program: programs[0] })
    await getCachedMatch('student-1', { student, program: programs[0], weights: BALANCED })

    expect(calculateMatch).toHaveBeenCalledTimes(1)
  })

  it('different weights are different keys', async () => {
    await getCachedMatch('student-1', { student, program: programs[0], weights: BALANCED })
    await getCachedMatch('student-1', { student, program: programs[0], weights: ACADEMIC })

    expect(calculateMatch).toHaveBeenCalledTimes(2)
    expect([...store.keys()]).toEqual([
      'match:student-1:prog-1:0.60_0.30_0.10',
      'match:student-1:prog-1:0.80_0.10_0.10'
    ])
  })

  it('a Redis error falls back to computing', async () => {
    redisMock.get.mockRejectedValueOnce(new Error('Upstash unreachable'))

    const result = await getCachedMatch('student-1', { student, program: programs[0] })

    expect(result.programId).toBe('prog-1')
    expect(calculateMatch).toHaveBeenCalledTimes(1)
    expect(loggerMock.error).toHaveBeenCalledTimes(1)
  })
})

describe('getCachedMatches', () => {
  it('a miss computes every match and stores the list under the program count', async () => {
    const results = await getCachedMatches('student-1', student, programs)

    expect(calculateMatches).toHaveBeenCalledTimes(1)
    expect(results).toHaveLength(3)
    expect(redisMock.set).toHaveBeenCalledWith('matches:student-1:0.60_0.30_0.10:3', results, {
      ex: 1800
    })
  })

  it('a hit returns the stored list without computing', async () => {
    const first = await getCachedMatches('student-1', student, programs)
    vi.mocked(calculateMatches).mockClear()

    const second = await getCachedMatches('student-1', student, programs)

    expect(calculateMatches).not.toHaveBeenCalled()
    expect(second).toEqual(first)
  })

  it('different weights, or a different number of programs, are different keys', async () => {
    await getCachedMatches('student-1', student, programs, undefined, BALANCED)
    await getCachedMatches('student-1', student, programs, undefined, ACADEMIC)
    await getCachedMatches('student-1', student, programs.slice(0, 2), undefined, BALANCED)

    expect(calculateMatches).toHaveBeenCalledTimes(3)
    expect(store.size).toBe(3)
  })

  it('a Redis error falls back to computing', async () => {
    redisMock.get.mockRejectedValueOnce(new Error('Upstash unreachable'))

    const results = await getCachedMatches('student-1', student, programs)

    expect(results).toHaveLength(3)
    expect(calculateMatches).toHaveBeenCalledTimes(1)
  })
})

describe('getCachedMatchesV10', () => {
  it('with MATCHING_V10_FULL, a miss uses the optimised matcher and stores enhanced results', async () => {
    vi.stubEnv('MATCHING_V10_FULL', 'true')

    const results = await getCachedMatchesV10('student-1', student, programs)

    expect(calculateOptimizedMatches).toHaveBeenCalledTimes(1)
    expect(results.length).toBeGreaterThan(0)
    for (const result of results) {
      expect(['SAFETY', 'MATCH', 'REACH', 'UNLIKELY']).toContain(result.category)
      expect(result.confidence).toBeDefined()
      expect(result.fitQuality).toBeDefined()
    }
    expect(redisMock.set).toHaveBeenCalledWith('matchesV10:student-1:0.60_0.30_0.10:3', results, {
      ex: 1800
    })
  })

  it('without it, a miss uses the V9 scorer and still enhances the results', async () => {
    const results = await getCachedMatchesV10('student-1', student, programs)

    expect(calculateOptimizedMatches).not.toHaveBeenCalled()
    expect(calculateMatches).toHaveBeenCalledTimes(1)
    expect(results).toHaveLength(3)
    expect(results.every((result) => result.category !== undefined)).toBe(true)
    expect(store.has('matchesV10:student-1:0.60_0.30_0.10:3')).toBe(true)
  })

  it('a hit returns the stored results without computing', async () => {
    vi.stubEnv('MATCHING_V10_FULL', 'true')
    const first = await getCachedMatchesV10('student-1', student, programs)
    vi.mocked(calculateOptimizedMatches).mockClear()
    vi.mocked(calculateMatch).mockClear()

    const second = await getCachedMatchesV10('student-1', student, programs)

    expect(calculateOptimizedMatches).not.toHaveBeenCalled()
    expect(calculateMatches).not.toHaveBeenCalled()
    expect(calculateMatch).not.toHaveBeenCalled()
    expect(second).toEqual(first)
  })

  it('different weights are different keys', async () => {
    await getCachedMatchesV10('student-1', student, programs, undefined, BALANCED)
    await getCachedMatchesV10('student-1', student, programs, undefined, ACADEMIC)

    expect(calculateMatches).toHaveBeenCalledTimes(2)
    expect([...store.keys()]).toEqual([
      'matchesV10:student-1:0.60_0.30_0.10:3',
      'matchesV10:student-1:0.80_0.10_0.10:3'
    ])
  })

  it('a Redis error falls back to the V9 scorer, enhanced', async () => {
    vi.stubEnv('MATCHING_V10_FULL', 'true')
    redisMock.get.mockRejectedValueOnce(new Error('Upstash unreachable'))

    const results = await getCachedMatchesV10('student-1', student, programs)

    expect(calculateOptimizedMatches).not.toHaveBeenCalled()
    expect(calculateMatches).toHaveBeenCalledTimes(1)
    expect(results).toHaveLength(3)
    expect(results.every((result) => result.category !== undefined)).toBe(true)
  })
})

describe('invalidation', () => {
  /** One student's entries of all three kinds, and another student's. */
  async function fillTwoStudents() {
    for (const id of ['student-1', 'student-10']) {
      await getCachedMatch(id, { student, program: programs[0] })
      await getCachedMatches(id, student, programs)
      await getCachedMatchesV10(id, student, programs)
    }
  }

  it("invalidateStudentCache removes that student's keys and no one else's", async () => {
    await fillTwoStudents()

    await invalidateStudentCache('student-1')

    expect([...store.keys()]).toEqual([
      'match:student-10:prog-1:0.60_0.30_0.10',
      'matches:student-10:0.60_0.30_0.10:3',
      'matchesV10:student-10:0.60_0.30_0.10:3'
    ])
  })

  it('invalidateStudentCache follows the SCAN cursor past the first page', async () => {
    // 150 single matches for student-1 among 150 for student-2: SCAN examines 100 keys a call
    const many = Array.from({ length: 150 }, (_, i) => program(i, 30))
    for (const p of many) {
      await getCachedMatch('student-2', { student, program: p })
      await getCachedMatch('student-1', { student, program: p })
    }

    await invalidateStudentCache('student-1')

    expect(redisMock.scan.mock.calls.length).toBeGreaterThan(3)
    expect(store.size).toBe(150)
    expect([...store.keys()].every((key) => key.startsWith('match:student-2:'))).toBe(true)
  })

  it('after invalidation the next read computes again', async () => {
    await getCachedMatchesV10('student-1', student, programs)
    await invalidateStudentCache('student-1')
    vi.mocked(calculateMatches).mockClear()

    await getCachedMatchesV10('student-1', student, programs)

    expect(calculateMatches).toHaveBeenCalledTimes(1)
  })

  it('invalidateStudentCache catches a Redis error rather than throwing', async () => {
    // The routes run it after their write has succeeded; a Redis outage must not fail them
    redisMock.scan.mockRejectedValueOnce(new Error('Upstash unreachable'))

    await expect(invalidateStudentCache('student-1')).resolves.toBeUndefined()
    expect(loggerMock.error).toHaveBeenCalledTimes(1)
  })

  it("invalidateProgramCache removes that program's single matches only", async () => {
    await fillTwoStudents()
    await getCachedMatch('student-1', { student, program: programs[1] })

    await invalidateProgramCache('prog-1')

    expect([...store.keys()].filter((key) => key.startsWith('match:'))).toEqual([
      'match:student-1:prog-2:0.60_0.30_0.10'
    ])
    expect(store.size).toBe(5)
  })

  it('clearAllMatchCache removes every kind of entry, and getCacheStats counts them', async () => {
    await fillTwoStudents()
    store.set('ratelimit:someone', '1')

    expect(await getCacheStats()).toEqual({ matchKeys: 2, batchKeys: 2, totalKeys: 4 })

    await clearAllMatchCache()

    expect([...store.keys()]).toEqual(['ratelimit:someone'])
  })
})
