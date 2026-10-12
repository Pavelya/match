import { CircleCheck, CircleMinus, CircleX, Info, type LucideIcon } from 'lucide-react'
import type { ChipKind } from '@/lib/matching/match-status'

/*
 * How a requirement row shows its status (D3.2 and D3.4): an icon named for screen readers, and
 * the colours of its words. Shared by "Why this match" and the program page's checklist. A plain
 * module, not a client one, so server components get the values themselves.
 */

export const REQUIREMENT_STATUS: Record<
  ChipKind,
  { Icon: LucideIcon; label: string; text: string; soft: string }
> = {
  met: { Icon: CircleCheck, label: 'Met', text: 'text-ok', soft: 'bg-ok-soft' },
  close: { Icon: CircleMinus, label: 'Close', text: 'text-close', soft: 'bg-close-soft' },
  gap: { Icon: CircleX, label: 'Missing', text: 'text-gap', soft: 'bg-gap-soft' },
  info: { Icon: Info, label: 'Note', text: 'text-muted-foreground', soft: 'bg-muted' }
}

/** The student's value takes the status colour; a note's stays ink. */
export const YOU_TEXT: Record<ChipKind, string> = {
  met: 'text-ok',
  close: 'text-close',
  gap: 'text-gap',
  info: 'text-foreground'
}
