/**
 * Admin API: Copy Program
 *
 * POST - Create a duplicate of an existing program with all course requirements
 *
 * The copy gets:
 * - Name: "COPY_<original>" (with counter suffix if duplicate exists)
 * - All course requirements duplicated (OR-groups get new UUIDs)
 * - requirementsVerified reset to false
 * - selectivityTier and requirementsUpdatedAt reset to null
 *
 * Algolia sync happens automatically via the Prisma extension.
 *
 * Security: Requires PLATFORM_ADMIN role
 */

import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'
import { randomUUID } from 'crypto'

interface RouteParams {
  params: Promise<{ id: string }>
}

/**
 * Generate a unique copy name that doesn't conflict with existing programs
 * at the same university.
 *
 * Pattern: COPY_<name>, COPY_2_<name>, COPY_3_<name>, ...
 */
async function generateCopyName(originalName: string, universityId: string): Promise<string> {
  const baseName = `COPY_${originalName}`

  // Check if the base name is available
  const existing = await prisma.academicProgram.findFirst({
    where: {
      name: { equals: baseName, mode: 'insensitive' },
      universityId
    }
  })

  if (!existing) {
    return baseName
  }

  // Try incrementing counters
  for (let i = 2; i <= 100; i++) {
    const candidateName = `COPY_${i}_${originalName}`
    const conflict = await prisma.academicProgram.findFirst({
      where: {
        name: { equals: candidateName, mode: 'insensitive' },
        universityId
      }
    })
    if (!conflict) {
      return candidateName
    }
  }

  // Fallback — should never reach this
  return `COPY_${Date.now()}_${originalName}`
}

export async function POST(request: Request, { params }: RouteParams) {
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

    const { id } = await params

    // Fetch original program with all course requirements
    const original = await prisma.academicProgram.findUnique({
      where: { id },
      include: {
        courseRequirements: true
      }
    })

    if (!original) {
      return NextResponse.json({ error: 'Program not found' }, { status: 404 })
    }

    // Generate a non-conflicting name
    const copyName = await generateCopyName(original.name, original.universityId)

    // Build a mapping from old orGroupIds to new ones so group membership is preserved
    const orGroupMapping = new Map<string, string>()
    for (const req of original.courseRequirements) {
      if (req.orGroupId && !orGroupMapping.has(req.orGroupId)) {
        orGroupMapping.set(req.orGroupId, randomUUID())
      }
    }

    // Create the copy with all course requirements
    const copy = await prisma.academicProgram.create({
      data: {
        name: copyName,
        description: original.description,
        universityId: original.universityId,
        fieldOfStudyId: original.fieldOfStudyId,
        degreeType: original.degreeType,
        duration: original.duration,
        minIBPoints: original.minIBPoints,
        programUrl: original.programUrl,
        // Reset verification fields — admin must re-verify the copy
        selectivityTier: null,
        requirementsVerified: false,
        requirementsUpdatedAt: null,
        courseRequirements: original.courseRequirements.length
          ? {
              create: original.courseRequirements.map((req) => ({
                ibCourseId: req.ibCourseId,
                requiredLevel: req.requiredLevel,
                minGrade: req.minGrade,
                isCritical: req.isCritical,
                orGroupId: req.orGroupId ? orGroupMapping.get(req.orGroupId)! : null
              }))
            }
          : undefined
      }
    })

    logger.info('Program copied', {
      originalId: id,
      originalName: original.name,
      copyId: copy.id,
      copyName: copy.name
    })

    // Invalidate countries-with-programs cache so new locations appear in student onboarding
    revalidateTag('countries-with-programs', { expire: 0 })

    return NextResponse.json({ id: copy.id, name: copy.name }, { status: 201 })
  } catch (error) {
    logger.error('Error copying program', { error })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
