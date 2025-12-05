'use client'

import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface Country {
  id: string
  name: string
  code: string
  flagEmoji: string
}

interface LocationSelectorProps {
  countries: Country[]
  selectedCountries: string[]
  onSelectionChange: (selectedIds: string[]) => void
}

export function LocationSelector({
  countries,
  selectedCountries,
  onSelectionChange
}: LocationSelectorProps) {
  const toggleCountry = (countryId: string) => {
    const isSelected = selectedCountries.includes(countryId)

    if (isSelected) {
      onSelectionChange(selectedCountries.filter((id) => id !== countryId))
    } else {
      onSelectionChange([...selectedCountries, countryId])
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Select countries you&apos;d like to study in
        </p>
        <p className="text-sm font-medium text-primary">{selectedCountries.length} selected</p>
      </div>

      {/* Countries grid */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {countries.map((country) => {
          const isSelected = selectedCountries.includes(country.id)

          return (
            <Card
              key={country.id}
              className={cn(
                'cursor-pointer transition-all hover:shadow-md',
                isSelected && 'border-primary bg-primary/5'
              )}
              onClick={() => toggleCountry(country.id)}
            >
              <CardContent className="flex flex-col items-center gap-3 p-4 text-center relative">
                {/* Circular flag background */}
                <div
                  className={cn(
                    'flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-2xl shadow-md',
                    isSelected ? 'bg-primary/10' : 'bg-muted'
                  )}
                >
                  {country.flagEmoji}
                </div>

                {/* Country name */}
                <h3 className="font-semibold leading-tight">{country.name}</h3>

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
    </div>
  )
}
