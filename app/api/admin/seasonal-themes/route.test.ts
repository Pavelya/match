import { beforeEach, describe, expect, it, vi } from 'vitest'

// The admin page's save (rebranding 6.1): only an admin, only a schedule the rules accept, then
// the cached schedule expires so prebuilt pages render again.

const { prismaMock, revalidateTagMock } = vi.hoisted(() => ({
  prismaMock: {
    user: { findUnique: vi.fn() },
    seasonalTheme: { upsert: vi.fn() },
    $transaction: vi.fn()
  },
  revalidateTagMock: vi.fn()
}))

vi.mock('@/lib/prisma', () => ({ prisma: prismaMock }))
vi.mock('@/lib/auth/config', () => ({ auth: vi.fn(async () => ({ user: { id: 'admin-1' } })) }))
vi.mock('@/lib/rate-limit', () => ({ applyRateLimit: vi.fn(async () => null) }))
vi.mock('next/cache', () => ({ revalidateTag: revalidateTagMock }))

import { auth } from '@/lib/auth/config'
import { PUT } from './route'

const WINTER = { key: 'winter', enabled: true, startsOn: '2026-12-14', endsOn: '2027-01-01' }
const LUNAR = { key: 'lunar-new-year', enabled: false, startsOn: null, endsOn: null }

function put(body: unknown) {
  return PUT(
    new Request('http://localhost/api/admin/seasonal-themes', {
      method: 'PUT',
      body: typeof body === 'string' ? body : JSON.stringify(body)
    })
  )
}

beforeEach(() => {
  vi.clearAllMocks()
  prismaMock.user.findUnique.mockResolvedValue({ role: 'PLATFORM_ADMIN' })
  prismaMock.seasonalTheme.upsert.mockImplementation((args) => args)
  prismaMock.$transaction.mockResolvedValue([])
})

describe('PUT /api/admin/seasonal-themes', () => {
  it('saves every season and the switch in one transaction, then expires the schedule', async () => {
    const res = await put({ seasons: [WINTER, LUNAR], allOff: false })

    expect(res.status).toBe(200)
    expect(prismaMock.$transaction).toHaveBeenCalledTimes(1)
    const [writes] = prismaMock.$transaction.mock.calls[0]
    expect(writes).toHaveLength(3)
    expect(writes[0]).toMatchObject({
      where: { key: 'winter' },
      update: {
        enabled: true,
        startsOn: new Date('2026-12-14T00:00:00Z'),
        endsOn: new Date('2027-01-01T00:00:00Z')
      }
    })
    expect(writes[1]).toMatchObject({
      where: { key: 'lunar-new-year' },
      update: { enabled: false }
    })
    expect(writes[2]).toMatchObject({ where: { key: 'all-off' }, update: { enabled: false } })
    expect(revalidateTagMock).toHaveBeenCalledWith('seasonal-themes', { expire: 0 })
  })

  it('saves a season switched off without dates', async () => {
    const res = await put({
      seasons: [{ ...WINTER, enabled: false, startsOn: null, endsOn: null }, LUNAR],
      allOff: true
    })

    expect(res.status).toBe(200)
    const [writes] = prismaMock.$transaction.mock.calls[0]
    expect(writes[0].update).toEqual({ enabled: false, startsOn: null, endsOn: null })
    expect(writes[2].update).toEqual({ enabled: true })
  })

  it.each([
    ['longer than 21 days', { ...WINTER, startsOn: '2026-12-01' }, /21 days/],
    ['an end before its start', { ...WINTER, endsOn: '2026-12-01' }, /before the first/],
    ['switched on without dates', { ...WINTER, startsOn: null, endsOn: null }, /first and last/]
  ])('refuses a season %s and writes nothing', async (_, season, message) => {
    const res = await put({ seasons: [season, LUNAR], allOff: false })

    expect(res.status).toBe(400)
    expect((await res.json()).errors.winter).toMatch(message)
    expect(prismaMock.$transaction).not.toHaveBeenCalled()
    expect(revalidateTagMock).not.toHaveBeenCalled()
  })

  it('refuses a body that is not a schedule', async () => {
    expect((await put('not json')).status).toBe(400)
    expect((await put({ seasons: [WINTER, LUNAR] })).status).toBe(400)
    expect((await put({ seasons: [WINTER], allOff: false })).status).toBe(400)
    expect(
      (await put({ seasons: [{ ...WINTER, key: 'halloween' }, LUNAR], allOff: false })).status
    ).toBe(400)
    expect(prismaMock.$transaction).not.toHaveBeenCalled()
  })

  it('is for admins only', async () => {
    prismaMock.user.findUnique.mockResolvedValue({ role: 'STUDENT' })
    expect((await put({ seasons: [WINTER, LUNAR], allOff: false })).status).toBe(403)

    vi.mocked(auth).mockResolvedValueOnce(null as never)
    expect((await put({ seasons: [WINTER, LUNAR], allOff: false })).status).toBe(401)
    expect(prismaMock.$transaction).not.toHaveBeenCalled()
  })
})
