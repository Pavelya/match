'use client'

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { Button } from '@/components/ds/Button'
import { FilterChip } from '@/components/ds/Chip'
import { cn } from '@/lib/utils'
import { showLabel } from '@/lib/explore/query'

/*
 * A desktop filter chip and the menu it opens (rebranding 2.3, canvas board "D3.5 Filter
 * toolbar", approved 11 October 2026). The menu is a popover (the HTML popover attribute) holding
 * a small dialog named by its chip, not an ARIA menu: it holds checkboxes and number fields. The
 * browser brings Escape, a click outside and one menu at a time; either way the choice stays,
 * because a choice applies the moment it's made. Opening moves focus to the first field;
 * closing returns it to the chip. The footer holds Clear, for this filter alone, and the button
 * that says what's there and closes the menu.
 */

interface FilterMenuProps {
  /** The popover's id, which the chip points at */
  id: string
  label: string
  count?: number
  /** What the chip names once chosen: "up to 38" */
  chosen?: string | null
  /** Field 320, Country 440, IB points 340, Length 300 */
  width: number
  shortcut?: ReactNode
  /** The list's total once it settles; null when it didn't arrive */
  total: number | null
  onClear: () => void
  canClear: boolean
  children: ReactNode
}

/** The gap under the chip, and the room kept at the window's edges */
const BELOW = 8
const EDGE = 16

export function FilterMenu({
  id,
  label,
  count,
  chosen,
  width,
  shortcut,
  total,
  onClear,
  canClear,
  children
}: FilterMenuProps) {
  const chip = useRef<HTMLButtonElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

  /** 8px under the chip, left edges aligned; at the window's right edge it opens leftwards */
  const place = useCallback(() => {
    const anchor = chip.current?.getBoundingClientRect()
    const menu = panel.current
    if (!anchor || !menu) return
    const left =
      anchor.left + width > window.innerWidth - EDGE
        ? Math.max(EDGE, anchor.right - width)
        : anchor.left
    const top = anchor.bottom + BELOW
    menu.style.left = `${left}px`
    menu.style.top = `${top}px`
    menu.style.maxHeight = `${Math.max(200, window.innerHeight - top - EDGE)}px`
  }, [width])

  // The menu is fixed in the top layer, so it follows its chip as the page scrolls
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
    chip.current?.focus()
  }

  const nothing = total === 0

  return (
    <>
      <FilterChip
        ref={chip}
        label={label}
        count={count}
        chosen={chosen}
        expanded={open}
        popoverTarget={id}
      />
      <div
        ref={panel}
        id={id}
        popover="auto"
        role="dialog"
        aria-label={label}
        style={{ width }}
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
          // Closed with Escape, focus is nowhere: back to the chip. A click outside keeps
          // focus where it landed.
          const focused = document.activeElement
          if (!focused || focused === document.body || panel.current?.contains(focused)) {
            chip.current?.focus()
          }
        }}
        className={cn(
          // The popover's own placement is replaced by the chip's position
          'fixed inset-auto m-0 flex-col overflow-hidden rounded-card border border-border bg-popover p-0 text-popover-foreground shadow-overlay open:flex'
        )}
      >
        <div className="flex min-h-0 flex-col gap-2 overflow-y-auto overscroll-contain px-4 pt-4 pb-2">
          <div className="flex min-h-6 items-center justify-between gap-3">
            <span className="text-body font-semibold">{label}</span>
            {shortcut}
          </div>
          {children}
        </div>
        <div className="mt-2 flex shrink-0 items-center justify-between gap-3 border-t border-border px-4 py-3">
          <button
            type="button"
            aria-disabled={!canClear || undefined}
            onClick={() => canClear && onClear()}
            className={cn(
              '-ml-1.5 inline-flex h-11 items-center rounded-chip px-1.5 text-body font-medium underline-offset-3',
              canClear ? 'text-primary underline hover:text-brand-hover' : 'text-ink-3'
            )}
          >
            Clear
          </button>
          <Button disabled={nothing} onClick={close} className="px-4.5 tabular-nums">
            {showLabel(total)}
          </Button>
        </div>
      </div>
    </>
  )
}
