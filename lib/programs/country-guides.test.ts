import { existsSync, readdirSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { COUNTRY_GUIDES, GUIDE_COUNTRY_CODES, countryGuide } from './country-guides'

const app = path.join(process.cwd(), 'app')

describe('countryGuide', () => {
  it('names the guide and links to it', () => {
    expect(countryGuide('CA')).toEqual({
      href: '/study-in-canada-with-ib-diploma',
      title: 'Study in Canada with the IB Diploma'
    })
    expect(countryGuide('gb')?.title).toBe('Study in the UK with the IB Diploma')
    expect(countryGuide('US')?.href).toBe('/study-in-usa-with-ib-diploma')
  })

  it('has nothing for a country without a guide', () => {
    expect(countryGuide('NZ')).toBeNull()
  })

  it('links every country to a page that exists', () => {
    for (const code of GUIDE_COUNTRY_CODES) {
      const href = countryGuide(code)!.href
      expect(existsSync(path.join(app, href.slice(1), 'page.tsx')), href).toBe(true)
    }
  })

  it('covers every guide on the site', () => {
    const guides = readdirSync(app).filter((dir) => /^study-in-.+-with-ib-diploma$/.test(dir))
    const linked = GUIDE_COUNTRY_CODES.map((code) => countryGuide(code)!.href.slice(1))
    expect(linked.sort()).toEqual(guides.sort())
  })
})

describe('COUNTRY_GUIDES', () => {
  it('lists every guide once, by country name, as Home shows them (D4.1)', () => {
    expect(COUNTRY_GUIDES.map((guide) => guide.country)).toEqual([
      'Australia',
      'Austria',
      'Belgium',
      'Canada',
      'Czech Republic',
      'Denmark',
      'Estonia',
      'France',
      'Germany',
      'Hong Kong',
      'Ireland',
      'Israel',
      'Italy',
      'Japan',
      'Netherlands',
      'Poland',
      'Portugal',
      'Singapore',
      'Spain',
      'Sweden',
      'Switzerland',
      'United Kingdom',
      'United States'
    ])
  })

  it('links each country to its own guide', () => {
    expect(COUNTRY_GUIDES).toContainEqual({
      country: 'United States',
      href: '/study-in-usa-with-ib-diploma'
    })
    const hrefs = COUNTRY_GUIDES.map((guide) => guide.href)
    expect(new Set(hrefs).size).toBe(GUIDE_COUNTRY_CODES.length)
    expect(hrefs.sort()).toEqual(GUIDE_COUNTRY_CODES.map((code) => countryGuide(code)!.href).sort())
  })
})
