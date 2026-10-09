import Link from 'next/link'
import { cn } from '@/lib/utils'

interface SiteLogoProps {
  /** Where the logo goes. Without it the logo is not a link (focus mode, D2.12). */
  href?: string
  /** The link's name: "IB Match home", or "IB Match, your matches" signed in. */
  label?: string
  /** Mark size in px: 28 in the header, 26 in the footer. */
  size?: number
  /** For hiding the wordmark from 768 to 1023px, signed in. */
  wordmarkClassName?: string
  className?: string
}

/**
 * The Lens mark and the wordmark, as on the chrome boards. The logo is a link or a plain span,
 * never a heading. Task 1.3 moves the mark into lib/brand/config.ts with every other logo; until
 * then this is its one copy in the new design.
 */
export function SiteLogo({ href, label, size = 28, wordmarkClassName, className }: SiteLogoProps) {
  const content = (
    <>
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        aria-hidden="true"
        // An image keeps its own colours in forced colours
        className="shrink-0 forced-color-adjust-none"
      >
        <rect width="32" height="32" rx="8" className="fill-primary" />
        <path d="M16 7.34A10 10 0 0 1 16 24.66A10 10 0 0 1 16 7.34Z" className="fill-lime" />
      </svg>
      <span
        className={cn(
          'text-[1.0625rem] leading-6 font-[650] tracking-[-0.025em] text-foreground',
          wordmarkClassName
        )}
      >
        IB Match
      </span>
    </>
  )
  const classes = cn('inline-flex h-11 shrink-0 items-center gap-2 md:gap-2.5', className)

  if (!href) return <span className={classes}>{content}</span>
  return (
    <Link href={href} aria-label={label} className={cn(classes, 'rounded-control')}>
      {content}
    </Link>
  )
}
