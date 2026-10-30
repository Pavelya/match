import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// A coordinator sees the list the student sees (MAINT 5.44): the same cached value, in the order
// the student's page shows it, and no list where the student has none. The Redis mock is a Map of
// JSON strings and the matcher is the real one, so a shared key and a second calculation both show.
// Another school's student is refused in app/api/coordinator/cross-school.test.ts.

const { prismaMock, store, redisMock, programsMock, authMock } = vi.hoisted(() => {
  const store = new Map<string, string>()
  return {
    prismaMock: {
      coordinatorProfile: { findFirst: vi.fn() },
      studentProfile: { findUnique: vi.fn() }
    },
    store,
    redisMock: {
      get: vi.fn(async (key: string) => {
        const value = store.get(key)
        return value === undefined ? null : JSON.parse(value)
      }),
      set: vi.fn(async (key: string, value: unknown) => {
        store.set(key, JSON.stringify(value))
        return 'OK'
      })
    },
    programsMock: vi.fn(),
    authMock: vi.fn()
  }
})

vi.mock('@/lib/prisma', () => ({ prisma: prismaMock }))
vi.mock('@/lib/redis/client', () => ({ redis: redisMock }))
vi.mock('@/lib/matching/program-cache', () => ({ getCachedPrograms: programsMock }))
vi.mock('@/lib/auth/config', () => ({ auth: authMock }))
vi.mock('@/lib/rate-limit', () => ({ applyRateLimit: vi.fn(async () => null) }))
vi.mock('@/lib/logger', () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn(), debug: vi.fn() }
}))
vi.mock('@/lib/matching/optimized-matcher', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/matching/optimized-matcher')>()
  return { ...actual, calculateOptimizedMatches: vi.fn(actual.calculateOptimizedMatches) }
})

import { NextRequest } from 'next/server'
import { calculateOptimizedMatches } from '@/lib/matching/optimized-matcher'
import { rankedResults } from '@/lib/matching/match-list'
import type { CachedProgram } from '@/lib/matching/program-cache'
import type { V10MatchResult } from '@/lib/matching'
import { GET as studentList } from '@/app/api/students/matches/list/route'
import { GET } from './route'

const STUDENT = {
  id: 'profile-1',
  userId: 'student-user',
  schoolId: 'school-1',
  coordinatorAccessConsentAt: new Date('2026-01-01'),
  totalIBPoints: 36,
  tokGrade: 'B',
  eeGrade: 'C',
  openToAllFields: false,
  openToAllLocations: false,
  user: { id: 'student-user', name: 'A Student', email: 'student@example.com' },
  courses: [{ level: 'HL', grade: 6, ibCourse: { id: 'physics', name: 'Physics' } }],
  preferredFields: [{ id: 'field-1', name: 'Field' }],
  preferredCountries: [{ id: 'country-1', name: 'Country' }],
  savedPrograms: []
}

function program(i: number, minIBPoints: number): CachedProgram {
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
    minIBPoints,
    requirementsEntryYear: 2027,
    programUrl: null,
    courseRequirements: []
  }
}

/** More than the index's 50, minimums 24 to 45: all tie on score in their status */
const PROGRAMS = Array.from({ length: 80 }, (_, i) => program(i, 24 + (i % 22)))

function coordinator(overrides: Record<string, unknown> = {}) {
  return {
    id: 'coordinator-1',
    userId: 'coord-user',
    isActive: true,
    school: { id: 'school-1', subscriptionTier: 'VIP', subscriptionStatus: 'ACTIVE' },
    ...overrides
  }
}

async function get() {
  return GET(new NextRequest('http://localhost/api/coordinator/students/profile-1/matches'), {
    params: Promise.resolve({ id: 'profile-1' })
  })
}

beforeEach(() => {
  store.clear()
  vi.clearAllMocks()
  vi.stubEnv('MATCHING_V10_FULL', 'true')
  authMock.mockResolvedValue({ user: { id: 'coord-user' } })
  prismaMock.coordinatorProfile.findFirst.mockResolvedValue(coordinator())
  prismaMock.studentProfile.findUnique.mockResolvedValue(STUDENT)
  programsMock.mockResolvedValue(PROGRAMS)
})

afterEach(() => {
  vi.unstubAllEnvs()
})

describe('GET /api/coordinator/students/[id]/matches', () => {
  it('stores the list under matchesV10: and never matches:', async () => {
    expect((await get()).status).toBe(200)

    expect(redisMock.set).toHaveBeenCalledTimes(1)
    expect(redisMock.set.mock.calls[0][0]).toBe('matchesV10:student-user:0.60_0.30_0.10:80')
    expect([...store.keys()].filter((key) => key.startsWith('matches:'))).toEqual([])
  })

  it('costs a cache hit when the student has just loaded Matches', async () => {
    authMock.mockResolvedValueOnce({ user: { id: 'student-user' } })
    await studentList()
    expect(calculateOptimizedMatches).toHaveBeenCalledTimes(1)

    expect((await get()).status).toBe(200)

    expect(calculateOptimizedMatches).toHaveBeenCalledTimes(1)
    expect(redisMock.set).toHaveBeenCalledTimes(1)
  })

  it('sends the top 10 in rankedResults’ order, keeping the response’s shape', async () => {
    const body = await (await get()).json()

    const cached = JSON.parse([...store.values()][0]) as V10MatchResult[]
    const expected = rankedResults(cached, new Map(PROGRAMS.map((p) => [p.id, p])), 36)
    expect(body.matches.map((m: { programId: string }) => m.programId)).toEqual(
      expected.slice(0, 10).map((r) => r.programId)
    )
    // The closest minimum first, not catalogue order
    expect(
      body.matches.slice(0, 5).map((m: { program: CachedProgram }) => m.program.minIBPoints)
    ).toEqual([36, 36, 36, 36, 35])
    expect(Object.keys(body).sort()).toEqual([
      'matches',
      'returnedCount',
      'student',
      'totalMatches'
    ])
    expect(body.returnedCount).toBe(10)
    expect(body.totalMatches).toBe(expected.length)
    expect(body.matches[0]).toMatchObject({
      overallScore: expect.any(Number),
      academicMatch: expect.any(Object),
      locationMatch: expect.any(Object),
      fieldMatch: expect.any(Object),
      weightsUsed: expect.any(Object),
      adjustments: expect.any(Object),
      program: { university: { name: 'University' }, country: { code: 'CC' } }
    })
  })

  it('a student without subjects has no list, as on Matches, and costs no read', async () => {
    prismaMock.studentProfile.findUnique.mockResolvedValue({ ...STUDENT, courses: [] })

    const res = await get()

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({
      matches: [],
      student: { id: 'profile-1', name: 'A Student', email: 'student@example.com' },
      totalMatches: 0,
      returnedCount: 0
    })
    expect(programsMock).not.toHaveBeenCalled()
    expect(redisMock.get).not.toHaveBeenCalled()
    expect(redisMock.set).not.toHaveBeenCalled()
  })

  it.each([
    [
      'no consent',
      () =>
        prismaMock.studentProfile.findUnique.mockResolvedValue({
          ...STUDENT,
          coordinatorAccessConsentAt: null
        })
    ],
    [
      'no access',
      () =>
        prismaMock.coordinatorProfile.findFirst.mockResolvedValue(
          coordinator({
            school: { id: 'school-1', subscriptionTier: 'REGULAR', subscriptionStatus: 'INACTIVE' }
          })
        )
    ],
    [
      'a revoked coordinator',
      () =>
        prismaMock.coordinatorProfile.findFirst.mockResolvedValue(coordinator({ isActive: false }))
    ]
  ])('%s is refused, having read no list', async (_name, arrange) => {
    arrange()

    const res = await get()

    expect(res.status).toBe(403)
    expect(programsMock).not.toHaveBeenCalled()
    expect(redisMock.get).not.toHaveBeenCalled()
  })
})
