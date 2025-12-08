/**
 * Student Matches Page
 *
 * Displays top program matches for the authenticated student based on:
 * - Academic profile
 * - Field preferences
 * - Location preferences
 * - Matching algorithm scores
 */

import { auth } from '@/lib/auth/config'
import { redirect } from 'next/navigation'
import { RecommendationsClient } from './RecommendationsClient'

export const metadata = {
  title: 'Your Matches',
  description: 'Your personalized university program matches based on your IB profile.',
  robots: {
    index: false,
    follow: false
  }
}

export default async function MatchesPage() {
  // Check authentication
  const session = await auth()
  if (!session) {
    redirect('/auth/signin')
  }

  return <RecommendationsClient />
}
