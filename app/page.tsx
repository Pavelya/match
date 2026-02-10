import type { Metadata } from 'next'
import { Hero } from './landing/students/_components/Hero'
import { FeatureGrid } from './landing/students/_components/FeatureGrid'
import { HowItWorks } from './landing/students/_components/HowItWorks'
import { TrustSection } from './landing/students/_components/TrustSection'
import { CallToAction } from './landing/students/_components/CallToAction'
import { StudentFooter } from '@/components/layout/StudentFooter'

// Static generation - page is pre-rendered at build time
// Revalidate every hour to pick up any changes
export const dynamic = 'force-static'
export const revalidate = 3600

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ibmatch.com'

export const metadata: Metadata = {
  title: 'IB Match - Find Your Perfect University Program',
  description:
    'The only university matching platform built exclusively for IB Diploma students. Match your predicted IB grades, HL/SL subjects, and TOK/EE scores with university programs worldwide. 100% free for students.',
  keywords: [
    'IB university matching',
    'International Baccalaureate universities',
    'IB diploma programs',
    'university finder for IB students',
    'IB points university requirements',
    'HL SL subject matching',
    'TOK EE grades university',
    'IB student resources',
    'university admission IB',
    'IB predicted grades'
  ],
  openGraph: {
    title: 'IB Match - Find Your Perfect University Program',
    description:
      'Match your IB profile with universities worldwide. Built by an IB graduate who wished this existed. 100% free for students.',
    type: 'website',
    url: baseUrl,
    siteName: 'IB Match'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IB Match - Find Your Perfect University Program',
    description: 'Match your IB profile with universities worldwide. 100% free for students.'
  },
  alternates: {
    canonical: baseUrl
  }
}

// JSON-LD structured data for SEO and AI search
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      name: 'IB Match',
      url: baseUrl,
      description: 'University matching platform for International Baccalaureate students',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${baseUrl}/programs/search?q={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      }
    },
    {
      '@type': 'EducationalOrganization',
      name: 'IB Match',
      url: baseUrl,
      logo: `${baseUrl}/og-image.png`,
      description:
        'Platform connecting IB students with suitable university programs based on their predicted grades, subjects, and preferences',
      knowsAbout: [
        'International Baccalaureate',
        'IB Diploma Programme',
        'University Admissions',
        'Higher Level subjects',
        'Standard Level subjects'
      ]
    },
    {
      '@type': 'WebPage',
      '@id': baseUrl,
      name: 'IB Match - Find Your Perfect University Program',
      description:
        'The only university matching platform built exclusively for IB Diploma students. Match your predicted IB grades, HL/SL subjects, and TOK/EE scores with university programs worldwide.',
      datePublished: '2025-01-01',
      dateModified: new Date().toISOString().split('T')[0],
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', '.hero-description', '.feature-title', '.feature-description']
      }
    }
  ]
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex min-h-screen flex-col">
        <Hero />
        <FeatureGrid />
        <HowItWorks />
        <TrustSection />
        <CallToAction />
      </main>
      <StudentFooter />
    </>
  )
}
