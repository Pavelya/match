import { PAGE_DATES } from '@/lib/page-dates'
import { guideCountryName } from '@/lib/programs/country-guides'
import type { CountryGuide, GuideTable } from './types'

/*
 * What the country guide template works out from a guide's data (rebranding 4.2), kept out of the
 * components so it is unit-tested.
 */

/** A section's anchor, from its label: "Admission system" is #admission-system */
export function sectionId(label: string): string {
  return label
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/** The questions' anchor and their entry in "On this page", the same on every guide */
export const QUESTIONS_ID = 'faq'
export const QUESTIONS_LABEL = 'FAQ'

const NUMBER = /^[−-]?\d+(?:[.,]\d+)?(?:[–-]\d+(?:[.,]\d+)?)?$/

/**
 * Which columns hold only numbers, right-aligned in tabular figures. The first column heads its
 * row and stays at the left either way.
 */
export function numberColumns(table: GuideTable): boolean[] {
  return table.columns.map((_, i) => table.rows.every((row) => NUMBER.test((row[i] ?? '').trim())))
}

/** A table of numbers only is 440px wide at most on desktop */
export function isNumbersOnly(table: GuideTable): boolean {
  return numberColumns(table).every(Boolean)
}

/** "the Czech Republic": the country as a sentence reads it, from lib/programs/country-guides.ts */
export function countryName(guide: CountryGuide): string {
  const name = guideCountryName(guide.countryCode)
  if (!name) throw new Error(`No country guide for ${guide.countryCode}`)
  return name
}

/** Explore with the guide's country chosen, as today's link */
export function exploreHref(guide: CountryGuide): string {
  return `/programs/search?countries=${guide.exploreCountryId}`
}

const DATE = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC'
})

/**
 * When the guide's words last changed: the Article JSON-LD's dateModified, from
 * lib/page-dates.ts, so the date a reader sees and the one a search engine reads agree.
 */
export function lastUpdated(guide: CountryGuide): { iso: string; text: string } {
  const iso = PAGE_DATES[guide.path].modified
  return { iso, text: DATE.format(new Date(`${iso}T00:00:00Z`)) }
}
