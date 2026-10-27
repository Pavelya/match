import { beforeEach, describe, expect, it, vi } from 'vitest'

// MAINT 7.6 Part A: the jwt callback's role read records the day a user was active, at most once a
// day, and that write clears an inactivity notice.

const { findUnique, updateMany, loggerError } = vi.hoisted(() => ({
  findUnique: vi.fn(),
  updateMany: vi.fn(),
  loggerError: vi.fn()
}))
vi.mock('@/lib/prisma', () => ({ prisma: { user: { findUnique, updateMany } } }))
vi.mock('@/lib/logger', () => ({ logger: { error: loggerError } }))

import { LAST_ACTIVE_WRITE_MS, lastActiveIsStale, readRoleAndMarkActive } from './last-active'

const now = new Date('2026-10-27T12:00:00.000Z')
const ago = (ms: number) => new Date(now.getTime() - ms)

describe('lastActiveIsStale', () => {
  it('is stale when never written', () => {
    expect(lastActiveIsStale(null, now)).toBe(true)
  })

  it('is fresh under a day, stale from a day', () => {
    expect(lastActiveIsStale(ago(LAST_ACTIVE_WRITE_MS - 1), now)).toBe(false)
    expect(lastActiveIsStale(ago(LAST_ACTIVE_WRITE_MS), now)).toBe(true)
    expect(lastActiveIsStale(ago(200 * LAST_ACTIVE_WRITE_MS), now)).toBe(true)
  })

  it('is fresh when the stored date is ahead of the clock', () => {
    expect(lastActiveIsStale(ago(-60_000), now)).toBe(false)
  })
})

describe('readRoleAndMarkActive', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    updateMany.mockResolvedValue({ count: 1 })
  })

  it('reads the role and the date in one read', async () => {
    findUnique.mockResolvedValue({ role: 'STUDENT', lastActiveAt: ago(1000) })
    expect(await readRoleAndMarkActive('user-1', now)).toBe('STUDENT')
    expect(findUnique).toHaveBeenCalledTimes(1)
    expect(findUnique).toHaveBeenCalledWith({
      where: { id: 'user-1' },
      select: { role: true, lastActiveAt: true }
    })
  })

  it('writes nothing when the date is under a day old', async () => {
    findUnique.mockResolvedValue({
      role: 'COORDINATOR',
      lastActiveAt: ago(LAST_ACTIVE_WRITE_MS - 1)
    })
    expect(await readRoleAndMarkActive('user-1', now)).toBe('COORDINATOR')
    expect(updateMany).not.toHaveBeenCalled()
  })

  it('writes the date and clears the notice when it was never written', async () => {
    findUnique.mockResolvedValue({ role: 'STUDENT', lastActiveAt: null })
    await readRoleAndMarkActive('user-1', now)
    expect(updateMany).toHaveBeenCalledTimes(1)
    expect(updateMany).toHaveBeenCalledWith({
      where: {
        id: 'user-1',
        OR: [{ lastActiveAt: null }, { lastActiveAt: { lte: ago(LAST_ACTIVE_WRITE_MS) } }]
      },
      data: { lastActiveAt: now, inactivityNoticeSentAt: null }
    })
  })

  it('writes again once the date is a day old, and clears the notice', async () => {
    findUnique.mockResolvedValue({ role: 'STUDENT', lastActiveAt: ago(LAST_ACTIVE_WRITE_MS) })
    await readRoleAndMarkActive('user-1', now)
    expect(updateMany).toHaveBeenCalledTimes(1)
    expect(updateMany.mock.calls[0][0].data).toEqual({
      lastActiveAt: now,
      inactivityNoticeSentAt: null
    })
  })

  it('writes once a day across a day of requests', async () => {
    let stored: Date | null = ago(2 * LAST_ACTIVE_WRITE_MS)
    findUnique.mockImplementation(async () => ({ role: 'STUDENT', lastActiveAt: stored }))
    updateMany.mockImplementation(async ({ data }) => {
      stored = data.lastActiveAt
      return { count: 1 }
    })

    // Every 5 minutes for 24 hours, as the role refresh reads while a student stays active
    for (let minutes = 0; minutes < 24 * 60; minutes += 5) {
      await readRoleAndMarkActive('user-1', new Date(now.getTime() + minutes * 60_000))
    }
    expect(updateMany).toHaveBeenCalledTimes(1)

    await readRoleAndMarkActive('user-1', new Date(now.getTime() + LAST_ACTIVE_WRITE_MS))
    expect(updateMany).toHaveBeenCalledTimes(2)
  })

  it('returns null and writes nothing for an account that no longer exists', async () => {
    findUnique.mockResolvedValue(null)
    expect(await readRoleAndMarkActive('gone', now)).toBeNull()
    expect(updateMany).not.toHaveBeenCalled()
  })

  it('keeps the role when the write fails, and logs no address', async () => {
    findUnique.mockResolvedValue({ role: 'PLATFORM_ADMIN', lastActiveAt: null })
    updateMany.mockRejectedValue(new Error('connection reset'))
    expect(await readRoleAndMarkActive('user-123456789', now)).toBe('PLATFORM_ADMIN')
    expect(loggerError).toHaveBeenCalledWith('Failed to record last activity', {
      userId: 'user-123',
      error: 'connection reset'
    })
  })
})
