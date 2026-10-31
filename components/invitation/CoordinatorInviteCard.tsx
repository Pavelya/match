'use client'

import { useId, useRef, useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { CircleCheck } from 'lucide-react'
import { Button } from '@/components/ds/Button'
import { IconTile } from '@/components/ds/IconTile'
import { TextField } from '@/components/ds/Input'
import { AuthAlert, AuthCard, CardHeading, ConsentLine } from '@/components/sign-in/AuthPage'

/*
 * A coordinator's invitation, /auth/accept-invite/[token], in the student's card (rebranding 4.3,
 * board "D4.16 School invitation"), as the coordinator sign-in is on D4.2; the portal behind it
 * keeps today's design. The email is fixed by the invitation; the name makes the account, then
 * the coordinator sign-in.
 */

export interface CoordinatorInviteProps {
  token: string
  email: string
  school: { name: string; place: string; tier: 'VIP' | 'REGULAR' } | null
}

export function CoordinatorInviteCard({ token, email, school }: CoordinatorInviteProps) {
  const router = useRouter()
  const id = useId()
  const nameField = useRef<HTMLInputElement>(null)
  const [name, setName] = useState('')
  const [missingName, setMissingName] = useState(false)
  const [working, setWorking] = useState(false)
  const [failure, setFailure] = useState<string | null>(null)
  const [created, setCreated] = useState(false)

  async function accept(event: FormEvent) {
    event.preventDefault()
    if (working) return
    if (!name.trim()) {
      setMissingName(true)
      nameField.current?.focus()
      return
    }
    setWorking(true)
    setFailure(null)
    try {
      const response = await fetch('/api/auth/accept-invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, name: name.trim() })
      })
      if (!response.ok) {
        const data: { error?: unknown } = await response.json().catch(() => ({}))
        setFailure(typeof data.error === 'string' ? data.error : 'Failed to accept invitation')
        setWorking(false)
        return
      }
      setCreated(true)
      // On to the coordinator sign-in, as today
      setTimeout(() => router.push('/auth/coordinator'), 2000)
    } catch {
      setFailure('Failed to accept invitation')
      setWorking(false)
    }
  }

  if (created) {
    return (
      <AuthCard labelledBy={`${id}-done`}>
        <IconTile icon={CircleCheck} tone="ok" />
        <CardHeading id={`${id}-done`} title="Welcome to IB Match">
          Your coordinator account has been created.
        </CardHeading>
        <p role="status" className="text-small font-normal text-muted-foreground">
          Taking you to sign in…
        </p>
      </AuthCard>
    )
  }

  return (
    <AuthCard labelledBy={`${id}-title`}>
      <CardHeading
        id={`${id}-title`}
        title="Accept invitation"
        eyebrow={
          <p className="text-small font-semibold text-muted-foreground">Coordinator invitation</p>
        }
      >
        Complete your coordinator account setup.
      </CardHeading>
      {failure && <AuthAlert>{failure}</AuthAlert>}
      <form noValidate onSubmit={accept} className="flex flex-col gap-5">
        {school && (
          <div className="flex flex-col gap-1.5">
            <p className="text-small font-semibold">School</p>
            <div className="flex flex-col gap-1.5 rounded-[0.75rem] border border-border bg-background px-3.5 py-3">
              <p className="text-[0.9375rem] leading-[1.375rem] font-semibold [overflow-wrap:anywhere]">
                {school.name}
              </p>
              <p className="text-small font-normal text-muted-foreground">{school.place}</p>
              <span className="inline-flex min-h-6 items-center self-start rounded-chip border border-transparent bg-muted px-2 text-label text-muted-foreground">
                {school.tier === 'VIP' ? 'VIP' : 'Regular'}
              </span>
            </div>
          </div>
        )}
        <TextField
          id={`${id}-email`}
          label="Email"
          type="email"
          value={email}
          readOnly
          hint="This will be your sign-in email."
          className="[&_input]:border-border [&_input]:bg-muted"
        />
        <TextField
          ref={nameField}
          id={`${id}-name`}
          label="Your name"
          name="name"
          autoComplete="name"
          placeholder="Enter your full name"
          value={name}
          onChange={(event) => {
            setName(event.target.value)
            if (event.target.value.trim()) setMissingName(false)
          }}
          error={missingName ? 'Please enter your name' : undefined}
        />
        <ConsentLine verb="accepting" />
        <Button
          type="submit"
          size="lg"
          loading={working}
          loadingLabel="Creating your account…"
          className="w-full"
        >
          Accept invitation
        </Button>
      </form>
    </AuthCard>
  )
}
