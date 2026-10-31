/**
 * The Shortlist's view, its address and its words (rebranding 2.5, boards "D4.10 Shortlist",
 * "D3.7 Compare table" and their phone boards, approved 13 October 2026). Pure, so the rules are
 * unit-tested; the page only renders them. The browser downloads it.
 *
 * List and Compare each have an address (?view=compare), so Back and a reload keep the view. The
 * programs compared are kept there too (&compare=…). Desktop compares up to four, the first four
 * in the list until the student chooses; a phone compares two, the first two of that choice.
 */

import type { CardStatus } from '@/lib/matching/match-status'
import { APP_PLACES } from '@/components/site/nav'

export type ShortlistView = 'list' | 'compare'

/** Desktop columns, at most (D3.7) */
export const MOST_COMPARED = 4
/** Compare needs two, on a phone and on a desktop */
export const FEWEST_COMPARED = 2

export interface ShortlistAddress {
  view: ShortlistView
  /** Program ids in the order chosen; empty until the student chooses */
  chosen: string[]
}

const PATH = APP_PLACES.shortlist.href

export function readShortlistAddress(params: Pick<URLSearchParams, 'get'>): ShortlistAddress {
  const chosen = (params.get('compare') ?? '').split(',').filter(Boolean)
  return { view: params.get('view') === 'compare' ? 'compare' : 'list', chosen }
}

/**
 * The page's own address for a view and a choice. The list keeps the choice too, so List and
 * back to Compare compares the same programs.
 */
export function shortlistHref({ view, chosen }: ShortlistAddress): string {
  const params = new URLSearchParams()
  if (view === 'compare') params.set('view', view)
  if (chosen.length > 0) params.set('compare', chosen.join(','))
  const query = params.toString()
  // The commas stay readable
  return query ? `${PATH}?${query.replaceAll('%2C', ',')}` : PATH
}

/** Ids on the shortlist, once each, in its order */
function inListOrder(chosen: readonly string[], ids: readonly string[]): string[] {
  const wanted = new Set(chosen)
  return ids.filter((id) => wanted.has(id))
}

/**
 * The desktop table's programs: the choice, in the shortlist's order, or the first four until
 * there is a choice of at least two on the shortlist.
 */
export function desktopColumns(chosen: readonly string[], ids: readonly string[]): string[] {
  const valid = inListOrder(chosen, ids).slice(0, MOST_COMPARED)
  return valid.length >= FEWEST_COMPARED ? valid : ids.slice(0, MOST_COMPARED)
}

/**
 * Ticking or unticking one program in "Choose programs". Null when the choice can't change:
 * four are ticked already, or only two are left.
 */
export function toggleChosen(
  columns: readonly string[],
  id: string,
  on: boolean,
  ids: readonly string[]
): string[] | null {
  if (on === columns.includes(id)) return null
  if (on) {
    return columns.length >= MOST_COMPARED ? null : inListOrder([...columns, id], ids)
  }
  return columns.length <= FEWEST_COMPARED ? null : columns.filter((c) => c !== id)
}

/**
 * A phone's two programs: the first two of the choice, in the order chosen, or the first two
 * in the list. "Program 1" is the first.
 */
export function phonePair(chosen: readonly string[], ids: readonly string[]): [string, string] {
  const known = new Set(ids)
  const valid = [...new Set(chosen)].filter((id) => known.has(id))
  const [first, second] = valid.length >= FEWEST_COMPARED ? valid : ids
  return [first, second]
}

/** Picking a program in one select; picking the one the other shows swaps the two */
export function pickForPhone(
  pair: readonly [string, string],
  index: 0 | 1,
  id: string
): [string, string] {
  const other = pair[1 - index]
  if (id === other) return [pair[1], pair[0]]
  return index === 0 ? [id, other] : [other, id]
}

/** "Comparing 4 of 8" */
export function comparingLabel(compared: number, total: number): string {
  return `Comparing ${compared} of ${total}`
}

/** The line under the choices, read with each one (D3.7) */
export function chosenLine(chosen: number): string {
  const counted = `${chosen} of ${MOST_COMPARED} chosen.`
  if (chosen >= MOST_COMPARED) return `${counted} Untick one to choose another.`
  if (chosen <= FEWEST_COMPARED) return `${counted} Compare at least two.`
  return counted
}

/**
 * The summary under the title, counting each status as Matches does (D4.10): "8 programs. 4
 * meet all requirements, 2 are within reach, 1 has no set grades and 1 is missing a requirement."
 * Only the programs still saved count, so it drops as soon as one is removed.
 */
export function shortlistSummary(statuses: readonly CardStatus[]): string {
  const total = statuses.length
  if (total === 0) return 'Nothing is on your shortlist now.'
  if (total === 1) return `1 program, and it ${PHRASES[statuses[0]](1)}.`
  const parts = ORDER.map((status) => ({
    status,
    count: statuses.filter((s) => s === status).length
  })).filter((p) => p.count > 0)
  if (parts.length === 1) {
    const all = total === 2 ? 'both' : `all ${total}`
    return `${total} programs, and ${all} ${PHRASES[parts[0].status](total)}.`
  }
  const phrases = parts.map((p) => `${p.count} ${PHRASES[p.status](p.count)}`)
  return `${total} programs. ${joinWithAnd(phrases)}.`
}

const ORDER: CardStatus[] = ['meets', 'close', 'neutral', 'gap']

const PHRASES: Record<CardStatus, (count: number) => string> = {
  meets: (n) => `${n === 1 ? 'meets' : 'meet'} all requirements`,
  close: (n) => `${n === 1 ? 'is' : 'are'} within reach`,
  neutral: (n) => `${n === 1 ? 'has' : 'have'} no set grades`,
  gap: (n) => `${n === 1 ? 'is' : 'are'} missing a requirement`
}

function joinWithAnd(items: string[]): string {
  if (items.length <= 1) return items[0] ?? ''
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`
}
