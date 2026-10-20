'use client'

import { useEffect, useRef, useState, type ReactNode, type RefObject } from 'react'
import { ListFilter, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ds/Button'
import { chipBase, highlighted } from '@/components/ds/Chip'
import { showLabel } from '@/lib/explore/query'

/*
 * Explore's filters on a phone (rebranding 2.3, canvas board "D2.15 Bottom sheet", approved 11
 * October 2026). A native dialog opened with showModal: it keeps focus inside, makes the page
 * behind it inert, and closes with Escape and Android's Back. No drag handle. Its "Filters"
 * heading takes focus first, so the name is read before the first control; closing returns
 * focus to the Filters button. A choice applies at once, so closing never loses one, whichever
 * way it closes: the button, the X, the scrim, Escape or Back.
 */

/** Opens in 240ms and closes in 180ms (D2.15) */
const CLOSING_MS = 180

interface FilterSheetProps {
  open: boolean
  onDismiss: () => void
  /** The list's total once it settles; null when it didn't arrive */
  total: number | null
  onClearAll: () => void
  canClear: boolean
  /** Said once the count settles: "43 programs" */
  live: string
  /**
   * The Filters button, which gets focus back. The dialog's own return needs the button to have
   * had focus, and Safari doesn't focus a button that is tapped or clicked.
   */
  returnFocusTo: RefObject<HTMLElement | null>
  children: ReactNode
}

export function FilterSheet({
  open,
  onDismiss,
  total,
  onClearAll,
  canClear,
  live,
  returnFocusTo,
  children
}: FilterSheetProps) {
  const dialog = useRef<HTMLDialogElement>(null)
  const heading = useRef<HTMLHeadingElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const sheet = dialog.current
    if (!sheet) return
    if (open && !sheet.open) {
      sheet.showModal()
      heading.current?.focus()
      // The page behind stays where it is
      document.documentElement.style.overflow = 'hidden'
      const frame = requestAnimationFrame(() => setShown(true))
      return () => cancelAnimationFrame(frame)
    }
    if (!open && sheet.open) {
      // It slides down first, then closes
      const timer = setTimeout(() => sheet.close(), CLOSING_MS)
      return () => clearTimeout(timer)
    }
  }, [open])

  const visible = open && shown

  return (
    <dialog
      ref={dialog}
      aria-labelledby="explore-filters-title"
      // Escape and Back close it the same way as the X: sliding down
      onCancel={(event) => {
        event.preventDefault()
        onDismiss()
      }}
      onClose={() => {
        document.documentElement.style.overflow = ''
        setShown(false)
        returnFocusTo.current?.focus()
        if (open) onDismiss()
      }}
      // A tap on the scrim lands on the dialog itself; its contents fill the sheet
      onClick={(event) => {
        if (event.target === event.currentTarget) onDismiss()
      }}
      className={cn(
        'fixed inset-x-0 top-auto bottom-0 m-0 h-[92dvh] max-h-none w-full max-w-none flex-col overflow-hidden rounded-t-sheet border border-b-0 border-border bg-card p-0 text-card-foreground shadow-overlay open:flex',
        'backdrop:bg-[rgb(20_22_27/0.42)] backdrop:transition-opacity dark:backdrop:bg-black/60',
        // Reduced motion fades it in place (globals.css, D1.6)
        'transition-[opacity,translate] ease-standard',
        visible
          ? 'duration-240 backdrop:opacity-100 motion-safe:translate-y-0'
          : 'duration-180 backdrop:opacity-0 motion-safe:translate-y-full motion-reduce:opacity-0'
      )}
    >
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-border pr-1.5 pl-4">
        <h2
          ref={heading}
          id="explore-filters-title"
          tabIndex={-1}
          className="text-h3 focus:outline-none"
        >
          Filters
        </h2>
        <button
          type="button"
          aria-label="Close filters"
          onClick={onDismiss}
          className="inline-flex size-11 items-center justify-center rounded-control border border-transparent text-foreground hover:bg-muted"
        >
          <X aria-hidden="true" size={20} strokeWidth={2} />
        </button>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto overscroll-contain px-4 pt-4 pb-6 *:shrink-0">
        {children}
      </div>

      <div className="grid shrink-0 grid-cols-[auto_minmax(0,1fr)] gap-x-3 border-t border-border bg-card px-4 pt-3 pb-[calc(1.75rem+env(safe-area-inset-bottom))]">
        <button
          type="button"
          aria-disabled={!canClear || undefined}
          onClick={() => canClear && onClearAll()}
          className={cn(
            'inline-flex h-12 items-center rounded-control px-3 text-body font-medium underline-offset-3',
            canClear
              ? 'text-primary underline pressed:text-brand-ink pressed:underline'
              : 'text-ink-3'
          )}
        >
          Clear all
        </button>
        <Button
          disabled={total === 0}
          onClick={onDismiss}
          className="h-12 w-full text-[1rem] tabular-nums"
        >
          {showLabel(total)}
        </Button>
      </div>
      <span role="status" className="sr-only">
        {live}
      </span>
    </dialog>
  )
}

/** The phone's one Filters button, carrying how many are chosen: "Filters · 3" */
export function FiltersButton({
  chosen,
  open,
  onClick,
  ref
}: {
  chosen: number
  open: boolean
  onClick: () => void
  ref: RefObject<HTMLButtonElement | null>
}) {
  const applied = chosen > 0
  return (
    <button
      ref={ref}
      type="button"
      aria-haspopup="dialog"
      aria-expanded={open}
      aria-label={applied ? `Filters, ${chosen} chosen` : undefined}
      onClick={onClick}
      className={cn(
        chipBase,
        'gap-1.5 pr-3.5 pl-3',
        applied
          ? ['border-transparent bg-foreground text-background', highlighted]
          : 'border-line-2 bg-card text-foreground hover:border-line-3 hover:bg-muted pressed:border-line-3 pressed:bg-border'
      )}
    >
      <ListFilter aria-hidden="true" size={16} strokeWidth={2} className="shrink-0" />
      {applied ? `Filters · ${chosen}` : 'Filters'}
    </button>
  )
}

/** "Only ones I qualify for" in the sheet: a row with what it means, and the switch */
export function QualifyRow({
  pressed,
  total,
  onPressedChange
}: {
  pressed: boolean
  total: number | null
  onPressedChange: (pressed: boolean) => void
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={() => onPressedChange(!pressed)}
      className={cn(
        'grid min-h-16 w-full grid-cols-[minmax(0,1fr)_40px] items-center gap-x-3 rounded-[0.75rem] border px-3.5 py-2.5 text-left',
        'transition-[color,background-color,border-color] duration-180 ease-standard',
        pressed
          ? ['border-primary bg-brand-soft text-brand-ink', highlighted]
          : 'border-line-2 bg-card text-foreground'
      )}
    >
      <span className="flex flex-col">
        <span className="text-body font-semibold">Only ones I qualify for</span>
        <span className="text-small font-normal text-muted-foreground forced-colors:text-[inherit]">
          Every requirement met with your {total === null ? '' : `${total} `}points and subjects
        </span>
      </span>
      <span
        aria-hidden="true"
        className={cn(
          'flex h-6 w-10 items-center rounded-full border p-px transition-colors duration-180 ease-standard',
          pressed
            ? 'border-primary bg-primary forced-colors:border-[HighlightText]'
            : 'border-line-3 bg-line-3'
        )}
      >
        <span
          className={cn(
            'size-5 rounded-full transition-transform duration-180 ease-standard forced-colors:forced-color-adjust-none',
            pressed
              ? 'translate-x-4 bg-primary-foreground forced-colors:bg-[HighlightText]'
              : 'bg-card dark:bg-foreground forced-colors:bg-[CanvasText]'
          )}
        />
      </span>
    </button>
  )
}
