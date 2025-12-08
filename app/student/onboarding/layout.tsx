import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Complete Your Profile',
  description: 'Set up your IB profile to get personalized university program recommendations.',
  robots: {
    index: false,
    follow: false
  }
}

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">{children}</div>
    </div>
  )
}
