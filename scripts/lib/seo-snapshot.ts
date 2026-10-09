/**
 * The pure half of scripts/seo-snapshot.ts: what a search engine reads from a page, and how two
 * readings differ. No network access, so it is unit-tested. The pages are our own Next.js
 * output, so patterns are enough; there is no general HTML parser here.
 */

export interface SeoSnapshot {
  title: string | null
  description: string | null
  canonical: string | null
  robots: string | null
  /** Each JSON-LD block, re-indented so two readings compare line by line */
  jsonLd: string[]
  /** h1 to h3, in document order */
  headings: { level: number; text: string }[]
}

const ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' '
}

export function decodeEntities(text: string): string {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (entity, code: string) => {
    if (code[0] === '#') {
      const point =
        code[1] === 'x' || code[1] === 'X'
          ? parseInt(code.slice(2), 16)
          : parseInt(code.slice(1), 10)
      return Number.isFinite(point) ? String.fromCodePoint(point) : entity
    }
    return ENTITIES[code.toLowerCase()] ?? entity
  })
}

/** Visible text of a fragment: tags dropped, entities decoded, whitespace collapsed. */
function textOf(html: string): string {
  return decodeEntities(html.replace(/<[^>]*>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim()
}

function attributes(tag: string): Record<string, string> {
  const found: Record<string, string> = {}
  for (const match of tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)) {
    found[match[1].toLowerCase()] = decodeEntities(match[2] ?? match[3] ?? '')
  }
  return found
}

export function parseSeo(html: string): SeoSnapshot {
  const page = html.replace(/<!--[\s\S]*?-->/g, '')

  const title = page.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)
  const metas = [...page.matchAll(/<meta\b[^>]*>/gi)].map((m) => attributes(m[0]))
  const meta = (name: string) => metas.find((m) => m.name === name)?.content ?? null
  const canonical = [...page.matchAll(/<link\b[^>]*>/gi)]
    .map((m) => attributes(m[0]))
    .find((link) => link.rel === 'canonical')

  const jsonLd: string[] = []
  for (const script of page.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    if (attributes(script[1]).type !== 'application/ld+json') continue
    try {
      jsonLd.push(JSON.stringify(JSON.parse(script[2]), null, 2))
    } catch {
      jsonLd.push(script[2].trim())
    }
  }

  // Scripts and styles can hold text that looks like markup; a heading never sits in one
  const body = page.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, '')
  const headings = [...body.matchAll(/<h([1-3])\b[^>]*>([\s\S]*?)<\/h\1\s*>/gi)].map((m) => ({
    level: Number(m[1]),
    text: textOf(m[2])
  }))

  return {
    title: title ? textOf(title[1]) : null,
    description: meta('description'),
    canonical: canonical?.href ?? null,
    robots: meta('robots'),
    jsonLd,
    headings
  }
}

/** The snapshot as the lines the script prints, and compares. */
export function formatSnapshot(snapshot: SeoSnapshot): string[] {
  const none = '(none)'
  const lines = [
    `title        ${snapshot.title ?? none}`,
    `description  ${snapshot.description ?? none}`,
    `canonical    ${snapshot.canonical ?? none}`,
    `robots       ${snapshot.robots ?? none}`,
    `JSON-LD      ${snapshot.jsonLd.length} block${snapshot.jsonLd.length === 1 ? '' : 's'}`
  ]
  snapshot.jsonLd.forEach((block, i) => {
    lines.push(`  [${i + 1}]`)
    for (const line of block.split('\n')) lines.push(`    ${line}`)
  })
  lines.push(`headings     ${snapshot.headings.length}`)
  for (const { level, text } of snapshot.headings) {
    lines.push(`${'  '.repeat(level)}h${level} ${text}`)
  }
  return lines
}

export interface DiffLine {
  kind: ' ' | '-' | '+'
  line: string
}

/** A line diff (longest common subsequence), enough for two snapshots of a few hundred lines. */
export function diffLines(before: string[], after: string[]): DiffLine[] {
  const rows = before.length
  const cols = after.length
  const common: number[][] = Array.from({ length: rows + 1 }, () => new Array(cols + 1).fill(0))
  for (let i = rows - 1; i >= 0; i--) {
    for (let j = cols - 1; j >= 0; j--) {
      common[i][j] =
        before[i] === after[j]
          ? common[i + 1][j + 1] + 1
          : Math.max(common[i + 1][j], common[i][j + 1])
    }
  }

  const diff: DiffLine[] = []
  let i = 0
  let j = 0
  while (i < rows && j < cols) {
    if (before[i] === after[j]) {
      diff.push({ kind: ' ', line: before[i] })
      i++
      j++
    } else if (common[i + 1][j] >= common[i][j + 1]) {
      diff.push({ kind: '-', line: before[i++] })
    } else {
      diff.push({ kind: '+', line: after[j++] })
    }
  }
  while (i < rows) diff.push({ kind: '-', line: before[i++] })
  while (j < cols) diff.push({ kind: '+', line: after[j++] })
  return diff
}

/**
 * The Cookie header that carries what the preview link set (Next.js's Draft Mode cookie), from
 * the response's Set-Cookie headers.
 */
export function cookieHeader(setCookies: string[]): string {
  return setCookies
    .map((cookie) => cookie.split(';')[0].trim())
    .filter((pair) => pair.includes('='))
    .join('; ')
}

/** Whether the page was rendered in the new design (`data-ui="next"` on `<html>`). */
export function isNewUi(html: string): boolean {
  const root = html.match(/<html\b[^>]*>/i)
  return root ? attributes(root[0])['data-ui'] === 'next' : false
}
