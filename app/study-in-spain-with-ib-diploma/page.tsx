/**
 * Study in Spain with IB Diploma - SEO Landing Page
 *
 * High-authority content page targeting IB students interested in studying in Spain.
 * Provides comprehensive information about UNEDassis, grade conversion, and admission requirements.
 */

import type { Metadata } from 'next'
import { SpainContent } from './SpainContent'
import { StudentFooter } from '@/components/layout/StudentFooter'

// Static generation - page is pre-rendered at build time
// Revalidate every week since content doesn't change frequently
export const dynamic = 'force-static'
export const revalidate = 604800 // 7 days in seconds

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ibmatch.com'

export const metadata: Metadata = {
  title: 'Study in Spain with IB Diploma | Official UNEDassis Guide (2026)',
  description:
    'Official guide for IB students studying in Spain. IB grade conversion (0–14), UNEDassis accreditation, subject weightings, and rules.',
  keywords: [
    'study in spain with ib diploma',
    'ib diploma spain university admission',
    'unedassis ib requirements',
    'ib to spain grade conversion',
    'ib students spain selectividad',
    'ib admission score spain 14 points',
    'ib diploma spain 2026',
    'unedassis application ib',
    'pce exams ib students'
  ],
  openGraph: {
    title: 'Study in Spain with IB Diploma | Official UNEDassis Guide (2026)',
    description:
      'Complete guide for IB Diploma students on university admission in Spain. Grade conversion, UNEDassis process, and subject weightings explained.',
    type: 'website',
    url: `${baseUrl}/study-in-spain-with-ib-diploma`,
    siteName: 'IB Match'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Study in Spain with IB Diploma | UNEDassis Guide 2026',
    description:
      'Official guide for IB students: Spanish grade conversion (0-14), UNEDassis accreditation, and admission requirements.'
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
    'Authoritative guide for IB Diploma students on university admission in Spain, including UNEDassis accreditation and grade conversion.',
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
  headline: 'Study in Spain with the IB Diploma: Official UNEDassis Guide',
  description:
    'Comprehensive guide explaining how the IB Diploma is recognized in Spain, grade conversion to the 0-14 system, and the UNEDassis accreditation process.',
  url: `${baseUrl}/study-in-spain-with-ib-diploma`,
  datePublished: '2025-01-01',
  dateModified: new Date().toISOString().split('T')[0],
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
      name: 'UNEDassis',
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
        text: 'Yes. Predicted IB grades can be used for initial applications through UNEDassis. However, final enrollment requires official IB results. Source: https://unedasiss.uned.es'
      }
    },
    {
      '@type': 'Question',
      name: 'Can IB students study Medicine in Spain?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. IB students can study Medicine in Spain, but cut-off scores (Nota de Corte) are often above 12.5 out of 14 points. Competition is high, and subject weightings for Biology and Chemistry are important. Source: https://www.universidades.gob.es'
      }
    },
    {
      '@type': 'Question',
      name: 'Is Spanish language required for university in Spain?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Usually B2 level Spanish is required for public universities in Spain. Some programs, particularly at private universities, may be offered in English. Source: https://www.universidades.gob.es'
      }
    },
    {
      '@type': 'Question',
      name: 'Is UNEDassis required for private universities in Spain?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In most cases, yes. While private universities may have their own admission processes, UNEDassis accreditation is often required for enrollment to verify the equivalence of international qualifications. Source: https://unedasiss.uned.es'
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
