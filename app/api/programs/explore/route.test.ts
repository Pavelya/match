import { beforeEach, describe, expect, it, vi } from 'vitest'

// Explore's list (rebranding 2.3): one search in the search service's own order; every match,
// past its 1,000-hit window, for the points sorts and "Only ones I qualify for"; the fit only
// for a signed-in student with grades, from one narrow read and the search records themselves.
// Best fit (MAINT_tasks.md 5.27) browses the whole list, one or two requests and no search, or
// is one search with EXPLORE_BEST_FIT=lifted. Nothing reads the programs cache (3 MB from
// Upstash each time, MAINT_tasks.md 5.19).

const { envMock, authMock, prismaMock, programsMock, searchMock, browseMock } = vi.hoisted(() => ({
  envMock: {} as { EXPLORE_BEST_FIT?: 'full' | 'lifted' | 'off' },
  authMock: vi.fn(),
  prismaMock: { studentProfile: { findUnique: vi.fn() } },
  programsMock: vi.fn(),
  searchMock: vi.fn(),
  browseMock: vi.fn()
}))

vi.mock('server-only', () => ({}))
vi.mock('@/lib/env', () => ({ env: envMock }))
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
import { bestFitOrder, fitTier } from '@/lib/explore/best-fit'
import { EMPTY_QUERY, exploreListUrl } from '@/lib/explore/query'
import { transformStudent } from '@/lib/matching/transformers'
import type { ExploreResponse } from '@/lib/explore/types'
import { GET } from './route'

/** 1,200 programs, more than the search's 1,000-hit window. Every tenth has no IB minimum. */
const COUNT = 1200
const minimum = (i: number) => (i % 10 === 0 ? null : 24 + (i % 22))
const id = (i: number) => `program-${i}`

/** Every hundredth program asks for Chemistry or Biology at HL 5, which the student hasn't got */
const needsScience = (i: number) => i % 100 === 5

const UK = 'cmcountry0000000000000001'
const CANADA = 'cmcountry0000000000000002'
const BUSINESS = 'cmfield000000000000000001'
const LAW = 'cmfield000000000000000002'

const records = Array.from({ length: COUNT }, (_, i) => ({
  objectID: id(i),
  programName: `Program ${i}`,
  universityId: 'u',
  universityName: 'University of Toronto',
  // A third in the student's country, half in their field
  countryId: i % 3 === 0 ? UK : CANADA,
  fieldOfStudyId: i % 2 === 0 ? BUSINESS : LAW,
  country: { name: 'Canada' },
  duration: '4 years',
  requiredCourses: needsScience(i)
    ? ['chemistry', 'biology'].map((course) => ({
        courseId: course,
        courseName: course === 'chemistry' ? 'Chemistry' : 'Biology',
        level: 'HL',
        minimumGrade: 5,
        isCritical: true,
        orGroupId: 'science'
      }))
    : [
        {
          courseId: 'physics',
          courseName: 'Physics',
          level: 'HL',
          minimumGrade: 5,
          isCritical: true,
          orGroupId: null
        }
      ],
  ...(minimum(i) === null ? { admitRate: 4.6 } : { minimumIBPoints: minimum(i) ?? undefined })
}))

const PROFILE = {
  totalIBPoints: 38,
  tokGrade: 'B',
  eeGrade: 'B',
  courses: [{ level: 'HL', grade: 6, ibCourse: { id: 'physics', name: 'Physics' } }],
  preferredFields: [{ id: BUSINESS }],
  preferredCountries: [{ id: UK }]
}
const STUDENT = transformStudent(PROFILE)

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
  delete envMock.EXPLORE_BEST_FIT
  authMock.mockResolvedValue(null)
  prismaMock.studentProfile.findUnique.mockResolvedValue(PROFILE)
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
    const body = await get('q=science&offset=20&limit=20')
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
    expect(searchMock.mock.calls[0][0].searchParams.attributesToRetrieve).not.toContain(
      'requiredCourses'
    )
    expect(prismaMock.studentProfile.findUnique).not.toHaveBeenCalled()
    expect(programsMock).not.toHaveBeenCalled()
  })

  it('signed in with grades: each row comes with its fit, from its own search record', async () => {
    authMock.mockResolvedValue({ user: { id: 'user-1' } })
    // Words typed: Most relevant, one search in its own order
    const body = await get('q=toronto')
    expect(body.rows.map((r) => r.id)).toEqual(records.slice(0, 20).map((r) => r.objectID))
    expect(body.rows).toHaveLength(20)
    expect(Object.keys(body.fits ?? {})).toEqual(body.rows.map((r) => r.id))
    // program-0 has no minimum, program-17 needs 41 (three points short is within reach), and
    // program-5 needs Chemistry or Biology at HL, an either/or the record carries
    expect(body.fits?.['program-0']).toEqual({ status: 'meets', badge: 'Meets all requirements' })
    expect(body.fits?.['program-17']).toEqual({
      status: 'close',
      badge: 'Within reach · 3 points short'
    })
    expect(body.fits?.['program-5']).toEqual({
      status: 'gap',
      badge: 'Needs Chemistry or Biology HL'
    })
    expect(searchMock.mock.calls[0][0].searchParams.attributesToRetrieve).toContain(
      'requiredCourses'
    )
    expect(programsMock).not.toHaveBeenCalled()
    expect(prismaMock.studentProfile.findUnique).toHaveBeenCalledOnce()
    const select = prismaMock.studentProfile.findUnique.mock.calls[0][0].select
    expect(select).not.toHaveProperty('savedPrograms')
    // Best fit's countries and fields come in the same read
    expect(select).toMatchObject({
      preferredFields: { select: { id: true } },
      preferredCountries: { select: { id: true } }
    })
  })

  it('"Only ones I qualify for" counts every match, past the search window', async () => {
    authMock.mockResolvedValue({ user: { id: 'user-1' } })
    const meets = records.filter((_, i) => (minimum(i) ?? 0) <= 38 && !needsScience(i))
    const body = await get('q=toronto&qualify=1&offset=0&limit=20')
    expect(body.total).toBe(meets.length)
    expect(body.rows.map((r) => r.id)).toEqual(meets.slice(0, 20).map((r) => r.objectID))
    expect(Object.values(body.fits ?? {}).every((fit) => fit?.status === 'meets')).toBe(true)
    expect(browseMock).toHaveBeenCalledOnce()
    expect(programsMock).not.toHaveBeenCalled()
  })

  it('keeps the Length filter beside the window, as the page asks for it', async () => {
    const url = new URL(exploreListUrl({ ...EMPTY_QUERY, lengths: [4] }, 20, 20), 'http://x')
    await get(url.search.slice(1))
    expect(searchMock.mock.calls[0][0].searchParams).toMatchObject({
      filters: 'durationYears = 4',
      offset: 20,
      length: 20
    })
  })

  it('signed out, the switch is ignored: it needs grades', async () => {
    const body = await get('qualify=1')
    expect(body.total).toBe(COUNT)
    expect(browseMock).not.toHaveBeenCalled()
  })

  it('sorts by points over every match, programs with no minimum last', async () => {
    const low = await get('sort=low&limit=400')
    expect(low.total).toBe(COUNT)
    expect(low.rows[0].minIBPoints).toBe(24)
    const lows = low.rows.map((r) => r.minIBPoints ?? Infinity)
    expect(lows).toEqual([...lows].sort((a, b) => a - b))

    const last = await get(`sort=high&offset=${COUNT - 20}&limit=20`)
    expect(last.rows.every((r) => r.minIBPoints === null)).toBe(true)
    expect(last.rows[0].admitRate).toBe(4.6)
  })

  it('with grades and nothing typed: Best fit, the whole list browsed, two requests, no search', async () => {
    authMock.mockResolvedValue({ user: { id: 'user-1' } })
    const pages = vi.fn()
    browseMock.mockImplementation(async ({ browseParams, aggregator }) => {
      expect(browseParams.hitsPerPage).toBe(1000)
      for (let i = 0; i < COUNT; i += 1000) {
        pages()
        aggregator({ hits: records.slice(i, i + 1000) })
      }
    })
    const body = await get('offset=0&limit=20')
    expect(searchMock).not.toHaveBeenCalled()
    expect(pages).toHaveBeenCalledTimes(2)
    expect(body.total).toBe(COUNT)
    expect(body.rows.map((r) => r.id)).toEqual(
      bestFitOrder(records, STUDENT)
        .slice(0, 20)
        .map((r) => r.objectID)
    )
    // Their country and field, met, from their own 38
    expect(body.rows[0].minIBPoints).toBe(38)
    expect(body.rows.every((r) => body.fits?.[r.id]?.status === 'meets')).toBe(true)
    expect(records.find((r) => r.objectID === body.rows[19].id)).toMatchObject({
      countryId: UK,
      fieldOfStudyId: BUSINESS
    })
  })

  it('Best fit with the switch on reads the list once, then keeps the ones met', async () => {
    authMock.mockResolvedValue({ user: { id: 'user-1' } })
    const body = await get('qualify=1&offset=0&limit=400')
    expect(searchMock).not.toHaveBeenCalled()
    expect(browseMock).toHaveBeenCalledOnce()
    const tiers = body.rows.map((r) =>
      fitTier(
        STUDENT,
        records.find((x) => x.objectID === r.id)!
      )
    )
    expect(tiers).toEqual([...tiers].sort())
  })

  it('a picked Best fit stays while typing; Most relevant keeps the search’s order', async () => {
    authMock.mockResolvedValue({ user: { id: 'user-1' } })
    await get('q=economics&sort=best')
    expect(searchMock).not.toHaveBeenCalled()
    expect(browseMock.mock.calls[0][0].browseParams.query).toBe('economics')

    vi.clearAllMocks()
    const relevant = await get('q=economics')
    expect(searchMock).toHaveBeenCalledOnce()
    expect(relevant.rows.map((r) => r.id)).toEqual(records.slice(0, 20).map((r) => r.objectID))
  })

  it('signed out, nothing typed: Highest points needed in one search; a Best fit link too', async () => {
    for (const search of ['', 'sort=best', 'sort=relevant']) {
      vi.clearAllMocks()
      await get(search)
      expect(searchMock).toHaveBeenCalledOnce()
      expect(searchMock.mock.calls[0][0].searchParams).not.toHaveProperty('optionalFilters')
      expect(browseMock).not.toHaveBeenCalled()
    }
  })

  it('EXPLORE_BEST_FIT=lifted: one search lifting their countries and fields', async () => {
    envMock.EXPLORE_BEST_FIT = 'lifted'
    authMock.mockResolvedValue({ user: { id: 'user-1' } })
    await get('')
    expect(searchMock).toHaveBeenCalledOnce()
    expect(browseMock).not.toHaveBeenCalled()
    expect(searchMock.mock.calls[0][0].searchParams.optionalFilters).toEqual([
      [`countryId:${UK}<score=2>`],
      [`fieldOfStudyId:${BUSINESS}<score=1>`]
    ])
  })

  it('EXPLORE_BEST_FIT=lifted with the switch on: the full order, at no extra cost', async () => {
    envMock.EXPLORE_BEST_FIT = 'lifted'
    authMock.mockResolvedValue({ user: { id: 'user-1' } })
    await get('qualify=1')
    expect(searchMock).not.toHaveBeenCalled()
    expect(browseMock).toHaveBeenCalledOnce()
  })

  it('EXPLORE_BEST_FIT=off: a student with grades gets the signed-out default, one search', async () => {
    envMock.EXPLORE_BEST_FIT = 'off'
    authMock.mockResolvedValue({ user: { id: 'user-1' } })
    for (const search of ['', 'sort=best']) {
      vi.clearAllMocks()
      const body = await get(search)
      expect(searchMock).toHaveBeenCalledOnce()
      expect(searchMock.mock.calls[0][0].searchParams).not.toHaveProperty('optionalFilters')
      expect(browseMock).not.toHaveBeenCalled()
      expect(body.rows.map((r) => r.id)).toEqual(records.slice(0, 20).map((r) => r.objectID))
    }
  })

  it('says so when the search fails', async () => {
    searchMock.mockRejectedValue(new Error('unreachable'))
    const response = await GET(request(''))
    expect(response.status).toBe(500)
  })
})
