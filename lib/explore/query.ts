/**
 * Explore's list as the URL holds it (rebranding 2.3; boards "D3.5 Filter toolbar" and "D4.7
 * Explore", approved 11 October 2026): the search, the four filters, "Only ones I qualify for",
 * the sort and how many rows are shown, so a shared link, or Back from a program, returns to
 * the same list and row. With the words the toolbar, the chips and the count say. The page, the
 * route and the client all read it; it holds no server code.
 *
 * The parameter names today's page uses stay (q, fields, countries, minPoints, maxPoints), so
 * links into Explore keep working.
 */

import { LENGTHS, isLengthYears, type LengthYears } from '@/lib/programs/duration'
import { inProse } from '@/lib/programs/country-prose'
import type { BestFitMode, ExploreViewer } from './types'

export type ExploreSort = 'relevant' | 'best' | 'low' | 'high'

export const SORT_LABELS: Record<ExploreSort, string> = {
  relevant: 'Most relevant',
  best: 'Best fit',
  low: 'Lowest points needed',
  high: 'Highest points needed'
}

/**
 * The sorts on offer, the default first (board "D3.5 Sort · best fit", approved 22 October
 * 2026). Best fit needs grades to fit against. With nothing typed, "Most relevant" leaves the
 * menu: without words the search ranks by the highest minimum alone, so it would be "Highest
 * points needed" under another name.
 */
export function sortMenu(q: string, bestFit: boolean): ExploreSort[] {
  if (q === '') return bestFit ? ['best', 'low', 'high'] : ['high', 'low']
  return bestFit ? ['relevant', 'best', 'low', 'high'] : ['relevant', 'low', 'high']
}

/**
 * The order a list is shown in: the sort the student picked, while the menu offers it, else the
 * visitor's default. So typing words makes "Most relevant" the default and clearing them brings
 * Best fit back, while a picked sort stays. Today's `?sort=relevant` with nothing typed is
 * "Highest points needed", the order it always gave.
 */
export function shownSort(query: Pick<ExploreQuery, 'q' | 'sort'>, bestFit: boolean): ExploreSort {
  const menu = sortMenu(query.q, bestFit)
  if (query.sort && menu.includes(query.sort)) return query.sort
  if (query.sort === 'relevant') return 'high'
  return menu[0]
}

/**
 * The line under the count while the list is in Best fit, and Sort's description: "Your
 * countries and fields come first; in each, the ones you meet, closest to your 38." Open to
 * anywhere, every country is the student's, so their fields alone come first. The fallback
 * switch's one search (`lifted`) only lifts the countries and fields, so its line says only
 * that; with "Only ones I qualify for" on, the whole list is read anyway, in the full order.
 */
export function bestFitLine(
  viewer: Pick<ExploreViewer, 'fields' | 'countries' | 'total'>,
  mode: Exclude<BestFitMode, 'off'>,
  qualify: boolean
): string | null {
  const yours =
    viewer.countries.length > 0 && viewer.fields.length > 0
      ? 'Your countries and fields'
      : viewer.countries.length > 0
        ? 'Your countries'
        : viewer.fields.length > 0
          ? 'Your fields'
          : null
  if (mode === 'lifted' && !qualify) return yours ? `${yours} come first.` : null
  const closest = viewer.total !== null ? `, closest to your ${viewer.total}` : ''
  return yours
    ? `${yours} come first; in each, the ones you meet${closest}.`
    : `The ones you meet come first${closest}.`
}

export interface ExploreQuery {
  /** What was typed, trimmed */
  q: string
  /** Field of study ids */
  fields: string[]
  /** Country ids */
  countries: string[]
  /** The program's minimum, from and to: whole numbers from 24 to 45, or null for any */
  from: number | null
  to: number | null
  /** Include programs with no IB minimum; ticked unless the student unticks it */
  noMin: boolean
  lengths: LengthYears[]
  /** Only ones I qualify for: every requirement met, worked out on the server */
  qualify: boolean
  /** The sort the student picked; null is the visitor's default, never written to the URL */
  sort: ExploreSort | null
}

export const EMPTY_QUERY: ExploreQuery = {
  q: '',
  fields: [],
  countries: [],
  from: null,
  to: null,
  noMin: true,
  lengths: [],
  qualify: false,
  sort: null
}

/** The first rows, and what "Show 20 more" adds */
export const PAGE_SIZE = 20

/** The most rows a link brings back at once: 20 presses of "Show 20 more" */
export const MAX_SHOWN = 400

/** The range a program's minimum can take */
export const POINTS = { min: 24, max: 45 } as const

export const POINTS_ERROR = `Enter a number from ${POINTS.min} to ${POINTS.max}`

/** A typed minimum: a whole number from 24 to 45, nothing (any), or a value it can't use. */
export function readPoints(value: string): number | null | 'invalid' {
  const text = value.trim()
  if (text === '') return null
  const points = Number(text)
  return /^\d+$/.test(text) && points >= POINTS.min && points <= POINTS.max ? points : 'invalid'
}

/** Prisma ids. Anything else is dropped before it reaches a search filter. */
const ID = /^c[a-z0-9]{24}$/

export function isId(value: string): boolean {
  return ID.test(value)
}

interface ParamsLike {
  get(name: string): string | null
}

/** The list a URL asks for, and how many rows it had shown. Unusable values are ignored. */
export function readExplore(params: ParamsLike): { query: ExploreQuery; shown: number } {
  const list = (name: string) => [...new Set((params.get(name) ?? '').split(',').filter(isId))]
  const points = (name: string) => {
    const value = readPoints(params.get(name) ?? '')
    return value === 'invalid' ? null : value
  }
  let from = points('minPoints')
  let to = points('maxPoints')
  if (from !== null && to !== null && from > to) [from, to] = [to, from]
  const lengths = (params.get('length') ?? '').split(',').map(Number).filter(isLengthYears)
  const sort = (Object.keys(SORT_LABELS) as ExploreSort[]).find((s) => s === params.get('sort'))
  const shown = Number(params.get('shown'))
  return {
    query: {
      q: (params.get('q') ?? '').trim().slice(0, 200),
      fields: list('fields'),
      countries: list('countries'),
      from,
      to,
      noMin: params.get('noMin') !== '0',
      lengths: LENGTHS.map((l) => l.years).filter((years) => lengths.includes(years)),
      qualify: params.get('qualify') === '1',
      sort: sort ?? null
    },
    shown: Number.isInteger(shown)
      ? Math.min(MAX_SHOWN, Math.max(PAGE_SIZE, Math.ceil(shown / PAGE_SIZE) * PAGE_SIZE))
      : PAGE_SIZE
  }
}

/** The URL's parameters for a list, leaving out what is the default. */
export function exploreParams(query: ExploreQuery, shown = PAGE_SIZE): URLSearchParams {
  const params = new URLSearchParams()
  if (query.q) params.set('q', query.q)
  if (query.fields.length > 0) params.set('fields', query.fields.join(','))
  if (query.countries.length > 0) params.set('countries', query.countries.join(','))
  if (query.from !== null) params.set('minPoints', String(query.from))
  if (query.to !== null) params.set('maxPoints', String(query.to))
  if (!query.noMin) params.set('noMin', '0')
  if (query.lengths.length > 0) params.set('length', query.lengths.join(','))
  if (query.qualify) params.set('qualify', '1')
  if (query.sort !== null) params.set('sort', query.sort)
  if (shown > PAGE_SIZE) params.set('shown', String(shown))
  return params
}

export const EXPLORE_PATH = '/programs/search'

/**
 * The list route's URL for a window of the list: the page's own parameters, then `offset` and
 * `limit`. Neither name is one of the page's: `length` is the Length filter.
 */
export function exploreListUrl(query: ExploreQuery, offset: number, limit: number): string {
  const params = exploreParams(query)
  params.set('offset', String(offset))
  params.set('limit', String(limit))
  return `/api/programs/explore?${params}`
}

export function exploreHref(query: ExploreQuery, shown = PAGE_SIZE): string {
  const params = exploreParams(query, shown).toString()
  return params ? `${EXPLORE_PATH}?${params}` : EXPLORE_PATH
}

/** Where Save, pressed on a row, asks to save a program on the way back */
export const SAVE_PARAM = 'save'

/**
 * Explore as it is, asking to save a program when the student comes back: where first run
 * returns after Save without grades (rebranding 3.1). The same search, filters and rows shown.
 */
export function exploreSaveHref(query: ExploreQuery, shown: number, programId: string): string {
  const params = exploreParams(query, shown)
  params.set(SAVE_PARAM, programId)
  return `${EXPLORE_PATH}?${params}`
}

/** How many of the four filters' choices are made: "Filters · 3" on a phone */
export function chosenCount(query: ExploreQuery): number {
  return (
    query.fields.length +
    query.countries.length +
    (query.from !== null || query.to !== null ? 1 : 0) +
    (query.noMin ? 0 : 1) +
    query.lengths.length
  )
}

/** "up to 38", "from 34", "34 to 40": the IB points chip once a range applies */
export function pointsRange(from: number | null, to: number | null): string | null {
  if (from !== null && to !== null) return from === to ? `${from}` : `${from} to ${to}`
  if (to !== null) return `up to ${to}`
  if (from !== null) return `from ${from}`
  return null
}

export interface Names {
  fields: ReadonlyMap<string, string>
  countries: ReadonlyMap<string, string>
}

export interface AppliedChip {
  key: string
  label: string
}

/** The applied filters as removable chips, in the toolbar's order, the switch last. */
export function appliedChips(query: ExploreQuery, names: Names): AppliedChip[] {
  const range = pointsRange(query.from, query.to)
  return [
    ...query.fields.map((id) => ({ key: `field:${id}`, label: names.fields.get(id) ?? 'Field' })),
    ...query.countries.map((id) => ({
      key: `country:${id}`,
      label: names.countries.get(id) ?? 'Country'
    })),
    ...(range ? [{ key: 'points', label: `${capitalise(range)} points` }] : []),
    ...(query.noMin ? [] : [{ key: 'noMin', label: 'Only with an IB minimum' }]),
    ...query.lengths.map((years) => ({
      key: `length:${years}`,
      label: LENGTHS.find((l) => l.years === years)?.label ?? `${years} years`
    })),
    ...(query.qualify ? [{ key: 'qualify', label: 'Only ones I qualify for' }] : [])
  ]
}

/** The list without one applied chip */
export function removeChip(query: ExploreQuery, key: string): ExploreQuery {
  const [kind, value] = key.split(':')
  switch (kind) {
    case 'field':
      return { ...query, fields: query.fields.filter((id) => id !== value) }
    case 'country':
      return { ...query, countries: query.countries.filter((id) => id !== value) }
    case 'points':
      return { ...query, from: null, to: null }
    case 'noMin':
      return { ...query, noMin: true }
    case 'length':
      return { ...query, lengths: query.lengths.filter((years) => String(years) !== value) }
    case 'qualify':
      return { ...query, qualify: false }
    default:
      return query
  }
}

export type FilterName = 'fields' | 'countries' | 'points' | 'lengths'

/** A menu's Clear: that filter alone */
export function clearFilter(query: ExploreQuery, filter: FilterName): ExploreQuery {
  if (filter === 'points') return { ...query, from: null, to: null, noMin: true }
  return { ...query, [filter]: [] }
}

/** "Clear all": every filter and the switch; the search and the sort stay. */
export function clearAll(query: ExploreQuery): ExploreQuery {
  return { ...EMPTY_QUERY, q: query.q, sort: query.sort }
}

/** Whether "Clear all" has anything to clear */
export function hasChoices(query: ExploreQuery): boolean {
  return chosenCount(query) > 0 || query.qualify
}

const number = new Intl.NumberFormat('en-GB')

/** "1,628 programs", "1 program" */
export function programsCount(count: number): string {
  return `${number.format(count)} ${count === 1 ? 'program' : 'programs'}`
}

/** The count over the list, its figure in bold: "73" and "programs for “computer science”" */
export function countParts(total: number, q: string): { figure: string; rest: string } {
  const [figure, ...rest] = programsCount(total).split(' ')
  return { figure, rest: `${rest.join(' ')}${q ? ` for “${q}”` : ''}` }
}

/** The menu's and the sheet's button: "Show 43 programs"; null when the count didn't arrive */
export function showLabel(total: number | null): string {
  if (total === null) return 'Show programs'
  if (total === 0) return 'No programs match'
  return `Show ${programsCount(total)}`
}

/** Under the title: "1,628 programs in 23 countries, each with its IB requirements." */
export function catalogueSummary(programs: number, countries: number): string {
  return `${programsCount(programs)} in ${number.format(countries)} countries, each with its IB requirements.`
}

/**
 * The no-results panel names what is chosen (D2.11): "There are no Medicine & Health programs in
 * the Netherlands on IB Match yet."
 */
export function noResultsText(query: ExploreQuery, names: Names): string {
  const fields = orList(query.fields.map((id) => names.fields.get(id) ?? '').filter(Boolean))
  const countries = orList(
    query.countries.map((id) => inProse(names.countries.get(id) ?? '')).filter(Boolean)
  )
  const range = pointsRange(query.from, query.to)
  const years = query.lengths.map((y) => LENGTHS.find((l) => l.years === y)?.label ?? '')
  const programs = [
    `${fields ? `${fields} ` : ''}programs`,
    query.q ? `for “${query.q}”` : '',
    countries ? `in ${countries}` : '',
    range
      ? `with a minimum ${range.startsWith('up') || range.startsWith('from') ? range : `of ${range}`}`
      : '',
    !range && !query.noMin ? 'with an IB minimum' : '',
    years.length > 0 ? `taking ${orList(years)}` : ''
  ]
    .filter(Boolean)
    .join(' ')
  return query.qualify
    ? `No ${programs} on IB Match meet every requirement with your grades yet.`
    : `There are no ${programs} on IB Match yet.`
}

/** "Canada, Ireland or the UK" */
function orList(items: string[]): string {
  if (items.length <= 1) return items[0] ?? ''
  return `${items.slice(0, -1).join(', ')} or ${items[items.length - 1]}`
}

function capitalise(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

/**
 * Sign-in that comes back to a page: the Save link ("?save=1" saves on return, 2.4) and "Sign
 * in to see which ones you qualify for", which returns to the same search.
 */
export function signInTo(path: string): string {
  return `/auth/signin?callbackUrl=${encodeURIComponent(path)}`
}
