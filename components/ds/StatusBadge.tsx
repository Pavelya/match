import type { ReactNode } from 'react'
import { Check, Info, Minus, X, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

/*
 * A program's status and the evidence for it (rebranding 1.2, canvas board "D2.7 Status badge and
 * requirement chip"; 04-design-system.md §9). Every kind has an icon, a colour and words, so
 * neither colour nor the icon carries the meaning alone. Neither is interactive. The transparent
 * border becomes each one's edge in forced colours.
 */

export type MatchStatus = 'meets' | 'close' | 'gap' | 'neutral'

const STATUS: Record<MatchStatus, { Icon: LucideIcon; classes: string }> = {
  meets: { Icon: Check, classes: 'bg-ok-soft text-ok' },
  close: { Icon: Minus, classes: 'bg-close-soft text-close' },
  gap: { Icon: X, classes: 'bg-gap-soft text-gap' },
  neutral: { Icon: Info, classes: 'bg-muted text-muted-foreground' }
}

interface StatusBadgeProps {
  status: MatchStatus
  /** `md` (28px) on cards and rows; `lg` (34px) for the program page's "Your fit". */
  size?: 'md' | 'lg'
  /** Specific copy: "Within reach · 1 point short", "Needs Biology HL and Chemistry HL". */
  children: ReactNode
  className?: string
}

/** The one source of status styling. */
export function StatusBadge({ status, size = 'md', children, className }: StatusBadgeProps) {
  const { Icon, classes } = STATUS[status]
  const large = size === 'lg'
  return (
    <span
      className={cn(
        'inline-flex w-fit items-center rounded-full border border-transparent font-semibold tabular-nums',
        large ? 'min-h-8.5 gap-2 px-3 text-body' : 'min-h-7 gap-1.5 px-2.5 text-small',
        classes,
        className
      )}
    >
      <Icon
        aria-hidden="true"
        size={large ? 16 : 14}
        strokeWidth={status === 'neutral' ? 2.2 : 2.4}
        className="shrink-0"
      />
      {children}
    </span>
  )
}

export type RequirementKind = 'met' | 'close' | 'gap' | 'info'

const KIND: Record<RequirementKind, { Icon: LucideIcon; classes: string; spoken: string }> = {
  met: { Icon: Check, classes: 'bg-ok-soft text-ok', spoken: 'Met: ' },
  close: { Icon: Minus, classes: 'bg-close-soft text-close', spoken: 'Close: ' },
  gap: { Icon: X, classes: 'bg-gap-soft text-gap', spoken: 'Missing: ' },
  info: { Icon: Info, classes: 'bg-muted text-muted-foreground', spoken: 'Note: ' }
}

interface RequirementChipProps {
  kind: RequirementKind
  /** "Maths HL 7 · you 6", "38 / 37 points", "Checked for 2026 entry" */
  children: ReactNode
  /**
   * Screen readers hear the kind first ("Missing: Biology HL 5, not taken"), because the icon and
   * colour don't reach them. Off for "+2 met", which says it already.
   */
  spokenKind?: boolean
  /** `li` inside RequirementChipList; `span` standing alone. */
  as?: 'li' | 'span'
  className?: string
}

/** One requirement and how the student stands against it. */
export function RequirementChip({
  kind,
  children,
  spokenKind = true,
  as: Tag = 'li',
  className
}: RequirementChipProps) {
  const { Icon, classes, spoken } = KIND[kind]
  const info = kind === 'info'
  return (
    <Tag
      className={cn(
        // A chip wider than its card wraps its own text instead of being cut.
        'inline-flex min-h-6.5 w-fit items-center gap-[5px] rounded-chip border border-transparent px-[9px] py-1 text-small tabular-nums',
        classes,
        className
      )}
    >
      <Icon
        aria-hidden="true"
        size={info ? 13 : 12}
        strokeWidth={info ? 2.4 : 2.8}
        className="shrink-0"
      />
      <span>
        {spokenKind && <span className="sr-only">{spoken}</span>}
        {children}
      </span>
    </Tag>
  )
}

/**
 * The chips on a card, in a list named "Requirements". Order and collapsing are the caller's:
 * missing, then within reach, met, notes; at most four, and only met ones collapse into "+N met".
 */
export function RequirementChipList({
  children,
  className
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <ul
      aria-label="Requirements"
      className={cn('m-0 flex list-none flex-wrap gap-1.5 p-0', className)}
    >
      {children}
    </ul>
  )
}
