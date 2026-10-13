import type { Metadata } from 'next'
import { showsNewUi } from '@/lib/new-ui'

export const metadata: Metadata = {
  title: 'Complete Your Profile',
  description: 'Set up your IB profile to get personalized university program recommendations.',
  robots: {
    index: false,
    follow: false
  }
}

export default async function OnboardingLayout({ children }: { children: React.ReactNode }) {
  // The new design lays out its own steps (rebranding 3.1)
  if (await showsNewUi()) return children
  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">{children}</div>
    </div>
  )
}
