/**
 * Study in Israel with IB Diploma - SEO Landing Page
 *
 * This page provides comprehensive information for IB Diploma students
 * seeking university admission in Israel. Content is based on
 * official Israeli government and educational institution sources.
 *
 * Official sources used:
 * - studyisrael.org.il (Israeli Council for Higher Education official portal)
 * - che.org.il (Council for Higher Education of Israel)
 * - nite.org.il (National Institute for Testing and Evaluation — PET)
 */
import { Metadata } from 'next'
import { IsraelContent } from './IsraelContent'
import { StudentFooter } from '@/components/layout/StudentFooter'
import { pageDates } from '@/lib/page-dates'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ibmatch.com'

export const dynamic = 'force-static'
export const revalidate = 604800 // 7 days

export const metadata: Metadata = {
  title: 'Study in Israel with IB Diploma | Guide (2027)',
  description:
    'Official guide for IB students applying to Israeli universities. Recognition, Psychometric Test (PET), Hebrew requirements, and application process (2027).',
  keywords: [
    'study in israel with ib diploma',
    'ib diploma israel university admission',
    'israel ib recognition',
    'ib diploma bagrut equivalence',
    'israeli university entrance ib diploma',
    'psychometric test ib students israel',
    'israel ib grade requirements'
  ],
  openGraph: {
    title: 'Study in Israel with IB Diploma | Guide (2027)',
    description:
      'Complete guide for IB Diploma students on university admission in Israel. Bagrut equivalence, Psychometric Test, Hebrew proficiency, and direct application.',
    type: 'website',
    url: `${baseUrl}/study-in-israel-with-ib-diploma`,
    siteName: 'IB Match'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Study in Israel with IB Diploma | Guide 2027',
    description:
      'Official guide for IB students: Israeli university admission, Psychometric Test, Bagrut equivalence, and application process.'
  },
  alternates: {
    canonical: `${baseUrl}/study-in-israel-with-ib-diploma`
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
  name: 'Study in Israel with the IB Diploma',
  description:
    'Authoritative guide for IB Diploma students on university admission in Israel, including Bagrut equivalence, Psychometric Entrance Test, and direct application process.',
  url: `${baseUrl}/study-in-israel-with-ib-diploma`,
  isPartOf: {
    '@type': 'WebSite',
    name: 'IB Match',
    url: baseUrl
  },
  about: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'International Baccalaureate Diploma',
    description: 'University admission requirements for IB Diploma holders in Israel'
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
  headline: 'Study in Israel with the IB Diploma: Official Guide',
  description:
    'Comprehensive guide explaining how the IB Diploma is recognized in Israel, Psychometric Entrance Test requirements, Hebrew proficiency, and the decentralized application process.',
  url: `${baseUrl}/study-in-israel-with-ib-diploma`,
  ...pageDates('/study-in-israel-with-ib-diploma'),
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
  mainEntityOfPage: `${baseUrl}/study-in-israel-with-ib-diploma`,
  about: [
    {
      '@type': 'Thing',
      name: 'University Admissions in Israel',
      description: 'Decentralized admission system with direct applications to universities'
    },
    {
      '@type': 'Thing',
      name: 'International Baccalaureate Diploma',
      description: 'International secondary school qualification'
    },
    {
      '@type': 'Country',
      name: 'Israel'
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
      name: 'Is the IB Diploma recognized for university admission in Israel?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Israeli universities accept the IB Diploma for admission. Tel Aviv University, for example, lists the IB among the diplomas from abroad that are equivalent to the Israeli matriculation certificate (Bagrut) for registration. Source: Tel Aviv University — General Entrance Requirements.'
      }
    },
    {
      '@type': 'Question',
      name: 'Do IB students need to take the Psychometric Entrance Test (PET)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In most cases, yes. Most Israeli institutions admit candidates on a combination of their matriculation average and their score in the Psychometric Entrance Test (PET), administered by NITE. From the December 2026 sitting, the PET tests verbal and quantitative reasoning only, and English is tested separately by the AMIRNET test. Scores stay on the 200–800 scale, and the change applies to admissions for the 2027–28 academic year. Source: NITE — English domain to be separated from the PET.'
      }
    },
    {
      '@type': 'Question',
      name: 'Do I need to speak Hebrew to study in Israel?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "It depends on the programme. Programmes taught in Hebrew require Hebrew proficiency. Israeli institutions also offer Bachelor's and Master's programmes in English for international students, which ask for proof of English, for example TOEFL or IELTS results. Source: Study Israel — Planning."
      }
    },
    {
      '@type': 'Question',
      name: 'How do IB students apply to Israeli universities?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Israel uses a decentralized application system — students apply directly to each university. There is no centralized national application portal. Each institution sets its own deadlines, requirements, and admission criteria. Applications typically open in the autumn/winter for the following academic year, with deadlines varying by university and programme. Source: Study Israel — Planning.'
      }
    },
    {
      '@type': 'Question',
      name: 'What documents do IB students need for Israeli university admission?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Required documents typically include: IB Diploma and transcript of results, Psychometric Entrance Test (PET) scores (or SAT/ACT where accepted), proof of identity (passport), proof of language proficiency (Hebrew and/or English depending on programme), and any programme-specific supplementary documents. International students also need an A/2 Student Visa and proof of financial means. Source: Study Israel — Planning.'
      }
    }
  ]
}

export default function StudyInIsraelPage() {
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
        <IsraelContent />
      </main>
      <StudentFooter />
    </>
  )
}
