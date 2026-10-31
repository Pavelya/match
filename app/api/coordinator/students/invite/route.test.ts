import { beforeEach, describe, expect, it, vi } from 'vitest'

// A coordinator inviting an address that already belongs to a coordinator, an admin or a university
// agent hears only that it can't be invited, never which kind of account it is (SEC-5).

const { authMock, prismaMock, applyRateLimit } = vi.hoisted(() => ({
  authMock: vi.fn(),
  prismaMock: {
    coordinatorProfile: { findFirst: vi.fn() },
    studentProfile: { count: vi.fn() },
    invitation: { count: vi.fn() },
    user: { findUnique: vi.fn() }
  },
  applyRateLimit: vi.fn()
}))

vi.mock('@/lib/auth/config', () => ({ auth: authMock }))
vi.mock('@/lib/prisma', () => ({ prisma: prismaMock }))
vi.mock('@/lib/rate-limit', () => ({ applyRateLimit }))
vi.mock('@/lib/env', () => ({ env: { EMAIL_FROM: 'noreply@example.com' } }))
vi.mock('@/lib/email/client', () => ({ getResendClient: vi.fn() }))

import { NextRequest } from 'next/server'
import { POST } from './route'

function invite(email: string) {
  return POST(
    new NextRequest('http://localhost/api/coordinator/students/invite', {
      method: 'POST',
      body: JSON.stringify({ email })
    })
  )
}

beforeEach(() => {
  vi.clearAllMocks()
  authMock.mockResolvedValue({ user: { id: 'coordinator-1' } })
  applyRateLimit.mockResolvedValue(null)
  prismaMock.coordinatorProfile.findFirst.mockResolvedValue({
    id: 'profile-1',
    isActive: true,
    user: { name: 'Ana' },
    school: { id: 'school-1', name: 'Lycée', subscriptionTier: 'VIP', subscriptionStatus: 'ACTIVE' }
  })
  prismaMock.studentProfile.count.mockResolvedValue(0)
  prismaMock.invitation.count.mockResolvedValue(0)
})

describe('POST /api/coordinator/students/invite, an address that is not a student’s', () => {
  it.each(['COORDINATOR', 'PLATFORM_ADMIN', 'UNIVERSITY_AGENT'])(
    'gives the same answer for a %s, naming no kind of account',
    async (role) => {
      prismaMock.user.findUnique.mockResolvedValue({ id: 'user-2', role, studentProfile: null })

      const res = await invite('someone@example.com')

      expect(res.status).toBe(409)
      expect(await res.json()).toEqual({ error: "This address can't be invited" })
    }
  )
})
