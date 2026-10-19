/**
 * Coordinator Sign-In Page
 *
 * Dedicated sign-in page for IB Coordinators. The card is `CoordinatorSignIn`, and in the new
 * design the student's card with its own eyebrow (rebranding 4.3, board "D4.2 Sign-in").
 */

import { AuthLogo } from '@/components/brand/AuthLogo'
import { AuthPage } from '@/components/sign-in/AuthPage'
import { CoordinatorSignInCard } from '@/components/sign-in/islands'
import { showsNewUi } from '@/lib/new-ui'
import { CoordinatorSignIn } from './CoordinatorSignIn'

export default async function CoordinatorSignInPage() {
  if (await showsNewUi()) {
    return (
      <AuthPage>
        <CoordinatorSignInCard />
      </AuthPage>
    )
  }
  return <CoordinatorSignIn logo={<AuthLogo legacySize={64} />} />
}
