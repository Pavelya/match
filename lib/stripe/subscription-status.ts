/**
 * What a Stripe subscription status means for a school (MAINT 5.34).
 *
 * Pure, so the webhook and checkout share one answer, and lib/auth/access-control.ts stays the
 * only place that turns a school's status into access.
 */

import type { SubscriptionStatus } from '@/app/generated/prisma/enums'

/**
 * Statuses a school keeps full access through. `past_due` is in on purpose: a failed renewal
 * keeps access while Stripe retries the card, until Stripe gives up and the subscription becomes
 * `unpaid` or `canceled` (decided by the owner, 26 October 2026). That relies on Stripe's
 * failed-payment action being "cancel" or "mark unpaid", never "leave past-due": the owner
 * confirmed it is "cancel the subscription" the same day. Change that setting, change this.
 */
const PAID = new Set(['active', 'trialing', 'past_due'])

/** Statuses of a subscription the customer is, or may again be, billed for. */
const LIVE = new Set(['active', 'trialing', 'past_due', 'unpaid', 'paused'])

/** The school's status for a Stripe status. Any status Stripe adds later gives no access. */
export function schoolStatusFor(stripeStatus: string): SubscriptionStatus {
  if (PAID.has(stripeStatus)) return 'ACTIVE'
  if (stripeStatus === 'canceled') return 'CANCELLED'
  return 'INACTIVE'
}

/** Whether a subscription in this status still exists to be billed. */
export function isLive(stripeStatus: string): boolean {
  return LIVE.has(stripeStatus)
}
