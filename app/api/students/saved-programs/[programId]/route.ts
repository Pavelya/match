/**
 * Saved Program Delete API Route
 *
 * DELETE /api/students/saved-programs/[programId] - Remove a program from saved list
 *
 * Requirements:
 * - User must be logged in as a student
 * - Only the owner can delete their saved programs
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ programId: string }> }
) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { programId } = await params

    if (!programId) {
      return NextResponse.json({ error: 'Program ID is required' }, { status: 400 })
    }

    // Get student profile
    const studentProfile = await prisma.studentProfile.findUnique({
      where: { userId: session.user.id }
    })

    if (!studentProfile) {
      return NextResponse.json({ error: 'Student profile not found' }, { status: 404 })
    }

    // Find and delete the saved program
    const savedProgram = await prisma.savedProgram.findUnique({
      where: {
        studentProfileId_programId: {
          studentProfileId: studentProfile.id,
          programId
        }
      }
    })

    if (!savedProgram) {
      return NextResponse.json({ error: 'Saved program not found' }, { status: 404 })
    }

    await prisma.savedProgram.delete({
      where: { id: savedProgram.id }
    })

    logger.info('Program unsaved', {
      userId: session.user.id,
      programId,
      savedProgramId: savedProgram.id
    })

    return NextResponse.json({ message: 'Program removed from saved list' })
  } catch (error) {
    logger.error('Failed to unsave program', { error })
    return NextResponse.json({ error: 'Failed to unsave program' }, { status: 500 })
  }
}
