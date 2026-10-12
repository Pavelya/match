import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// The programs cache is about 3 MB in Redis, and Upstash's free plan allows 10 GB a month. Each
// server instance keeps it for a few minutes, so Matches does not download it on every load, and
// a Redis outage costs one database read per instance in that time, not one per request.

const { redisMock, prismaMock, loggerMock } = vi.hoisted(() => ({
  redisMock: { get: vi.fn(), set: vi.fn(), del: vi.fn() },
  prismaMock: { academicProgram: { findMany: vi.fn() } },
  loggerMock: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() }
}))

vi.mock('@/lib/redis/client', () => ({ redis: redisMock }))
vi.mock('@/lib/prisma', () => ({ prisma: prismaMock }))
vi.mock('@/lib/logger', () => ({ logger: loggerMock }))

const MINUTE = 60 * 1000
const START = new Date('2026-10-12T09:00:00Z')

/** A program as the database read selects it. */
const ROW = {
  id: 'program-1',
  name: 'Medicine',
  universityId: 'uni-1',
  degreeType: 'MBChB',
  duration: '5 years',
  campusCity: null,
  minIBPoints: 38,
  requirementsEntryYear: 2027,
  programUrl: null,
  fieldOfStudyId: 'field-1',
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
  fieldOfStudy: { id: 'field-1', name: 'Medicine', iconName: null, description: null },
  courseRequirements: []
}

/** The same program as Redis holds it. */
const CACHED = [{ ...ROW }]

/** The module keeps its copy between calls, so each test starts from a fresh one. */
async function load() {
  vi.resetModules()
  return import('./program-cache')
}

beforeEach(() => {
  vi.clearAllMocks()
  vi.useFakeTimers({ toFake: ['Date'] })
  vi.setSystemTime(START)
  redisMock.get.mockResolvedValue(CACHED)
  redisMock.set.mockResolvedValue('OK')
  redisMock.del.mockResolvedValue(1)
  prismaMock.academicProgram.findMany.mockResolvedValue([ROW])
})

afterEach(() => {
  vi.useRealTimers()
})

describe('getCachedPrograms', () => {
  it('reads Redis once for two calls within the minutes', async () => {
    const { getCachedPrograms } = await load()

    expect(await getCachedPrograms()).toEqual(CACHED)
    vi.setSystemTime(START.getTime() + 4 * MINUTE)
    expect(await getCachedPrograms()).toEqual(CACHED)

    expect(redisMock.get).toHaveBeenCalledTimes(1)
    expect(prismaMock.academicProgram.findMany).not.toHaveBeenCalled()
  })

  it('shares one read between concurrent calls', async () => {
    const { getCachedPrograms } = await load()

    await Promise.all([getCachedPrograms(), getCachedPrograms(), getCachedPrograms()])

    expect(redisMock.get).toHaveBeenCalledTimes(1)
  })

  it('reads Redis again once the minutes have passed', async () => {
    const { getCachedPrograms } = await load()

    await getCachedPrograms()
    vi.setSystemTime(START.getTime() + 6 * MINUTE)
    await getCachedPrograms()

    expect(redisMock.get).toHaveBeenCalledTimes(2)
  })

  it('reads Redis again after an invalidation', async () => {
    const { getCachedPrograms, invalidateProgramsCache } = await load()

    await getCachedPrograms()
    await invalidateProgramsCache()
    await getCachedPrograms()

    expect(redisMock.del).toHaveBeenCalledTimes(1)
    expect(redisMock.get).toHaveBeenCalledTimes(2)
  })

  it('drops its copy even when Redis fails to invalidate', async () => {
    const { getCachedPrograms, invalidateProgramsCache } = await load()
    redisMock.del.mockRejectedValue(new Error('Upstash unavailable'))

    await getCachedPrograms()
    await invalidateProgramsCache()
    await getCachedPrograms()

    expect(redisMock.get).toHaveBeenCalledTimes(2)
  })

  it('reads the database once for two calls when Redis fails', async () => {
    const { getCachedPrograms } = await load()
    redisMock.get.mockRejectedValue(new Error('Upstash unavailable'))

    const first = await getCachedPrograms()
    vi.setSystemTime(START.getTime() + 4 * MINUTE)
    const second = await getCachedPrograms()

    expect(first).toEqual([ROW])
    expect(second).toBe(first)
    expect(prismaMock.academicProgram.findMany).toHaveBeenCalledTimes(1)
    expect(loggerMock.error).toHaveBeenCalledWith(
      'Programs cache error, falling back to DB',
      expect.anything()
    )
  })

  it('fills Redis from the database once on a miss', async () => {
    const { getCachedPrograms } = await load()
    redisMock.get.mockResolvedValue(null)

    await getCachedPrograms()
    await getCachedPrograms()

    expect(prismaMock.academicProgram.findMany).toHaveBeenCalledTimes(1)
    expect(redisMock.set).toHaveBeenCalledTimes(1)
    expect(redisMock.set).toHaveBeenCalledWith('programs:all:v3', [ROW], expect.anything())
  })

  it('does not read the database twice when filling Redis fails', async () => {
    const { getCachedPrograms } = await load()
    redisMock.get.mockResolvedValue(null)
    redisMock.set.mockRejectedValue(new Error('Upstash unavailable'))

    expect(await getCachedPrograms()).toEqual([ROW])

    expect(prismaMock.academicProgram.findMany).toHaveBeenCalledTimes(1)
  })

  it('does not keep a failed read, so the next call tries again', async () => {
    const { getCachedPrograms } = await load()
    redisMock.get.mockRejectedValue(new Error('Upstash unavailable'))
    prismaMock.academicProgram.findMany.mockRejectedValueOnce(new Error('Supabase unavailable'))

    await expect(getCachedPrograms()).rejects.toThrow('Supabase unavailable')
    expect(await getCachedPrograms()).toEqual([ROW])

    expect(prismaMock.academicProgram.findMany).toHaveBeenCalledTimes(2)
  })
})
