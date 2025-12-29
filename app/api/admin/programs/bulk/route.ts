/**
 * Admin API: Bulk Program Upload
 *
 * POST - Create multiple programs in a single request
 *
 * Security: Requires PLATFORM_ADMIN role
 *
 * Features:
 * - Batch processing with Prisma transactions
 * - Duplicate detection per university
 * - Algolia batch sync after creation
 * - Detailed success/failure reporting
 */

import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'
import { syncProgramsBatch } from '@/lib/algolia/sync'
import type { ParsedRequirement } from '@/lib/bulk-upload'

// =============================================================================
// TYPES
// =============================================================================

interface BulkProgramInput {
  name: string
  description: string
  fieldOfStudyId: string
  degreeType: string
  duration: string
  minIBPoints?: number | null
  programUrl?: string | null
  courseRequirements?: ParsedRequirement[]
}

interface BulkUploadRequest {
  universityId: string
  programs: BulkProgramInput[]
}

interface ProgramResult {
  name: string
  status: 'created' | 'error' | 'duplicate'
  programId?: string
  error?: string
}

interface BulkUploadResponse {
  success: number
  failed: number
  duplicates: number
  results: ProgramResult[]
  algoliaSync: {
    success: number
    failed: number
  }
}

// =============================================================================
// CONSTANTS
// =============================================================================

const MAX_PROGRAMS_PER_REQUEST = 500
const BATCH_SIZE = 10 // Programs per transaction batch

// =============================================================================
// ROUTE HANDLER
// =============================================================================

export async function POST(request: Request) {
  try {
    // =========================================================================
    // AUTHENTICATION & AUTHORIZATION
    // =========================================================================

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

    // =========================================================================
    // REQUEST VALIDATION
    // =========================================================================

    const body = (await request.json()) as BulkUploadRequest
    const { universityId, programs } = body

    if (!universityId || typeof universityId !== 'string') {
      return NextResponse.json({ error: 'University ID is required' }, { status: 400 })
    }

    if (!Array.isArray(programs) || programs.length === 0) {
      return NextResponse.json(
        { error: 'Programs array is required and cannot be empty' },
        { status: 400 }
      )
    }

    if (programs.length > MAX_PROGRAMS_PER_REQUEST) {
      return NextResponse.json(
        { error: `Maximum ${MAX_PROGRAMS_PER_REQUEST} programs per request` },
        { status: 400 }
      )
    }

    // Verify university exists
    const university = await prisma.university.findUnique({
      where: { id: universityId },
      select: { id: true, name: true }
    })

    if (!university) {
      return NextResponse.json({ error: 'University not found' }, { status: 404 })
    }

    logger.info('Starting bulk program upload', {
      universityId,
      universityName: university.name,
      programCount: programs.length
    })

    // =========================================================================
    // CHECK FOR DUPLICATES
    // =========================================================================

    // Get all existing program names at this university (case-insensitive)
    const existingPrograms = await prisma.academicProgram.findMany({
      where: { universityId },
      select: { name: true }
    })

    const existingNamesSet = new Set(existingPrograms.map((p) => p.name.toLowerCase().trim()))

    // =========================================================================
    // PROCESS PROGRAMS IN BATCHES
    // =========================================================================

    const results: ProgramResult[] = []
    const createdProgramIds: string[] = []

    // Process in batches to avoid timeouts
    for (let i = 0; i < programs.length; i += BATCH_SIZE) {
      const batch = programs.slice(i, i + BATCH_SIZE)

      // Process each program in the batch
      for (const program of batch) {
        const programName = program.name?.trim()

        // Check for duplicate
        if (existingNamesSet.has(programName.toLowerCase())) {
          results.push({
            name: programName,
            status: 'duplicate',
            error: `Program "${programName}" already exists at this university`
          })
          continue
        }

        try {
          // Create program with course requirements in a transaction
          const created = await prisma.$transaction(async (tx) => {
            // Create the program
            const newProgram = await tx.academicProgram.create({
              data: {
                name: programName,
                description: program.description.trim(),
                universityId,
                fieldOfStudyId: program.fieldOfStudyId,
                degreeType: program.degreeType,
                duration: program.duration.trim(),
                minIBPoints: program.minIBPoints ?? null,
                programUrl: program.programUrl?.trim() || null,
                courseRequirements:
                  program.courseRequirements && program.courseRequirements.length > 0
                    ? {
                        create: program.courseRequirements.map((req) => ({
                          ibCourseId: req.ibCourseId,
                          requiredLevel: req.requiredLevel,
                          minGrade: req.minGrade,
                          isCritical: req.isCritical,
                          orGroupId: req.orGroupId
                        }))
                      }
                    : undefined
              }
            })

            return newProgram
          })

          // Add to created list for tracking
          createdProgramIds.push(created.id)
          existingNamesSet.add(programName.toLowerCase()) // Prevent duplicates within same batch

          results.push({
            name: programName,
            status: 'created',
            programId: created.id
          })

          logger.info('Program created', {
            programId: created.id,
            programName,
            universityId
          })
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error'

          results.push({
            name: programName,
            status: 'error',
            error: errorMessage
          })

          logger.error('Failed to create program', {
            programName,
            universityId,
            error: errorMessage
          })
        }
      }
    }

    // =========================================================================
    // ALGOLIA SYNC
    // =========================================================================

    let algoliaResult = { success: 0, failed: 0 }

    if (createdProgramIds.length > 0) {
      try {
        algoliaResult = await syncProgramsBatch(createdProgramIds)

        logger.info('Algolia batch sync completed', {
          success: algoliaResult.success,
          failed: algoliaResult.failed
        })
      } catch (error) {
        logger.error('Algolia batch sync failed', { error })
        algoliaResult = { success: 0, failed: createdProgramIds.length }
      }
    }

    // =========================================================================
    // RESPONSE
    // =========================================================================

    const successCount = results.filter((r) => r.status === 'created').length
    const failedCount = results.filter((r) => r.status === 'error').length
    const duplicateCount = results.filter((r) => r.status === 'duplicate').length

    const response: BulkUploadResponse = {
      success: successCount,
      failed: failedCount,
      duplicates: duplicateCount,
      results,
      algoliaSync: {
        success: algoliaResult.success,
        failed: algoliaResult.failed
      }
    }

    logger.info('Bulk upload completed', {
      universityId,
      success: successCount,
      failed: failedCount,
      duplicates: duplicateCount
    })

    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    logger.error('Bulk upload failed', { error })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
