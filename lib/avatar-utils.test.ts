import { describe, expect, it } from 'vitest'
import { avatarPhotoUrl } from './avatar-utils'

describe('avatarPhotoUrl', () => {
  it('replaces the size Google was asked for', () => {
    expect(avatarPhotoUrl('https://lh3.googleusercontent.com/a/ACg8ocJ1x=s96-c', 64)).toBe(
      'https://lh3.googleusercontent.com/a/ACg8ocJ1x=s64-c'
    )
    expect(avatarPhotoUrl('https://lh5.googleusercontent.com/a/ACg8ocJ1x=w100-h100-p', 64)).toBe(
      'https://lh5.googleusercontent.com/a/ACg8ocJ1x=s64-c'
    )
  })

  it('adds a size to a Google photo that has none', () => {
    expect(avatarPhotoUrl('https://lh3.googleusercontent.com/a-/AOh14GiAbc', 64)).toBe(
      'https://lh3.googleusercontent.com/a-/AOh14GiAbc=s64-c'
    )
  })

  it('leaves every other URL alone', () => {
    expect(avatarPhotoUrl('https://example.com/photo.png', 64)).toBe(
      'https://example.com/photo.png'
    )
    expect(avatarPhotoUrl('https://googleusercontent.com.evil.test/a=s96', 64)).toBe(
      'https://googleusercontent.com.evil.test/a=s96'
    )
    expect(avatarPhotoUrl('not a url', 64)).toBe('not a url')
  })
})
