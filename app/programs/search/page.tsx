/**
 * Program Search Page
 *
 * Search and filter university programs using Algolia.
 * Features:
 * - Real-time search with typo tolerance
 * - Faceted filters (country, field, IB points)
 * - Results grid with program cards
 */

import { Suspense } from 'react'
import { getCachedFields, getCachedCountries } from '@/lib/reference-data'
import { SearchClient } from './SearchClient'

export const metadata = {
  title: 'Search Programs | IB Match',
  description: 'Search and discover university programs that match your IB profile.'
}

export default async function SearchPage() {
  // Fetch reference data for filter options
  const [fields, countries] = await Promise.all([getCachedFields(), getCachedCountries()])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Search Programs</h1>
          <p className="text-muted-foreground">
            Discover university programs from around the world
          </p>
        </div>

        {/* Search UI - Client Component */}
        <Suspense
          fallback={
            <div className="animate-pulse">
              <div className="h-12 bg-muted rounded-lg mb-6" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="h-10 bg-muted rounded-lg" />
                <div className="h-10 bg-muted rounded-lg" />
                <div className="h-10 bg-muted rounded-lg" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-64 bg-muted rounded-xl" />
                ))}
              </div>
            </div>
          }
        >
          <SearchClient
            fields={fields.map((f) => ({ id: f.id, name: f.name }))}
            countries={countries.map((c) => ({
              id: c.id,
              name: c.name,
              code: c.code,
              flagEmoji: c.flagEmoji
            }))}
          />
        </Suspense>
      </div>
    </div>
  )
}
