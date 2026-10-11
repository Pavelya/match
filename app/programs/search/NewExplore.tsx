'use client'

import { lazy } from 'react'
import type { ExploreClientProps } from './ExploreClient'

/*
 * The new Explore page as its own chunk (rebranding 2.3), so visitors on today's design
 * download none of it: a client component the page imports joins the page's chunk for every
 * visitor, even when only the new design renders it (the lesson of build 1.5 and NewMatches).
 * It still renders on the server, so the first rows are in the HTML. Deleted at cleanup (R.2),
 * when the page imports ExploreClient.
 */
const ExploreClient = lazy(() =>
  import('./ExploreClient').then((m) => ({ default: m.ExploreClient }))
)

export function NewExplore(props: ExploreClientProps) {
  return <ExploreClient {...props} />
}
