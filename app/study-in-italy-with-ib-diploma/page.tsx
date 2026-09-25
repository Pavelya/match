/**
 * Study in Italy with IB Diploma - SEO Landing Page
 *
 * High-authority content page targeting IB students interested in studying in Italy.
 * Provides comprehensive information about CIMEA verification, entrance exams, and admission requirements.
 */

import type { Metadata } from 'next'
import { ItalyContent } from './ItalyContent'
import { StudentFooter } from '@/components/layout/StudentFooter'
import { pageDates } from '@/lib/page-dates'

// Static generation - page is pre-rendered at build time
// Revalidate every week since content doesn't change frequently
export const dynamic = 'force-static'
export const revalidate = 604800 // 7 days in seconds

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ibmatch.com'

export const metadata: Metadata = {
  title: 'Study in Italy with IB Diploma | Official CIMEA Guide (2027)',
  description:
    'Official guide for IB students studying in Italy. IB recognition, CIMEA verification, admission rules, and language requirements.',
  keywords: [
    'study in italy with ib diploma',
    'ib diploma italy university admission',
    'cimea ib recognition',
    'ib diploma italy requirements',
    'ib students italy admission',
    'ib diploma italian universities',
    'ib diploma italy 2027',
    'cimea verification ib'
  ],
  openGraph: {
    title: 'Study in Italy with IB Diploma | Official CIMEA Guide (2027)',
    description:
      'Complete guide for IB Diploma students on university admission in Italy. CIMEA verification, entrance exams, and admission requirements explained.',
    type: 'website',
    url: `${baseUrl}/study-in-italy-with-ib-diploma`,
    siteName: 'IB Match'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Study in Italy with IB Diploma | CIMEA Guide 2027',
    description:
      'Official guide for IB students: CIMEA verification, entrance exams, and Italian university admission requirements.'
  },
  alternates: {
    canonical: `${baseUrl}/study-in-italy-with-ib-diploma`
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
  name: 'Study in Italy with the IB Diploma',
  description:
    'Authoritative guide for IB Diploma students on university admission in Italy, including CIMEA verification and entrance exam requirements.',
  url: `${baseUrl}/study-in-italy-with-ib-diploma`,
  isPartOf: {
    '@type': 'WebSite',
    name: 'IB Match',
    url: baseUrl
  },
  about: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'International Baccalaureate Diploma',
    description: 'University admission requirements for IB Diploma holders in Italy'
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
  headline: 'Study in Italy with the IB Diploma: Official CIMEA Guide',
  description:
    'Comprehensive guide explaining how the IB Diploma is recognized in Italy, CIMEA verification process, entrance exams, and admission requirements.',
  url: `${baseUrl}/study-in-italy-with-ib-diploma`,
  ...pageDates('/study-in-italy-with-ib-diploma'),
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
  mainEntityOfPage: `${baseUrl}/study-in-italy-with-ib-diploma`,
  about: [
    {
      '@type': 'Thing',
      name: 'CIMEA',
      description: 'Italian information center for academic recognition'
    },
    {
      '@type': 'Thing',
      name: 'International Baccalaureate Diploma',
      description: 'International secondary school qualification'
    },
    {
      '@type': 'Country',
      name: 'Italy'
    }
  ]
}

// HowTo schema for CIMEA verification steps
const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Apply to Italian Universities with an IB Diploma',
  description:
    'Step-by-step guide for IB students applying to universities in Italy, including CIMEA verification.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Check the Italian conditions',
      text: 'Make sure your IB Diploma has at least 24 points in six subjects, 12 of them at Higher Level, with TOK, the Extended Essay and CAS passed.'
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Get your CIMEA documents',
      text: "Download the Attestato di Corrispondenza for your IB Diploma from CIMEA's ARDI platform, and have CIMEA verify the Diploma."
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Apply to universities',
      text: 'Apply to each university by its own deadline. Non-EU applicants who need a visa pre-enrol through Universitaly.'
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Take entrance exams',
      text: "For restricted programs, register for the semestre aperto (Medicine, Dentistry and Veterinary Medicine taught in Italian), the IMAT (the same courses taught in English), or the university's admission test (Architecture, Primary Education Sciences)."
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Apply for a study visa',
      text: 'Non-EU students apply for a study visa by 31 October 2027 for courses starting in 2027–28.'
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
      name: 'Are predicted IB grades accepted in Italy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Universities assess applications themselves, so ask each one whether it accepts predicted grades. Access itself depends on the final IB Diploma: CIMEA verifies the Diploma only once it has been awarded and meets the Italian conditions. Source: MUR — Procedures for international students, Annex 1 (PDF, in Italian).'
      }
    },
    {
      '@type': 'Question',
      name: 'Can IB students study Medicine in Italy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Italian-taught Medicine, Dentistry and Veterinary Medicine now start with an open first semester (semestre aperto): you enrol, then pass national exams in Biology, Chemistry and biochemistry, and Physics to continue. English-taught programs use a national admission test (IMAT). Source: MUR — Registration opens for the semestre aperto 2026–27 (in Italian).'
      }
    },
    {
      '@type': 'Question',
      name: 'Is Italian mandatory for all programs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. For courses taught in Italian, each university tests your Italian at level B2 or higher, unless you are exempt, for example with a recognised B2 certificate. For courses taught in another language, you show a certificate in that language instead. Source: MUR — Procedures for international students (PDF, in Italian).'
      }
    },
    {
      '@type': 'Question',
      name: 'Is CIMEA mandatory for IB students?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes, in practice. For the IB Diploma, the MUR procedures tell universities to ask for the Attestato di Corrispondenza, which is free on CIMEA's ARDI platform, and CIMEA's verification, instead of a Dichiarazione di valore. Source: MUR — Procedures for international students, Annex 1 (PDF, in Italian)."
      }
    }
  ]
}

export default function StudyInItalyPage() {
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
      {/* HowTo schema for CIMEA workflow */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      {/* FAQPage schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main className="flex min-h-screen flex-col">
        <ItalyContent />
      </main>
      <StudentFooter />
    </>
  )
}
