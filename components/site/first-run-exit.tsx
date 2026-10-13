'use client'

import { createContext, useContext, useEffect, useRef, type ReactNode, type RefObject } from 'react'
import type { Waiting } from '@/lib/student/first-run'

/*
 * "Save and exit" sits in focus mode's header (D2.12) but saves the step in progress, which the
 * page holds (rebranding 3.1). The page hands the header what to do through this context.
 */

export interface ExitPlan {
  /** Saves the step in progress; false if it failed, and the page has said so */
  save: () => Promise<boolean>
  /** A program waiting to be saved: leaving asks first (D4.3) */
  waiting: Waiting | null
}

const ExitContext = createContext<RefObject<ExitPlan | null> | null>(null)

export function FirstRunExitProvider({ children }: { children: ReactNode }) {
  const plan = useRef<ExitPlan | null>(null)
  return <ExitContext.Provider value={plan}>{children}</ExitContext.Provider>
}

/** The header's side: what Save and exit does now */
export function useExitPlan(): RefObject<ExitPlan | null> | null {
  return useContext(ExitContext)
}

/** The page's side: keeps the header's plan current. Outside focus mode it does nothing. */
export function useFirstRunExit(plan: ExitPlan) {
  const ref = useContext(ExitContext)
  useEffect(() => {
    if (!ref) return
    ref.current = plan
    return () => {
      ref.current = null
    }
  }, [ref, plan])
}
