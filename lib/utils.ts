import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

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
