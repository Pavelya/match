'use client'

import { useId, type CSSProperties, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { FieldMessage, fieldLabelClasses } from './Field'

type SegmentValue = string | number

interface SegmentedProps<T extends SegmentValue> {
  legend: ReactNode
  options: readonly { value: T; label: ReactNode }[]
  value: T | null
  onValueChange: (value: T) => void
  /**
   * `track`: two or three options in one track (the level, SL or HL), with a thumb that slides.
   * `separate`: one button each (grades 1 to 7, TOK and EE A to E), which fit a phone.
   */
  variant?: 'track' | 'separate'
  /** Desktop width of each separate option: 46 for 1–7, 52 for A–E. On a phone they share the row. */
  optionWidth?: number
  disabled?: boolean
  /** Says what's missing while disabled: "Choose a subject first". */
  disabledReason?: ReactNode
  /**
   * A choice that can be made but blocks saving, such as an E in TOK. The chosen option turns
   * red and this message is read out.
   */
  error?: ReactNode
  className?: string
}

/**
 * One choice from a few, on native radio inputs (rebranding 1.2, canvas board "D2.4 Segmented
 * control"): one Tab stop, the arrow keys move and choose, and screen readers announce "6,
 * checked, 6 of 7". The outline goes on the label of the focused radio.
 */
export function Segmented<T extends SegmentValue>({
  legend,
  options,
  value,
  onValueChange,
  variant = 'track',
  optionWidth = 46,
  disabled = false,
  disabledReason,
  error,
  className
}: SegmentedProps<T>) {
  const name = useId()
  const messageId = `${name}-message`
  const track = variant === 'track'
  const chosen = options.findIndex((option) => option.value === value)
  const message = error ?? (disabled ? disabledReason : undefined)

  return (
    <fieldset
      disabled={disabled}
      aria-describedby={message ? messageId : undefined}
      className={cn('m-0 flex min-w-0 flex-col border-0 p-0', className)}
    >
      <legend
        className={cn(
          fieldLabelClasses,
          'p-0',
          track ? 'mb-1.5' : 'mb-3',
          disabled && 'text-ink-3'
        )}
      >
        {legend}
      </legend>
      <div
        style={{ '--n': options.length, '--w': `${optionWidth}px` } as CSSProperties}
        className={cn(
          'grid grid-cols-[repeat(var(--n),minmax(0,1fr))]',
          track
            ? // The transparent border shows as the track's edge in forced colours.
              'relative h-11 gap-[3px] rounded-control border border-transparent bg-muted p-0.5'
            : 'gap-1.5 tabular-nums md:grid-cols-[repeat(var(--n),var(--w))]'
        )}
      >
        {track && chosen >= 0 && !disabled && (
          // The chosen thumb: surface with a 1px line-3 edge, 3.3:1 against the track. It slides
          // with transform only; reduced motion makes it jump (globals.css).
          <span
            aria-hidden="true"
            style={{ '--i': chosen } as CSSProperties}
            className={cn(
              'pointer-events-none absolute top-0.5 bottom-0.5 left-0.5 rounded-[0.5rem] border border-line-3 bg-card dark:bg-border forced-colors:hidden',
              'w-[calc((100%_-_4px_-_(var(--n)_-_1)_*_3px)_/_var(--n))] translate-x-[calc(var(--i)_*_(100%_+_3px))]',
              'transition-transform duration-180 ease-standard'
            )}
          />
        )}
        {options.map((option) => {
          const checked = option.value === value
          return (
            <label
              key={String(option.value)}
              className={cn(
                'relative flex cursor-pointer items-center justify-center text-body font-medium',
                'has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ring',
                'has-checked:font-semibold has-disabled:cursor-default',
                // Forced colours drop the fills, so the choice takes the system highlight.
                'forced-colors:has-checked:bg-[Highlight] forced-colors:has-checked:text-[HighlightText] forced-colors:has-checked:outline-[Highlight] forced-colors:has-checked:forced-color-adjust-none',
                'forced-colors:has-disabled:border-[GrayText] forced-colors:has-disabled:text-[GrayText]',
                track
                  ? [
                      'rounded-[0.5rem] text-muted-foreground underline-offset-3',
                      'has-checked:text-foreground not-has-checked:not-has-disabled:hover:text-foreground not-has-checked:not-has-disabled:hover:underline',
                      'has-disabled:text-ink-3'
                    ]
                  : [
                      // Never under 44 by 44, even in a container that shrinks to fit.
                      'h-11 min-w-11 rounded-control border border-line-2 bg-card text-foreground',
                      'transition-[color,background-color,border-color] duration-180 ease-standard',
                      'not-has-checked:not-has-disabled:hover:border-line-3 not-has-checked:not-has-disabled:hover:bg-muted',
                      error
                        ? 'has-checked:border-transparent has-checked:bg-gap has-checked:text-background'
                        : 'has-checked:border-transparent has-checked:bg-primary has-checked:text-primary-foreground',
                      'has-disabled:border-border has-disabled:bg-muted has-disabled:text-ink-3'
                    ]
              )}
            >
              <input
                type="radio"
                name={name}
                value={String(option.value)}
                checked={checked}
                onChange={() => onValueChange(option.value)}
                className="sr-only"
              />
              {option.label}
            </label>
          )
        })}
      </div>
      {/* Always rendered, so a message that appears is read out. */}
      <div
        id={messageId}
        aria-live="polite"
        className={cn(message && (error ? 'mt-2.5' : 'mt-1.5'))}
      >
        {message && <FieldMessage tone={error ? 'error' : 'hint'}>{message}</FieldMessage>}
      </div>
    </fieldset>
  )
}
