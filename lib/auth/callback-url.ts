/**
 * Where sign-in returns to (rebranding 2.4). Save and "Sign in to check" on a program page send
 * the visitor to sign-in with `callbackUrl` set to the page, so they come back to it signed in.
 * Only a path on this site counts: an absolute URL, a protocol-relative "//host" or a backslash,
 * which browsers read as a slash, could send them somewhere else. Anything else is ignored, and
 * sign-in goes to /student as it always has.
 */
export function returnPath(callbackUrl: string | null | undefined): string | null {
  if (!callbackUrl?.startsWith('/') || callbackUrl.startsWith('//')) return null
  // A backslash or a control character can turn the path into another host
  if (/[\\\u0000-\u001f\u007f]/.test(callbackUrl)) return null
  return callbackUrl
}

/**
 * School invitations. The new-account invitation link sends a student who already has an account
 * here through sign-in (MAINT 5.22), so today's design follows this one return too.
 */
export const INVITATIONS_PATH = '/student/invitations'

/**
 * The coordinator sign-in, `app/auth/coordinator/page.tsx`. The coordinator portal sends a visitor
 * with no session here (MAINT 5.26: it used to send them to a route that didn't exist, a 404).
 */
export const COORDINATOR_SIGN_IN_PATH = '/auth/coordinator'

/**
 * Where sign-in goes once signed in. The new design returns to the page that sent the visitor
 * (rebranding 2.4); today's design goes to /student, except for School invitations. Deleted with
 * today's sign-in at cleanup (R.2), when `returnPath(…) ?? '/student'` is all it needs.
 */
export function signInDestination(
  callbackUrl: string | null | undefined,
  followCallback: boolean
): string {
  const path = returnPath(callbackUrl)
  if (followCallback) return path ?? '/student'
  return path === INVITATIONS_PATH ? path : '/student'
}
