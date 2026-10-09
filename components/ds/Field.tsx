import type { ReactNode } from 'react'
import { CircleAlert } from 'lucide-react'
import { cn } from '@/lib/utils'

/*
 * Text fields for the new design (rebranding 1.2, canvas board "D2.2 Text input and search").
 * The edge is --input (line-3, 3:1 against paper and surface). Typed text is 16px below 768px,
 * so iOS Safari doesn't zoom in. Errors appear when the student leaves the field or presses the
 * action, never while typing.
 */

/** The field box, shared by Input, Select and SubjectPicker. */
export const fieldClasses = cn(
  'h-11 w-full min-w-0 rounded-control border border-input bg-card px-3.5 text-field text-foreground',
  'transition-[border-color] duration-180 ease-standard placeholder:text-ink-3',
  'not-aria-invalid:enabled:hover:border-muted-foreground',
  // A 2px edge, an icon and words show an error, never colour alone. The padding shrinks by the
  // extra pixel so the text doesn't move.
  'aria-invalid:border-2 aria-invalid:border-gap aria-invalid:px-[13px]',
  'disabled:border-border disabled:bg-muted disabled:text-ink-3 disabled:opacity-100 disabled:[-webkit-text-fill-color:currentColor]'
)

/** The label above every field: 13px semibold, tied to its control. */
export const fieldLabelClasses = 'text-small font-semibold text-foreground'

interface FieldMessageProps {
  id?: string
  /** `hint` explains the field; `error` says what to do, with an icon so it survives forced colours. */
  tone?: 'hint' | 'error'
  children: ReactNode
  className?: string
}

export function FieldMessage({ id, tone = 'hint', children, className }: FieldMessageProps) {
  if (tone === 'error') {
    return (
      <span id={id} className={cn('flex items-start gap-1.5 text-small text-gap', className)}>
        <CircleAlert aria-hidden="true" size={16} strokeWidth={2} className="mt-px shrink-0" />
        <span>{children}</span>
      </span>
    )
  }
  return (
    <span id={id} className={cn('text-small font-normal text-muted-foreground', className)}>
      {children}
    </span>
  )
}
