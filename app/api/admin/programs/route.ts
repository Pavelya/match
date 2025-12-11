/**
 * Admin API: Programs
 *
 * GET - List all programs with relations
 * POST - Create a new program
 *
 * Security: Requires PLATFORM_ADMIN role
 */

import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    })

    if (user?.role !== 'PLATFORM_ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const programs = await prisma.academicProgram.findMany({
      orderBy: [{ university: { name: 'asc' } }, { name: 'asc' }],
      include: {
        university: {
          include: { country: true }
        },
        fieldOfStudy: true,
        courseRequirements: {
          include: { ibCourse: true }
        },
        _count: {
          select: {
            savedBy: true
          }
        }
      }
    })

    return NextResponse.json(programs)
  } catch (error) {
    logger.error('Error fetching programs', { error })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    })

    if (user?.role !== 'PLATFORM_ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const {
      name,
      description,
      universityId,
      fieldOfStudyId,
      degreeType,
      duration,
      minIBPoints,
      programUrl,
      courseRequirements
    } = body

    // Validate required fields
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json({ error: 'Program name is required' }, { status: 400 })
    }

    if (!description || typeof description !== 'string' || description.trim().length === 0) {
      return NextResponse.json({ error: 'Description is required' }, { status: 400 })
    }

    if (!universityId || typeof universityId !== 'string') {
      return NextResponse.json({ error: 'University is required' }, { status: 400 })
    }

    if (!fieldOfStudyId || typeof fieldOfStudyId !== 'string') {
      return NextResponse.json({ error: 'Field of study is required' }, { status: 400 })
    }

    if (!degreeType || typeof degreeType !== 'string' || degreeType.trim().length === 0) {
      return NextResponse.json({ error: 'Degree type is required' }, { status: 400 })
    }

    if (!duration || typeof duration !== 'string' || duration.trim().length === 0) {
      return NextResponse.json({ error: 'Duration is required' }, { status: 400 })
    }

    // Verify university exists
    const university = await prisma.university.findUnique({
      where: { id: universityId }
    })

    if (!university) {
      return NextResponse.json({ error: 'Invalid university selected' }, { status: 400 })
    }

    // Verify field of study exists
    const fieldOfStudy = await prisma.fieldOfStudy.findUnique({
      where: { id: fieldOfStudyId }
    })

    if (!fieldOfStudy) {
      return NextResponse.json({ error: 'Invalid field of study selected' }, { status: 400 })
    }

    // Check for duplicate program name at the same university
    const existingProgram = await prisma.academicProgram.findFirst({
      where: {
        name: { equals: name.trim(), mode: 'insensitive' },
        universityId
      }
    })

    if (existingProgram) {
      return NextResponse.json(
        { error: 'A program with this name already exists at this university' },
        { status: 409 }
      )
    }

    // Create the program with course requirements
    const program = await prisma.academicProgram.create({
      data: {
        name: name.trim(),
        description: description.trim(),
        universityId,
        fieldOfStudyId,
        degreeType: degreeType.trim(),
        duration: duration.trim(),
        minIBPoints: minIBPoints ? parseInt(minIBPoints, 10) : null,
        programUrl: programUrl?.trim() || null,
        courseRequirements: courseRequirements?.length
          ? {
              create: courseRequirements.map(
                (req: {
                  ibCourseId: string
                  requiredLevel: string
                  minGrade: number
                  isCritical?: boolean
                  orGroupId?: string
                }) => ({
                  ibCourseId: req.ibCourseId,
                  requiredLevel: req.requiredLevel,
                  minGrade: req.minGrade,
                  isCritical: req.isCritical || false,
                  orGroupId: req.orGroupId || null
                })
              )
            }
          : undefined
      },
      include: {
        university: { include: { country: true } },
        fieldOfStudy: true,
        courseRequirements: { include: { ibCourse: true } }
      }
    })

    logger.info('Program created', {
      programId: program.id,
      programName: program.name,
      universityId: program.universityId
    })

    return NextResponse.json(program, { status: 201 })
  } catch (error) {
    logger.error('Error creating program', { error })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
