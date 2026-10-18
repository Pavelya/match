import { beforeEach, describe, expect, it, vi } from 'vitest'

// The profile API stores what matching reads, so it enforces the diploma rules itself and
// computes the total from the core points matrix rather than trusting the client. The cases in
// "answers as the coordinator's API does" are the same in ../../coordinator/students/[id].

const { prismaMock } = vi.hoisted(() => ({
  prismaMock: {
    studentProfile: { findUnique: vi.fn(), create: vi.fn(), update: vi.fn() }
  }
}))

vi.mock('@/lib/prisma', () => ({ prisma: prismaMock }))
vi.mock('@/lib/auth/config', () => ({ auth: vi.fn(async () => ({ user: { id: 'user-1' } })) }))
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
import { POST } from './route'

/** Six subjects totalling 36, three at HL unless told otherwise. */
function courseSelections(hlCount = 3) {
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

  describe('answers as the coordinator’s API does', () => {
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
    ])('refuses %s with 400, naming it', async (_, courses, reason) => {
      const res = await post({ courseSelections: courses })

      expect(res.status).toBe(400)
      expect(await res.json()).toEqual({ error: reason, reasons: [reason] })
      expect(prismaMock.studentProfile.create).not.toHaveBeenCalled()
    })

    it('saves four HL 7 7 6 6 with SL 4 4, with its own total', async () => {
      const res = await post({ courseSelections: graded([7, 7, 6, 6], [4, 4]), totalIBPoints: 20 })

      expect(res.status).toBe(200)
      expect(prismaMock.studentProfile.create.mock.calls[0][0].data.totalIBPoints).toBe(36)
    })
  })

  it.each([
    ['five subjects', courseSelections().slice(0, 5), 'Choose six subjects (you have 5).'],
    [
      'a grade of 9',
      courseSelections().map((c, i) => (i === 0 ? { ...c, grade: 9 } : c)),
      'Choose a grade from 1 to 7 for every subject.'
    ],
    // Reached the database's unique key, and failed as a 500
    [
      'the same subject twice',
      courseSelections().map((c, i) => (i === 5 ? { ...c, courseId: 'course-1' } : c)),
      'Choose each subject only once.'
    ],
    [
      'a subject that is not an IB subject',
      courseSelections().map((c, i) => (i === 5 ? { ...c, courseId: 'nope' } : c)),
      'Choose every subject from the list of IB subjects.'
    ]
  ])('refuses %s with 400', async (_, courses, reason) => {
    const res = await post({ courseSelections: courses })

    expect(res.status).toBe(400)
    expect((await res.json()).error).toBe(reason)
    expect(prismaMock.studentProfile.create).not.toHaveBeenCalled()
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
