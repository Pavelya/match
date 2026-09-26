/**
 * Check program links (content task 3.3)
 *
 * Fetches every distinct `programUrl` and reports, for phase 4 of docs/tasks/CONTENT_tasks.md:
 *   - broken: a 4xx or 5xx after redirects
 *   - no response: a timeout, a reset or a DNS failure, after one retry
 *   - redirected: the page moved to another host or path; update the URL
 *   - soft 404: redirected to a page that at least three other URLs also land on
 *   - unverifiable: the site refuses scripted requests (401, 403, 429, a bot-wall page behind a
 *     200, or any failure on a known bot-blocked site). Open these in a browser; they are not
 *     broken.
 *   - year-pinned: the URL names an intake before the current one (`/courses/2026/`). Counted
 *     apart: most of these still answer 200, with last year's page.
 *
 * Reads the URLs with GROUP BY "programUrl", so each is fetched once however many programs
 * share it. At most 10 requests at once, with a browser User-Agent, following redirects. Reads
 * only the database; the classification is scripts/lib/link-check.ts.
 *
 * Run with:
 *   npx tsx scripts/check-program-links.ts
 *   npx tsx scripts/check-program-links.ts --university "Imperial College London" --university university-college-london
 *   npx tsx scripts/check-program-links.ts --country "United Kingdom"
 */

import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma-standalone'
import { currentEntryYear } from '@/lib/programs/entry-year'
import {
  classify,
  markSoft404s,
  pastIntakeYears,
  type Fetched,
  type LinkOutcome
} from './lib/link-check'
import { slugify } from './programs/lib/refresh-export'

const CONCURRENCY = 10
const TIMEOUT_MS = 20_000
const RETRY_TIMEOUT_MS = 40_000
/** Enough of the page to spot a bot wall, which sits at the top. */
const BODY_BYTES = 64 * 1024
const HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',
  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en-GB,en;q=0.9'
}

interface LinkRow {
  url: string
  universities: string[]
  programs: string[]
}

interface Result extends Fetched {
  outcome: LinkOutcome
  row: LinkRow
}

function parseArgs(argv: string[]) {
  const args = { universities: [] as string[], countries: [] as string[] }
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    const value = argv[i + 1]
    if ((arg === '--university' || arg === '--country') && value === undefined) {
      throw new Error(`${arg} needs a value`)
    }
    if (arg === '--university') args.universities.push(argv[++i])
    else if (arg === '--country') args.countries.push(argv[++i])
    else throw new Error(`Unknown argument: ${arg}`)
  }
  return args
}

/** The universities the filters name, or null for all of them. */
async function universityFilter(args: ReturnType<typeof parseArgs>) {
  if (args.universities.length === 0 && args.countries.length === 0) return null
  const universities = await prisma.university.findMany({
    select: { id: true, name: true, country: { select: { name: true, code: true } } }
  })
  const ids = new Set<string>()
  for (const wanted of args.universities) {
    const match = universities.find(
      (u) =>
        u.name.toLowerCase() === wanted.trim().toLowerCase() || slugify(u.name) === slugify(wanted)
    )
    if (!match) throw new Error(`No university named "${wanted}"`)
    ids.add(match.id)
  }
  for (const wanted of args.countries) {
    const key = wanted.trim().toLowerCase()
    const matches = universities.filter(
      (u) => u.country.name.toLowerCase() === key || u.country.code.toLowerCase() === key
    )
    if (matches.length === 0) throw new Error(`No university in a country named "${wanted}"`)
    for (const u of matches) ids.add(u.id)
  }
  return [...ids]
}

async function loadLinks(ids: string[] | null): Promise<LinkRow[]> {
  const filter = ids ? Prisma.sql`AND u.id IN (${Prisma.join(ids)})` : Prisma.empty
  return prisma.$queryRaw<LinkRow[]>`
    SELECT p."programUrl" AS url,
           array_agg(DISTINCT u.name) AS universities,
           array_agg(p.name ORDER BY p.name) AS programs
    FROM "AcademicProgram" p
    JOIN "University" u ON u.id = p."universityId"
    WHERE p."programUrl" IS NOT NULL AND p."programUrl" <> '' ${filter}
    GROUP BY p."programUrl"
    ORDER BY 1`
}

/** Read the first `limit` bytes of a body, then let the rest go. */
async function readStart(response: Response, limit: number): Promise<string> {
  const reader = response.body?.getReader()
  if (!reader) return ''
  const decoder = new TextDecoder()
  let text = ''
  let bytes = 0
  try {
    while (bytes < limit) {
      const { done, value } = await reader.read()
      if (done) break
      bytes += value.byteLength
      text += decoder.decode(value, { stream: true })
    }
  } finally {
    await reader.cancel().catch(() => {})
  }
  return text
}

function reason(error: unknown): string {
  if (error instanceof Error) {
    if (error.name === 'TimeoutError' || error.name === 'AbortError') return 'timeout'
    const cause = (error as Error & { cause?: { code?: string; message?: string } }).cause
    return cause?.code ?? cause?.message ?? error.message
  }
  return String(error)
}

async function fetchOnce(url: string, timeoutMs: number): Promise<Fetched> {
  try {
    const response = await fetch(url, {
      redirect: 'follow',
      headers: HEADERS,
      signal: AbortSignal.timeout(timeoutMs)
    })
    const body = response.ok
      ? await readStart(response, BODY_BYTES).catch(() => '')
      : await response.body?.cancel().then(() => undefined)
    return { url, status: response.status, finalUrl: response.url, body }
  } catch (error) {
    return { url, error: reason(error) }
  }
}

async function check(row: LinkRow): Promise<Result> {
  try {
    new URL(row.url)
  } catch {
    return { url: row.url, error: 'not a valid URL', outcome: 'broken', row }
  }
  let fetched = await fetchOnce(row.url, TIMEOUT_MS)
  if (fetched.status === undefined) fetched = await fetchOnce(row.url, RETRY_TIMEOUT_MS)
  return { ...fetched, outcome: classify(fetched), row }
}

async function pool<T, R>(items: T[], size: number, work: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = new Array(items.length)
  let next = 0
  let done = 0
  await Promise.all(
    Array.from({ length: Math.min(size, items.length) }, async () => {
      while (next < items.length) {
        const index = next++
        results[index] = await work(items[index])
        done++
        if (done % 50 === 0 || done === items.length) {
          process.stderr.write(`\r  checked ${done} of ${items.length}`)
        }
      }
    })
  )
  process.stderr.write('\n')
  return results
}

/** `Imperial College London — Physics (+2 more)` */
function who(row: LinkRow): string {
  const more = row.programs.length > 1 ? ` (+${row.programs.length - 1} more)` : ''
  return `${row.universities.join(', ')} — ${row.programs[0]}${more}`
}

function host(url: string): string {
  try {
    return new URL(url).hostname
  } catch {
    return url
  }
}

function report(results: Result[], scope: string, entryYear: number) {
  const programs = results.reduce((n, r) => n + r.row.programs.length, 0)
  const by = (outcome: LinkOutcome) => results.filter((r) => r.outcome === outcome)
  const pinned = results
    .map((r) => ({ r, years: pastIntakeYears(r.url, entryYear) }))
    .filter((p) => p.years.length > 0)

  console.log(
    `\nProgram links: ${results.length} URLs used by ${programs} programs (${scope}), ` +
      `checked ${new Date().toISOString().slice(0, 10)}\n`
  )
  const rows: Array<[string, number, string]> = [
    ['OK', by('ok').length, ''],
    ['Redirected', by('redirected').length, 'the page moved: update the URL'],
    ['Soft 404', by('soft-404').length, 'redirected to a page 3+ other URLs also land on'],
    ['Broken', by('broken').length, '4xx or 5xx'],
    ['No response', by('no-response').length, 'timeout or connection failure, after a retry'],
    ['Unverifiable', by('unverifiable').length, 'the site refuses scripts: open in a browser'],
    ['Year-pinned', pinned.length, `names an intake before ${entryYear}; counted apart`]
  ]
  for (const [label, count, note] of rows) {
    console.log(`  ${label.padEnd(13)} ${String(count).padStart(5)}   ${note}`)
  }

  const section = (title: string, items: Result[], line: (r: Result) => string[]) => {
    if (items.length === 0) return
    console.log(`\n${title} (${items.length})`)
    for (const r of items) {
      const [first, ...rest] = line(r)
      console.log(`  ${first}`)
      for (const l of rest) console.log(`      ${l}`)
    }
  }
  const status = (r: Result) => (r.status !== undefined ? String(r.status) : (r.error ?? '?'))

  section('Broken', by('broken'), (r) => [`${status(r)}  ${who(r.row)}`, r.url])
  section('No response', by('no-response'), (r) => [`${status(r)}  ${who(r.row)}`, r.url])
  section('Redirected', by('redirected'), (r) => [who(r.row), r.url, `→ ${r.finalUrl}`])

  const soft = by('soft-404')
  if (soft.length > 0) {
    console.log(`\nSoft 404 (${soft.length}), by the page they land on`)
    const targets = new Map<string, Result[]>()
    for (const r of soft) {
      const target = r.finalUrl!.replace(/[?#].*$/, '')
      targets.set(target, [...(targets.get(target) ?? []), r])
    }
    for (const [target, items] of targets) {
      console.log(`  ${target}  ← ${items.length} URLs`)
      for (const r of items) console.log(`      ${who(r.row)}\n        ${r.url}`)
    }
  }

  const unverifiable = by('unverifiable')
  if (unverifiable.length > 0) {
    console.log(`\nUnverifiable (${unverifiable.length}), by site`)
    const sites = new Map<string, Result[]>()
    for (const r of unverifiable) sites.set(host(r.url), [...(sites.get(host(r.url)) ?? []), r])
    for (const [site, items] of [...sites].sort((a, b) => b[1].length - a[1].length)) {
      const statuses = [...new Set(items.map(status))].join(', ')
      console.log(`  ${site}  ${items.length}  (${statuses})`)
      for (const r of items) console.log(`      ${who(r.row)}\n        ${r.url}`)
    }
  }

  if (pinned.length > 0) {
    console.log(`\nYear-pinned (${pinned.length}), by university`)
    const universities = new Map<string, typeof pinned>()
    for (const p of pinned) {
      const key = p.r.row.universities.join(', ')
      universities.set(key, [...(universities.get(key) ?? []), p])
    }
    for (const [university, items] of universities) {
      const years = [...new Set(items.flatMap((p) => p.years))].sort().join(', ')
      console.log(`  ${university}  ${items.length} URLs name ${years}, e.g.`)
      console.log(`      ${items[0].r.url}`)
    }
  }
  console.log('')
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const ids = await universityFilter(args)
  const links = await loadLinks(ids)
  const scope =
    ids === null ? 'all universities' : [...args.universities, ...args.countries].join(', ')
  console.log(`\n🔗 Checking ${links.length} program URLs, ${CONCURRENCY} at a time…`)
  const checked = await pool(links, CONCURRENCY, check)
  report(markSoft404s(checked), scope, currentEntryYear())
}

main()
  .catch((error) => {
    console.error(error instanceof Error ? error.message : error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
    process.exit()
  })
