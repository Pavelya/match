import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  THEME_SCRIPT,
  THEME_STORAGE_KEY,
  applyThemeChoice,
  parseThemeChoice,
  readThemeChoice,
  saveThemeChoice,
  subscribeToThemeChoice
} from './theme'

// The head script and the switch must agree on what a stored choice means, or a reload would
// show a different theme from the one the student picked.

class FakeStorage {
  values = new Map<string, string>()
  getItem(key: string) {
    return this.values.get(key) ?? null
  }
  setItem(key: string, value: string) {
    this.values.set(key, value)
  }
}

class FakeElement {
  attributes = new Map<string, string>()
  getAttribute(name: string) {
    return this.attributes.get(name) ?? null
  }
  setAttribute(name: string, value: string) {
    this.attributes.set(name, value)
  }
  removeAttribute(name: string) {
    this.attributes.delete(name)
  }
}

let storage: FakeStorage
let root: FakeElement

beforeEach(() => {
  storage = new FakeStorage()
  root = new FakeElement()
  vi.stubGlobal('localStorage', storage)
  vi.stubGlobal('document', { documentElement: root })
  vi.stubGlobal('window', new EventTarget())
})

afterEach(() => {
  vi.unstubAllGlobals()
})

/** Runs the head script against the fakes, as the browser would before first paint. */
function runHeadScript(storageForScript: unknown = storage) {
  new Function('localStorage', 'document', THEME_SCRIPT)(storageForScript, {
    documentElement: root
  })
}

describe('parseThemeChoice', () => {
  it.each([
    ['light', 'light'],
    ['dark', 'dark'],
    ['system', 'system'],
    [null, 'system'],
    ['', 'system'],
    ['Dark', 'system'],
    ['sepia', 'system']
  ] as const)('reads %j as %s', (stored, choice) => {
    expect(parseThemeChoice(stored)).toBe(choice)
  })
})

describe('the head script', () => {
  it.each(['light', 'dark'] as const)('sets data-theme to a stored %s', (choice) => {
    storage.setItem(THEME_STORAGE_KEY, choice)
    runHeadScript()
    expect(root.getAttribute('data-theme')).toBe(choice)
  })

  it.each([null, 'system', 'sepia'])('leaves the OS in charge for %j', (stored) => {
    if (stored !== null) storage.setItem(THEME_STORAGE_KEY, stored)
    runHeadScript()
    expect(root.getAttribute('data-theme')).toBeNull()
  })

  it('does not throw when storage is blocked', () => {
    const blocked = {
      getItem() {
        throw new Error('SecurityError')
      }
    }
    expect(() => runHeadScript(blocked)).not.toThrow()
    expect(root.getAttribute('data-theme')).toBeNull()
  })

  it('agrees with readThemeChoice and applyThemeChoice for every stored value', () => {
    for (const stored of ['light', 'dark', 'system', 'other']) {
      storage.setItem(THEME_STORAGE_KEY, stored)

      runHeadScript()
      const fromScript = root.getAttribute('data-theme')
      root.removeAttribute('data-theme')

      applyThemeChoice(readThemeChoice())
      expect(root.getAttribute('data-theme')).toBe(fromScript)
      root.removeAttribute('data-theme')
    }
  })
})

describe('readThemeChoice', () => {
  it('follows the OS when nothing is stored', () => {
    expect(readThemeChoice()).toBe('system')
  })

  it('follows the OS when storage is blocked', () => {
    vi.stubGlobal('localStorage', {
      getItem() {
        throw new Error('SecurityError')
      }
    })
    expect(readThemeChoice()).toBe('system')
  })
})

describe('saveThemeChoice', () => {
  it('stores the choice and applies it', () => {
    saveThemeChoice('dark')
    expect(storage.getItem(THEME_STORAGE_KEY)).toBe('dark')
    expect(root.getAttribute('data-theme')).toBe('dark')
  })

  it('removes data-theme for System', () => {
    saveThemeChoice('light')
    saveThemeChoice('system')
    expect(storage.getItem(THEME_STORAGE_KEY)).toBe('system')
    expect(root.getAttribute('data-theme')).toBeNull()
  })

  it('still applies the choice when storage is blocked', () => {
    vi.stubGlobal('localStorage', {
      setItem() {
        throw new Error('QuotaExceededError')
      }
    })
    saveThemeChoice('dark')
    expect(root.getAttribute('data-theme')).toBe('dark')
  })

  it('tells every subscriber on the page', () => {
    const onChange = vi.fn()
    const unsubscribe = subscribeToThemeChoice(onChange)

    saveThemeChoice('light')
    expect(onChange).toHaveBeenCalledTimes(1)

    unsubscribe()
    saveThemeChoice('dark')
    expect(onChange).toHaveBeenCalledTimes(1)
  })
})

describe('subscribeToThemeChoice', () => {
  function storageEvent(key: string | null) {
    return Object.assign(new Event('storage'), { key })
  }

  it('applies a choice made in another tab', () => {
    const onChange = vi.fn()
    subscribeToThemeChoice(onChange)

    storage.setItem(THEME_STORAGE_KEY, 'dark')
    window.dispatchEvent(storageEvent(THEME_STORAGE_KEY))

    expect(root.getAttribute('data-theme')).toBe('dark')
    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it('ignores other keys', () => {
    const onChange = vi.fn()
    subscribeToThemeChoice(onChange)

    window.dispatchEvent(storageEvent('cookie-consent'))

    expect(onChange).not.toHaveBeenCalled()
  })
})
