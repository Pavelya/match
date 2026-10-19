'use client'

import { lazy, Suspense, useSyncExternalStore, type ReactNode } from 'react'
import { useSelectedLayoutSegment } from 'next/navigation'
import { hasConsentChoice } from '@/lib/cookie-consent'
import { ownsChrome } from './nav'
import { PublicHeader } from './PublicHeader'
import { SiteChromeContext } from './site-chrome'
import { SiteFooter } from './SiteFooter'
import { SiteFrame } from './SiteFrame'

const CookieBanner = lazy(() => import('./CookieBanner').then((m) => ({ default: m.CookieBanner })))

/**
 * The signed-out header and the footer round every public page (rebranding 1.5). The root
 * layout wraps every page in it, and it steps aside where a layout draws its own chrome:
 * /student and /programs, which read the session, and the staff areas. Deciding by the path
 * here keeps today's pages untouched, and a public page added later gets the chrome without
 * asking. Being on every page, it also brings the cookie banner (4.1). Loaded through
 * chrome.tsx, so only the new design downloads it.
 */
export function PublicFrame({ children }: { children: ReactNode }) {
  // The segment, not the address, so the prebuilt 404 decides alike on the server and in the
  // browser on every path (components/site/nav.ts, ownsChrome)
  const ownChrome = ownsChrome(useSelectedLayoutSegment())
  const asksForCookies = useAsksForCookies()
  return (
    <>
      {/* The 404 and error pages read which chrome they are in (site-chrome.ts) */}
      <SiteChromeContext value={ownChrome ? 'own' : 'public'}>
        {ownChrome ? (
          children
        ) : (
          // Today's public pages bring their own <main>, so the frame's is a plain block
          <SiteFrame header={<PublicHeader />} footer={<SiteFooter />} mainElement="div">
            {children}
          </SiteFrame>
        )}
      </SiteChromeContext>
      {/* Every page, this frame or not, and it stays mounted through navigation (D4.1) */}
      {asksForCookies && (
        <Suspense fallback={null}>
          <CookieBanner />
        </Suspense>
      )}
    </>
  )
}

const noSubscription = () => () => {}

/**
 * Whether this browser has no cookie choice yet. Only then is the banner downloaded, so a
 * returning visitor gets none of it. False on the server: the choice lives in the browser.
 */
function useAsksForCookies(): boolean {
  return useSyncExternalStore(
    noSubscription,
    () => !hasConsentChoice(),
    () => false
  )
}

/** /programs signed out: the same header and footer, round content that has no <main> */
export function SignedOutFrame({ children }: { children: ReactNode }) {
  return (
    <SiteFrame header={<PublicHeader />} footer={<SiteFooter />}>
      {children}
    </SiteFrame>
  )
}
