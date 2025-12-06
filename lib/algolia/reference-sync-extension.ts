/**
 * Reference Data Sync Extension for Algolia
 *
 * When reference data (Fields, Countries, IB Courses) is updated,
 * automatically re-sync all affected programs to Algolia so nested
 * data stays current.
 */

import { Prisma } from '@prisma/client'
import { syncProgramToAlgolia } from '@/lib/algolia/sync'
import { logger } from '@/lib/logger'

/**
 * Get all programs affected by a field of study change
 */
async function syncProgramsForField(fieldId: string) {
  // Import here to avoid circular dependency
  const { prisma } = await import('@/lib/prisma')

  try {
    const programs = await prisma.academicProgram.findMany({
      where: { fieldOfStudyId: fieldId },
      select: { id: true, name: true }
    })

    logger.info('Re-syncing programs for updated field', {
      fieldId,
      programCount: programs.length
    })

    // Sync all affected programs
    const results = await Promise.allSettled(
      programs.map((p: { id: string; name: string }) => syncProgramToAlgolia(p.id))
    )

    const success = results.filter((r) => r.status === 'fulfilled').length
    const failed = results.length - success

    logger.info('Field update sync complete', { fieldId, success, failed })
  } catch (error) {
    logger.error('Failed to sync programs for field update', { error, fieldId })
  }
}

/**
 * Get all programs affected by a country change
 */
async function syncProgramsForCountry(countryId: string) {
  const { prisma } = await import('@/lib/prisma')

  try {
    const programs = await prisma.academicProgram.findMany({
      where: {
        university: {
          countryId
        }
      },
      select: { id: true, name: true }
    })

    logger.info('Re-syncing programs for updated country', {
      countryId,
      programCount: programs.length
    })

    const results = await Promise.allSettled(
      programs.map((p: { id: string; name: string }) => syncProgramToAlgolia(p.id))
    )

    const success = results.filter((r) => r.status === 'fulfilled').length
    const failed = results.length - success

    logger.info('Country update sync complete', { countryId, success, failed })
  } catch (error) {
    logger.error('Failed to sync programs for country update', { error, countryId })
  }
}

/**
 * Get all programs affected by an IB course change
 */
async function syncProgramsForCourse(courseId: string) {
  const { prisma } = await import('@/lib/prisma')

  try {
    const programs = await prisma.academicProgram.findMany({
      where: {
        courseRequirements: {
          some: {
            ibCourseId: courseId
          }
        }
      },
      select: { id: true, name: true }
    })

    logger.info('Re-syncing programs for updated IB course', {
      courseId,
      programCount: programs.length
    })

    const results = await Promise.allSettled(
      programs.map((p: { id: string; name: string }) => syncProgramToAlgolia(p.id))
    )

    const success = results.filter((r) => r.status === 'fulfilled').length
    const failed = results.length - success

    logger.info('IB course update sync complete', { courseId, success, failed })
  } catch (error) {
    logger.error('Failed to sync programs for IB course update', { error, courseId })
  }
}

/**
 * Prisma extension for reference data sync
 */
export const referenceDataSyncExtension = Prisma.defineExtension({
  name: 'reference-data-sync',
  query: {
    fieldOfStudy: {
      async update({ args, query }) {
        const result = await query(args)

        // Background sync of all programs using this field
        const fieldId = args.where.id
        if (fieldId) {
          syncProgramsForField(fieldId as string).catch((error) => {
            logger.error('Background field sync failed', { error, fieldId })
          })
          logger.debug('Triggered program re-sync for field update', { fieldId })
        }

        return result
      }
    },

    country: {
      async update({ args, query }) {
        const result = await query(args)

        // Background sync of all programs in this country
        const countryId = args.where.id || args.where.code
        if (countryId) {
          syncProgramsForCountry(countryId as string).catch((error) => {
            logger.error('Background country sync failed', { error, countryId })
          })
          logger.debug('Triggered program re-sync for country update', { countryId })
        }

        return result
      }
    },

    iBCourse: {
      async update({ args, query }) {
        const result = await query(args)

        // Background sync of all programs requiring this course
        const courseId = args.where.id || args.where.code
        if (courseId) {
          syncProgramsForCourse(courseId as string).catch((error) => {
            logger.error('Background IB course sync failed', { error, courseId })
          })
          logger.debug('Triggered program re-sync for IB course update', { courseId })
        }

        return result
      }
    }
  }
})
