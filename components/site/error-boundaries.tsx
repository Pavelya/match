'use client'

import { lazy, Suspense } from 'react'
import type { PageErrorProps } from './ErrorScreen'
import { useSiteChrome } from './site-chrome'

/*
 * The error pages' entry points (rebranding 4.3, board "D4.15 404 and error pages"). Next loads an
 * error.tsx with every page below it, so these stay small: the panel loads only when a page has
 * failed, and only in the new design. Today's design throws the error on, to Next's own page, as
 * it did before any error.tsx existed. The throw goes at cleanup (R.2).
 */

const ErrorScreen = lazy(() => import('./ErrorScreen').then((m) => ({ default: m.ErrorScreen })))

/**
 * app/error.tsx. Inside the public header and footer on a public page; where the failed page's
 * layout drew its own chrome and the error replaced it, the page draws the public ones itself.
 */
export function RootError(props: PageErrorProps) {
  const chrome = useSiteChrome()
  if (!chrome) throw props.error
  return (
    <Suspense fallback={null}>
      <ErrorScreen {...props} frame={chrome === 'own'} as="main" />
    </Suspense>
  )
}

/** The error.tsx of a layout that draws its own chrome: the panel stays inside it */
export function LayoutError(props: PageErrorProps) {
  if (!useSiteChrome()) throw props.error
  return (
    <Suspense fallback={null}>
      <ErrorScreen {...props} />
    </Suspense>
  )
}
