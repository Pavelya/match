import { beforeEach, describe, expect, it, vi } from 'vitest'

// A coordinator's edit is held to the same diploma rules as the student's own profile,
// and a complete profile's total comes from the core points matrix, not from the form.

const { prismaMock } = vi.hoisted(() => ({
  prismaMock: {
    coordinatorProfile: { findFirst: vi.fn() },
    studentProfile: { findUnique: vi.fn(), update: vi.fn() }
  }
}))

vi.mock('@/lib/prisma', () => ({ prisma: prismaMock }))
vi.mock('@/lib/auth/config', () => ({ auth: vi.fn(async () => ({ user: { id: 'coord-user' } })) }))
vi.mock('@/lib/rate-limit', () => ({ applyRateLimit: vi.fn(async () => null) }))
vi.mock('@/lib/matching/cache', () => ({ invalidateStudentCache: vi.fn(async () => {}) }))

import { NextRequest } from 'next/server'
import { PATCH } from './route'

const ID = 'student-1'

/** Six subjects totalling 36, three at HL unless told otherwise. */
function courses(hlCount = 3) {
  return Array.from({ length: 6 }, (_, i) => ({
    courseId: `course-${i + 1}`,
    level: i < hlCount ? 'HL' : 'SL',
    grade: 6
  }))
}

function patch(body: Record<string, unknown>) {
  return PATCH(
    new NextRequest(`http://localhost/api/coordinator/students/${ID}`, {
      method: 'PATCH',
      body: JSON.stringify(body)
    }),
    { params: Promise.resolve({ id: ID }) }
  )
}

/** What the edit form sends: everything, with its own total. */
function formBody(overrides: Record<string, unknown> = {}) {
  return {
    courses: courses(),
    totalIBPoints: 39,
    tokGrade: 'B',
    eeGrade: 'C',
    preferredFields: [],
    preferredCountries: [],
    ...overrides
  }
}

const STORED_STUDENT = {
  id: ID,
  userId: 'user-1',
  schoolId: 'school-1',
  coordinatorAccessConsentAt: new Date('2026-01-01'),
  totalIBPoints: 37,
  tokGrade: 'B',
  eeGrade: 'C',
  courses: courses().map((c, i) => ({
    id: `row-${i}`,
    ibCourseId: c.courseId,
    level: c.level,
    grade: c.grade
  })),
  preferredFields: [],
  preferredCountries: []
}

function storedData() {
  return prismaMock.studentProfile.update.mock.calls[0]?.[0]?.data
}

beforeEach(() => {
  vi.clearAllMocks()
  prismaMock.coordinatorProfile.findFirst.mockResolvedValue({
    id: 'coord-1',
    school: { id: 'school-1', subscriptionTier: 'VIP', subscriptionStatus: 'ACTIVE' }
  })
  prismaMock.studentProfile.findUnique.mockResolvedValue(STORED_STUDENT)
  prismaMock.studentProfile.update.mockResolvedValue({ id: ID })
})

describe('PATCH /api/coordinator/students/[id]', () => {
  it.each([
    ['TOK', { tokGrade: 'E' }],
    ['the EE', { eeGrade: 'E' }]
  ])('refuses an E in %s with 400', async (_, grades) => {
    const res = await patch(formBody(grades))

    expect(res.status).toBe(400)
    expect((await res.json()).error).toMatch(/failing condition/)
    expect(prismaMock.studentProfile.update).not.toHaveBeenCalled()
  })

  it.each([2, 5])('refuses %i HL subjects with 400', async (hlCount) => {
    const res = await patch(formBody({ courses: courses(hlCount) }))

    expect(res.status).toBe(400)
    expect((await res.json()).error).toBe(
      `Take 3 or 4 subjects at Higher Level (you have ${hlCount}).`
    )
    expect(prismaMock.studentProfile.update).not.toHaveBeenCalled()
  })

  it('refuses a core grade that is not A to E', async () => {
    const res = await patch({ tokGrade: 'F' })

    expect(res.status).toBe(400)
  })

  // The old coordinator formula gave TOK B / EE C 3 points: 39.
  it('stores the total from the core points matrix, not the one sent', async () => {
    const res = await patch(formBody())

    expect(res.status).toBe(200)
    expect(storedData().totalIBPoints).toBe(38)
  })

  it('computes the total from the stored courses when only a grade changes', async () => {
    const res = await patch({ tokGrade: 'A' })

    expect(res.status).toBe(200)
    // TOK A / EE C: 2 core points.
    expect(storedData()).toEqual({ tokGrade: 'A', totalIBPoints: 38 })
  })

  it('keeps a sent total while the profile is incomplete', async () => {
    const res = await patch(formBody({ courses: courses().slice(0, 4), totalIBPoints: 30 }))

    expect(res.status).toBe(200)
    expect(storedData().totalIBPoints).toBe(30)
  })

  it('does not check academic data on a preferences-only edit', async () => {
    prismaMock.studentProfile.findUnique.mockResolvedValue({ ...STORED_STUDENT, tokGrade: 'E' })

    const res = await patch({ preferredCountries: ['country-1'] })

    expect(res.status).toBe(200)
    expect(storedData()).not.toHaveProperty('totalIBPoints')
  })
})
