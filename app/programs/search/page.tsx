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
import { getCachedFields, getCachedCountriesWithPrograms } from '@/lib/reference-data'
import { SearchClient } from './SearchClient'
import { PageContainer, PageHeader } from '@/components/layout/PageContainer'
import { StudentFooter } from '@/components/layout/StudentFooter'
import { EXPLORE_QUESTIONS } from '@/lib/explore/questions'
import { showsNewUi } from '@/lib/new-ui'
import { NewExplorePage } from './NewExplorePage'
import { serializeJsonLd } from '@/lib/utils'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ibmatch.com'

// Enhanced metadata for search page with IB-specific optimization (Task 3.1)
// SEO-optimized page for discovery keywords: "IB program search", "university finder"
export const metadata = {
  title: 'Search IB Programs - Find Universities by IB Points | IB Match',
  description:
    'Search 1000+ university programs by IB points, country, and field of study. Filter programs from 24-45 IB points across Computer Science, Engineering, Medicine, Business, and more. Find your perfect university match.',
  robots: {
    index: true,
    follow: true
  },
  keywords: [
    // Core search functionality
    'IB program search',
    'university program search',
    'search universities by IB points',
    'IB points filter',

    // IB points ranges
    'IB 45 points programs',
    'IB 40 points programs',
    'IB 35 points programs',
    'IB 30 points programs',
    'IB 24 points programs',

    // Field categories
    'Computer Science IB programs',
    'Engineering IB programs',
    'Medicine IB programs',
    'Business IB programs',
    'Arts IB programs',

    // Search features
    'filter programs by country',
    'filter programs by field',
    'IB university finder',
    'IB program database',

    // Discovery terms
    'find IB programs',
    'discover university programs',
    'IB program directory',
    'international university search'
  ],
  openGraph: {
    title: 'Search IB Programs - Find Universities by IB Points | IB Match',
    description:
      'Search 1000+ university programs by IB points, country, and field of study. Find your perfect university match.',
    type: 'website',
    url: `${baseUrl}/programs/search`,
    siteName: 'IB Match'
  },
  twitter: {
    card: 'summary',
    title: 'Search IB Programs - Find Universities by IB Points',
    description:
      'Search 1000+ university programs by IB points, country, and field of study. Find your perfect university match.'
  },
  alternates: {
    canonical: `${baseUrl}/programs/search`
  }
}

// FAQ Schema for SEO rich snippets (Task 3.2). Both designs send this one copy; the new one
// also shows the questions on the page (rebranding 2.3).
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: EXPLORE_QUESTIONS.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: answer
    }
  }))
}

const faqScript = (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }}
  />
)

interface SearchPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  // The new design (rebranding 2.3) reads the list from the URL, so a link or Back from a
  // program returns to the same list. The page is already rendered on each request: its
  // layout reads the session.
  if (await showsNewUi()) {
    return (
      <>
        {faqScript}
        <NewExplorePage searchParams={await searchParams} />
      </>
    )
  }

  // Fetch reference data for filter options AND initial programs for SEO
  // Initial programs prevent "Soft 404" by showing real content on first render
  const [fields, countries, initialSearchResult] = await Promise.all([
    getCachedFields(),
    getCachedCountriesWithPrograms(),
    // Dynamically import to avoid SSR issues with Algolia client
    import('@/lib/algolia/search')
      .then((mod) => mod.searchPrograms('', undefined, { hitsPerPage: 20, page: 0 }))
      .catch(() => ({ hits: [], nbHits: 0, page: 0, nbPages: 0, processingTimeMS: 0 }))
  ])

  return (
    <>
      <PageContainer>
        {/* FAQ Schema for rich snippets */}
        {faqScript}

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
            initialResults={initialSearchResult.hits}
            initialTotalHits={initialSearchResult.nbHits}
          />
        </Suspense>
      </PageContainer>
      <StudentFooter />
    </>
  )
}
