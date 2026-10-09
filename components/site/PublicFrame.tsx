'use client'

import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { hasOwnChrome } from './nav'
import { PublicHeader } from './PublicHeader'
import { SiteFooter } from './SiteFooter'
import { SiteFrame } from './SiteFrame'

/**
 * The signed-out header and the footer round every public page (rebranding 1.5). The root
 * layout wraps every page in it, and it steps aside where a layout draws its own chrome:
 * /student and /programs, which read the session, and the staff areas. Deciding by the path
 * here keeps today's pages untouched, and a public page added later gets the chrome without
 * asking. Loaded through chrome.tsx, so only the new design downloads it.
 */
export function PublicFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  if (hasOwnChrome(pathname)) return children

  // Today's public pages bring their own <main>, so the frame's is a plain block
  return (
    <SiteFrame header={<PublicHeader />} footer={<SiteFooter />} mainElement="div">
      {children}
    </SiteFrame>
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
