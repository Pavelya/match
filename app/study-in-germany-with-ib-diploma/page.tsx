/**
 * Study in Germany with IB Diploma - SEO Landing Page
 *
 * High-authority content page targeting IB students interested in studying in Germany.
 * Provides comprehensive information about Anabin recognition, uni-assist, and admission requirements.
 */

import type { Metadata } from 'next'
import { GermanyContent } from './GermanyContent'
import { StudentFooter } from '@/components/layout/StudentFooter'
import { pageDates } from '@/lib/page-dates'

// Static generation - page is pre-rendered at build time
// Revalidate every week since content doesn't change frequently
export const dynamic = 'force-static'
export const revalidate = 604800 // 7 days in seconds

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ibmatch.com'

export const metadata: Metadata = {
  title: 'Study in Germany with IB Diploma | Official Anabin & uni-assist Guide (2027)',
  description:
    'Official guide for IB students studying in Germany. IB recognition via Anabin, uni-assist applications, subject rules, and language requirements.',
  keywords: [
    'study in germany with ib diploma',
    'ib diploma germany university admission',
    'anabin ib diploma recognition',
    'uni-assist ib application',
    'ib germany subject requirements',
    'ib diploma hochschulzugang',
    'ib diploma germany 2027',
    'studienkolleg ib students'
  ],
  openGraph: {
    title: 'Study in Germany with IB Diploma | Official Anabin & uni-assist Guide (2027)',
    description:
      'Complete guide for IB Diploma students on university admission in Germany. Anabin recognition, uni-assist process, and subject requirements explained.',
    type: 'website',
    url: `${baseUrl}/study-in-germany-with-ib-diploma`,
    siteName: 'IB Match'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Study in Germany with IB Diploma | Anabin & uni-assist Guide 2027',
    description:
      'Official guide for IB students: Anabin recognition, uni-assist applications, and German university admission requirements.'
  },
  alternates: {
    canonical: `${baseUrl}/study-in-germany-with-ib-diploma`
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
  name: 'Study in Germany with the IB Diploma',
  description:
    'Authoritative guide for IB Diploma students on university admission in Germany, including Anabin recognition and uni-assist applications.',
  url: `${baseUrl}/study-in-germany-with-ib-diploma`,
  isPartOf: {
    '@type': 'WebSite',
    name: 'IB Match',
    url: baseUrl
  },
  about: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'International Baccalaureate Diploma',
    description: 'University admission requirements for IB Diploma holders in Germany'
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
  headline: 'Study in Germany with the IB Diploma: Official Anabin & uni-assist Guide',
  description:
    'Comprehensive guide explaining how the IB Diploma is recognized in Germany, Anabin database, uni-assist applications, and subject requirements.',
  url: `${baseUrl}/study-in-germany-with-ib-diploma`,
  ...pageDates('/study-in-germany-with-ib-diploma'),
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
  mainEntityOfPage: `${baseUrl}/study-in-germany-with-ib-diploma`,
  about: [
    {
      '@type': 'Thing',
      name: 'Anabin',
      description: 'German database for recognition of foreign qualifications'
    },
    {
      '@type': 'Thing',
      name: 'uni-assist',
      description: 'German application processing service for international students'
    },
    {
      '@type': 'Thing',
      name: 'International Baccalaureate Diploma',
      description: 'International secondary school qualification'
    },
    {
      '@type': 'Country',
      name: 'Germany'
    }
  ]
}

// HowTo schema for Anabin + uni-assist workflow
const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Apply to German Universities with an IB Diploma',
  description:
    'Step-by-step guide for IB students applying to universities in Germany through uni-assist.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Research programs',
      text: 'From autumn 2026, research programs and check that your IB subjects meet the KMK conditions for recognising the IB Diploma.'
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Prepare documents',
      text: 'Gather IB Diploma, transcripts, passport, and language certificates.'
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Apply through uni-assist',
      text: 'Apply through hochschulstart, uni-assist or the university, as the program requires. Many universities close winter-semester applications on 15 July; some set 15 January as the only date for international applicants.'
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Receive VPD',
      text: 'uni-assist issues a VPD (Vorprüfungsdokumentation) with grade conversion.'
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Enrollment',
      text: 'Complete enrollment after receiving an offer. In 2026 hochschulstart sent offers from 16 July to 20 August and filled remaining places until 30 September.'
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
      name: 'Is uni-assist mandatory for IB students in Germany?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Only universities that use uni-assist require it. Source: uni-assist.'
      }
    },
    {
      '@type': 'Question',
      name: 'Do IB students need Studienkolleg?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "No, if your IB Diploma meets the KMK's subject and grade conditions. If it does not, you must pass an additional examination (the Feststellungsprüfung, for which a Studienkolleg prepares you). Source: KMK — Access to higher education."
      }
    },
    {
      '@type': 'Question',
      name: 'Can IB students study Medicine in Germany?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, but places are highly competitive. EU and EEA citizens apply for Medicine, Dentistry, Veterinary Medicine and Pharmacy through hochschulstart, like German applicants. Other international applicants apply to the university directly or through uni-assist. Source: hochschulstart — International applicants (in German).'
      }
    },
    {
      '@type': 'Question',
      name: 'Is German mandatory for all programs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. English-taught programs exist, but language proof is required. International applicants must show German proficiency at enrolment for German-taught programs. Source: hochschulstart — International applicants (in German).'
      }
    }
  ]
}

export default function StudyInGermanyPage() {
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
      {/* HowTo schema for application workflow */}
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
        <GermanyContent />
      </main>
      <StudentFooter />
    </>
  )
}
