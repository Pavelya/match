/**
 * Where the new design's site chrome links go, and which link is the current page (rebranding
 * 1.5; canvas boards "D2.12 Header", "D2.13 Footer" and "D2.14 Phone tab bar"). Pure, so the
 * rules are unit-tested; the components only render them.
 */

export interface SiteLink {
  href: string
  label: string
  /**
   * Path prefixes below which the link is also current, besides its own path: Country guides
   * is current on every guide.
   */
  section?: readonly string[]
}

/** The 23 guides live at /study-in-…-with-ib-diploma; the hub that lists them is the link. */
const GUIDES_SECTION = ['/study-in-'] as const

const EXPLORE = { href: '/programs/search', label: 'Explore programs' }
const GUIDES = {
  href: '/ib-university-requirements',
  label: 'Country guides',
  section: GUIDES_SECTION
}

/** Signed out, every link is a public page (audit 1.2). From 1024px in the header, else in Menu. */
export const PUBLIC_LINKS: readonly SiteLink[] = [
  EXPLORE,
  GUIDES,
  { href: '/how-it-works', label: 'How it works' },
  { href: '/for-coordinators', label: 'For schools' }
]

/**
 * Both actions go to /student, which signs a visitor in and sends a signed-in student on to
 * Matches. Prebuilt pages never read the session, so they can't tell the two apart (D2.12).
 */
export const SIGN_IN_HREF = '/student'

/** The four places a signed-in student goes: the phone tab bar, and the desktop nav with Guides. */
export const APP_PLACES = {
  matches: { href: '/student/matches', label: 'Matches' },
  explore: { href: EXPLORE.href, label: 'Explore' },
  shortlist: { href: '/student/saved', label: 'Shortlist' },
  academic: { href: '/student/onboarding', label: 'Academic' }
} as const satisfies Record<string, SiteLink>

export const GUIDES_LINK: SiteLink = { ...GUIDES, label: 'Guides' }

export const APP_LINKS: readonly SiteLink[] = [...Object.values(APP_PLACES), GUIDES_LINK]

/** The account panel behind the avatar ("D1.4 Account menu"); Appearance and Sign out follow. */
export const ACCOUNT_LINKS: readonly SiteLink[] = [
  { href: '/student/settings', label: 'Settings' },
  { href: '/faqs', label: 'FAQs' },
  { href: '/contact', label: 'Contact' }
]

/** Three groups on every page, signed in or out. Every link today's footer has is kept. */
export const FOOTER_GROUPS: readonly { label: string; links: readonly SiteLink[] }[] = [
  {
    label: 'Students',
    links: [
      EXPLORE,
      GUIDES,
      { href: '/how-it-works', label: 'How it works' },
      { href: '/faqs', label: 'FAQs' }
    ]
  },
  {
    label: 'About',
    links: [
      { href: '/for-coordinators', label: 'For IB coordinators' },
      { href: '/support-us', label: 'Support us' },
      { href: '/contact', label: 'Contact' }
    ]
  },
  {
    label: 'Legal',
    links: [
      { href: '/privacy', label: 'Privacy' },
      { href: '/terms', label: 'Terms' },
      { href: '/cookies', label: 'Cookies' }
    ]
  }
]

function trimSlash(path: string): string {
  return path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path
}

/** The link goes to this very page. The footer marks only that. */
export function isCurrentPage(href: string, pathname: string): boolean {
  return trimSlash(pathname) === href
}

/**
 * The page is the link's or below it, or in the link's section. Header and tab bar links mark
 * this, so Matches stays current on a match's sub-page and Country guides on a guide. Explore's
 * own path is /programs/search, so a program page leaves every tab unmarked, as on the board.
 */
export function isInSection(link: Pick<SiteLink, 'href' | 'section'>, pathname: string): boolean {
  const path = trimSlash(pathname)
  if (path === link.href || path.startsWith(`${link.href}/`)) return true
  return link.section?.some((prefix) => path.startsWith(prefix)) ?? false
}

/**
 * Top-level paths whose layout draws its own chrome. /student and /programs read the session
 * and show the signed-in header when there is one; admin, coordinator and sign-in pages keep
 * theirs. Every other page is public and prebuilt, and the root layout gives it the signed-out
 * header and the footer, so a new public page gets them without asking.
 */
const OWN_CHROME = new Set(['student', 'programs', 'admin', 'coordinator', 'auth', 'api'])

export function hasOwnChrome(pathname: string): boolean {
  return OWN_CHROME.has(pathname.split('/')[1] ?? '')
}

/**
 * The phone tab bar hides while the student scrolls down and comes back on the way up, as
 * today's MobileBottomNav does (owner, 9 October 2026). `anchorY` is where it last changed.
 */
export interface TabBarScroll {
  visible: boolean
  anchorY: number
}

/** Within this distance of the top, the bar always shows. */
const NEAR_TOP = 100
/** The page must move this far from the last change before the bar changes again. */
const SCROLL_THRESHOLD = 10

/** Returns `state` itself when nothing changes, so a scroll doesn't re-render the bar. */
export function nextTabBarScroll(state: TabBarScroll, scrollY: number): TabBarScroll {
  if (Math.abs(scrollY - state.anchorY) <= SCROLL_THRESHOLD) {
    // Near the top the bar shows even after a small move
    return scrollY <= NEAR_TOP && !state.visible ? { visible: true, anchorY: scrollY } : state
  }
  return { visible: scrollY < state.anchorY || scrollY <= NEAR_TOP, anchorY: scrollY }
}
