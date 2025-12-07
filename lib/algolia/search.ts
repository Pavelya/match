/**
 * Algolia Search Functions
 *
 * Pre-filters programs using Algolia to reduce matching candidates.
 * Much faster than fetching all programs from DB when filtering by:
 * - Field of study
 * - Country
 * - IB points requirement
 */

import { algolia, INDEX_NAMES } from './client'
import type { AlgoliaProgramRecord } from './sync'
import { logger } from '@/lib/logger'

// Maximum candidates to return for matching
const MAX_CANDIDATES = 300

/**
 * Pre-filter programs using Algolia based on student preferences
 *
 * Filters:
 * - fieldOfStudyId IN student's preferred fields (if any)
 * - countryId IN student's preferred countries (if any)
 * - minimumIBPoints <= student's points + 5 (near-eligible)
 *
 * @param studentFields - Student's preferred field IDs
 * @param studentCountries - Student's preferred country IDs
 * @param studentPoints - Student's total IB points
 * @returns Array of program IDs to use for detailed matching
 */
export async function searchCandidatePrograms(
  studentFields: string[],
  studentCountries: string[],
  studentPoints: number
): Promise<string[]> {
  try {
    // Build filter string for Algolia
    const filters: string[] = []

    // Field filter (OR within, if any preferences)
    if (studentFields.length > 0) {
      const fieldFilter = studentFields.map((f) => `fieldOfStudyId:${f}`).join(' OR ')
      filters.push(`(${fieldFilter})`)
    }

    // Country filter (OR within, if any preferences)
    if (studentCountries.length > 0) {
      const countryFilter = studentCountries.map((c) => `countryId:${c}`).join(' OR ')
      filters.push(`(${countryFilter})`)
    }

    // Points filter - include programs where student is within 5 points of requirement
    // This catches near-misses that should still appear in results
    const pointsThreshold = studentPoints + 5
    filters.push(`minimumIBPoints <= ${pointsThreshold} OR minimumIBPoints = 0`)

    const filterString = filters.length > 0 ? filters.join(' AND ') : ''

    logger.debug('Algolia search filters', {
      studentFields: studentFields.length,
      studentCountries: studentCountries.length,
      studentPoints,
      filterString
    })

    // Search Algolia with filters
    const result = await algolia.searchSingleIndex<AlgoliaProgramRecord>({
      indexName: INDEX_NAMES.PROGRAMS,
      searchParams: {
        query: '', // Empty query = return all matching filters
        filters: filterString,
        hitsPerPage: MAX_CANDIDATES,
        attributesToRetrieve: ['objectID', 'programId'] // Only need IDs
      }
    })

    const programIds = result.hits.map((hit) => hit.programId || hit.objectID)

    logger.info('Algolia pre-filter complete', {
      candidateCount: programIds.length,
      maxCandidates: MAX_CANDIDATES
    })

    return programIds
  } catch (error) {
    logger.error('Algolia search failed, returning empty array', { error })
    // Return empty array on error - caller should fall back to full fetch
    return []
  }
}

/**
 * Check if Algolia is available and properly configured
 */
export function isAlgoliaAvailable(): boolean {
  try {
    return !!process.env.ALGOLIA_APP_ID && !!process.env.ALGOLIA_ADMIN_API_KEY
  } catch {
    return false
  }
}
