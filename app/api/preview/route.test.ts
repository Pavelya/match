import { beforeEach, describe, expect, it, vi } from 'vitest'

// The preview link is the only way to see the unreleased design. The right key turns on Draft
// Mode and sends the browser home; anything else is a 404 and changes nothing.

const { KEY, envMock, draft } = vi.hoisted(() => {
  const KEY = '3f9c1a7e5b2d8046c9e1f3a5b7d90c2e4f6a8b0c1d3e5f70'
  return {
    KEY,
    envMock: { NEW_UI_PREVIEW_KEY: KEY } as { NEW_UI_PREVIEW_KEY?: string },
    draft: { isEnabled: false, enable: vi.fn(), disable: vi.fn() }
  }
})

vi.mock('server-only', () => ({}))
vi.mock('@/lib/env', () => ({ env: envMock }))
vi.mock('next/headers', () => ({ draftMode: vi.fn(async () => draft) }))

import { NextRequest } from 'next/server'
import { GET } from './route'

function get(query: string) {
  return GET(new NextRequest(`http://localhost/api/preview${query}`))
}

beforeEach(() => {
  vi.clearAllMocks()
  envMock.NEW_UI_PREVIEW_KEY = KEY
})

describe('GET /api/preview', () => {
  it('turns on Draft Mode for the right key and redirects home', async () => {
    const res = await get(`?key=${KEY}`)

    expect(res.status).toBe(303)
    expect(res.headers.get('location')).toBe('/')
    expect(draft.enable).toHaveBeenCalledOnce()
  })

  it.each([
    ['no key', ''],
    ['an empty key', '?key='],
    ['a wrong key', `?key=${KEY.slice(0, -1)}1`],
    ['a key of a different length', `?key=${KEY}0`]
  ])('is a 404 for %s', async (_, query) => {
    const res = await get(query)

    expect(res.status).toBe(404)
    expect(draft.enable).not.toHaveBeenCalled()
  })

  it('is a 404 while no key is configured', async () => {
    delete envMock.NEW_UI_PREVIEW_KEY

    const res = await get(`?key=${KEY}`)

    expect(res.status).toBe(404)
    expect(draft.enable).not.toHaveBeenCalled()
  })

  it('never takes the redirect from the request', async () => {
    const res = await get(
      `?key=${KEY}&redirect=https://evil.example&callbackUrl=//evil.example&slug=/x`
    )

    expect(res.headers.get('location')).toBe('/')
  })
})
