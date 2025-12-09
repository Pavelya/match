/**
 * Consent API Route
 *
 * POST /api/students/consent
 *
 * Records user consent to terms of service and privacy policy.
 * Called when user first signs up or when policies are updated.
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { applyRateLimit } from '@/lib/rate-limit'
import { logger } from '@/lib/logger'

// Current policy versions - update these when policies change
export const CURRENT_TERMS_VERSION = '2025-12-09'
export const CURRENT_PRIVACY_VERSION = '2025-12-09'

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Apply rate limiting
    const rateLimitResponse = await applyRateLimit('profile', session.user.id)
    if (rateLimitResponse) {
      return rateLimitResponse
    }

    // Parse request body
    const body = await request.json()
    const { acceptTerms, acceptPrivacy } = body

    // Validate at least one consent is being recorded
    if (!acceptTerms && !acceptPrivacy) {
      return NextResponse.json(
        { error: 'Must accept at least terms or privacy policy' },
        { status: 400 }
      )
    }

    // Build update data
    const updateData: {
      termsAcceptedAt?: Date
      termsVersion?: string
      privacyAcceptedAt?: Date
      privacyPolicyVersion?: string
    } = {}

    if (acceptTerms) {
      updateData.termsAcceptedAt = new Date()
      updateData.termsVersion = CURRENT_TERMS_VERSION
    }

    if (acceptPrivacy) {
      updateData.privacyAcceptedAt = new Date()
      updateData.privacyPolicyVersion = CURRENT_PRIVACY_VERSION
    }

    // Update user consent
    await prisma.user.update({
      where: { id: session.user.id },
      data: updateData
    })

    return NextResponse.json({
      success: true,
      termsVersion: acceptTerms ? CURRENT_TERMS_VERSION : undefined,
      privacyVersion: acceptPrivacy ? CURRENT_PRIVACY_VERSION : undefined
    })
  } catch (error) {
    logger.error('Consent update error', { error })
    return NextResponse.json({ error: 'Failed to record consent' }, { status: 500 })
  }
}

/**
 * GET /api/students/consent
 *
 * Returns current consent status and whether re-consent is needed.
 */
export async function GET() {
  try {
    // Check authentication
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Fetch user consent status
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        termsAcceptedAt: true,
        termsVersion: true,
        privacyAcceptedAt: true,
        privacyPolicyVersion: true
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check if re-consent is needed (policy version changed)
    const needsTermsConsent = !user.termsVersion || user.termsVersion !== CURRENT_TERMS_VERSION
    const needsPrivacyConsent =
      !user.privacyPolicyVersion || user.privacyPolicyVersion !== CURRENT_PRIVACY_VERSION

    return NextResponse.json({
      termsAcceptedAt: user.termsAcceptedAt,
      termsVersion: user.termsVersion,
      privacyAcceptedAt: user.privacyAcceptedAt,
      privacyPolicyVersion: user.privacyPolicyVersion,
      currentTermsVersion: CURRENT_TERMS_VERSION,
      currentPrivacyVersion: CURRENT_PRIVACY_VERSION,
      needsTermsConsent,
      needsPrivacyConsent,
      needsConsent: needsTermsConsent || needsPrivacyConsent
    })
  } catch (error) {
    logger.error('Consent check error', { error })
    return NextResponse.json({ error: 'Failed to check consent' }, { status: 500 })
  }
}
