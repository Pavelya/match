import { AuthLogo } from '@/components/brand/AuthLogo'
import { showsNewUi } from '@/lib/new-ui'
import { SignIn } from './SignIn'

export default async function SignInPage() {
  return <SignIn logo={<AuthLogo legacySize={64} />} followCallback={await showsNewUi()} />
}
