/**
 * Algolia Sync Service
 *
 * Transforms Prisma models into Algolia records for indexing.
 * Includes nested reference data (fields, countries, courses) for better search.
 */

import { algolia, INDEX_NAMES } from './client'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'

/**
 * Algolia Program Record
 * This is what gets indexed in Algolia (includes nested reference data)
 */
export interface AlgoliaProgramRecord {
  objectID: string // Algolia requires this field
  programId: string
  programName: string
  description: string

  // University info
  universityId: string
  universityName: string
  universityAbbreviation?: string
  universityImageUrl?: string // URL only (not base64) - small enough for Algolia 10KB limit

  // Field of study (nested for faceting)
  fieldOfStudyId: string
  fieldOfStudy: {
    id: string
    name: string
    iconName?: string
    description?: string
  }

  // Country (nested for faceting)
  countryId: string
  country: {
    id: string
    name: string
    code: string
  }

  // Program details
  degreeType: string // Bachelor, Master, etc.
  duration: string // "4 years"
  tuitionFee?: number
  currency?: string

  // Requirements
  minimumIBPoints?: number
  requiredCourses?: Array<{
    courseId: string
    courseName: string
    level: string
    minimumGrade: number
    isCritical: boolean
  }>

  // Metadata
  isActive: boolean
  createdAt: number // Unix timestamp for sorting
  updatedAt: number
}

/**
 * Transform Prisma AcademicProgram to Algolia record
 */
export async function transformProgramToAlgolia(
  programId: string
): Promise<AlgoliaProgramRecord | null> {
  try {
    const program = await prisma.academicProgram.findUnique({
      where: { id: programId },
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
    })

    if (!program) {
      logger.warn('Program not found for Algolia sync', { programId })
      return null
    }

    // Transform to Algolia record
    const record: AlgoliaProgramRecord = {
      objectID: program.id,
      programId: program.id,
      programName: program.name,
      description: program.description,

      // University
      universityId: program.university.id,
      universityName: program.university.name,
      universityAbbreviation: program.university.abbreviatedName ?? undefined,
      // Only include image if it's a URL (not base64) - URLs are ~100 bytes
      universityImageUrl: program.university.image?.startsWith('http')
        ? program.university.image
        : undefined,

      // Field of Study (nested)
      fieldOfStudyId: program.fieldOfStudy.id,
      fieldOfStudy: {
        id: program.fieldOfStudy.id,
        name: program.fieldOfStudy.name,
        iconName: program.fieldOfStudy.iconName ?? undefined,
        description: program.fieldOfStudy.description ?? undefined
      },

      // Country (nested)
      countryId: program.university.country.id,
      country: {
        id: program.university.country.id,
        name: program.university.country.name,
        code: program.university.country.code
      },

      // Program details
      degreeType: program.degreeType,
      duration: program.duration,
      tuitionFee: undefined, // Not in schema yet
      currency: undefined, // Not in schema yet

      // Requirements
      minimumIBPoints: program.minIBPoints ?? undefined,
      requiredCourses: program.courseRequirements.map((req) => ({
        courseId: req.ibCourse.id,
        courseName: req.ibCourse.name,
        level: req.requiredLevel,
        minimumGrade: req.minGrade,
        isCritical: req.isCritical
      })),

      // Metadata
      isActive: true, // Schema doesn't have this yet, default to true
      createdAt: program.createdAt.getTime(),
      updatedAt: program.updatedAt.getTime()
    }

    return record
  } catch (error) {
    logger.error('Error transforming program to Algolia record', { error, programId })
    return null
  }
}

/**
 * Sync a single program to Algolia
 */
export async function syncProgramToAlgolia(programId: string): Promise<boolean> {
  try {
    logger.info('Syncing program to Algolia', { programId })

    const record = await transformProgramToAlgolia(programId)

    if (!record) {
      logger.warn('Could not transform program, skipping sync', { programId })
      return false
    }

    // Save to Algolia
    await algolia.saveObject({
      indexName: INDEX_NAMES.PROGRAMS,
      body: record
    })

    logger.info('Program synced to Algolia successfully', { programId })
    return true
  } catch (error) {
    logger.error('Failed to sync program to Algolia', { error, programId })
    return false
  }
}

/**
 * Delete a program from Algolia
 */
export async function deleteProgramFromAlgolia(programId: string): Promise<boolean> {
  try {
    logger.info('Deleting program from Algolia', { programId })

    await algolia.deleteObject({
      indexName: INDEX_NAMES.PROGRAMS,
      objectID: programId
    })

    logger.info('Program deleted from Algolia successfully', { programId })
    return true
  } catch (error) {
    logger.error('Failed to delete program from Algolia', { error, programId })
    return false
  }
}

/**
 * Sync all programs to Algolia (bulk operation)
 */
export async function syncAllProgramsToAlgolia(): Promise<{
  success: number
  failed: number
}> {
  try {
    logger.info('Starting bulk sync of all programs to Algolia')

    const programs = await prisma.academicProgram.findMany({
      select: { id: true }
    })

    logger.info('Found programs to sync', { count: programs.length })

    const results = await Promise.allSettled(
      programs.map((program) => syncProgramToAlgolia(program.id))
    )

    const success = results.filter((r) => r.status === 'fulfilled' && r.value === true).length
    const failed = results.length - success

    logger.info('Bulk sync completed', { success, failed, total: programs.length })

    return { success, failed }
  } catch (error) {
    logger.error('Failed to sync all programs', { error })
    return { success: 0, failed: 0 }
  }
}

/**
 * Sync multiple programs to Algolia in batch (optimized for bulk uploads)
 *
 * Uses Algolia's saveObjects for efficient batch indexing.
 * Processes in batches of 100 records to respect API limits.
 *
 * @param programIds - Array of program IDs to sync
 * @returns Object with success/failed counts and details
 */
export async function syncProgramsBatch(programIds: string[]): Promise<{
  success: number
  failed: number
  errors: Array<{ programId: string; error: string }>
}> {
  if (programIds.length === 0) {
    return { success: 0, failed: 0, errors: [] }
  }

  logger.info('Starting batch sync to Algolia', { count: programIds.length })

  const errors: Array<{ programId: string; error: string }> = []
  const records: AlgoliaProgramRecord[] = []

  // Transform all programs to Algolia records
  for (const programId of programIds) {
    try {
      const record = await transformProgramToAlgolia(programId)
      if (record) {
        records.push(record)
      } else {
        errors.push({ programId, error: 'Failed to transform program' })
      }
    } catch (error) {
      errors.push({
        programId,
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    }
  }

  if (records.length === 0) {
    logger.warn('No valid records to sync', { failed: programIds.length })
    return { success: 0, failed: programIds.length, errors }
  }

  // Batch save to Algolia (max 1000 per request, we use 100 for safety)
  const BATCH_SIZE = 100
  let totalSuccess = 0

  try {
    for (let i = 0; i < records.length; i += BATCH_SIZE) {
      const batch = records.slice(i, i + BATCH_SIZE)

      await algolia.saveObjects({
        indexName: INDEX_NAMES.PROGRAMS,
        objects: batch as unknown as Record<string, unknown>[]
      })

      totalSuccess += batch.length
      logger.info('Batch saved to Algolia', {
        batch: Math.floor(i / BATCH_SIZE) + 1,
        count: batch.length,
        total: records.length
      })
    }
  } catch (error) {
    logger.error('Failed to save batch to Algolia', { error })
    // Calculate how many failed in the Algolia save step
    const failedInSave = records.length - totalSuccess
    return {
      success: totalSuccess,
      failed: errors.length + failedInSave,
      errors: [
        ...errors,
        {
          programId: 'batch',
          error: error instanceof Error ? error.message : 'Algolia batch save failed'
        }
      ]
    }
  }

  logger.info('Batch sync completed', {
    success: totalSuccess,
    failed: errors.length,
    total: programIds.length
  })

  return {
    success: totalSuccess,
    failed: errors.length,
    errors
  }
}

/**
 * Sync all programs belonging to a university to Algolia
 * Called when university data changes (country, image, name, etc.)
 * This ensures search results stay in sync with the latest university information.
 */
export async function syncUniversityProgramsToAlgolia(universityId: string): Promise<boolean> {
  try {
    logger.info('Syncing all programs for university to Algolia', { universityId })

    const programs = await prisma.academicProgram.findMany({
      where: { universityId },
      select: { id: true }
    })

    if (programs.length === 0) {
      logger.info('No programs to sync for university', { universityId })
      return true
    }

    const { success, failed } = await syncProgramsBatch(programs.map((p) => p.id))

    logger.info('University programs synced to Algolia', {
      universityId,
      success,
      failed,
      total: programs.length
    })

    return failed === 0
  } catch (error) {
    logger.error('Failed to sync university programs to Algolia', { error, universityId })
    return false
  }
}
