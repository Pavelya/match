/**
 * Study in Denmark with IB Diploma - SEO Landing Page
 *
 * This page provides comprehensive information for IB Diploma students
 * seeking university admission in Denmark. Content is based on
 * official Danish government and educational institution sources.
 *
 * Official sources used:
 * - studyindenmark.dk (official government portal for international students)
 * - optagelse.dk (centralized Danish application portal)
 * - ufsn.dk (Danish Agency for Higher Education and Science)
 */
import { Metadata } from 'next'
import { DenmarkContent } from './DenmarkContent'
import { StudentFooter } from '@/components/layout/StudentFooter'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ibmatch.com'

export const dynamic = 'force-static'
export const revalidate = 604800 // 7 days

export const metadata: Metadata = {
  title: 'Study in Denmark with IB Diploma | Guide (2026)',
  description:
    'Official guide for IB students applying to Danish universities. Recognition, grade conversion, Quota system, and application via optagelse.dk (2026).',
  keywords: [
    'study in denmark with ib diploma',
    'ib diploma denmark university admission',
    'denmark ib recognition',
    'ib points danish universities',
    'danish university entrance ib diploma',
    'ib students denmark requirements',
    'optagelse.dk ib diploma',
    'denmark ib grade conversion'
  ],
  openGraph: {
    title: 'Study in Denmark with IB Diploma | Guide (2026)',
    description:
      'Complete guide for IB Diploma students on university admission in Denmark. Grade conversion, Quota system, and centralized application via optagelse.dk.',
    type: 'website',
    url: `${baseUrl}/study-in-denmark-with-ib-diploma`,
    siteName: 'IB Match'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Study in Denmark with IB Diploma | Guide 2026',
    description:
      'Official guide for IB students: Danish university admission, grade conversion, Quota system, and application process.'
  },
  alternates: {
    canonical: `${baseUrl}/study-in-denmark-with-ib-diploma`
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
  name: 'Study in Denmark with the IB Diploma',
  description:
    'Authoritative guide for IB Diploma students on university admission in Denmark, including grade conversion, Quota system, and centralized application process.',
  url: `${baseUrl}/study-in-denmark-with-ib-diploma`,
  isPartOf: {
    '@type': 'WebSite',
    name: 'IB Match',
    url: baseUrl
  },
  about: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'International Baccalaureate Diploma',
    description: 'University admission requirements for IB Diploma holders in Denmark'
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
  headline: 'Study in Denmark with the IB Diploma: Official Guide',
  description:
    'Comprehensive guide explaining how the IB Diploma is recognized in Denmark, grade conversion to the Danish 7-point scale, Quota system, and centralized application process.',
  url: `${baseUrl}/study-in-denmark-with-ib-diploma`,
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
  mainEntityOfPage: `${baseUrl}/study-in-denmark-with-ib-diploma`,
  about: [
    {
      '@type': 'Thing',
      name: 'University Admissions in Denmark',
      description: 'Centralized admission system managed via optagelse.dk'
    },
    {
      '@type': 'Thing',
      name: 'International Baccalaureate Diploma',
      description: 'International secondary school qualification'
    },
    {
      '@type': 'Country',
      name: 'Denmark'
    }
  ]
}

// FAQPage schema
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is the IB Diploma recognized for university admission in Denmark?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. The IB Diploma satisfies the general entry requirements for Danish undergraduate programmes (Bachelor's, Professional Bachelor's, and Academy Profession degrees). A minimum of 24 IB points is required. Source: Study in Denmark — How to Apply."
      }
    },
    {
      '@type': 'Question',
      name: 'How are IB grades converted for Danish university admission?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'IB grades are converted to the Danish 7-point grading scale. The conversion table is published annually by the Danish Ministry of Higher Education and Science around March 1. A GPA bonus multiplier of 1.08 is applied in Quota 1 if you apply within two years of completing your IB Diploma. Source: Study in Denmark — How to Apply.'
      }
    },
    {
      '@type': 'Question',
      name: 'How do IB students apply to Danish universities?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'All applications are submitted through the centralized portal optagelse.dk. IB applicants must apply by March 15, 12:00 noon CET. You can apply for up to 8 programmes and rank them by preference. The Coordinated Admission system (KOT) ensures you receive at most one offer. Source: Study in Denmark — How to Apply.'
      }
    },
    {
      '@type': 'Question',
      name: 'Do I need to speak Danish to study in Denmark?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Not necessarily. Denmark offers over 500 English-taught programmes. For English-taught programmes, you need English proficiency comparable to Danish 'English B' (approximately IELTS 6.5). For Danish-taught programmes, you must pass 'Studieprøven' (Danish as a Foreign Language test). International students can take Danish lessons for free. Source: Study in Denmark — Language Requirements."
      }
    },
    {
      '@type': 'Question',
      name: 'Is higher education in Denmark free for IB students?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It depends on your nationality. Higher education is free for EU/EEA and Swiss citizens. All other students must pay tuition fees, which are set by individual institutions. Government scholarships are available for non-EU/EEA students. Source: Study in Denmark — Tuition Fees.'
      }
    }
  ]
}

export default function StudyInDenmarkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(educationalArticleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main className="flex min-h-screen flex-col">
        <DenmarkContent />
      </main>
      <StudentFooter />
    </>
  )
}
