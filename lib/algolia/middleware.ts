/**
 * Algolia Auto-Sync Extension
 *
 * Prisma client extension that automatically syncs programs to Algolia
 * when they are created, updated, or deleted.
 *
 * Also syncs programs when their parent university is updated (country, image, etc.)
 *
 * Uses Prisma Client Extensions (modern approach replacing deprecated middleware)
 */

import { Prisma } from '@prisma/client'
import {
  syncProgramToAlgolia,
  deleteProgramFromAlgolia,
  syncUniversityProgramsToAlgolia
} from '@/lib/algolia/sync'
import { logger } from '@/lib/logger'

/**
 * Prisma extension for automatic Algolia sync
 */
export const algoliaExtension = Prisma.defineExtension({
  name: 'algolia-sync',
  query: {
    academicProgram: {
      async create({ args, query }) {
        const result = await query(args)

        // Background sync to Algolia
        if (result.id) {
          logger.info('🔄 Triggering Algolia sync for new program', { programId: result.id })
          syncProgramToAlgolia(result.id)
            .then((success) => {
              if (success) {
                logger.info('✅ Algolia sync completed for program', { programId: result.id })
              } else {
                logger.warn('⚠️ Algolia sync returned false for program', { programId: result.id })
              }
            })
            .catch((error) => {
              logger.error('❌ Background Algolia sync failed after create', {
                error: error instanceof Error ? error.message : String(error),
                programId: result.id
              })
            })
        }

        return result
      },

      async update({ args, query }) {
        const result = await query(args)

        // Background sync to Algolia
        if (result.id) {
          logger.info('🔄 Triggering Algolia sync for updated program', { programId: result.id })
          syncProgramToAlgolia(result.id)
            .then((success) => {
              if (success) {
                logger.info('✅ Algolia sync completed for program', { programId: result.id })
              } else {
                logger.warn('⚠️ Algolia sync returned false for program', { programId: result.id })
              }
            })
            .catch((error) => {
              logger.error('❌ Background Algolia sync failed after update', {
                error: error instanceof Error ? error.message : String(error),
                programId: result.id
              })
            })
        }

        return result
      },

      async upsert({ args, query }) {
        const result = await query(args)

        // Background sync to Algolia
        if (result.id) {
          syncProgramToAlgolia(result.id).catch((error) => {
            logger.error('Background Algolia sync failed after upsert', {
              error,
              programId: result.id
            })
          })
          logger.debug('Triggered Algolia sync for upserted program', { programId: result.id })
        }

        return result
      },

      async delete({ args, query }) {
        const result = await query(args)

        // Background delete from Algolia
        if (result.id) {
          deleteProgramFromAlgolia(result.id).catch((error) => {
            logger.error('Background Algolia delete failed', {
              error,
              programId: result.id
            })
          })
          logger.debug('Triggered Algolia delete for program', { programId: result.id })
        }

        return result
      },

      async updateMany({ args, query }) {
        const result = await query(args)
        logger.warn('Bulk update on programs - Algolia sync not triggered automatically', {
          count: result.count
        })
        return result
      },

      async deleteMany({ args, query }) {
        const result = await query(args)
        logger.warn('Bulk delete on programs - Algolia sync not triggered automatically', {
          count: result.count
        })
        return result
      }
    },

    // University hooks - sync all programs when university data changes
    university: {
      async update({ args, query }) {
        const result = await query(args)

        // Background sync of all programs for this university
        if (result.id) {
          logger.info('🔄 University updated, triggering Algolia sync for all programs', {
            universityId: result.id,
            universityName: result.name
          })
          syncUniversityProgramsToAlgolia(result.id)
            .then((success) => {
              if (success) {
                logger.info('✅ Algolia sync completed for university programs', {
                  universityId: result.id
                })
              } else {
                logger.warn('⚠️ Algolia sync had failures for university programs', {
                  universityId: result.id
                })
              }
            })
            .catch((error) => {
              logger.error('❌ Background Algolia sync failed for university programs', {
                error: error instanceof Error ? error.message : String(error),
                universityId: result.id
              })
            })
        }

        return result
      }
    }
  }
})
