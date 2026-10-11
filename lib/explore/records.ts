/**
 * Search records as Explore's rows (rebranding 2.3, board "D3.3 Result row"), and the two points
 * sorts, which the search service can't do itself: it ranks by relevance, then the highest
 * minimum first, with no other order. Pure, so the route and the page share it.
 */

import { universityInitials } from '@/lib/programs/university-initials'
import type { FitRecord } from './fit'
import type { ExploreSort } from './query'
import type { ExploreRow } from './types'

/** What a row reads from a search record; nothing else is retrieved. */
export const ROW_ATTRIBUTES = [
  'objectID',
  'programName',
  'universityName',
  'universityAbbreviation',
  'universityImageUrl',
  'city',
  'country',
  'duration',
  'minimumIBPoints',
  'admitRate'
]

/** A search record: what a row shows, and what the fit reads when the student has grades */
export interface RowRecord extends FitRecord {
  universityAbbreviation?: string
  universityImageUrl?: string
  city?: string
  country?: { name: string }
  duration?: string
  admitRate?: number | null
}

export function toRow(record: RowRecord): ExploreRow {
  return {
    id: record.objectID,
    name: record.programName,
    university: record.universityName,
    city: record.city ?? null,
    country: record.country?.name ?? '',
    length: record.duration ?? '',
    minIBPoints: record.minimumIBPoints ?? null,
    admitRate: record.admitRate ?? null,
    image: record.universityImageUrl ?? null,
    initials: universityInitials(record.universityName, record.universityAbbreviation ?? null)
  }
}

/**
 * Lowest or highest minimum first, programs with no IB minimum last in both, as on Matches.
 * Equal minimums keep the search's order.
 */
export function sortByPoints<T extends Pick<RowRecord, 'minimumIBPoints'>>(
  records: readonly T[],
  sort: Exclude<ExploreSort, 'relevant'>
): T[] {
  const direction = sort === 'low' ? 1 : -1
  return [...records].sort((a, b) => {
    const x = a.minimumIBPoints ?? null
    const y = b.minimumIBPoints ?? null
    if (x === null || y === null) return x === y ? 0 : x === null ? 1 : -1
    return direction * (x - y)
  })
}
