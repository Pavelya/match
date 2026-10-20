/**
 * Account Deletion API Route
 *
 * DELETE /api/students/account/delete
 *
 * GDPR Article 17 - Right to Erasure
 * Permanently deletes user account and all associated data.
 */

import { NextResponse, after } from 'next/server'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { applyRateLimit } from '@/lib/rate-limit'
import { logger } from '@/lib/logger'
import { deleteStudentAccount } from '@/lib/account/delete-student'
import { sendAccountDeletedEmail } from '@/lib/email/account-emails'
import { invalidateStudentCache } from '@/lib/matching/cache'

export async function DELETE() {
  try {
    // Check authentication
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id

    // Apply rate limiting (strict - only allow 3 attempts per hour)
    const rateLimitResponse = await applyRateLimit('profile', userId)
    if (rateLimitResponse) {
      return rateLimitResponse
    }

    logger.info('Account deletion initiated', { userId: userId.slice(0, 8) + '...' })

    // Everything in one transaction, so a failure deletes nothing and the student can try again
    // (rebranding 3.3: the dialog says "Nothing was deleted"). What it deletes: MAINT 5.25
    const deleted = await prisma.$transaction((tx) => deleteStudentAccount(tx, userId))

    logger.info('Account deletion completed', { userId: userId.slice(0, 8) + '...' })

    // Once it has committed, and without holding up the answer: "Account deleted" to the address
    // they signed in with (MAINT 5.24), and their cached matches (5.25). Neither can fail the
    // deletion; each logs its own failure
    after(async () => {
      await Promise.allSettled([
        sendAccountDeletedEmail({
          to: deleted.email,
          userName: deleted.name || undefined,
          deletedBy: 'student'
        }),
        invalidateStudentCache(userId)
      ])
    })

    return NextResponse.json({
      success: true,
      message: 'Your account has been permanently deleted.'
    })
  } catch (error) {
    logger.error('Account deletion error', { error })
    return NextResponse.json({ error: 'Failed to delete account' }, { status: 500 })
  }
}
