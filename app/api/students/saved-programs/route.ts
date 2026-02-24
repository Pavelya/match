/**
 * Saved Programs API Route
 *
 * GET /api/students/saved-programs - Get all saved programs for the current student
 * POST /api/students/saved-programs - Save a program
 *
 * Requirements:
 * - User must be logged in as a student
 * - Returns program data in the same format as search results
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'

export async function GET() {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get student profile
    const studentProfile = await prisma.studentProfile.findUnique({
      where: { userId: session.user.id }
    })

    if (!studentProfile) {
      return NextResponse.json(
        { error: 'Student profile not found', code: 'PROFILE_NOT_FOUND' },
        { status: 404 }
      )
    }

    // Fetch saved programs with all necessary relations for ProgramCard display
    const savedPrograms = await prisma.savedProgram.findMany({
      where: { studentProfileId: studentProfile.id },
      orderBy: { createdAt: 'desc' },
      include: {
        program: {
          include: {
            university: {
              include: {
                country: true
              }
            },
            fieldOfStudy: true,
            courseRequirements: {
              include: {
                ibCourse: true
              }
            }
          }
        }
      }
    })

    // Transform saved programs to the format expected by the client
    const programs = savedPrograms.map((sp) => ({
      id: sp.program.id,
      name: sp.program.name,
      university: {
        name: sp.program.university.name,
        abbreviation: sp.program.university.abbreviatedName,
        image: sp.program.university.image
      },
      country: {
        id: sp.program.university.country.id,
        name: sp.program.university.country.name,
        code: sp.program.university.country.code,
        flagEmoji: sp.program.university.country.flagEmoji
      },
      fieldOfStudy: {
        id: sp.program.fieldOfStudy.id,
        name: sp.program.fieldOfStudy.name,
        iconName: sp.program.fieldOfStudy.iconName,
        description: sp.program.fieldOfStudy.description
      },
      degreeType: sp.program.degreeType,
      duration: sp.program.duration,
      minIBPoints: sp.program.minIBPoints,
      city: sp.program.university.city,
      courseRequirements: sp.program.courseRequirements.map((cr) => ({
        id: cr.id,
        ibCourse: {
          id: cr.ibCourse.id,
          name: cr.ibCourse.name,
          code: cr.ibCourse.code,
          group: cr.ibCourse.group
        },
        requiredLevel: cr.requiredLevel,
        minGrade: cr.minGrade,
        isCritical: cr.isCritical,
        orGroupId: cr.orGroupId
      })),
      savedAt: sp.createdAt
    }))

    logger.info('Fetched saved programs', {
      userId: session.user.id,
      count: programs.length
    })

    return NextResponse.json({
      programs,
      total: programs.length
    })
  } catch (error) {
    logger.error('Failed to fetch saved programs', { error })
    return NextResponse.json({ error: 'Failed to fetch saved programs' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { programId } = body

    if (!programId || typeof programId !== 'string') {
      return NextResponse.json({ error: 'Program ID is required' }, { status: 400 })
    }

    // Get student profile
    const studentProfile = await prisma.studentProfile.findUnique({
      where: { userId: session.user.id }
    })

    if (!studentProfile) {
      return NextResponse.json(
        { error: 'Student profile not found', code: 'PROFILE_NOT_FOUND' },
        { status: 404 }
      )
    }

    // Check if program exists
    const program = await prisma.academicProgram.findUnique({
      where: { id: programId }
    })

    if (!program) {
      return NextResponse.json({ error: 'Program not found' }, { status: 404 })
    }

    // Check if already saved
    const existingSave = await prisma.savedProgram.findUnique({
      where: {
        studentProfileId_programId: {
          studentProfileId: studentProfile.id,
          programId
        }
      }
    })

    if (existingSave) {
      return NextResponse.json({ message: 'Program already saved', id: existingSave.id })
    }

    // Save the program
    const savedProgram = await prisma.savedProgram.create({
      data: {
        studentProfileId: studentProfile.id,
        programId
      }
    })

    logger.info('Program saved', {
      userId: session.user.id,
      programId,
      savedProgramId: savedProgram.id
    })

    return NextResponse.json({
      message: 'Program saved successfully',
      id: savedProgram.id
    })
  } catch (error) {
    logger.error('Failed to save program', { error })
    return NextResponse.json({ error: 'Failed to save program' }, { status: 500 })
  }
}
