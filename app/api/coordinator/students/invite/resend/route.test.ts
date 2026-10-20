import type { NextRequest } from 'next/server'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// The student reminder picks its version (rebranding 4.7, decided on "D4.18 Emails" 20 October
// 2026): one read of the user by the invitation's address, only on Resend and only for the new
// design's email. Today's design reads nothing new and sends what it sends on main.

const { prismaMock, sendMock } = vi.hoisted(() => ({
  prismaMock: {
    coordinatorProfile: { findFirst: vi.fn() },
    invitation: { findUnique: vi.fn(), update: vi.fn() },
    user: { findUnique: vi.fn() }
  },
  sendMock: vi.fn()
}))

vi.mock('@/lib/prisma', () => ({ prisma: prismaMock }))
vi.mock('@/lib/auth/config', () => ({ auth: vi.fn(async () => ({ user: { id: 'coord-user' } })) }))
vi.mock('@/lib/rate-limit', () => ({ applyRateLimit: vi.fn(async () => null) }))
vi.mock('@/lib/logger', () => ({ logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() } }))
vi.mock('@/lib/env', () => ({
  env: { NEXT_PUBLIC_APP_URL: 'https://www.ibmatch.com', EMAIL_FROM: 'hello@ibmatch.com' }
}))
vi.mock('@/lib/email/client', () => ({ getResendClient: () => ({ emails: { send: sendMock } }) }))

import { POST } from './route'

const SCHOOL = 'Test School | Demo and feedback call with IB coordinator'
const request = { json: async () => ({ invitationId: 'inv-1' }) } as unknown as NextRequest

beforeEach(() => {
  vi.clearAllMocks()
  prismaMock.coordinatorProfile.findFirst.mockResolvedValue({
    id: 'coord-1',
    isActive: true,
    user: { name: null },
    school: { id: 'school-1', name: SCHOOL }
  })
  prismaMock.invitation.findUnique.mockResolvedValue({
    id: 'inv-1',
    email: 'maya@example.com',
    schoolId: 'school-1',
    role: 'STUDENT',
    status: 'PENDING'
  })
  sendMock.mockResolvedValue({ error: null })
})

afterEach(() => vi.unstubAllEnvs())

const sent = () => sendMock.mock.calls[0][0] as { subject: string; text?: string }

describe('POST /api/coordinator/students/invite/resend', () => {
  it('in today’s design, reads nothing new and sends the reminder as on main', async () => {
    vi.stubEnv('NEW_UI_FOR_EVERYONE', undefined)

    expect((await POST(request)).status).toBe(200)
    expect(prismaMock.user.findUnique).not.toHaveBeenCalled()
    expect(sent().subject).toBe(`Reminder: You're invited to join ${SCHOOL} on IB Match`)
    expect(sent().text).toBeUndefined()
  })

  it('in the new design, sends a new account the reminder with its new link', async () => {
    vi.stubEnv('NEW_UI_FOR_EVERYONE', 'true')
    prismaMock.user.findUnique.mockResolvedValue(null)

    expect((await POST(request)).status).toBe(200)
    expect(prismaMock.user.findUnique).toHaveBeenCalledTimes(1)
    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: { email: 'maya@example.com' },
      select: { id: true }
    })
    const { token } = prismaMock.invitation.update.mock.calls[0][0].data
    expect(sent().subject).toBe(`Reminder: you’re invited to join ${SCHOOL} on IB Match`)
    expect(sent().text).toContain(`https://www.ibmatch.com/auth/accept-student-invite/${token}`)
  })

  it('in the new design, sends an existing account its own email and School invitations', async () => {
    vi.stubEnv('NEW_UI_FOR_EVERYONE', 'true')
    prismaMock.user.findUnique.mockResolvedValue({ id: 'user-1' })

    expect((await POST(request)).status).toBe(200)
    expect(sent().subject).toBe(`Reminder: ${SCHOOL} wants to connect with your IB Match account`)
    expect(sent().text).toContain(
      'Open the invitation:\nhttps://www.ibmatch.com/student/invitations'
    )
    expect(sent().text).not.toContain('accept-student-invite')
  })
})
