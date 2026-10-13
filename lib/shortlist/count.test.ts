import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// The nav's Shortlist count lives in the browser, never the database (rebranding 2.5): it must
// belong to one student, survive blocked storage, and never guess.

class FakeStorage {
  values = new Map<string, string>()
  getItem(key: string) {
    return this.values.get(key) ?? null
  }
  setItem(key: string, value: string) {
    this.values.set(key, value)
  }
}

let storage: FakeStorage

beforeEach(() => {
  vi.resetModules()
  storage = new FakeStorage()
  vi.stubGlobal('localStorage', storage)
  vi.stubGlobal('window', { addEventListener: vi.fn(), removeEventListener: vi.fn() })
})

afterEach(() => vi.unstubAllGlobals())

const load = () => import('./count')

describe('the Shortlist count', () => {
  it('is unknown until a page records it', async () => {
    const { readShortlistCount, writeShortlistCount } = await load()
    expect(readShortlistCount('maya')).toBeNull()
    writeShortlistCount('maya', 8)
    expect(readShortlistCount('maya')).toBe(8)
  })

  it('belongs to the student who recorded it', async () => {
    const { readShortlistCount, writeShortlistCount } = await load()
    writeShortlistCount('maya', 8)
    expect(readShortlistCount('someone-else')).toBeNull()
  })

  it('moves with each confirmed change, never below none', async () => {
    const { changeShortlistCount, readShortlistCount, writeShortlistCount } = await load()
    writeShortlistCount('maya', 1)
    changeShortlistCount('maya', -1)
    changeShortlistCount('maya', -1)
    expect(readShortlistCount('maya')).toBe(0)
    changeShortlistCount('maya', 1)
    expect(readShortlistCount('maya')).toBe(1)
  })

  it('doesn’t guess when the count is unknown', async () => {
    const { changeShortlistCount, readShortlistCount } = await load()
    changeShortlistCount('maya', 1)
    expect(readShortlistCount('maya')).toBeNull()
  })

  it('ignores a value it didn’t write', async () => {
    const { readShortlistCount } = await load()
    storage.setItem('shortlist-count', 'not json')
    expect(readShortlistCount('maya')).toBeNull()
    storage.setItem('shortlist-count', JSON.stringify({ user: 'maya', count: 'eight' }))
    expect(readShortlistCount('maya')).toBeNull()
  })

  it('lasts as long as the tab where storage is blocked', async () => {
    vi.stubGlobal('localStorage', {
      getItem: () => {
        throw new Error('blocked')
      },
      setItem: () => {
        throw new Error('blocked')
      }
    })
    const { readShortlistCount, writeShortlistCount } = await load()
    writeShortlistCount('maya', 3)
    expect(readShortlistCount('maya')).toBe(3)
  })

  it('tells the header at once', async () => {
    const { subscribeToShortlistCount, writeShortlistCount } = await load()
    const listener = vi.fn()
    const stop = subscribeToShortlistCount(listener)
    writeShortlistCount('maya', 2)
    expect(listener).toHaveBeenCalledTimes(1)
    stop()
    writeShortlistCount('maya', 3)
    expect(listener).toHaveBeenCalledTimes(1)
  })
})
