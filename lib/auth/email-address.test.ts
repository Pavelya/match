import { describe, expect, it } from 'vitest'
import { isEmailAddress } from './email-address'

describe('isEmailAddress', () => {
  it('takes an address with a domain', () => {
    for (const value of ['maya@example.com', ' maya@example.com ', 'a.b+c@mail.school.edu']) {
      expect(isEmailAddress(value)).toBe(true)
    }
  })

  it('refuses what the board shows refused, and what is no address at all', () => {
    for (const value of [
      'maya@example',
      'maya@exam',
      'maya',
      '',
      '@example.com',
      'maya@.com',
      'ma ya@example.com',
      'maya@example.'
    ]) {
      expect(isEmailAddress(value)).toBe(false)
    }
  })
})
