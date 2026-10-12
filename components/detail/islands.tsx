'use client'

import { lazy } from 'react'
import type { ReadMoreProps } from './ReadMore'
import type { FitWorkingProps, ProgramSaveProps } from '@/components/program/ProgramIslands'

/*
 * The program and university pages' interactive parts, each its own chunk that loads only where
 * it renders (rebranding 2.4). The pages are server components, and any client component their
 * imports reach joins the route's download for every visitor, today's design included (the lesson
 * of builds 1.5 and 6–7); these few lines are all today's design downloads. The parts still render
 * on the server, so their text is in the HTML. The exports are components, not the lazy objects:
 * React won't unwrap a lazy inside the lazy a server component's client reference arrives in.
 * Deleted at cleanup (R.2), when the pages import the parts.
 */

const ReadMoreFrame = lazy(() => import('./ReadMore').then((m) => ({ default: m.ReadMore })))
const ProgramSaveFrame = lazy(() =>
  import('@/components/program/ProgramIslands').then((m) => ({ default: m.ProgramSave }))
)
const FitWorkingFrame = lazy(() =>
  import('@/components/program/ProgramIslands').then((m) => ({ default: m.FitWorking }))
)

export function ReadMore(props: ReadMoreProps) {
  return <ReadMoreFrame {...props} />
}

export function ProgramSave(props: ProgramSaveProps) {
  return <ProgramSaveFrame {...props} />
}

export function FitWorking(props: FitWorkingProps) {
  return <FitWorkingFrame {...props} />
}
