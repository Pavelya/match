/**
 * Create Checkout Session API
 *
 * POST /api/subscriptions/create-checkout
 *
 * Creates a Stripe Checkout session for a coordinator to subscribe their school.
 * Only available for REGULAR tier schools without active subscriptions.
 */

import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { stripe, getOrCreateStripeCustomer, createCheckoutSession } from '@/lib/stripe/server'
import { logger } from '@/lib/logger'

export async function POST(req: Request) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get the coordinator and their school
    const coordinator = await prisma.coordinatorProfile.findFirst({
      where: { userId: session.user.id },
      include: {
        school: {
          select: {
            id: true,
            name: true,
            email: true,
            subscriptionTier: true,
            subscriptionStatus: true,
            stripeCustomerId: true
          }
        }
      }
    })

    if (!coordinator?.school) {
      return NextResponse.json(
        { error: 'Coordinator profile not found or not linked to a school' },
        { status: 404 }
      )
    }

    const school = coordinator.school

    // VIP schools don't need to subscribe
    if (school.subscriptionTier === 'VIP') {
      return NextResponse.json({ error: 'VIP schools already have full access' }, { status: 400 })
    }

    // Check if school already has active subscription
    if (school.subscriptionStatus === 'ACTIVE') {
      return NextResponse.json(
        { error: 'School already has an active subscription' },
        { status: 400 }
      )
    }

    // Check if Stripe is configured
    if (!process.env.STRIPE_PRODUCT_ID) {
      logger.error('STRIPE_PRODUCT_ID is not configured')
      return NextResponse.json(
        { error: 'Stripe is not configured. Please contact support.' },
        { status: 500 }
      )
    }

    // Get price ID from Stripe product
    // First, list prices for the product
    const prices = await stripe.prices.list({
      product: process.env.STRIPE_PRODUCT_ID,
      active: true,
      type: 'recurring',
      limit: 1
    })

    if (prices.data.length === 0) {
      logger.error('No active prices found for Stripe product', {
        productId: process.env.STRIPE_PRODUCT_ID
      })
      return NextResponse.json(
        { error: 'No subscription price configured. Please contact support.' },
        { status: 500 }
      )
    }

    const priceId = prices.data[0].id

    // Get or create Stripe customer
    const customerId = await getOrCreateStripeCustomer({
      id: school.id,
      name: school.name,
      email: school.email,
      stripeCustomerId: school.stripeCustomerId
    })

    // Update school with Stripe customer ID if new
    if (!school.stripeCustomerId) {
      await prisma.iBSchool.update({
        where: { id: school.id },
        data: { stripeCustomerId: customerId }
      })
    }

    // Parse request body for URLs
    const body = await req.json().catch(() => ({}))
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const successUrl =
      body.successUrl || `${baseUrl}/coordinator/settings/subscription?success=true`
    const cancelUrl = body.cancelUrl || `${baseUrl}/coordinator/settings/subscription?canceled=true`

    // Create checkout session
    const checkoutUrl = await createCheckoutSession({
      customerId,
      schoolId: school.id,
      priceId,
      successUrl,
      cancelUrl
    })

    logger.info('Checkout session created', {
      schoolId: school.id,
      customerId
    })

    return NextResponse.json({ url: checkoutUrl })
  } catch (error) {
    logger.error('Failed to create checkout session', { error })
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
