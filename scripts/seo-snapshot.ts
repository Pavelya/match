/**
 * SEO snapshot of one page (rebranding 1.5, Definition of done 12): the <title>, meta
 * description, canonical, robots meta, each JSON-LD block and the h1–h3 outline.
 *
 * With NEW_UI_PREVIEW_KEY set, it then opens the preview link on the same site, keeps the Draft
 * Mode cookie, fetches the page again in the new design and prints the differences. Every
 * rebranding pull request that changes a public page shows this, without and with the preview.
 *
 *   npx tsx scripts/seo-snapshot.ts https://www.ibmatch.com/study-in-uk-with-ib-diploma
 *   NEW_UI_PREVIEW_KEY=… npx tsx scripts/seo-snapshot.ts http://localhost:3000/
 *
 * It only fetches pages: no database. The key must be the one the site was started with.
 */

import {
  cookieHeader,
  diffLines,
  formatSnapshot,
  isNewUi,
  parseSeo,
  type DiffLine
} from './lib/seo-snapshot'

async function fetchPage(url: string, cookie?: string): Promise<string> {
  const response = await fetch(url, { headers: cookie ? { cookie } : {} })
  if (!response.ok) throw new Error(`${url} answered ${response.status}`)
  return response.text()
}

function printDiff(diff: DiffLine[]) {
  const changed = diff.filter((line) => line.kind !== ' ')
  if (changed.length === 0) {
    console.log('\nWith the preview: no difference.')
    return
  }
  console.log(`\nWith the preview: ${changed.length} line(s) differ (- today, + new design)`)
  diff.forEach((line, i) => {
    // Changed lines, with one line of context either side
    const near = diff.slice(Math.max(0, i - 1), i + 2).some((other) => other.kind !== ' ')
    if (near) console.log(`${line.kind} ${line.line}`)
  })
}

async function main() {
  const target = process.argv[2]
  if (!target || !/^https?:\/\//.test(target)) {
    console.error('Usage: npx tsx scripts/seo-snapshot.ts <page URL>')
    process.exit(1)
  }
  const url = new URL(target)

  const todayHtml = await fetchPage(url.href)
  const today = formatSnapshot(parseSeo(todayHtml))
  console.log(url.href)
  for (const line of today) console.log(`  ${line}`)
  if (isNewUi(todayHtml)) {
    console.log(
      '\nThis site already gives everyone the new design, so there is nothing to compare.'
    )
    return
  }

  const key = process.env.NEW_UI_PREVIEW_KEY
  if (!key) {
    console.log('\nNEW_UI_PREVIEW_KEY is not set, so the new design was not compared.')
    return
  }

  const preview = await fetch(`${url.origin}/api/preview?key=${encodeURIComponent(key)}`, {
    redirect: 'manual'
  })
  if (preview.status !== 303) {
    throw new Error(
      `The preview link answered ${preview.status}. Is the key the one ${url.origin} has?`
    )
  }
  const previewHtml = await fetchPage(url.href, cookieHeader(preview.headers.getSetCookie()))
  if (!isNewUi(previewHtml)) {
    throw new Error(
      'The preview link was accepted, but the page still came back in today’s design.'
    )
  }
  printDiff(diffLines(today, formatSnapshot(parseSeo(previewHtml))))
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
