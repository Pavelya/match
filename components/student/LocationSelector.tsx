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
              <CardContent className="flex items-center gap-3 p-4">
                <div className="text-3xl">{country.flagEmoji}</div>
                <div className="flex-1">
                  <h3 className="font-medium">{country.name}</h3>
                  <p className="text-xs text-muted-foreground">{country.code}</p>
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

      {filteredCountries.length === 0 && (
        <p className="text-center text-sm text-muted-foreground">
          No countries found matching &quot;{searchQuery}&quot;
        </p>
      )}
    </div>
  )
}
