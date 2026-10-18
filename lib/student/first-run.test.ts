import { describe, expect, it } from 'vitest'
import {
  finishHref,
  firstRunHref,
  firstRunTitle,
  firstUnsavedStep,
  hasGrades,
  keptLine,
  readFirstRun,
  type FirstRunProfile
} from './first-run'

const EMPTY: FirstRunProfile = {
  totalIBPoints: null,
  openToAllLocations: false,
  preferredFields: [],
  preferredCountries: [],
  courses: []
}

describe('firstUnsavedStep', () => {
  it('opens at step 1 with no profile or no field', () => {
    expect(firstUnsavedStep(null)).toBe(1)
    expect(firstUnsavedStep(EMPTY)).toBe(1)
  })

  it('opens at step 2 once interests are saved', () => {
    expect(firstUnsavedStep({ ...EMPTY, preferredFields: ['cs'] })).toBe(2)
  })

  it('counts "Open to anywhere" as countries saved', () => {
    expect(firstUnsavedStep({ ...EMPTY, preferredFields: ['cs'], openToAllLocations: true })).toBe(
      3
    )
    expect(
      firstUnsavedStep({ ...EMPTY, preferredFields: ['cs'], preferredCountries: ['ca'] })
    ).toBe(3)
  })
})

describe('hasGrades', () => {
  it('needs subjects and a total, as hasSubjects does', () => {
    expect(hasGrades(null)).toBe(false)
    expect(hasGrades({ ...EMPTY, courses: [{}] })).toBe(false)
    expect(hasGrades({ ...EMPTY, totalIBPoints: 38 })).toBe(false)
    expect(hasGrades({ ...EMPTY, courses: [{}], totalIBPoints: 38 })).toBe(true)
  })
})

describe('words', () => {
  it('says what is kept when opening at a later step', () => {
    expect(keptLine(1)).toBeNull()
    expect(keptLine(2)).toBe('Your interests are saved.')
    expect(keptLine(3)).toBe('Your interests and countries are saved.')
  })

  it('titles the page by the step', () => {
    expect(firstRunTitle(1)).toBe('Set up your profile · Step 1 of 3 · IB Match')
    expect(firstRunTitle(2)).toBe('Set up your profile · Step 2 of 3 · IB Match')
  })
})

describe('the way there and back', () => {
  const waiting = { program: 'Computer Science', university: 'University of Toronto' }

  it('carries the return address and the waiting program', () => {
    const href = firstRunHref('/programs/abc?save=1', waiting)
    expect(href.startsWith('/student/onboarding?')).toBe(true)
    const params = new URLSearchParams(href.split('?')[1])
    expect(params.get('return')).toBe('/programs/abc?save=1')
    expect(readFirstRun(params)).toEqual({ returnTo: '/programs/abc?save=1', waiting })
  })

  it('names no program for "Add your grades"', () => {
    const params = new URLSearchParams(firstRunHref('/programs/abc').split('?')[1])
    expect(readFirstRun(params)).toEqual({ returnTo: '/programs/abc', waiting: null })
  })

  it('drops a return address off the site, and the waiting program with it', () => {
    for (const bad of ['https://evil.example/', '//evil.example', '/\\evil.example']) {
      const params = new URLSearchParams({ return: bad, ...waiting })
      expect(readFirstRun(params)).toEqual({ returnTo: null, waiting: null })
    }
  })

  it('tidies the names and caps their length', () => {
    const params = new URLSearchParams({
      return: '/programs/abc?save=1',
      program: '  Computer \n Science ',
      university: 'U'.repeat(500)
    })
    const read = readFirstRun(params)
    expect(read.waiting?.program).toBe('Computer Science')
    expect(read.waiting?.university).toHaveLength(200)
  })

  it('goes back marked as coming from first run, else to Matches', () => {
    expect(finishHref('/programs/abc?save=1')).toBe('/programs/abc?save=1&via=first-run')
    expect(finishHref('/programs/search?q=computer+science&save=abc')).toBe(
      '/programs/search?q=computer+science&save=abc&via=first-run'
    )
    expect(finishHref('/programs/abc')).toBe('/programs/abc?via=first-run')
    expect(finishHref(null)).toBe('/student/matches')
  })
})
