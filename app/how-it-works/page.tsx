import type { Metadata } from 'next'
import { HowItWorksHero } from './_components/HowItWorksHero'
import { ProgramDatabase } from './_components/ProgramDatabase'
import { MatchingEngine } from './_components/MatchingEngine'
import { FilterSystem } from './_components/FilterSystem'
import { TechStack } from './_components/TechStack'
import { NoAISection } from './_components/NoAISection'
import { HowItWorksCTA } from './_components/HowItWorksCTA'
import { StudentFooter } from '@/components/layout/StudentFooter'

// Static generation - page is pre-rendered at build time
// Revalidate every hour to pick up any changes
export const dynamic = 'force-static'
export const revalidate = 3600

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ibmatch.com'

export const metadata: Metadata = {
  title: 'How It Works - The Technology Behind IB Match',
  description:
    'Discover how IB Match matches you with university programs. Learn about our Algolia-powered search, three-factor scoring algorithm, and why we chose math over AI.',
  keywords: [
    'IB Match algorithm',
    'university matching technology',
    'IB program matching',
    'how IB Match works',
    'IB student university search',
    'program compatibility scoring',
    'IB points matching'
  ],
  openGraph: {
    title: 'How It Works | IB Match',
    description:
      'See how we match IB students with university programs. Fast search, transparent scoring, no AI black boxes.',
    type: 'website',
    url: `${baseUrl}/how-it-works`,
    siteName: 'IB Match'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How It Works | IB Match',
    description: 'The technology behind IB Match: fast search, transparent scoring, no AI.'
  },
  alternates: {
    canonical: `${baseUrl}/how-it-works`
  }
}

// JSON-LD structured data for SEO and AI search
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'How IB Match Works',
  description:
    'Technical explanation of how IB Match matches students with university programs using search technology and compatibility scoring.',
  url: `${baseUrl}/how-it-works`,
  isPartOf: {
    '@type': 'WebSite',
    name: 'IB Match',
    url: baseUrl
  },
  about: {
    '@type': 'SoftwareApplication',
    name: 'IB Match',
    applicationCategory: 'EducationalApplication',
    description:
      'University matching platform for International Baccalaureate students with fast search and transparent scoring.',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Free for students'
    }
  }
}

export default function HowItWorksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex min-h-screen flex-col">
        <HowItWorksHero />
        <ProgramDatabase />
        <MatchingEngine />
        <FilterSystem />
        <TechStack />
        <NoAISection />
        <HowItWorksCTA />
      </main>
      <StudentFooter />
    </>
  )
}
