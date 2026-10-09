import { AuthLogo } from '@/components/brand/AuthLogo'
import { SignIn } from './SignIn'

export default function SignInPage() {
  return <SignIn logo={<AuthLogo legacySize={64} />} />
}
