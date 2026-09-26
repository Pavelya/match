import { describe, expect, it } from 'vitest'
import {
  classify,
  isBotBlocked,
  isBotWall,
  markSoft404s,
  pastIntakeYears,
  pathChanged,
  type LinkOutcome
} from './link-check'

describe('isBotBlocked', () => {
  it('matches a listed domain and its subdomains', () => {
    expect(isBotBlocked('https://www.ox.ac.uk/admissions/undergraduate/courses/physics')).toBe(true)
    expect(isBotBlocked('https://www.physics.ox.ac.uk/study')).toBe(true)
    expect(isBotBlocked('https://notox.ac.uk/')).toBe(false)
  })

  it('matches a listed path only under that path', () => {
    expect(isBotBlocked('https://www.mcgill.ca/undergraduate-admissions/program/mathematics')).toBe(
      true
    )
    expect(isBotBlocked('https://www.mcgill.ca/importantdates/')).toBe(false)
  })
})

describe('isBotWall', () => {
  it('spots the challenge pages that answer 200', () => {
    expect(isBotWall('<html><script src="/_Incapsula_Resource?SWJIYLWA=1"></script>')).toBe(true)
    expect(isBotWall('<html><head><title>Request Rejected</title></head>')).toBe(true)
    expect(isBotWall('<title>Just a moment...</title>')).toBe(true)
    expect(isBotWall('<html><title>Physics | Example University</title>')).toBe(false)
  })
})

describe('pathChanged', () => {
  it('ignores scheme, www, a trailing slash and the query', () => {
    expect(
      pathChanged('http://example.ac.uk/physics', 'https://www.example.ac.uk/physics/?x=1')
    ).toBe(false)
  })

  it('notices a new path or a new domain', () => {
    expect(
      pathChanged(
        'https://www.ubc.ca/ubc_programs/mathematics',
        'https://www.ubc.ca/programs/mathematics'
      )
    ).toBe(true)
    expect(pathChanged('https://www.ucp.pt/law', 'https://www.catolica.pt/law')).toBe(true)
  })
})

describe('pastIntakeYears', () => {
  it('finds year-pinned paths from before the current intake', () => {
    const current = 2027
    expect(
      pastIntakeYears(
        'https://www.manchester.ac.uk/study/undergraduate/courses/2026/07808/bsc-accounting/',
        current
      )
    ).toEqual([2026])
    expect(pastIntakeYears('https://ju.se/en/study/autumn-2026/business', current)).toEqual([2026])
    expect(
      pastIntakeYears('https://prog-crs.hkust.edu.hk/ugprog/2020-21/bba-gbm', current)
    ).toEqual([2020])
    expect(pastIntakeYears('https://old-en.ug.edu.pl/offer/20242025/cultural', current)).toEqual([
      2024
    ])
  })

  it('leaves the current intake, later years and embedded numbers alone', () => {
    expect(pastIntakeYears('https://example.ac.uk/courses/2027/physics', 2027)).toEqual([])
    expect(pastIntakeYears('https://example.ac.uk/vision-2030', 2027)).toEqual([])
    expect(pastIntakeYears('https://example.ac.uk/courses/120234/physics', 2027)).toEqual([])
  })
})

describe('classify', () => {
  const url = 'https://example.ac.uk/physics'

  it('reads a 200 on the same path as ok', () => {
    expect(classify({ url, status: 200, finalUrl: `${url}/` })).toBe('ok')
  })

  it('reads a 4xx or 5xx as broken', () => {
    expect(classify({ url, status: 404, finalUrl: url })).toBe('broken')
    expect(classify({ url, status: 500, finalUrl: url })).toBe('broken')
  })

  it('reads no response as no-response', () => {
    expect(classify({ url, error: 'timeout' })).toBe('no-response')
  })

  it('reads a refusal, a bot wall or a failure on a blocked site as unverifiable, not broken', () => {
    expect(classify({ url, status: 403, finalUrl: url })).toBe('unverifiable')
    expect(classify({ url, status: 429, finalUrl: url })).toBe('unverifiable')
    expect(
      classify({ url, status: 200, finalUrl: url, body: '<title>Request Rejected</title>' })
    ).toBe('unverifiable')
    expect(classify({ url: 'https://www.ucl.ac.uk/x', status: 404 })).toBe('unverifiable')
    expect(classify({ url: 'https://join.hkust.edu.hk/x', error: 'ECONNRESET' })).toBe(
      'unverifiable'
    )
  })

  it('reads a redirect to another path as redirected', () => {
    expect(classify({ url, status: 200, finalUrl: 'https://example.ac.uk/study/physics' })).toBe(
      'redirected'
    )
  })
})

describe('markSoft404s', () => {
  it('turns redirects that share a target into soft 404s', () => {
    const hub = 'https://hub.ucd.ie/menu'
    const results: Array<{ url: string; finalUrl: string; outcome: LinkOutcome }> = [
      { url: 'https://www.ucd.ie/courses/a', finalUrl: hub, outcome: 'redirected' },
      { url: 'https://www.ucd.ie/courses/b', finalUrl: `${hub}/`, outcome: 'redirected' },
      { url: 'https://www.ucd.ie/courses/c', finalUrl: hub, outcome: 'redirected' },
      {
        url: 'https://example.ac.uk/old',
        finalUrl: 'https://example.ac.uk/new',
        outcome: 'redirected'
      }
    ]
    expect(markSoft404s(results).map((r) => r.outcome)).toEqual([
      'soft-404',
      'soft-404',
      'soft-404',
      'redirected'
    ])
  })
})
