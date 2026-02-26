/**
 * Study in Poland with IB Diploma - SEO Landing Page
 *
 * This page provides comprehensive information for IB Diploma students
 * seeking university admission in Poland. Content is based on
 * official Polish government and educational institution sources.
 *
 * Official sources used:
 * - nawa.gov.pl (National Agency for Academic Exchange — ENIC-NARIC centre)
 * - study.gov.pl (official government portal for international students)
 */
import { Metadata } from 'next'
import { PolandContent } from './PolandContent'
import { StudentFooter } from '@/components/layout/StudentFooter'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ibmatch.com'

export const dynamic = 'force-static'
export const revalidate = 604800 // 7 days

export const metadata: Metadata = {
  title: 'Study in Poland with IB Diploma | Guide (2026)',
  description:
    'Official guide for IB students applying to Polish universities. Automatic recognition, grade conversion, admission process, and language requirements (2026).',
  keywords: [
    'study in poland with ib diploma',
    'ib diploma poland university admission',
    'poland ib recognition',
    'ib diploma polish university requirements',
    'polish university entrance ib diploma',
    'ib students poland admission',
    'nawa ib diploma recognition',
    'poland ib grade conversion'
  ],
  openGraph: {
    title: 'Study in Poland with IB Diploma | Guide (2026)',
    description:
      'Complete guide for IB Diploma students on university admission in Poland. Automatic recognition by law, university-specific grade conversion, and decentralized application process.',
    type: 'website',
    url: `${baseUrl}/study-in-poland-with-ib-diploma`,
    siteName: 'IB Match'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Study in Poland with IB Diploma | Guide 2026',
    description:
      'Official guide for IB students: Polish university admission, recognition by law, grade conversion, and direct application.'
  },
  alternates: {
    canonical: `${baseUrl}/study-in-poland-with-ib-diploma`
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
  name: 'Study in Poland with the IB Diploma',
  description:
    'Authoritative guide for IB Diploma students on university admission in Poland, including automatic recognition by law, grade conversion, and decentralized application.',
  url: `${baseUrl}/study-in-poland-with-ib-diploma`,
  isPartOf: {
    '@type': 'WebSite',
    name: 'IB Match',
    url: baseUrl
  },
  about: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'International Baccalaureate Diploma',
    description: 'University admission requirements for IB Diploma holders in Poland'
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
  headline: 'Study in Poland with the IB Diploma: Official Guide',
  description:
    'Comprehensive guide explaining how the IB Diploma is recognized in Poland by operation of law, university-specific grade conversion, and decentralized application process.',
  url: `${baseUrl}/study-in-poland-with-ib-diploma`,
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
  mainEntityOfPage: `${baseUrl}/study-in-poland-with-ib-diploma`,
  about: [
    {
      '@type': 'Thing',
      name: 'University Admissions in Poland',
      description: 'Decentralized admission system with direct applications to universities'
    },
    {
      '@type': 'Thing',
      name: 'NAWA — National Agency for Academic Exchange',
      description: 'Polish ENIC-NARIC centre responsible for recognition of foreign qualifications'
    },
    {
      '@type': 'Thing',
      name: 'International Baccalaureate Diploma',
      description: 'International secondary school qualification'
    },
    {
      '@type': 'Country',
      name: 'Poland'
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
      name: 'Is the IB Diploma recognized for university admission in Poland?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The IB Diploma issued by the International Baccalaureate Organisation in Geneva is recognized by operation of law in Poland. It is treated as equivalent to the Polish Matura, and holders can apply directly to Polish universities without nostrification or any additional recognition procedure. Source: NAWA — Recognition for Academic Purposes.'
      }
    },
    {
      '@type': 'Question',
      name: 'How are IB grades converted for Polish university admission?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'There is no single national conversion formula. Each Polish university sets its own rules for converting IB grades (1–7 scale) to percentages or points equivalent to the Polish Matura. Higher Level (HL) subjects are typically treated as extended-level Matura and given higher weighting, while Standard Level (SL) subjects correspond to basic-level Matura. Always check the specific faculty admission requirements. Source: study.gov.pl — How to Apply.'
      }
    },
    {
      '@type': 'Question',
      name: 'How do IB students apply to Polish universities?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Poland uses a decentralized admission system. You apply directly to each university through its own online recruitment portal. There is no central national application platform. Each institution sets its own deadlines, required documents, and admission criteria. Start by selecting a programme on the university's website and follow its recruitment instructions. Source: study.gov.pl — How to Apply."
      }
    },
    {
      '@type': 'Question',
      name: 'Do I need to speak Polish to study in Poland?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Not necessarily. Polish universities offer over 900 programmes taught in English. For English-taught programmes, you typically need to demonstrate at least B2 English proficiency (e.g., IELTS 5.5–6.5, depending on the university). For Polish-taught programmes, you must prove Polish language proficiency at minimum B2 level, usually through a certificate or the university's own language exam. Source: study.gov.pl — How to Apply."
      }
    },
    {
      '@type': 'Question',
      name: 'Is higher education in Poland free for IB students?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Full-time studies in Polish at public universities are free for Polish citizens, EU/EEA citizens, and holders of the Karta Polaka (Polish Charter). All other international students pay tuition fees, which average EUR 2,000–3,000 per year for undergraduate programmes. Scholarships are available through NAWA and individual universities. Source: study.gov.pl — Tuition Fees.'
      }
    }
  ]
}

export default function StudyInPolandPage() {
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
        <PolandContent />
      </main>
      <StudentFooter />
    </>
  )
}
