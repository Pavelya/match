'use client'

import { useId, useRef, useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { GraduationCap } from 'lucide-react'
import { Button } from '@/components/ds/Button'
import { TextField } from '@/components/ds/Input'
import { EMAIL_ERROR, isEmailAddress } from '@/lib/auth/email-address'
import { AuthAlert, AuthCard, CardHeading, ConsentLine, textLinkClass } from './AuthPage'
import { NOT_SENT, TOO_MANY } from './words'

/*
 * The coordinator's sign-in, in the student's card (rebranding 4.3, board "D4.2 Sign-in"), because
 * the two share /auth, "Check your email" and the error page; the portal behind it keeps today's
 * design. Email only, as today. Every address gets the same outcome, the link and "Check your
 * email", so the card says nothing about which addresses have accounts (SEC-5). The email itself is
 * the student's or the coordinator's by role (lib/auth/config.ts), and a student who signs in here
 * lands on their own Matches (proxy.ts).
 */
export function CoordinatorSignInCard() {
  const router = useRouter()
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
    const address = email.trim().toLowerCase()
    setSending(true)
    setFailure(null)
    try {
      const result = await signIn('resend', {
        email: address,
        callbackUrl: '/coordinator/dashboard',
        redirect: false
      })
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
      setFailure(TOO_MANY)
      setSending(false)
    }
  }

  return (
    <AuthCard labelledBy={`${id}-title`}>
      <CardHeading
        id={`${id}-title`}
        title="Welcome back"
        eyebrow={
          <p className="flex items-center gap-2 text-small font-semibold text-muted-foreground">
            <GraduationCap
              aria-hidden="true"
              size={18}
              strokeWidth={1.75}
              className="text-primary"
            />
            IB coordinator portal
          </p>
        }
      >
        Sign in to manage your school and students.
      </CardHeading>
      {failure && <AuthAlert>{failure}</AuthAlert>}
      <form noValidate onSubmit={sendLink} className="flex flex-col gap-4">
        <TextField
          ref={field}
          id={`${id}-email`}
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          placeholder="coordinator@school.edu"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value)
            if (invalid && isEmailAddress(event.target.value)) setInvalid(false)
          }}
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
      <p className="border-t border-border pt-4 text-body text-muted-foreground">
        Are you a student?{' '}
        <Link href="/auth/signin" className={textLinkClass}>
          Sign in here
        </Link>
      </p>
    </AuthCard>
  )
}
