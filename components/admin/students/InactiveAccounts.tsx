/**
 * Inactive accounts: the two buttons and the three lists (MAINT 7.6 Part D)
 *
 * Each button confirms with the number of accounts first, then calls its route, which reads the
 * students again on the server. Off, the buttons are disabled and say why.
 */

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AlertTriangle, Loader2, Mail, Trash2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { DataTable, type Column } from '@/components/admin/shared'

export interface InactiveRow {
  id: string
  email: string
  name: string | null
  school: string | null
  /** ISO dates */
  lastSeen: string
  noticeSentAt: string | null
  deletesOn: string | null
  daysLeft: number | null
}

/** "17 Dec 2026", in UTC as the rule counts */
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC'
  })
}

interface ActionsProps {
  enabled: boolean
  /** How many the next press would send or delete, after the caps */
  toSend: number
  toDelete: number
  dueNotice: number
  dueDeletion: number
  noticesPerDay: number
  sentToday: number
  deletionsPerPress: number
}

export function InactiveAccountsActions(props: ActionsProps) {
  const off = 'Switched off until the Privacy Policy that sets the rule is published.'
  const sendReason = !props.enabled
    ? off
    : props.dueNotice === 0
      ? 'No student is due a notice.'
      : props.toSend === 0
        ? `Today’s ${props.noticesPerDay} notices are sent. The rest go tomorrow (UTC).`
        : null
  const deleteReason = !props.enabled
    ? off
    : props.dueDeletion === 0
      ? 'No account is due for deletion.'
      : null

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <ActionCard
        title="Send notices"
        detail={`Up to ${props.noticesPerDay} a day, under the email service’s daily limit. ${props.sentToday} sent today.`}
        reason={sendReason}
      >
        <ConfirmAction
          disabled={!!sendReason}
          label={`Send ${props.toSend} notices`}
          icon={Mail}
          variant="default"
          title={`Send ${props.toSend} inactivity notices?`}
          description={`Each student gets the one email that says their account will be deleted in 30 days unless they sign in.${props.dueNotice > props.toSend ? ` ${props.dueNotice - props.toSend} more stay due for another day.` : ''}`}
          endpoint="/api/admin/inactive-accounts/notices"
          working="Sending…"
          done={(data) => `${data.sent} sent. ${data.stillDue} still due.`}
        />
      </ActionCard>
      <ActionCard
        title="Delete due accounts"
        detail={`Accounts whose notice is 30 days old and who haven’t come back. Up to ${props.deletionsPerPress} each press.`}
        reason={deleteReason}
      >
        <ConfirmAction
          disabled={!!deleteReason}
          label={`Delete ${props.toDelete} accounts`}
          icon={Trash2}
          variant="destructive"
          title={`Delete ${props.toDelete} accounts?`}
          description="Each account is deleted with everything it holds: the profile, grades, shortlist, support tickets, sign-in records and school invitations. The database keeps no backups, so this cannot be undone. No email is sent."
          endpoint="/api/admin/inactive-accounts/delete"
          working="Deleting…"
          done={(data) => `${data.deleted} deleted. ${data.stillDue} still due.`}
        />
      </ActionCard>
    </div>
  )
}

function ActionCard({
  title,
  detail,
  reason,
  children
}: {
  title: string
  detail: string
  reason: string | null
  children: React.ReactNode
}) {
  return (
    <div className="rounded-xl border bg-card p-5 flex flex-col gap-3">
      <div>
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        <p className="text-sm text-muted-foreground">{detail}</p>
      </div>
      <div>{children}</div>
      {reason && <p className="text-sm text-muted-foreground">{reason}</p>}
    </div>
  )
}

type Result = { sent?: number; deleted?: number; stillDue?: number; error?: string }

function ConfirmAction({
  disabled,
  label,
  icon: Icon,
  variant,
  title,
  description,
  endpoint,
  working,
  done
}: {
  disabled: boolean
  label: string
  icon: typeof Mail
  variant: 'default' | 'destructive'
  title: string
  description: string
  endpoint: string
  working: string
  done: (data: Result) => string
}) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const run = async () => {
    setBusy(true)
    setError(null)
    try {
      const response = await fetch(endpoint, { method: 'POST' })
      const data = (await response.json()) as Result
      if (data.error) setError(data.error)
      if (response.ok || data.deleted !== undefined) {
        setMessage(done(data))
        if (response.ok) setOpen(false)
        router.refresh()
      }
    } catch {
      setError('The request failed. Check your connection and try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={variant} size="sm" disabled={disabled}>
            <Icon className="h-4 w-4 mr-2" />
            {label}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[460px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {variant === 'destructive' && <AlertTriangle className="h-5 w-5 text-destructive" />}
              {title}
            </DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {error && (
            <div className="text-sm text-destructive bg-destructive/10 rounded-lg p-3">{error}</div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)} disabled={busy}>
              Cancel
            </Button>
            <Button variant={variant} onClick={run} disabled={busy}>
              {busy ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {working}
                </>
              ) : (
                label
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {message && (
        <p className="mt-2 text-sm text-foreground" role="status">
          {message}
        </p>
      )}
    </>
  )
}

const studentColumn: Column<InactiveRow> = {
  key: 'student',
  header: 'Student',
  render: (row) => (
    <div>
      <Link
        href={`/admin/students/${row.id}`}
        className="font-medium text-foreground hover:text-primary"
      >
        {row.name || 'Unnamed Student'}
      </Link>
      <div className="text-xs text-muted-foreground">{row.email}</div>
    </div>
  )
}

const schoolColumn: Column<InactiveRow> = {
  key: 'school',
  header: 'School',
  render: (row) => <span className="text-sm text-muted-foreground">{row.school ?? '—'}</span>
}

const lastSeenColumn: Column<InactiveRow> = {
  key: 'lastSeen',
  header: 'Last active',
  render: (row) => <span className="text-sm text-muted-foreground">{formatDate(row.lastSeen)}</span>
}

const noticeColumn: Column<InactiveRow> = {
  key: 'notice',
  header: 'Notice sent',
  render: (row) => (
    <span className="text-sm text-muted-foreground">
      {row.noticeSentAt ? formatDate(row.noticeSentAt) : '—'}
    </span>
  )
}

const deletesColumn: Column<InactiveRow> = {
  key: 'deletes',
  header: 'Deleted on',
  render: (row) => (
    <span className="text-sm text-muted-foreground">
      {row.deletesOn ? formatDate(row.deletesOn) : '—'}
      {row.daysLeft !== null && row.daysLeft > 0 && (
        <span className="ml-1 text-foreground">
          ({row.daysLeft} {row.daysLeft === 1 ? 'day' : 'days'} left)
        </span>
      )}
    </span>
  )
}

const COLUMNS: Record<'dueNotice' | 'notified' | 'dueDeletion', Column<InactiveRow>[]> = {
  dueNotice: [studentColumn, schoolColumn, lastSeenColumn],
  notified: [studentColumn, lastSeenColumn, noticeColumn, deletesColumn],
  dueDeletion: [studentColumn, lastSeenColumn, noticeColumn, deletesColumn]
}

export function InactiveAccountsList({
  list,
  title,
  empty,
  rows
}: {
  list: keyof typeof COLUMNS
  title: string
  empty: string
  rows: InactiveRow[]
}) {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold text-foreground mb-3">
        {title} <span className="text-muted-foreground font-normal">({rows.length})</span>
      </h2>
      {rows.length === 0 ? (
        <p className="rounded-xl border bg-card p-6 text-sm text-muted-foreground">{empty}</p>
      ) : (
        <DataTable columns={COLUMNS[list]} data={rows} getRowKey={(row) => row.id} />
      )}
    </section>
  )
}
