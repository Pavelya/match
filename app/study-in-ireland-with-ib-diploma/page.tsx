/**
 * Study in Ireland with IB Diploma - SEO Landing Page
 *
 * This page provides comprehensive information for IB Diploma students
 * seeking university admission in Ireland. Content is based on
 * official Irish government and educational institution sources.
 *
 * Official sources used:
 * - cao.ie (Central Applications Office — centralized application system)
 * - educationinireland.com (official government portal for international students)
 * - hea.ie (Higher Education Authority)
 */
import { Metadata } from 'next'
import { IrelandContent } from './IrelandContent'
import { StudentFooter } from '@/components/layout/StudentFooter'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ibmatch.com'

export const dynamic = 'force-static'
export const revalidate = 604800 // 7 days

export const metadata: Metadata = {
  title: 'Study in Ireland with IB Diploma | Guide (2026)',
  description:
    'Official guide for IB students applying to Irish universities. CAO points conversion, bonus points, HPAT, and application process (2026).',
  keywords: [
    'study in ireland with ib diploma',
    'ib diploma ireland university admission',
    'ireland ib recognition',
    'ib points irish universities',
    'cao ib points conversion',
    'ib students ireland requirements',
    'ireland ib diploma cao',
    'ireland ib grade conversion'
  ],
  openGraph: {
    title: 'Study in Ireland with IB Diploma | Guide (2026)',
    description:
      'Complete guide for IB Diploma students on university admission in Ireland. CAO points conversion, bonus points for HL Maths, and centralized application process.',
    type: 'website',
    url: `${baseUrl}/study-in-ireland-with-ib-diploma`,
    siteName: 'IB Match'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Study in Ireland with IB Diploma | Guide 2026',
    description:
      'Official guide for IB students: Irish university admission, CAO points conversion, HPAT, and application process.'
  },
  alternates: {
    canonical: `${baseUrl}/study-in-ireland-with-ib-diploma`
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
  name: 'Study in Ireland with the IB Diploma',
  description:
    'Authoritative guide for IB Diploma students on university admission in Ireland, including CAO points conversion, bonus points, and centralized application process.',
  url: `${baseUrl}/study-in-ireland-with-ib-diploma`,
  isPartOf: {
    '@type': 'WebSite',
    name: 'IB Match',
    url: baseUrl
  },
  about: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'International Baccalaureate Diploma',
    description: 'University admission requirements for IB Diploma holders in Ireland'
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
  headline: 'Study in Ireland with the IB Diploma: Official Guide',
  description:
    'Comprehensive guide explaining how the IB Diploma is recognized in Ireland, CAO points conversion, bonus points for Higher Level Mathematics, and centralized application process.',
  url: `${baseUrl}/study-in-ireland-with-ib-diploma`,
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
  mainEntityOfPage: `${baseUrl}/study-in-ireland-with-ib-diploma`,
  about: [
    {
      '@type': 'Thing',
      name: 'University Admissions in Ireland',
      description: 'Centralized admission system managed via the Central Applications Office (CAO)'
    },
    {
      '@type': 'Thing',
      name: 'International Baccalaureate Diploma',
      description: 'International secondary school qualification'
    },
    {
      '@type': 'Country',
      name: 'Ireland'
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
      name: 'Is the IB Diploma recognized for university admission in Ireland?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The IB Diploma is accepted as equivalent to the Irish Leaving Certificate for admission to Level 6, 7, and 8 courses (Higher Certificates, Ordinary Degrees, and Honours Degrees). IB scores are converted to CAO points using an official conversion table. Source: CAO — Entry Requirements for EU/EFTA/UK Applicants.'
      }
    },
    {
      '@type': 'Question',
      name: 'How are IB scores converted to CAO points?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'IB scores are converted to the Irish Points Scale (IPS) using an official conversion table published in the CAO Entry Requirements document. The conversion is based on statistical alignment of IB and Leaving Certificate results. Additionally, 25 bonus points are awarded for IB Higher Level Mathematics at grade 4 or above. Source: CAO — Entry Requirements for EU/EFTA/UK Applicants.'
      }
    },
    {
      '@type': 'Question',
      name: 'How do IB students apply to Irish universities?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'EU, EFTA, and UK applicants apply through the Central Applications Office (CAO) at cao.ie. The normal application deadline is February 1 at 5:15 PM GMT, with late applications accepted until May 1. You can list up to 10 Level 8 (Honours Degree) and 10 Level 7/6 courses. Non-EU/EEA applicants should generally apply directly to the institution. Source: CAO — Important Dates.'
      }
    },
    {
      '@type': 'Question',
      name: 'Do IB students need to take entrance exams in Ireland?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most Irish university programmes do not require entrance exams. However, undergraduate Medicine requires the HPAT-Ireland aptitude test in addition to meeting minimum academic requirements. Some creative arts programmes may require a portfolio or audition. Source: CAO — Entry to Medicine.'
      }
    },
    {
      '@type': 'Question',
      name: 'Is higher education in Ireland free for IB students?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It depends on your nationality. EU/EEA/Swiss/UK students who meet residency requirements are eligible for the Free Fees Initiative — they pay only the student contribution charge of €2,500 per year. Non-EU/EEA students pay full tuition fees, which typically range from €9,900 to €34,000 per year depending on the institution and programme. Source: HEA — Student Finance.'
      }
    }
  ]
}

export default function StudyInIrelandPage() {
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
        <IrelandContent />
      </main>
      <StudentFooter />
    </>
  )
}
