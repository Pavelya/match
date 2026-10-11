/**
 * Explore's filters as a search-service filter string (rebranding 2.3, board "D3.5 Filter
 * toolbar"). The service takes ANDs of ORs only, so every group is one OR in parentheses.
 *
 * A record with no IB minimum has no `minimumIBPoints`, so it fails every numeric filter on it;
 * `noIBMinimum = 1` brings those programs back while their box is ticked. Today's page keeps them
 * with a "to" value and drops them with a "from" value; here the box decides.
 */

import { isId, type ExploreQuery } from './query'

export function exploreFilters(query: ExploreQuery): string | undefined {
  const parts: string[] = []

  const fields = query.fields.filter(isId)
  if (fields.length > 0) parts.push(anyOf(fields.map((id) => `fieldOfStudyId:${id}`)))

  const countries = query.countries.filter(isId)
  if (countries.length > 0) parts.push(anyOf(countries.map((id) => `countryId:${id}`)))

  const range = pointsFilter(query.from, query.to)
  if (range) parts.push(query.noMin ? anyOf([range, 'noIBMinimum = 1']) : range)
  // Only programs that have a minimum, of any value
  else if (!query.noMin) parts.push('minimumIBPoints >= 0')

  if (query.lengths.length > 0) {
    parts.push(anyOf(query.lengths.map((years) => `durationYears = ${Math.trunc(years)}`)))
  }

  return parts.length > 0 ? parts.join(' AND ') : undefined
}

function pointsFilter(from: number | null, to: number | null): string | null {
  const lower = from === null ? null : Math.trunc(from)
  const upper = to === null ? null : Math.trunc(to)
  if (lower !== null && upper !== null) return `minimumIBPoints:${lower} TO ${upper}`
  if (lower !== null) return `minimumIBPoints >= ${lower}`
  if (upper !== null) return `minimumIBPoints <= ${upper}`
  return null
}

function anyOf(filters: string[]): string {
  return filters.length === 1 ? filters[0] : `(${filters.join(' OR ')})`
}
