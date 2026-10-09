import { brand } from '@/lib/brand/config'
import { cn } from '@/lib/utils'

interface BrandMarkProps {
  /** Size in px: 28 in the header, 26 in the footer. The page mark is drawn for 24px and up. */
  size: number
  className?: string
}

/**
 * The mark, as an image from the brand configuration (rebranding 1.3). One file serves light and
 * dark, so there is no `<picture>`: its dark source would follow the OS, not the Appearance
 * setting. An image keeps its colours in forced colours. The `alt` is empty because the name is
 * always beside it as text, in the same link.
 */
export function BrandMark({ size, className }: BrandMarkProps) {
  return (
    // An SVG at its own size: the image optimiser has nothing to do
    // eslint-disable-next-line @next/next/no-img-element
    <img src={brand.mark} alt="" width={size} height={size} className={cn('shrink-0', className)} />
  )
}
