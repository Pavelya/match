'use server'

import { signOut } from '@/lib/auth/config'
import { ACCOUNT_DELETED_PATH } from '@/lib/student/settings'

/** Sign out from the account panel, then Home. A form action, so it works before hydration. */
export async function signOutAndGoHome() {
  await signOut({ redirectTo: '/' })
}

/** Once the account is deleted (rebranding 3.3): signed out, onto the page that says so */
export async function signOutAfterDeleting() {
  await signOut({ redirectTo: ACCOUNT_DELETED_PATH })
}
