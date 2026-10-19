'use client'

import { lazy } from 'react'

/*
 * Support us' "Suggest a program" as its own chunk (rebranding 4.3), so today's design downloads
 * only these lines (components/sign-in/islands.tsx says why). Deleted at cleanup (R.2).
 */
const ProgramSuggestionFrame = lazy(() =>
  import('./ProgramSuggestion').then((m) => ({ default: m.ProgramSuggestion }))
)

export function ProgramSuggestion() {
  return <ProgramSuggestionFrame />
}
