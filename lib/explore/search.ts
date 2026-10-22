import 'server-only'
import { unstable_cache } from 'next/cache'
import { getAlgoliaClient, INDEX_NAMES } from '@/lib/algolia/client'
import { env } from '@/lib/env'
import { logger } from '@/lib/logger'
import type { StudentProfile } from '@/lib/matching/types'
import { bestFitOrder, liftedOrder, liftingFilters } from './best-fit'
import { exploreFilters } from './filters'
import { FIT_ATTRIBUTES, fitProgram, programFit } from './fit'
import { shownSort, type ExploreQuery } from './query'
import { ROW_ATTRIBUTES, sortByPoints, toRow, type RowRecord } from './records'
import type { BestFitMode, ExploreFit, ExploreRow } from './types'

/**
 * Explore's list from the search service (rebranding 2.3). In its own order (relevance, then
 * the highest minimum first) with no switch, a window of the list is one search, as on today's
 * page; with nothing typed that order is "Highest points needed", so that sort is one search
 * too. The other points sort and "Only ones I qualify for" need every matching program: they
 * are read in full, filtered and sorted here, and the window cut from them.
 *
 * Best fit (MAINT_tasks.md 5.27) reads the full list with the search's browse alone, since it
 * uses no ranking: one request up to 1,000 programs, two past that. `EXPLORE_BEST_FIT` can
 * make it one search that lifts the student's countries and fields (`lifted`), or turn it off.
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

/** The fallback switch's position; unset is the full order */
export function bestFitMode(): BestFitMode {
  return env.EXPLORE_BEST_FIT ?? 'full'
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
  const mode = bestFitMode()
  const sort = shownSort(query, Boolean(student) && mode !== 'off')
  const best = sort === 'best' && student ? student : null
  const lifted = best && mode === 'lifted' && !qualify ? best : null

  // One search: the window in the search's own order, or lifted by the student's tiers
  const searchOrder = sort === 'relevant' || (sort === 'high' && query.q === '') || lifted
  let total: number
  let records: RowRecord[]
  if (searchOrder && !qualify && end <= SEARCH_WINDOW) {
    const page = await getAlgoliaClient().searchSingleIndex<RowRecord>({
      indexName: INDEX_NAMES.PROGRAMS,
      searchParams: {
        query: query.q,
        filters,
        ...(lifted ? { optionalFilters: liftingFilters(lifted) } : {}),
        offset: window.offset,
        length: window.length,
        attributesToRetrieve: attributes,
        attributesToHighlight: []
      }
    })
    total = page.nbHits ?? page.hits.length
    records = page.hits
  } else {
    let all =
      best && !lifted
        ? await everyBrowsed(query.q, filters, attributes)
        : await everyMatch(query.q, filters, attributes)
    if (qualify) all = all.filter((r) => programFit(qualify, fitProgram(r)).status === 'meets')
    if (lifted) all = liftedOrder(all, lifted)
    else if (best) all = bestFitOrder(all, best)
    else if (sort === 'low' || sort === 'high') all = sortByPoints(all, sort)
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
    sort,
    ...(best ? { bestFit: mode } : {}),
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
 * Every program the search and filters match, read with browse alone, in pages of 1,000. For
 * Best fit, which orders them itself and needs no ranking, so no search comes first.
 */
async function everyBrowsed(
  q: string,
  filters: string | undefined,
  attributes: string[]
): Promise<RowRecord[]> {
  const all: RowRecord[] = []
  await getAlgoliaClient().browseObjects<RowRecord>({
    indexName: INDEX_NAMES.PROGRAMS,
    browseParams: {
      query: q,
      filters,
      hitsPerPage: SEARCH_WINDOW,
      attributesToRetrieve: attributes
    },
    aggregator: (response) => {
      all.push(...response.hits)
    }
  })
  return all
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
