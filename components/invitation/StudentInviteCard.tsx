'use client'

import { useId, useRef, useState, type ReactNode } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ds/Button'
import {
  AuthAlert,
  AuthCard,
  CardHeading,
  inlineLinkClass,
  textLinkClass
} from '@/components/sign-in/AuthPage'
import { SIGN_IN_TO_ACCEPT_HREF, acceptStudentInvite } from '@/lib/auth/accept-student-invite'
import { AccessList, ConsentBox, SchoolPanel, type InvitedSchool } from './parts'

/*
 * A school's invitation to a student without an account, /auth/accept-student-invite/[token]
 * (rebranding 4.3, board "D4.16 School invitation", approved 19 October 2026). Same flow, new look:
 * consent, then the account, then the sign-in link to the invited address and "Check your email"
 * (MAINT 5.21). A student who already has an account is sent to sign in, returning to School
 * invitations, where the invitation waits (5.22). The button can always be pressed; without the
 * tick, the box says why.
 */

export interface StudentInviteProps {
  token: string
  email: string
  school: InvitedSchool
  coordinatorName: string | null
}

export function StudentInviteCard({ token, email, school, coordinatorName }: StudentInviteProps) {
  const id = useId()
  const box = useRef<HTMLInputElement>(null)
  const [consent, setConsent] = useState(false)
  const [refused, setRefused] = useState(false)
  const [working, setWorking] = useState(false)
  const [failure, setFailure] = useState<ReactNode>(null)

  async function accept() {
    if (working) return
    if (!consent) {
      setRefused(true)
      box.current?.focus()
      return
    }
    setWorking(true)
    setFailure(null)
    const outcome = await acceptStudentInvite(token, email)
    switch (outcome.kind) {
      case 'sent':
        // An address Auth.js decides, so through the browser rather than the router
        window.location.href = outcome.url
        return
      case 'not-sent':
        setFailure(
          <>
            Your account is ready, but we couldn’t send the sign-in link.{' '}
            <Link href="/auth/signin" className={inlineLinkClass}>
              Sign in
            </Link>{' '}
            with {email} to continue.
          </>
        )
        break
      case 'exists':
        setFailure(
          <>
            You already have an IB Match account with {email}. Sign in, and the invitation will be
            waiting.{' '}
            <Link href={SIGN_IN_TO_ACCEPT_HREF} className={inlineLinkClass}>
              Sign in to accept it
            </Link>
          </>
        )
        break
      case 'try-later':
        setFailure('Too many attempts. Please wait a moment and try again.')
        break
      case 'failed':
        setFailure(outcome.message ?? 'We couldn’t accept the invitation. Please try again.')
        break
    }
    setWorking(false)
  }

  return (
    <AuthCard labelledBy={`${id}-title`} wide>
      <CardHeading
        id={`${id}-title`}
        title={`Join ${school.name}`}
        eyebrow={
          <p className="text-small font-semibold text-muted-foreground">School invitation</p>
        }
      >
        {coordinatorName ? `${coordinatorName} has` : 'Your coordinator has'} invited you to link
        your IB Match account to their school.
      </CardHeading>
      <SchoolPanel school={school} />
      <AccessList
        heading={<h2 className="text-h3">What coordinators can access</h2>}
        intro={`By accepting this invitation, you allow coordinators at ${school.name} to:`}
      />
      <ConsentBox
        id={`${id}-consent`}
        inputRef={box}
        school={school.name}
        checked={consent}
        refused={refused}
        onCheckedChange={(checked) => {
          setConsent(checked)
          if (checked) setRefused(false)
        }}
      />
      {failure && <AuthAlert>{failure}</AuthAlert>}
      <Button
        size="lg"
        loading={working}
        loadingLabel="Creating your account…"
        onClick={accept}
        className="w-full"
      >
        Accept and create account
      </Button>
      <div className="flex flex-col gap-1 border-t border-border pt-4">
        <p className="text-body text-muted-foreground">
          Don’t want to link your account?{' '}
          <Link href="/auth/signin?declineInvite=true" className={textLinkClass}>
            Create a regular account instead
          </Link>
        </p>
        <p className="text-small font-normal text-muted-foreground">
          Your account will be created with{' '}
          <strong className="font-semibold text-foreground">{email}</strong>.
        </p>
      </div>
    </AuthCard>
  )
}
