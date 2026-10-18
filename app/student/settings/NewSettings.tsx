'use client'

import { lazy } from 'react'
import type { SettingsProps } from './SettingsClient'

/*
 * Settings in the new design as its own chunk (rebranding 3.3), so students on today's design
 * download none of it: a client component the page imports joins the page's chunk for every
 * visitor, even when only the new design renders it (builds 1.5 and 6–7). It still renders on the
 * server. Deleted at cleanup (R.2), when the page imports SettingsClient.
 */
const SettingsClient = lazy(() =>
  import('./SettingsClient').then((m) => ({ default: m.SettingsClient }))
)

export function NewSettings(props: SettingsProps) {
  return <SettingsClient {...props} />
}
