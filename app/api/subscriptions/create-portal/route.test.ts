import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// The Stripe billing portal can cancel a subscription and change the card, so it opens only for
// the customer stored on the coordinator's own school (MAINT 7.1 Part 3).

const { prismaMock, createPortalSession } = vi.hoisted(() => ({
  prismaMock: { coordinatorProfile: { findFirst: vi.fn() } },
  createPortalSession: vi.fn()
}))

vi.mock('@/lib/prisma', () => ({ prisma: prismaMock }))
vi.mock('@/lib/auth/config', () => ({ auth: vi.fn(async () => ({ user: { id: 'coord-user' } })) }))
vi.mock('@/lib/rate-limit', () => ({ applyRateLimit: vi.fn(async () => null) }))
vi.mock('@/lib/logger', () => ({ logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() } }))
vi.mock('@/lib/stripe/server', () => ({ createPortalSession }))

import { POST } from './route'

function coordinatorOf(school: Record<string, unknown>) {
  prismaMock.coordinatorProfile.findFirst.mockResolvedValue({
    id: 'coordinator-1',
    school: { id: 'school-1', subscriptionTier: 'REGULAR', stripeCustomerId: 'cus_1', ...school }
  })
}

function post() {
  return POST(
    new Request('http://localhost/api/subscriptions/create-portal', {
      method: 'POST',
      headers: { 'content-type': 'application/json' }
    })
  )
}

beforeEach(() => {
  vi.clearAllMocks()
  vi.stubEnv('NEXT_PUBLIC_APP_URL', 'https://www.ibmatch.com')
  coordinatorOf({})
  createPortalSession.mockResolvedValue('https://billing.stripe.com/p/session/1')
})

afterEach(() => {
  vi.unstubAllEnvs()
})

describe('POST /api/subscriptions/create-portal', () => {
  it("opens the portal for the school's own Stripe customer", async () => {
    const res = await post()

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ url: 'https://billing.stripe.com/p/session/1' })
    expect(createPortalSession).toHaveBeenCalledWith({
      customerId: 'cus_1',
      returnUrl: 'https://www.ibmatch.com/coordinator/settings/subscription'
    })
  })

  it.each([
    ['a VIP school', { subscriptionTier: 'VIP' }],
    ['a school with no Stripe customer', { stripeCustomerId: null }]
  ])('refuses %s with 400, before Stripe', async (_who, school) => {
    coordinatorOf(school)

    const res = await post()

    expect(res.status).toBe(400)
    expect(createPortalSession).not.toHaveBeenCalled()
  })

  it("answers 500 without Stripe's message when Stripe fails", async () => {
    createPortalSession.mockRejectedValue(new Error('No such customer: cus_1'))

    const res = await post()

    expect(res.status).toBe(500)
    expect(await res.json()).toEqual({ error: 'Failed to create portal session' })
  })
})
