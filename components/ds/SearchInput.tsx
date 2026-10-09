'use client'

import { useRef, type ComponentProps } from 'react'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SearchInputProps extends Omit<ComponentProps<'input'>, 'value' | 'onChange' | 'type'> {
  value: string
  onValueChange: (value: string) => void
  /** Names the field for screen readers ("Search programs"); the placeholder is only an example. */
  'aria-label': string
}

/**
 * The Explore search: 52px on desktop, 44px on a phone. The outline goes on the wrapper, so the
 * icon and the clear button sit inside it. Escape or the clear button empties it. The page puts it
 * in a search landmark.
 */
export function SearchInput({
  value,
  onValueChange,
  className,
  onKeyDown,
  ...props
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div
      className={cn(
        'flex h-11 items-center gap-2.5 rounded-control border border-input bg-card pl-3.5 md:h-13 md:gap-3 md:pr-1 md:pl-4',
        'transition-[border-color] duration-180 ease-standard hover:border-muted-foreground',
        'has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-2 has-[input:focus-visible]:outline-ring',
        className
      )}
    >
      <Search
        aria-hidden="true"
        size={20}
        strokeWidth={1.75}
        className="shrink-0 text-muted-foreground"
      />
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Escape' && value) {
            event.preventDefault()
            onValueChange('')
          }
          onKeyDown?.(event)
        }}
        // The wrapper draws the outline. outline-hidden keeps a transparent one, which forced
        // colours still show.
        className="h-10.5 min-w-0 flex-1 bg-transparent text-field text-foreground outline-hidden placeholder:text-ink-3 md:h-11 [&::-webkit-search-cancel-button]:appearance-none"
        {...props}
      />
      {value && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => {
            onValueChange('')
            inputRef.current?.focus()
          }}
          className="inline-flex size-10.5 shrink-0 items-center justify-center rounded-[0.5rem] text-muted-foreground hover:bg-muted md:size-11"
        >
          <X aria-hidden="true" size={16} strokeWidth={2} />
        </button>
      )}
    </div>
  )
}
