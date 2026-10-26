import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// Checkout is where a REGULAR school starts paying. Only a coordinator's own school can be
// subscribed, a VIP or already-active school never reaches Stripe, and the session carries the
// school's ID, which the webhook uses to activate it (MAINT 7.1 Part 3; the webhook is Part 2).

const {
  prismaMock,
  stripeMock,
  getOrCreateStripeCustomer,
  createCheckoutSession,
  hasLiveSubscription
} = vi.hoisted(() => ({
  prismaMock: {
    coordinatorProfile: { findFirst: vi.fn() },
    iBSchool: { update: vi.fn() }
  },
  stripeMock: { prices: { list: vi.fn() } },
  getOrCreateStripeCustomer: vi.fn(),
  createCheckoutSession: vi.fn(),
  hasLiveSubscription: vi.fn()
}))

vi.mock('@/lib/prisma', () => ({ prisma: prismaMock }))
vi.mock('@/lib/auth/config', () => ({ auth: vi.fn(async () => ({ user: { id: 'coord-user' } })) }))
vi.mock('@/lib/rate-limit', () => ({ applyRateLimit: vi.fn(async () => null) }))
vi.mock('@/lib/logger', () => ({ logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() } }))
vi.mock('@/lib/stripe/server', () => ({
  getStripe: () => stripeMock,
  getOrCreateStripeCustomer,
  createCheckoutSession,
  hasLiveSubscription
}))

import { POST } from './route'

function school(overrides: Record<string, unknown> = {}) {
  return {
    id: 'school-1',
    name: 'Example School',
    email: 'office@example.com',
    subscriptionTier: 'REGULAR',
    subscriptionStatus: 'INACTIVE',
    stripeCustomerId: null,
    ...overrides
  }
}

function coordinatorOf(schoolRow: Record<string, unknown> | null) {
  prismaMock.coordinatorProfile.findFirst.mockResolvedValue(
    schoolRow ? { id: 'coordinator-1', school: schoolRow } : null
  )
}

function post() {
  return POST(
    new Request('http://localhost/api/subscriptions/create-checkout', {
      method: 'POST',
      headers: { 'content-type': 'application/json' }
    })
  )
}

function expectNoStripeCall() {
  expect(stripeMock.prices.list).not.toHaveBeenCalled()
  expect(getOrCreateStripeCustomer).not.toHaveBeenCalled()
  expect(createCheckoutSession).not.toHaveBeenCalled()
}

beforeEach(() => {
  vi.clearAllMocks()
  vi.stubEnv('STRIPE_PRODUCT_ID', 'prod_1')
  vi.stubEnv('NEXT_PUBLIC_APP_URL', 'https://www.ibmatch.com')
  coordinatorOf(school())
  stripeMock.prices.list.mockResolvedValue({ data: [{ id: 'price_1' }] })
  getOrCreateStripeCustomer.mockResolvedValue('cus_new')
  createCheckoutSession.mockResolvedValue('https://checkout.stripe.com/c/pay/cs_1')
  hasLiveSubscription.mockResolvedValue(false)
})

afterEach(() => {
  vi.unstubAllEnvs()
})

describe('POST /api/subscriptions/create-checkout', () => {
  it("opens a checkout for the coordinator's own school", async () => {
    const res = await post()

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ url: 'https://checkout.stripe.com/c/pay/cs_1' })
    expect(stripeMock.prices.list).toHaveBeenCalledWith({
      product: 'prod_1',
      active: true,
      type: 'recurring',
      limit: 1
    })
    expect(createCheckoutSession).toHaveBeenCalledWith({
      customerId: 'cus_new',
      schoolId: 'school-1',
      priceId: 'price_1',
      successUrl: 'https://www.ibmatch.com/coordinator/settings/subscription?success=true',
      cancelUrl: 'https://www.ibmatch.com/coordinator/settings/subscription?canceled=true'
    })
  })

  it('stores a new Stripe customer on the school', async () => {
    await post()

    expect(prismaMock.iBSchool.update).toHaveBeenCalledWith({
      where: { id: 'school-1' },
      data: { stripeCustomerId: 'cus_new' }
    })
  })

  it('reuses the stored customer, and writes nothing', async () => {
    coordinatorOf(school({ stripeCustomerId: 'cus_stored' }))
    getOrCreateStripeCustomer.mockResolvedValue('cus_stored')

    await post()

    expect(getOrCreateStripeCustomer).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'school-1', stripeCustomerId: 'cus_stored' })
    )
    expect(prismaMock.iBSchool.update).not.toHaveBeenCalled()
    expect(createCheckoutSession).toHaveBeenCalledWith(
      expect.objectContaining({ customerId: 'cus_stored' })
    )
  })

  it('lets a cancelled school subscribe again', async () => {
    coordinatorOf(school({ subscriptionStatus: 'CANCELLED', stripeCustomerId: 'cus_stored' }))

    const res = await post()

    expect(res.status).toBe(200)
    expect(createCheckoutSession).toHaveBeenCalledOnce()
  })

  it.each([
    ['a VIP school', { subscriptionTier: 'VIP', subscriptionStatus: 'ACTIVE' }],
    ['a school already subscribed', { subscriptionStatus: 'ACTIVE' }]
  ])('refuses %s with 400, before Stripe', async (_who, overrides) => {
    coordinatorOf(school(overrides))

    const res = await post()

    expect(res.status).toBe(400)
    expectNoStripeCall()
    expect(prismaMock.iBSchool.update).not.toHaveBeenCalled()
  })

  it('refuses with 500, before Stripe, when no product is configured', async () => {
    vi.stubEnv('STRIPE_PRODUCT_ID', undefined)

    const res = await post()

    expect(res.status).toBe(500)
    expectNoStripeCall()
  })

  it('refuses with 500, creating no customer, when the product has no active price', async () => {
    stripeMock.prices.list.mockResolvedValue({ data: [] })

    const res = await post()

    expect(res.status).toBe(500)
    expect(getOrCreateStripeCustomer).not.toHaveBeenCalled()
    expect(createCheckoutSession).not.toHaveBeenCalled()
  })

  it("answers 500 without Stripe's message when Stripe fails", async () => {
    createCheckoutSession.mockRejectedValue(new Error('Invalid API Key provided: sk_live_****'))

    const res = await post()

    expect(res.status).toBe(500)
    expect(await res.json()).toEqual({ error: 'Failed to create checkout session' })
  })

  // MAINT 5.34: two checkouts in two tabs would make two subscriptions
  it('refuses with 409, before a checkout, while the customer has a live subscription', async () => {
    coordinatorOf(school({ subscriptionStatus: 'CANCELLED', stripeCustomerId: 'cus_stored' }))
    hasLiveSubscription.mockResolvedValue(true)

    const res = await post()

    expect(res.status).toBe(409)
    expect(hasLiveSubscription).toHaveBeenCalledWith('cus_stored')
    expect(createCheckoutSession).not.toHaveBeenCalled()
  })

  it('asks Stripe nothing about subscriptions for a school with no customer yet', async () => {
    await post()

    expect(hasLiveSubscription).not.toHaveBeenCalled()
  })
})
