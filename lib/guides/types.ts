import type { DatedPage } from '@/lib/page-dates'

/*
 * A country guide as data (rebranding 4.2, boards "D4.12 Country guide", "D4.12 Country guide ·
 * other guides" and "D4.12 Country guide · phone", approved 18 October 2026). Each guide's
 * `guide.ts` sits beside its page.tsx and renders through components/guide/CountryGuidePage.tsx.
 * The words are today's, headings in sentence case.
 */

/**
 * Text with **bold**, *italic* and [a link](https://…). A link to a path on IB Match
 * ("/how-it-works") opens in the same tab; any other opens in a new one and says so.
 */
export type Rich = string

export interface GuideSource {
  label: string
  /** A few sources are named without a link, as today ("Public university admission pages") */
  href?: string
}

export interface GuideTable {
  caption: string
  columns: string[]
  /** The first cell heads its row. A column of numbers only is right-aligned. */
  rows: Rich[][]
}

export interface GuideCard {
  title: string
  /** A sentence under the title */
  text?: Rich
  items?: Rich[]
  /** A line after the list */
  after?: Rich
}

export interface GuideStep {
  /** "5 November 2026" */
  date: string
  /** "12:00", under the date */
  time?: string
  /** "CAO applications open", an h3. Some steps have only a date and a sentence. */
  title?: string
  text?: Rich
}

export type GuideBlock =
  | { type: 'paragraph'; text: Rich }
  | { type: 'list'; items: Rich[] }
  /** An h3 inside a section */
  | { type: 'subheading'; text: string }
  /** The short answer: "No" in Newsreader, its line in H3, then today's words. No status colour. */
  | { type: 'answer'; word?: string; line?: string; paragraphs?: Rich[] }
  | { type: 'note'; text: Rich }
  | { type: 'caution'; text: Rich }
  | { type: 'cards'; cards: GuideCard[] }
  | { type: 'table'; table: GuideTable; note?: Rich }
  /** Two tables of one kind, side by side from 1024px */
  | { type: 'tables'; tables: [GuideTable, GuideTable]; note?: Rich }
  | { type: 'timeline'; steps: GuideStep[] }
  | { type: 'documents'; items: Rich[] }

export interface GuideSection {
  /** Its entry in "On this page", today's short label: "Recognition". Also its anchor. */
  label: string
  /** The h2: today's question or title, in sentence case */
  heading: string
  blocks: GuideBlock[]
  /** "Official source" or "Official sources", at the end of the section */
  sources?: GuideSource[]
}

export interface GuideQuestion {
  question: string
  /** The same words as the FAQPage JSON-LD in page.tsx */
  answer: string
  source?: GuideSource
}

export type CountryGuidePath = Extract<DatedPage, `/study-in-${string}`>

export interface CountryGuide {
  /** The page, whose dates come from lib/page-dates.ts */
  path: CountryGuidePath
  /** Its key in lib/programs/country-guides.ts, which names the country */
  countryCode: string
  /** Explore with the country chosen: /programs/search?countries=<id> */
  exploreCountryId: string
  /** "Official university admission guide for IB students (2027)" */
  eyebrow: string
  /** The h1 */
  title: string
  /** Today's words, without bold */
  intro: string
  /** "Last updated for the 2027 intake" */
  intake: number
  sections: GuideSection[]
  questions: {
    heading: string
    items: GuideQuestion[]
    /** Today's line after them, linking to /how-it-works */
    after: Rich
  }
  /** The paragraph in the final band */
  closing: Rich
}
