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
import { searchPrograms, type SearchFilters } from '@/lib/algolia/search'
import { logger } from '@/lib/logger'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams

    // Parse query parameters
    const query = searchParams.get('q') || ''
    const fields = searchParams.get('fields')?.split(',').filter(Boolean)
    const countries = searchParams.get('countries')?.split(',').filter(Boolean)
    const minPoints = searchParams.get('minPoints')
    const maxPoints = searchParams.get('maxPoints')

    // Build filters object
    const filters: SearchFilters = {}
    if (fields && fields.length > 0) filters.fields = fields
    if (countries && countries.length > 0) filters.countries = countries
    if (minPoints) filters.minPoints = parseInt(minPoints)
    if (maxPoints) filters.maxPoints = parseInt(maxPoints)

    // Execute search using the new searchPrograms function
    const result = await searchPrograms(query, filters)

    return NextResponse.json({
      hits: result.hits,
      nbHits: result.nbHits,
      query,
      processingTimeMs: result.processingTimeMS,
      page: result.page,
      nbPages: result.nbPages
    })
  } catch (error) {
    logger.error('Program search API failed', { error })
    return NextResponse.json({ error: 'Search failed', hits: [], nbHits: 0 }, { status: 500 })
  }
}
