/**
 * Stripe Server Client
 *
 * Server-side Stripe SDK initialization.
 * Use this for creating checkout sessions, managing subscriptions, etc.
 *
 * Note: This file should only be imported in server components/API routes.
 */

import Stripe from 'stripe'

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
      apiVersion: '2025-11-17.clover',
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
 * Get subscription status for a customer
 */
export async function getCustomerSubscriptionStatus(customerId: string): Promise<{
  hasActiveSubscription: boolean
  subscriptionId?: string
  status?: string
}> {
  const subscriptions = await getStripe().subscriptions.list({
    customer: customerId,
    status: 'active',
    limit: 1
  })

  if (subscriptions.data.length === 0) {
    return { hasActiveSubscription: false }
  }

  const subscription = subscriptions.data[0]
  return {
    hasActiveSubscription: true,
    subscriptionId: subscription.id,
    status: subscription.status
  }
}
