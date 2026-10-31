'use client'

import { lazy, type ReactNode } from 'react'

/*
 * The 404's frame as its own chunk (rebranding 4.3): app/not-found.tsx imports the new 404 for
 * every visitor, and a client component it reaches joins its chunk even when only the new design
 * renders it, so today's design downloads only these lines (components/site/chrome.tsx says why).
 * Deleted at cleanup (R.2), when the 404 imports the frame.
 */
const NotFoundFrameChunk = lazy(() =>
  import('./NotFoundFrame').then((m) => ({ default: m.NotFoundFrame }))
)

export function NotFoundFrame({ children }: { children: ReactNode }) {
  return <NotFoundFrameChunk>{children}</NotFoundFrameChunk>
}
