import type { JWT } from 'next-auth/jwt'
import { readRoleAndMarkActive } from './last-active'

/** How long a role claim in the JWT is trusted before being re-read. */
export const ROLE_REFRESH_MS = 5 * 60 * 1000

/**
 * The `jwt` callback's work (lib/auth/config.ts): the role read at sign-in and re-read every few
 * minutes after, which also records the day the user was active (lib/auth/last-active.ts).
 *
 * Previously the role was read only at sign-in, so demoting an admin or deactivating a coordinator
 * had no effect until their token expired, up to 30 days. When the account no longer exists, deleted
 * by the student, by an admin or by the inactivity rule (MAINT 7.6), this returns null, and Auth.js
 * clears the session cookie: the session ends at the next re-read, within `ROLE_REFRESH_MS`, rather
 * than carrying on as a student (SEC-6).
 *
 * @param signedInUserId - the user's id on sign-in, when Auth.js passes `user`; absent after
 */
export async function refreshSessionToken(
  token: JWT,
  signedInUserId: string | undefined,
  now: number = Date.now()
): Promise<JWT | null> {
  const userId = signedInUserId ?? token.sub
  const due = signedInUserId !== undefined || now - (token.roleCheckedAt ?? 0) > ROLE_REFRESH_MS
  if (!userId || !due) return token

  const role = await readRoleAndMarkActive(userId, new Date(now))
  if (role === null) return null

  token.role = role
  token.roleCheckedAt = now
  return token
}
