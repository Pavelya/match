import Link from 'next/link'
import { BrandMark } from '@/components/brand/BrandMark'
import { brand } from '@/lib/brand/config'
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
 * The logo: the mark as an image and the name as text, both from `lib/brand/config.ts` ("D1.5
 * Logo: Lens"). The name follows the theme and Windows contrast themes. The logo is a link or a
 * plain span, never a heading.
 */
export function SiteLogo({ href, label, size = 28, wordmarkClassName, className }: SiteLogoProps) {
  const content = (
    <>
      <BrandMark size={size} />
      <span
        className={cn(
          'text-[1.0625rem] leading-6 font-[650] tracking-[-0.025em] text-foreground',
          wordmarkClassName
        )}
      >
        {brand.name}
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
