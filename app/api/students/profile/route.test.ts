import { beforeEach, describe, expect, it, vi } from 'vitest'

// The profile API stores what matching reads, so it enforces the diploma rules itself and
// computes the total from the core points matrix rather than trusting the client.

const { prismaMock } = vi.hoisted(() => ({
  prismaMock: {
    studentProfile: { findUnique: vi.fn(), create: vi.fn(), update: vi.fn() }
  }
}))

vi.mock('@/lib/prisma', () => ({ prisma: prismaMock }))
vi.mock('@/lib/auth/config', () => ({ auth: vi.fn(async () => ({ user: { id: 'user-1' } })) }))
vi.mock('@/lib/rate-limit', () => ({ applyRateLimit: vi.fn(async () => null) }))
vi.mock('@/lib/matching/cache', () => ({ invalidateStudentCache: vi.fn(async () => {}) }))

import { NextRequest } from 'next/server'
import { POST } from './route'

/** Six subjects totalling 36, three at HL unless told otherwise. */
function courseSelections(hlCount = 3) {
  return Array.from({ length: 6 }, (_, i) => ({
    courseId: `course-${i + 1}`,
    level: i < hlCount ? 'HL' : 'SL',
    grade: 6
  }))
}

function post(body: Record<string, unknown>) {
  return POST(
    new NextRequest('http://localhost/api/students/profile', {
      method: 'POST',
      body: JSON.stringify({
        interestedFields: ['field-1'],
        preferredCountries: ['country-1'],
        courseSelections: courseSelections(),
        tokGrade: 'B',
        eeGrade: 'C',
        totalIBPoints: 37,
        ...body
      })
    })
  )
}

beforeEach(() => {
  vi.clearAllMocks()
  prismaMock.studentProfile.findUnique.mockResolvedValue(null)
  prismaMock.studentProfile.create.mockResolvedValue({ id: 'profile-1' })
  prismaMock.studentProfile.update.mockResolvedValue({ id: 'profile-1' })
})

describe('POST /api/students/profile', () => {
  it.each([
    ['TOK', { tokGrade: 'E' }],
    ['the EE', { eeGrade: 'E' }]
  ])('refuses an E in %s with 400', async (_, grades) => {
    const res = await post(grades)

    expect(res.status).toBe(400)
    expect((await res.json()).error).toMatch(/failing condition/)
    expect(prismaMock.studentProfile.create).not.toHaveBeenCalled()
  })

  it.each([2, 5])('refuses %i HL subjects with 400', async (hlCount) => {
    const res = await post({ courseSelections: courseSelections(hlCount) })

    expect(res.status).toBe(400)
    expect((await res.json()).error).toBe(
      `Take 3 or 4 subjects at Higher Level (you have ${hlCount}).`
    )
    expect(prismaMock.studentProfile.create).not.toHaveBeenCalled()
  })

  it('refuses a core grade that is not A to E', async () => {
    const res = await post({ tokGrade: 'F' })

    expect(res.status).toBe(400)
  })

  // A client still running the old formula sends 37 for TOK B / EE C.
  it('stores the total from the core points matrix, not the one sent', async () => {
    const res = await post({ courseSelections: courseSelections(4) })

    expect(res.status).toBe(200)
    expect(prismaMock.studentProfile.create.mock.calls[0][0].data.totalIBPoints).toBe(38)
  })

  it('corrects a stored total on the next save', async () => {
    prismaMock.studentProfile.findUnique.mockResolvedValue({
      id: 'profile-1',
      totalIBPoints: 37,
      tokGrade: 'B',
      eeGrade: 'C',
      preferredFields: [{ id: 'field-1' }],
      preferredCountries: [{ id: 'country-1' }],
      courses: courseSelections().map((c, i) => ({
        id: `row-${i}`,
        ibCourseId: c.courseId,
        level: c.level,
        grade: c.grade
      }))
    })

    const res = await post({})

    expect(res.status).toBe(200)
    expect(prismaMock.studentProfile.update.mock.calls[0][0].data).toEqual({
      totalIBPoints: 38,
      tokGrade: 'B',
      eeGrade: 'C'
    })
  })
})
