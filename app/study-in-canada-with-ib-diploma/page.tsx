/**
 * Study in Canada with IB Diploma - SEO Landing Page
 *
 * This page provides comprehensive information for IB Diploma students
 * seeking university admission in Canada. Content is based on official
 * sources and follows SEO best practices.
 *
 * @see /docs/countries/canada-ib-seo-materials.md for content requirements
 */

import { Metadata } from 'next'
import { StudentFooter } from '@/components/layout/StudentFooter'
import { CanadaContent } from './CanadaContent'

export const dynamic = 'force-static'
export const revalidate = 604800 // 7 days in seconds

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ibmatch.com'

export const metadata: Metadata = {
  title: 'Study in Canada with IB Diploma | Official University Guide (2026)',
  description:
    'Official guide for IB students studying in Canada. IB recognition, provincial rules, admission criteria, and language requirements.',
  keywords: [
    'study in canada with ib diploma',
    'ib diploma canada university admission',
    'ib students canada requirements',
    'ib canada grade conversion',
    'ib diploma canadian universities',
    'ib admission canada',
    'ib diploma canada 2026',
    'canadian universities ib students'
  ],
  openGraph: {
    title: 'Study in Canada with IB Diploma | Official University Guide (2026)',
    description:
      'Complete guide for IB Diploma students on university admission in Canada. Provincial rules, admission criteria, and language requirements explained.',
    type: 'website',
    url: `${baseUrl}/study-in-canada-with-ib-diploma`,
    siteName: 'IB Match'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Study in Canada with IB Diploma | University Guide 2026',
    description:
      'Official guide for IB students: Canadian university admission, provincial rules, and requirements.'
  },
  alternates: {
    canonical: `${baseUrl}/study-in-canada-with-ib-diploma`
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
  name: 'Study in Canada with the IB Diploma',
  description:
    'Authoritative guide for IB Diploma students on university admission in Canada, including provincial rules and admission criteria.',
  url: `${baseUrl}/study-in-canada-with-ib-diploma`,
  isPartOf: {
    '@type': 'WebSite',
    name: 'IB Match',
    url: baseUrl
  },
  about: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'International Baccalaureate Diploma',
    description: 'University admission requirements for IB Diploma holders in Canada'
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
  headline: 'Study in Canada with the IB Diploma: Official University Guide',
  description:
    'Comprehensive guide explaining how the IB Diploma is recognized in Canada, provincial admission systems, and language requirements.',
  url: `${baseUrl}/study-in-canada-with-ib-diploma`,
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
  mainEntityOfPage: `${baseUrl}/study-in-canada-with-ib-diploma`,
  about: [
    {
      '@type': 'Thing',
      name: 'Universities Canada',
      description: 'National organization representing Canadian universities'
    },
    {
      '@type': 'Thing',
      name: 'International Baccalaureate Diploma',
      description: 'International secondary school qualification'
    },
    {
      '@type': 'Country',
      name: 'Canada'
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
      name: 'Do Canadian universities accept predicted IB grades?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Offers are typically conditional on final IB results. Source: University admission policies'
      }
    },
    {
      '@type': 'Question',
      name: 'Is there a national IB admission score for Canada?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Each university evaluates IB results independently. Source: Universities Canada'
      }
    },
    {
      '@type': 'Question',
      name: 'Can IB students study Medicine in Canada?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, but Medicine is a graduate-entry program requiring a prior degree. Source: Canadian medical school admission frameworks'
      }
    },
    {
      '@type': 'Question',
      name: 'Is English or French mandatory for Canadian universities?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Language requirements depend on the institution and province. Source: University language policies'
      }
    }
  ]
}

export default function StudyInCanadaPage() {
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
        <CanadaContent />
      </main>
      <StudentFooter />
    </>
  )
}
