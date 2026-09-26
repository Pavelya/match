/**
 * The pure half of scripts/check-program-links.ts: how a fetched program URL is classified.
 * No network access, so it is unit-tested.
 */

/** What a program link turned out to be. */
export type LinkOutcome =
  'ok' | 'broken' | 'no-response' | 'soft-404' | 'redirected' | 'unverifiable'

/**
 * Sites that refuse scripted requests on every URL (docs/tasks/CONTENT_tasks.md, research
 * rules). A failure there says nothing about the page, so it is unverifiable, not broken.
 * An entry with a path covers only URLs under it.
 */
export const BOT_BLOCKED = [
  'ox.ac.uk',
  'ucl.ac.uk',
  'web.ub.edu',
  'study.unimelb.edu.au',
  'nus.edu.sg',
  'admissions.smu.edu.sg',
  'cityu.edu.hk',
  'join.hkust.edu.hk',
  'mcgill.ca/undergraduate-admissions',
  'univcan.ca',
  'ouac.on.ca'
]

/** Statuses a bot wall answers with. Anywhere, they mean the page could not be read. */
const REFUSED = new Set([401, 403, 429])

/** The start of a page that is a challenge or a block, not the page asked for. */
const BOT_WALL = [
  /_Incapsula_Resource|Incapsula incident/i,
  /<title>\s*Request Rejected\s*<\/title>|The requested URL was rejected/i,
  /<title>\s*Just a moment\.\.\.\s*<\/title>/i,
  /<title>\s*Attention Required! \| Cloudflare\s*<\/title>/i,
  /\/cdn-cgi\/challenge-platform\//i,
  /errors\.edgesuite\.net/i
]

function parse(url: string): URL | null {
  try {
    return new URL(url)
  } catch {
    return null
  }
}

export function isBotBlocked(url: string, list: readonly string[] = BOT_BLOCKED): boolean {
  const parsed = parse(url)
  if (!parsed) return false
  const host = parsed.hostname.toLowerCase()
  return list.some((entry) => {
    const [domain, ...rest] = entry.split('/')
    const prefix = rest.length > 0 ? `/${rest.join('/')}` : ''
    const hostMatches = host === domain || host.endsWith(`.${domain}`)
    return hostMatches && parsed.pathname.startsWith(prefix)
  })
}

export function isBotWall(body: string): boolean {
  return BOT_WALL.some((pattern) => pattern.test(body))
}

/**
 * Host (without `www.`) and path (without a trailing slash): what a redirect has to change to
 * be reported. `http` to `https`, `www`, a trailing slash, the query and the fragment do not
 * count.
 */
function location(url: string): string {
  const parsed = parse(url)
  if (!parsed) return url
  const host = parsed.hostname.toLowerCase().replace(/^www\./, '')
  let pathname = parsed.pathname.replace(/\/+$/, '')
  try {
    pathname = decodeURI(pathname)
  } catch {
    // Keep it encoded.
  }
  return `${host}${pathname}`
}

export function pathChanged(from: string, to: string): boolean {
  return location(from) !== location(to)
}

/**
 * Intakes before `currentYear` that a URL names: `/courses/2026/`, `autumn-2026`, a
 * `2020-21` catalogue, a `20242025` offer. The first year of an academic year is its intake.
 */
export function pastIntakeYears(url: string, currentYear: number): number[] {
  const years = new Set<number>()
  for (const match of url.matchAll(/(?<!\d)(20[1-3]\d)(?:20[1-3]\d)?(?!\d)/g)) {
    const year = Number(match[1])
    if (year < currentYear) years.add(year)
  }
  return [...years].sort()
}

/** One fetch, as the checker saw it. */
export interface Fetched {
  url: string
  /** The final status after redirects; absent when there was no response. */
  status?: number
  finalUrl?: string
  /** The start of the body, for spotting a bot wall behind a 200. */
  body?: string
  /** Why there was no response: a timeout, a reset, a DNS failure. */
  error?: string
}

export function classify(f: Fetched, list: readonly string[] = BOT_BLOCKED): LinkOutcome {
  const blocked = isBotBlocked(f.url, list) || (f.finalUrl ? isBotBlocked(f.finalUrl, list) : false)
  if (f.status === undefined) return blocked ? 'unverifiable' : 'no-response'
  if (REFUSED.has(f.status)) return 'unverifiable'
  if (f.status >= 400) return blocked ? 'unverifiable' : 'broken'
  if (f.body && isBotWall(f.body)) return 'unverifiable'
  if (f.finalUrl && pathChanged(f.url, f.finalUrl)) return 'redirected'
  return 'ok'
}

/**
 * Redirect targets shared by at least `min` different URLs: a generic page standing in for
 * many missing ones (UCD's 25 course URLs all land on one menu). Keyed by target.
 */
export function sharedTargets(
  results: Array<{ url: string; finalUrl?: string; outcome: LinkOutcome }>,
  min = 3
): Map<string, string[]> {
  const byTarget = new Map<string, string[]>()
  for (const r of results) {
    if (r.outcome !== 'redirected' || !r.finalUrl) continue
    const key = location(r.finalUrl)
    byTarget.set(key, [...(byTarget.get(key) ?? []), r.url])
  }
  return new Map([...byTarget].filter(([, urls]) => urls.length >= min))
}

/** Reclassify redirects onto a shared target as soft 404s. */
export function markSoft404s<T extends { url: string; finalUrl?: string; outcome: LinkOutcome }>(
  results: T[],
  min = 3
): T[] {
  const shared = new Set([...sharedTargets(results, min).values()].flat())
  return results.map((r) => (shared.has(r.url) ? { ...r, outcome: 'soft-404' as const } : r))
}
