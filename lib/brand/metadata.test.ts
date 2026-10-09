import { describe, expect, it } from 'vitest'
import { brandIcons, organizationLogo, shareImage } from './metadata'

// The logo files are the only SEO difference between the designs, so visitors without the preview
// must keep exactly today's values until release day.

const BASE = 'https://www.ibmatch.com'

describe('brandIcons', () => {
  it("keeps today's icons for today's design", () => {
    expect(brandIcons(false)).toEqual({
      icon: { url: '/favicon.svg', type: 'image/svg+xml' },
      shortcut: '/favicon.svg',
      apple: '/favicon.svg'
    })
  })

  it('lists the PNG before the SVG, and gives iOS a PNG', () => {
    expect(brandIcons(true)).toEqual({
      icon: [
        { url: '/brand/favicon-32.png', type: 'image/png', sizes: '32x32' },
        { url: '/brand/favicon.svg', type: 'image/svg+xml' }
      ],
      apple: { url: '/brand/apple-touch-icon.png', sizes: '180x180' }
    })
  })
})

describe('shareImage', () => {
  it("keeps today's image at its declared size for today's design", () => {
    expect(shareImage(false)).toEqual({ src: '/og-image.png', width: 1024, height: 1024 })
  })

  it('declares the new image at its real size', () => {
    expect(shareImage(true)).toEqual({ src: '/brand/og-image.png', width: 1200, height: 630 })
  })
})

describe('organizationLogo', () => {
  it("keeps today's share image as the logo for today's design", () => {
    expect(organizationLogo(BASE, false)).toEqual({
      url: `${BASE}/og-image.png`,
      width: 1024,
      height: 1024
    })
  })

  it('gives the square logo in the new design', () => {
    expect(organizationLogo(BASE, true)).toEqual({
      url: `${BASE}/brand/logo-512.png`,
      width: 512,
      height: 512
    })
  })
})
