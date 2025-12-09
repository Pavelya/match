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

    // Delete in correct order to respect foreign key constraints
    // Prisma's cascade delete should handle most of this, but being explicit

    // 1. Delete student-related data first
    const studentProfile = await prisma.studentProfile.findUnique({
      where: { userId },
      select: { id: true }
    })

    if (studentProfile) {
      // Delete saved programs
      await prisma.savedProgram.deleteMany({
        where: { studentProfileId: studentProfile.id }
      })

      // Delete student courses
      await prisma.studentCourse.deleteMany({
        where: { studentProfileId: studentProfile.id }
      })

      // Delete student profile
      await prisma.studentProfile.delete({
        where: { id: studentProfile.id }
      })
    }

    // 2. Delete authentication-related data
    await prisma.session.deleteMany({
      where: { userId }
    })

    await prisma.account.deleteMany({
      where: { userId }
    })

    // 3. Delete verification tokens associated with user's email
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true }
    })

    if (user?.email) {
      await prisma.verificationToken.deleteMany({
        where: { identifier: user.email }
      })
    }

    // 4. Finally, delete the user
    await prisma.user.delete({
      where: { id: userId }
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
