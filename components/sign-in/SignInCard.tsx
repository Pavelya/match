'use client'

import { Suspense, useId, useRef, useState, type FormEvent } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Info } from 'lucide-react'
import { Button } from '@/components/ds/Button'
import { Callout } from '@/components/ds/Callout'
import { TextField } from '@/components/ds/Input'
import { signInDestination } from '@/lib/auth/callback-url'
import { EMAIL_ERROR, isEmailAddress } from '@/lib/auth/email-address'
import { SIGN_IN_LINK_LIFETIME } from '@/lib/auth/sign-in-link'
import { AuthAlert, AuthCard, CardHeading, ConsentLine } from './AuthPage'
import { GoogleButton, OrWithEmail } from './GoogleButton'
import { NOT_SENT, TOO_MANY } from './words'

/*
 * The student's sign-in card (rebranding 4.3, board "D4.2 Sign-in", approved 19 October 2026).
 * Google first, then the email: a labelled field whose error shows when the button is pressed and
 * goes as soon as the address is right, and "Email me a sign-in link" ("Sending…" while it works).
 * Failures stay in the card, in an alert, with the address still typed. Sign-in returns to the
 * page that sent the student here (2.4). The address bar is read in the browser, so the prebuilt
 * page holds the card's own boxes until the script runs.
 */

export function SignInCard() {
  return (
    <Suspense fallback={<SignInSkeleton />}>
      <SignInForm />
    </Suspense>
  )
}

function SignInForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const declineInvite = searchParams.get('declineInvite') === 'true'
  const callbackUrl = signInDestination(searchParams.get('callbackUrl'), true)
  const id = useId()
  const field = useRef<HTMLInputElement>(null)

  const [email, setEmail] = useState('')
  const [invalid, setInvalid] = useState(false)
  const [sending, setSending] = useState(false)
  const [failure, setFailure] = useState<string | null>(null)

  async function sendLink(event: FormEvent) {
    event.preventDefault()
    if (sending) return
    if (!isEmailAddress(email)) {
      setInvalid(true)
      field.current?.focus()
      return
    }
    setSending(true)
    setFailure(null)
    try {
      const result = await signIn('resend', { email: email.trim(), callbackUrl, redirect: false })
      if (result?.error) {
        setFailure(NOT_SENT)
        setSending(false)
      } else if (result?.url) {
        // An address Auth.js decides, so through the browser rather than the router
        window.location.href = result.url
      } else {
        router.push('/auth/verify-request')
      }
    } catch {
      // The rate limit answers before Auth.js does
      setFailure(TOO_MANY)
      setSending(false)
    }
  }

  async function continueWithGoogle() {
    setFailure(null)
    try {
      await signIn('google', { callbackUrl })
    } catch {
      setFailure(TOO_MANY)
    }
  }

  return (
    <AuthCard labelledBy={`${id}-title`}>
      {declineInvite ? (
        <CardHeading id={`${id}-title`} title="Create your account">
          Create a regular account to use IB Match.
        </CardHeading>
      ) : (
        <CardHeading id={`${id}-title`} title="Welcome to IB Match">
          Whether you’re new or returning, we’ll get you started. We’ll save your matches and
          shortlist to your account.
        </CardHeading>
      )}
      {declineInvite && (
        <Callout
          icon={<Info size={20} strokeWidth={2} aria-hidden="true" />}
          label="Note"
          tone="note"
        >
          <strong className="font-semibold">Creating a regular account.</strong> Your account won’t
          be linked to any school. You can still use IB Match to explore universities and track your
          program matches on your own.
        </Callout>
      )}
      {failure && <AuthAlert>{failure}</AuthAlert>}
      <GoogleButton onClick={continueWithGoogle} />
      <OrWithEmail />
      <form noValidate onSubmit={sendLink} className="flex flex-col gap-4">
        <TextField
          ref={field}
          id={`${id}-email`}
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          placeholder="name@example.com"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value)
            if (invalid && isEmailAddress(event.target.value)) setInvalid(false)
          }}
          hint={`No password needed: we’ll email you a secure link that expires in ${SIGN_IN_LINK_LIFETIME}.`}
          error={invalid ? EMAIL_ERROR : undefined}
        />
        <Button
          type="submit"
          size="lg"
          loading={sending}
          loadingLabel="Sending…"
          className="w-full"
        >
          Email me a sign-in link
        </Button>
      </form>
      <ConsentLine />
    </AuthCard>
  )
}

/** Before the script: the card's own boxes, a static tint (D2.8), never a pulse */
function SignInSkeleton() {
  const box = 'block rounded-[0.375rem] bg-muted'
  return (
    <AuthCard>
      <div aria-busy="true" className="flex flex-col gap-3">
        <span className="sr-only">Loading sign-in</span>
        <span className={`${box} h-8 w-[62%] rounded-[0.5rem]`} />
        <span className={`${box} h-3.5 w-full`} />
        <span className={`${box} h-3.5 w-[78%]`} />
      </div>
      <span className={`${box} h-13 w-full rounded-control`} />
      <span className={`${box} h-3 w-[40%]`} />
      <span className={`${box} h-3 w-[20%]`} />
      <span className={`${box} h-11 w-full rounded-control`} />
      <span className={`${box} h-13 w-full rounded-control`} />
      <span className={`${box} h-3 w-[86%]`} />
    </AuthCard>
  )
}
