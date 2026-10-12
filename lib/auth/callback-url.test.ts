import { describe, expect, it } from 'vitest'
import { returnPath } from './callback-url'

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
