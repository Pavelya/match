import { existsSync, readdirSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { GUIDE_COUNTRY_CODES, countryGuide } from './country-guides'

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
