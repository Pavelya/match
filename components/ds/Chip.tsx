'use client'

import { useEffect, useRef, type ComponentProps, type ReactNode, type RefObject } from 'react'
import { ChevronDown, X } from 'lucide-react'
import { cn } from '@/lib/utils'

/*
 * Chips for the Explore toolbar (rebranding 1.2, canvas board "D2.5 Chips"). Every chip is 36px
 * tall and 8px from the next, with 4px of invisible hit area above and below, so each is a 44px
 * touch target and neighbours never overlap. Labels are Body (15px). No flags on country chips.
 */
const chipBase = cn(
  'relative inline-flex h-9 shrink-0 items-center rounded-full border text-body font-medium whitespace-nowrap',
  'transition-[color,background-color,border-color,scale] duration-180 ease-standard',
  "before:absolute before:inset-x-0 before:-inset-y-1 before:content-['']"
)

/** Forced colours drop the fills, so an applied or on chip takes the system highlight. */
const highlighted =
  'forced-colors:border-[Highlight] forced-colors:bg-[Highlight] forced-colors:text-[HighlightText] forced-colors:outline-[Highlight] forced-colors:forced-color-adjust-none'

interface FilterChipProps extends Omit<ComponentProps<'button'>, 'children'> {
  label: string
  /** How many are chosen; above 0 the chip shows as applied ("Country · 3"). */
  count?: number
  /** Whether its menu is open. */
  expanded: boolean
}

/** Opens a filter menu (D3.5 draws the menus). Named with its count: "Country, 3 chosen". */
export function FilterChip({ label, count = 0, expanded, className, ...props }: FilterChipProps) {
  const applied = count > 0
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      aria-expanded={expanded}
      aria-label={applied ? `${label}, ${count} chosen` : undefined}
      className={cn(
        chipBase,
        'gap-1.5 pr-3 pl-3.5',
        applied
          ? ['border-transparent bg-foreground text-background', highlighted]
          : expanded
            ? 'border-line-3 bg-muted font-semibold text-foreground'
            : 'border-line-2 bg-card text-foreground hover:border-line-3 hover:bg-muted',
        className
      )}
      {...props}
    >
      {applied ? `${label} · ${count}` : label}
      <ChevronDown aria-hidden="true" size={14} strokeWidth={2} className="shrink-0" />
    </button>
  )
}

interface ToggleChipProps extends Omit<ComponentProps<'button'>, 'onClick'> {
  pressed: boolean
  onPressedChange: (pressed: boolean) => void
}

/** On or off, such as "Only ones I qualify for". A button with aria-pressed; the switch is drawing only. */
export function ToggleChip({
  pressed,
  onPressedChange,
  className,
  children,
  ...props
}: ToggleChipProps) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={() => onPressedChange(!pressed)}
      className={cn(
        chipBase,
        'gap-2 pr-3.5 pl-[7px]',
        pressed
          ? ['border-primary bg-brand-soft font-semibold text-brand-ink', highlighted]
          : 'border-line-2 bg-card text-foreground hover:border-line-3 hover:bg-muted',
        className
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className={cn(
          'flex h-5 w-8 shrink-0 items-center rounded-full border p-px transition-colors duration-180 ease-standard',
          pressed
            ? 'border-primary bg-primary forced-colors:border-[HighlightText]'
            : 'border-line-3 bg-line-3'
        )}
      >
        <span
          className={cn(
            'size-4 rounded-full transition-transform duration-180 ease-standard forced-colors:forced-color-adjust-none',
            pressed
              ? 'translate-x-3 bg-primary-foreground forced-colors:bg-[HighlightText]'
              : 'bg-card dark:bg-foreground forced-colors:bg-[CanvasText]'
          )}
        />
      </span>
      {children}
    </button>
  )
}

interface RemovableChipProps extends Omit<ComponentProps<'button'>, 'children'> {
  label: string
}

/** An applied filter. Named "Remove United Kingdom". */
export function RemovableChip({ label, className, ...props }: RemovableChipProps) {
  return (
    <button
      type="button"
      aria-label={`Remove ${label}`}
      className={cn(
        chipBase,
        'gap-1.5 border-transparent bg-muted pr-2.5 pl-3.5 text-foreground',
        'hover:border-line-3 hover:bg-border active:border-line-3 active:bg-border active:duration-120 motion-safe:active:scale-[0.98]',
        className
      )}
      {...props}
    >
      {label}
      <X aria-hidden="true" size={14} strokeWidth={2} className="shrink-0 text-muted-foreground" />
    </button>
  )
}

/** "Clear all", after the removable chips. */
export function ClearChipsButton({
  className,
  children = 'Clear all',
  ...props
}: ComponentProps<'button'>) {
  return (
    <button
      type="button"
      className={cn(
        "relative inline-flex h-9 shrink-0 items-center rounded-chip px-1.5 text-body font-medium text-primary underline underline-offset-3 before:absolute before:inset-x-0 before:-inset-y-1 before:content-['']",
        'transition-colors duration-180 ease-standard hover:text-brand-hover',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

interface RemovableChipGroupProps {
  items: readonly { key: string; label: string }[]
  onRemove: (key: string) => void
  onClearAll: () => void
  /**
   * Where focus goes once the last chip is gone, so it never drops to the top of the page: the
   * result count, with tabIndex={-1}. Its number belongs in a polite live region.
   */
  afterLastRef?: RefObject<HTMLElement | null>
  /** Shown first in the row, such as the result count. */
  children?: ReactNode
  className?: string
}

/**
 * The applied filters with "Clear all". After a removal, focus moves to the next chip, then to
 * Clear all, then to `afterLastRef`.
 */
export function RemovableChipGroup({
  items,
  onRemove,
  onClearAll,
  afterLastRef,
  children,
  className
}: RemovableChipGroupProps) {
  const chips = useRef(new Map<string, HTMLButtonElement>())
  const clearAll = useRef<HTMLButtonElement>(null)
  /** Index to focus once the list has re-rendered without the removed chip. */
  const focusNext = useRef<number | null>(null)

  useEffect(() => {
    const index = focusNext.current
    if (index === null) return
    focusNext.current = null
    const next = items[index] ?? null
    const target = next ? chips.current.get(next.key) : (clearAll.current ?? afterLastRef?.current)
    target?.focus()
  }, [items, afterLastRef])

  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      {children}
      {items.map((item, index) => (
        <RemovableChip
          key={item.key}
          label={item.label}
          ref={(element) => {
            if (element) chips.current.set(item.key, element)
            else chips.current.delete(item.key)
          }}
          onClick={() => {
            focusNext.current = index
            onRemove(item.key)
          }}
        />
      ))}
      {items.length > 0 && (
        <ClearChipsButton
          ref={clearAll}
          onClick={() => {
            focusNext.current = 0
            onClearAll()
          }}
        />
      )}
    </div>
  )
}
