/**
 * Each country's guide, keyed by the country code the program and university pages already read
 * (rebranding 2.4, boards "D4.8 Program page" and "D4.9 University page"). The country crumb in
 * their trail and the university page's guide card open it. All 23 countries on IB Match have one
 * (12 October 2026); a country added later without a guide gets no crumb and no card until it does.
 * Explore filtered to the country is not the fallback: it points search engines back to
 * /programs/search.
 */

/** `name` reads in a sentence ("Study in the UK"); `country` stands alone, as in Home's list. */
const GUIDES: Record<string, { slug: string; name: string; country: string }> = {
  AT: { slug: 'austria', name: 'Austria', country: 'Austria' },
  AU: { slug: 'australia', name: 'Australia', country: 'Australia' },
  BE: { slug: 'belgium', name: 'Belgium', country: 'Belgium' },
  CA: { slug: 'canada', name: 'Canada', country: 'Canada' },
  CH: { slug: 'switzerland', name: 'Switzerland', country: 'Switzerland' },
  CZ: { slug: 'czech-republic', name: 'the Czech Republic', country: 'Czech Republic' },
  DE: { slug: 'germany', name: 'Germany', country: 'Germany' },
  DK: { slug: 'denmark', name: 'Denmark', country: 'Denmark' },
  EE: { slug: 'estonia', name: 'Estonia', country: 'Estonia' },
  ES: { slug: 'spain', name: 'Spain', country: 'Spain' },
  FR: { slug: 'france', name: 'France', country: 'France' },
  GB: { slug: 'uk', name: 'the UK', country: 'United Kingdom' },
  HK: { slug: 'hong-kong', name: 'Hong Kong', country: 'Hong Kong' },
  IE: { slug: 'ireland', name: 'Ireland', country: 'Ireland' },
  IL: { slug: 'israel', name: 'Israel', country: 'Israel' },
  IT: { slug: 'italy', name: 'Italy', country: 'Italy' },
  JP: { slug: 'japan', name: 'Japan', country: 'Japan' },
  NL: { slug: 'netherlands', name: 'the Netherlands', country: 'Netherlands' },
  PL: { slug: 'poland', name: 'Poland', country: 'Poland' },
  PT: { slug: 'portugal', name: 'Portugal', country: 'Portugal' },
  SE: { slug: 'sweden', name: 'Sweden', country: 'Sweden' },
  SG: { slug: 'singapore', name: 'Singapore', country: 'Singapore' },
  US: { slug: 'usa', name: 'the USA', country: 'United States' }
}

export interface CountryGuide {
  /** "/study-in-canada-with-ib-diploma" */
  href: string
  /** "Study in Canada with the IB Diploma" */
  title: string
}

function guideHref(slug: string): string {
  return `/study-in-${slug}-with-ib-diploma`
}

export function countryGuide(countryCode: string): CountryGuide | null {
  const guide = GUIDES[countryCode.toUpperCase()]
  if (!guide) return null
  return {
    href: guideHref(guide.slug),
    title: `Study in ${guide.name} with the IB Diploma`
  }
}

/**
 * Every guide, by country name (rebranding 4.1, board "D4.1 Home"). Home lists them all and its
 * "Universities in 23 countries" is this list's length, so neither is typed by hand or read.
 */
export const COUNTRY_GUIDES: readonly { country: string; href: string }[] = Object.values(GUIDES)
  .map(({ slug, country }) => ({ country, href: guideHref(slug) }))
  .sort((a, b) => a.country.localeCompare(b.country, 'en'))

/** Every country code with a guide, for the test that each one is a page. */
export const GUIDE_COUNTRY_CODES = Object.keys(GUIDES)
