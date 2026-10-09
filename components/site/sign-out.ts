'use server'

import { signOut } from '@/lib/auth/config'

/** Sign out from the account panel, then Home. A form action, so it works before hydration. */
export async function signOutAndGoHome() {
  await signOut({ redirectTo: '/' })
}
