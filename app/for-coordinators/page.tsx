import type { Metadata } from 'next'
import { CoordinatorHero } from './_components/CoordinatorHero'
import { CoordinatorStory } from './_components/CoordinatorStory'
import { CoordinatorFeatures } from './_components/CoordinatorFeatures'
import { CoordinatorDashboard } from './_components/CoordinatorDashboard'
import { CoordinatorCTA } from './_components/CoordinatorCTA'
import { StudentFooter } from '@/components/layout/StudentFooter'

// Static generation - page is pre-rendered at build time
// Revalidate every hour to pick up any changes
export const dynamic = 'force-static'
export const revalidate = 3600

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ibmatch.com'

export const metadata: Metadata = {
  title: 'For IB Coordinators',
  description:
    'Help your IB students navigate university admissions with confidence. Partner with IB Match to streamline university guidance and matching for your school.',
  keywords: [
    'IB coordinator tools',
    'IB university guidance',
    'university counseling for IB students',
    'IB school management',
    'IB predicted grades analysis',
    'IB Diploma Programme counseling',
    'student university matching'
  ],
  openGraph: {
    title: 'For IB Coordinators | IB Match',
    description:
      'Help your students navigate university admissions with confidence. IB Match provides IB-specific university matching that speaks their language.',
    type: 'website',
    url: `${baseUrl}/for-coordinators`
  },
  twitter: {
    card: 'summary_large_image',
    title: 'For IB Coordinators | IB Match',
    description: 'Help your students navigate university admissions with confidence.'
  },
  alternates: {
    canonical: `${baseUrl}/for-coordinators`
  }
}

// JSON-LD structured data for SEO and AI search
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'IB Match for Coordinators',
  description: 'Partner page for IB Coordinators to help their students with university matching.',
  url: `${baseUrl}/for-coordinators`,
  datePublished: '2025-01-01',
  dateModified: new Date().toISOString().split('T')[0],
  isPartOf: {
    '@type': 'WebSite',
    name: 'IB Match',
    url: baseUrl
  },
  about: {
    '@type': 'Service',
    name: 'IB Match Coordinator Partnership',
    description:
      'University matching tools for IB Diploma Programme coordinators to help students find suitable university programs.',
    provider: {
      '@type': 'Organization',
      name: 'IB Match',
      url: baseUrl,
      logo: `${baseUrl}/og-image.png`
    },
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'IB Coordinator'
    }
  },
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', 'h2', '.feature-description', 'article p']
  }
}

export default function CoordinatorLandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex min-h-screen flex-col">
        <CoordinatorHero />
        <CoordinatorStory />
        <CoordinatorFeatures />
        <CoordinatorDashboard />
        <CoordinatorCTA />
        <StudentFooter />
      </main>
    </>
  )
}
