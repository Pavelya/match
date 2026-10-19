'use client'

import { useId, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { School } from 'lucide-react'
import { Button } from '@/components/ds/Button'
import { ButtonLink } from '@/components/ds/ButtonLink'
import { ConfirmDialog } from '@/components/ds/ConfirmDialog'
import { EmptyState } from '@/components/ds/EmptyState'
import { IconTile } from '@/components/ds/IconTile'
import { useToast } from '@/components/ds/Toast'
import { AccessList, ConsentBox, type InvitedSchool } from './parts'

/*
 * School invitations, /student/invitations, for a student who has an account (rebranding 4.3,
 * board "D4.16 School invitation", approved 19 October 2026). Each invitation is a panel; Accept
 * opens D2.10's dialog, whose one field is the consent box, and then Settings opens with the
 * school linked and a toast. Decline asks nothing, as today, and a toast confirms it, with no
 * Undo: the coordinator can send a new one. With none left, D2.11's panel. Today's routes and
 * reads; the dates come formatted from the server.
 */

export interface PendingInvitation {
  id: string
  school: InvitedSchool
  coordinatorName: string | null
  /** "15 October 2026" */
  invited: string
  expires: string
}

const NOT_ACCEPTED = 'We couldn’t accept the invitation. Please try again.'

/** The route's own reason when it refused (expired, no longer valid), else the board's words */
async function failureFrom(response: Response, fallback: string): Promise<string> {
  if (response.status < 400 || response.status >= 500) return fallback
  const data: { error?: unknown } = await response.json().catch(() => ({}))
  return typeof data.error === 'string' ? data.error : fallback
}

export function InvitationsList({ invitations }: { invitations: PendingInvitation[] }) {
  const router = useRouter()
  const toast = useToast()
  const id = useId()
  const box = useRef<HTMLInputElement>(null)
  const opener = useRef<HTMLButtonElement | null>(null)

  // The invitation the dialog is about stays while it fades out
  const [open, setOpen] = useState(false)
  const [about, setAbout] = useState<PendingInvitation | null>(null)
  const [consent, setConsent] = useState(false)
  const [refused, setRefused] = useState(false)
  const [connecting, setConnecting] = useState(false)
  const [failure, setFailure] = useState<string | null>(null)
  const [declining, setDeclining] = useState<string | null>(null)

  function openDialog(invitation: PendingInvitation, button: HTMLButtonElement) {
    opener.current = button
    setConsent(false)
    setRefused(false)
    setFailure(null)
    setAbout(invitation)
    setOpen(true)
  }

  async function accept() {
    if (!about || connecting) return
    if (!consent) {
      setRefused(true)
      box.current?.focus()
      return
    }
    setConnecting(true)
    setFailure(null)
    try {
      const response = await fetch('/api/students/invitations/accept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ invitationId: about.id })
      })
      if (!response.ok) {
        setFailure(await failureFrom(response, NOT_ACCEPTED))
        setConnecting(false)
        return
      }
      // The toast belongs to the signed-in frame, so it stays through the move to Settings
      toast({ tone: 'ok', message: `You’re connected to ${about.school.name}.` })
      router.push('/student/settings')
      router.refresh()
    } catch {
      setFailure(NOT_ACCEPTED)
      setConnecting(false)
    }
  }

  async function decline(invitation: PendingInvitation) {
    if (declining) return
    setDeclining(invitation.id)
    try {
      const response = await fetch('/api/students/invitations/decline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ invitationId: invitation.id })
      })
      if (!response.ok) {
        toast({
          tone: 'gap',
          message: await failureFrom(
            response,
            'We couldn’t decline the invitation. Please try again.'
          )
        })
        return
      }
      toast({ tone: 'ok', message: `Invitation from ${invitation.school.name} declined.` })
      // The server's list, without it
      router.refresh()
    } catch {
      toast({ tone: 'gap', message: 'We couldn’t decline the invitation. Please try again.' })
    } finally {
      setDeclining(null)
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-220 flex-col gap-6 px-4 pt-7 pb-10 md:px-6 md:pt-12 md:pb-24 lg:px-0">
      <div className="flex flex-col gap-2">
        <h1 className="text-h1">School invitations</h1>
        {invitations.length > 0 && (
          <p className="text-body text-muted-foreground">
            You have pending invitations to connect with schools.
          </p>
        )}
      </div>

      {invitations.length === 0 ? (
        <EmptyState
          icon={School}
          title="No pending invitations"
          actions={
            <ButtonLink href="/student/settings" variant="secondary">
              Go to Settings
            </ButtonLink>
          }
        >
          You don’t have any school connection requests at the moment.
        </EmptyState>
      ) : (
        <ul className="flex flex-col gap-4">
          {invitations.map((invitation) => (
            <li key={invitation.id}>
              <article
                aria-labelledby={`${id}-${invitation.id}`}
                className="flex flex-col gap-4 rounded-card border border-border bg-card p-5 md:p-6"
              >
                <div className="grid grid-cols-[2.75rem_minmax(0,1fr)] items-start gap-x-3.5">
                  <IconTile icon={School} tone="brand" />
                  <div className="flex min-w-0 flex-col">
                    <h2 id={`${id}-${invitation.id}`} className="text-h3 [overflow-wrap:anywhere]">
                      {invitation.school.name}
                    </h2>
                    <p className="text-small font-normal text-muted-foreground">
                      {invitation.school.place}
                    </p>
                  </div>
                </div>
                <p className="text-body">
                  {invitation.coordinatorName
                    ? `${invitation.coordinatorName} has`
                    : 'Your coordinator has'}{' '}
                  invited you to connect your account with their school.
                </p>
                <p className="text-small font-normal text-muted-foreground tabular-nums">
                  Invited {invitation.invited} · Expires {invitation.expires}
                </p>
                <div className="flex flex-col gap-2.5 md:flex-row md:gap-3">
                  <Button
                    className="max-md:w-full"
                    onClick={(event) => openDialog(invitation, event.currentTarget)}
                  >
                    Accept invitation
                  </Button>
                  <Button
                    variant="secondary"
                    className="max-md:w-full"
                    loading={declining === invitation.id}
                    loadingLabel="Declining…"
                    onClick={() => decline(invitation)}
                  >
                    Decline
                  </Button>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}

      <ConfirmDialog
        open={open}
        affirm
        title={`Connect with ${about?.school.name ?? ''}?`}
        cancelLabel="Cancel"
        actionLabel="Accept and connect"
        busy={connecting}
        busyLabel="Connecting…"
        error={failure}
        onCancel={() => setOpen(false)}
        onAction={accept}
        returnFocusTo={opener}
        field={
          about && (
            <ConsentBox
              id={`${id}-consent`}
              inputRef={box}
              school={about.school.name}
              checked={consent}
              refused={refused}
              onCheckedChange={(checked) => {
                setConsent(checked)
                if (checked) setRefused(false)
              }}
            />
          )
        }
      >
        <p>By accepting this invitation, you allow coordinators at this school to:</p>
        <AccessList />
      </ConfirmDialog>
    </div>
  )
}
