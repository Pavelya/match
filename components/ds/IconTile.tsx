import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

/*
 * The 44px icon tile that opens a panel or a card: D2.11's empty and error states, the error page
 * (D4.15) and the sign-in cards (D4.2). A transparent edge, which forced colours draw. Not a
 * client module, so server and client components share it.
 */

const TONE = {
  neutral: 'bg-muted text-muted-foreground',
  error: 'bg-gap-soft text-gap',
  brand: 'bg-brand-soft text-brand-ink',
  ok: 'bg-ok-soft text-ok'
} as const

export function IconTile({
  icon: Icon,
  tone = 'neutral',
  className
}: {
  icon: LucideIcon
  tone?: keyof typeof TONE
  className?: string
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-flex size-11 shrink-0 items-center justify-center rounded-[0.75rem] border border-transparent',
        TONE[tone],
        className
      )}
    >
      <Icon size={24} strokeWidth={1.75} />
    </span>
  )
}
