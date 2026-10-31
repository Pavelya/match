/**
 * Algolia Search Functions
 *
 * Text search over programs and universities, for the search pages.
 */

import { getAlgoliaClient, INDEX_NAMES } from './client'
import { logger } from '@/lib/logger'

/**
 * Regex for validating CUID format (used by Prisma)
 * CUIDs start with 'c' followed by 24 lowercase alphanumeric characters
 */
const CUID_REGEX = /^c[a-z0-9]{24}$/

/**
 * Validate that a string is a valid CUID
 * Prevents injection attacks in Algolia filter strings
 */
function isValidCuid(id: string): boolean {
  return typeof id === 'string' && CUID_REGEX.test(id)
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
  universityId: string
  universityName: string
  universityAbbreviation?: string
  universityImageUrl?: string
  fieldOfStudy: { id: string; name: string }
  country: { id: string; name: string; code: string }
  degreeType: string
  duration: string
  minimumIBPoints?: number
  city?: string
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

    // Validate field IDs and country IDs to prevent injection
    if (filters?.fields && filters.fields.length > 0) {
      const validFields = filters.fields.filter(isValidCuid)
      if (validFields.length > 0) {
        const fieldFilter = validFields.map((f) => `fieldOfStudyId:${f}`).join(' OR ')
        filterParts.push(`(${fieldFilter})`)
      }
    }

    if (filters?.countries && filters.countries.length > 0) {
      const validCountries = filters.countries.filter(isValidCuid)
      if (validCountries.length > 0) {
        const countryFilter = validCountries.map((c) => `countryId:${c}`).join(' OR ')
        filterParts.push(`(${countryFilter})`)
      }
    }

    // Validate numeric filters (ensure they are actual numbers)
    if (filters?.minPoints !== undefined && Number.isFinite(filters.minPoints)) {
      filterParts.push(`minimumIBPoints >= ${Math.floor(filters.minPoints)}`)
    }

    // A program with no IB minimum is within any maximum, and below any minimum (content 6)
    if (filters?.maxPoints !== undefined && Number.isFinite(filters.maxPoints)) {
      filterParts.push(`(minimumIBPoints <= ${Math.floor(filters.maxPoints)} OR noIBMinimum = 1)`)
    }

    const filterString = filterParts.join(' AND ')

    // Execute search
    const result = await getAlgoliaClient().searchSingleIndex<ProgramSearchResult>({
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
          'universityId',
          'universityName',
          'universityAbbreviation',
          'universityImageUrl',
          'fieldOfStudy',
          'country',
          'degreeType',
          'duration',
          'minimumIBPoints',
          'city'
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
    const result = await getAlgoliaClient().searchSingleIndex({
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
