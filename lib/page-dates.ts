/**
 * Page Dates
 *
 * When each hand-written public page was first published and when its content last
 * changed. The page's JSON-LD (`datePublished`, `dateModified`) and `app/sitemap.ts`
 * (`lastModified`) both read from here, so the two always agree.
 *
 * Change `modified` in the same commit that changes what a page says. Never compute
 * it with `new Date()`: these pages are static and revalidate on a timer, so every
 * rebuild would claim the page changed that day, and search engines learn to ignore
 * dates that always move.
 *
 * Dates come from git. `published` is the commit that added the page; `modified` is
 * the last commit that changed its visible text, not caching, metadata or refactors.
 */

interface PageDates {
  /** YYYY-MM-DD */
  published: string
  /** YYYY-MM-DD */
  modified: string
}

export const PAGE_DATES = {
  '/': { published: '2025-12-23', modified: '2025-12-23' },
  '/for-coordinators': { published: '2025-12-23', modified: '2025-12-23' },
  // The fallback text. When a FAQ document is published in the CMS, the page uses
  // that document's date instead.
  '/faqs': { published: '2025-12-23', modified: '2025-12-23' },
  '/how-it-works': { published: '2026-01-14', modified: '2026-09-25' },
  '/ib-university-requirements': { published: '2026-01-29', modified: '2026-09-25' },

  // Country pages. `COUNTRY-PAGE-BASELINE.md` §3.2 asks every new one to add a line.
  '/study-in-australia-with-ib-diploma': { published: '2026-02-03', modified: '2026-09-25' },
  '/study-in-austria-with-ib-diploma': { published: '2026-02-18', modified: '2026-09-25' },
  '/study-in-belgium-with-ib-diploma': { published: '2026-02-24', modified: '2026-09-25' },
  '/study-in-canada-with-ib-diploma': { published: '2026-02-03', modified: '2026-09-25' },
  '/study-in-czech-republic-with-ib-diploma': { published: '2026-02-24', modified: '2026-09-25' },
  '/study-in-denmark-with-ib-diploma': { published: '2026-02-25', modified: '2026-09-25' },
  '/study-in-estonia-with-ib-diploma': { published: '2026-02-25', modified: '2026-09-25' },
  '/study-in-germany-with-ib-diploma': { published: '2026-02-03', modified: '2026-09-25' },
  '/study-in-hong-kong-with-ib-diploma': { published: '2026-02-25', modified: '2026-09-25' },
  '/study-in-ireland-with-ib-diploma': { published: '2026-02-25', modified: '2026-09-25' },
  '/study-in-israel-with-ib-diploma': { published: '2026-02-26', modified: '2026-09-25' },
  '/study-in-italy-with-ib-diploma': { published: '2026-02-03', modified: '2026-09-25' },
  '/study-in-japan-with-ib-diploma': { published: '2026-02-26', modified: '2026-09-25' },
  '/study-in-netherlands-with-ib-diploma': { published: '2026-02-26', modified: '2026-09-25' },
  '/study-in-poland-with-ib-diploma': { published: '2026-02-26', modified: '2026-09-25' },
  '/study-in-portugal-with-ib-diploma': { published: '2026-02-26', modified: '2026-09-25' },
  '/study-in-singapore-with-ib-diploma': { published: '2026-02-26', modified: '2026-09-25' },
  '/study-in-spain-with-ib-diploma': { published: '2026-02-03', modified: '2026-09-25' },
  '/study-in-sweden-with-ib-diploma': { published: '2026-02-18', modified: '2026-09-25' },
  '/study-in-switzerland-with-ib-diploma': { published: '2026-02-15', modified: '2026-09-25' },
  '/study-in-uk-with-ib-diploma': { published: '2026-02-15', modified: '2026-09-25' },
  '/study-in-usa-with-ib-diploma': { published: '2026-02-20', modified: '2026-09-25' }
} as const satisfies Record<string, PageDates>

export type DatedPage = keyof typeof PAGE_DATES

/** The country landing pages, in the order they appear above. */
export const COUNTRY_PAGES = (Object.keys(PAGE_DATES) as DatedPage[]).filter((path) =>
  path.startsWith('/study-in-')
)

/** `datePublished` and `dateModified` for a page's JSON-LD. */
export function pageDates(path: DatedPage) {
  const { published, modified } = PAGE_DATES[path]
  return { datePublished: published, dateModified: modified }
}
