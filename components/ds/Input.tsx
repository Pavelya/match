import { useId, type ComponentProps, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { FieldMessage, fieldClasses, fieldLabelClasses } from './Field'

export function Input({ className, type = 'text', ...props }: ComponentProps<'input'>) {
  return <input type={type} className={cn(fieldClasses, className)} {...props} />
}

interface TextFieldProps extends Omit<ComponentProps<'input'>, 'id'> {
  label: ReactNode
  hint?: ReactNode
  /** Set when the student leaves the field or submits; clear it as soon as the value is right. */
  error?: ReactNode
  id?: string
}

/** A label, the field, and its hint or error, wired together. */
export function TextField({ label, hint, error, id, className, ...props }: TextFieldProps) {
  const autoId = useId()
  const fieldId = id ?? autoId
  const messageId = `${fieldId}-message`
  const message = error ?? hint

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={fieldId} className={fieldLabelClasses}>
        {label}
      </label>
      <Input
        id={fieldId}
        aria-invalid={error ? true : undefined}
        aria-describedby={message ? messageId : undefined}
        {...props}
      />
      {message && (
        <FieldMessage id={messageId} tone={error ? 'error' : 'hint'}>
          {message}
        </FieldMessage>
      )}
    </div>
  )
}
