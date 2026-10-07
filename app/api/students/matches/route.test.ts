import { beforeEach, describe, expect, it, vi } from 'vitest'

// The matches page shows what this route returns, so it must return every match the
// algorithm finds (up to MAX_MATCHES_RETURNED) and count them honestly.

const { prismaMock, redisMock, programsMock } = vi.hoisted(() => ({
  prismaMock: { studentProfile: { findUnique: vi.fn() } },
  redisMock: { get: vi.fn(), set: vi.fn() },
  programsMock: vi.fn()
}))

vi.mock('@/lib/prisma', () => ({ prisma: prismaMock }))
vi.mock('@/lib/redis/client', () => ({ redis: redisMock }))
vi.mock('@/lib/matching/program-cache', () => ({ getCachedPrograms: programsMock }))
vi.mock('@/lib/auth/config', () => ({ auth: vi.fn(async () => ({ user: { id: 'user-1' } })) }))
vi.mock('@/lib/rate-limit', () => ({ applyRateLimit: vi.fn(async () => null) }))

import { MAX_MATCHES_RETURNED } from '@/lib/matching'
import { GET } from './route'

function program(i: number) {
  return {
    id: `program-${i}`,
    name: `Program ${i}`,
    universityId: 'uni-1',
    university: {
      id: 'uni-1',
      name: 'University',
      abbreviatedName: null,
      image: null,
      city: 'City',
      country: { id: 'country-1', name: 'Country', code: 'CC', flagEmoji: '' }
    },
    fieldOfStudyId: 'field-1',
    fieldOfStudy: { id: 'field-1', name: 'Field', iconName: null, description: null },
    degreeType: 'BSc',
    duration: '3 years',
    minIBPoints: 36,
    programUrl: null,
    courseRequirements: []
  }
}

/** Matches as the V10 cache holds them: already filtered, best first. */
function matches(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    programId: `program-${i}`,
    overallScore: 0.9 - i / 1000,
    academicMatch: {},
    fieldMatch: {},
    locationMatch: {},
    category: 'MATCH',
    categoryInfo: {},
    confidence: {},
    fitQuality: {}
  }))
}

beforeEach(() => {
  vi.clearAllMocks()
  prismaMock.studentProfile.findUnique.mockResolvedValue({
    totalIBPoints: 36,
    tokGrade: 'B',
    eeGrade: 'C',
    courses: [],
    preferredFields: [],
    preferredCountries: []
  })
  programsMock.mockResolvedValue(Array.from({ length: 100 }, (_, i) => program(i)))
})

describe('GET /api/students/matches', () => {
  it('returns every match, not only the top 10', async () => {
    redisMock.get.mockResolvedValue(matches(14))

    const body = await (await GET()).json()

    expect(body.totalMatches).toBe(14)
    expect(body.returnedCount).toBe(14)
    expect(body.matches.map((m: { programId: string }) => m.programId)).toEqual(
      matches(14).map((m) => m.programId)
    )
    expect(body.matches.every((m: { program: unknown }) => m.program !== null)).toBe(true)
  })

  it(`stops at ${MAX_MATCHES_RETURNED}, best first, and still counts them all`, async () => {
    redisMock.get.mockResolvedValue(matches(MAX_MATCHES_RETURNED + 10))

    const body = await (await GET()).json()

    expect(body.totalMatches).toBe(MAX_MATCHES_RETURNED + 10)
    expect(body.returnedCount).toBe(MAX_MATCHES_RETURNED)
    expect(body.matches).toHaveLength(MAX_MATCHES_RETURNED)
    expect(body.matches[0].programId).toBe('program-0')
    expect(body.matches.at(-1).programId).toBe(`program-${MAX_MATCHES_RETURNED - 1}`)
  })
})
