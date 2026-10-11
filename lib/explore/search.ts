import 'server-only'
import { unstable_cache } from 'next/cache'
import { getAlgoliaClient, INDEX_NAMES } from '@/lib/algolia/client'
import { logger } from '@/lib/logger'
import type { StudentProfile } from '@/lib/matching/types'
import { exploreFilters } from './filters'
import { FIT_ATTRIBUTES, fitProgram, programFit } from './fit'
import type { ExploreQuery } from './query'
import { ROW_ATTRIBUTES, sortByPoints, toRow, type RowRecord } from './records'
import type { ExploreFit, ExploreRow } from './types'

/**
 * Explore's list from the search service (rebranding 2.3). In its own order (relevance, then
 * the highest minimum first) with no switch, a window of the list is one search, as on today's
 * page. The points sorts and "Only ones I qualify for" need every matching program: they are
 * read in full, filtered and sorted here, and the window cut from them.
 *
 * With a student who has grades, the records come with their requirements and each row with
 * the student's fit, worked out here. Nothing else is read: no database, no programs cache.
 */

/** The search pages no further than this, so the full list browses past it. */
const SEARCH_WINDOW = 1000

export interface ExploreWindow {
  offset: number
  length: number
}

export interface ExploreList {
  total: number
  rows: ExploreRow[]
  /** By program id, when there is a student with grades */
  fits?: Record<string, ExploreFit>
}

export async function searchExplore(
  query: ExploreQuery,
  window: ExploreWindow,
  student?: StudentProfile | null
): Promise<ExploreList> {
  const started = performance.now()
  const filters = exploreFilters(query)
  const attributes = student ? [...ROW_ATTRIBUTES, ...FIT_ATTRIBUTES] : ROW_ATTRIBUTES
  const qualify = query.qualify && student ? student : null
  const end = window.offset + window.length

  let total: number
  let records: RowRecord[]
  if (query.sort === 'relevant' && !qualify && end <= SEARCH_WINDOW) {
    const page = await getAlgoliaClient().searchSingleIndex<RowRecord>({
      indexName: INDEX_NAMES.PROGRAMS,
      searchParams: {
        query: query.q,
        filters,
        offset: window.offset,
        length: window.length,
        attributesToRetrieve: attributes,
        attributesToHighlight: []
      }
    })
    total = page.nbHits ?? page.hits.length
    records = page.hits
  } else {
    let all = await everyMatch(query.q, filters, attributes)
    if (qualify) all = all.filter((r) => programFit(qualify, fitProgram(r)).status === 'meets')
    if (query.sort !== 'relevant') all = sortByPoints(all, query.sort)
    total = all.length
    records = all.slice(window.offset, end)
  }

  const list: ExploreList = { total, rows: records.map(toRow) }
  if (student) {
    list.fits = Object.fromEntries(
      records.map((r) => [r.objectID, programFit(student, fitProgram(r))])
    )
  }

  logger.info('explore_search', {
    query: query.q || '(empty)',
    filters: filters ?? '(none)',
    sort: query.sort,
    qualify: Boolean(qualify),
    offset: window.offset,
    total,
    ms: Math.round(performance.now() - started)
  })
  return list
}

/**
 * Every program the search and filters match, in the search's order. Past its 1,000 hits the
 * rest are browsed, which ranks by the minimum alone, and follow the first 1,000; with nothing
 * typed, that is the search's own order.
 */
async function everyMatch(
  q: string,
  filters: string | undefined,
  attributes: string[]
): Promise<RowRecord[]> {
  const client = getAlgoliaClient()
  const first = await client.searchSingleIndex<RowRecord>({
    indexName: INDEX_NAMES.PROGRAMS,
    searchParams: {
      query: q,
      filters,
      hitsPerPage: SEARCH_WINDOW,
      page: 0,
      attributesToRetrieve: attributes,
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
      attributesToRetrieve: attributes
    },
    aggregator: (response) => {
      for (const record of response.hits) if (!seen.has(record.objectID)) rest.push(record)
    }
  })
  return [...first.hits, ...rest]
}

/**
 * How many programs the catalogue holds, for the summary under the title when the list is
 * narrowed. The search service counts them, once a day: it changes a few times a week, and
 * each count is a search request against the free plan's 10,000 a month.
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
  { revalidate: 86_400, tags: ['explore-catalogue-size'] }
)
