'use client'

import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ds/Button'
import { buttonVariants } from '@/components/ds/button-variants'
import { checkboxClasses } from '@/components/explore/checkbox'
import { chosenLine, toggleChosen } from '@/lib/shortlist/view'
import type { ShortlistItem } from '@/lib/shortlist/types'

/*
 * "Choose programs" and its popover (rebranding 2.5, board "D3.7 Compare table"): a popover
 * holding a labelled dialog, as Explore's filter menus (D3.5). The whole shortlist in its order,
 * as checkbox rows; a choice applies at once and the table changes behind it. Four at most and
 * two at least: a box that can't change is aria-disabled and stays in the tab order, and the line
 * under the list, read with each box, says why. Escape, Done or a click outside closes it.
 * Desktop only; a phone picks its two in selects.
 */

const WIDTH = 420
/** The gap under the button, and the room kept at the window's edges */
const BELOW = 8
const EDGE = 16

interface ComparePickerProps {
  items: ShortlistItem[]
  /** The programs compared now */
  columns: readonly string[]
  onChange: (columns: string[]) => void
}

export function ComparePicker({ items, columns, onChange }: ComparePickerProps) {
  const id = useId()
  const lineId = `${id}-line`
  const button = useRef<HTMLButtonElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const ids = items.map((item) => item.id)

  /** 8px under the button, right edges aligned, as the button sits at the toolbar's end */
  const place = useCallback(() => {
    const anchor = button.current?.getBoundingClientRect()
    const menu = panel.current
    if (!anchor || !menu) return
    const left = Math.max(EDGE, Math.min(anchor.right - WIDTH, window.innerWidth - EDGE - WIDTH))
    const top = anchor.bottom + BELOW
    menu.style.left = `${left}px`
    menu.style.top = `${top}px`
    menu.style.maxHeight = `${Math.max(200, window.innerHeight - top - EDGE)}px`
  }, [])

  // The popover is fixed in the top layer, so it follows its button as the page scrolls
  useEffect(() => {
    if (!open) return
    window.addEventListener('scroll', place, { passive: true })
    window.addEventListener('resize', place)
    return () => {
      window.removeEventListener('scroll', place)
      window.removeEventListener('resize', place)
    }
  }, [open, place])

  const close = () => {
    panel.current?.hidePopover()
    button.current?.focus()
  }

  return (
    <>
      <button
        ref={button}
        type="button"
        popoverTarget={id}
        aria-expanded={open}
        className={cn(
          buttonVariants({ variant: 'secondary' }),
          'pr-3.5 pl-4 aria-expanded:border-line-3'
        )}
      >
        Choose programs
        <ChevronDown aria-hidden="true" size={16} strokeWidth={2} />
      </button>
      <div
        ref={panel}
        id={id}
        popover="auto"
        role="dialog"
        aria-label="Choose programs to compare"
        style={{ width: WIDTH }}
        onBeforeToggle={(event) => {
          if (event.newState === 'open') place()
        }}
        onToggle={(event) => {
          const opening = event.newState === 'open'
          setOpen(opening)
          if (opening) {
            panel.current?.querySelector<HTMLElement>('input')?.focus()
            return
          }
          // Closed with Escape, focus is nowhere: back to the button. A click outside keeps
          // focus where it landed.
          const focused = document.activeElement
          if (!focused || focused === document.body || panel.current?.contains(focused)) {
            button.current?.focus()
          }
        }}
        className="fixed inset-auto m-0 flex-col overflow-hidden rounded-card border border-border bg-popover p-0 text-popover-foreground shadow-overlay open:flex"
      >
        <div className="flex min-h-0 flex-col gap-1 overflow-y-auto overscroll-contain px-4 pt-4 pb-1">
          <span className="text-body font-semibold">Compare up to four</span>
          <fieldset aria-describedby={lineId} className="m-0 min-w-0 border-0 p-0">
            <legend className="sr-only">Programs to compare</legend>
            {items.map((item, index) => {
              const on = columns.includes(item.id)
              const locked = toggleChosen(columns, item.id, !on, ids) === null
              return (
                <label
                  key={item.id}
                  className={cn(
                    'grid cursor-pointer grid-cols-[20px_minmax(0,1fr)] items-start gap-x-3 py-2.5',
                    index > 0 && 'border-t border-border',
                    locked && 'cursor-default text-muted-foreground'
                  )}
                >
                  <input
                    type="checkbox"
                    checked={on}
                    aria-disabled={locked || undefined}
                    onClick={(event) => {
                      // A box that can't change doesn't, even for a moment
                      if (locked) event.preventDefault()
                    }}
                    onChange={(event) => {
                      const next = toggleChosen(columns, item.id, event.target.checked, ids)
                      if (next) onChange(next)
                    }}
                    className={cn(
                      checkboxClasses,
                      'mt-px',
                      locked &&
                        'cursor-default border-line-2 bg-muted checked:border-line-2 checked:bg-line-2'
                    )}
                  />
                  <span className="flex min-w-0 flex-col">
                    <span className="text-[0.9375rem] leading-5 font-medium break-words">
                      {item.name}
                    </span>
                    <span className="text-small text-muted-foreground">{item.university}</span>
                  </span>
                </label>
              )
            })}
          </fieldset>
        </div>
        <div className="flex shrink-0 items-center justify-between gap-4 border-t border-border px-4 py-3">
          <span id={lineId} className="text-small text-muted-foreground tabular-nums">
            {chosenLine(columns.length)}
          </span>
          <Button onClick={close} className="px-4.5">
            Done
          </Button>
        </div>
      </div>
    </>
  )
}
