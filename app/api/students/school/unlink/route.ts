/**
 * Student School Unlink API
 *
 * POST /api/students/school/unlink
 *
 * Allows a student to unlink their account from their school.
 * This removes coordinator access to their data.
 *
 * Updates StudentProfile:
 * - schoolId: null
 * - linkedByInvitation: false
 * - coordinatorAccessConsentAt: null
 * - coordinatorAccessConsentVersion: null
 *
 * Part of Task 4.5: Student Account Linking & Unlinking
 */

import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'

export async function POST() {
  try {
    // 1. Validate session
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 2. Get student profile with school info for logging
    const studentProfile = await prisma.studentProfile.findUnique({
      where: { userId: session.user.id },
      include: {
        school: {
          select: { id: true, name: true }
        }
      }
    })

    if (!studentProfile) {
      return NextResponse.json({ error: 'Student profile not found' }, { status: 404 })
    }

    // 3. Check if student is linked to a school
    if (!studentProfile.schoolId) {
      return NextResponse.json(
        { error: 'Your account is not linked to any school' },
        { status: 400 }
      )
    }

    const schoolName = studentProfile.school?.name || 'Unknown School'
    const schoolId = studentProfile.schoolId

    // 4. Unlink the student from the school
    await prisma.studentProfile.update({
      where: { id: studentProfile.id },
      data: {
        schoolId: null,
        linkedByInvitation: false,
        coordinatorAccessConsentAt: null,
        coordinatorAccessConsentVersion: null
      }
    })

    // Invalidate the settings cache so the user sees updated data immediately
    revalidateTag(`user-settings-${session.user.id}`, { expire: 0 })

    // 5. Log the action for audit trail
    const redactedEmail = session.user.email?.replace(/(.{2}).*(@.*)/, '$1***$2') || 'unknown'
    logger.info('Student unlinked from school', {
      userId: session.user.id,
      email: redactedEmail,
      studentProfileId: studentProfile.id,
      previousSchoolId: schoolId,
      previousSchoolName: schoolName
    })

    return NextResponse.json({
      success: true,
      message: `Successfully unlinked from ${schoolName}`
    })
  } catch (error) {
    logger.error('Student school unlink error', {
      error: error instanceof Error ? error.message : 'Unknown error'
    })
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 })
  }
}
