'use client'

import { lazy } from 'react'

/*
 * The new Shortlist as its own chunk (rebranding 2.5), so students on today's design download
 * none of it: a client component the page imports joins the page's chunk for every visitor, even
 * when only the new design renders it (the lesson of build 1.5 and NewMatches). Deleted at
 * cleanup (R.2), when the page imports ShortlistClient.
 */
const ShortlistClient = lazy(() =>
  import('./ShortlistClient').then((m) => ({ default: m.ShortlistClient }))
)

export function NewShortlist() {
  return <ShortlistClient />
}
