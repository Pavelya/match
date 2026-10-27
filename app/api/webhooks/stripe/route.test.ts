import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// The Stripe webhook is the only writer of a REGULAR school's subscription status, and that
// status decides whether the coordinator has paid features (lib/auth/access-control.ts). In
// production it must act only on events Stripe signed; each event must leave the school in the
// state below; and a failed write must return 500, so that Stripe delivers the event again
// (MAINT 7.1 Part 2). Every request is signed by the Stripe SDK itself, so the route's real
// `constructEvent` runs — only Prisma, the logger, `next/headers` and the one Stripe API call,
// `subscriptions.retrieve`, are replaced.
//
// Stripe neither orders events nor stops retrying a failed one for three days, so the route writes
// what Stripe says the subscription is now, never the event's snapshot, and only for the school's
// current subscription (MAINT 5.34).

const { prismaMock, requestHeaders, stripeNow, stored } = vi.hoisted(() => ({
  prismaMock: {
    iBSchool: { findUnique: vi.fn(), findFirst: vi.fn(), update: vi.fn() }
  },
  requestHeaders: { current: new Headers() },
  /** Each subscription's status at Stripe now, by ID. A missing ID is one Stripe does not have. */
  stripeNow: {} as Record<string, string>,
  /** The subscription ID stored on school-1. */
  stored: { id: null as string | null }
}))

// Next's marker module, which only resolves inside a Next build
vi.mock('server-only', () => ({}))
vi.mock('@/lib/prisma', () => ({ prisma: prismaMock }))
vi.mock('@/lib/logger', () => ({ logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() } }))
// The route reads the signature through `headers()`, which needs a request scope.
vi.mock('next/headers', () => ({ headers: vi.fn(async () => requestHeaders.current) }))

import { getCoordinatorAccess } from '@/lib/auth/access-control'
import { getStripe } from '@/lib/stripe/server'
import { POST } from './route'

const SECRET = 'whsec_test_secret'
const SELECT = { id: true, stripeSubscriptionId: true }

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

function retrieved() {
  return vi.mocked(getStripe().subscriptions.retrieve).mock.calls.map(([id]) => id)
}

function written() {
  expect(prismaMock.iBSchool.update).toHaveBeenCalledOnce()
  return prismaMock.iBSchool.update.mock.calls[0][0]
}

beforeEach(() => {
  vi.clearAllMocks()
  vi.stubEnv('NODE_ENV', 'production')
  vi.stubEnv('STRIPE_WEBHOOK_SECRET', SECRET)
  // For the SDK's local signing helpers; its one API call is replaced below.
  vi.stubEnv('STRIPE_SECRET_KEY', 'sk_test_not_a_real_key')
  for (const id of Object.keys(stripeNow)) delete stripeNow[id]
  stripeNow.sub_1 = 'active'
  stored.id = null
  vi.spyOn(getStripe().subscriptions, 'retrieve').mockImplementation((async (id: string) => {
    if (!(id in stripeNow)) {
      throw Object.assign(new Error(`No such subscription: '${id}'`), { code: 'resource_missing' })
    }
    return { id, status: stripeNow[id] }
  }) as never)
  prismaMock.iBSchool.findUnique.mockImplementation(async ({ where }) =>
    where.id === 'school-1' ? { id: 'school-1', stripeSubscriptionId: stored.id } : null
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
    expect(prismaMock.iBSchool.findUnique).toHaveBeenCalledWith({
      where: { id: 'school-1' },
      select: SELECT
    })
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

  it('writes the status Stripe gives the subscription, not ACTIVE regardless', async () => {
    stripeNow.sub_1 = 'incomplete'

    await deliver(checkoutCompleted())

    expect(written().data.subscriptionStatus).toBe('INACTIVE')
  })

  it('writes nothing, and still answers 200, when the session has no schoolId', async () => {
    const res = await deliver(checkoutCompleted({ metadata: {} }))

    // 200, so Stripe does not retry an event that can never succeed
    expect(res.status).toBe(200)
    expect(prismaMock.iBSchool.update).not.toHaveBeenCalled()
  })

  it('writes nothing, and still answers 200, when the schoolId matches no school', async () => {
    const res = await deliver(checkoutCompleted({ metadata: { schoolId: 'school-gone' } }))

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

describe('customer.subscription.created, .updated and .deleted — status', () => {
  // What Stripe says now decides, whatever the event's snapshot said; here the snapshot always
  // says "active". A failed renewal (past_due) keeps access while Stripe retries the card: the
  // owner's decision, 26 October 2026. A status Stripe adds later gives no access.
  const STATUSES: [string, 'ACTIVE' | 'INACTIVE' | 'CANCELLED'][] = [
    ['active', 'ACTIVE'],
    ['trialing', 'ACTIVE'],
    ['past_due', 'ACTIVE'],
    ['unpaid', 'INACTIVE'],
    ['canceled', 'CANCELLED'],
    ['incomplete', 'INACTIVE'],
    ['incomplete_expired', 'INACTIVE'],
    ['paused', 'INACTIVE'],
    ['a_status_stripe_adds_later', 'INACTIVE']
  ]

  describe.each([
    'customer.subscription.created',
    'customer.subscription.updated',
    'customer.subscription.deleted'
  ])('%s', (type) => {
    it.each(STATUSES)('Stripe now says %s → %s', async (stripeStatus, ourStatus) => {
      stripeNow.sub_1 = stripeStatus

      const res = await deliver(subscriptionEvent(type, { status: 'active' }))

      expect(res.status).toBe(200)
      expect(retrieved()).toEqual(['sub_1'])
      expect(written()).toEqual({
        where: { id: 'school-1' },
        data: { stripeSubscriptionId: 'sub_1', subscriptionStatus: ourStatus }
      })
      expect(
        getCoordinatorAccess({ subscriptionTier: 'REGULAR', subscriptionStatus: ourStatus })
          .hasFullAccess
      ).toBe(ourStatus === 'ACTIVE')
    })
  })
})

describe('an event that arrives late', () => {
  it('cannot give a cancelled school full access back', async () => {
    // An `updated` from while the subscription was active, retried after it was cancelled
    stored.id = 'sub_1'
    stripeNow.sub_1 = 'canceled'

    await deliver(subscriptionEvent('customer.subscription.updated', { status: 'active' }))

    expect(written().data.subscriptionStatus).toBe('CANCELLED')
  })

  it('cannot take access from a school that has since paid', async () => {
    stored.id = 'sub_1'
    stripeNow.sub_1 = 'active'

    await deliver(subscriptionEvent('customer.subscription.created', { status: 'incomplete' }))

    expect(written().data.subscriptionStatus).toBe('ACTIVE')
  })
})

describe("an event for a subscription that is not the school's current one", () => {
  // Two checkouts opened in two tabs make two subscriptions; the school keeps sub_2.
  beforeEach(() => {
    stored.id = 'sub_2'
    stripeNow.sub_2 = 'active'
  })

  it.each([
    ['its cancellation', 'customer.subscription.deleted', 'canceled'],
    ['an update', 'customer.subscription.updated', 'active']
  ])('is ignored while the current one is live: %s', async (_what, type, status) => {
    stripeNow.sub_1 = status

    const res = await deliver(subscriptionEvent(type, { status }))

    expect(res.status).toBe(200)
    expect(prismaMock.iBSchool.update).not.toHaveBeenCalled()
  })

  it('is ignored for a checkout completed late', async () => {
    const res = await deliver(checkoutCompleted())

    expect(res.status).toBe(200)
    expect(prismaMock.iBSchool.update).not.toHaveBeenCalled()
  })

  it.each([
    ['has ended', () => (stripeNow.sub_2 = 'canceled')],
    ['is unknown to Stripe', () => delete stripeNow.sub_2]
  ])('becomes current once the stored one %s', async (_why, change) => {
    // A school that cancelled and subscribed again, whose `created` beat the checkout
    change()

    await deliver(subscriptionEvent('customer.subscription.created'))

    expect(written().data).toEqual({ stripeSubscriptionId: 'sub_1', subscriptionStatus: 'ACTIVE' })
  })
})

// The school is found the same way for every subscription event: the subscription's metadata, then
// the subscription ID stored at checkout, then the customer ID. Only the ID and the stored
// subscription are read.
describe.each([
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted'
])('%s — finding the school', (type) => {
  it("uses the subscription's schoolId first", async () => {
    await deliver(subscriptionEvent(type))

    expect(prismaMock.iBSchool.findUnique).toHaveBeenCalledWith({
      where: { id: 'school-1' },
      select: SELECT
    })
    expect(prismaMock.iBSchool.findFirst).not.toHaveBeenCalled()
    expect(written().where).toEqual({ id: 'school-1' })
  })

  it('falls back to the stored subscription ID when the schoolId matches no school', async () => {
    prismaMock.iBSchool.findFirst.mockImplementation(async ({ where }) =>
      where.stripeSubscriptionId === 'sub_1'
        ? { id: 'school-2', stripeSubscriptionId: 'sub_1' }
        : null
    )

    await deliver(subscriptionEvent(type, { metadata: { schoolId: 'school-gone' } }))

    expect(written().where).toEqual({ id: 'school-2' })
  })

  it('falls back to the customer ID when there is no schoolId or stored subscription', async () => {
    prismaMock.iBSchool.findFirst.mockImplementation(async ({ where }) =>
      where.stripeCustomerId === 'cus_1' ? { id: 'school-3', stripeSubscriptionId: null } : null
    )

    await deliver(subscriptionEvent(type, { metadata: {} }))

    expect(prismaMock.iBSchool.findUnique).not.toHaveBeenCalled()
    expect(prismaMock.iBSchool.findFirst).toHaveBeenNthCalledWith(1, {
      where: { stripeSubscriptionId: 'sub_1' },
      select: SELECT
    })
    expect(prismaMock.iBSchool.findFirst).toHaveBeenNthCalledWith(2, {
      where: { stripeCustomerId: 'cus_1' },
      select: SELECT
    })
    expect(written().where).toEqual({ id: 'school-3' })
  })

  it('writes nothing, and still answers 200, when no school matches', async () => {
    const res = await deliver(subscriptionEvent(type, { metadata: {} }))

    expect(res.status).toBe(200)
    expect(prismaMock.iBSchool.update).not.toHaveBeenCalled()
  })
})

describe('events the webhook does not handle', () => {
  it('answers 200, and reads and writes nothing', async () => {
    const res = await deliver(event('invoice.paid', { id: 'in_1', object: 'invoice' }))

    expect(res.status).toBe(200)
    expect(retrieved()).toEqual([])
    expect(prismaMock.iBSchool.findUnique).not.toHaveBeenCalled()
    expect(prismaMock.iBSchool.findFirst).not.toHaveBeenCalled()
    expect(prismaMock.iBSchool.update).not.toHaveBeenCalled()
  })
})

describe('a subscription Stripe does not have', () => {
  it('writes nothing, and answers 200, as no retry can find it', async () => {
    delete stripeNow.sub_1

    const res = await deliver(subscriptionEvent('customer.subscription.updated'))

    expect(res.status).toBe(200)
    expect(prismaMock.iBSchool.update).not.toHaveBeenCalled()
  })
})

describe('a failure', () => {
  const EVENTS: [string, ReturnType<typeof event>][] = [
    ['checkout.session.completed', checkoutCompleted()],
    ['customer.subscription.created', subscriptionEvent('customer.subscription.created')],
    ['customer.subscription.updated', subscriptionEvent('customer.subscription.updated')],
    ['customer.subscription.deleted', subscriptionEvent('customer.subscription.deleted')]
  ]

  it.each(EVENTS)(
    'of the write answers 500 on %s, so Stripe delivers it again',
    async (_type, evt) => {
      prismaMock.iBSchool.update.mockRejectedValue(new Error('connection terminated'))

      const res = await deliver(evt)

      expect(res.status).toBe(500)
    }
  )

  it.each(EVENTS)('of Stripe answers 500 on %s, having written nothing', async (_type, evt) => {
    vi.mocked(getStripe().subscriptions.retrieve).mockRejectedValue(
      Object.assign(new Error('Connection to Stripe failed'), { code: undefined })
    )

    const res = await deliver(evt)

    expect(res.status).toBe(500)
    expect(prismaMock.iBSchool.update).not.toHaveBeenCalled()
  })
})
