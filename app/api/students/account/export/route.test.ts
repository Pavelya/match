import { beforeEach, describe, expect, it, vi } from 'vitest'

// The data export includes "Open to anywhere", which first run saves since rebranding 3.1, and
// reads only the columns it writes (rebranding 3.3). Since 5.31 it also holds the consent records,
// the student's support tickets and the invitations sent to their address, and no one else's data

const { prismaMock } = vi.hoisted(() => ({
  prismaMock: { user: { findUnique: vi.fn() }, invitation: { findMany: vi.fn() } }
}))

vi.mock('@/lib/prisma', () => ({ prisma: prismaMock }))
vi.mock('@/lib/auth/config', () => ({ auth: vi.fn(async () => ({ user: { id: 'user-1' } })) }))
vi.mock('@/lib/rate-limit', () => ({ applyRateLimit: vi.fn(async () => null) }))
vi.mock('@/lib/logger', () => ({ logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() } }))

import { GET } from './route'

const created = new Date('2026-03-12T09:00:00.000Z')
const accepted = new Date('2026-03-14T10:00:00.000Z')

beforeEach(() => {
  vi.clearAllMocks()
  prismaMock.user.findUnique.mockResolvedValue({
    email: 'maya@example.com',
    name: 'Maya',
    role: 'STUDENT',
    createdAt: created,
    updatedAt: created,
    lastActiveAt: accepted,
    inactivityNoticeSentAt: null,
    termsVersion: '2026-10-20',
    termsAcceptedAt: created,
    privacyPolicyVersion: '2026-10-20',
    privacyAcceptedAt: created,
    supportTickets: [
      {
        ticketNumber: 'TKT-A1B2C3',
        category: 'DATA_PRIVACY',
        status: 'RESOLVED',
        subject: 'My grades',
        message: 'Please correct my Physics grade.',
        adminResponse: 'Done.',
        createdAt: created,
        updatedAt: accepted,
        resolvedAt: accepted
      }
    ],
    studentProfile: {
      totalIBPoints: 38,
      tokGrade: 'B',
      eeGrade: 'C',
      openToAllLocations: true,
      linkedByInvitation: true,
      coordinatorAccessConsentAt: accepted,
      coordinatorAccessConsentVersion: '2025-12-14',
      createdAt: created,
      updatedAt: created,
      school: null,
      courses: [{ level: 'HL', grade: 6, ibCourse: { name: 'Physics', group: 4 } }],
      preferredFields: [{ name: 'Computer Science' }],
      preferredCountries: [],
      savedPrograms: []
    }
  })
  prismaMock.invitation.findMany.mockResolvedValue([
    {
      status: 'ACCEPTED',
      createdAt: created,
      expiresAt: new Date('2026-03-19T09:00:00.000Z'),
      acceptedAt: accepted,
      school: { name: 'Lakeside International' }
    }
  ])
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

  it('is version 1.2', async () => {
    const data = await (await GET()).json()

    expect(data.exportVersion).toBe('1.2')
  })

  it('holds the day last active and the inactivity notice (MAINT 7.6)', async () => {
    const data = await (await GET()).json()

    expect(data.account).toEqual({
      email: 'maya@example.com',
      name: 'Maya',
      role: 'STUDENT',
      createdAt: created.toISOString(),
      updatedAt: created.toISOString(),
      lastActiveAt: accepted.toISOString(),
      inactivityNoticeSentAt: null
    })
  })

  it('holds the accepted policy versions and the school link consent', async () => {
    const data = await (await GET()).json()

    expect(data.consent).toEqual({
      termsVersion: '2026-10-20',
      termsAcceptedAt: created.toISOString(),
      privacyPolicyVersion: '2026-10-20',
      privacyAcceptedAt: created.toISOString(),
      coordinatorAccess: {
        linkedByInvitation: true,
        consentedAt: accepted.toISOString(),
        consentVersion: '2025-12-14'
      }
    })
  })

  it('holds the student support tickets with the reply', async () => {
    const data = await (await GET()).json()

    expect(data.supportTickets).toEqual([
      {
        ticketNumber: 'TKT-A1B2C3',
        category: 'DATA_PRIVACY',
        status: 'RESOLVED',
        subject: 'My grades',
        message: 'Please correct my Physics grade.',
        reply: 'Done.',
        createdAt: created.toISOString(),
        updatedAt: accepted.toISOString(),
        resolvedAt: accepted.toISOString()
      }
    ])
  })

  it('holds the invitations sent to the address, matched as deleting the account matches them', async () => {
    const data = await (await GET()).json()

    expect(data.invitations).toEqual([
      {
        school: 'Lakeside International',
        status: 'ACCEPTED',
        sentAt: created.toISOString(),
        expiresAt: '2026-03-19T09:00:00.000Z',
        acceptedAt: accepted.toISOString()
      }
    ])
    const query = prismaMock.invitation.findMany.mock.calls[0][0]
    expect(query.where).toEqual({
      role: 'STUDENT',
      email: { equals: 'maya@example.com', mode: 'insensitive' }
    })
  })

  it('reads no one else: not who resolved a ticket, who sent an invitation, or its token', async () => {
    await GET()

    const user = prismaMock.user.findUnique.mock.calls[0][0]
    expect(Object.keys(user.select.supportTickets.select)).not.toContain('resolvedBy')
    expect(Object.keys(user.select.supportTickets.select)).not.toContain('resolvedById')
    const invitations = prismaMock.invitation.findMany.mock.calls[0][0]
    expect(invitations.include).toBeUndefined()
    expect(Object.keys(invitations.select)).not.toContain('invitedBy')
    expect(Object.keys(invitations.select)).not.toContain('invitedById')
    expect(Object.keys(invitations.select)).not.toContain('token')
    expect(Object.keys(invitations.select)).not.toContain('email')
  })

  it('says a student with no profile has no school link consent', async () => {
    const student = await prismaMock.user.findUnique()
    prismaMock.user.findUnique.mockResolvedValueOnce({ ...student, studentProfile: null })

    const data = await (await GET()).json()

    expect(data.consent.coordinatorAccess).toBeNull()
    expect(data.supportTickets).toHaveLength(1)
  })
})
