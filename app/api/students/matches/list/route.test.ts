import { beforeEach, describe, expect, it, vi } from 'vitest'

// The new Matches page groups what this route returns, so it must return every match, with no
// cap (D4.6: group before any cap), and read nothing beyond the one profile query.

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
import type { MatchesResponse } from '@/lib/matching/match-groups'
import { GET } from './route'

const PROFILE = {
  totalIBPoints: 36,
  tokGrade: 'B',
  eeGrade: 'C',
  openToAllFields: false,
  openToAllLocations: false,
  courses: [{ level: 'HL', grade: 6, ibCourse: { id: 'physics', name: 'Physics' } }],
  preferredFields: [{ id: 'field-1', name: 'Field' }],
  preferredCountries: [{ id: 'country-1', name: 'Country' }],
  savedPrograms: [{ programId: 'program-3' }]
}

function program(i: number) {
  return {
    id: `program-${i}`,
    name: `Program ${String(i).padStart(3, '0')}`,
    universityId: 'uni-1',
    university: {
      id: 'uni-1',
      name: 'University',
      abbreviatedName: null,
      image: null,
      city: 'City',
      admitRate: null,
      internationalAdmitRate: null,
      admitRateYear: null,
      country: { id: 'country-1', name: 'Country', code: 'CC', flagEmoji: '' }
    },
    fieldOfStudyId: 'field-1',
    fieldOfStudy: { id: 'field-1', name: 'Field', iconName: null, description: null },
    degreeType: 'BSc',
    duration: '3 years',
    campusCity: null,
    minIBPoints: 30 + (i % 10),
    requirementsEntryYear: 2027,
    programUrl: null,
    courseRequirements: []
  }
}

/** Matches as the V10 cache holds them, best first */
function matches(count: number) {
  return Array.from({ length: count }, (_, i) => {
    const short = Math.max(0, 30 + (i % 10) - 36)
    return {
      programId: `program-${i}`,
      overallScore: short > 0 ? 0.88 : 1,
      academicMatch: {
        score: 1,
        subjectsMatchScore: 1,
        meetsPointsRequirement: short === 0,
        pointsShortfall: short,
        subjectMatches: [],
        missingCriticalCount: 0,
        missingNonCriticalCount: 0
      },
      fieldMatch: { score: 1, isMatch: true, noPreferences: false },
      locationMatch: { score: 1, isMatch: true, noPreferences: false },
      weightsUsed: { academic: 0.6, location: 0.3, field: 0.1 },
      adjustments: { rawScore: 1, finalScore: 1, caps: {}, reasons: [] }
    }
  })
}

async function get(): Promise<MatchesResponse> {
  return (await GET()).json()
}

beforeEach(() => {
  vi.clearAllMocks()
  prismaMock.studentProfile.findUnique.mockResolvedValue(PROFILE)
  programsMock.mockResolvedValue(Array.from({ length: 200 }, (_, i) => program(i)))
})

describe('GET /api/students/matches/list', () => {
  it(`returns every match, past ${MAX_MATCHES_RETURNED}, as cards`, async () => {
    redisMock.get.mockResolvedValue(matches(120))

    const body = await get()
    if (!body.complete) throw new Error('expected a list')

    expect(body.matches).toHaveLength(120)
    // Minimums of 30 to 39 against 36 points: met, or up to 3 short
    expect(new Set(body.matches.map((m) => m.status))).toEqual(new Set(['meets', 'close']))
    expect(body.matches[0]).toMatchObject({ score: 100, status: 'meets', initials: 'U' })
    expect(body.savedIds).toEqual(['program-3'])
    expect(body.widened).toBe(false)
    expect(body.profile).toMatchObject({ total: 36, core: 'B · C (+2)', fields: ['Field'] })
    // The one profile query, nothing else from the database
    expect(prismaMock.studentProfile.findUnique).toHaveBeenCalledTimes(1)
  })

  it('orders best fit: the minimum closest to the total first among equal scores', async () => {
    redisMock.get.mockResolvedValue(matches(10))

    const body = await get()
    if (!body.complete) throw new Error('expected a list')

    expect(body.matches.map((m) => m.minIBPoints)).toEqual([36, 35, 34, 33, 32, 31, 30, 37, 38, 39])
  })

  it('a profile without subjects gets first run’s steps, and no matching', async () => {
    prismaMock.studentProfile.findUnique.mockResolvedValue({
      ...PROFILE,
      courses: [],
      totalIBPoints: null
    })

    const body = await get()

    expect(body).toEqual({
      complete: false,
      steps: [
        { name: 'Interests', done: true, detail: 'Field' },
        { name: 'Countries', done: true, detail: 'Country' },
        { name: 'Subjects and grades', done: false, detail: 'Not added yet' }
      ]
    })
    expect(programsMock).not.toHaveBeenCalled()
  })

  it('no profile at all is the same call to action', async () => {
    prismaMock.studentProfile.findUnique.mockResolvedValue(null)
    const body = await get()
    expect(body.complete).toBe(false)
  })
})
