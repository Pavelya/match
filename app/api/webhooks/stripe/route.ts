/**
 * Stripe Webhook Handler
 *
 * POST /api/webhooks/stripe
 *
 * Handles Stripe webhook events for subscription lifecycle:
 * - checkout.session.completed → Activate subscription
 * - customer.subscription.deleted → Deactivate subscription
 * - customer.subscription.updated → Handle upgrades/downgrades
 */

import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe/server'
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

  // In development without webhook secret, skip signature verification
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  let event: Stripe.Event

  try {
    if (webhookSecret && signature) {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } else {
      // Development mode - parse the event directly
      // WARNING: This is insecure and should only be used in development
      event = JSON.parse(body) as Stripe.Event
      logger.warn('Stripe webhook signature not verified - development mode only')
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
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionUpdate(subscription)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionDeleted(subscription)
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

/**
 * Handle successful checkout session completion
 */
async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const schoolId = session.metadata?.schoolId
  const customerId = session.customer as string
  const subscriptionId = session.subscription as string

  if (!schoolId) {
    logger.error('Checkout session missing schoolId metadata', { sessionId: session.id })
    return
  }

  logger.info('Checkout completed', { schoolId, customerId, subscriptionId })

  // Update school with subscription info
  await prisma.iBSchool.update({
    where: { id: schoolId },
    data: {
      stripeCustomerId: customerId,
      stripeSubscriptionId: subscriptionId,
      subscriptionStatus: 'ACTIVE'
    }
  })

  logger.info('School subscription activated', { schoolId })
}

/**
 * Handle subscription updates (status changes, upgrades, etc.)
 */
async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  const schoolId = subscription.metadata?.schoolId
  const customerId = subscription.customer as string

  // Try to find school by subscription ID or customer ID
  let school = schoolId ? await prisma.iBSchool.findUnique({ where: { id: schoolId } }) : null

  if (!school) {
    school = await prisma.iBSchool.findFirst({
      where: { stripeSubscriptionId: subscription.id }
    })
  }

  if (!school) {
    school = await prisma.iBSchool.findFirst({
      where: { stripeCustomerId: customerId }
    })
  }

  if (!school) {
    logger.error('Could not find school for subscription update', {
      subscriptionId: subscription.id,
      customerId
    })
    return
  }

  // Map Stripe subscription status to our status
  const isActive = subscription.status === 'active' || subscription.status === 'trialing'

  await prisma.iBSchool.update({
    where: { id: school.id },
    data: {
      stripeSubscriptionId: subscription.id,
      subscriptionStatus: isActive ? 'ACTIVE' : 'INACTIVE'
    }
  })

  logger.info('School subscription updated', {
    schoolId: school.id,
    stripeStatus: subscription.status,
    ourStatus: isActive ? 'ACTIVE' : 'INACTIVE'
  })
}

/**
 * Handle subscription cancellation/deletion
 */
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const schoolId = subscription.metadata?.schoolId
  const customerId = subscription.customer as string

  // Try to find school
  let school = schoolId ? await prisma.iBSchool.findUnique({ where: { id: schoolId } }) : null

  if (!school) {
    school = await prisma.iBSchool.findFirst({
      where: { stripeSubscriptionId: subscription.id }
    })
  }

  if (!school) {
    school = await prisma.iBSchool.findFirst({
      where: { stripeCustomerId: customerId }
    })
  }

  if (!school) {
    logger.error('Could not find school for subscription deletion', {
      subscriptionId: subscription.id,
      customerId
    })
    return
  }

  // Update school status to cancelled
  await prisma.iBSchool.update({
    where: { id: school.id },
    data: {
      subscriptionStatus: 'CANCELLED'
    }
  })

  logger.info('School subscription cancelled', { schoolId: school.id })
}
