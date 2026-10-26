import { NextRequest } from 'next/server'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// An invited coordinator is recorded as having accepted the published Terms and Privacy labels,
// so "We've updated our policies" does not follow the invitation at once (MAINT 5.30). The real
// consent module runs against the mocked Prisma, so the check is the one the notice makes.

const { prismaMock, published } = vi.hoisted(() => {
  const published: { terms: string | null; privacy: string | null } = { terms: null, privacy: null }
  const prismaMock = {
    invitation: { findUnique: vi.fn(), update: vi.fn() },
    user: { findUnique: vi.fn(), create: vi.fn() },
    coordinatorProfile: { create: vi.fn() },
    legalDocument: {
      findUnique: vi.fn(async ({ where }: { where: { type: string } }) => {
        const label = where.type === 'TERMS_OF_SERVICE' ? published.terms : published.privacy
        return label ? { publishedVersion: { versionLabel: label } } : null
      })
    },
    $transaction: vi.fn(async (work: (tx: unknown) => unknown) => work(prismaMock))
  }
  return { prismaMock, published }
})

vi.mock('@/lib/prisma', () => ({ prisma: prismaMock }))
vi.mock('@/lib/rate-limit', () => ({
  applyRateLimit: vi.fn(async () => null),
  getClientIp: () => '203.0.113.1'
}))
vi.mock('@/lib/logger', () => ({ logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() } }))

import { POST } from './route'
import { checkConsentStatus } from '@/lib/legal-documents'

const request = () =>
  new NextRequest('https://www.ibmatch.com/api/auth/accept-invite', {
    method: 'POST',
    body: JSON.stringify({ token: 'token-1', name: 'Dana Coordinator' })
  })

const created = () => prismaMock.user.create.mock.calls[0][0].data

beforeEach(() => {
  vi.clearAllMocks()
  published.terms = '2026-03-01'
  published.privacy = 'v2 March 2026'
  prismaMock.invitation.findUnique.mockResolvedValue({
    id: 'inv-1',
    email: 'dana@school.example',
    role: 'COORDINATOR',
    status: 'PENDING',
    expiresAt: new Date(Date.now() + 86_400_000),
    schoolId: 'school-1',
    school: { id: 'school-1', name: 'Test School' }
  })
  prismaMock.user.findUnique.mockResolvedValue(null)
  prismaMock.user.create.mockResolvedValue({
    id: 'user-1',
    email: 'dana@school.example',
    name: 'Dana Coordinator'
  })
})

describe('POST /api/auth/accept-invite', () => {
  it('stores the published Terms and Privacy labels', async () => {
    expect((await POST(request())).status).toBe(200)

    expect(created()).toMatchObject({
      role: 'COORDINATOR',
      termsVersion: '2026-03-01',
      privacyPolicyVersion: 'v2 March 2026',
      termsAcceptedAt: expect.any(Date),
      privacyAcceptedAt: expect.any(Date)
    })
  })

  it('leaves nothing for the policy update notice to show', async () => {
    await POST(request())
    prismaMock.user.findUnique.mockResolvedValue({
      termsVersion: created().termsVersion,
      privacyPolicyVersion: created().privacyPolicyVersion
    })

    const status = await checkConsentStatus('user-1')
    expect(status.termsNeedsReconsent).toBe(false)
    expect(status.privacyNeedsReconsent).toBe(false)
  })

  it('stores no label when nothing is published', async () => {
    published.terms = null
    published.privacy = null

    expect((await POST(request())).status).toBe(200)
    expect(created()).toMatchObject({ termsVersion: null, privacyPolicyVersion: null })
  })

  it('reads no policy version for an invitation it refuses', async () => {
    prismaMock.invitation.findUnique.mockResolvedValue({
      ...(await prismaMock.invitation.findUnique()),
      status: 'ACCEPTED'
    })

    expect((await POST(request())).status).toBe(409)
    expect(prismaMock.legalDocument.findUnique).not.toHaveBeenCalled()
  })
})
