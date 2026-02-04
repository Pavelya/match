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

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ibmatch.com'

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

export default async function SearchPage() {
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

  // FAQ Schema for SEO rich snippets (Task 3.2)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I search for IB programs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use the search bar to find programs by name, or use the filters to browse by IB points (24-45), country, and field of study. You can filter by specific IB point requirements to find programs that match your predicted score.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I filter programs by IB points?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, you can filter programs by IB points ranging from 24 to 45. This helps you find programs that match your predicted or achieved IB score. Programs are displayed with their minimum IB points requirement.'
        }
      },
      {
        '@type': 'Question',
        name: 'What countries are available in the search?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The search includes programs from universities worldwide, including the UK, USA, Canada, Australia, Singapore, Netherlands, Germany, and many more countries. Use the country filter to browse programs by location.'
        }
      },
      {
        '@type': 'Question',
        name: 'What fields of study can I search for?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can search across all major fields of study including Computer Science, Engineering, Medicine, Business, Arts, Sciences, Social Sciences, and more. Use the field filter to find programs in your area of interest.'
        }
      },
      {
        '@type': 'Question',
        name: 'How do I know if I meet the IB requirements?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Each program card shows the minimum IB points required. Click on a program to see detailed IB requirements including specific course requirements (HL/SL subjects and minimum grades). You can also create a profile to see your match probability.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I search for programs with specific IB course requirements?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, each program page shows detailed IB course requirements including which subjects are required at HL or SL level and the minimum grades needed. You can browse programs and compare their specific IB course requirements.'
        }
      },
      {
        '@type': 'Question',
        name: 'How many programs are in the database?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The database includes over 1000 university programs from top institutions worldwide. All programs accept the IB Diploma and display IB-specific admission requirements including points and course requirements.'
        }
      },
      {
        '@type': 'Question',
        name: 'How do I apply to programs I find?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Each program card includes a link to the official university program page where you can find detailed application information and apply directly. The program pages also show contact information for university admissions offices.'
        }
      }
    ]
  }

  return (
    <>
      <PageContainer>
        {/* FAQ Schema for rich snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

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
