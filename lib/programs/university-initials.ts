/**
 * What a university's tile shows when it has no image (rebranding 2.2, boards "D3.1 Match card"
 * and "D4.6 Matches"): its initials on brand-soft. The stored abbreviation when it is an acronym
 * ("MIT", "UCLA", "UBC"); otherwise the initials of the name's main words. Some abbreviations
 * are words: the University of Michigan's is stored as "Michigan", so its tile reads "UM".
 */

/** Words an acronym leaves out: "University of Michigan" is UM, not UOM. */
const MINOR_WORDS = new Set(['of', 'the', 'and', 'at', 'for', 'in', 'de', 'du', 'des', 'la', 'le'])

/** The most letters derived initials take, so they fit the 48px tile on a phone. */
const MAX_DERIVED = 4

export function universityInitials(name: string, abbreviatedName: string | null): string {
  const stored = abbreviatedName?.trim()
  if (stored && /^[A-Z][A-Z0-9&]{1,4}$/.test(stored)) return stored
  const initials = name
    .split(/[\s,()/-]+/)
    .filter((word) => word && !MINOR_WORDS.has(word.toLowerCase()))
    .map((word) => word.match(/\p{L}|\p{N}/u)?.[0] ?? '')
    .join('')
    .toUpperCase()
  return initials.slice(0, MAX_DERIVED)
}
