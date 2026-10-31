'use client'

import { lazy, Suspense } from 'react'
import type { PageErrorProps } from './ErrorScreen'
import { useSiteChrome } from './site-chrome'

/*
 * app/student/error.tsx (rebranding 4.3, D4.15): the panel stays inside the signed-in header and
 * tab bar. Each error.tsx costs every page below it a little JavaScript, so only the student's
 * area has its own, as the board places them; a page under another layout that draws its own
 * chrome (/programs, /universities, /contact) gets the root's, with the public header and footer.
 * Today's design throws the error on (components/site/root-error.tsx says why).
 */

const ErrorScreen = lazy(() => import('./ErrorScreen').then((m) => ({ default: m.ErrorScreen })))

export function LayoutError(props: PageErrorProps) {
  if (!useSiteChrome()) throw props.error
  return (
    <Suspense fallback={null}>
      <ErrorScreen {...props} />
    </Suspense>
  )
}
