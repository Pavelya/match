'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { School } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ds/Button'
import { ConfirmDialog } from '@/components/ds/ConfirmDialog'
import { Input } from '@/components/ds/Input'
import { useToast } from '@/components/ds/Toast'
import { signOutAfterDeleting } from '@/components/site/sign-out'
import { clearShortlistCount } from '@/lib/shortlist/count'
import { ACCOUNT_DELETED_PATH, isDeleteWord, NAME_MAX, nameToSave } from '@/lib/student/settings'

/*
 * Settings in the new design (rebranding 3.3; boards "D4.11 Settings" and "D4.11 Settings ·
 * phone", approved 18 October 2026), reached from the account menu. Every feature of today's
 * page, in three panels: Account (the email, the name, which saves on its own, and when the
 * account began), School (how linking works, or the school and Unlink), and Your data (Download
 * and Delete account). Appearance and Sign out are in the account menu. Unlink and Delete ask
 * first, in D2.10's dialog; every other outcome is a D2.9 toast, in place of today's alert().
 * Each button calls today's route. Loaded through NewSettings.tsx, so today's design downloads
 * none of it. Replaces AccountSettingsClient, which today's design keeps until release.
 */

export interface SettingsProps {
  email: string
  name: string | null
  /** "12 March 2026" */
  memberSince: string
  school: {
    name: string
    logo: string | null
    /** "Krakow, Poland · linked through an invitation on 2 September 2026" */
    line: string
  } | null
}

const UNLINK_FAILED = 'Couldn’t unlink from your school. Nothing changed. Try again in a moment.'
const DELETE_FAILED = 'Couldn’t delete your account. Nothing was deleted. Try again in a moment.'

const panelClass = 'rounded-card border border-border bg-card'
const headingClass = 'text-h3 px-4 pt-4 pb-0.5 md:px-6 md:pt-5 md:pb-1'

/** A row of Account: its label in a 160px column on desktop, above it on a phone */
function Row({
  label,
  htmlFor,
  children
}: {
  label: string
  htmlFor?: string
  children: ReactNode
}) {
  const labelClass = 'text-[0.9375rem]/[1.375rem] font-medium'
  return (
    <div className="flex flex-col gap-1.5 border-t border-border px-4 py-3.5 first-of-type:border-t-0 md:grid md:grid-cols-[10rem_minmax(0,1fr)] md:items-start md:gap-x-6 md:px-6 md:py-4">
      {htmlFor ? (
        <label htmlFor={htmlFor} className={cn(labelClass, 'md:pt-2.75')}>
          {label}
        </label>
      ) : (
        <span className={labelClass}>{label}</span>
      )}
      {children}
    </div>
  )
}

/** A row of Your data: what it does, under its own h3, and its button */
function DataRow({ title, text, children }: { title: string; text: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3 border-t border-border px-4 py-3.5 first-of-type:border-t-0 md:grid md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-x-6 md:px-6 md:py-4">
      <div className="flex min-w-0 flex-col gap-0.5">
        <h3 className="text-[0.9375rem]/[1.375rem] font-semibold">{title}</h3>
        <p className="text-small font-normal text-muted-foreground">{text}</p>
      </div>
      {children}
    </div>
  )
}

export function SettingsClient(props: SettingsProps) {
  const toast = useToast()

  // The name saves on its own; an empty one is allowed, as today
  const [savedName, setSavedName] = useState(props.name ?? '')
  const [name, setName] = useState(props.name ?? '')
  const [savingName, setSavingName] = useState(false)
  const nameChanged = nameToSave(name) !== nameToSave(savedName)

  const saveName = async () => {
    if (savingName) return
    setSavingName(true)
    const value = nameToSave(name)
    let saved = false
    try {
      const response = await fetch('/api/students/account/update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: value })
      })
      saved = response.ok
    } catch {
      saved = false
    }
    setSavingName(false)
    if (!saved) {
      toast({
        tone: 'gap',
        message: 'Couldn’t save your name.',
        action: { label: 'Try again', onClick: () => again.current.name() }
      })
      return
    }
    setSavedName(value ?? '')
    setName(value ?? '')
    toast({ tone: 'ok', message: 'Name saved.' })
  }

  // The school, until it is unlinked
  const [school, setSchool] = useState(props.school)
  const [unlinkOpen, setUnlinkOpen] = useState(false)
  const [unlinking, setUnlinking] = useState(false)
  const [unlinkError, setUnlinkError] = useState<string | null>(null)
  const schoolHeading = useRef<HTMLHeadingElement>(null)
  const unlinkButton = useRef<HTMLButtonElement>(null)
  // Back to Unlink from school, or to the School heading once there is none (D4.11)
  const unlinkReturn = useRef<HTMLElement | null>(null)

  const unlink = async () => {
    if (unlinking) return
    setUnlinking(true)
    setUnlinkError(null)
    let done = false
    try {
      done = (await fetch('/api/students/school/unlink', { method: 'POST' })).ok
    } catch {
      done = false
    }
    setUnlinking(false)
    if (!done) {
      setUnlinkError(UNLINK_FAILED)
      return
    }
    unlinkReturn.current = schoolHeading.current
    setUnlinkOpen(false)
    setSchool(null)
    toast({ tone: 'ok', message: 'You’re no longer linked to your school.' })
  }

  // Download: "Preparing…", then the file, as today
  const [preparing, setPreparing] = useState(false)
  const download = async () => {
    if (preparing) return
    setPreparing(true)
    try {
      const response = await fetch('/api/students/account/export')
      if (!response.ok) throw new Error(`status ${response.status}`)
      const data = await response.json()
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `ibmatch-data-export-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch {
      toast({
        tone: 'gap',
        message: 'Couldn’t prepare your data.',
        action: { label: 'Try again', onClick: () => again.current.download() }
      })
    } finally {
      setPreparing(false)
    }
  }

  // Delete: the word typed, one request, then signed out onto a page of its own
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [typed, setTyped] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const deleteButton = useRef<HTMLButtonElement>(null)
  const wordField = useRef<HTMLInputElement>(null)

  const deleteAccount = async () => {
    if (deleting || !isDeleteWord(typed)) return
    setDeleting(true)
    setDeleteError(null)
    let done = false
    try {
      done = (await fetch('/api/students/account/delete', { method: 'DELETE' })).ok
    } catch {
      done = false
    }
    if (!done) {
      setDeleting(false)
      setDeleteError(DELETE_FAILED)
      return
    }
    // The nav's count was theirs too (MAINT 5.25)
    clearShortlistCount()
    try {
      // Signs out, then goes to the page; "Deleting…" stays until it arrives
      await signOutAfterDeleting()
    } catch {
      window.location.assign(ACCOUNT_DELETED_PATH)
    }
  }

  // Try again in a toast runs the latest version of each
  const again = useRef({ name: () => {}, download: () => {} })
  useEffect(() => {
    again.current = { name: () => void saveName(), download: () => void download() }
  })

  return (
    // A quiet page: the header's season accessory hides on it (D1.7, app/globals.css)
    <div
      data-quiet=""
      className="mx-auto flex w-full max-w-[58rem] flex-col gap-4 px-4 pt-5 pb-16 md:gap-5 md:px-6 md:pt-10 md:pb-24"
    >
      <div className="flex flex-col gap-1.5">
        <h1 className="text-h1">Settings</h1>
        <p className="text-body text-muted-foreground md:text-body-l">
          Your account, your school and your data.
        </p>
      </div>

      <section aria-labelledby="settings-account" className={panelClass}>
        <h2 id="settings-account" className={headingClass}>
          Account
        </h2>
        <div>
          <Row label="Email">
            <div className="flex min-w-0 flex-col gap-0.5">
              <span className="text-[0.9375rem]/[1.375rem] [overflow-wrap:anywhere]">
                {props.email}
              </span>
              <span className="text-small font-normal text-muted-foreground">
                You sign in with this address, so it can’t be changed here.
              </span>
            </div>
          </Row>
          <Row label="Name" htmlFor="settings-name">
            <form
              onSubmit={(event) => {
                event.preventDefault()
                if (nameChanged) void saveName()
              }}
              className="flex min-w-0 flex-col gap-2"
            >
              <div className="flex flex-col gap-2.5 md:flex-row md:gap-2">
                <Input
                  id="settings-name"
                  autoComplete="name"
                  maxLength={NAME_MAX}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Add your name"
                  aria-describedby="settings-name-hint"
                  className="md:w-90"
                />
                <Button
                  type="submit"
                  disabled={!nameChanged}
                  loading={savingName}
                  loadingLabel="Saving…"
                  className="w-full px-4.5 md:w-auto"
                >
                  Save name
                </Button>
              </div>
              <p id="settings-name-hint" className="text-small font-normal text-muted-foreground">
                Shown in your account menu, and to your school’s coordinator if you link your
                account.
              </p>
            </form>
          </Row>
          <Row label="Member since">
            <span className="text-[0.9375rem]/[1.375rem] tabular-nums">{props.memberSince}</span>
          </Row>
        </div>
      </section>

      <section
        aria-labelledby="settings-school"
        className={cn(panelClass, 'flex flex-col gap-4 p-4 md:px-6 md:pt-5 md:pb-6')}
      >
        <h2 ref={schoolHeading} id="settings-school" tabIndex={-1} className="text-h3 outline-none">
          School
        </h2>
        <div className="grid grid-cols-[2.75rem_minmax(0,1fr)] items-center gap-x-3.5">
          {school?.logo ? (
            // A plain img: next/image would only allow the hosts it knows, and this is 44px
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={school.logo}
              alt=""
              width={44}
              height={44}
              className="size-11 rounded-[0.75rem] border border-border object-cover"
            />
          ) : (
            <span
              aria-hidden="true"
              className="inline-flex size-11 items-center justify-center rounded-[0.75rem] border border-transparent bg-muted text-muted-foreground"
            >
              <School size={22} strokeWidth={1.75} />
            </span>
          )}
          <div className="flex min-w-0 flex-col gap-0.5">
            <p className="text-[0.9375rem]/[1.375rem] font-semibold [overflow-wrap:anywhere]">
              {school ? school.name : 'Not linked to a school'}
            </p>
            {school && (
              <p className="text-small font-normal text-muted-foreground tabular-nums">
                {school.line}
              </p>
            )}
          </div>
        </div>
        <p className="text-body text-muted-foreground">
          {school
            ? 'Coordinators at your school can see your academic profile and your matches, to guide you.'
            : 'If your IB coordinator uses IB Match, they can invite you by email. Accept the invitation, and they can see your academic profile and your matches to guide you.'}
        </p>
        {school && (
          <Button
            ref={unlinkButton}
            variant="secondary"
            onClick={() => {
              unlinkReturn.current = unlinkButton.current
              setUnlinkError(null)
              setUnlinkOpen(true)
            }}
            className="w-full px-4 md:w-auto md:self-start"
          >
            Unlink from school
          </Button>
        )}
      </section>

      <section aria-labelledby="settings-data" className={panelClass}>
        <h2 id="settings-data" className={headingClass}>
          Your data
        </h2>
        <div>
          <DataRow
            title="Download your data"
            text="Your account, profile, grades, interests, countries and shortlist, as a JSON file."
          >
            <Button
              variant="secondary"
              loading={preparing}
              loadingLabel="Preparing…"
              onClick={() => void download()}
              className="w-full px-4 md:w-auto"
            >
              Download
            </Button>
          </DataRow>
          <DataRow
            title="Delete your account"
            text="Deletes your account and everything in it, for good."
          >
            <Button
              ref={deleteButton}
              variant="secondary"
              onClick={() => {
                setTyped('')
                setDeleteError(null)
                setDeleteOpen(true)
              }}
              className="w-full px-4 text-danger md:w-auto"
            >
              Delete account
            </Button>
          </DataRow>
        </div>
      </section>

      <ConfirmDialog
        open={unlinkOpen}
        onCancel={() => setUnlinkOpen(false)}
        danger
        title={`Unlink from ${props.school?.name ?? 'your school'}?`}
        cancelLabel="Cancel"
        actionLabel="Unlink"
        busy={unlinking}
        busyLabel="Unlinking…"
        error={unlinkError}
        onAction={() => void unlink()}
        returnFocusTo={unlinkReturn}
      >
        <p>
          Coordinators at your school will no longer see your academic profile or your matches. To
          link again, your school needs to send you a new invitation.
        </p>
      </ConfirmDialog>

      <ConfirmDialog
        open={deleteOpen}
        onCancel={() => setDeleteOpen(false)}
        danger
        title="Delete your account?"
        cancelLabel="Cancel"
        actionLabel="Delete account"
        busy={deleting}
        busyLabel="Deleting…"
        error={deleteError}
        actionDisabled={!isDeleteWord(typed)}
        actionDescribedBy="delete-word-label"
        onAction={() => void deleteAccount()}
        onRefused={() => wordField.current?.focus()}
        returnFocusTo={deleteButton}
        field={
          <div className="flex flex-col gap-1.5">
            <label
              id="delete-word-label"
              htmlFor="delete-word"
              className="text-[0.9375rem]/[1.375rem] font-medium"
            >
              Type <strong className="font-bold">DELETE</strong> to confirm
            </label>
            <Input
              ref={wordField}
              id="delete-word"
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              value={typed}
              onChange={(event) => setTyped(event.target.value)}
              readOnly={deleting}
              className="read-only:bg-muted"
            />
          </div>
        }
      >
        <p>This deletes everything in your account, for good:</p>
        <ul className="flex list-disc flex-col gap-0.5 pl-5 text-foreground">
          <li>Your account and how you sign in</li>
          <li>Your subjects and grades, interests and countries</li>
          <li>Your shortlist</li>
          {school && <li>Your link to {school.name}</li>}
        </ul>
        <p>You can make a new account with the same email any time.</p>
      </ConfirmDialog>
    </div>
  )
}
