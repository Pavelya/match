'use client'

import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface Field {
  id: string
  name: string
  icon?: string
  description?: string
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
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
        {fields.map((field) => {
          const isSelected = selectedFields.includes(field.id)
          const isDisabled = !isSelected && selectedFields.length >= maxSelection

          return (
            <Card
              key={field.id}
              className={cn(
                'relative cursor-pointer transition-all hover:shadow-md',
                isSelected && 'border-primary bg-primary/5',
                isDisabled && 'cursor-not-allowed opacity-50'
              )}
              onClick={() => !isDisabled && toggleField(field.id)}
            >
              <CardContent className="flex flex-col items-center gap-3 p-4 text-center">
                {/* Circular icon background */}
                <div
                  className={cn(
                    'flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-2xl shadow-md',
                    isSelected ? 'bg-primary/10' : 'bg-muted'
                  )}
                >
                  {field.icon}
                </div>

                {/* Field name and description */}
                <div className="w-full space-y-1">
                  <h3 className="font-semibold leading-tight">{field.name}</h3>
                  {field.description && (
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {field.description}
                    </p>
                  )}
                </div>

                {/* Selection indicator - top right */}
                {isSelected && (
                  <div className="absolute right-2 top-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
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
