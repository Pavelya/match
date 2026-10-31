import { beforeEach, describe, expect, it, vi } from 'vitest'

// A coordinator sees and changes their own school's students and invitations, never another
// school's (MAINT 7.1 Part 3). The school comes from the coordinator's own profile; a route that
// takes an ID checks the record's school against it before reading anything more or writing. Each
// case is run against the coordinator's own school too, so a refusal is known to come from the
// school check and not from something else in the setup.

const { prismaMock, getCachedPrograms, sendEmail } = vi.hoisted(() => ({
  prismaMock: {
    coordinatorProfile: { findFirst: vi.fn() },
    studentProfile: { findUnique: vi.fn(), findMany: vi.fn(), count: vi.fn(), update: vi.fn() },
    invitation: { findUnique: vi.fn(), findMany: vi.fn(), update: vi.fn() },
    user: { findUnique: vi.fn() }
  },
  getCachedPrograms: vi.fn(async () => []),
  sendEmail: vi.fn(async () => ({ data: { id: 'email-1' }, error: null }))
}))

vi.mock('@/lib/prisma', () => ({ prisma: prismaMock }))
vi.mock('@/lib/auth/config', () => ({ auth: vi.fn(async () => ({ user: { id: 'coord-user' } })) }))
vi.mock('@/lib/rate-limit', () => ({ applyRateLimit: vi.fn(async () => null) }))
vi.mock('@/lib/logger', () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn(), debug: vi.fn() }
}))
vi.mock('@/lib/env', () => ({
  env: { NEXT_PUBLIC_APP_URL: 'http://localhost:3000', EMAIL_FROM: 'test@example.com' }
}))
vi.mock('@/lib/email/client', () => ({
  getResendClient: vi.fn(() => ({ emails: { send: sendEmail } }))
}))
vi.mock('@/lib/matching/program-cache', () => ({ getCachedPrograms }))
vi.mock('@/lib/matching', () => ({
  getCachedMatchesV10: vi.fn(async () => [])
}))
vi.mock('@/lib/matching/cache', () => ({ invalidateStudentCache: vi.fn(async () => {}) }))
vi.mock('@/lib/reference-data', () => ({ getCachedIBCourses: vi.fn(async () => []) }))

import { NextRequest } from 'next/server'
import * as student from './students/[id]/route'
import * as studentMatches from './students/[id]/matches/route'
import * as invitation from './students/invite/[id]/route'
import * as resend from './students/invite/resend/route'
import * as students from './students/route'
import * as studentInvites from './students/invite/route'
import * as teamInvites from './team/invite/route'

const OWN = 'school-1'
const OTHER = 'school-2'

function studentOf(schoolId: string) {
  return {
    id: 'student-1',
    userId: 'student-user',
    schoolId,
    coordinatorAccessConsentAt: new Date('2026-01-01'),
    totalIBPoints: 36,
    tokGrade: 'B',
    eeGrade: 'C',
    user: { id: 'student-user', name: 'A Student', email: 'student@example.com' },
    courses: [{ level: 'HL', grade: 6, ibCourse: { id: 'physics', name: 'Physics' } }],
    preferredFields: [],
    preferredCountries: []
  }
}

function invitationOf(schoolId: string) {
  return {
    id: 'invitation-1',
    email: 'invited@example.com',
    token: 'token-1',
    role: 'STUDENT',
    status: 'PENDING',
    schoolId,
    expiresAt: new Date(Date.now() + 86_400_000),
    createdAt: new Date('2026-10-01'),
    studentName: 'A Student'
  }
}

function request(url: string, method = 'GET', body?: Record<string, unknown>) {
  return new NextRequest(`http://localhost/api/coordinator/${url}`, {
    method,
    ...(body ? { body: JSON.stringify(body) } : {})
  })
}

const params = { params: Promise.resolve({ id: 'record-1' }) }

/** Each handler that takes the ID of a student or an invitation. */
const BY_ID: [string, () => Promise<Response>][] = [
  ['GET students/[id]', () => student.GET(request('students/record-1'), params)],
  [
    'PATCH students/[id]',
    () =>
      student.PATCH(
        request('students/record-1', 'PATCH', { preferredCountries: ['country-1'] }),
        params
      )
  ],
  [
    'GET students/[id]/matches',
    () => studentMatches.GET(request('students/record-1/matches'), params)
  ],
  ['GET students/invite/[id]', () => invitation.GET(request('students/invite/record-1'), params)],
  [
    'DELETE students/invite/[id]',
    () => invitation.DELETE(request('students/invite/record-1', 'DELETE'), params)
  ],
  [
    'POST students/invite/resend',
    () => resend.POST(request('students/invite/resend', 'POST', { invitationId: 'invitation-1' }))
  ]
]

function recordsBelongTo(schoolId: string) {
  prismaMock.studentProfile.findUnique.mockResolvedValue(studentOf(schoolId))
  prismaMock.invitation.findUnique.mockResolvedValue(invitationOf(schoolId))
}

function writes() {
  return [prismaMock.studentProfile.update, prismaMock.invitation.update].flatMap(
    (fn) => fn.mock.calls
  )
}

beforeEach(() => {
  vi.clearAllMocks()
  prismaMock.coordinatorProfile.findFirst.mockResolvedValue({
    id: 'coordinator-1',
    userId: 'coord-user',
    schoolId: OWN,
    isActive: true,
    user: { name: 'A Coordinator' },
    school: {
      id: OWN,
      name: 'Own School',
      subscriptionTier: 'VIP',
      subscriptionStatus: 'ACTIVE'
    }
  })
  prismaMock.studentProfile.findMany.mockResolvedValue([])
  prismaMock.studentProfile.count.mockResolvedValue(0)
  prismaMock.studentProfile.update.mockResolvedValue(studentOf(OWN))
  prismaMock.invitation.findMany.mockResolvedValue([])
  prismaMock.invitation.update.mockResolvedValue(invitationOf(OWN))
  prismaMock.user.findUnique.mockResolvedValue(null)
})

describe("a coordinator reaching another school's record by ID", () => {
  it.each(BY_ID)('%s → 403, having written and sent nothing', async (_name, send) => {
    recordsBelongTo(OTHER)

    const res = await send()

    expect(res.status).toBe(403)
    expect(JSON.stringify(await res.json())).not.toMatch(/student@example\.com|invited@example/)
    expect(writes()).toEqual([])
    expect(getCachedPrograms).not.toHaveBeenCalled()
    expect(sendEmail).not.toHaveBeenCalled()
  })

  it.each(BY_ID)('%s → 200 for a record of their own school', async (_name, send) => {
    recordsBelongTo(OWN)

    const res = await send()

    expect(res.status).toBe(200)
  })
})

describe("a coordinator's lists", () => {
  it('lists only their own school’s students, whatever the query says', async () => {
    await students.GET(request(`students?schoolId=${OTHER}&search=a`))

    expect(prismaMock.studentProfile.findMany).toHaveBeenCalledOnce()
    expect(prismaMock.studentProfile.findMany.mock.calls[0][0].where.schoolId).toBe(OWN)
    expect(prismaMock.studentProfile.count.mock.calls[0][0].where.schoolId).toBe(OWN)
  })

  it.each([
    ['student', () => studentInvites.GET()],
    ['coordinator', () => teamInvites.GET()]
  ])('lists only their own school’s %s invitations', async (_kind, list) => {
    await list()

    expect(prismaMock.invitation.findMany).toHaveBeenCalledOnce()
    expect(prismaMock.invitation.findMany.mock.calls[0][0].where.schoolId).toBe(OWN)
  })
})
