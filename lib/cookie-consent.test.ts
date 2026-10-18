import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  ACCEPT_ALL,
  ESSENTIAL_ONLY,
  getConsent,
  hasConsentChoice,
  storeConsent
} from './cookie-consent'

// Today's banner and the new design's (D4.1) store the choice through this module, so a choice
// made in one design must read the same in the other.

class FakeStorage {
  values = new Map<string, string>()
  getItem(key: string) {
    return this.values.get(key) ?? null
  }
  setItem(key: string, value: string) {
    this.values.set(key, value)
  }
  removeItem(key: string) {
    this.values.delete(key)
  }
}

let storage: FakeStorage
let doc: { cookie: string }

beforeEach(() => {
  storage = new FakeStorage()
  doc = { cookie: '' }
  vi.stubGlobal('localStorage', storage)
  vi.stubGlobal('document', doc)
  vi.stubGlobal('window', {})
  vi.useFakeTimers({ now: new Date('2026-10-18T12:00:00Z') })
})

afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllGlobals()
})

describe('storeConsent', () => {
  it('keeps the choice in localStorage and a year-long cookie, with the time it was made', () => {
    storeConsent(ESSENTIAL_ONLY)
    const stored = {
      essential: true,
      analytics: false,
      preferences: false,
      marketing: false,
      timestamp: '2026-10-18T12:00:00.000Z'
    }
    expect(JSON.parse(storage.getItem('cookie-consent')!)).toEqual(stored)
    expect(doc.cookie).toBe(
      `cookie-consent=${encodeURIComponent(JSON.stringify(stored))}; path=/; max-age=31536000; SameSite=Lax`
    )
  })

  it('accepts every kind with Accept all', () => {
    storeConsent(ACCEPT_ALL)
    expect(getConsent()).toMatchObject({
      essential: true,
      analytics: true,
      preferences: true,
      marketing: true
    })
  })
})

describe('hasConsentChoice', () => {
  it('is false until a choice is stored', () => {
    expect(hasConsentChoice()).toBe(false)
    expect(getConsent()).toEqual({ ...ESSENTIAL_ONLY, timestamp: '' })
    storeConsent(ESSENTIAL_ONLY)
    expect(hasConsentChoice()).toBe(true)
  })

  it('clears a stored value that is not JSON, so the banner asks again', () => {
    storage.setItem('cookie-consent', '{not json')
    expect(hasConsentChoice()).toBe(false)
    expect(storage.getItem('cookie-consent')).toBeNull()
  })

  it('reads storage the browser blocks as no choice, and still sets the cookie', () => {
    const blocked = () => {
      throw new DOMException('The operation is insecure.', 'SecurityError')
    }
    vi.stubGlobal('localStorage', { getItem: blocked, setItem: blocked, removeItem: blocked })
    expect(hasConsentChoice()).toBe(false)
    storeConsent(ESSENTIAL_ONLY)
    expect(doc.cookie).toContain('cookie-consent=')
  })
})
