import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { checkboxClasses } from '@/components/explore/checkbox'

/*
 * Checkbox rows and tiles (rebranding 3.1, canvas "D2.6 Checkbox rows and grid", approved 13
 * October 2026). A real checkbox; the whole row is its label, with Explore's box at the right end.
 * Chosen shows the tick, a 1px brand edge and the brand-soft fill; the name keeps its weight, so
 * nothing reflows. Hover darkens the edge, pressed is the sunken fill, and focus is the outline
 * round the whole row. A press is D1.6's for rows: 99% with the sunken fill. Not a client
 * module: first run renders it inside its own.
 */

const choice = [
  'group press-lg cursor-pointer border border-border bg-card text-foreground',
  'hover:border-line-3 active:border-line-3 active:bg-muted',
  'has-checked:border-primary has-checked:bg-brand-soft has-checked:hover:border-brand-ink has-checked:active:bg-brand-soft',
  'has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-2 has-[input:focus-visible]:outline-ring',
  // A chosen row keeps a second cue in forced colours, besides the box
  'forced-colors:has-checked:border-[Highlight]'
].join(' ')

/** At a limit the box is grey and aria-disabled: still reachable, and the footer says why */
const box = cn(
  checkboxClasses,
  'aria-disabled:cursor-not-allowed aria-disabled:border-line-2 aria-disabled:bg-muted forced-colors:aria-disabled:border-[GrayText]',
  // The row draws the focus outline
  'focus-visible:outline-none'
)

interface ChoiceProps {
  id: string
  name: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  /** At a limit: pressing ticks nothing, and `onRefused` says why */
  limited?: boolean
  onRefused?: () => void
}

function Box({
  id,
  checked,
  onCheckedChange,
  limited,
  onRefused,
  described
}: ChoiceProps & { described: boolean }) {
  return (
    <input
      type="checkbox"
      className={box}
      checked={checked}
      aria-disabled={limited || undefined}
      aria-labelledby={`${id}-name`}
      aria-describedby={described ? `${id}-description` : undefined}
      onClick={(event) => {
        if (!limited) return
        event.preventDefault()
        onRefused?.()
      }}
      // React reports a change even when the click is cancelled; at a limit there is none
      onChange={(event) => {
        if (!limited) onCheckedChange(event.target.checked)
      }}
    />
  )
}

/** A field on step 1: the icon, the name, the examples (which wrap, never cut) and the box */
export function CheckboxRow({
  icon: Icon,
  description,
  className,
  ...props
}: ChoiceProps & { icon: LucideIcon; description?: string; className?: string }) {
  return (
    <label
      className={cn(
        choice,
        'grid min-h-14 grid-cols-[36px_minmax(0,1fr)_20px] items-center gap-x-3 rounded-[0.75rem] py-2 pr-3.5 pl-2',
        className
      )}
    >
      <span
        aria-hidden="true"
        className="inline-flex size-9 items-center justify-center rounded-[0.5625rem] border border-transparent bg-muted text-muted-foreground transition-[background-color,color] duration-120 ease-standard group-has-checked:bg-card group-has-checked:text-primary"
      >
        <Icon size={20} strokeWidth={1.75} />
      </span>
      <span className="flex min-w-0 flex-col">
        <span id={`${props.id}-name`} className="text-body/[1.375rem] font-semibold">
          {props.name}
        </span>
        {description && (
          <span
            id={`${props.id}-description`}
            className="text-small font-normal text-muted-foreground"
          >
            {description}
          </span>
        )}
      </span>
      <Box {...props} described={Boolean(description)} />
    </label>
  )
}

/** A country on step 2: the name, which wraps, then the box */
export function CheckboxTile({ className, ...props }: ChoiceProps & { className?: string }) {
  return (
    <label
      className={cn(
        choice,
        'flex min-h-12 items-center justify-between gap-2 rounded-[0.625rem] py-1.5 pr-3.25 pl-3.5 text-body/5 font-medium',
        className
      )}
    >
      <span id={`${props.id}-name`} className="min-w-0 break-words">
        {props.name}
      </span>
      <Box {...props} described={false} />
    </label>
  )
}
