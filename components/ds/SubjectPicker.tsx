'use client'

import Link from 'next/link'
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode
} from 'react'
import { Check, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FieldMessage, fieldClasses, fieldLabelClasses } from './Field'
import {
  countLabel,
  filterPickerGroups,
  findMatch,
  type PickerGroup,
  type PickerOption
} from './picker-filter'

interface SubjectPickerProps {
  label: ReactNode
  hint?: ReactNode
  groups: readonly PickerGroup[]
  /** The chosen option's value, or null for none. */
  value: string | null
  onValueChange: (value: string) => void
  /** The row's own group, listed first ("Group 5 · Mathematics"). */
  firstGroup?: string
  placeholder?: string
  className?: string
}

/**
 * A searchable list for the Diploma subjects, one per row of the subject editor (rebranding 1.2,
 * canvas board "D2.3 Select and subject picker"). The ARIA combobox pattern: the field keeps
 * focus, aria-activedescendant points at the active option, each IB group is a labelled group,
 * and a polite live region says how many match.
 *
 * Keys: typing, ↓ or Alt+↓ open the list; ↓ and ↑ move; Enter picks; Escape closes and keeps the
 * subject that was there; Tab leaves without changing anything.
 */
export function SubjectPicker({
  label,
  hint,
  groups,
  value,
  onValueChange,
  firstGroup,
  placeholder = 'Choose a subject',
  className
}: SubjectPickerProps) {
  const id = useId()
  const listId = `${id}-list`
  const hintId = `${id}-hint`
  const fieldRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const [open, setOpen] = useState(false)
  /** What the student has typed since opening; null until they type. */
  const [query, setQuery] = useState<string | null>(null)
  const [active, setActive] = useState(-1)
  /** On a phone the list reaches down to the keyboard; elsewhere CSS caps it at 330px. */
  const [phoneMaxHeight, setPhoneMaxHeight] = useState<number>()

  const shown = useMemo(
    () => filterPickerGroups(groups, query ?? '', firstGroup),
    [groups, query, firstGroup]
  )
  const options = useMemo(() => shown.flatMap((group) => group.options), [shown])
  /** Where each shown group's options start in `options`, for the option ids. */
  const groupStarts = useMemo(
    () =>
      shown.map((_, i) => shown.slice(0, i).reduce((sum, group) => sum + group.options.length, 0)),
    [shown]
  )
  const chosen = useMemo(
    () => groups.flatMap((group) => group.options).find((option) => option.value === value),
    [groups, value]
  )
  const total = useMemo(
    () => groups.reduce((sum, group) => sum + group.options.length, 0),
    [groups]
  )
  const optionId = (index: number) => `${id}-option-${index}`

  function openList() {
    setOpen(true)
    setActive(options.findIndex((option) => option.value === value))
  }

  function close() {
    setOpen(false)
    setQuery(null)
    setActive(-1)
  }

  function pick(option: PickerOption) {
    if (option.disabled) return
    onValueChange(option.value)
    close()
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        if (!open || event.altKey) openList()
        else setActive((index) => Math.min(index + 1, options.length - 1))
        break
      case 'ArrowUp':
        event.preventDefault()
        if (event.altKey) close()
        else if (open) setActive((index) => Math.max(index - 1, 0))
        break
      case 'Enter':
        if (!open) return
        // Keep a surrounding form from submitting while the list is open.
        event.preventDefault()
        if (options[active]) pick(options[active])
        break
      case 'Escape':
        if (!open) return
        event.preventDefault()
        close()
        break
      case 'Tab':
        close()
        break
    }
  }

  // Keep the active option in view as the arrows move through a long list.
  useEffect(() => {
    if (open && active >= 0) {
      document.getElementById(`${id}-option-${active}`)?.scrollIntoView({ block: 'nearest' })
    }
  }, [id, open, active])

  // On a phone, scroll the field to the top so the list gets the room above the keyboard.
  useEffect(() => {
    const viewport = window.visualViewport
    if (!open || !viewport || !window.matchMedia('(width < 48rem)').matches) return
    fieldRef.current?.scrollIntoView({ block: 'start' })
    const fit = () => {
      const bottom = inputRef.current?.getBoundingClientRect().bottom ?? 0
      setPhoneMaxHeight(Math.max(176, viewport.offsetTop + viewport.height - bottom - 18))
    }
    fit()
    viewport.addEventListener('resize', fit)
    viewport.addEventListener('scroll', fit)
    return () => {
      viewport.removeEventListener('resize', fit)
      viewport.removeEventListener('scroll', fit)
    }
  }, [open])

  const Chevron = open ? ChevronUp : ChevronDown

  return (
    <div ref={fieldRef} className={cn('flex scroll-mt-4 flex-col gap-1.5', className)}>
      <label htmlFor={`${id}-input`} className={fieldLabelClasses}>
        {label}
      </label>
      <div className="relative">
        <input
          ref={inputRef}
          id={`${id}-input`}
          role="combobox"
          aria-expanded={open}
          aria-controls={open ? listId : undefined}
          aria-autocomplete="list"
          aria-activedescendant={open && active >= 0 ? optionId(active) : undefined}
          aria-describedby={hint ? hintId : undefined}
          autoComplete="off"
          spellCheck={false}
          placeholder={placeholder}
          value={open && query !== null ? query : (chosen?.label ?? '')}
          onChange={(event) => {
            setQuery(event.target.value)
            setOpen(true)
            setActive(-1)
          }}
          onClick={() => {
            if (!open) openList()
          }}
          onKeyDown={onKeyDown}
          onBlur={close}
          className={cn(fieldClasses, 'pr-11')}
        />
        <Chevron
          aria-hidden="true"
          size={16}
          strokeWidth={2}
          className="pointer-events-none absolute top-3.5 right-3.5 text-muted-foreground"
        />

        {open && (
          <div
            // Clicking the list must not take focus from the field.
            onMouseDown={(event) => event.preventDefault()}
            style={phoneMaxHeight ? { maxHeight: phoneMaxHeight } : undefined}
            className="absolute inset-x-0 top-full z-50 mt-1.5 max-h-82.5 overflow-y-auto overscroll-contain rounded-card border border-border bg-popover p-1.5 text-popover-foreground shadow-overlay"
          >
            {options.length === 0 ? (
              <div className="flex flex-col gap-1.5 px-2.5 py-3">
                <span className="text-body font-semibold">
                  No subject matches “{query?.trim()}”
                </span>
                <span className="text-body text-muted-foreground">
                  IB Match lists {total} Diploma subjects. If yours is missing, tell us on the{' '}
                  <Link href="/contact" className="text-primary underline underline-offset-3">
                    Contact page
                  </Link>
                  .
                </span>
              </div>
            ) : (
              <div id={listId} role="listbox" aria-label="Subjects">
                {shown.map((group, groupIndex) => (
                  <div
                    key={group.label}
                    role="group"
                    aria-labelledby={`${id}-group-${groupIndex}`}
                    className={cn(groupIndex > 0 && 'mt-1 border-t border-border pt-1')}
                  >
                    <span
                      id={`${id}-group-${groupIndex}`}
                      className="block px-2.5 pt-2 pb-1 text-label text-muted-foreground"
                    >
                      {group.label}
                    </span>
                    {group.options.map((option, i) => {
                      const optionIndex = groupStarts[groupIndex] + i
                      const selected = option.value === value
                      return (
                        <div
                          key={option.value}
                          id={optionId(optionIndex)}
                          role="option"
                          aria-selected={selected}
                          aria-disabled={option.disabled || undefined}
                          onClick={() => pick(option)}
                          onMouseMove={() => {
                            if (optionIndex !== active) setActive(optionIndex)
                          }}
                          className={cn(
                            'flex min-h-11 cursor-pointer items-center justify-between gap-2 rounded-[0.5rem] px-2.5 py-2.5 text-field',
                            selected && 'font-semibold',
                            optionIndex === active &&
                              'bg-muted forced-colors:bg-[Highlight] forced-colors:text-[HighlightText] forced-colors:forced-color-adjust-none',
                            option.disabled &&
                              'cursor-default text-ink-3 forced-colors:text-[GrayText]'
                          )}
                        >
                          <OptionLabel label={option.label} query={query} />
                          {option.note && (
                            <span className="shrink-0 text-small font-normal">{option.note}</span>
                          )}
                          {selected && (
                            <Check
                              aria-hidden="true"
                              size={16}
                              strokeWidth={2.4}
                              className="shrink-0 text-primary forced-colors:text-current"
                            />
                          )}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      {hint && <FieldMessage id={hintId}>{hint}</FieldMessage>}
      <span role="status" aria-live="polite" className="sr-only">
        {open && query !== null ? countLabel(options.length) : ''}
      </span>
    </div>
  )
}

/** The name, with the typed letters in bold: "<b>Fre</b>nch B". */
function OptionLabel({ label, query }: { label: string; query: string | null }) {
  const match = query ? findMatch(label, query) : null
  if (!match) return <span>{label}</span>
  const [start, end] = match
  return (
    <span>
      {label.slice(0, start)}
      <strong className="font-semibold">{label.slice(start, end)}</strong>
      {label.slice(end)}
    </span>
  )
}
