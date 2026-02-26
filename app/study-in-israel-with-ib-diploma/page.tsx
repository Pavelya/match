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

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ibmatch.com'

export const dynamic = 'force-static'
export const revalidate = 604800 // 7 days

export const metadata: Metadata = {
  title: 'Study in Israel with IB Diploma | Guide (2026)',
  description:
    'Official guide for IB students applying to Israeli universities. Recognition, Psychometric Test (PET), Hebrew requirements, and application process (2026).',
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
    title: 'Study in Israel with IB Diploma | Guide (2026)',
    description:
      'Complete guide for IB Diploma students on university admission in Israel. Bagrut equivalence, Psychometric Test, Hebrew proficiency, and direct application.',
    type: 'website',
    url: `${baseUrl}/study-in-israel-with-ib-diploma`,
    siteName: 'IB Match'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Study in Israel with IB Diploma | Guide 2026',
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
        text: "Yes. Israeli universities accept the IB Diploma as equivalent to the Israeli Bagrut (matriculation certificate) for admission purposes. All major research universities — including Tel Aviv University, Hebrew University of Jerusalem, Technion, Ben-Gurion University, and Bar-Ilan University — accept IB Diploma holders. The Israeli Ministry of Education's evaluation unit can also issue a formal equivalence statement. Source: Study Israel — CHE Portal."
      }
    },
    {
      '@type': 'Question',
      name: 'Do IB students need to take the Psychometric Entrance Test (PET)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In most cases, yes. The Psychometric Entrance Test (PET), administered by the National Institute for Testing and Evaluation (NITE), is required by most Israeli universities alongside secondary school results. The PET assesses verbal reasoning, quantitative reasoning, and English proficiency. Scores range from 200 to 800. Some universities accept SAT or ACT scores as alternatives to the PET, except for medical school programs. Source: NITE — The Psychometric Test.'
      }
    },
    {
      '@type': 'Question',
      name: 'Do I need to speak Hebrew to study in Israel?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It depends on the programme. Most undergraduate programmes at Israeli universities are taught in Hebrew, requiring advanced Hebrew proficiency demonstrated through the YAEL test or equivalent. However, Israel offers a growing number of English-taught programmes at both undergraduate and graduate levels. IB English A or English B courses may satisfy English proficiency requirements at some institutions. Preparatory Hebrew language programmes (Ulpan) are widely available. Source: Study Israel — CHE Portal.'
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
        text: 'Required documents typically include: IB Diploma and transcript of results, Psychometric Entrance Test (PET) scores (or SAT/ACT), proof of identity (passport), proof of language proficiency (Hebrew and/or English depending on programme), and any programme-specific supplementary documents. International students also need an A/2 Student Visa and proof of financial means. Source: Study Israel — CHE Portal.'
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
