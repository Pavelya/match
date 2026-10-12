/**
 * How the program and university pages show a description (rebranding 2.4, boards "D4.8 Program
 * page" and "D4.9 University page"). Pure, so it is unit-tested.
 *
 * The whole text is always in the server HTML. A description that runs past ten lines stops at
 * eight, with "Read the whole description"; one of nine or ten lines shows whole, rather than
 * hiding a line or two behind a button. Lines are estimated from the length on the server, so the
 * page never changes height as it loads (CLS 0): about 74 characters a line in the 68ch column
 * from 768px, and 38 on a phone (board: Sciences Po's 664 characters are nine lines on desktop,
 * MIT's 459 are twelve at 390px).
 */

/** A description stops at this many lines… */
export const CLAMPED_LINES = 8
/** …when it runs past this many. */
const LONGEST_SHOWN_WHOLE = 10

const CHARS_PER_LINE = { phone: 38, wide: 74 } as const

/** Where the description is cut: below 768px, and from 768px. */
export interface DescriptionClamp {
  phone: boolean
  wide: boolean
}

/** Lines the text takes at `perLine` characters, each paragraph and blank line counted. */
export function estimateLines(text: string, perLine: number): number {
  return text
    .split('\n')
    .reduce((lines, paragraph) => lines + Math.max(1, Math.ceil(paragraph.length / perLine)), 0)
}

export function descriptionClamp(text: string): DescriptionClamp {
  return {
    phone: estimateLines(text, CHARS_PER_LINE.phone) > LONGEST_SHOWN_WHOLE,
    wide: estimateLines(text, CHARS_PER_LINE.wide) > LONGEST_SHOWN_WHOLE
  }
}

const COMPETITIVE = /\n\s*\nHow competitive:\s*/

/**
 * A program's description, with its last paragraph taken out when it starts "How competitive:"
 * (486 programs, 12 October 2026): the page gives that one its own section under the
 * requirements, headed "How competitive", so the label itself goes.
 */
export function splitDescription(description: string): {
  about: string
  competitive: string | null
} {
  const match = COMPETITIVE.exec(description)
  if (!match) return { about: description.trim(), competitive: null }
  // Without its label the paragraph starts a sentence: "for fall 2025, MIT…" is "For fall 2025"
  const competitive = description.slice(match.index + match[0].length).trim()
  return {
    about: description.slice(0, match.index).trim(),
    competitive: competitive ? competitive.charAt(0).toUpperCase() + competitive.slice(1) : null
  }
}
