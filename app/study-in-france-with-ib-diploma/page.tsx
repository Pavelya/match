/**
 * Study in France with IB Diploma - SEO Landing Page
 *
 * This page provides comprehensive information for IB Diploma students
 * seeking university admission in France. Content is based on
 * official French government and educational institution sources.
 *
 * Official sources used:
 * - eduscol.education.gouv.fr (Ministry of Education — status of the IB)
 * - service-public.gouv.fr (recognition of foreign diplomas, ENIC-NARIC comparability)
 * - campusfrance.org (Campus France — application routes, DAP, tuition fees)
 * - polytechnique.edu, sciencespo.fr (examples of IB-accepting institutions)
 */
import { Metadata } from 'next'
import { FranceContent } from './FranceContent'
import { StudentFooter } from '@/components/layout/StudentFooter'
import { pageDates } from '@/lib/page-dates'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ibmatch.com'

export const dynamic = 'force-static'
export const revalidate = 604800 // 7 days

export const metadata: Metadata = {
  title: 'Study in France with IB Diploma | Guide (2027)',
  description:
    "Official guide for IB students applying to French universities: IB recognition, Parcoursup and the DAP, English-taught bachelor's, and fees (2027).",
  keywords: [
    'study in france with ib diploma',
    'ib diploma france university admission',
    'france ib recognition',
    'english taught bachelor france ib',
    'parcoursup ib diploma',
    'ib students france requirements',
    'grandes ecoles ib diploma',
    'french university fees international students'
  ],
  openGraph: {
    title: 'Study in France with IB Diploma | Guide (2027)',
    description:
      "Complete guide for IB Diploma students on university admission in France: how the IB is recognized, Parcoursup, the DAP and schools' own applications, English-taught bachelor's, and tuition fees.",
    type: 'website',
    url: `${baseUrl}/study-in-france-with-ib-diploma`,
    siteName: 'IB Match'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Study in France with IB Diploma | Guide 2027',
    description:
      "Official guide for IB students: French university admission, Parcoursup and the DAP, English-taught bachelor's, and fees."
  },
  alternates: {
    canonical: `${baseUrl}/study-in-france-with-ib-diploma`
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
  name: 'Study in France with the IB Diploma',
  description:
    "Authoritative guide for IB Diploma students on university admission in France, including how the IB is recognized, Parcoursup, the preliminary admission request (DAP), English-taught bachelor's, and tuition fees.",
  url: `${baseUrl}/study-in-france-with-ib-diploma`,
  isPartOf: {
    '@type': 'WebSite',
    name: 'IB Match',
    url: baseUrl
  },
  about: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'International Baccalaureate Diploma',
    description: 'University admission requirements for IB Diploma holders in France'
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
  headline: 'Study in France with the IB Diploma: Official Guide',
  description:
    "Comprehensive guide explaining how the IB Diploma is treated in France, the routes into a first-year bachelor's (schools' own applications, Parcoursup and the DAP), English-taught programmes, and tuition fees.",
  url: `${baseUrl}/study-in-france-with-ib-diploma`,
  ...pageDates('/study-in-france-with-ib-diploma'),
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
  mainEntityOfPage: `${baseUrl}/study-in-france-with-ib-diploma`,
  about: [
    {
      '@type': 'Thing',
      name: 'University Admissions in France',
      description:
        'Admission by each institution, through its own application, Parcoursup, or the preliminary admission request (DAP) for students from outside the EU'
    },
    {
      '@type': 'Thing',
      name: 'Campus France',
      description:
        'French government agency for the promotion of higher education and international students'
    },
    {
      '@type': 'Thing',
      name: 'International Baccalaureate Diploma',
      description: 'International secondary school qualification'
    },
    {
      '@type': 'Country',
      name: 'France'
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
      name: 'Is the IB Diploma recognized for university admission in France?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, as a foreign secondary school diploma, but not automatically. The French Ministry of Education describes the IB as a private diploma awarded by the International Baccalaureate Organization that does not give an automatic right of entry to French universities: each institution examines the application. There is no legal equivalence between foreign diplomas and the French baccalauréat. Source: Ministry of Education (Eduscol) — FAQ on the French International Baccalaureate (PDF, in French).'
      }
    },
    {
      '@type': 'Question',
      name: "Can I study for a bachelor's degree in English in France?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes, but mostly outside the public universities. Their three-year licences are taught in French. English-taught bachelor's that IB students can enter in the first year are offered by selective schools such as École polytechnique, Sciences Po, Université PSL and the Écoles Centrales, by Toulouse School of Management at Université Toulouse Capitole, and by private business schools. Campus France lists programmes taught in English. Source: Campus France — Programmes taught in English."
      }
    },
    {
      '@type': 'Question',
      name: 'Do IB students apply through Parcoursup?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "It depends on the programme and your nationality. Parcoursup handles first-year programmes for EU students and for selective programmes. Students from outside the EU who want a first-year licence at a university file a preliminary admission request (DAP) between October and December. Most English-taught bachelor's, including those at Polytechnique, Sciences Po and the business schools, take applications from IB students on their own websites. Source: Campus France — How to apply in an institute of higher education."
      }
    },
    {
      '@type': 'Question',
      name: 'Do I need to speak French to study in France with the IB?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Not for English-taught programmes, which ask for English instead, usually at B2 or C1. For a French-taught licence at a public university through the DAP, applicants need French at B2, shown by the DELF or DALF or by the TCF, which must be taken before mid-February. Source: Campus France — First year French university admission procedures.'
      }
    },
    {
      '@type': 'Question',
      name: 'How much does a bachelor’s degree cost in France?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "At public universities, a bachelor's costs €178 a year for EU, EEA and Swiss students and €2,902 for other students in 2026-2027. Schools that run their own bachelor's, public grandes écoles and private business schools alike, charge more: Campus France gives about €6,000 to €18,000 or more a year for private schools. Source: Campus France — Tuition fees in France."
      }
    }
  ]
}

export default function StudyInFrancePage() {
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
        <FranceContent />
      </main>
      <StudentFooter />
    </>
  )
}
