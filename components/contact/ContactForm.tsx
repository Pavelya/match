'use client'

import { useId, useRef, useState, type FormEvent } from 'react'
import { CircleCheck } from 'lucide-react'
import { Button } from '@/components/ds/Button'
import { EmptyState } from '@/components/ds/EmptyState'
import { FieldMessage, fieldClasses, fieldLabelClasses } from '@/components/ds/Field'
import { AuthAlert } from '@/components/sign-in/AuthPage'
import { cn } from '@/lib/utils'

/*
 * Contact's support request in the new design (rebranding 4.3, board "D4.14 Text pages", approved
 * 19 October 2026). The categories are radio rows in a fieldset, each the whole label (today they
 * are buttons with no radio semantics). Errors appear when Send request is pressed, beside each
 * field (D2.2), and go as soon as the field is right; the button is never disabled. The counts
 * stay. A failure keeps everything typed; sent, the ticket number from the response.
 */

const CATEGORIES = [
  { value: 'ACCOUNT_ISSUE', label: 'Account issue', text: 'Login, profile, or account settings' },
  {
    value: 'TECHNICAL_PROBLEM',
    label: 'Technical problem',
    text: 'Bugs, errors, or app not working'
  },
  {
    value: 'MATCHING_QUESTION',
    label: 'Matching question',
    text: 'How matching works or results questions'
  },
  { value: 'DATA_PRIVACY', label: 'Data & privacy', text: 'GDPR requests or data concerns' },
  { value: 'FEATURE_REQUEST', label: 'Feature request', text: 'Suggestions for new features' },
  { value: 'OTHER', label: 'General inquiry', text: 'Other questions or feedback' }
]

const MAX_SUBJECT = 200
const MAX_MESSAGE = 5000

/** What Send request finds missing, in today's words */
export function contactErrors(category: string, subject: string, message: string) {
  return {
    category: category ? null : 'Choose a category',
    subject: subject.trim().length >= 5 ? null : 'Subject must be at least 5 characters.',
    message: message.trim().length >= 20 ? null : 'Message must be at least 20 characters.'
  }
}

const radio = cn(
  'grid size-5 shrink-0 cursor-pointer appearance-none place-content-center rounded-full border border-line-3 bg-card',
  "after:hidden after:size-2.5 after:rounded-full after:bg-primary after:content-['']",
  'checked:border-primary checked:after:block focus-visible:outline-none',
  'forced-colors:checked:border-[Highlight] forced-colors:after:bg-[Highlight] forced-colors:after:forced-color-adjust-none'
)

export function ContactForm({ userName }: { userName: string | null }) {
  const id = useId()
  const [category, setCategory] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [pressed, setPressed] = useState(false)
  const [sending, setSending] = useState(false)
  const [failure, setFailure] = useState<string | null>(null)
  const [ticket, setTicket] = useState<string | null>(null)
  const fields = {
    category: useRef<HTMLInputElement>(null),
    subject: useRef<HTMLInputElement>(null),
    message: useRef<HTMLTextAreaElement>(null)
  }

  // Shown once Send request is pressed, and each goes as soon as its field is right
  const errors = pressed
    ? contactErrors(category, subject, message)
    : { category: null, subject: null, message: null }

  async function send(event: FormEvent) {
    event.preventDefault()
    if (sending) return
    setPressed(true)
    const found = contactErrors(category, subject, message)
    const first = (['category', 'subject', 'message'] as const).find((name) => found[name])
    if (first) {
      fields[first].current?.focus()
      return
    }
    setSending(true)
    setFailure(null)
    try {
      const response = await fetch('/api/support/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, subject: subject.trim(), message: message.trim() })
      })
      const data: { ticketNumber?: string; error?: unknown } = await response
        .json()
        .catch(() => ({}))
      if (!response.ok || !data.ticketNumber) {
        // The route's own reason only where it is one a student can act on
        setFailure(
          response.status === 403 && typeof data.error === 'string'
            ? data.error
            : 'We couldn’t send your request. Please try again.'
        )
        return
      }
      setTicket(data.ticketNumber)
      setCategory('')
      setSubject('')
      setMessage('')
      setPressed(false)
    } catch {
      setFailure('Network error. Please check your connection and try again.')
    } finally {
      setSending(false)
    }
  }

  if (ticket) {
    return (
      <EmptyState
        icon={CircleCheck}
        tone="ok"
        title="Request sent"
        actions={
          <Button variant="secondary" onClick={() => setTicket(null)}>
            Send another request
          </Button>
        }
      >
        <p>Your support request has been submitted successfully.</p>
        <div className="mt-2 flex flex-col gap-0.5 rounded-[0.75rem] border border-border bg-background px-4 py-3.5">
          <span className="text-label">Your ticket number</span>
          <span className="text-[1.375rem] leading-[1.875rem] font-semibold tracking-[0.04em] text-foreground tabular-nums">
            {ticket}
          </span>
        </div>
        <p className="mt-1">
          We’ve sent a confirmation email with your ticket details. We typically respond within
          24–48 hours.
        </p>
      </EmptyState>
    )
  }

  return (
    <section
      aria-label="Support request"
      className="rounded-card border border-border bg-card p-5 md:p-7"
    >
      <form noValidate onSubmit={send} className="flex flex-col gap-6">
        {userName && (
          <p className="text-body-l text-muted-foreground">
            Hi <strong className="font-semibold text-foreground">{userName}</strong>, how can we
            help you?
          </p>
        )}

        <fieldset
          className="flex min-w-0 flex-col gap-2"
          aria-describedby={errors.category ? `${id}-category-message` : undefined}
        >
          <legend className={cn(fieldLabelClasses, 'mb-2')}>Category</legend>
          <div className="grid gap-2 md:grid-cols-2">
            {CATEGORIES.map((option, i) => (
              <label
                key={option.value}
                className={cn(
                  'press-lg grid cursor-pointer grid-cols-[1.25rem_minmax(0,1fr)] items-start gap-x-3 rounded-[0.75rem] border px-3.5 py-3',
                  'has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-2 has-[input:focus-visible]:outline-ring',
                  category === option.value
                    ? 'border-primary bg-brand-soft'
                    : 'border-line-2 bg-card hover:border-line-3 active:border-line-3 active:bg-muted'
                )}
              >
                <input
                  ref={i === 0 ? fields.category : undefined}
                  type="radio"
                  name="category"
                  value={option.value}
                  checked={category === option.value}
                  onChange={() => setCategory(option.value)}
                  className={cn(radio, 'mt-0.5')}
                />
                <span className="flex flex-col">
                  <span className="text-[0.9375rem] leading-[1.375rem] font-semibold">
                    {option.label}
                  </span>
                  <span className="text-small font-normal text-muted-foreground">
                    {option.text}
                  </span>
                </span>
              </label>
            ))}
          </div>
          {errors.category && (
            <FieldMessage id={`${id}-category-message`} tone="error" className="font-medium">
              {errors.category}
            </FieldMessage>
          )}
        </fieldset>

        <Counted
          id={`${id}-subject`}
          label="Subject"
          count={`${subject.length}/${MAX_SUBJECT}`}
          error={errors.subject}
        >
          <input
            ref={fields.subject}
            id={`${id}-subject`}
            type="text"
            value={subject}
            maxLength={MAX_SUBJECT}
            onChange={(event) => setSubject(event.target.value.slice(0, MAX_SUBJECT))}
            placeholder="Brief summary of your issue"
            aria-invalid={errors.subject ? true : undefined}
            aria-describedby={errors.subject ? `${id}-subject-message` : undefined}
            className={fieldClasses}
          />
        </Counted>

        <Counted
          id={`${id}-message`}
          label="Message"
          count={`${message.length}/${MAX_MESSAGE}`}
          error={errors.message}
        >
          <textarea
            ref={fields.message}
            id={`${id}-message`}
            rows={6}
            value={message}
            maxLength={MAX_MESSAGE}
            onChange={(event) => setMessage(event.target.value.slice(0, MAX_MESSAGE))}
            placeholder="Please describe your issue or question in detail. Include any relevant information that might help us assist you."
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? `${id}-message-message` : undefined}
            className={cn(fieldClasses, 'h-auto min-h-38 resize-y py-3 aria-invalid:py-[11px]')}
          />
        </Counted>

        {failure && <AuthAlert>{failure}</AuthAlert>}

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-5">
          <Button
            type="submit"
            size="lg"
            loading={sending}
            loadingLabel="Sending…"
            className="max-md:w-full"
          >
            Send request
          </Button>
          <p className="text-small font-normal text-muted-foreground">
            We typically respond within 24–48 hours during business days.
          </p>
        </div>
      </form>
    </section>
  )
}

/** A field with its count beside the label, and its error under it */
function Counted({
  id,
  label,
  count,
  error,
  children
}: {
  id: string
  label: string
  count: string
  error: string | null
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className={fieldLabelClasses}>
          {label}
        </label>
        <span
          aria-hidden="true"
          className="text-small font-normal text-muted-foreground tabular-nums"
        >
          {count}
        </span>
      </div>
      {children}
      {error && (
        <FieldMessage id={`${id}-message`} tone="error" className="font-medium">
          {error}
        </FieldMessage>
      )}
    </div>
  )
}
