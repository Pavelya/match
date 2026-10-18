/**
 * Account Deletion API Route
 *
 * DELETE /api/students/account/delete
 *
 * GDPR Article 17 - Right to Erasure
 * Permanently deletes user account and all associated data.
 */

import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { applyRateLimit } from '@/lib/rate-limit'
import { logger } from '@/lib/logger'

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
    // (rebranding 3.3: the dialog says "Nothing was deleted"). In order, for the foreign keys;
    // Prisma's cascades would cover most of it, but being explicit
    await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { id: userId },
        select: { email: true, studentProfile: { select: { id: true } } }
      })
      const profileId = user?.studentProfile?.id

      // 1. The student's data: saved programs, courses, then the profile
      if (profileId) {
        await tx.savedProgram.deleteMany({ where: { studentProfileId: profileId } })
        await tx.studentCourse.deleteMany({ where: { studentProfileId: profileId } })
        await tx.studentProfile.delete({ where: { id: profileId } })
      }

      // 2. How they sign in
      await tx.session.deleteMany({ where: { userId } })
      await tx.account.deleteMany({ where: { userId } })

      // 3. Sign-in links sent to their email
      if (user?.email) {
        await tx.verificationToken.deleteMany({ where: { identifier: user.email } })
      }

      // 4. Finally, the user
      await tx.user.delete({ where: { id: userId } })
    })

    logger.info('Account deletion completed', { userId: userId.slice(0, 8) + '...' })

    return NextResponse.json({
      success: true,
      message: 'Your account has been permanently deleted.'
    })
  } catch (error) {
    logger.error('Account deletion error', { error })
    return NextResponse.json({ error: 'Failed to delete account' }, { status: 500 })
  }
}
