import 'server-only'
import { unstable_cache } from 'next/cache'
import { getAlgoliaClient, INDEX_NAMES } from '@/lib/algolia/client'
import { logger } from '@/lib/logger'
import { exploreFilters } from './filters'
import type { ExploreQuery } from './query'
import { ROW_ATTRIBUTES, sortByPoints, toRow, type RowRecord } from './records'
import type { ExploreRow } from './types'

/**
 * Explore's list from the search service (rebranding 2.3). In its own order (relevance, then
 * the highest minimum first) with no switch, a window of the list is one search, as on today's
 * page. The points sorts and "Only ones I qualify for" need every matching program: they are
 * read in full, filtered and sorted here, and the window cut from them.
 */

/** The search pages no further than this, so the full list browses past it. */
const SEARCH_WINDOW = 1000

export interface ExploreWindow {
  offset: number
  length: number
}

export async function searchExplore(
  query: ExploreQuery,
  window: ExploreWindow,
  qualifies?: (programId: string) => boolean
): Promise<{ total: number; rows: ExploreRow[] }> {
  const started = performance.now()
  const filters = exploreFilters(query)
  const end = window.offset + window.length

  let result: { total: number; rows: ExploreRow[] }
  if (query.sort === 'relevant' && !qualifies && end <= SEARCH_WINDOW) {
    const page = await getAlgoliaClient().searchSingleIndex<RowRecord>({
      indexName: INDEX_NAMES.PROGRAMS,
      searchParams: {
        query: query.q,
        filters,
        offset: window.offset,
        length: window.length,
        attributesToRetrieve: ROW_ATTRIBUTES,
        attributesToHighlight: []
      }
    })
    result = { total: page.nbHits ?? page.hits.length, rows: page.hits.map(toRow) }
  } else {
    let records = await everyMatch(query.q, filters)
    if (qualifies) records = records.filter((r) => qualifies(r.objectID))
    if (query.sort !== 'relevant') records = sortByPoints(records, query.sort)
    result = { total: records.length, rows: records.slice(window.offset, end).map(toRow) }
  }

  logger.info('explore_search', {
    query: query.q || '(empty)',
    filters: filters ?? '(none)',
    sort: query.sort,
    qualify: Boolean(qualifies),
    offset: window.offset,
    total: result.total,
    ms: Math.round(performance.now() - started)
  })
  return result
}

/**
 * Every program the search and filters match, in the search's order. Past its 1,000 hits the
 * rest are browsed, which ranks by the minimum alone, and follow the first 1,000; with nothing
 * typed, that is the search's own order.
 */
async function everyMatch(q: string, filters: string | undefined): Promise<RowRecord[]> {
  const client = getAlgoliaClient()
  const first = await client.searchSingleIndex<RowRecord>({
    indexName: INDEX_NAMES.PROGRAMS,
    searchParams: {
      query: q,
      filters,
      hitsPerPage: SEARCH_WINDOW,
      page: 0,
      attributesToRetrieve: ROW_ATTRIBUTES,
      attributesToHighlight: []
    }
  })
  if ((first.nbHits ?? 0) <= first.hits.length) return first.hits

  const seen = new Set(first.hits.map((r) => r.objectID))
  const rest: RowRecord[] = []
  await client.browseObjects<RowRecord>({
    indexName: INDEX_NAMES.PROGRAMS,
    browseParams: {
      query: q,
      filters,
      hitsPerPage: SEARCH_WINDOW,
      attributesToRetrieve: ROW_ATTRIBUTES
    },
    aggregator: (response) => {
      for (const record of response.hits) if (!seen.has(record.objectID)) rest.push(record)
    }
  })
  return [...first.hits, ...rest]
}

/**
 * How many programs the catalogue holds, for the summary under the title. The search service
 * counts them; kept for an hour, as the country list beside it is.
 */
export const getCatalogueSize = unstable_cache(
  async (): Promise<number> => {
    const result = await getAlgoliaClient().searchSingleIndex({
      indexName: INDEX_NAMES.PROGRAMS,
      searchParams: { query: '', hitsPerPage: 0, analytics: false }
    })
    return result.nbHits ?? 0
  },
  ['explore-catalogue-size'],
  { revalidate: 3600, tags: ['explore-catalogue-size'] }
)
