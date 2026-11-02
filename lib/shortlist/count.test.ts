import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// The nav's Shortlist count lives in the page's memory, never the database (rebranding 2.5) or
// the browser's storage, which the Cookie Policy promises (MAINT 5.49): it must belong to one
// student and never guess.

beforeEach(() => {
  vi.resetModules()
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

  it('is never saved in, or read from, the browser’s storage', async () => {
    const storage = () => ({
      getItem: vi.fn(() => JSON.stringify({ user: 'maya', count: 8 })),
      setItem: vi.fn(),
      removeItem: vi.fn()
    })
    const local = storage()
    const session = storage()
    vi.stubGlobal('localStorage', local)
    vi.stubGlobal('sessionStorage', session)
    const {
      changeShortlistCount,
      clearShortlistCount,
      readShortlistCount,
      subscribeToShortlistCount,
      writeShortlistCount
    } = await load()

    expect(readShortlistCount('maya')).toBeNull()
    subscribeToShortlistCount(() => {})()
    writeShortlistCount('maya', 3)
    changeShortlistCount('maya', 1)
    clearShortlistCount()

    for (const used of [local, session]) {
      expect(used.getItem).not.toHaveBeenCalled()
      expect(used.setItem).not.toHaveBeenCalled()
      expect(used.removeItem).not.toHaveBeenCalled()
    }
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

  it('goes from the page with the account (MAINT 5.25)', async () => {
    const { clearShortlistCount, readShortlistCount, writeShortlistCount } = await load()
    writeShortlistCount('maya', 8)
    clearShortlistCount()
    expect(readShortlistCount('maya')).toBeNull()
  })
})
