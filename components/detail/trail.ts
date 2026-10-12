import { countryGuide } from '@/lib/programs/country-guides'

/**
 * The trail above a program or university page (rebranding 2.4, audit 1.4), and the
 * BreadcrumbList structured data that repeats it. Pure, so both stay item for item the same.
 *
 * The trail stops above the page, whose h1 names it: Explore / Canada / University of Toronto on a
 * program page, Explore / Canada on a university page. The country opens its guide; a country
 * without one is left out of both.
 */

export interface Crumb {
  label: string
  href: string
}

const EXPLORE: Crumb = { label: 'Explore', href: '/programs/search' }

export function universityTrail(country: { code: string; name: string }): Crumb[] {
  const guide = countryGuide(country.code)
  return guide ? [EXPLORE, { label: country.name, href: guide.href }] : [EXPLORE]
}

export function programTrail(
  country: { code: string; name: string },
  university: { id: string; name: string }
): Crumb[] {
  return [
    ...universityTrail(country),
    { label: university.name, href: `/universities/${university.id}` }
  ]
}

/** The same trail for search engines, with absolute URLs. */
export function breadcrumbJsonLd(trail: Crumb[], baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.label,
      item: `${baseUrl}${crumb.href}`
    }))
  }
}
