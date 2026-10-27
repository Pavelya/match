import { describe, expect, it } from 'vitest'
import { INVITATIONS_PATH, returnPath, signInDestination, startPageFor } from './callback-url'

describe('returnPath', () => {
  it('keeps a path on this site, with its query', () => {
    expect(returnPath('/programs/abc?save=1')).toBe('/programs/abc?save=1')
    expect(returnPath('/programs/search?q=University%20of%20Toronto')).toBe(
      '/programs/search?q=University%20of%20Toronto'
    )
    expect(returnPath('/')).toBe('/')
  })

  it('ignores anything that could lead to another site', () => {
    for (const url of [
      'https://evil.example/programs',
      '//evil.example',
      '/\\evil.example',
      '/programs\\..\\x',
      'javascript:alert(1)',
      '/programs/\nabc',
      'programs/abc'
    ]) {
      expect(returnPath(url)).toBeNull()
    }
  })

  it('ignores a missing value', () => {
    expect(returnPath(null)).toBeNull()
    expect(returnPath(undefined)).toBeNull()
    expect(returnPath('')).toBeNull()
  })
})

describe('signInDestination', () => {
  it('follows any path on this site in the new design', () => {
    expect(signInDestination('/programs/abc?save=1', true)).toBe('/programs/abc?save=1')
    expect(signInDestination(INVITATIONS_PATH, true)).toBe(INVITATIONS_PATH)
    expect(signInDestination('https://evil.example', true)).toBe('/student')
    expect(signInDestination(null, true)).toBe('/student')
  })

  it("follows only School invitations in today's design (MAINT 5.22)", () => {
    expect(signInDestination(INVITATIONS_PATH, false)).toBe('/student/invitations')
    expect(signInDestination('/programs/abc?save=1', false)).toBe('/student')
    expect(signInDestination('/student/invitations/../settings', false)).toBe('/student')
    expect(signInDestination(null, false)).toBe('/student')
  })
})

// SEC-5: where each role starts, from sign-in or from an area that isn't theirs
describe('startPageFor', () => {
  it.each([
    ['STUDENT', '/student/matches'],
    ['COORDINATOR', '/coordinator/dashboard'],
    ['PLATFORM_ADMIN', '/admin/dashboard'],
    ['UNIVERSITY_AGENT', '/'],
    [null, '/'],
    [undefined, '/']
  ])('sends %s to %s', (role, start) => {
    expect(startPageFor(role)).toBe(start)
  })
})
