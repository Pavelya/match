import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// The Stripe webhook is the only writer of a REGULAR school's subscription status, and that
// status decides whether the coordinator has paid features (lib/auth/access-control.ts). In
// production it must act only on events Stripe signed; each event must leave the school in the
// state below; and a failed write must return 500, so that Stripe delivers the event again
// (MAINT 7.1, session 9). Every request is signed by the Stripe SDK itself, so the route's real
// `constructEvent` runs — only Prisma, the logger and `next/headers` are replaced.

const { prismaMock, requestHeaders } = vi.hoisted(() => ({
  prismaMock: {
    iBSchool: { findUnique: vi.fn(), findFirst: vi.fn(), update: vi.fn() }
  },
  requestHeaders: { current: new Headers() }
}))

vi.mock('@/lib/prisma', () => ({ prisma: prismaMock }))
vi.mock('@/lib/logger', () => ({ logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() } }))
// The route reads the signature through `headers()`, which needs a request scope.
vi.mock('next/headers', () => ({ headers: vi.fn(async () => requestHeaders.current) }))

import { getCoordinatorAccess } from '@/lib/auth/access-control'
import { getStripe } from '@/lib/stripe/server'
import { POST } from './route'

const SECRET = 'whsec_test_secret'

function event(type: string, object: Record<string, unknown>) {
  return { id: 'evt_1', object: 'event', type, data: { object } }
}

function checkoutCompleted(session: Record<string, unknown> = {}) {
  return event('checkout.session.completed', {
    id: 'cs_1',
    object: 'checkout.session',
    mode: 'subscription',
    customer: 'cus_1',
    subscription: 'sub_1',
    metadata: { schoolId: 'school-1' },
    ...session
  })
}

function subscriptionEvent(type: string, subscription: Record<string, unknown> = {}) {
  return event(type, {
    id: 'sub_1',
    object: 'subscription',
    customer: 'cus_1',
    status: 'active',
    metadata: { schoolId: 'school-1' },
    ...subscription
  })
}

function sign(payload: string, options: { secret?: string; timestamp?: number } = {}) {
  return getStripe().webhooks.generateTestHeaderString({
    payload,
    secret: options.secret ?? SECRET,
    timestamp: options.timestamp
  })
}

function send(payload: string, signature?: string) {
  requestHeaders.current = new Headers(signature ? { 'stripe-signature': signature } : {})
  return POST(
    new Request('http://localhost/api/webhooks/stripe', {
      method: 'POST',
      body: payload,
      headers: requestHeaders.current
    })
  )
}

function deliver(evt: ReturnType<typeof event>) {
  const payload = JSON.stringify(evt)
  return send(payload, sign(payload))
}

function written() {
  expect(prismaMock.iBSchool.update).toHaveBeenCalledOnce()
  return prismaMock.iBSchool.update.mock.calls[0][0]
}

beforeEach(() => {
  vi.clearAllMocks()
  vi.stubEnv('NODE_ENV', 'production')
  vi.stubEnv('STRIPE_WEBHOOK_SECRET', SECRET)
  // Only for the SDK's local signing helpers; nothing here calls Stripe's API.
  vi.stubEnv('STRIPE_SECRET_KEY', 'sk_test_not_a_real_key')
  prismaMock.iBSchool.findUnique.mockImplementation(async ({ where }) =>
    where.id === 'school-1' ? { id: 'school-1' } : null
  )
  prismaMock.iBSchool.findFirst.mockResolvedValue(null)
  prismaMock.iBSchool.update.mockImplementation(async ({ where, data }) => ({ ...where, ...data }))
})

afterEach(() => {
  vi.unstubAllEnvs()
})

describe('POST /api/webhooks/stripe — signature, in production', () => {
  it('acts on an event Stripe signed', async () => {
    const res = await deliver(checkoutCompleted())

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ received: true })
    expect(prismaMock.iBSchool.update).toHaveBeenCalledOnce()
  })

  it('refuses a body changed after signing', async () => {
    const signed = JSON.stringify(checkoutCompleted({ metadata: { schoolId: 'school-1' } }))
    const forged = JSON.stringify(checkoutCompleted({ metadata: { schoolId: 'school-2' } }))

    const res = await send(forged, sign(signed))

    expect(res.status).toBe(400)
    expect(prismaMock.iBSchool.update).not.toHaveBeenCalled()
  })

  it('refuses an event signed with another secret', async () => {
    const payload = JSON.stringify(checkoutCompleted())

    const res = await send(payload, sign(payload, { secret: 'whsec_someone_else' }))

    expect(res.status).toBe(400)
    expect(prismaMock.iBSchool.update).not.toHaveBeenCalled()
  })

  it('refuses a replayed event signed outside the five-minute tolerance', async () => {
    const payload = JSON.stringify(checkoutCompleted())
    const tenMinutesAgo = Math.floor(Date.now() / 1000) - 600

    const res = await send(payload, sign(payload, { timestamp: tenMinutesAgo }))

    expect(res.status).toBe(400)
    expect(prismaMock.iBSchool.update).not.toHaveBeenCalled()
  })

  it('refuses an event with no signature', async () => {
    const res = await send(JSON.stringify(checkoutCompleted()))

    expect(res.status).toBe(400)
    expect(prismaMock.iBSchool.update).not.toHaveBeenCalled()
  })

  it('refuses everything with 500 when STRIPE_WEBHOOK_SECRET is missing', async () => {
    vi.stubEnv('STRIPE_WEBHOOK_SECRET', undefined)

    const res = await deliver(checkoutCompleted())

    expect(res.status).toBe(500)
    expect(prismaMock.iBSchool.update).not.toHaveBeenCalled()
  })
})

describe('POST /api/webhooks/stripe — signature, outside production', () => {
  it('accepts an unsigned event when no secret is set, for local testing only', async () => {
    vi.stubEnv('NODE_ENV', 'development')
    vi.stubEnv('STRIPE_WEBHOOK_SECRET', undefined)

    const res = await send(JSON.stringify(checkoutCompleted()))

    expect(res.status).toBe(200)
    expect(prismaMock.iBSchool.update).toHaveBeenCalledOnce()
  })

  it('still refuses a bad signature when a secret is set', async () => {
    vi.stubEnv('NODE_ENV', 'development')
    const payload = JSON.stringify(checkoutCompleted())

    const res = await send(payload, sign(payload, { secret: 'whsec_someone_else' }))

    expect(res.status).toBe(400)
    expect(prismaMock.iBSchool.update).not.toHaveBeenCalled()
  })
})

describe('checkout.session.completed', () => {
  it("activates the school in the session's metadata and stores its Stripe IDs", async () => {
    const res = await deliver(checkoutCompleted())

    expect(res.status).toBe(200)
    expect(written()).toEqual({
      where: { id: 'school-1' },
      data: {
        stripeCustomerId: 'cus_1',
        stripeSubscriptionId: 'sub_1',
        subscriptionStatus: 'ACTIVE'
      }
    })
    expect(
      getCoordinatorAccess({ subscriptionTier: 'REGULAR', subscriptionStatus: 'ACTIVE' })
        .hasFullAccess
    ).toBe(true)
  })

  it('writes nothing, and still answers 200, when the session has no schoolId', async () => {
    const res = await deliver(checkoutCompleted({ metadata: {} }))

    // 200, so Stripe does not retry an event that can never succeed
    expect(res.status).toBe(200)
    expect(prismaMock.iBSchool.update).not.toHaveBeenCalled()
  })

  it('leaves the same state when Stripe delivers the event twice', async () => {
    await deliver(checkoutCompleted())
    await deliver(checkoutCompleted())

    const [first, second] = prismaMock.iBSchool.update.mock.calls
    expect(second).toEqual(first)
  })
})

describe('customer.subscription.created and .updated — status', () => {
  // Stripe's own statuses, then one it might add later: anything not paid for is INACTIVE.
  const STATUSES: [string, 'ACTIVE' | 'INACTIVE'][] = [
    ['active', 'ACTIVE'],
    ['trialing', 'ACTIVE'],
    ['past_due', 'INACTIVE'],
    ['unpaid', 'INACTIVE'],
    ['canceled', 'INACTIVE'],
    ['incomplete', 'INACTIVE'],
    ['incomplete_expired', 'INACTIVE'],
    ['paused', 'INACTIVE'],
    ['a_status_stripe_adds_later', 'INACTIVE']
  ]

  describe.each(['customer.subscription.created', 'customer.subscription.updated'])(
    '%s',
    (type) => {
      it.each(STATUSES)('Stripe %s → %s', async (stripeStatus, ourStatus) => {
        const res = await deliver(subscriptionEvent(type, { status: stripeStatus }))

        expect(res.status).toBe(200)
        expect(written()).toEqual({
          where: { id: 'school-1' },
          data: { stripeSubscriptionId: 'sub_1', subscriptionStatus: ourStatus }
        })
        expect(
          getCoordinatorAccess({ subscriptionTier: 'REGULAR', subscriptionStatus: ourStatus })
            .hasFullAccess
        ).toBe(ourStatus === 'ACTIVE')
      })
    }
  )
})

describe('customer.subscription.deleted', () => {
  it('cancels the school, which ends full access', async () => {
    const res = await deliver(
      subscriptionEvent('customer.subscription.deleted', { status: 'canceled' })
    )

    expect(res.status).toBe(200)
    expect(written()).toEqual({
      where: { id: 'school-1' },
      data: { subscriptionStatus: 'CANCELLED' }
    })
    expect(
      getCoordinatorAccess({ subscriptionTier: 'REGULAR', subscriptionStatus: 'CANCELLED' })
        .hasFullAccess
    ).toBe(false)
  })
})

// Both subscription handlers find the school the same way: the subscription's metadata, then the
// subscription ID stored at checkout, then the customer ID.
describe.each([
  ['customer.subscription.updated', 'INACTIVE'],
  ['customer.subscription.deleted', 'CANCELLED']
])('%s — finding the school', (type, ourStatus) => {
  const lapsed = (subscription: Record<string, unknown> = {}) =>
    subscriptionEvent(type, { status: 'canceled', ...subscription })

  it("uses the subscription's schoolId first", async () => {
    await deliver(lapsed())

    expect(prismaMock.iBSchool.findUnique).toHaveBeenCalledWith({ where: { id: 'school-1' } })
    expect(prismaMock.iBSchool.findFirst).not.toHaveBeenCalled()
    expect(written().where).toEqual({ id: 'school-1' })
  })

  it('falls back to the stored subscription ID when the schoolId matches no school', async () => {
    prismaMock.iBSchool.findFirst.mockImplementation(async ({ where }) =>
      where.stripeSubscriptionId === 'sub_1' ? { id: 'school-2' } : null
    )

    await deliver(lapsed({ metadata: { schoolId: 'school-gone' } }))

    expect(written().where).toEqual({ id: 'school-2' })
    expect(written().data.subscriptionStatus).toBe(ourStatus)
  })

  it('falls back to the customer ID when there is no schoolId or stored subscription', async () => {
    prismaMock.iBSchool.findFirst.mockImplementation(async ({ where }) =>
      where.stripeCustomerId === 'cus_1' ? { id: 'school-3' } : null
    )

    await deliver(lapsed({ metadata: {} }))

    expect(prismaMock.iBSchool.findUnique).not.toHaveBeenCalled()
    expect(prismaMock.iBSchool.findFirst).toHaveBeenNthCalledWith(1, {
      where: { stripeSubscriptionId: 'sub_1' }
    })
    expect(prismaMock.iBSchool.findFirst).toHaveBeenNthCalledWith(2, {
      where: { stripeCustomerId: 'cus_1' }
    })
    expect(written().where).toEqual({ id: 'school-3' })
  })

  it('writes nothing, and still answers 200, when no school matches', async () => {
    const res = await deliver(lapsed({ metadata: {} }))

    expect(res.status).toBe(200)
    expect(prismaMock.iBSchool.update).not.toHaveBeenCalled()
  })
})

describe('events the webhook does not handle', () => {
  it('answers 200 and writes nothing', async () => {
    const res = await deliver(event('invoice.paid', { id: 'in_1', object: 'invoice' }))

    expect(res.status).toBe(200)
    expect(prismaMock.iBSchool.findUnique).not.toHaveBeenCalled()
    expect(prismaMock.iBSchool.findFirst).not.toHaveBeenCalled()
    expect(prismaMock.iBSchool.update).not.toHaveBeenCalled()
  })
})

describe('a failed write', () => {
  it.each([
    ['checkout.session.completed', checkoutCompleted()],
    ['customer.subscription.updated', subscriptionEvent('customer.subscription.updated')],
    ['customer.subscription.deleted', subscriptionEvent('customer.subscription.deleted')]
  ])('answers 500 on %s, so Stripe delivers it again', async (_type, evt) => {
    prismaMock.iBSchool.update.mockRejectedValue(new Error('connection terminated'))

    const res = await deliver(evt)

    expect(res.status).toBe(500)
  })
})
