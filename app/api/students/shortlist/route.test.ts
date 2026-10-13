import { beforeEach, describe, expect, it, vi } from 'vitest'

// The Shortlist reads the profile and the saved programs, as today's route does, and nothing
// else: no programs cache, no search (rebranding 2.5, Definition of done 7).

const { prismaMock, programsMock } = vi.hoisted(() => ({
  prismaMock: {
    studentProfile: { findUnique: vi.fn() },
    savedProgram: { findMany: vi.fn() }
  },
  programsMock: vi.fn()
}))

vi.mock('@/lib/prisma', () => ({ prisma: prismaMock }))
vi.mock('@/lib/matching/program-cache', () => ({ getCachedPrograms: programsMock }))
vi.mock('@/lib/auth/config', () => ({ auth: vi.fn(async () => ({ user: { id: 'user-1' } })) }))
vi.mock('@/lib/rate-limit', () => ({ applyRateLimit: vi.fn(async () => null) }))

import { auth } from '@/lib/auth/config'
import { GET } from './route'

const PROFILE = {
  id: 'profile-1',
  totalIBPoints: 38,
  tokGrade: 'B',
  eeGrade: 'B',
  openToAllFields: false,
  openToAllLocations: false,
  courses: [
    {
      level: 'HL',
      grade: 6,
      ibCourse: { id: 'maths-aa', name: 'Mathematics: Analysis and Approaches' }
    }
  ],
  preferredFields: [{ id: 'business', name: 'Business & Economics' }],
  preferredCountries: [{ id: 'uk', name: 'United Kingdom' }]
}

function saved(id: string, minIBPoints: number | null) {
  return {
    program: {
      id,
      name: `Program ${id}`,
      degreeType: 'BA',
      duration: '3 years',
      campusCity: null,
      minIBPoints,
      programUrl: 'https://example.org/',
      requirementsEntryYear: 2027,
      fieldOfStudy: { id: 'business' },
      university: {
        id: 'oxford',
        name: 'University of Oxford',
        abbreviatedName: 'Oxford',
        image: null,
        city: 'Oxford',
        admitRate: null,
        country: { id: 'uk', name: 'United Kingdom' }
      },
      courseRequirements: [
        {
          requiredLevel: 'HL',
          minGrade: 6,
          isCritical: true,
          orGroupId: null,
          ibCourse: { id: 'maths-aa', name: 'Mathematics: Analysis and Approaches' }
        }
      ]
    }
  }
}

beforeEach(() => {
  vi.clearAllMocks()
  prismaMock.studentProfile.findUnique.mockResolvedValue(PROFILE)
  prismaMock.savedProgram.findMany.mockResolvedValue([saved('oxford', 39), saved('lse', 38)])
})

describe('GET /api/students/shortlist', () => {
  it('returns every saved program with its fit, newest first, from two reads', async () => {
    const body = await (await GET()).json()

    expect(body.complete).toBe(true)
    expect(body.total).toBe(38)
    expect(body.programs.map((p: { id: string }) => p.id)).toEqual(['oxford', 'lse'])
    expect(body.programs[0].fit.badge).toBe('Within reach · 1 point short')
    expect(body.programs[1].fit.badge).toBe('Meets all requirements')

    expect(prismaMock.studentProfile.findUnique).toHaveBeenCalledTimes(1)
    expect(prismaMock.savedProgram.findMany).toHaveBeenCalledTimes(1)
    expect(prismaMock.savedProgram.findMany.mock.calls[0][0]).toMatchObject({
      where: { studentProfileId: 'profile-1' },
      orderBy: { createdAt: 'desc' }
    })
    expect(programsMock).not.toHaveBeenCalled()
  })

  it('reads the profile as a select, never the whole row', async () => {
    await GET()
    const query = prismaMock.studentProfile.findUnique.mock.calls[0][0]
    expect(query.select).toBeDefined()
    expect(query.include).toBeUndefined()
  })

  it('gives first run’s steps, and the list without the fit, before grades', async () => {
    prismaMock.studentProfile.findUnique.mockResolvedValue({ ...PROFILE, courses: [] })

    const body = await (await GET()).json()

    expect(body.complete).toBe(false)
    expect(body.steps.map((s: { done: boolean }) => s.done)).toEqual([true, true, false])
    expect(body.programs).toHaveLength(2)
    expect(body.programs[0].fit).toBeUndefined()
  })

  it('reads no saved programs without a profile', async () => {
    prismaMock.studentProfile.findUnique.mockResolvedValue(null)

    const body = await (await GET()).json()

    expect(body).toMatchObject({ complete: false, programs: [] })
    expect(prismaMock.savedProgram.findMany).not.toHaveBeenCalled()
  })

  it('is only for a signed-in student', async () => {
    vi.mocked(auth).mockResolvedValueOnce(null as never)

    const response = await GET()

    expect(response.status).toBe(401)
    expect(prismaMock.studentProfile.findUnique).not.toHaveBeenCalled()
  })
})
