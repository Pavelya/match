import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/*
 * A note or a caution set apart from the text (rebranding 4.2, board "D4.12 Country guide"): the
 * sunken fill with Lucide's Info, or the close-soft fill with TriangleAlert, in place of today's
 * coloured boxes. The edge is transparent, which forced colours draw. The guides, the sign-in
 * card's note (D4.2) and the text pages (D4.14) share it. Not a client module.
 */
export function Callout({
  icon,
  label,
  tone,
  children,
  className
}: {
  icon: ReactNode
  /** Its name for a screen reader: "Note", "Check this" */
  label: string
  tone: 'note' | 'caution'
  children: ReactNode
  className?: string
}) {
  return (
    <div
      role="note"
      aria-label={label}
      className={cn(
        'grid grid-cols-[1.25rem_minmax(0,1fr)] items-start gap-x-3 rounded-card border border-transparent px-4 py-3.5 md:px-5 md:py-4',
        tone === 'note' ? 'bg-muted' : 'bg-close-soft',
        className
      )}
    >
      <span className={cn('mt-0.5 flex', tone === 'note' ? 'text-muted-foreground' : 'text-close')}>
        {icon}
      </span>
      <p className="text-body">{children}</p>
    </div>
  )
}
