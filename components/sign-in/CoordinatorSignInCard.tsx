'use client'

import { useId, useRef, useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { GraduationCap, Info } from 'lucide-react'
import { Button } from '@/components/ds/Button'
import { TextField } from '@/components/ds/Input'
import { EMAIL_ERROR, isEmailAddress } from '@/lib/auth/email-address'
import { AuthAlert, AuthCard, CardHeading, ConsentLine, textLinkClass } from './AuthPage'
import { NOT_SENT, TOO_MANY } from './words'

/*
 * The coordinator's sign-in, in the student's card (rebranding 4.3, board "D4.2 Sign-in"), because
 * the two share /auth, "Check your email" and the error page; the portal behind it keeps today's
 * design. Email only, as today. The address is checked against /api/auth/check-role first: a
 * student's gets a notice in place of the form, and "Try a different email" brings it back empty.
 * The check never says whether an account exists, so any other address gets the link's outcome.
 */
export function CoordinatorSignInCard() {
  const router = useRouter()
  const id = useId()
  const field = useRef<HTMLInputElement>(null)

  const [email, setEmail] = useState('')
  const [invalid, setInvalid] = useState(false)
  const [sending, setSending] = useState(false)
  const [failure, setFailure] = useState<string | null>(null)
  const [studentAddress, setStudentAddress] = useState(false)

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
      const check = await fetch('/api/auth/check-role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: address })
      })
      if (check.status === 429) {
        setFailure(TOO_MANY)
        setSending(false)
        return
      }
      const role: { isStudent?: boolean } = await check.json().catch(() => ({}))
      if (check.ok && role.isStudent) {
        setStudentAddress(true)
        setSending(false)
        return
      }
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
      {studentAddress ? (
        <>
          <div
            role="status"
            className="grid grid-cols-[1.25rem_minmax(0,1fr)] gap-x-3 gap-y-1.5 rounded-[0.75rem] border border-transparent bg-muted p-4"
          >
            <Info
              aria-hidden="true"
              size={20}
              strokeWidth={2}
              className="mt-0.5 text-muted-foreground"
            />
            <p className="text-body font-semibold">This looks like a student account</p>
            <p className="col-start-2 text-body">
              The email you entered is registered as a student account. Please use the student
              sign-in page instead.
            </p>
            <p className="col-start-2 mt-1 text-body">
              <Link href="/auth/signin" className={textLinkClass}>
                Go to student sign-in
              </Link>
            </p>
          </div>
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => {
              setStudentAddress(false)
              setEmail('')
              // The form comes back in the next render; its field takes focus then
              requestAnimationFrame(() => field.current?.focus())
            }}
          >
            Try a different email
          </Button>
        </>
      ) : (
        <>
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
        </>
      )}
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
