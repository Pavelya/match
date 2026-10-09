import type { Metadata } from 'next'
import { brand, legacyBrand } from './config'

/*
 * The logo files in each page's metadata and JSON-LD, for the design a request gets
 * (`showsNewUi()`). They are the only SEO differences between the two designs (rebranding 1.3,
 * Definition of done 12); everything else in the metadata stays one shared copy.
 */

/**
 * The browser icons. The new design adds a PNG for browsers without SVG icons, listed first with
 * its size so Chrome still picks the SVG, and an Apple touch icon iOS can use: it ignores an SVG.
 */
export function brandIcons(newUi: boolean): NonNullable<Metadata['icons']> {
  if (!newUi) {
    return {
      icon: { url: legacyBrand.favicon, type: 'image/svg+xml' },
      shortcut: legacyBrand.favicon,
      apple: legacyBrand.favicon
    }
  }
  return {
    icon: [
      { url: brand.faviconPng, type: 'image/png', sizes: '32x32' },
      { url: brand.favicon, type: 'image/svg+xml' }
    ],
    apple: { url: brand.appleTouchIcon, sizes: '180x180' }
  }
}

/** The Open Graph and X card image, with the size it is declared at */
export function shareImage(newUi: boolean): { src: string; width: number; height: number } {
  return newUi ? brand.ogImage : legacyBrand.ogImage
}

/**
 * The organisation's logo for JSON-LD, as an absolute URL with its size. The new design gives the
 * square logo; today's pages give the share image.
 */
export function organizationLogo(
  baseUrl: string,
  newUi: boolean
): { url: string; width: number; height: number } {
  const logo = newUi ? brand.logoSquare : legacyBrand.ogImage
  return { url: `${baseUrl}${logo.src}`, width: logo.width, height: logo.height }
}
