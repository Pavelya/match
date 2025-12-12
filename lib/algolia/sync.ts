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
