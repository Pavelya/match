/**
 * Saved Programs Page
 *
 * Displays programs the student has saved for later review.
 * Features:
 * - Same card layout as the search page
 * - Option to remove programs from saved list
 * - Fast loading with optimized queries
 */

import { Suspense } from 'react'
import { SavedProgramsClient } from './SavedProgramsClient'
import { PageContainer, PageHeader } from '@/components/layout/PageContainer'
import { Loader2 } from 'lucide-react'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ibmatch.com'

export const metadata = {
  title: 'Saved Programs',
  description: 'View and manage your saved university programs.',
  robots: {
    index: false,
    follow: false
  },
  openGraph: {
    title: 'Saved Programs | IB Match',
    description: 'View and manage your saved university programs.',
    type: 'website',
    url: `${baseUrl}/student/saved`,
    siteName: 'IB Match'
  },
  twitter: {
    card: 'summary',
    title: 'Saved Programs | IB Match',
    description: 'View and manage your saved university programs.'
  },
  alternates: {
    canonical: `${baseUrl}/student/saved`
  }
}

function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="animate-pulse">
          <div className="h-48 bg-muted rounded-xl" />
        </div>
      ))}
    </div>
  )
}

export default function SavedProgramsPage() {
  return (
    <PageContainer>
      <PageHeader title="Saved Programs" description="Programs you've saved for later review" />

      <Suspense
        fallback={
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Loading your saved programs...</span>
            </div>
            <LoadingSkeleton />
          </div>
        }
      >
        <SavedProgramsClient />
      </Suspense>
    </PageContainer>
  )
}
