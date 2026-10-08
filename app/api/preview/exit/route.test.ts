import { describe, expect, it, vi } from 'vitest'

// "Exit" on the preview bar posts here: Draft Mode goes off and the browser goes home with a GET.

const { draft } = vi.hoisted(() => ({
  draft: { isEnabled: true, enable: vi.fn(), disable: vi.fn() }
}))

vi.mock('next/headers', () => ({ draftMode: vi.fn(async () => draft) }))

import { POST } from './route'

describe('POST /api/preview/exit', () => {
  it('turns off Draft Mode and redirects home with a 303', async () => {
    const res = await POST()

    expect(res.status).toBe(303)
    expect(res.headers.get('location')).toBe('/')
    expect(draft.disable).toHaveBeenCalledOnce()
  })
})
