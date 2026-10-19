'use client'

import { lazy } from 'react'

/*
 * The /auth cards that run in the browser, each its own chunk (rebranding 4.3): a client component
 * a page imports joins that page's download for every visitor, today's design included (the
 * lesson of builds 1.5 and 6–7), so today's design downloads only these lines. The cards still
 * render on the server. The exports are components, not the lazy objects: React won't unwrap a
 * lazy inside the lazy a server component's client reference arrives in. Deleted at cleanup
 * (R.2), when the pages import the cards.
 */

const SignInFrame = lazy(() => import('./SignInCard').then((m) => ({ default: m.SignInCard })))
const CoordinatorSignInFrame = lazy(() =>
  import('./CoordinatorSignInCard').then((m) => ({ default: m.CoordinatorSignInCard }))
)

export function SignInCard() {
  return <SignInFrame />
}

export function CoordinatorSignInCard() {
  return <CoordinatorSignInFrame />
}
