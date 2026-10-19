'use client'

import { lazy, Suspense } from 'react'
import type { PageErrorProps } from './ErrorScreen'
import { useSiteChrome } from './site-chrome'

/*
 * app/error.tsx (rebranding 4.3, board "D4.15 404 and error pages"): a page that fails while it
 * renders. Next loads an error.tsx with every page below it, so each entry point is its own small
 * module: the panel loads only once a page has failed, and only in the new design. Today's design
 * throws the error on, to Next's own page, as before any error.tsx existed; that throw goes at
 * cleanup (R.2). Inside the public header and footer on a public page; where the failed page's
 * layout drew its own chrome and the error replaced it, the panel draws the public ones itself.
 */

const ErrorScreen = lazy(() => import('./ErrorScreen').then((m) => ({ default: m.ErrorScreen })))

export function RootError(props: PageErrorProps) {
  const chrome = useSiteChrome()
  if (!chrome) throw props.error
  return (
    <Suspense fallback={null}>
      <ErrorScreen {...props} frame={chrome === 'own'} as="main" />
    </Suspense>
  )
}
