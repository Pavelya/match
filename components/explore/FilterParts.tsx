'use client'

import { useId, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { FieldMessage } from '@/components/ds/Field'
import { Input } from '@/components/ds/Input'
import { POINTS, POINTS_ERROR, readPoints } from '@/lib/explore/query'

/*
 * What the desktop menus (D3.5) and the phone sheet (D2.15) both hold: rows of checkboxes, the
 * IB points range with its no-minimum box, and the shortcuts from the student's profile. Every
 * choice applies at once. Checkboxes use the line-3 edge and a brand fill, as both boards draw
 * them; D2.6 settles the checkbox row for first run (3.1).
 */

export const checkboxClasses = cn(
  'grid size-5 shrink-0 cursor-pointer appearance-none place-content-center rounded-[5px] border border-line-3 bg-card',
  "after:hidden after:-mt-[3px] after:h-[5px] after:w-2.5 after:-rotate-45 after:border-b-2 after:border-l-2 after:border-primary-foreground after:content-['']",
  'checked:border-primary checked:bg-primary checked:after:block',
  // Ticked boxes take Highlight in forced colours (D2.15)
  'forced-colors:border-[CanvasText] forced-colors:bg-[Canvas] forced-colors:forced-color-adjust-none forced-colors:after:border-[HighlightText] forced-colors:checked:border-[Highlight] forced-colors:checked:bg-[Highlight]'
)

export interface Option {
  id: string
  name: string
}

/** A filter's options as checkbox rows: 40px in a menu, 44px in the sheet */
export function Choices({
  options,
  chosen,
  onToggle,
  columns,
  tall = false
}: {
  options: readonly Option[]
  chosen: readonly string[]
  onToggle: (id: string, on: boolean) => void
  columns: 1 | 2
  tall?: boolean
}) {
  return (
    <div className={cn('grid', columns === 2 ? 'grid-cols-2 gap-x-3 md:gap-x-4' : 'grid-cols-1')}>
      {options.map((option) => (
        <CheckRow
          key={option.id}
          checked={chosen.includes(option.id)}
          onChange={(on) => onToggle(option.id, on)}
          className={tall ? 'min-h-11' : 'min-h-10'}
        >
          {option.name}
        </CheckRow>
      ))}
    </div>
  )
}

export function CheckRow({
  checked,
  onChange,
  className,
  children
}: {
  checked: boolean
  onChange: (checked: boolean) => void
  className?: string
  children: ReactNode
}) {
  return (
    <label
      className={cn(
        'flex cursor-pointer items-center gap-2.5 text-[0.9375rem] leading-5',
        className
      )}
    >
      <input
        type="checkbox"
        className={checkboxClasses}
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      {children}
    </label>
  )
}

/** "Use my fields", "Use my countries", "Up to my 38": tick the student's own choices */
export function Shortcut({
  onClick,
  className,
  children
}: {
  onClick: () => void
  className?: string
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        '-my-2.5 -mr-2 inline-flex h-11 shrink-0 items-center rounded-chip px-2 text-[0.875rem] font-semibold text-primary underline-offset-3 hover:underline',
        className
      )}
    >
      {children}
    </button>
  )
}

interface PointsInputsProps {
  from: number | null
  to: number | null
  noMin: boolean
  /** A usable range, applied at once; one it can't use is never applied */
  onRange: (from: number | null, to: number | null) => void
  onNoMin: (noMin: boolean) => void
  /** The sheet's fields share the width; the menu's are 96px */
  wide?: boolean
}

/**
 * From and To, the program's minimum (D2.2's field). A value it can't use shows the error once
 * the field loses focus, and until both are usable no range applies: the count is the one
 * without it, and the chip isn't filled (D3.5). The error goes as soon as the value is right.
 * Empty means any minimum.
 */
export function PointsInputs({
  from,
  to,
  noMin,
  onRange,
  onNoMin,
  wide = false
}: PointsInputsProps) {
  const id = useId()
  const messageId = `${id}-message`
  const [text, setText] = useState({ from: show(from), to: show(to) })
  const [left, setLeft] = useState({ from: false, to: false })

  // Follow a change made elsewhere ("Up to my 38", the other layout's fields), unless the
  // fields already say it: a range typed the wrong way round applies the right way round, as
  // typed, and one it can't use applies as none. A reset to what is already applied (Clear
  // with a value it can't use) remounts this instead.
  const [following, setFollowing] = useState({ from, to })
  if (following.from !== from || following.to !== to) {
    setFollowing({ from, to })
    const [lower, upper] = applied(text.from, text.to)
    if (lower !== from || upper !== to) setText({ from: show(from), to: show(to) })
  }

  const change = (field: 'from' | 'to', value: string) => {
    const next = { ...text, [field]: value }
    setText(next)
    const [lower, upper] = applied(next.from, next.to)
    if (lower !== from || upper !== to) onRange(lower, upper)
  }

  const wrong = {
    from: left.from && readPoints(text.from) === 'invalid',
    to: left.to && readPoints(text.to) === 'invalid'
  }
  const error = wrong.from || wrong.to

  const field = (name: 'from' | 'to', label: string, placeholder: number) => (
    <label
      className={cn(
        'flex flex-col gap-1 text-small font-normal text-muted-foreground',
        wide ? 'min-w-0 flex-1' : 'w-24'
      )}
    >
      {label}
      <Input
        inputMode="numeric"
        autoComplete="off"
        placeholder={String(placeholder)}
        value={text[name]}
        aria-invalid={wrong[name] || undefined}
        aria-describedby={messageId}
        onChange={(event) => change(name, event.target.value)}
        onBlur={() => setLeft((l) => ({ ...l, [name]: true }))}
        className="tabular-nums"
      />
    </label>
  )

  return (
    <fieldset className="flex min-w-0 flex-col gap-1.5">
      <legend className="sr-only">IB points, the program’s minimum</legend>
      <div className="flex items-end gap-2.5">
        {field('from', 'From', POINTS.min)}
        <span className="flex h-11 items-center text-body text-muted-foreground">to</span>
        {field('to', 'To', POINTS.max)}
      </div>
      <FieldMessage id={messageId} tone={error ? 'error' : 'hint'}>
        {error
          ? POINTS_ERROR
          : wide
            ? `Any whole number from ${POINTS.min} to ${POINTS.max}`
            : `The program’s minimum: any whole number from ${POINTS.min} to ${POINTS.max}`}
      </FieldMessage>
      <CheckRow checked={noMin} onChange={onNoMin} className="mt-1.5 items-start [&>input]:mt-0">
        <span className="flex flex-col gap-0.5">
          <span>Include programs with no IB minimum</span>
          <span className="text-small font-normal text-muted-foreground">
            All 12 US universities admit without one
          </span>
        </span>
      </CheckRow>
    </fieldset>
  )
}

function show(points: number | null): string {
  return points === null ? '' : String(points)
}

/** The range both fields give, lower first; none while either can't be used */
function applied(fromText: string, toText: string): [number | null, number | null] {
  const from = readPoints(fromText)
  const to = readPoints(toText)
  if (from === 'invalid' || to === 'invalid') return [null, null]
  if (from !== null && to !== null && from > to) return [to, from]
  return [from, to]
}
