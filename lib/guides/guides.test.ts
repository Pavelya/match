import { readFileSync, readdirSync } from 'node:fs'
import path from 'node:path'
import { createElement, type ComponentType } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { CountryGuidePage } from '@/components/guide/CountryGuidePage'
import { countryGuide } from '@/lib/programs/country-guides'
import { QUESTIONS_ID, sectionId } from './guide'
import { parseRich, richToText, type RichNode } from './rich-text'
import type { CountryGuide, GuideBlock, GuideSource } from './types'

/*
 * The 23 country guides as data (rebranding 4.2). Until release each guide also lives in today's
 * design, as app/<guide>/<Country>Content.tsx, and an edit to one goes into the other. The last
 * test holds the two to that: it records, per guide, every way the words differ, and a change
 * made to one version alone changes the record.
 */

const appDir = path.join(__dirname, '..', '..', 'app')
const guideDirs = readdirSync(appDir).filter((name) => /^study-in-.+-with-ib-diploma$/.test(name))

// Vitest reads every guide and every page of today's design; the types are the files' exports
const guideModules = import.meta.glob('../../app/study-in-*/guide.ts', {
  eager: true
}) as unknown as Record<string, { guide: CountryGuide }>
const contentModules = import.meta.glob('../../app/study-in-*/*Content.tsx', {
  eager: true
}) as unknown as Record<string, Record<string, ComponentType>>
const moduleIn = <T>(modules: Record<string, T>, dir: string): T => {
  const key = Object.keys(modules).find((file) => file.includes(`/${dir}/`))
  if (!key) throw new Error(`Nothing in app/${dir}`)
  return modules[key]
}
const guideOf = (dir: string) => moduleIn(guideModules, dir).guide

function everyRich(guide: CountryGuide): string[] {
  const out = [guide.questions.after, guide.closing]
  const block = (b: GuideBlock) => {
    if (b.type === 'paragraph' || b.type === 'note' || b.type === 'caution') out.push(b.text)
    if (b.type === 'list' || b.type === 'documents') out.push(...b.items)
    if (b.type === 'answer') out.push(...(b.paragraphs ?? []))
    if (b.type === 'cards')
      b.cards.forEach((c) =>
        out.push(...[c.text, c.after, ...(c.items ?? [])].filter((x) => x !== undefined))
      )
    if (b.type === 'table') out.push(...b.table.rows.flat(), ...(b.note ? [b.note] : []))
    if (b.type === 'tables')
      out.push(...b.tables.flatMap((t) => t.rows.flat()), ...(b.note ? [b.note] : []))
    if (b.type === 'timeline') out.push(...b.steps.flatMap((s) => (s.text ? [s.text] : [])))
  }
  guide.sections.forEach((s) => s.blocks.forEach(block))
  return out
}

const plainParts = (nodes: RichNode[]): string[] =>
  nodes.flatMap((n) => (typeof n === 'string' ? [n] : plainParts(n.children)))

const everySource = (guide: CountryGuide): GuideSource[] => [
  ...guide.sections.flatMap((s) => s.sources ?? []),
  ...guide.questions.items.flatMap((q) => (q.source ? [q.source] : []))
]

describe('the country guides', () => {
  it('has a guide.ts beside every guide page', () => {
    expect(Object.keys(guideModules)).toHaveLength(guideDirs.length)
  })

  it.each(guideDirs)('%s is its own page and its country has a guide', (dir) => {
    const guide = guideOf(dir)
    expect(guide.path).toBe(`/${dir}`)
    expect(countryGuide(guide.countryCode)?.href).toBe(guide.path)
  })

  it.each(guideDirs)('%s gives every section its own anchor', (dir) => {
    const ids = guideOf(dir).sections.map((s) => sectionId(s.label))
    expect(new Set(ids).size).toBe(ids.length)
    expect(ids).not.toContain(QUESTIONS_ID)
    expect(ids.every(Boolean)).toBe(true)
  })

  it.each(guideDirs)('%s names every source, and links each to a page', (dir) => {
    for (const source of everySource(guideOf(dir))) {
      expect(source.label).not.toMatch(/^(https?:\/\/|www\.)/)
      if (source.href) expect(source.href).toMatch(/^https?:\/\//)
    }
  })

  it.each(guideDirs)('%s captions every table and fills every row', (dir) => {
    for (const block of guideOf(dir).sections.flatMap((s) => s.blocks)) {
      const tables =
        block.type === 'table' ? [block.table] : block.type === 'tables' ? block.tables : []
      for (const table of tables) {
        expect(table.caption.trim()).not.toBe('')
        for (const row of table.rows) expect(row).toHaveLength(table.columns.length)
      }
    }
  })

  it.each(guideDirs)('%s has no stray bold, italic or link marks', (dir) => {
    for (const text of everyRich(guideOf(dir))) {
      for (const part of plainParts(parseRich(text))) expect(part).not.toMatch(/\*|\]\(/)
    }
  })

  it.each(guideDirs)('%s shows the questions its FAQPage JSON-LD answers', (dir) => {
    // page.tsx keeps the structured data (Definition of done 12); each question and answer in it
    // is on the page
    const page = readFileSync(path.join(appDir, dir, 'page.tsx'), 'utf8').replace(/\\'/g, "'")
    for (const item of guideOf(dir).questions.items) {
      expect(page).toContain(item.question)
      expect(page).toContain(item.answer)
    }
  })
})

// ------------------------------------------------------------------ today's words and the new ones

const ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' '
}
const decode = (s: string) =>
  s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, c: string) =>
    c[0] === '#'
      ? String.fromCodePoint(c[1] === 'x' ? parseInt(c.slice(2), 16) : parseInt(c.slice(1), 10))
      : (ENTITIES[c] ?? m)
  )

/** Words as a reader sees them, case and punctuation aside: headings moved to sentence case */
function words(html: string): string[] {
  return decode(
    html
      .replace(/<svg[\s\S]*?<\/svg>/g, ' ')
      .replace(/<span class="sr-only">[\s\S]*?<\/span>/g, ' ')
      .replace(/<\/(p|li|h[1-6]|div|section|td|th|caption|summary|header|a)>/g, ' ')
      .replace(/<[^>]+>/g, '')
  )
    .split(/\s+/)
    .map((w) => w.toLowerCase().replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}%€$+]+$/gu, ''))
    .filter(Boolean)
}

/** Today's guide without what moves on purpose: the short labels and the timeline's numbers */
function todaysParts(html: string) {
  const body = html
    .replace(/<h2 class="[^"]*text-blue-600[^"]*">[\s\S]*?<\/h2>/g, ' ')
    .replace(/<div class="[^"]*rounded-full bg-blue-600[^"]*">\d+<\/div>/g, ' ')
  const heroEnd = body.indexOf('</section>')
  const bandStart = body.lastIndexOf('<section')
  return {
    hero: body.slice(0, heroEnd),
    body: body.slice(heroEnd, bandStart),
    band: body.slice(bandStart)
  }
}

function newParts(html: string) {
  const pick = (re: RegExp) => html.match(re)?.[0] ?? ''
  return {
    hero: pick(/<header class="flex flex-col gap-4[\s\S]*?<\/header>/),
    body: pick(/<article[\s\S]*?<\/article>/),
    band: pick(/<section aria-labelledby="guide-cta"[\s\S]*?<\/section>/)
  }
}

/** Every run of words that differs, as "…before [-today-] {+new+} after…" */
function wordDiff(a: string[], b: string[]): string[] {
  const n = a.length
  const m = b.length
  // Longest common subsequence, from the end
  const lcs = new Uint16Array((n + 1) * (m + 1))
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      lcs[i * (m + 1) + j] =
        a[i] === b[j]
          ? lcs[(i + 1) * (m + 1) + j + 1] + 1
          : Math.max(lcs[(i + 1) * (m + 1) + j], lcs[i * (m + 1) + j + 1])
    }
  }
  const hunks: string[] = []
  let i = 0
  let j = 0
  while (i < n || j < m) {
    if (i < n && j < m && a[i] === b[j]) {
      i++
      j++
      continue
    }
    const start = i
    const removed: string[] = []
    const added: string[] = []
    while ((i < n || j < m) && !(i < n && j < m && a[i] === b[j])) {
      if (j >= m || (i < n && lcs[(i + 1) * (m + 1) + j] >= lcs[i * (m + 1) + j + 1]))
        removed.push(a[i++])
      else added.push(b[j++])
    }
    const before = a.slice(Math.max(0, start - 3), start).join(' ')
    const after = a.slice(i, i + 3).join(' ')
    hunks.push(`…${before} [-${removed.join(' ')}-] {+${added.join(' ')}+} ${after}…`)
  }
  return hunks
}

describe("today's guide and the new design", () => {
  it.each(guideDirs)('%s differ only as recorded', (dir) => {
    const Content = Object.values(moduleIn(contentModules, dir))[0]
    const today = todaysParts(renderToStaticMarkup(createElement(Content)))
    const now = newParts(
      renderToStaticMarkup(createElement(CountryGuidePage, { guide: guideOf(dir) }))
    )
    expect(now.body).not.toBe('')
    // The hero's date and the band's buttons differ on every guide, so they are checked apart
    expect({
      hero: wordDiff(words(today.hero), words(now.hero)),
      body: wordDiff(words(today.body), words(now.body)),
      band: wordDiff(words(today.band), words(now.band))
    }).toMatchSnapshot()
  })

  it.each(guideDirs)('%s keeps every question and answer word for word', (dir) => {
    const guide = guideOf(dir)
    const html = renderToStaticMarkup(createElement(CountryGuidePage, { guide }))
    for (const item of guide.questions.items) {
      expect(decode(html)).toContain(richToText(item.answer))
    }
  })
})
