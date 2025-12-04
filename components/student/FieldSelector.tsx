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

      {/* Fields grid */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {fields.map((field) => {
          const isSelected = selectedFields.includes(field.id)
          const isDisabled = !isSelected && selectedFields.length >= maxSelection

          return (
            <Card
              key={field.id}
              className={cn(
                'cursor-pointer transition-all hover:shadow-md',
                isSelected && 'border-primary bg-primary/5',
                isDisabled && 'cursor-not-allowed opacity-50'
              )}
              onClick={() => !isDisabled && toggleField(field.id)}
            >
              <CardContent className="flex items-center gap-4 p-3">
                {/* Circular icon background */}
                <div
                  className={cn(
                    'flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-2xl shadow-md',
                    isSelected ? 'bg-primary/10' : 'bg-muted'
                  )}
                >
                  {field.icon}
                </div>

                {/* Field name */}
                <h3 className="flex-1 font-medium leading-tight">{field.name}</h3>

                {/* Selection indicator */}
                {isSelected && (
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
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
