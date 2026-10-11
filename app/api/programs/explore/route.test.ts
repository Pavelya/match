import { beforeEach, describe, expect, it, vi } from 'vitest'

// Explore's list (rebranding 2.3): one search in the search service's own order; every match,
// past its 1,000-hit window, for the points sorts and "Only ones I qualify for"; the fit only
// for a signed-in student with grades, from one narrow read; nothing read for anyone else.

const { authMock, prismaMock, programsMock, searchMock, browseMock } = vi.hoisted(() => ({
  authMock: vi.fn(),
  prismaMock: { studentProfile: { findUnique: vi.fn() } },
  programsMock: vi.fn(),
  searchMock: vi.fn(),
  browseMock: vi.fn()
}))

vi.mock('server-only', () => ({}))
vi.mock('next/cache', () => ({ unstable_cache: (fn: unknown) => fn }))
vi.mock('@/lib/auth/config', () => ({ auth: authMock }))
vi.mock('@/lib/prisma', () => ({ prisma: prismaMock }))
vi.mock('@/lib/matching/program-cache', () => ({ getCachedPrograms: programsMock }))
vi.mock('@/lib/rate-limit', () => ({
  applyRateLimit: vi.fn(async () => null),
  getClientIp: vi.fn(() => '127.0.0.1')
}))
vi.mock('@/lib/algolia/client', () => ({
  INDEX_NAMES: { PROGRAMS: 'programs_test' },
  getAlgoliaClient: () => ({ searchSingleIndex: searchMock, browseObjects: browseMock })
}))

import { NextRequest } from 'next/server'
import type { ExploreResponse } from '@/lib/explore/types'
import { GET } from './route'

/** 1,200 programs, more than the search's 1,000-hit window. Every tenth has no IB minimum. */
const COUNT = 1200
const minimum = (i: number) => (i % 10 === 0 ? null : 24 + (i % 22))
const id = (i: number) => `program-${i}`

const records = Array.from({ length: COUNT }, (_, i) => ({
  objectID: id(i),
  programName: `Program ${i}`,
  universityName: 'University of Toronto',
  country: { name: 'Canada' },
  duration: '4 years',
  ...(minimum(i) === null ? { admitRate: 4.6 } : { minimumIBPoints: minimum(i) })
}))

function cachedProgram(i: number) {
  return {
    id: id(i),
    name: `Program ${i}`,
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
      country: { id: 'ca', name: 'Canada', code: 'CA', flagEmoji: '' }
    },
    fieldOfStudyId: 'f',
    fieldOfStudy: { id: 'f', name: 'Field', iconName: null, description: null },
    degreeType: 'BSc',
    duration: '4 years',
    campusCity: null,
    minIBPoints: minimum(i),
    requirementsEntryYear: 2027,
    programUrl: null,
    courseRequirements: []
  }
}

const PROFILE = {
  totalIBPoints: 38,
  tokGrade: 'B',
  eeGrade: 'B',
  courses: [{ level: 'HL', grade: 6, ibCourse: { id: 'physics', name: 'Physics' } }]
}

/** The search service, as far as the route uses it: its order is the records' order */
type SearchArgs = {
  searchParams: { offset?: number; length?: number; hitsPerPage?: number; page?: number }
}

function request(search: string) {
  return new NextRequest(`http://localhost/api/programs/explore?${search}`)
}

async function get(search: string): Promise<ExploreResponse> {
  const response = await GET(request(search))
  expect(response.status).toBe(200)
  return response.json()
}

beforeEach(() => {
  vi.clearAllMocks()
  authMock.mockResolvedValue(null)
  prismaMock.studentProfile.findUnique.mockResolvedValue(PROFILE)
  programsMock.mockResolvedValue(Array.from({ length: COUNT }, (_, i) => cachedProgram(i)))
  searchMock.mockImplementation(async ({ searchParams: p }: SearchArgs) => {
    const start = p.offset ?? (p.page ?? 0) * (p.hitsPerPage ?? 20)
    const length = p.length ?? p.hitsPerPage ?? 20
    return { nbHits: COUNT, hits: records.slice(start, Math.min(start + length, 1000)) }
  })
  browseMock.mockImplementation(async ({ aggregator }) => {
    for (let i = 0; i < COUNT; i += 1000) aggregator({ hits: records.slice(i, i + 1000) })
  })
})

describe('GET /api/programs/explore', () => {
  it('signed out: one search for the window, no fit, nothing read', async () => {
    const body = await get('q=science&offset=20&length=20')
    expect(body.total).toBe(COUNT)
    expect(body.rows.map((r) => r.id)).toEqual(records.slice(20, 40).map((r) => r.objectID))
    expect(body.rows[0]).toMatchObject({ university: 'University of Toronto', country: 'Canada' })
    expect(body.fits).toBeUndefined()
    expect(searchMock).toHaveBeenCalledOnce()
    expect(searchMock.mock.calls[0][0].searchParams).toMatchObject({
      query: 'science',
      offset: 20,
      length: 20
    })
    expect(browseMock).not.toHaveBeenCalled()
    expect(prismaMock.studentProfile.findUnique).not.toHaveBeenCalled()
    expect(programsMock).not.toHaveBeenCalled()
  })

  it('signed in with grades: each row comes with its fit, from one narrow read', async () => {
    authMock.mockResolvedValue({ user: { id: 'user-1' } })
    const body = await get('')
    expect(body.rows).toHaveLength(20)
    expect(Object.keys(body.fits ?? {})).toEqual(body.rows.map((r) => r.id))
    // program-1 needs 25, program-0 none, program-17 needs 41: three points short is within reach
    expect(body.fits?.['program-0']).toEqual({ status: 'meets', badge: 'Meets all requirements' })
    expect(body.fits?.['program-17']).toEqual({
      status: 'close',
      badge: 'Within reach · 3 points short'
    })
    expect(prismaMock.studentProfile.findUnique).toHaveBeenCalledOnce()
    expect(prismaMock.studentProfile.findUnique.mock.calls[0][0].select).not.toHaveProperty(
      'savedPrograms'
    )
  })

  it('"Only ones I qualify for" counts every match, past the search window', async () => {
    authMock.mockResolvedValue({ user: { id: 'user-1' } })
    const meets = records.filter((_, i) => (minimum(i) ?? 0) <= 38)
    const body = await get('qualify=1&offset=0&length=20')
    expect(body.total).toBe(meets.length)
    expect(body.rows.map((r) => r.id)).toEqual(meets.slice(0, 20).map((r) => r.objectID))
    expect(Object.values(body.fits ?? {}).every((fit) => fit?.status === 'meets')).toBe(true)
    expect(browseMock).toHaveBeenCalledOnce()
  })

  it('signed out, the switch is ignored: it needs grades', async () => {
    const body = await get('qualify=1')
    expect(body.total).toBe(COUNT)
    expect(browseMock).not.toHaveBeenCalled()
  })

  it('sorts by points over every match, programs with no minimum last', async () => {
    const low = await get('sort=low&length=400')
    expect(low.total).toBe(COUNT)
    expect(low.rows[0].minIBPoints).toBe(24)
    const lows = low.rows.map((r) => r.minIBPoints ?? Infinity)
    expect(lows).toEqual([...lows].sort((a, b) => a - b))

    const last = await get(`sort=high&offset=${COUNT - 20}&length=20`)
    expect(last.rows.every((r) => r.minIBPoints === null)).toBe(true)
    expect(last.rows[0].admitRate).toBe(4.6)
  })

  it('says so when the search fails', async () => {
    searchMock.mockRejectedValue(new Error('unreachable'))
    const response = await GET(request(''))
    expect(response.status).toBe(500)
  })
})
