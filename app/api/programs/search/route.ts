/**
 * Program Search API Route
 *
 * GET /api/programs/search
 *
 * Searches programs using Algolia with optional filters.
 * Supports:
 * - Text query with typo tolerance
 * - Field of study filter
 * - Country filter
 * - IB points range filter
 */

import { NextRequest, NextResponse } from 'next/server'
import { algolia, INDEX_NAMES } from '@/lib/algolia/client'
import { logger } from '@/lib/logger'
import type { AlgoliaProgramRecord } from '@/lib/algolia/sync'

export async function GET(request: NextRequest) {
  const startTime = performance.now()

  try {
    const searchParams = request.nextUrl.searchParams

    // Parse query parameters
    const query = searchParams.get('q') || ''
    const fields = searchParams.get('fields')?.split(',').filter(Boolean) || []
    const countries = searchParams.get('countries')?.split(',').filter(Boolean) || []
    const minPoints = searchParams.get('minPoints')
    const maxPoints = searchParams.get('maxPoints')

    // Build Algolia filters
    const filters: string[] = []

    // Field filter
    if (fields.length > 0) {
      const fieldFilter = fields.map((f) => `fieldOfStudyId:${f}`).join(' OR ')
      filters.push(`(${fieldFilter})`)
    }

    // Country filter
    if (countries.length > 0) {
      const countryFilter = countries.map((c) => `countryId:${c}`).join(' OR ')
      filters.push(`(${countryFilter})`)
    }

    // IB Points filter
    if (minPoints) {
      filters.push(`minimumIBPoints >= ${minPoints}`)
    }
    if (maxPoints) {
      filters.push(`minimumIBPoints <= ${maxPoints}`)
    }

    const filterString = filters.join(' AND ')

    // Search Algolia
    const result = await algolia.searchSingleIndex<AlgoliaProgramRecord>({
      indexName: INDEX_NAMES.PROGRAMS,
      searchParams: {
        query,
        filters: filterString,
        hitsPerPage: 50,
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
        ]
      }
    })

    const duration = Math.round(performance.now() - startTime)

    logger.info('program_search', {
      query,
      filters: filterString,
      hits: result.hits.length,
      nbHits: result.nbHits,
      duration
    })

    return NextResponse.json({
      hits: result.hits,
      nbHits: result.nbHits,
      query,
      processingTimeMs: result.processingTimeMS,
      duration
    })
  } catch (error) {
    logger.error('Program search failed', { error })
    return NextResponse.json({ error: 'Search failed', hits: [], nbHits: 0 }, { status: 500 })
  }
}
