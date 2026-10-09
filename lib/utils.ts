import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

// The new design's token classes from app/globals.css. Without them tailwind-merge would read
// text-h1 as a text colour, and cn('text-h1', 'text-muted-foreground') would drop the size.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        'display-xl',
        'display-l',
        'h1',
        'h2',
        'h3',
        'body-l',
        'body',
        'field',
        'small',
        'label',
        'total'
      ],
      radius: ['chip', 'control', 'card', 'sheet'],
      shadow: ['raised', 'raised-hover', 'overlay'],
      ease: ['standard']
    }
  }
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Serialise a value for embedding in a <script type="application/ld+json"> tag.
 *
 * JSON.stringify does not escape "<", so a database value containing a closing
 * script tag would break out of the element. Escaping it as \u003c is inert
 * inside JSON but cannot terminate the script.
 */
export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}
