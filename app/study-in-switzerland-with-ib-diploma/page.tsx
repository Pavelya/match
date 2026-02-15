/**
 * Study in Switzerland with IB Diploma - SEO Landing Page
 *
 * This page provides comprehensive information for IB Diploma students
 * seeking university admission in Switzerland. Content is based on official
 * Swiss university and government sources and follows SEO best practices.
 *
 * @see /docs/countries/switzerland-ib-seo-materials.md for content requirements
 */

import { Metadata } from 'next'
import { StudentFooter } from '@/components/layout/StudentFooter'
import { SwitzerlandContent } from './SwitzerlandContent'

export const dynamic = 'force-static'
export const revalidate = 604800 // 7 days in seconds

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ibmatch.com'

export const metadata: Metadata = {
  title: 'Study in Switzerland with IB Diploma | Official Guide (2027)',
  description:
    'Official guide for IB students entering Swiss universities. Requirements, recognition, language rules, and application processes (2027).',
  keywords: [
    'study in switzerland with ib diploma',
    'ib diploma switzerland university admission',
    'switzerland ib recognition',
    'ib points swiss universities',
    'swiss university entrance ib diploma',
    'ib students switzerland requirements',
    'ib diploma switzerland 2027',
    'swiss university ib students'
  ],
  openGraph: {
    title: 'Study in Switzerland with IB Diploma | Official Guide (2027)',
    description:
      'Complete guide for IB Diploma students on university admission in Switzerland. Recognition, language rules, and application processes explained.',
    type: 'website',
    url: `${baseUrl}/study-in-switzerland-with-ib-diploma`,
    siteName: 'IB Match'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Study in Switzerland with IB Diploma | Guide 2027',
    description:
      'Official guide for IB students: Swiss university admission, requirements, language rules, and application processes.'
  },
  alternates: {
    canonical: `${baseUrl}/study-in-switzerland-with-ib-diploma`
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
  name: 'Study in Switzerland with the IB Diploma',
  description:
    'Authoritative guide for IB Diploma students on university admission in Switzerland, including recognition, language requirements, and application processes.',
  url: `${baseUrl}/study-in-switzerland-with-ib-diploma`,
  isPartOf: {
    '@type': 'WebSite',
    name: 'IB Match',
    url: baseUrl
  },
  about: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'International Baccalaureate Diploma',
    description: 'University admission requirements for IB Diploma holders in Switzerland'
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
  headline: 'Study in Switzerland with the IB Diploma: Official Guide',
  description:
    'Comprehensive guide explaining how the IB Diploma is recognized in Switzerland, university admission requirements, language rules, and application processes.',
  url: `${baseUrl}/study-in-switzerland-with-ib-diploma`,
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
  mainEntityOfPage: `${baseUrl}/study-in-switzerland-with-ib-diploma`,
  about: [
    {
      '@type': 'Thing',
      name: 'Swissuniversities',
      description: 'Umbrella body for Swiss universities and coordination of admission policies'
    },
    {
      '@type': 'Thing',
      name: 'International Baccalaureate Diploma',
      description: 'International secondary school qualification'
    },
    {
      '@type': 'Country',
      name: 'Switzerland'
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
      name: 'How is the IB diploma recognized in Switzerland?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Swiss universities accept the IB Diploma as a foreign upper secondary qualification, evaluated institution-by-institution. Source: Swissuniversities admission info.'
      }
    },
    {
      '@type': 'Question',
      name: 'Do IB students need a Swiss Maturity?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No; the IB Diploma can serve as an equivalent admission qualification. Source: Swiss recognition guidance.'
      }
    },
    {
      '@type': 'Question',
      name: 'Is there a national IB score conversion in Switzerland?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No; universities determine criteria such as 32/42 IB points, subject prereqs, or exams themselves. Source: University policies and Swissuniversities info.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can IB students study medicine in Switzerland?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, but medicine programs may have extra admissions requirements such as tests or higher entry standards set by the university. Source: Swiss university admissions policies.'
      }
    },
    {
      '@type': 'Question',
      name: 'Is German or French required for Swiss universities?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes; Swiss universities generally require proficiency in the language of instruction; English-taught programs require English proficiency. Source: University language policy expectations.'
      }
    }
  ]
}

export default function StudyInSwitzerlandPage() {
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
        <SwitzerlandContent />
      </main>
      <StudentFooter />
    </>
  )
}
