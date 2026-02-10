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

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ibmatch.com'

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
const webPageSchema = {
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

// TechArticle schema for E-E-A-T signals (Task 5.3)
// Signals expertise and authority to AI search engines
const techArticleSchema = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'How IB Match Works: Technology Behind University Matching for IB Students',
  description:
    'Technical deep dive into IB Match: Algolia-powered search, three-factor compatibility scoring, and transparent matching algorithms for International Baccalaureate students.',
  url: `${baseUrl}/how-it-works`,
  datePublished: '2025-01-01',
  dateModified: new Date().toISOString().split('T')[0],
  author: {
    '@type': 'Organization',
    name: 'IB Match',
    url: baseUrl,
    logo: `${baseUrl}/og-image.png`,
    description: 'University matching platform for International Baccalaureate students'
  },
  publisher: {
    '@type': 'Organization',
    name: 'IB Match',
    url: baseUrl,
    logo: `${baseUrl}/og-image.png`
  },
  about: [
    {
      '@type': 'Thing',
      name: 'University Matching',
      description: 'Algorithm and technology for matching students with university programs'
    },
    {
      '@type': 'Thing',
      name: 'International Baccalaureate',
      description: 'IB Diploma program requirements and university admission'
    },
    {
      '@type': 'Thing',
      name: 'Search Technology',
      description: 'Algolia-powered search and filtering for educational programs'
    }
  ],
  abstract:
    'IB Match uses fast search technology and transparent scoring to match International Baccalaureate students with university programs. Our platform evaluates compatibility based on IB points, subject requirements, and student preferences without AI black boxes.',
  articleBody:
    'IB Match leverages Algolia search to enable instant filtering across university programs. Our three-factor scoring system evaluates: (1) IB Points Compatibility - comparing student scores against program requirements, (2) Subject Match - analyzing HL/SL course alignment, and (3) Preference Alignment - considering student location and field preferences. Unlike AI-based systems, our deterministic algorithm provides explainable, transparent results that students can trust.',
  proficiencyLevel: 'Expert',
  dependencies: 'Algolia Search, Next.js, PostgreSQL',
  teaches: [
    'How university matching algorithms work',
    'IB requirements evaluation methodology',
    'Search technology for educational platforms'
  ],
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', 'h2', '.section-description', 'article p']
  }
}

export default function HowItWorksPage() {
  return (
    <>
      {/* WebPage schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      {/* TechArticle schema for E-E-A-T */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleSchema) }}
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
