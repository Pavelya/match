import { beforeEach, describe, expect, it, vi } from 'vitest'

// The preview switch decides which design every page renders, so a visitor must get today's
// design unless the release flag is on, and the preview key must be the only way in.

const { envMock, draftModeMock } = vi.hoisted(() => ({
  envMock: {} as { NEW_UI_FOR_EVERYONE?: 'true' | 'false'; NEW_UI_PREVIEW_KEY?: string },
  draftModeMock: vi.fn()
}))

vi.mock('server-only', () => ({}))
vi.mock('@/lib/env', () => ({ env: envMock }))
vi.mock('next/headers', () => ({ draftMode: draftModeMock }))

import { isPreviewKey, newUiForEveryone, showsNewUi } from './new-ui'

const KEY = '3f9c1a7e5b2d8046c9e1f3a5b7d90c2e4f6a8b0c1d3e5f70'

beforeEach(() => {
  vi.clearAllMocks()
  delete envMock.NEW_UI_FOR_EVERYONE
  envMock.NEW_UI_PREVIEW_KEY = KEY
  draftModeMock.mockResolvedValue({ isEnabled: false })
})

describe('isPreviewKey', () => {
  it('accepts the right key', () => {
    expect(isPreviewKey(KEY)).toBe(true)
  })

  it.each([
    ['a missing key', null],
    ['an empty key', ''],
    ['a wrong key of the same length', KEY.slice(0, -1) + '1'],
    ['a shorter key', KEY.slice(0, -1)],
    ['a longer key', KEY + '0'],
    ['the key in another case', KEY.toUpperCase()]
  ])('refuses %s', (_, key) => {
    expect(isPreviewKey(key)).toBe(false)
  })

  it('refuses every key while none is configured', () => {
    delete envMock.NEW_UI_PREVIEW_KEY

    expect(isPreviewKey(KEY)).toBe(false)
    expect(isPreviewKey('')).toBe(false)
  })
})

describe('showsNewUi', () => {
  it("gives a visitor today's design", async () => {
    expect(await showsNewUi()).toBe(false)
  })

  it('gives the new design in Draft Mode', async () => {
    draftModeMock.mockResolvedValue({ isEnabled: true })

    expect(await showsNewUi()).toBe(true)
  })

  it('gives everyone the new design once NEW_UI_FOR_EVERYONE is true', async () => {
    envMock.NEW_UI_FOR_EVERYONE = 'true'

    expect(newUiForEveryone()).toBe(true)
    expect(await showsNewUi()).toBe(true)
    expect(draftModeMock).not.toHaveBeenCalled()
  })

  it("keeps today's design when NEW_UI_FOR_EVERYONE is false", async () => {
    envMock.NEW_UI_FOR_EVERYONE = 'false'

    expect(newUiForEveryone()).toBe(false)
    expect(await showsNewUi()).toBe(false)
  })
})
