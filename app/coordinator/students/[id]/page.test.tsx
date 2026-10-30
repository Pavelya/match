import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'

// The student page's "Top Matches" are the first three of the student's own list (MAINT 5.44). The
// page swallows a matching error and shows no matches, so only rendering it shows they arrive.

const { prismaMock, redisMock, programsMock } = vi.hoisted(() => ({
  prismaMock: {
    coordinatorProfile: { findFirst: vi.fn() },
    studentProfile: { findUnique: vi.fn() }
  },
  redisMock: { get: vi.fn(async () => null), set: vi.fn(async () => 'OK') },
  programsMock: vi.fn()
}))

vi.mock('@/lib/prisma', () => ({ prisma: prismaMock }))
vi.mock('@/lib/redis/client', () => ({ redis: redisMock }))
vi.mock('@/lib/matching/program-cache', () => ({ getCachedPrograms: programsMock }))
vi.mock('@/lib/auth/config', () => ({ auth: vi.fn(async () => ({ user: { id: 'coord-user' } })) }))
vi.mock('@/lib/auth/guards', () => ({ requireCoordinator: vi.fn(async () => undefined) }))
vi.mock('@/lib/logger', () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn(), debug: vi.fn() }
}))

import type { CachedProgram } from '@/lib/matching/program-cache'
import StudentDetailPage from './page'

const STUDENT = {
  id: 'profile-1',
  userId: 'student-user',
  schoolId: 'school-1',
  coordinatorAccessConsentAt: new Date('2026-01-01'),
  totalIBPoints: 36,
  tokGrade: 'B',
  eeGrade: 'C',
  openToAllFields: false,
  openToAllLocations: false,
  user: { id: 'student-user', name: 'A Student', email: 'student@example.com', image: null },
  courses: [
    {
      id: 'course-1',
      level: 'HL',
      grade: 6,
      ibCourse: { id: 'physics', name: 'Physics', group: 4 }
    }
  ],
  preferredFields: [{ id: 'field-1', name: 'Field', iconName: null }],
  preferredCountries: [{ id: 'country-1', name: 'Country', flagEmoji: '' }],
  savedPrograms: []
}

function program(name: string, minIBPoints: number): CachedProgram {
  return {
    id: name,
    name,
    universityId: 'uni-1',
    university: {
      id: 'uni-1',
      name: 'University',
      abbreviatedName: null,
      image: null,
      city: 'City',
      admitRate: null,
      internationalAdmitRate: null,
      admitRateYear: null,
      country: { id: 'country-1', name: 'Country', code: 'CC', flagEmoji: '' }
    },
    fieldOfStudyId: 'field-1',
    fieldOfStudy: { id: 'field-1', name: 'Field', iconName: null, description: null },
    degreeType: 'BSc',
    duration: '3 years',
    campusCity: null,
    minIBPoints,
    requirementsEntryYear: 2027,
    programUrl: null,
    courseRequirements: []
  }
}

async function page() {
  const element = await StudentDetailPage({ params: Promise.resolve({ id: 'profile-1' }) })
  return renderToStaticMarkup(element)
}

/** The program names in the order the page shows them */
function shown(html: string) {
  return [...html.matchAll(/href="\/programs\/([^"]+)"/g)].map((m) => m[1])
}

beforeEach(() => {
  vi.clearAllMocks()
  vi.stubEnv('MATCHING_V10_FULL', 'true')
  prismaMock.coordinatorProfile.findFirst.mockResolvedValue({
    userId: 'coord-user',
    school: {
      id: 'school-1',
      name: 'School',
      subscriptionTier: 'VIP',
      subscriptionStatus: 'ACTIVE'
    }
  })
  prismaMock.studentProfile.findUnique.mockResolvedValue(STUDENT)
  // Catalogue order is the old order among equal scores
  programsMock.mockResolvedValue([
    program('far-under', 24),
    program('under', 28),
    program('near-under', 34),
    program('exact', 36),
    program('two-short', 38)
  ])
})

describe('Top Matches on the coordinator student page', () => {
  it('shows the first three of the student’s list, from the shared key', async () => {
    const html = await page()

    expect(shown(html)).toEqual(['exact', 'near-under', 'under'])
    expect(redisMock.set).toHaveBeenCalledWith(
      'matchesV10:student-user:0.60_0.30_0.10:5',
      expect.any(Array),
      { ex: 1800 }
    )
  })

  it('shows none for a student without subjects, as on Matches, and computes nothing', async () => {
    prismaMock.studentProfile.findUnique.mockResolvedValue({ ...STUDENT, courses: [] })

    const html = await page()

    expect(shown(html)).toEqual([])
    expect(html).toContain('No matches found')
    expect(programsMock).not.toHaveBeenCalled()
    expect(redisMock.set).not.toHaveBeenCalled()
  })

  it('reads no list without the student’s consent', async () => {
    prismaMock.studentProfile.findUnique.mockResolvedValue({
      ...STUDENT,
      coordinatorAccessConsentAt: null
    })

    const html = await page()

    expect(html).toContain('Consent Required')
    expect(programsMock).not.toHaveBeenCalled()
    expect(redisMock.get).not.toHaveBeenCalled()
  })
})
