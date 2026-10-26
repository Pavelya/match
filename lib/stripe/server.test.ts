import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// The two Stripe reads behind MAINT 5.34. Checkout refuses a customer with a live subscription, so
// a school cannot pay twice; the webhook reads a subscription's status now, and treats one Stripe
// does not have as gone rather than failing forever.

import { getStripe, getSubscriptionStatus, hasLiveSubscription } from './server'

beforeEach(() => {
  vi.stubEnv('STRIPE_SECRET_KEY', 'sk_test_not_a_real_key')
})

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllEnvs()
})

function customerHas(...statuses: string[]) {
  return vi
    .spyOn(getStripe().subscriptions, 'list')
    .mockResolvedValue({ data: statuses.map((status) => ({ status })) } as never)
}

describe('hasLiveSubscription', () => {
  it.each(['active', 'trialing', 'past_due', 'unpaid', 'paused'])(
    'is true with a %s subscription',
    async (status) => {
      customerHas('canceled', status)

      expect(await hasLiveSubscription('cus_1')).toBe(true)
    }
  )

  it('is false when every subscription has ended or never started', async () => {
    customerHas('canceled', 'incomplete_expired', 'incomplete')

    expect(await hasLiveSubscription('cus_1')).toBe(false)
  })

  it('asks for every status, not only the uncancelled ones Stripe lists by default', async () => {
    const list = customerHas()

    await hasLiveSubscription('cus_1')

    expect(list).toHaveBeenCalledWith({ customer: 'cus_1', status: 'all', limit: 10 })
  })
})

describe('getSubscriptionStatus', () => {
  it("returns the subscription's status now", async () => {
    vi.spyOn(getStripe().subscriptions, 'retrieve').mockResolvedValue({
      status: 'past_due'
    } as never)

    expect(await getSubscriptionStatus('sub_1')).toBe('past_due')
  })

  it('returns null for a subscription Stripe does not have', async () => {
    vi.spyOn(getStripe().subscriptions, 'retrieve').mockRejectedValue(
      Object.assign(new Error("No such subscription: 'sub_1'"), { code: 'resource_missing' })
    )

    expect(await getSubscriptionStatus('sub_1')).toBeNull()
  })

  it('throws any other failure, so the webhook answers 500 and Stripe retries', async () => {
    vi.spyOn(getStripe().subscriptions, 'retrieve').mockRejectedValue(new Error('rate_limit'))

    await expect(getSubscriptionStatus('sub_1')).rejects.toThrow('rate_limit')
  })
})
