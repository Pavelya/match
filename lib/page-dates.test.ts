import { existsSync, readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { COUNTRY_PAGES, PAGE_DATES, type DatedPage } from './page-dates'

const appDir = path.join(__dirname, '..', 'app')
const pageFile = (route: DatedPage) => path.join(appDir, route, 'page.tsx')
const routes = Object.keys(PAGE_DATES) as DatedPage[]

describe('PAGE_DATES', () => {
  it('has an entry for every country page, and nothing else starting /study-in-', () => {
    const dirs = readdirSync(appDir)
      .filter((name) => /^study-in-.+-with-ib-diploma$/.test(name))
      .map((name) => `/${name}`)

    expect([...COUNTRY_PAGES].sort()).toEqual(dirs.sort())
  })

  it.each(routes)('%s is a real page that reads its dates from here', (route) => {
    expect(existsSync(pageFile(route))).toBe(true)
    expect(readFileSync(pageFile(route), 'utf8')).toContain(`pageDates('${route}')`)
  })

  it.each(routes)('%s has real dates in order', (route) => {
    const { published, modified } = PAGE_DATES[route]
    const today = new Date().toISOString().slice(0, 10)

    for (const date of [published, modified]) {
      expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(new Date(date).toISOString().slice(0, 10)).toBe(date)
    }
    expect(published <= modified).toBe(true)
    expect(modified <= today).toBe(true)
  })
})

describe('build-time dates', () => {
  // Every static page is rebuilt on a timer, so `new Date()` reports the build,
  // not the content. This is the bug `lib/page-dates.ts` exists to prevent.
  it('no page or sitemap derives dateModified or lastModified from new Date()', () => {
    const offenders = readdirSync(appDir, { recursive: true, encoding: 'utf8' })
      .filter((file) => /(^|\/)(page|sitemap)\.tsx?$/.test(file))
      .filter((file) =>
        /(dateModified|lastModified):\s*new Date\(\)/.test(
          readFileSync(path.join(appDir, file), 'utf8')
        )
      )

    expect(offenders).toEqual([])
  })
})
