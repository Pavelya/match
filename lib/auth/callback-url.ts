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
