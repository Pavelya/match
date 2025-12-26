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
import { PageContainer, PageHeader } from '@/components/layout/PageContainer'
import { StudentFooter } from '@/components/layout/StudentFooter'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ibmatch.com'

export const metadata = {
  title: 'Search Programs',
  description: 'Search and discover university programs that match your IB profile.',
  openGraph: {
    title: 'Search Programs | IB Match',
    description: 'Search and discover university programs that match your IB profile.',
    type: 'website',
    url: `${baseUrl}/programs/search`,
    siteName: 'IB Match'
  },
  twitter: {
    card: 'summary',
    title: 'Search Programs | IB Match',
    description: 'Search and discover university programs that match your IB profile.'
  },
  alternates: {
    canonical: `${baseUrl}/programs/search`
  }
}

export default async function SearchPage() {
  // Fetch reference data for filter options
  const [fields, countries] = await Promise.all([getCachedFields(), getCachedCountries()])

  return (
    <>
      <PageContainer>
        <PageHeader
          title="Search Programs"
          description="Discover university programs from around the world"
        />

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
      </PageContainer>
      <StudentFooter />
    </>
  )
}
