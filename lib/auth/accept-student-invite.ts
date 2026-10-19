import { signIn } from 'next-auth/react'
import { INVITATIONS_PATH } from './callback-url'

/**
 * Accepting a school's invitation from the new-account link, /auth/accept-student-invite/[token]
 * (MAINT 5.21 and 5.22, rebranding 4.3, board "D4.16 School invitation"). The accept route creates
 * the account and links the school; then the sign-in link goes to the invited address, and the
 * student lands on "Check your email". Both designs' cards call this, and say what each outcome
 * means in their own words.
 *
 * Before 5.21 the second step asked Auth.js for a provider named "email", which doesn't exist (it is
 * "resend"), so the student landed on the sign-in page with no word about the invitation.
 */
export type AcceptOutcome =
  /** The account exists and the link is on its way: go to `url`, "Check your email" */
  | { kind: 'sent'; url: string }
  /** The account exists, but the link wasn't sent. Accept again would answer 409, so say so. */
  | { kind: 'not-sent' }
  /** The address already has an account (409): sign in, and accept on School invitations */
  | { kind: 'exists' }
  /** Too many attempts, or no answer at all: today's words for both, "Please wait a moment" */
  | { kind: 'try-later' }
  /** The route refused, with its own reason when it gave one */
  | { kind: 'failed'; message: string | null }

/** "Sign in to accept it" (5.22): sign-in, returning to School invitations */
export const SIGN_IN_TO_ACCEPT_HREF = `/auth/signin?callbackUrl=${encodeURIComponent(INVITATIONS_PATH)}`

/** Where a new student goes once signed in: first run */
const AFTER_SIGN_IN = '/student/onboarding'

const CHECK_EMAIL = '/auth/verify-request'

export async function acceptStudentInvite(token: string, email: string): Promise<AcceptOutcome> {
  let response: Response
  try {
    response = await fetch('/api/auth/accept-student-invite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token })
    })
  } catch {
    return { kind: 'try-later' }
  }

  if (response.status === 429) return { kind: 'try-later' }
  if (response.status === 409) return { kind: 'exists' }
  if (!response.ok) {
    const data: { error?: unknown } = await response.json().catch(() => ({}))
    return { kind: 'failed', message: typeof data.error === 'string' ? data.error : null }
  }

  // The account is made: from here on, every failure is the link not being sent
  try {
    const result = await signIn('resend', { email, callbackUrl: AFTER_SIGN_IN, redirect: false })
    if (result?.error) return { kind: 'not-sent' }
    return { kind: 'sent', url: result?.url || CHECK_EMAIL }
  } catch {
    return { kind: 'not-sent' }
  }
}
