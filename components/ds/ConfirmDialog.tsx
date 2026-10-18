'use client'

import { useEffect, useId, useRef, useState, type ReactNode, type RefObject } from 'react'
// Lucide's TriangleAlert, by the name today's pages import it under: the other name restructured
// the icon's module in the chunk every page loads (11 bytes more for every visitor)
import { AlertTriangle, CircleAlert } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './Button'

/*
 * The one dialog that asks before something can't be undone or would be lost (rebranding 3.3,
 * canvas board "D2.10 Confirm dialog", approved 18 October 2026): deleting the account, unlinking
 * from a school, and leaving an edit unsaved. A native dialog opened with showModal, so the page
 * behind it is inert and Tab stays inside; role="alertdialog", named by its title and described by
 * its text. Focus starts on the safe button, Escape is Cancel, and a click on the dimmed page does
 * nothing. The primary is on the right. Working and failing happen inside it: the action says
 * "Deleting…" while Cancel waits, and a failure keeps it open with the reason above the buttons.
 * Replaces today's two shadcn dialogs and the browser's alert() in Settings.
 */

/** In: a fade and an 8px rise in 240ms. Out: 180ms (D2.10) */
const CLOSING_MS = 180

interface ConfirmDialogProps {
  open: boolean
  /** Cancel, Keep editing, or Escape. Not offered while the action works. */
  onCancel: () => void
  /** A question: "Delete your account?" */
  title: string
  /**
   * It deletes or takes away access: Lucide TriangleAlert before the title, and the action is the
   * danger button on the right. Otherwise (leaving an edit) the action is secondary, on the left,
   * and the safe button is the primary.
   */
  danger?: boolean
  /** What happens: a sentence, or a sentence and a short list */
  children: ReactNode
  /** A field between the text and the buttons: "Type DELETE to confirm" */
  field?: ReactNode
  /** Why the action failed. Read at once, and focus moves to the action to try again. */
  error?: string | null
  cancelLabel: string
  actionLabel: string
  /** The action works: its label is `busyLabel` ("Deleting…"), and Cancel and Escape wait */
  busy?: boolean
  busyLabel?: string
  /** aria-disabled until the field is right; pressing it then calls `onRefused` */
  actionDisabled?: boolean
  actionDescribedBy?: string
  onAction: () => void
  onRefused?: () => void
  /**
   * Where focus goes when it closes, read then. Without it, the control that had focus when it
   * opened; Safari doesn't focus a pressed button, so pass the opener.
   */
  returnFocusTo?: RefObject<HTMLElement | null>
}

export function ConfirmDialog({
  open,
  onCancel,
  title,
  danger = false,
  children,
  field,
  error,
  cancelLabel,
  actionLabel,
  busy = false,
  busyLabel,
  actionDisabled = false,
  actionDescribedBy,
  onAction,
  onRefused,
  returnFocusTo
}: ConfirmDialogProps) {
  const dialog = useRef<HTMLDialogElement>(null)
  const safe = useRef<HTMLButtonElement>(null)
  const action = useRef<HTMLButtonElement>(null)
  const opener = useRef<HTMLElement | null>(null)
  const [shown, setShown] = useState(false)
  const id = useId()

  useEffect(() => {
    const box = dialog.current
    if (!box) return
    if (open && !box.open) {
      opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
      box.showModal()
      // showModal focuses the first control; the safe one takes it instead
      safe.current?.focus()
      const frame = requestAnimationFrame(() => setShown(true))
      return () => cancelAnimationFrame(frame)
    }
    if (!open && box.open) {
      // It fades out first, then closes
      const timer = setTimeout(() => box.close(), CLOSING_MS)
      return () => clearTimeout(timer)
    }
  }, [open])

  // A failure is read out by its role; focus moves to the action, to try again
  useEffect(() => {
    if (error) action.current?.focus()
  }, [error])

  const visible = open && shown
  const size = 'h-12 w-full px-3 md:h-11 md:w-auto md:px-4.5'

  const cancel = (
    <Button
      ref={safe}
      variant={danger ? 'secondary' : 'primary'}
      disabled={busy}
      onClick={onCancel}
      className={size}
    >
      {cancelLabel}
    </Button>
  )
  const act = (
    <Button
      ref={action}
      variant={danger ? 'danger' : 'secondary'}
      disabled={actionDisabled}
      loading={busy}
      loadingLabel={busyLabel}
      aria-describedby={actionDescribedBy}
      onClick={onAction}
      onRefused={onRefused}
      className={size}
    >
      {actionLabel}
    </Button>
  )

  return (
    <dialog
      ref={dialog}
      role="alertdialog"
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-text`}
      // Escape is Cancel, except while the action works
      onCancel={(event) => {
        event.preventDefault()
        if (!busy) onCancel()
      }}
      onClose={() => {
        setShown(false)
        ;(returnFocusTo?.current ?? opener.current)?.focus()
        // Closed by the browser rather than by `open` (a second Escape): say so
        if (open) onCancel()
      }}
      className={cn(
        'm-auto h-fit max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-120 overflow-y-auto overscroll-contain rounded-[1rem] border border-border bg-card p-5 text-card-foreground shadow-overlay md:p-6',
        'backdrop:bg-[rgb(20_22_27/0.42)] backdrop:transition-opacity dark:backdrop:bg-black/60',
        // Reduced motion keeps the fade, which the important durations let through the global
        // reduced-motion rule, and drops the rise
        'transition-[opacity,translate] ease-standard motion-reduce:transition-opacity',
        visible
          ? 'translate-y-0 opacity-100 duration-240 backdrop:opacity-100 backdrop:duration-240 motion-reduce:duration-240!'
          : 'opacity-0 duration-180 backdrop:opacity-0 backdrop:duration-180 motion-safe:translate-y-2 motion-reduce:duration-180!'
      )}
    >
      <div className="flex flex-col gap-4.5 md:gap-5">
        <div className="flex items-start gap-3">
          {danger && (
            <AlertTriangle
              aria-hidden="true"
              size={22}
              strokeWidth={2}
              className="mt-0.75 shrink-0 text-danger"
            />
          )}
          <h2
            id={`${id}-title`}
            className="text-[1.25rem]/7 font-semibold [overflow-wrap:anywhere]"
          >
            {title}
          </h2>
        </div>
        <div id={`${id}-text`} className="flex flex-col gap-2.5 text-body text-muted-foreground">
          {children}
        </div>
        {field}
        {error && (
          <p role="alert" className="flex items-start gap-2 text-body font-medium text-gap">
            <CircleAlert
              aria-hidden="true"
              size={18}
              strokeWidth={2}
              className="mt-0.75 shrink-0"
            />
            <span>{error}</span>
          </p>
        )}
        <div className="grid grid-cols-2 gap-2.5 md:flex md:justify-end md:gap-2">
          {danger ? cancel : act}
          {danger ? act : cancel}
        </div>
      </div>
    </dialog>
  )
}
