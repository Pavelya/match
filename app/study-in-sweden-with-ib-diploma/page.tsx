/**
 * Study in Sweden with IB Diploma - SEO Landing Page
 *
 * This page provides comprehensive information for IB Diploma students
 * seeking university admission in Sweden. Content is based on
 * official Swedish government and educational institution sources.
 *
 * Official sources used:
 * - universityadmissions.se (centralized Swedish application portal)
 * - studyinsweden.se (official government portal for international students)
 * - uhr.se (Swedish Council for Higher Education)
 */
import { Metadata } from 'next'
import { SwedenContent } from './SwedenContent'
import { StudentFooter } from '@/components/layout/StudentFooter'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ibmatch.com'

export const metadata: Metadata = {
  title: 'Study in Sweden with IB Diploma | Official Guide (2027)',
  description:
    'Official guide for IB students applying to Swedish universities. Recognition, merit rating, subject requirements, and application process via universityadmissions.se (2027).',
  keywords: [
    'study in sweden with ib diploma',
    'ib diploma sweden university admission',
    'sweden ib recognition',
    'ib points swedish universities',
    'swedish university entrance ib diploma',
    'ib students sweden requirements',
    'ib diploma sweden 2027',
    'universityadmissions.se ib diploma',
    'sweden ib merit rating'
  ],
  openGraph: {
    title: 'Study in Sweden with IB Diploma | Official Guide (2027)',
    description:
      'Complete guide for IB Diploma students on university admission in Sweden. Merit rating, subject requirements, and application via universityadmissions.se.',
    type: 'website',
    url: `${baseUrl}/study-in-sweden-with-ib-diploma`,
    siteName: 'IB Match'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Study in Sweden with IB Diploma | Guide 2027',
    description:
      'Official guide for IB students: Swedish university admission, merit rating, subject requirements, and application process.'
  },
  alternates: {
    canonical: `${baseUrl}/study-in-sweden-with-ib-diploma`
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
  name: 'Study in Sweden with the IB Diploma',
  description:
    'Authoritative guide for IB Diploma students on university admission in Sweden, including merit rating, subject requirements, and centralized application process.',
  url: `${baseUrl}/study-in-sweden-with-ib-diploma`,
  isPartOf: {
    '@type': 'WebSite',
    name: 'IB Match',
    url: baseUrl
  },
  about: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'International Baccalaureate Diploma',
    description: 'University admission requirements for IB Diploma holders in Sweden'
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
  headline: 'Study in Sweden with the IB Diploma: Official Guide',
  description:
    'Comprehensive guide explaining how the IB Diploma is recognized in Sweden, merit rating conversion, subject requirements, and centralized application process.',
  url: `${baseUrl}/study-in-sweden-with-ib-diploma`,
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
  mainEntityOfPage: `${baseUrl}/study-in-sweden-with-ib-diploma`,
  about: [
    {
      '@type': 'Thing',
      name: 'University Admissions in Sweden',
      description: 'Centralized admission system managed by universityadmissions.se'
    },
    {
      '@type': 'Thing',
      name: 'International Baccalaureate Diploma',
      description: 'International secondary school qualification'
    },
    {
      '@type': 'Country',
      name: 'Sweden'
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
      name: 'Is the IB Diploma recognized for university admission in Sweden?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. The IB Diploma fulfils the general entry requirements for bachelor's studies in Sweden. Applications are submitted through the centralized portal universityadmissions.se. Source: University Admissions in Sweden."
      }
    },
    {
      '@type': 'Question',
      name: 'How are IB points converted for Swedish universities?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'IB points are converted to a Swedish merit rating on a scale of 10.00–20.00, plus up to 2.5 bonus merit points for languages and mathematics. For example, 24 IB points = 12.40, 35 points = 17.92, and 45 points = 20.00. Source: University Admissions in Sweden.'
      }
    },
    {
      '@type': 'Question',
      name: 'What IB grades are needed for specific subject requirements?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A minimum grade of 4 is generally required. For Mathematics, Physics, Chemistry, and Biology at Higher Level, a grade of 3 may be accepted. Mathematics Analysis and Approaches (AA) is the standard requirement for maths-related prerequisites. Source: University Admissions in Sweden.'
      }
    },
    {
      '@type': 'Question',
      name: 'How do IB students apply to Swedish universities?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'All applications are submitted through universityadmissions.se — Sweden\'s centralized application portal. IB results should be sent via the IB Result Service using code "UHR". Source: University Admissions in Sweden.'
      }
    },
    {
      '@type': 'Question',
      name: 'Is Swedish language required for studying in Sweden?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Not always. Sweden offers a large number of English-taught bachelor's and master's programmes. For Swedish-taught programmes, Swedish language proficiency is required. English proficiency can be demonstrated through IB English courses. Source: Study in Sweden."
      }
    }
  ]
}

export default function StudyInSwedenPage() {
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
        <SwedenContent />
      </main>
      <StudentFooter />
    </>
  )
}
