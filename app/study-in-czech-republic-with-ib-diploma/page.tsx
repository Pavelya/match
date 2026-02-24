/**
 * Study in Czech Republic with IB Diploma - SEO Landing Page
 *
 * This page provides comprehensive information for IB Diploma students
 * seeking university admission in the Czech Republic. Content is based on
 * official Czech government and educational institution sources.
 *
 * Official sources used:
 * - studyin.cz (official government portal by DZS / Ministry of Education)
 * - cuni.cz (Charles University)
 * - cvut.cz (Czech Technical University in Prague)
 * - ibo.org (IB recognition database for Czech Republic)
 */
import { Metadata } from 'next'
import { CzechRepublicContent } from './CzechRepublicContent'
import { StudentFooter } from '@/components/layout/StudentFooter'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ibmatch.com'

export const dynamic = 'force-static'
export const revalidate = 604800 // 7 days

export const metadata: Metadata = {
  title: 'Study in Czech Republic with IB Diploma | Guide (2026)',
  description:
    'Official guide for IB students applying to Czech universities. IB Diploma equals maturita since 2025, entrance exams, and admission process.',
  keywords: [
    'study in czech republic with ib diploma',
    'ib diploma czech republic university admission',
    'czech republic ib recognition',
    'ib diploma maturita equivalence',
    'czech university entrance exams ib',
    'ib students czech republic requirements',
    'study in czechia with ib diploma',
    'charles university ib diploma'
  ],
  openGraph: {
    title: 'Study in Czech Republic with IB Diploma | Guide (2026)',
    description:
      'Complete guide for IB Diploma holders on Czech university admission. IB equals maturita since 2025, entrance exams, documents, and how to apply.',
    type: 'website',
    url: `${baseUrl}/study-in-czech-republic-with-ib-diploma`,
    siteName: 'IB Match'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Study in Czech Republic with IB Diploma | Guide 2026',
    description:
      'Official guide for IB students: Czech university admission, maturita equivalence, entrance exams, and application process.'
  },
  alternates: {
    canonical: `${baseUrl}/study-in-czech-republic-with-ib-diploma`
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
  name: 'Study in Czech Republic with the IB Diploma',
  description:
    'Authoritative guide for IB Diploma students on university admission in the Czech Republic, including maturita equivalence, entrance exams, and decentralized application process.',
  url: `${baseUrl}/study-in-czech-republic-with-ib-diploma`,
  isPartOf: {
    '@type': 'WebSite',
    name: 'IB Match',
    url: baseUrl
  },
  about: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'International Baccalaureate Diploma',
    description: 'University admission requirements for IB Diploma holders in the Czech Republic'
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
  headline: 'Study in Czech Republic with the IB Diploma: Official Guide',
  description:
    'Comprehensive guide explaining how the IB Diploma is recognized in the Czech Republic, maturita equivalence, entrance exams, and decentralized application process.',
  url: `${baseUrl}/study-in-czech-republic-with-ib-diploma`,
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
  mainEntityOfPage: `${baseUrl}/study-in-czech-republic-with-ib-diploma`,
  about: [
    {
      '@type': 'Thing',
      name: 'University Admission in the Czech Republic',
      description: 'Decentralized admission system managed by individual universities and faculties'
    },
    {
      '@type': 'Thing',
      name: 'International Baccalaureate Diploma',
      description: 'International secondary school qualification'
    },
    {
      '@type': 'Country',
      name: 'Czech Republic'
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
      name: 'Is the IB Diploma recognized for university admission in the Czech Republic?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Since March 1, 2025, IB diplomas are excluded from the category of foreign secondary school documents that require assessment during the admission procedure. If submitted after March 1, 2025, the IB diploma will be automatically accepted by the faculty without an assessment fee. Source: Charles University — Diploma Recognition.'
      }
    },
    {
      '@type': 'Question',
      name: 'Do IB students need to take entrance exams for Czech universities?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It depends on the programme and faculty. Many Czech public universities require entrance exams, especially for Medicine (Biology, Chemistry, Physics), Engineering, and Law. Some faculties offer exam waivers for IB students who meet specific score thresholds. Each faculty sets its own requirements. Source: Study in Czechia (DZS).'
      }
    },
    {
      '@type': 'Question',
      name: 'Are Czech university programmes free for international students?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Czech-taught programmes at public universities are tuition-free for all students regardless of nationality. English-taught programmes charge tuition fees, typically ranging from CZK 50,000 to CZK 350,000 per year (approximately €2,000–€14,000). Source: Study in Czechia (DZS).'
      }
    },
    {
      '@type': 'Question',
      name: 'How do IB students apply to Czech universities?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Czech Republic uses a decentralized system — each university manages its own admissions. You apply directly to each faculty through their online application system. Application deadlines are typically between February and April. You may apply to multiple universities and faculties simultaneously. Source: Study in Czechia — How to Apply.'
      }
    },
    {
      '@type': 'Question',
      name: 'What language do I need to study in the Czech Republic?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Czech-taught programmes require Czech language proficiency (typically B2 level, certified via the Czech Language Certificate Exam). Many universities also offer English-taught programmes. IB English A or B courses are generally accepted as proof of English proficiency. One-year Czech language preparatory courses are available at many universities. Source: Study in Czechia — How to Apply.'
      }
    }
  ]
}

export default function StudyInCzechRepublicPage() {
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
        <CzechRepublicContent />
      </main>
      <StudentFooter />
    </>
  )
}
