/**
 * Create Portal Session API
 *
 * POST /api/subscriptions/create-portal
 *
 * Creates a Stripe Customer Portal session for subscription management.
 * Allows coordinators to manage their subscription, update payment methods, etc.
 */

import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { createPortalSession } from '@/lib/stripe/server'
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
            stripeCustomerId: true,
            subscriptionTier: true
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

    // VIP schools don't have a Stripe subscription
    if (school.subscriptionTier === 'VIP') {
      return NextResponse.json(
        { error: 'VIP schools do not have a managed subscription' },
        { status: 400 }
      )
    }

    // Check if school has a Stripe customer
    if (!school.stripeCustomerId) {
      return NextResponse.json({ error: 'No subscription found for this school' }, { status: 400 })
    }

    // Parse request body for return URL
    const body = await req.json().catch(() => ({}))
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const returnUrl = body.returnUrl || `${baseUrl}/coordinator/settings/subscription`

    // Create portal session
    const portalUrl = await createPortalSession({
      customerId: school.stripeCustomerId,
      returnUrl
    })

    logger.info('Portal session created', {
      schoolId: school.id,
      customerId: school.stripeCustomerId
    })

    return NextResponse.json({ url: portalUrl })
  } catch (error) {
    logger.error('Failed to create portal session', { error })
    return NextResponse.json({ error: 'Failed to create portal session' }, { status: 500 })
  }
}
