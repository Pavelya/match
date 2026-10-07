/**
 * University image credits (content task 8.3). A credit is shown as a caption under the image,
 * never inside the description. Until October 2026 every credit was the description's last line:
 *
 *   Image attribution: By Jason Tong - Own work, CC BY-SA 3.0, https://commons.wikimedia.org/...
 *   Image: By RhinoMind - Own work, CC BY-SA 4.0, https://commons.wikimedia.org/...
 *   By Tagishsimon (talk) (Uploads) - Photo by and copyright Tagishsimon - ..., https://commons.wikimedia.org/...
 *
 * `splitImageCredit` takes such a line off a description; `creditParts` lays a credit out for the
 * caption, with each web address as a link.
 */

/** What the admin routes answer when a description still ends with a credit. */
export const CREDIT_IN_DESCRIPTION_ERROR =
  'The description ends with an image credit. Put it in the Image credit field instead, so it shows under the image.'

/** "Image attribution:" or "Image:" before a credit. The caption adds its own label. */
const LABEL = /^image(?:\s+attribution)?\s*:\s*/i

/** A line is a credit when it is labelled, or is a Wikimedia credit ("By … , https://commons.wikimedia.org/…"). */
function isCreditLine(line: string): boolean {
  return LABEL.test(line) || (/^by\s/i.test(line) && /commons\.wikimedia\.org/i.test(line))
}

/**
 * Split a description whose last line is an image credit. Returns null when the last line is not
 * one, or when nothing would be left of the description.
 */
export function splitImageCredit(
  description: string
): { description: string; credit: string } | null {
  const text = description.trimEnd()
  const lastBreak = text.lastIndexOf('\n')
  const lastLine = text.slice(lastBreak + 1).trim()
  if (!isCreditLine(lastLine)) return null

  const credit = lastLine.replace(LABEL, '').trim()
  const rest = lastBreak === -1 ? '' : text.slice(0, lastBreak).trimEnd()
  if (!credit || !rest) return null
  return { description: rest, credit }
}

export type CreditPart = { text: string } | { url: string; label: string }

/** A web address, without the comma or full stop that follows it in a sentence. */
const URL_PATTERN = /https?:\/\/[^\s,]+[^\s,.;:)]/g

/**
 * A credit as text and links. A link reads as its host ("commons.wikimedia.org"), which keeps the
 * caption short; it still opens the full address.
 */
export function creditParts(credit: string): CreditPart[] {
  const parts: CreditPart[] = []
  let last = 0
  for (const match of credit.matchAll(URL_PATTERN)) {
    const url = match[0]
    let label: string
    try {
      label = new URL(url).host.replace(/^www\./, '')
    } catch {
      continue
    }
    if (match.index > last) parts.push({ text: credit.slice(last, match.index) })
    parts.push({ url, label })
    last = match.index + url.length
  }
  if (last < credit.length) parts.push({ text: credit.slice(last) })
  return parts
}
