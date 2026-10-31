/**
 * Stripe Webhook Handler
 *
 * POST /api/webhooks/stripe
 *
 * Handles Stripe webhook events for subscription lifecycle:
 * - checkout.session.completed → the school takes this subscription
 * - customer.subscription.created / .updated / .deleted → the school's status follows it
 *
 * Stripe does not deliver events in order, and retries a failed one for up to three days. So every
 * event is only a prompt: the route asks Stripe what the subscription is now and writes that,
 * never the event's own status, and only for the school's current subscription (MAINT 5.34).
 */

import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { getStripe, getSubscriptionStatus } from '@/lib/stripe/server'
import { schoolStatusFor, isLive } from '@/lib/stripe/subscription-status'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'
import type Stripe from 'stripe'

/**
 * Disable body parsing - Stripe needs the raw body for signature verification
 */
export const runtime = 'nodejs'

export async function POST(req: Request) {
  const body = await req.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  const isProduction = process.env.NODE_ENV === 'production'

  // SECURITY: In production, webhook signature verification is REQUIRED
  // This prevents spoofed webhook events from manipulating subscription data
  if (isProduction && !webhookSecret) {
    logger.error('STRIPE_WEBHOOK_SECRET is required in production')
    return NextResponse.json({ error: 'Webhook configuration error' }, { status: 500 })
  }

  if (isProduction && !signature) {
    logger.error('Missing stripe-signature header in production')
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    if (webhookSecret && signature) {
      // Verify webhook signature (always in production, optionally in development)
      event = getStripe().webhooks.constructEvent(body, signature, webhookSecret)
    } else if (!isProduction) {
      // Development mode only - allow bypassing signature verification
      // This is acceptable for local testing with Stripe CLI
      event = JSON.parse(body) as Stripe.Event
      logger.warn('Stripe webhook signature not verified - development mode only')
    } else {
      // This should never be reached due to checks above, but fail safely
      logger.error('Webhook verification failed - unexpected state')
      return NextResponse.json({ error: 'Verification failed' }, { status: 400 })
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    logger.error('Stripe webhook signature verification failed', { error: errorMessage })
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${errorMessage}` },
      { status: 400 }
    )
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        await handleCheckoutCompleted(session)
        break
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionEvent(subscription)
        break
      }

      default:
        logger.info('Unhandled Stripe webhook event', { type: event.type })
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    logger.error('Stripe webhook handler error', { error, eventType: event.type })
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}

/** The school's ID and current subscription: all any handler needs from the row. */
const SCHOOL_SELECT = { id: true, stripeSubscriptionId: true } as const

type School = { id: string; stripeSubscriptionId: string | null }

/**
 * Handle successful checkout session completion
 */
async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const schoolId = session.metadata?.schoolId
  const customerId = session.customer as string
  const subscriptionId = session.subscription as string | null

  if (!schoolId || !subscriptionId) {
    logger.error('Checkout session missing schoolId metadata or subscription', {
      sessionId: session.id
    })
    return
  }

  const school = await prisma.iBSchool.findUnique({
    where: { id: schoolId },
    select: SCHOOL_SELECT
  })

  if (!school) {
    logger.error('Checkout completed for a school that does not exist', { schoolId })
    return
  }

  logger.info('Checkout completed', { schoolId, customerId, subscriptionId })

  await applySubscription(school, subscriptionId, { stripeCustomerId: customerId })
}

/**
 * Handle a subscription being created, changed or deleted
 */
async function handleSubscriptionEvent(subscription: Stripe.Subscription) {
  const schoolId = subscription.metadata?.schoolId
  const customerId = subscription.customer as string

  // Try to find school by schoolId, then subscription ID, then customer ID
  let school: School | null = schoolId
    ? await prisma.iBSchool.findUnique({ where: { id: schoolId }, select: SCHOOL_SELECT })
    : null

  if (!school) {
    school = await prisma.iBSchool.findFirst({
      where: { stripeSubscriptionId: subscription.id },
      select: SCHOOL_SELECT
    })
  }

  if (!school) {
    school = await prisma.iBSchool.findFirst({
      where: { stripeCustomerId: customerId },
      select: SCHOOL_SELECT
    })
  }

  if (!school) {
    logger.error('Could not find school for subscription event', {
      subscriptionId: subscription.id,
      customerId
    })
    return
  }

  await applySubscription(school, subscription.id)
}

/**
 * Make this subscription the school's, with the status Stripe gives it now.
 *
 * A school that stores a different subscription keeps it while that one is still live: the event
 * is about an old subscription, or a second one opened in another tab. Once the stored one has
 * ended, or Stripe no longer has it, this one takes its place — a school that cancelled and
 * subscribed again, whose `created` arrived before its checkout.
 */
async function applySubscription(
  school: School,
  subscriptionId: string,
  extra: { stripeCustomerId?: string } = {}
) {
  const storedId = school.stripeSubscriptionId

  if (storedId && storedId !== subscriptionId) {
    const storedStatus = await getSubscriptionStatus(storedId)
    if (storedStatus && isLive(storedStatus)) {
      logger.info("Ignored an event for a subscription that is not the school's current one", {
        schoolId: school.id,
        subscriptionId,
        currentSubscriptionId: storedId
      })
      return
    }
  }

  const stripeStatus = await getSubscriptionStatus(subscriptionId)

  if (!stripeStatus) {
    // No retry can find it either, so answer 200
    logger.error('Stripe has no such subscription', { schoolId: school.id, subscriptionId })
    return
  }

  const subscriptionStatus = schoolStatusFor(stripeStatus)

  await prisma.iBSchool.update({
    where: { id: school.id },
    data: { ...extra, stripeSubscriptionId: subscriptionId, subscriptionStatus }
  })

  logger.info('School subscription updated', {
    schoolId: school.id,
    stripeStatus,
    ourStatus: subscriptionStatus
  })
}
