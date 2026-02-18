/**
 * Study in Austria with IB Diploma - SEO Landing Page
 *
 * This page provides comprehensive information for IB Diploma students
 * seeking university admission in Austria. Content is based on
 * official Austrian government and educational institution sources.
 *
 * Official sources used:
 * - studyinaustria.at (OeAD portal for international students)
 * - studieren.univie.ac.at (University of Vienna admissions)
 * - oead.at (Austrian Agency for Education and Internationalisation)
 */
import { Metadata } from 'next'
import { AustriaContent } from './AustriaContent'
import { StudentFooter } from '@/components/layout/StudentFooter'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ibmatch.com'

export const metadata: Metadata = {
  title: 'Study in Austria with IB Diploma | Official Guide (2027)',
  description:
    'Official guide for IB students applying to Austrian universities. Recognition, admission requirements, German language rules, and application deadlines (2027).',
  keywords: [
    'study in austria with ib diploma',
    'ib diploma austria university admission',
    'austria ib recognition',
    'ib points austrian universities',
    'austrian university entrance ib diploma',
    'ib students austria requirements',
    'ib diploma austria 2027',
    'austrian university ib students'
  ],
  openGraph: {
    title: 'Study in Austria with IB Diploma | Official Guide (2027)',
    description:
      'Complete guide for IB Diploma students on university admission in Austria. Recognition, requirements, language rules, and application processes explained.',
    type: 'website',
    url: `${baseUrl}/study-in-austria-with-ib-diploma`,
    siteName: 'IB Match'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Study in Austria with IB Diploma | Guide 2027',
    description:
      'Official guide for IB students: Austrian university admission, requirements, language rules, and application processes.'
  },
  alternates: {
    canonical: `${baseUrl}/study-in-austria-with-ib-diploma`
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
  name: 'Study in Austria with the IB Diploma',
  description:
    'Authoritative guide for IB Diploma students on university admission in Austria, including recognition, language requirements, and application processes.',
  url: `${baseUrl}/study-in-austria-with-ib-diploma`,
  isPartOf: {
    '@type': 'WebSite',
    name: 'IB Match',
    url: baseUrl
  },
  about: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'International Baccalaureate Diploma',
    description: 'University admission requirements for IB Diploma holders in Austria'
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
  headline: 'Study in Austria with the IB Diploma: Official Guide',
  description:
    'Comprehensive guide explaining how the IB Diploma is recognized in Austria, university admission requirements, language rules, and application processes.',
  url: `${baseUrl}/study-in-austria-with-ib-diploma`,
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
  mainEntityOfPage: `${baseUrl}/study-in-austria-with-ib-diploma`,
  about: [
    {
      '@type': 'Thing',
      name: 'Study in Austria',
      description:
        'OeAD portal providing official information for international students in Austria'
    },
    {
      '@type': 'Thing',
      name: 'International Baccalaureate Diploma',
      description: 'International secondary school qualification'
    },
    {
      '@type': 'Country',
      name: 'Austria'
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
      name: 'Is the IB Diploma recognized for university admission in Austria?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The IB Diploma is recognized as a general university entrance qualification (allgemeine Universitätsreife) by Austrian universities when specific criteria are met. No Nostrifizierung is required. Source: Study in Austria — Application and admission.'
      }
    },
    {
      '@type': 'Question',
      name: 'What is the minimum IB score for Austrian universities?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A minimum of 24 IB points from six subjects is required, with at least 12 points combined from the three Higher Level subjects and no individual subject grade below 3. Source: Austrian university admission policies.'
      }
    },
    {
      '@type': 'Question',
      name: 'Is German required for studying in Austria?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Most public university programs in Austria are taught in German, and proof of German language proficiency is required. If German is taken as Language A in the IB, this may satisfy the requirement. Source: Study in Austria — Application and admission.'
      }
    },
    {
      '@type': 'Question',
      name: 'Do IB students need to pass entrance exams in Austria?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Some competitive programs (e.g., Medicine, Psychology, Business) require entrance exams such as the MedAT. These apply to all applicants regardless of qualification type. Source: Study in Austria — Application and admission.'
      }
    },
    {
      '@type': 'Question',
      name: 'When should IB students apply to Austrian universities?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The application deadline for the winter semester is September 5, and for summer semester February 5. International applicants should apply well in advance as processing foreign documents may take longer. Source: Study in Austria — Application and admission.'
      }
    }
  ]
}

export default function StudyInAustriaPage() {
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
        <AustriaContent />
      </main>
      <StudentFooter />
    </>
  )
}
