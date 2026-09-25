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
import { pageDates } from '@/lib/page-dates'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ibmatch.com'

export const dynamic = 'force-static'
export const revalidate = 604800 // 7 days

export const metadata: Metadata = {
  title: 'Study in Poland with IB Diploma | Guide (2027)',
  description:
    'Official guide for IB students applying to Polish universities. Automatic recognition, grade conversion, admission process, and language requirements (2027).',
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
    title: 'Study in Poland with IB Diploma | Guide (2027)',
    description:
      'Complete guide for IB Diploma students on university admission in Poland. Automatic recognition by law, university-specific grade conversion, and decentralized application process.',
    type: 'website',
    url: `${baseUrl}/study-in-poland-with-ib-diploma`,
    siteName: 'IB Match'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Study in Poland with IB Diploma | Guide 2027',
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
  ...pageDates('/study-in-poland-with-ib-diploma'),
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
        text: 'Yes. IB certificates are recognised automatically for applying to first-cycle and long-cycle studies in Poland, so you do not need an individual recognition statement from NAWA. Each university still sets its own admission requirements. Source: NAWA — Applying for admission to first/long-cycle studies.'
      }
    },
    {
      '@type': 'Question',
      name: 'How are IB grades converted for Polish university admission?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'There is no single national formula; each university sets its own. The University of Warsaw, for example, converts each IB grade to a percentage: 7 = 100%, 6 = 90%, 5 = 75%, 4 = 60%, 3 = 45%, 2 = 30%. Always check the admission rules for your programme. Source: University of Warsaw — Candidates with IB and EB diplomas.'
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
        text: 'Not necessarily; many programmes are taught in English. Since July 2025, candidates who are not citizens of the EU, EFTA, Switzerland or the UK must prove at least B2 in the language their programme is taught in, whether Polish or English. Source: Ministry of Science and Higher Education — Notice on the act of 4 April 2025 (in Polish).'
      }
    },
    {
      '@type': 'Question',
      name: 'Is higher education in Poland free for IB students?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Full-time studies in Polish at public universities are free for Polish citizens and for foreigners who study on the same terms, including EU/EEA citizens and holders of the Karta Polaka (Polish Charter). Other international students pay fees, on average EUR 2,000 a year for first-cycle and long-cycle studies; fees range from EUR 2,000 to 6,000 a year depending on the institution and programme. Source: study.gov.pl — Tuition Fees.'
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
