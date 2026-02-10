/**
 * Study in Italy with IB Diploma - SEO Landing Page
 *
 * High-authority content page targeting IB students interested in studying in Italy.
 * Provides comprehensive information about CIMEA verification, entrance exams, and admission requirements.
 */

import type { Metadata } from 'next'
import { ItalyContent } from './ItalyContent'
import { StudentFooter } from '@/components/layout/StudentFooter'

// Static generation - page is pre-rendered at build time
// Revalidate every week since content doesn't change frequently
export const dynamic = 'force-static'
export const revalidate = 604800 // 7 days in seconds

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ibmatch.com'

export const metadata: Metadata = {
  title: 'Study in Italy with IB Diploma | Official CIMEA Guide (2026)',
  description:
    'Official guide for IB students studying in Italy. IB recognition, CIMEA verification, admission rules, and language requirements.',
  keywords: [
    'study in italy with ib diploma',
    'ib diploma italy university admission',
    'cimea ib recognition',
    'ib diploma italy requirements',
    'ib students italy admission',
    'ib diploma italian universities',
    'ib diploma italy 2026',
    'cimea verification ib'
  ],
  openGraph: {
    title: 'Study in Italy with IB Diploma | Official CIMEA Guide (2026)',
    description:
      'Complete guide for IB Diploma students on university admission in Italy. CIMEA verification, entrance exams, and admission requirements explained.',
    type: 'website',
    url: `${baseUrl}/study-in-italy-with-ib-diploma`,
    siteName: 'IB Match'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Study in Italy with IB Diploma | CIMEA Guide 2026',
    description:
      'Official guide for IB students: CIMEA verification, entrance exams, and Italian university admission requirements.'
  },
  alternates: {
    canonical: `${baseUrl}/study-in-italy-with-ib-diploma`
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
  name: 'Study in Italy with the IB Diploma',
  description:
    'Authoritative guide for IB Diploma students on university admission in Italy, including CIMEA verification and entrance exam requirements.',
  url: `${baseUrl}/study-in-italy-with-ib-diploma`,
  isPartOf: {
    '@type': 'WebSite',
    name: 'IB Match',
    url: baseUrl
  },
  about: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'International Baccalaureate Diploma',
    description: 'University admission requirements for IB Diploma holders in Italy'
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
  headline: 'Study in Italy with the IB Diploma: Official CIMEA Guide',
  description:
    'Comprehensive guide explaining how the IB Diploma is recognized in Italy, CIMEA verification process, entrance exams, and admission requirements.',
  url: `${baseUrl}/study-in-italy-with-ib-diploma`,
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
  mainEntityOfPage: `${baseUrl}/study-in-italy-with-ib-diploma`,
  about: [
    {
      '@type': 'Thing',
      name: 'CIMEA',
      description: 'Italian information center for academic recognition'
    },
    {
      '@type': 'Thing',
      name: 'International Baccalaureate Diploma',
      description: 'International secondary school qualification'
    },
    {
      '@type': 'Country',
      name: 'Italy'
    }
  ]
}

// HowTo schema for CIMEA verification steps
const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Apply to Italian Universities with an IB Diploma',
  description:
    'Step-by-step guide for IB students applying to universities in Italy through CIMEA verification.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Request CIMEA verification',
      text: 'Submit verification request to CIMEA during January-March with IB Diploma and transcripts.'
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Prepare documents',
      text: 'Gather IB Diploma, transcripts, passport, and CIMEA Statement of Comparability.'
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Apply to universities',
      text: 'Submit applications through Universitaly or directly to universities during April-June.'
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Take entrance exams',
      text: 'Complete entrance exams for restricted programs like Medicine, Architecture, etc.'
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Enrollment',
      text: 'Complete enrollment and final verification in July-September.'
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
      name: 'Are predicted IB grades accepted in Italy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, for application. Final enrollment requires official IB results. Source: https://www.cimea.it'
      }
    },
    {
      '@type': 'Question',
      name: 'Can IB students study Medicine in Italy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, but they must pass the national entrance exam. Source: https://www.mur.gov.it'
      }
    },
    {
      '@type': 'Question',
      name: 'Is Italian mandatory for all programs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. English-taught programs exist, but language proof is required. Source: https://www.universitaly.it'
      }
    },
    {
      '@type': 'Question',
      name: 'Is CIMEA mandatory for IB students?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In most cases, yes. Many universities explicitly require it. Source: https://www.cimea.it'
      }
    }
  ]
}

export default function StudyInItalyPage() {
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
      {/* HowTo schema for CIMEA workflow */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      {/* FAQPage schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main className="flex min-h-screen flex-col">
        <ItalyContent />
      </main>
      <StudentFooter />
    </>
  )
}
