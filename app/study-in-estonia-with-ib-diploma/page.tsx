/**
 * Study in Estonia with IB Diploma - SEO Landing Page
 *
 * This page provides comprehensive information for IB Diploma students
 * seeking university admission in Estonia. Content is based on
 * official Estonian government and educational institution sources.
 *
 * Official sources used:
 * - studyinestonia.ee (official government portal for international students)
 * - taltech.ee (Tallinn University of Technology admissions)
 * - tlu.ee (Tallinn University admissions)
 * - ut.ee (University of Tartu admissions)
 * - estonia.dreamapply.com (centralized online application platform)
 */
import { Metadata } from 'next'
import { EstoniaContent } from './EstoniaContent'
import { StudentFooter } from '@/components/layout/StudentFooter'
import { pageDates } from '@/lib/page-dates'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ibmatch.com'

export const dynamic = 'force-static'
export const revalidate = 604800 // 7 days

export const metadata: Metadata = {
  title: 'Study in Estonia with IB Diploma | Guide (2027)',
  description:
    'Official guide for IB students applying to Estonian universities. Recognition, admission via DreamApply, language requirements, and tuition fees (2027).',
  keywords: [
    'study in estonia with ib diploma',
    'ib diploma estonia university admission',
    'estonia ib recognition',
    'ib diploma estonian universities',
    'estonian university entrance ib diploma',
    'ib students estonia requirements',
    'dreamapply estonia ib diploma',
    'estonia ib grade requirements'
  ],
  openGraph: {
    title: 'Study in Estonia with IB Diploma | Guide (2027)',
    description:
      'Complete guide for IB Diploma students on university admission in Estonia. Recognition, decentralized admission via DreamApply, and language requirements.',
    type: 'website',
    url: `${baseUrl}/study-in-estonia-with-ib-diploma`,
    siteName: 'IB Match'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Study in Estonia with IB Diploma | Guide 2027',
    description:
      'Official guide for IB students: Estonian university admission, recognition, DreamApply application, and requirements.'
  },
  alternates: {
    canonical: `${baseUrl}/study-in-estonia-with-ib-diploma`
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
  name: 'Study in Estonia with the IB Diploma',
  description:
    'Authoritative guide for IB Diploma students on university admission in Estonia, including recognition, decentralized application process, and language requirements.',
  url: `${baseUrl}/study-in-estonia-with-ib-diploma`,
  isPartOf: {
    '@type': 'WebSite',
    name: 'IB Match',
    url: baseUrl
  },
  about: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'International Baccalaureate Diploma',
    description: 'University admission requirements for IB Diploma holders in Estonia'
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
  headline: 'Study in Estonia with the IB Diploma: Official Guide',
  description:
    'Comprehensive guide explaining how the IB Diploma is recognized in Estonia, the decentralized application process via DreamApply, and university-specific requirements.',
  url: `${baseUrl}/study-in-estonia-with-ib-diploma`,
  ...pageDates('/study-in-estonia-with-ib-diploma'),
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
  mainEntityOfPage: `${baseUrl}/study-in-estonia-with-ib-diploma`,
  about: [
    {
      '@type': 'Thing',
      name: 'University Admissions in Estonia',
      description: 'Decentralized admission system managed via DreamApply platform'
    },
    {
      '@type': 'Thing',
      name: 'International Baccalaureate Diploma',
      description: 'International secondary school qualification'
    },
    {
      '@type': 'Country',
      name: 'Estonia'
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
      name: 'Is the IB Diploma recognized for university admission in Estonia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. The University of Tartu accepts the IB Diploma for Bachelor's studies, as do Tallinn University and TalTech. Only a diploma stating 'IB Diploma Awarded' qualifies; 'IB DP Course awarded' or 'IB DP Course Results' will not suffice. Source: University of Tartu — Country-specific requirements."
      }
    },
    {
      '@type': 'Question',
      name: 'How do IB students apply to Estonian universities?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Estonia uses a decentralized admission system. Applications are submitted through the shared online platform estonia.dreamapply.com, where you can apply to multiple universities and programmes with a single account. Each university sets its own deadlines, requirements, and application fees (typically €0–120). Source: Study in Estonia — How to Apply.'
      }
    },
    {
      '@type': 'Question',
      name: 'What IB score do I need for Estonian universities?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It varies by university. Tallinn University, for example, requires at least 27 out of 45 points, six subjects (three at HL and three at SL), and at least a D in the Extended Essay and Theory of Knowledge. Always check the specific programme requirements. Source: Tallinn University — International Baccalaureate.'
      }
    },
    {
      '@type': 'Question',
      name: 'Do I need to speak Estonian to study in Estonia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Not necessarily. Estonian universities offer English-taught programmes, for which you present a certificate of English skills. The usual minimum for Bachelor's and Master's studies is 6 in IELTS or 72 in TOEFL iBT, and some institutions run their own tests. Estonian-taught programmes require Estonian. Source: Study in Estonia — General Requirements."
      }
    },
    {
      '@type': 'Question',
      name: 'Are there tuition fees for IB students in Estonia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tuition fees vary by university and programme, generally from €1,500 to €15,000 per year for Bachelor and Master programmes, with a few more expensive exceptions. Doctoral studies are tuition-free for all students. Some universities differentiate fees for EU and non-EU students. Source: Study in Estonia — Tuition Fees.'
      }
    }
  ]
}

export default function StudyInEstoniaPage() {
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
        <EstoniaContent />
      </main>
      <StudentFooter />
    </>
  )
}
