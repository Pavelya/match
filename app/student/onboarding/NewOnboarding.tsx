'use client'

import { lazy } from 'react'
import type { AcademicProps } from './Academic'
import type { FirstRunProps } from './FirstRun'

/*
 * First run (rebranding 3.1) and the Academic page after it (3.3) in the new design, each as its
 * own chunk. A client component the page imports joins the page's download for every visitor,
 * today's design included (builds 1.5 and 6–7); this wrapper is all today's design downloads.
 * They still render on the server. Deleted at cleanup (R.2), when the page imports them.
 */
const FirstRunFrame = lazy(() => import('./FirstRun').then((m) => ({ default: m.FirstRun })))
const AcademicFrame = lazy(() => import('./Academic').then((m) => ({ default: m.Academic })))

export function NewOnboarding(props: FirstRunProps) {
  return <FirstRunFrame {...props} />
}

export function NewAcademic(props: AcademicProps) {
  return <AcademicFrame {...props} />
}
