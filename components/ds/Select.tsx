import { useId, type ComponentProps, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FieldMessage, fieldClasses, fieldLabelClasses } from './Field'

interface SelectProps extends Omit<ComponentProps<'select'>, 'id'> {
  label: ReactNode
  hint?: ReactNode
  id?: string
}

/**
 * The browser's own select, for short fixed lists such as the sort order on Matches (rebranding
 * 1.2, canvas board "D2.3 Select and subject picker"). No JavaScript: phones get their native
 * picker, and keyboards and screen readers work as they always do. Chrome and Edge draw the open
 * list in the new style (`.ds-select` in app/globals.css); Safari and Firefox show their own menu.
 * Over about ten options, use SubjectPicker's pattern instead.
 */
export function Select({ label, hint, id, className, children, ...props }: SelectProps) {
  const autoId = useId()
  const selectId = id ?? autoId
  const hintId = `${selectId}-hint`

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={selectId} className={fieldLabelClasses}>
        {label}
      </label>
      <div className="relative">
        <select
          id={selectId}
          aria-describedby={hint ? hintId : undefined}
          className={cn(fieldClasses, 'ds-select peer cursor-pointer appearance-none pr-10')}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          aria-hidden="true"
          size={16}
          strokeWidth={2}
          className="pointer-events-none absolute top-3.5 right-3.5 text-muted-foreground peer-disabled:text-ink-3"
        />
      </div>
      {hint && <FieldMessage id={hintId}>{hint}</FieldMessage>}
    </div>
  )
}
