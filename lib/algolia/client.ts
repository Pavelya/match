import { algoliasearch } from 'algoliasearch'
import { env } from '@/lib/env'

/**
 * Algolia Search Client
 *
 * Singleton client for searching and indexing data in Algolia.
 * Uses application credentials from environment variables.
 */

let algoliaClient: ReturnType<typeof algoliasearch> | null = null

export function getAlgoliaClient() {
  if (!algoliaClient) {
    if (!env.ALGOLIA_APP_ID || !env.ALGOLIA_ADMIN_API_KEY) {
      throw new Error(
        'Algolia credentials not found. Please set ALGOLIA_APP_ID and ALGOLIA_ADMIN_API_KEY in your .env file.'
      )
    }

    algoliaClient = algoliasearch(env.ALGOLIA_APP_ID, env.ALGOLIA_ADMIN_API_KEY)
  }

  return algoliaClient
}

// Export singleton instance
export const algolia = getAlgoliaClient()

// Export index names as constants
export const INDEX_NAMES = {
  PROGRAMS: 'programs_production',
  UNIVERSITIES: 'universities_production'
} as const

/**
 * Get a specific index
 */
export function getIndex(name: keyof typeof INDEX_NAMES) {
  return algolia.initIndex(INDEX_NAMES[name])
}

// Export index instances for convenience
export const programsIndex = getIndex('PROGRAMS')
export const universitiesIndex = getIndex('UNIVERSITIES')
