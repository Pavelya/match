/**
 * Coordinator Sign-In Page
 *
 * Dedicated sign-in page for IB Coordinators. The card is `CoordinatorSignIn`.
 */

import { AuthLogo } from '@/components/brand/AuthLogo'
import { CoordinatorSignIn } from './CoordinatorSignIn'

export default function CoordinatorSignInPage() {
  return <CoordinatorSignIn logo={<AuthLogo legacySize={64} />} />
}
