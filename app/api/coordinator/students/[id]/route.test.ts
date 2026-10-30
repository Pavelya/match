import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// A coordinator's edit is held to the same diploma rules as the student's own profile, and the
// total comes from the core points matrix, never from the form. The cases in "answers as the
// student's API does" are the same in ../../../students/profile.

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
vi.mock('@/lib/reference-data', () => ({
  getCachedIBCourses: vi.fn(async () =>
    Array.from({ length: 7 }, (_, i) => ({
      id: `course-${i + 1}`,
      name: `Subject ${i + 1}`,
      code: `S${i + 1}`,
      group: (i % 6) + 1
    }))
  )
}))

import { NextRequest } from 'next/server'
import { invalidateStudentCache } from '@/lib/matching/cache'
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

/** Subjects with these Higher Level grades, then these Standard Level grades. */
function graded(hl: number[], sl: number[]) {
  return [
    ...hl.map((grade) => ({ level: 'HL', grade })),
    ...sl.map((grade) => ({ level: 'SL', grade }))
  ].map((c, i) => ({ courseId: `course-${i + 1}`, ...c }))
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
    isActive: true,
    school: { id: 'school-1', subscriptionTier: 'VIP', subscriptionStatus: 'ACTIVE' }
  })
  prismaMock.studentProfile.findUnique.mockResolvedValue(STORED_STUDENT)
  prismaMock.studentProfile.update.mockResolvedValue({ id: ID })
})

afterEach(() => vi.unstubAllGlobals())

describe('PATCH /api/coordinator/students/[id]', () => {
  // The cached list is keyed by the student's user id, not this route's profile id. As in
  // ../../../students/profile, nothing is computed ahead of the next load (MAINT 5.42)
  it('clears the student’s cached matches on an edit, and calls no other route', async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)

    const res = await patch({ tokGrade: 'A' })

    expect(res.status).toBe(200)
    expect(invalidateStudentCache).toHaveBeenCalledWith('user-1')
    expect(fetchMock).not.toHaveBeenCalled()
  })

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

  // The form's "Manual override" stored a typed total over fewer than six subjects
  it('refuses fewer than six subjects, whatever total is sent', async () => {
    const res = await patch(formBody({ courses: courses().slice(0, 4), totalIBPoints: 30 }))

    expect(res.status).toBe(400)
    expect((await res.json()).error).toBe('Choose six subjects (you have 4).')
    expect(prismaMock.studentProfile.update).not.toHaveBeenCalled()
  })

  it('ignores a total sent on its own', async () => {
    const res = await patch({ totalIBPoints: 30 })

    expect(res.status).toBe(200)
    expect(storedData()).not.toHaveProperty('totalIBPoints')
  })

  describe('answers as the student’s API does', () => {
    it.each([
      ['a 1', graded([7, 1, 6], [6, 6, 6]), 'No subject can have a 1 (you have a 1 in Subject 2).'],
      [
        'a total under 24',
        graded([4, 4, 4], [3, 3, 3]),
        'Your total needs to be 24 or more (you have 23).'
      ],
      [
        'four HL with 11 from the three best',
        graded([4, 4, 3, 2], [6, 6]),
        'Your three best Higher Level grades need 12 points or more (you have 11).'
      ]
    ])('refuses %s with 400, naming it', async (_, sent, reason) => {
      const res = await patch(formBody({ courses: sent }))

      expect(res.status).toBe(400)
      expect(await res.json()).toEqual({ error: reason, reasons: [reason] })
      expect(prismaMock.studentProfile.update).not.toHaveBeenCalled()
    })

    it('saves four HL 7 7 6 6 with SL 4 4, with its own total', async () => {
      const res = await patch(
        formBody({ courses: graded([7, 7, 6, 6], [4, 4]), totalIBPoints: 20 })
      )

      expect(res.status).toBe(200)
      expect(storedData().totalIBPoints).toBe(36)
    })
  })

  // Reached the database's unique key, and failed as a 500
  it('refuses the same subject twice with 400', async () => {
    const sent = courses().map((c, i) => (i === 5 ? { ...c, courseId: 'course-1' } : c))
    const res = await patch(formBody({ courses: sent }))

    expect(res.status).toBe(400)
    expect((await res.json()).error).toBe('Choose each subject only once.')
  })

  it('does not check academic data on a preferences-only edit', async () => {
    prismaMock.studentProfile.findUnique.mockResolvedValue({ ...STORED_STUDENT, tokGrade: 'E' })

    const res = await patch({ preferredCountries: ['country-1'] })

    expect(res.status).toBe(200)
    expect(storedData()).not.toHaveProperty('totalIBPoints')
  })
})
