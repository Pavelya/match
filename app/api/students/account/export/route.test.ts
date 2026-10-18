import { beforeEach, describe, expect, it, vi } from 'vitest'

// The data export includes "Open to anywhere", which first run saves since rebranding 3.1, and
// reads only the columns it writes (rebranding 3.3)

const { prismaMock } = vi.hoisted(() => ({
  prismaMock: { user: { findUnique: vi.fn() } }
}))

vi.mock('@/lib/prisma', () => ({ prisma: prismaMock }))
vi.mock('@/lib/auth/config', () => ({ auth: vi.fn(async () => ({ user: { id: 'user-1' } })) }))
vi.mock('@/lib/rate-limit', () => ({ applyRateLimit: vi.fn(async () => null) }))
vi.mock('@/lib/logger', () => ({ logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() } }))

import { GET } from './route'

const created = new Date('2026-03-12T09:00:00.000Z')

beforeEach(() => {
  vi.clearAllMocks()
  prismaMock.user.findUnique.mockResolvedValue({
    email: 'maya@example.com',
    name: 'Maya',
    role: 'STUDENT',
    createdAt: created,
    updatedAt: created,
    studentProfile: {
      totalIBPoints: 38,
      tokGrade: 'B',
      eeGrade: 'C',
      openToAllLocations: true,
      createdAt: created,
      updatedAt: created,
      school: null,
      courses: [{ level: 'HL', grade: 6, ibCourse: { name: 'Physics', group: 4 } }],
      preferredFields: [{ name: 'Computer Science' }],
      preferredCountries: [],
      savedPrograms: []
    }
  })
})

describe('GET /api/students/account/export', () => {
  it('says whether the student is open to anywhere', async () => {
    const data = await (await GET()).json()

    expect(data.preferences).toEqual({
      fields: ['Computer Science'],
      countries: [],
      openToAllLocations: true
    })
    expect(data.academicProfile.courses).toEqual([
      { name: 'Physics', group: 4, level: 'HL', grade: 6 }
    ])
  })

  it('selects the columns it writes rather than including whole rows', async () => {
    await GET()

    const query = prismaMock.user.findUnique.mock.calls[0][0]
    expect(query.include).toBeUndefined()
    expect(query.select.studentProfile.select.openToAllLocations).toBe(true)
  })
})
