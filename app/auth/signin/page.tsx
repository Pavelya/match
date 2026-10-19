import { AuthLogo } from '@/components/brand/AuthLogo'
import { AuthPage } from '@/components/sign-in/AuthPage'
import { SignInCard } from '@/components/sign-in/islands'
import { showsNewUi } from '@/lib/new-ui'
import { SignIn } from './SignIn'

export default async function SignInPage() {
  // The new design's card (rebranding 4.3, board "D4.2 Sign-in")
  if (await showsNewUi()) {
    return (
      <AuthPage>
        <SignInCard />
      </AuthPage>
    )
  }
  return <SignIn logo={<AuthLogo legacySize={64} />} />
}
