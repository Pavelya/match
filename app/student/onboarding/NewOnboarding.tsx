'use client'

import { lazy } from 'react'
import type { FirstRunProps } from './FirstRun'

/*
 * First run in the new design, as its own chunk (rebranding 3.1). A client component the page
 * imports joins the page's download for every visitor, today's design included (builds 1.5 and
 * 6–7); this wrapper is all today's design downloads. It still renders on the server. Deleted at
 * cleanup (R.2), when the page imports FirstRun.
 */
const FirstRunFrame = lazy(() => import('./FirstRun').then((m) => ({ default: m.FirstRun })))

export function NewOnboarding(props: FirstRunProps) {
  return <FirstRunFrame {...props} />
}
