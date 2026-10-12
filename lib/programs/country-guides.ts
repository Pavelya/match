/**
 * Each country's guide, keyed by the country code the program and university pages already read
 * (rebranding 2.4, boards "D4.8 Program page" and "D4.9 University page"). The country crumb in
 * their trail and the university page's guide card open it. All 23 countries on IB Match have one
 * (12 October 2026); a country added later without a guide gets no crumb and no card until it does.
 * Explore filtered to the country is not the fallback: it points search engines back to
 * /programs/search.
 */

const GUIDES: Record<string, { slug: string; name: string }> = {
  AT: { slug: 'austria', name: 'Austria' },
  AU: { slug: 'australia', name: 'Australia' },
  BE: { slug: 'belgium', name: 'Belgium' },
  CA: { slug: 'canada', name: 'Canada' },
  CH: { slug: 'switzerland', name: 'Switzerland' },
  CZ: { slug: 'czech-republic', name: 'the Czech Republic' },
  DE: { slug: 'germany', name: 'Germany' },
  DK: { slug: 'denmark', name: 'Denmark' },
  EE: { slug: 'estonia', name: 'Estonia' },
  ES: { slug: 'spain', name: 'Spain' },
  FR: { slug: 'france', name: 'France' },
  GB: { slug: 'uk', name: 'the UK' },
  HK: { slug: 'hong-kong', name: 'Hong Kong' },
  IE: { slug: 'ireland', name: 'Ireland' },
  IL: { slug: 'israel', name: 'Israel' },
  IT: { slug: 'italy', name: 'Italy' },
  JP: { slug: 'japan', name: 'Japan' },
  NL: { slug: 'netherlands', name: 'the Netherlands' },
  PL: { slug: 'poland', name: 'Poland' },
  PT: { slug: 'portugal', name: 'Portugal' },
  SE: { slug: 'sweden', name: 'Sweden' },
  SG: { slug: 'singapore', name: 'Singapore' },
  US: { slug: 'usa', name: 'the USA' }
}

export interface CountryGuide {
  /** "/study-in-canada-with-ib-diploma" */
  href: string
  /** "Study in Canada with the IB Diploma" */
  title: string
}

export function countryGuide(countryCode: string): CountryGuide | null {
  const guide = GUIDES[countryCode.toUpperCase()]
  if (!guide) return null
  return {
    href: `/study-in-${guide.slug}-with-ib-diploma`,
    title: `Study in ${guide.name} with the IB Diploma`
  }
}

/** Every country code with a guide, for the test that each one is a page. */
export const GUIDE_COUNTRY_CODES = Object.keys(GUIDES)
