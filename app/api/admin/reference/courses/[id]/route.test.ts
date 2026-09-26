import { beforeEach, describe, expect, it, vi } from 'vitest'

// Renaming a course must not create a second course of one name either; see
// ../route.test.ts for why (content task 3.5).

const { prismaMock } = vi.hoisted(() => ({
  prismaMock: {
    user: { findUnique: vi.fn() },
    iBCourse: { findUnique: vi.fn(), findFirst: vi.fn(), update: vi.fn() }
  }
}))

vi.mock('@/lib/prisma', () => ({ prisma: prismaMock }))
vi.mock('@/lib/auth/config', () => ({ auth: vi.fn(async () => ({ user: { id: 'admin-1' } })) }))
vi.mock('@/lib/rate-limit', () => ({ applyRateLimit: vi.fn(async () => null) }))
vi.mock('next/cache', () => ({ revalidateTag: vi.fn() }))

import { PATCH } from './route'

const MARINE = { id: 'course-1', name: 'Marine Science', code: 'MAR-SCI', group: 4 }

function patch(body: Record<string, unknown>) {
  return PATCH(
    new Request('http://localhost/api/admin/reference/courses/course-1', {
      method: 'PATCH',
      body: JSON.stringify(body)
    }),
    { params: Promise.resolve({ id: 'course-1' }) }
  )
}

beforeEach(() => {
  vi.clearAllMocks()
  prismaMock.user.findUnique.mockResolvedValue({ role: 'PLATFORM_ADMIN' })
  // The first lookup is the course itself; a code lookup finds nothing unless a test says so.
  prismaMock.iBCourse.findUnique.mockImplementation(async ({ where }) =>
    where.id === 'course-1' ? MARINE : null
  )
  prismaMock.iBCourse.findFirst.mockResolvedValue(null)
  prismaMock.iBCourse.update.mockImplementation(async ({ data }) => ({ ...MARINE, ...data }))
})

describe('PATCH /api/admin/reference/courses/[id] — duplicates', () => {
  it('refuses a rename to another course’s name', async () => {
    prismaMock.iBCourse.findFirst.mockResolvedValue({ code: 'GEOG' })

    const res = await patch({ name: 'Geography' })

    expect(res.status).toBe(409)
    expect(prismaMock.iBCourse.findFirst.mock.calls[0][0].where).toEqual({
      name: { equals: 'Geography', mode: 'insensitive' },
      id: { not: 'course-1' }
    })
    expect(prismaMock.iBCourse.update).not.toHaveBeenCalled()
  })

  it('saves a course under its own name without a name check', async () => {
    const res = await patch({ name: 'marine science', group: 4 })

    expect(res.status).toBe(200)
    expect(prismaMock.iBCourse.findFirst).not.toHaveBeenCalled()
    expect(prismaMock.iBCourse.update).toHaveBeenCalled()
  })

  it('refuses a code another course has, as it will be stored', async () => {
    prismaMock.iBCourse.findUnique.mockImplementation(async ({ where }) =>
      where.id === 'course-1' ? MARINE : where.code === 'GEOG' ? { id: 'geog' } : null
    )

    const res = await patch({ code: ' geog ' })

    expect(res.status).toBe(409)
    expect(prismaMock.iBCourse.update).not.toHaveBeenCalled()
  })
})
