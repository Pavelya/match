/**
 * The country guides' rich text (lib/guides/types.ts): **bold**, *italic* and [a link](href),
 * which nest ("**[CAO](https://www.cao.ie)**"). Anything else is plain text, so a stray character
 * shows as itself rather than breaking the page. Pure, so it is unit-tested; the guide renders the
 * nodes on the server (components/guide/RichText.tsx).
 */

export type RichNode =
  | string
  | { kind: 'bold'; children: RichNode[] }
  | { kind: 'italic'; children: RichNode[] }
  | { kind: 'link'; href: string; children: RichNode[] }

export function parseRich(text: string): RichNode[] {
  const nodes: RichNode[] = []
  let plain = ''
  const flush = () => {
    if (plain) nodes.push(plain)
    plain = ''
  }
  let i = 0
  while (i < text.length) {
    if (text.startsWith('**', i)) {
      const end = text.indexOf('**', i + 2)
      if (end > i + 2) {
        flush()
        nodes.push({ kind: 'bold', children: parseRich(text.slice(i + 2, end)) })
        i = end + 2
        continue
      }
    } else if (text[i] === '*') {
      const end = text.indexOf('*', i + 1)
      if (end > i + 1 && text[end + 1] !== '*') {
        flush()
        nodes.push({ kind: 'italic', children: parseRich(text.slice(i + 1, end)) })
        i = end + 1
        continue
      }
    } else if (text[i] === '[') {
      const link = matchLink(text, i)
      if (link) {
        flush()
        nodes.push({ kind: 'link', href: link.href, children: parseRich(link.label) })
        i = link.end
        continue
      }
    }
    plain += text[i]
    i += 1
  }
  flush()
  return nodes
}

/** "[label](href)" from `start`, where the label may hold brackets of its own, and bold */
function matchLink(
  text: string,
  start: number
): { label: string; href: string; end: number } | null {
  let depth = 0
  for (let j = start; j < text.length; j++) {
    if (text[j] === '[') depth += 1
    else if (text[j] === ']') {
      depth -= 1
      if (depth === 0) {
        if (text[j + 1] !== '(') return null
        const close = text.indexOf(')', j + 2)
        if (close < 0) return null
        return { label: text.slice(start + 1, j), href: text.slice(j + 2, close), end: close + 1 }
      }
    }
  }
  return null
}

/** The words a reader sees, without the marks: for tests and the page-to-page comparison */
export function richToText(text: string): string {
  return parseRich(text).map(nodeText).join('')
}

function nodeText(node: RichNode): string {
  return typeof node === 'string' ? node : node.children.map(nodeText).join('')
}

/** A link to a page on IB Match stays in the tab; any other opens a new one */
export function isInternalHref(href: string): boolean {
  return href.startsWith('/') && !href.startsWith('//')
}
