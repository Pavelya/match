import { afterEach, describe, expect, it, vi } from 'vitest'
import { emailBrand } from './email'

// Emails go to students, so they change on release day alone: the preview never reaches them.

afterEach(() => {
  vi.unstubAllEnvs()
})

describe('emailBrand', () => {
  it("keeps today's logo and blue until NEW_UI_FOR_EVERYONE is on", () => {
    vi.stubEnv('NEW_UI_FOR_EVERYONE', undefined)
    expect(emailBrand()).toEqual({ newUi: false, logo: '/logo-email.png', color: '#3573E5' })
    vi.stubEnv('NEW_UI_FOR_EVERYONE', 'false')
    expect(emailBrand().newUi).toBe(false)
  })

  it('gives the new mark and brand colour once it is on', () => {
    vi.stubEnv('NEW_UI_FOR_EVERYONE', 'true')
    expect(emailBrand()).toEqual({ newUi: true, logo: '/brand/logo-email.png', color: '#2B3FD6' })
  })
})
