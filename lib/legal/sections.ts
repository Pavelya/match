/**
 * A legal document's Markdown as the new design's legal template shows it (rebranding 4.3, board
 * "D4.14 Legal pages"): one h1, the page's own, so a leading "# " line goes (MAINT 5.23 drops it
 * from today's fallback text too); then a section per "## " heading, which "On this page" lists.
 * Whatever comes before the first "## " is the document's opening.
 */
export interface LegalSection {
  /** The jump target, from the heading: "1. Introduction" → "1-introduction" */
  id: string
  title: string
  /** The section's Markdown, under its heading */
  body: string
}

export function legalSections(markdown: string): { opening: string; sections: LegalSection[] } {
  const lines = markdown.replace(/\r\n/g, '\n').trim().split('\n')
  if (lines[0]?.startsWith('# ')) lines.shift()

  const opening: string[] = []
  const sections: LegalSection[] = []
  const used = new Map<string, number>()
  for (const line of lines) {
    if (line.startsWith('## ')) {
      const title = line.slice(3).trim()
      const base = slug(title) || 'section'
      const count = (used.get(base) ?? 0) + 1
      used.set(base, count)
      sections.push({ id: count === 1 ? base : `${base}-${count}`, title, body: '' })
    } else if (sections.length === 0) {
      opening.push(line)
    } else {
      sections[sections.length - 1].body += `${line}\n`
    }
  }
  return {
    opening: opening.join('\n').trim(),
    sections: sections.map((section) => ({ ...section, body: section.body.trim() }))
  }
}

function slug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}
