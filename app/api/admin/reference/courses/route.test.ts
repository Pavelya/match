import { beforeEach, describe, expect, it, vi } from 'vitest'

// Two courses with one name split students from requirements: the matcher compares course
// ids, so a requirement on GEOG never matched a student who picked GEO (content task 3.5).
// The create route must refuse a second course of an existing name.

const { prismaMock } = vi.hoisted(() => ({
  prismaMock: {
    user: { findUnique: vi.fn() },
    iBCourse: { findUnique: vi.fn(), findFirst: vi.fn(), create: vi.fn() }
  }
}))

vi.mock('@/lib/prisma', () => ({ prisma: prismaMock }))
vi.mock('@/lib/auth/config', () => ({ auth: vi.fn(async () => ({ user: { id: 'admin-1' } })) }))
vi.mock('@/lib/rate-limit', () => ({ applyRateLimit: vi.fn(async () => null) }))
vi.mock('next/cache', () => ({ revalidateTag: vi.fn() }))

import { POST } from './route'

function post(body: Record<string, unknown>) {
  return POST(
    new Request('http://localhost/api/admin/reference/courses', {
      method: 'POST',
      body: JSON.stringify(body)
    })
  )
}

beforeEach(() => {
  vi.clearAllMocks()
  prismaMock.user.findUnique.mockResolvedValue({ role: 'PLATFORM_ADMIN' })
  prismaMock.iBCourse.findUnique.mockResolvedValue(null)
  prismaMock.iBCourse.findFirst.mockResolvedValue(null)
  prismaMock.iBCourse.create.mockImplementation(async ({ data }) => ({ id: 'course-1', ...data }))
})

describe('POST /api/admin/reference/courses — duplicates', () => {
  it('refuses a name another course already has, ignoring case and spaces', async () => {
    prismaMock.iBCourse.findFirst.mockResolvedValue({ code: 'GEOG' })

    const res = await post({ name: '  geography ', code: 'GEO', group: 3 })

    expect(res.status).toBe(409)
    expect((await res.json()).error).toContain('GEOG')
    expect(prismaMock.iBCourse.findFirst.mock.calls[0][0].where.name).toEqual({
      equals: 'geography',
      mode: 'insensitive'
    })
    expect(prismaMock.iBCourse.create).not.toHaveBeenCalled()
  })

  it('checks the code as it will be stored', async () => {
    prismaMock.iBCourse.findUnique.mockResolvedValue({ id: 'existing' })

    const res = await post({ name: 'Geography', code: ' geog ', group: 3 })

    expect(res.status).toBe(409)
    expect(prismaMock.iBCourse.findUnique.mock.calls[0][0].where).toEqual({ code: 'GEOG' })
    expect(prismaMock.iBCourse.create).not.toHaveBeenCalled()
  })

  it('creates a course with a new name and code', async () => {
    const res = await post({ name: ' Marine Science ', code: 'mar-sci', group: 4 })

    expect(res.status).toBe(201)
    expect(prismaMock.iBCourse.create.mock.calls[0][0].data).toEqual({
      name: 'Marine Science',
      code: 'MAR-SCI',
      group: 4
    })
  })

  it('refuses a blank name', async () => {
    const res = await post({ name: '   ', code: 'X', group: 1 })

    expect(res.status).toBe(400)
    expect(prismaMock.iBCourse.create).not.toHaveBeenCalled()
  })
})
