'use client'

import { lazy } from 'react'

/*
 * The new Matches page as its own chunk (rebranding 2.2), so students on today's design download
 * none of it: a client component the page imports joins the page's chunk for every visitor, even
 * when only the new design renders it (the lesson of components/site/chrome.tsx, build 1.5).
 * Deleted at cleanup (R.2), when the page imports MatchesClient.
 */
const MatchesClient = lazy(() =>
  import('./MatchesClient').then((m) => ({ default: m.MatchesClient }))
)

export function NewMatches() {
  return <MatchesClient />
}
