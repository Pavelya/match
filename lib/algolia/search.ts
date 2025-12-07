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

// ============================================================
// SEARCH PAGE FUNCTIONS
// ============================================================

/**
 * Search filters for programs
 */
export interface SearchFilters {
  fields?: string[] // Field of study IDs
  countries?: string[] // Country IDs
  minPoints?: number // Minimum IB points requirement
  maxPoints?: number // Maximum IB points requirement
}

/**
 * Search result with highlighting
 */
export interface ProgramSearchResult {
  objectID: string
  programId: string
  programName: string
  universityName: string
  universityAbbreviation?: string
  fieldOfStudy: { id: string; name: string }
  country: { id: string; name: string; code: string }
  degreeType: string
  duration: string
  minimumIBPoints?: number
  // Highlighted fields (if query provided)
  _highlightResult?: Record<string, { value: string; matchLevel: string }>
}

/**
 * Search programs with text query and filters
 *
 * Features:
 * - Typo tolerance (enabled by default in Algolia)
 * - Faceted filters (field, country, IB points)
 * - Custom ranking by relevance
 * - Highlighting for matched terms
 *
 * @param query - Text search query
 * @param filters - Optional filters to apply
 * @param options - Additional search options
 * @returns Search results with metadata
 */
export async function searchPrograms(
  query: string,
  filters?: SearchFilters,
  options?: {
    hitsPerPage?: number
    page?: number
  }
): Promise<{
  hits: ProgramSearchResult[]
  nbHits: number
  page: number
  nbPages: number
  processingTimeMS: number
}> {
  const startTime = performance.now()

  try {
    // Build filter string
    const filterParts: string[] = []

    if (filters?.fields && filters.fields.length > 0) {
      const fieldFilter = filters.fields.map((f) => `fieldOfStudyId:${f}`).join(' OR ')
      filterParts.push(`(${fieldFilter})`)
    }

    if (filters?.countries && filters.countries.length > 0) {
      const countryFilter = filters.countries.map((c) => `countryId:${c}`).join(' OR ')
      filterParts.push(`(${countryFilter})`)
    }

    if (filters?.minPoints !== undefined) {
      filterParts.push(`minimumIBPoints >= ${filters.minPoints}`)
    }

    if (filters?.maxPoints !== undefined) {
      filterParts.push(`minimumIBPoints <= ${filters.maxPoints}`)
    }

    const filterString = filterParts.join(' AND ')

    // Execute search
    const result = await algolia.searchSingleIndex<ProgramSearchResult>({
      indexName: INDEX_NAMES.PROGRAMS,
      searchParams: {
        query,
        filters: filterString || undefined,
        hitsPerPage: options?.hitsPerPage ?? 50,
        page: options?.page ?? 0,
        // Search attributes (program name, university, field, country)
        attributesToRetrieve: [
          'objectID',
          'programId',
          'programName',
          'universityName',
          'universityAbbreviation',
          'fieldOfStudy',
          'country',
          'degreeType',
          'duration',
          'minimumIBPoints'
        ],
        // Enable highlighting for UI feedback
        attributesToHighlight: ['programName', 'universityName'],
        highlightPreTag: '<mark>',
        highlightPostTag: '</mark>'
      }
    })

    const duration = Math.round(performance.now() - startTime)

    logger.info('program_search', {
      query: query || '(empty)',
      filters: filterString || '(none)',
      hits: result.hits.length,
      nbHits: result.nbHits,
      algoliaMs: result.processingTimeMS,
      totalMs: duration
    })

    return {
      hits: result.hits,
      nbHits: result.nbHits ?? result.hits.length,
      page: result.page ?? 0,
      nbPages: result.nbPages ?? 1,
      processingTimeMS: result.processingTimeMS ?? 0
    }
  } catch (error) {
    logger.error('Program search failed', { error, query })
    throw error
  }
}

/**
 * Search universities
 */
export async function searchUniversities(
  query: string,
  options?: { hitsPerPage?: number }
): Promise<{
  hits: Array<{
    objectID: string
    universityId: string
    name: string
    abbreviatedName?: string
    country: { id: string; name: string; code: string }
    programCount: number
  }>
  nbHits: number
}> {
  try {
    const result = await algolia.searchSingleIndex({
      indexName: INDEX_NAMES.UNIVERSITIES,
      searchParams: {
        query,
        hitsPerPage: options?.hitsPerPage ?? 20,
        attributesToRetrieve: [
          'objectID',
          'universityId',
          'name',
          'abbreviatedName',
          'country',
          'programCount'
        ]
      }
    })

    return {
      hits: result.hits as Array<{
        objectID: string
        universityId: string
        name: string
        abbreviatedName?: string
        country: { id: string; name: string; code: string }
        programCount: number
      }>,
      nbHits: result.nbHits ?? result.hits.length
    }
  } catch (error) {
    logger.error('University search failed', { error, query })
    throw error
  }
}
