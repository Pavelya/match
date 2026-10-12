import Image from 'next/image'
import { ImageCredit } from '@/components/shared/ImageCredit'
import { cn } from '@/lib/utils'

/**
 * The university's picture at the top of its page and its programs' pages (rebranding 2.4), with
 * its credit as the caption (content 8.3): 16:11 beside the title from 1024px, 16:10 under the
 * trail on a phone. A page without an image draws no frame at all.
 */
export function HeroImage({
  src,
  alt,
  credit,
  className
}: {
  src: string
  alt: string
  credit: string | null
  className?: string
}) {
  return (
    <figure className={cn('flex min-w-0 flex-col gap-2', className)}>
      <div className="relative aspect-[16/10] overflow-hidden rounded-[1rem] bg-muted lg:aspect-[16/11] lg:rounded-sheet">
        <Image
          src={src}
          alt={alt}
          fill
          // 572 beside the title; the column's width below 1024px
          sizes="(min-width: 1024px) 572px, (min-width: 768px) calc(100vw - 48px), calc(100vw - 32px)"
          loading="eager"
          fetchPriority="high"
          className="object-cover"
        />
      </div>
      <ImageCredit
        credit={credit}
        className="mt-0 text-small font-normal [overflow-wrap:anywhere] text-muted-foreground"
      />
    </figure>
  )
}
