'use client'

import type { ReactNode } from 'react'
import { AppHeader } from './AppHeader'
import type { AccountUser } from './AccountMenu'
import { SiteFooter } from './SiteFooter'
import { SiteFrame } from './SiteFrame'
import { TabBar } from './TabBar'

/**
 * The signed-in chrome (rebranding 1.5): header with the account panel, footer and, on a phone,
 * the tab bar. For /student, and /programs when a student is signed in. Loaded through
 * chrome.tsx, so only the new design downloads it.
 */
export function AppFrame({ user, children }: { user: AccountUser; children: ReactNode }) {
  return (
    <SiteFrame header={<AppHeader user={user} />} footer={<SiteFooter />} tabBar={<TabBar />}>
      {children}
    </SiteFrame>
  )
}
