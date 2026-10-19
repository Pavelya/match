import Link from 'next/link'
import { CircleAlert, MailCheck } from 'lucide-react'
import { ButtonLink } from '@/components/ds/ButtonLink'
import { IconTile } from '@/components/ds/IconTile'
import { SIGN_IN_LINK_LIFETIME } from '@/lib/auth/sign-in-link'
import { AuthCard, CardHeading, ContactUsLine, textLinkClass } from './AuthPage'

/*
 * The cards after the button (rebranding 4.3, board "D4.2 Sign-in"): "Check your email", and the
 * error Auth.js sends a failed sign-in to. Server components: neither sends any JavaScript.
 */

export function CheckEmailCard() {
  return (
    <AuthCard labelledBy="check-email">
      <IconTile icon={MailCheck} tone="brand" />
      <CardHeading id="check-email" title="Check your email">
        We’ve sent you a secure link to sign in to IB Match.
      </CardHeading>
      <p className="text-body">
        Click the link in the email to continue. If you’re new, your account will be created
        automatically. The link expires in {SIGN_IN_LINK_LIFETIME}.
      </p>
      <p className="text-small font-normal text-muted-foreground">
        Don’t see it? Check your spam folder. If you were invited as a coordinator and haven’t set
        up your account yet, use the link in your invitation email instead.
      </p>
      <p className="border-t border-border pt-4 text-body">
        <Link href="/auth/signin" className={textLinkClass}>
          Didn’t receive the email? Try again
        </Link>
      </p>
    </AuthCard>
  )
}

/** Auth.js's error codes, in today's words but two (D4.2) */
const SIGN_IN_ERRORS: Record<string, string> = {
  Configuration: 'Something went wrong on our side. Please try again in a few minutes.',
  AccessDenied: 'You do not have permission to sign in.',
  Verification:
    'The sign-in link is no longer valid. It may have expired, or been used already: each link works once.',
  RateLimit: 'Too many sign-in attempts. Please wait a moment and try again.',
  TooManyRequests: 'Too many sign-in attempts. Please wait a moment and try again.'
}

export function signInErrorMessage(code: string | undefined): string {
  return (code && SIGN_IN_ERRORS[code]) || 'Something went wrong. Please try again.'
}

export function SignInErrorCard({ code }: { code: string | undefined }) {
  return (
    <AuthCard labelledBy="sign-in-error">
      <IconTile icon={CircleAlert} tone="error" />
      <CardHeading id="sign-in-error" title="We couldn’t sign you in">
        {signInErrorMessage(code)}
      </CardHeading>
      <ButtonLink href="/auth/signin" size="lg" className="w-full">
        Try again
      </ButtonLink>
      <ContactUsLine />
    </AuthCard>
  )
}
