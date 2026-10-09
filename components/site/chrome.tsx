'use client'

import { lazy, type ReactNode } from 'react'
import type { AccountUser } from './AccountMenu'

/*
 * How the layouts place the new design's chrome (rebranding 1.5). Each frame is a separate chunk
 * that loads only where it renders, so visitors who get today's design download nothing but
 * these few lines. The frames still render on the server, so the header and footer are in the
 * prebuilt HTML.
 *
 * The split has to happen here, in a client component: the layouts are server components, and
 * every client component a layout's imports reach, rendered or not, joins the chunk that each
 * of its pages loads. next/dynamic in a server component doesn't change that, and in a client
 * component it added 1.1 KB of loader to every page (measured, 9 October 2026); React's lazy is
 * already on every page. The exports are components, not the lazy objects themselves: a server
 * layout's client component reaches the browser wrapped in a lazy of its own, and React won't
 * unwrap a lazy inside a lazy. Deleted at cleanup (R.2), when the layouts import the frames.
 */

const PublicFrame = lazy(() => import('./PublicFrame').then((m) => ({ default: m.PublicFrame })))
const SignedOutFrame = lazy(() =>
  import('./PublicFrame').then((m) => ({ default: m.SignedOutFrame }))
)
const AppFrame = lazy(() => import('./AppFrame').then((m) => ({ default: m.AppFrame })))

/** Root layout: every page, public ones getting the signed-out header and the footer */
export function PublicChrome({ children }: { children: ReactNode }) {
  return <PublicFrame>{children}</PublicFrame>
}

/** /programs signed out */
export function SignedOutChrome({ children }: { children: ReactNode }) {
  return <SignedOutFrame>{children}</SignedOutFrame>
}

/** /student, and /programs signed in */
export function SignedInChrome({ user, children }: { user: AccountUser; children: ReactNode }) {
  return <AppFrame user={user}>{children}</AppFrame>
}
