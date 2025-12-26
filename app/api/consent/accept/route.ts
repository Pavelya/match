/**
 * API: Accept Consent
 *
 * POST - Record user's acceptance of current terms and privacy policy versions
 *
 * Protected endpoint - requires authentication
 */

import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { recordAllConsents } from '@/lib/legal-documents'
import { logger } from '@/lib/logger'

export async function POST() {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Record consent to all required documents
    await recordAllConsents(session.user.id)

    logger.info('User accepted updated policies', {
      userId: session.user.id
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    logger.error('Failed to record consent', {
      error: error instanceof Error ? error.message : 'Unknown error'
    })
    return NextResponse.json({ error: 'Failed to record consent' }, { status: 500 })
  }
}
