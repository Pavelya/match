/**
 * Every brand asset, named once (rebranding 1.3; `04-design-system.md` §8). Nothing else names a
 * logo file: changing the mark means replacing the files in `public/brand/` and, at most, editing
 * this module. Plain values, so client components, the metadata and the emails can all import it.
 *
 * The files and their sizes were approved on the canvas board "D1.5 Logo: Lens", the share image
 * on "D1.5 Share image" (9 October 2026). One mark serves both themes.
 */
export const brand = {
  name: 'IB Match',
  /** The page mark, for 24px and up, in light and dark */
  mark: '/brand/mark.svg',
  /** The favicon drawing, its lens 25% larger so its points survive at 16 and 32px */
  favicon: '/brand/favicon.svg',
  /** The favicon for browsers without SVG icons */
  faviconPng: '/brand/favicon-32.png',
  /** 180 × 180, opaque, with square corners: iOS rounds them */
  appleTouchIcon: '/brand/apple-touch-icon.png',
  /** 80 × 80, shown at 40px: many mail apps block SVG */
  emailLogo: '/brand/logo-email.png',
  /** The page mark, full bleed: the JSON-LD Organization logo */
  logoSquare: { src: '/brand/logo-512.png', width: 512, height: 512 },
  /** The Open Graph and X card image */
  ogImage: { src: '/brand/og-image.png', width: 1200, height: 630 },
  colors: { brand: '#2B3FD6', highlight: '#D5F36B' }
} as const

/**
 * Today's design's logo files, which every page and email keeps until release day. They go at
 * cleanup (R.2), with the old screens that use them.
 */
export const legacyBrand = {
  /** "IB Match" set in live text over a blue square */
  logo: '/logo-restored.svg',
  favicon: '/favicon.svg',
  emailLogo: '/logo-email.png',
  /** A 640 × 640 JPEG, declared at the size today's metadata gives it */
  ogImage: { src: '/og-image.png', width: 1024, height: 1024 },
  /**
   * The Singapore guide's article publisher logo. The file has never existed, but today's page
   * names it and stays unchanged until release; the new design names `brand.logoSquare`.
   */
  singaporeGuideLogo: '/images/logo.png',
  colors: { brand: '#3573E5' }
} as const
