/**
 * Study in Australia with IB Diploma - SEO Landing Page
 *
 * This page provides comprehensive information for IB Diploma students
 * seeking university admission in Australia. Content is based on official
 * sources and follows SEO best practices.
 *
 * @see /docs/countries/australia-ib-seo-materials.md for content requirements
 */

import { Metadata } from 'next'
import { StudentFooter } from '@/components/layout/StudentFooter'
import { AustraliaContent } from './AustraliaContent'

export const dynamic = 'force-static'
export const revalidate = 604800 // 7 days in seconds

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ibmatch.com'

export const metadata: Metadata = {
  title: 'Study in Australia with IB Diploma | Official IBAS–ATAR Guide (2026)',
  description:
    'Official guide for IB students studying in Australia. IB recognition, IBAS–ATAR conversion (valid to May 2026), and admission rules.',
  keywords: [
    'study in australia with ib diploma',
    'ib diploma australia university admission',
    'ibas to atar conversion 2026',
    'ib to atar conversion australia',
    'ib students australia admission',
    'australian university entry ib diploma'
  ],
  openGraph: {
    title: 'Study in Australia with IB Diploma | Official IBAS–ATAR Guide (2026)',
    description:
      'Complete guide for IB Diploma students on university admission in Australia. IBAS–ATAR conversion, admission criteria, and requirements explained.',
    type: 'website',
    url: `${baseUrl}/study-in-australia-with-ib-diploma`,
    siteName: 'IB Match'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Study in Australia with IB Diploma | IBAS–ATAR Guide 2026',
    description:
      'Official guide for IB students: Australian university admission, IBAS–ATAR conversion, and requirements.'
  },
  alternates: {
    canonical: `${baseUrl}/study-in-australia-with-ib-diploma`
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
  name: 'Study in Australia with the IB Diploma',
  description:
    'Authoritative guide for IB Diploma students on university admission in Australia, including IBAS–ATAR conversion and admission criteria.',
  url: `${baseUrl}/study-in-australia-with-ib-diploma`,
  isPartOf: {
    '@type': 'WebSite',
    name: 'IB Match',
    url: baseUrl
  },
  about: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'International Baccalaureate Diploma',
    description: 'University admission requirements for IB Diploma holders in Australia'
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
  headline: 'Study in Australia with the IB Diploma: Official IBAS–ATAR Guide',
  description:
    'Comprehensive guide explaining how the IB Diploma is recognized in Australia, IBAS–ATAR conversion, and admission requirements.',
  url: `${baseUrl}/study-in-australia-with-ib-diploma`,
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
  mainEntityOfPage: `${baseUrl}/study-in-australia-with-ib-diploma`,
  about: [
    {
      '@type': 'Thing',
      name: 'IB Australasia',
      description: 'Regional IB organization for Australia and Australasia'
    },
    {
      '@type': 'Thing',
      name: 'IBAS (IB Admissions Score)',
      description: 'Score used to convert IB results to ATAR-equivalent ranks'
    },
    {
      '@type': 'Thing',
      name: 'International Baccalaureate Diploma',
      description: 'International secondary school qualification'
    },
    {
      '@type': 'Country',
      name: 'Australia'
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
      name: 'How is the IB diploma recognized in Australia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It is accepted as a senior secondary qualification and assessed via IBAS–ATAR or IB-based selection rules set by universities and admissions centres. Source: IB Australasia'
      }
    },
    {
      '@type': 'Question',
      name: 'Do IB students get an ATAR in Australia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. They receive an IBAS that converts to an ATAR-equivalent rank. Source: UAC'
      }
    },
    {
      '@type': 'Question',
      name: 'How does IBAS convert to ATAR for 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Using the official conversion schedule valid for IB exams from November 2022 to May 2026. Source: IB Australasia'
      }
    },
    {
      '@type': 'Question',
      name: 'Are entrance exams required in Australia for IB students?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Usually no, but some programs require additional selection steps. Source: Curtin University'
      }
    },
    {
      '@type': 'Question',
      name: 'Is English required for university in Australia for IB students?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. English requirements depend on the university's policy. Source: University of Sydney"
      }
    }
  ]
}

export default function StudyInAustraliaPage() {
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
        <AustraliaContent />
      </main>
      <StudentFooter />
    </>
  )
}
