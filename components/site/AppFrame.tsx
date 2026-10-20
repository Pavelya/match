'use client'

import { lazy, Suspense, type ReactNode } from 'react'
import { ToastProvider } from '@/components/ds/Toast'
import { AppHeader } from './AppHeader'
import type { AccountUser } from './AccountMenu'
import { FirstRunExitProvider } from './first-run-exit'
import { FocusHeader } from './FocusHeader'
import type { PolicyUpdate } from './policy-notice-words'
import { SiteFooter } from './SiteFooter'
import { ShortlistCountProvider } from './shortlist-count'
import { SiteFrame } from './SiteFrame'
import { TabBar } from './TabBar'

const PolicyNotice = lazy(() => import('./PolicyNotice').then((m) => ({ default: m.PolicyNotice })))

/**
 * The signed-in chrome (rebranding 1.5): header with the account panel, footer and, on a phone,
 * the tab bar. For /student, and /programs when a student is signed in. Loaded through
 * chrome.tsx, so only the new design downloads it. Toasts (D2.9) live here rather than in the
 * root layout: only a signed-in student saves, and a client component in the root layout would
 * join every visitor's download. The Shortlist count (2.5) is shared here too, between the header
 * and the pages that save. First run swaps the header for focus mode's (FocusHeader) and drops
 * the footer and tab bar, by the mark it puts on the page (app/globals.css). The policy update
 * notice (4.6) sits inside the toasts, which it uses, and downloads only for a student who has
 * policies to accept: the student layout passes `policyUpdate` from the check it already makes.
 */
export function AppFrame({
  user,
  policyUpdate,
  children
}: {
  user: AccountUser
  policyUpdate?: PolicyUpdate
  children: ReactNode
}) {
  return (
    <ToastProvider>
      <ShortlistCountProvider user={user.id}>
        <FirstRunExitProvider>
          <SiteFrame
            header={
              <>
                <AppHeader user={user} />
                <FocusHeader />
              </>
            }
            footer={
              <div data-app-chrome="">
                <SiteFooter />
              </div>
            }
            tabBar={
              <div data-app-chrome="">
                <TabBar />
              </div>
            }
          >
            {children}
          </SiteFrame>
          {policyUpdate && (
            <Suspense fallback={null}>
              <PolicyNotice update={policyUpdate} />
            </Suspense>
          )}
        </FirstRunExitProvider>
      </ShortlistCountProvider>
    </ToastProvider>
  )
}
