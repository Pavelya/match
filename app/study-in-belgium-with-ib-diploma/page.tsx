/**
 * Study in Belgium with IB Diploma - SEO Landing Page
 *
 * This page provides comprehensive information for IB Diploma students
 * seeking university admission in Belgium. Content is based on official
 * sources from the Flemish and French Communities.
 */

import { Metadata } from 'next'
import { StudentFooter } from '@/components/layout/StudentFooter'
import { BelgiumContent } from './BelgiumContent'
import { pageDates } from '@/lib/page-dates'

export const dynamic = 'force-static'
export const revalidate = 604800 // 7 days in seconds

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ibmatch.com'

export const metadata: Metadata = {
  title: 'Study in Belgium with IB Diploma | Official University Guide (2027)',
  description:
    'Official guide for IB students studying in Belgium. IB recognition in the Flemish and French Communities, entrance exams, and admission timelines (2027).',
  keywords: [
    'study in belgium with ib diploma',
    'ib diploma belgium university admission',
    'ib students belgium requirements',
    'ib diploma belgian universities',
    'ib admission belgium 2027',
    'belgium ib equivalence naric',
    'ib diploma flanders wallonia',
    'belgian universities ib students'
  ],
  openGraph: {
    title: 'Study in Belgium with IB Diploma | Official University Guide (2027)',
    description:
      'Complete guide for IB Diploma students on university admission in Belgium. Flemish and French Community recognition rules, 2027 entrance exam dates, and application timelines.',
    type: 'website',
    url: `${baseUrl}/study-in-belgium-with-ib-diploma`,
    siteName: 'IB Match'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Study in Belgium with IB Diploma | University Guide 2027',
    description:
      'Official guide for IB students: Belgian university admission, community-specific rules, and requirements.'
  },
  alternates: {
    canonical: `${baseUrl}/study-in-belgium-with-ib-diploma`
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
  name: 'Study in Belgium with the IB Diploma',
  description:
    'Authoritative guide for IB Diploma students on university admission in Belgium, including Flemish and French Community recognition rules and entrance exams.',
  url: `${baseUrl}/study-in-belgium-with-ib-diploma`,
  isPartOf: {
    '@type': 'WebSite',
    name: 'IB Match',
    url: baseUrl
  },
  about: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'International Baccalaureate Diploma',
    description: 'University admission requirements for IB Diploma holders in Belgium'
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
  headline: 'Study in Belgium with the IB Diploma: Official University Guide',
  description:
    'Comprehensive guide explaining how the IB Diploma is recognized in Belgium, community-specific recognition rules, entrance exams, and admission requirements.',
  url: `${baseUrl}/study-in-belgium-with-ib-diploma`,
  ...pageDates('/study-in-belgium-with-ib-diploma'),
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
  mainEntityOfPage: `${baseUrl}/study-in-belgium-with-ib-diploma`,
  about: [
    {
      '@type': 'Thing',
      name: 'NARIC-Vlaanderen',
      description: 'Flemish recognition authority for foreign diplomas'
    },
    {
      '@type': 'Thing',
      name: 'Fédération Wallonie-Bruxelles',
      description:
        'French Community of Belgium, whose equivalence service lists the IB among certificates that need no equivalence'
    },
    {
      '@type': 'Thing',
      name: 'International Baccalaureate Diploma',
      description: 'International secondary school qualification'
    },
    {
      '@type': 'Country',
      name: 'Belgium'
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
      name: 'Is the IB Diploma recognized in Belgium?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Flanders automatically recognises the IB Diploma as equivalent to the Flemish certificate of secondary education. The French Community lists school-leaving certificates issued by the International Baccalaureate among those that need no equivalence for access to higher education, provided your school is authorised by the IB. Source: Flanders.be — Foreign diplomas automatically recognised in Flanders.'
      }
    },
    {
      '@type': 'Question',
      name: 'Do IB students need a Belgian secondary diploma?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. The IB Diploma is accepted as a standalone qualification. Recognition is automatic in the Flemish Community, and the French Community does not require an equivalence to the CESS for IB school-leaving certificates. Source: Wallonie-Bruxelles Campus — Equivalence of qualification.'
      }
    },
    {
      '@type': 'Question',
      name: 'Are entrance exams required in Belgium for IB students?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For most programs, no. Medicine and Dentistry require an entrance exam or competitive test in both communities, and so does Veterinary Medicine. In the Flemish Community the 2027 exams are on 2 July (Medicine), 3 July (Dentistry) and 4 July (Veterinary Medicine), with registration from 1 March to 17 May 2027. Civil Engineering requires a mathematics admission exam in the French Community. Source: Flanders.be — Entrance exams for medicine, dentistry and veterinary medicine.'
      }
    },
    {
      '@type': 'Question',
      name: 'What languages can IB students study in at Belgian universities?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Programs are offered in Dutch (Flemish Community), French (French Community), and some in English. Language proficiency is required in the language of instruction. Source: Study in Flanders.'
      }
    },
    {
      '@type': 'Question',
      name: 'Is there a national IB cut-off score for Belgium?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. There is no national minimum IB score. Each university sets its own admission criteria, though most require the full IB Diploma (minimum 24 points). Source: KU Leuven — Admission and application.'
      }
    }
  ]
}

export default function StudyInBelgiumPage() {
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
        <BelgiumContent />
      </main>
      <StudentFooter />
    </>
  )
}
