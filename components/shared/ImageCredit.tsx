import { cn } from '@/lib/utils'
import { creditParts } from '@/lib/universities/image-credit'

/**
 * An image's credit as its caption (content 8.3). Put it in the `<figure>` that holds the full
 * image, wherever that is shown; a thumbnail needs none. Renders nothing without a credit.
 */
export function ImageCredit({
  credit,
  className
}: {
  credit: string | null | undefined
  className?: string
}) {
  if (!credit) return null
  return (
    <figcaption
      className={cn('mt-1.5 text-xs leading-snug text-muted-foreground break-words', className)}
    >
      Image:{' '}
      {creditParts(credit).map((part, i) =>
        'url' in part ? (
          <a
            key={i}
            href={part.url}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="underline underline-offset-2 hover:text-foreground"
          >
            {part.label}
          </a>
        ) : (
          <span key={i}>{part.text}</span>
        )
      )}
    </figcaption>
  )
}
