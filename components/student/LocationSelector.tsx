'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
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
  const [searchQuery, setSearchQuery] = useState('')

  // Filter countries by search query
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
          Select countries you&apos;d like to study in (optional)
        </p>
        <p className="text-sm font-medium text-primary">{selectedCountries.length} selected</p>
      </div>

      {/* Search input */}
      <Input
        type="text"
        placeholder="Search countries..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full"
      />

      {/* Countries grid */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCountries.map((country) => {
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
              <CardContent className="flex items-center gap-4 p-2.5">
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
                <h3 className="flex-1 font-medium leading-tight">{country.name}</h3>

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

      {filteredCountries.length === 0 && (
        <p className="text-center text-sm text-muted-foreground">
          No countries found matching &quot;{searchQuery}&quot;
        </p>
      )}
    </div>
  )
}
