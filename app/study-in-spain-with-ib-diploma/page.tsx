/**
 * Study in Spain with IB Diploma - SEO Landing Page
 *
 * High-authority content page targeting IB students interested in studying in Spain.
 * Provides comprehensive information about UNEDasiss, grade conversion, and admission requirements.
 */

import type { Metadata } from 'next'
import { SpainContent } from './SpainContent'
import { StudentFooter } from '@/components/layout/StudentFooter'
import { pageDates } from '@/lib/page-dates'

// Static generation - page is pre-rendered at build time
// Revalidate every week since content doesn't change frequently
export const dynamic = 'force-static'
export const revalidate = 604800 // 7 days in seconds

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ibmatch.com'

export const metadata: Metadata = {
  title: 'Study in Spain with IB Diploma | Official UNEDasiss Guide (2027)',
  description:
    'Official guide for IB students studying in Spain. IB grade conversion (5–14), UNEDasiss accreditation, subject weightings, and rules.',
  keywords: [
    'study in spain with ib diploma',
    'ib diploma spain university admission',
    'unedasiss ib requirements',
    'ib to spain grade conversion',
    'ib students spain selectividad',
    'ib admission score spain 14 points',
    'ib diploma spain 2027',
    'unedasiss application ib',
    'pce exams ib students'
  ],
  openGraph: {
    title: 'Study in Spain with IB Diploma | Official UNEDasiss Guide (2027)',
    description:
      'Complete guide for IB Diploma students on university admission in Spain. Grade conversion, UNEDasiss process, and subject weightings explained.',
    type: 'website',
    url: `${baseUrl}/study-in-spain-with-ib-diploma`,
    siteName: 'IB Match'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Study in Spain with IB Diploma | UNEDasiss Guide 2027',
    description:
      'Official guide for IB students: Spanish grade conversion (5-14), UNEDasiss accreditation, and admission requirements.'
  },
  alternates: {
    canonical: `${baseUrl}/study-in-spain-with-ib-diploma`
  },
  robots: {
    index: true,
    follow: true
  }
}

// WebPage schema for SEO
const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Study in Spain with the IB Diploma',
  description:
    'Authoritative guide for IB Diploma students on university admission in Spain, including UNEDasiss accreditation and grade conversion.',
  url: `${baseUrl}/study-in-spain-with-ib-diploma`,
  isPartOf: {
    '@type': 'WebSite',
    name: 'IB Match',
    url: baseUrl
  },
  about: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'International Baccalaureate Diploma',
    description: 'University admission requirements for IB Diploma holders in Spain'
  },
  audience: {
    '@type': 'EducationalAudience',
    educationalRole: ['IB Student', 'IB Coordinator', 'Parent']
  },
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', 'h2', '.content-section p', 'article p', '.faq-answer']
  }
}

// EducationalArticle schema for E-E-A-T signals
const educationalArticleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Study in Spain with the IB Diploma: Official UNEDasiss Guide',
  description:
    'Comprehensive guide explaining how the IB Diploma is recognized in Spain, grade conversion to the 5-14 scale, and the UNEDasiss accreditation process.',
  url: `${baseUrl}/study-in-spain-with-ib-diploma`,
  ...pageDates('/study-in-spain-with-ib-diploma'),
  author: {
    '@type': 'Organization',
    name: 'IB Match',
    url: baseUrl,
    description: 'University matching platform for International Baccalaureate students'
  },
  publisher: {
    '@type': 'Organization',
    name: 'IB Match',
    url: baseUrl
  },
  mainEntityOfPage: `${baseUrl}/study-in-spain-with-ib-diploma`,
  about: [
    {
      '@type': 'Thing',
      name: 'UNEDasiss',
      description: 'Spanish accreditation body for international students'
    },
    {
      '@type': 'Thing',
      name: 'International Baccalaureate Diploma',
      description: 'International secondary school qualification'
    },
    {
      '@type': 'Country',
      name: 'Spain'
    }
  ]
}

// FAQPage schema - questions must match page text exactly
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do predicted IB grades work for Spain?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Not for the access grade, which UNEDasiss calculates from your final IB subject grades. If you have not finished the IB by the admission deadline, send your latest school transcripts with your application and the missing documents when you have them. Source: UNEDasiss — Key dates (in Spanish).'
      }
    },
    {
      '@type': 'Question',
      name: 'Can IB students study Medicine in Spain?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes, but places are highly competitive. For 2026–27, the cut-off for Medicine at Madrid's public universities was between 12.8 and 13.1 out of 14. Source: Comunidad de Madrid — Cut-off grades 2026–27 (PDF, in Spanish)."
      }
    },
    {
      '@type': 'Question',
      name: 'Is Spanish language required?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It depends on the university. Each university sets its own language requirements, and UNEDasiss can add a language certificate to your accreditation when a university asks for one. Source: UNEDasiss — Types of international students (in Spanish).'
      }
    },
    {
      '@type': 'Question',
      name: 'Is UNEDasiss required for private universities?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Usually. UNEDasiss says IB students need its accreditation to enter a Spanish university. Private universities run their own admissions, so confirm what each one asks for. Source: UNEDasiss — Types of international students (in Spanish).'
      }
    }
  ]
}

export default function StudyInSpainPage() {
  return (
    <>
      {/* WebPage schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      {/* EducationalArticle schema for E-E-A-T */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(educationalArticleSchema) }}
      />
      {/* FAQPage schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main className="flex min-h-screen flex-col">
        <SpainContent />
      </main>
      <StudentFooter />
    </>
  )
}
