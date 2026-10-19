'use client'

import type { ReactNode } from 'react'
import { PublicHeader } from './PublicHeader'
import { useSiteChrome } from './site-chrome'
import { SiteFooter } from './SiteFooter'
import { SiteFrame } from './SiteFrame'

/**
 * The 404's chrome (rebranding 4.3, D4.15). Every unknown address gets the public header and footer
 * from the root layout, /student/a-typo included (components/site/nav.ts, ownsChrome). A notFound()
 * thrown under a layout that draws its own chrome (a cancelled invitation under /auth) replaces
 * that layout, so there the 404 draws them itself.
 */
export function NotFoundFrame({ children }: { children: ReactNode }) {
  if (useSiteChrome() !== 'own') return children
  return (
    <SiteFrame header={<PublicHeader />} footer={<SiteFooter />} mainElement="div">
      {children}
    </SiteFrame>
  )
}
