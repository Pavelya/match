/**
 * Admin API: Program by ID
 *
 * GET - Get single program with full details
 * PATCH - Update program
 * DELETE - Delete program
 *
 * Security: Requires PLATFORM_ADMIN role
 */

import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'
import { applyRateLimit } from '@/lib/rate-limit'
import { invalidateProgramsCache } from '@/lib/matching/program-cache'
import { invalidateProgramCache, clearAllMatchCache } from '@/lib/matching'
import { deleteProgramFromAlgolia, syncProgramToAlgolia } from '@/lib/algolia/sync'
import { parseEntryYear, requirementsStamp } from '@/lib/programs/entry-year'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const rateLimited = await applyRateLimit('api', session.user.id)
    if (rateLimited) return rateLimited

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    })

    if (user?.role !== 'PLATFORM_ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { id } = await params

    const program = await prisma.academicProgram.findUnique({
      where: { id },
      include: {
        university: { include: { country: true } },
        fieldOfStudy: true,
        courseRequirements: {
          include: { ibCourse: true },
          orderBy: { orGroupId: 'asc' }
        },
        _count: {
          select: { savedBy: true }
        }
      }
    })

    if (!program) {
      return NextResponse.json({ error: 'Program not found' }, { status: 404 })
    }

    return NextResponse.json(program)
  } catch (error) {
    logger.error('Error fetching program', { error })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const rateLimited = await applyRateLimit('api', session.user.id)
    if (rateLimited) return rateLimited

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    })

    if (user?.role !== 'PLATFORM_ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { id } = await params

    // Check program exists; its requirements decide whether this edit re-stamps them
    const existingProgram = await prisma.academicProgram.findUnique({
      where: { id },
      select: {
        universityId: true,
        minIBPoints: true,
        requirementsEntryYear: true,
        courseRequirements: {
          select: {
            ibCourseId: true,
            requiredLevel: true,
            minGrade: true,
            isCritical: true,
            orGroupId: true
          }
        }
      }
    })

    if (!existingProgram) {
      return NextResponse.json({ error: 'Program not found' }, { status: 404 })
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
      courseRequirements,
      requirementsEntryYear
    } = body

    // Build update object
    const updateData: Record<string, unknown> = {}

    let entryYear: number | null | undefined
    if (requirementsEntryYear !== undefined) {
      const parsed = parseEntryYear(requirementsEntryYear)
      if ('error' in parsed) {
        return NextResponse.json({ error: parsed.error }, { status: 400 })
      }
      entryYear = parsed.year
    }

    if (name !== undefined) {
      if (typeof name !== 'string' || name.trim().length === 0) {
        return NextResponse.json({ error: 'Invalid program name' }, { status: 400 })
      }
      // Check for duplicate at same university
      const duplicateName = await prisma.academicProgram.findFirst({
        where: {
          name: { equals: name.trim(), mode: 'insensitive' },
          universityId: universityId || existingProgram.universityId,
          id: { not: id }
        }
      })
      if (duplicateName) {
        return NextResponse.json(
          { error: 'A program with this name already exists at this university' },
          { status: 409 }
        )
      }
      updateData.name = name.trim()
    }

    if (description !== undefined) {
      if (typeof description !== 'string' || description.trim().length === 0) {
        return NextResponse.json({ error: 'Invalid description' }, { status: 400 })
      }
      updateData.description = description.trim()
    }

    if (universityId !== undefined) {
      const university = await prisma.university.findUnique({
        where: { id: universityId },
        select: { id: true }
      })
      if (!university) {
        return NextResponse.json({ error: 'Invalid university selected' }, { status: 400 })
      }
      updateData.universityId = universityId
    }

    if (fieldOfStudyId !== undefined) {
      const fieldOfStudy = await prisma.fieldOfStudy.findUnique({ where: { id: fieldOfStudyId } })
      if (!fieldOfStudy) {
        return NextResponse.json({ error: 'Invalid field of study selected' }, { status: 400 })
      }
      updateData.fieldOfStudyId = fieldOfStudyId
    }

    if (degreeType !== undefined) {
      if (typeof degreeType !== 'string' || degreeType.trim().length === 0) {
        return NextResponse.json({ error: 'Invalid degree type' }, { status: 400 })
      }
      updateData.degreeType = degreeType.trim()
    }

    if (duration !== undefined) {
      if (typeof duration !== 'string' || duration.trim().length === 0) {
        return NextResponse.json({ error: 'Invalid duration' }, { status: 400 })
      }
      updateData.duration = duration.trim()
    }

    if (minIBPoints !== undefined) {
      updateData.minIBPoints = minIBPoints ? parseInt(minIBPoints, 10) : null
    }

    if (programUrl !== undefined) {
      updateData.programUrl = programUrl?.trim() || null
    }

    // Date the requirements when they or the entry year change. The form sends every
    // field on each save, so a presence check would re-date them on any edit.
    const stamp = requirementsStamp(existingProgram, {
      minIBPoints:
        minIBPoints === undefined ? undefined : (updateData.minIBPoints as number | null),
      // null clears the requirements, as below
      courseRequirements: courseRequirements === undefined ? undefined : (courseRequirements ?? []),
      requirementsEntryYear: entryYear
    })
    if (stamp) Object.assign(updateData, stamp)

    // Handle course requirements update
    if (courseRequirements !== undefined) {
      // Delete existing requirements and create new ones
      await prisma.programCourseRequirement.deleteMany({
        where: { programId: id }
      })

      if (courseRequirements?.length) {
        await prisma.programCourseRequirement.createMany({
          data: courseRequirements.map(
            (req: {
              ibCourseId: string
              requiredLevel: string
              minGrade: number
              isCritical?: boolean
              orGroupId?: string
            }) => ({
              programId: id,
              ibCourseId: req.ibCourseId,
              requiredLevel: req.requiredLevel,
              minGrade: req.minGrade,
              isCritical: req.isCritical || false,
              orGroupId: req.orGroupId || null
            })
          )
        })
      }
    }

    // Returns the program's own fields only. The edit form reads nothing from a
    // successful response, and the old `include` sent back the whole university
    // row, logo and all.
    const program = await prisma.academicProgram.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        description: true,
        universityId: true,
        fieldOfStudyId: true,
        degreeType: true,
        duration: true,
        minIBPoints: true,
        programUrl: true,
        requirementsVerified: true,
        requirementsUpdatedAt: true,
        requirementsEntryYear: true,
        updatedAt: true
      }
    })

    logger.info('Program updated', {
      programId: program.id,
      updatedFields: Object.keys(updateData)
    })

    // Invalidate caches to reflect changes immediately
    await Promise.all([
      invalidateProgramsCache(),
      invalidateProgramCache(id),
      syncProgramToAlgolia(id)
    ])

    return NextResponse.json(program)
  } catch (error) {
    logger.error('Error updating program', { error })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const rateLimited = await applyRateLimit('api', session.user.id)
    if (rateLimited) return rateLimited

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    })

    if (user?.role !== 'PLATFORM_ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { id } = await params

    // Check program exists
    const program = await prisma.academicProgram.findUnique({
      where: { id }
    })

    if (!program) {
      return NextResponse.json({ error: 'Program not found' }, { status: 404 })
    }

    // Delete program (course requirements will cascade due to onDelete: Cascade)
    await prisma.academicProgram.delete({
      where: { id }
    })

    logger.info('Program deleted', {
      programId: id,
      programName: program.name
    })

    // Invalidate all caches - deleted programs must disappear from matches immediately
    await Promise.all([
      invalidateProgramsCache(),
      clearAllMatchCache(),
      deleteProgramFromAlgolia(id)
    ])

    // Invalidate countries-with-programs cache so locations without programs are hidden
    revalidateTag('countries-with-programs', { expire: 0 })

    return NextResponse.json({ success: true })
  } catch (error) {
    logger.error('Error deleting program', { error })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
