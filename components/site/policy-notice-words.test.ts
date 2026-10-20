import { describe, expect, it } from 'vitest'
import { acceptFailure, updatedDocuments } from './policy-notice-words'

describe('updatedDocuments', () => {
  it('names both documents, Terms first, with "have"', () => {
    expect(updatedDocuments({ terms: true, privacy: true })).toEqual({
      documents: [
        { title: 'Terms of Service', href: '/terms' },
        { title: 'Privacy Policy', href: '/privacy' }
      ],
      verb: 'have'
    })
  })

  it('names one document with "has", as today', () => {
    expect(updatedDocuments({ terms: true, privacy: false })).toEqual({
      documents: [{ title: 'Terms of Service', href: '/terms' }],
      verb: 'has'
    })
    expect(updatedDocuments({ terms: false, privacy: true }).documents).toEqual([
      { title: 'Privacy Policy', href: '/privacy' }
    ])
  })
})

describe('acceptFailure', () => {
  it('is signed out on 401 and a plain failure otherwise, 429 included', () => {
    expect(acceptFailure(401)).toBe('signedOut')
    expect(acceptFailure(429)).toBe('failed')
    expect(acceptFailure(500)).toBe('failed')
    expect(acceptFailure(0)).toBe('failed')
  })
})
