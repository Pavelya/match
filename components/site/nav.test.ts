import { describe, expect, it } from 'vitest'
import {
  APP_PLACES,
  FOOTER_GROUPS,
  GUIDES_LINK,
  PUBLIC_LINKS,
  hasOwnChrome,
  isCurrentPage,
  isInSection,
  nextTabBarScroll,
  type TabBarScroll
} from './nav'

describe('isCurrentPage', () => {
  it('marks only the page the link goes to', () => {
    expect(isCurrentPage('/faqs', '/faqs')).toBe(true)
    expect(isCurrentPage('/faqs', '/faqs/')).toBe(true)
    expect(isCurrentPage('/ib-university-requirements', '/study-in-uk-with-ib-diploma')).toBe(false)
    expect(isCurrentPage('/student/matches', '/student/matches/abc')).toBe(false)
  })
})

describe('isInSection', () => {
  const guides = PUBLIC_LINKS.find((link) => link.label === 'Country guides')!

  it('marks Country guides on the hub and on every guide', () => {
    expect(isInSection(guides, '/ib-university-requirements')).toBe(true)
    expect(isInSection(guides, '/study-in-uk-with-ib-diploma')).toBe(true)
    expect(isInSection(GUIDES_LINK, '/study-in-czech-republic-with-ib-diploma')).toBe(true)
    expect(isInSection(guides, '/how-it-works')).toBe(false)
  })

  it('keeps a place current below its own path, but not beside it', () => {
    expect(isInSection(APP_PLACES.matches, '/student/matches')).toBe(true)
    expect(isInSection(APP_PLACES.matches, '/student/matches/')).toBe(true)
    expect(isInSection(APP_PLACES.academic, '/student/onboarding/step')).toBe(true)
    expect(isInSection(APP_PLACES.matches, '/student/matchesx')).toBe(false)
  })

  it('leaves every tab unmarked on a program page', () => {
    const places = Object.values(APP_PLACES)
    expect(places.filter((link) => isInSection(link, '/programs/abc123'))).toEqual([])
    expect(places.filter((link) => isInSection(link, '/programs/search'))).toEqual([
      APP_PLACES.explore
    ])
  })
})

describe('the links', () => {
  it('signed out, never leads to a signed-in page (audit 1.2)', () => {
    const publicHrefs = [...PUBLIC_LINKS, ...FOOTER_GROUPS.flatMap((group) => group.links)].map(
      (link) => link.href
    )
    expect(publicHrefs.filter((href) => href.startsWith('/student'))).toEqual([])
  })

  it('keeps every link of the old footer', () => {
    const footerHrefs = FOOTER_GROUPS.flatMap((group) => group.links).map((link) => link.href)
    for (const href of [
      '/support-us',
      '/contact',
      '/faqs',
      '/how-it-works',
      '/privacy',
      '/terms',
      '/for-coordinators'
    ]) {
      expect(footerHrefs).toContain(href)
    }
  })
})

describe('hasOwnChrome', () => {
  it('leaves the signed-in and staff areas to their own layouts', () => {
    for (const path of [
      '/student',
      '/student/matches',
      '/programs/search',
      '/programs/abc',
      '/admin/dashboard',
      '/coordinator/students',
      '/auth/signin'
    ]) {
      expect(hasOwnChrome(path)).toBe(true)
    }
  })

  it('gives every public page the public chrome, new ones included', () => {
    for (const path of [
      '/',
      '/study-in-uk-with-ib-diploma',
      '/ib-university-requirements',
      '/universities/abc',
      '/privacy',
      '/a-page-added-later',
      '/students-guide'
    ]) {
      expect(hasOwnChrome(path)).toBe(false)
    }
  })
})

describe('nextTabBarScroll', () => {
  const scroll = (ys: number[], start: TabBarScroll = { visible: true, anchorY: 0 }) =>
    ys.reduce(nextTabBarScroll, start)

  it('hides scrolling down once more than 100px from the top', () => {
    expect(scroll([50]).visible).toBe(true)
    expect(scroll([50, 150]).visible).toBe(false)
  })

  it('shows again scrolling up by more than 10px', () => {
    expect(scroll([400, 395]).visible).toBe(false)
    expect(scroll([400, 389]).visible).toBe(true)
  })

  it('ignores moves of 10px or less from the last change', () => {
    const hidden = scroll([400])
    expect(nextTabBarScroll(hidden, 405)).toBe(hidden)
    expect(nextTabBarScroll(hidden, 390)).toBe(hidden)
  })

  it('always shows within 100px of the top', () => {
    expect(scroll([105, 98]).visible).toBe(true)
    expect(scroll([400, 0]).visible).toBe(true)
  })

  it('shows on a page too short to scroll', () => {
    expect(scroll([0, 0, 0]).visible).toBe(true)
  })
})
