'use client'

import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface Field {
  id: string
  name: string
  icon?: string
}

interface FieldSelectorProps {
  fields: Field[]
  selectedFields: string[]
  onSelectionChange: (selectedIds: string[]) => void
  minSelection?: number
  maxSelection?: number
}

export function FieldSelector({
  fields,
  selectedFields,
  onSelectionChange,
  minSelection = 3,
  maxSelection = 5
}: FieldSelectorProps) {
  const toggleField = (fieldId: string) => {
    const isSelected = selectedFields.includes(fieldId)

    if (isSelected) {
      // Deselect
      onSelectionChange(selectedFields.filter((id) => id !== fieldId))
    } else {
      // Select only if under max limit
      if (selectedFields.length < maxSelection) {
        onSelectionChange([...selectedFields, fieldId])
      }
    }
  }

  const isFieldDisabled = (fieldId: string) => {
    return !selectedFields.includes(fieldId) && selectedFields.length >= maxSelection
  }

  const selectionError = selectedFields.length < minSelection
  const selectionCount = selectedFields.length

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Select {minSelection}-{maxSelection} fields of study
        </p>
        <p
          className={cn(
            'text-sm font-medium',
            selectionError ? 'text-destructive' : 'text-primary'
          )}
        >
          {selectionCount}/{maxSelection} selected
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {fields.map((field) => {
          const isSelected = selectedFields.includes(field.id)
          const disabled = isFieldDisabled(field.id)

          return (
            <Card
              key={field.id}
              className={cn(
                'cursor-pointer transition-all hover:shadow-md',
                isSelected && 'border-primary bg-primary/5',
                disabled && 'cursor-not-allowed opacity-50'
              )}
              onClick={() => !disabled && toggleField(field.id)}
            >
              <CardContent className="flex items-center gap-3 p-4">
                <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-lg text-2xl',
                    isSelected ? 'bg-primary/10' : 'bg-muted'
                  )}
                >
                  {field.icon || '📚'}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{field.name}</h3>
                </div>
                {isSelected && (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {selectionError && selectedFields.length > 0 && (
        <p className="text-sm text-destructive">
          Please select at least {minSelection} fields of study
        </p>
      )}
    </div>
  )
}
