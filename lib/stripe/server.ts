/**
 * Stripe Server Client
 *
 * Server-side Stripe SDK initialization.
 * Use this for creating checkout sessions, managing subscriptions, etc.
 *
 * Server only: `server-only` fails the build if a client file imports it, so the secret key can
 * never be bundled for the browser (SEC-8).
 */

import 'server-only'
import Stripe from 'stripe'
import { isLive } from './subscription-status'

let stripeClient: Stripe | null = null

/**
 * Get the Stripe client (singleton).
 *
 * Constructed on first use rather than at module load, so that importing
 * this file does not require STRIPE_SECRET_KEY. Stripe is optional in
 * lib/env.ts, and a module-load throw made it required for any build that
 * collects configuration for these routes.
 */
export function getStripe(): Stripe {
  if (!stripeClient) {
    const secretKey = process.env.STRIPE_SECRET_KEY
    if (!secretKey) {
      throw new Error('STRIPE_SECRET_KEY is not set in environment variables')
    }
    stripeClient = new Stripe(secretKey, {
      apiVersion: '2026-08-26.dahlia',
      typescript: true
    })
  }
  return stripeClient
}

/**
 * Stripe product ID for the school subscription
 */
export const STRIPE_PRODUCT_ID = process.env.STRIPE_PRODUCT_ID

/**
 * Get or create a Stripe customer for a school
 */
export async function getOrCreateStripeCustomer(school: {
  id: string
  name: string
  email?: string | null
  stripeCustomerId?: string | null
}): Promise<string> {
  // Return existing customer ID if available
  if (school.stripeCustomerId) {
    return school.stripeCustomerId
  }

  // Create a new Stripe customer
  const customer = await getStripe().customers.create({
    name: school.name,
    email: school.email || undefined,
    metadata: {
      schoolId: school.id
    }
  })

  return customer.id
}

/**
 * Create a Stripe Checkout session for subscription
 */
export async function createCheckoutSession({
  customerId,
  schoolId,
  priceId,
  successUrl,
  cancelUrl
}: {
  customerId: string
  schoolId: string
  priceId: string
  successUrl: string
  cancelUrl: string
}): Promise<string> {
  const session = await getStripe().checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    line_items: [
      {
        price: priceId,
        quantity: 1
      }
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      schoolId
    },
    subscription_data: {
      metadata: {
        schoolId
      }
    }
  })

  if (!session.url) {
    throw new Error('Failed to create checkout session URL')
  }

  return session.url
}

/**
 * Create a Stripe Customer Portal session
 */
export async function createPortalSession({
  customerId,
  returnUrl
}: {
  customerId: string
  returnUrl: string
}): Promise<string> {
  const session = await getStripe().billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl
  })

  return session.url
}

/**
 * A subscription's status at Stripe now, or null when Stripe has no such subscription.
 *
 * The webhook acts on this, never on the status in an event: Stripe does not deliver events in
 * order, and retries a failed one for up to three days (MAINT 5.34).
 */
export async function getSubscriptionStatus(subscriptionId: string): Promise<string | null> {
  try {
    const subscription = await getStripe().subscriptions.retrieve(subscriptionId)
    return subscription.status
  } catch (error) {
    if ((error as { code?: string }).code === 'resource_missing') return null
    throw error
  }
}

/**
 * Whether a customer already has a subscription that is, or may again be, billed. Checkout refuses
 * such a school, so it cannot end up paying for two (MAINT 5.34).
 */
export async function hasLiveSubscription(customerId: string): Promise<boolean> {
  const subscriptions = await getStripe().subscriptions.list({
    customer: customerId,
    status: 'all',
    limit: 10
  })
  return subscriptions.data.some((subscription) => isLive(subscription.status))
}
