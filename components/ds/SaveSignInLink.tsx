import Link from 'next/link'
import { Bookmark } from 'lucide-react'
import { cn } from '@/lib/utils'

/*
 * Save's look, and Save as a link: signed out, to sign-in (canvas "D2.1 Button", Save toggle);
 * signed in without grades, to first run ("D2.1 Save · without grades", rebranding 3.1). Either
 * comes back and saves. Not a client module, so a server page can render the link without
 * downloading the toggle (rebranding 2.4); SaveToggle renders the same.
 */

export function saveToggleClasses({
  word,
  saved = false,
  saving = false,
  className
}: {
  word: boolean
  saved?: boolean
  saving?: boolean
  className?: string
}) {
  return cn(
    'inline-flex shrink-0 items-center justify-center rounded-control border text-body',
    'transition-[color,background-color,border-color] duration-180 ease-standard',
    word
      ? 'h-11 min-w-[118px] gap-2 px-4 font-medium'
      : 'size-11 border-transparent not-aria-busy:hover:bg-muted',
    word &&
      !saved &&
      'border-line-2 bg-card text-foreground not-aria-busy:hover:border-line-3 not-aria-busy:hover:bg-muted',
    word && saved && 'border-primary bg-brand-soft font-semibold text-brand-ink',
    !word && (saved ? 'text-primary' : 'text-foreground'),
    saving && 'text-muted-foreground',
    className
  )
}

/**
 * Save as a link, drawn as Save, never a toggle: it can't be on until the student is signed in
 * and has grades. Its name says where it leads. Both ways come back and save the program.
 */
export function SaveSignInLink({
  href,
  programName,
  variant = 'word',
  needs = 'sign-in',
  className
}: {
  href: string
  /** "Computer Science" on the program page; "Computer Science, University of Toronto" on rows */
  programName: string
  variant?: 'word' | 'icon'
  /** What saving needs first: signing in, or the student's grades (first run) */
  needs?: 'sign-in' | 'grades'
  className?: string
}) {
  const word = variant === 'word'
  const label =
    needs === 'grades'
      ? `Save ${programName}: add your grades first`
      : word
        ? `Save ${programName}: sign in first`
        : `Sign in to save ${programName}`
  return (
    <Link href={href} className={saveToggleClasses({ word, className })} aria-label={label}>
      <Bookmark aria-hidden="true" size={word ? 18 : 20} strokeWidth={1.75} />
      {word && 'Save'}
    </Link>
  )
}
