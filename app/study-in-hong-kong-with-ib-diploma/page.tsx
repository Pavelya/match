/**
 * Study in Hong Kong with IB Diploma - SEO Landing Page
 *
 * This page provides comprehensive information for IB Diploma students
 * seeking university admission in Hong Kong SAR. Content is based on
 * official Hong Kong government and educational institution sources.
 *
 * Official sources used:
 * - studyinhongkong.edu.hk (official government portal for international students)
 * - admissions.hku.hk (University of Hong Kong admissions)
 * - join.hkust.edu.hk (HKUST admissions)
 * - ugc.edu.hk (University Grants Committee)
 */
import { Metadata } from 'next'
import { HongKongContent } from './HongKongContent'
import { StudentFooter } from '@/components/layout/StudentFooter'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ibmatch.com'

export const dynamic = 'force-static'
export const revalidate = 604800 // 7 days

export const metadata: Metadata = {
  title: 'Study in Hong Kong with IB Diploma | Guide (2026)',
  description:
    'Official guide for IB students applying to Hong Kong universities. Non-JUPAS admission, IB recognition, English requirements, and application process (2026).',
  keywords: [
    'study in hong kong with ib diploma',
    'ib diploma hong kong university admission',
    'hong kong ib recognition',
    'non-jupas ib diploma',
    'hong kong university entrance ib students',
    'ib students hong kong requirements',
    'hong kong ib score requirements',
    'hku hkust cuhk ib admission'
  ],
  openGraph: {
    title: 'Study in Hong Kong with IB Diploma | Guide (2026)',
    description:
      'Complete guide for IB Diploma students on university admission in Hong Kong. Non-JUPAS route, IB score requirements, and direct application process.',
    type: 'website',
    url: `${baseUrl}/study-in-hong-kong-with-ib-diploma`,
    siteName: 'IB Match'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Study in Hong Kong with IB Diploma | Guide 2026',
    description:
      'Official guide for IB students: Hong Kong university admission, Non-JUPAS route, score requirements, and application process.'
  },
  alternates: {
    canonical: `${baseUrl}/study-in-hong-kong-with-ib-diploma`
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
  name: 'Study in Hong Kong with the IB Diploma',
  description:
    'Authoritative guide for IB Diploma students on university admission in Hong Kong SAR, including Non-JUPAS application route, IB score requirements, and direct application process.',
  url: `${baseUrl}/study-in-hong-kong-with-ib-diploma`,
  isPartOf: {
    '@type': 'WebSite',
    name: 'IB Match',
    url: baseUrl
  },
  about: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'International Baccalaureate Diploma',
    description: 'University admission requirements for IB Diploma holders in Hong Kong SAR'
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
  headline: 'Study in Hong Kong with the IB Diploma: Official Guide',
  description:
    'Comprehensive guide explaining how the IB Diploma is recognized in Hong Kong SAR, Non-JUPAS application route, score requirements, and direct application process to UGC-funded and self-financing institutions.',
  url: `${baseUrl}/study-in-hong-kong-with-ib-diploma`,
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
  mainEntityOfPage: `${baseUrl}/study-in-hong-kong-with-ib-diploma`,
  about: [
    {
      '@type': 'Thing',
      name: 'University Admissions in Hong Kong',
      description: 'Decentralized admission system with Non-JUPAS route for IB students'
    },
    {
      '@type': 'Thing',
      name: 'International Baccalaureate Diploma',
      description: 'International secondary school qualification'
    },
    {
      '@type': 'AdministrativeArea',
      name: 'Hong Kong Special Administrative Region'
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
      name: 'Is the IB Diploma recognized for university admission in Hong Kong?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The IB Diploma is widely recognized by all eight UGC-funded universities and most self-financing institutions in Hong Kong SAR. IB students apply through the Non-JUPAS (direct admission) route. Each university sets its own minimum IB score requirements, which typically range from 24 to 30+ depending on the institution and programme. Source: Study in Hong Kong — Admission Requirement.'
      }
    },
    {
      '@type': 'Question',
      name: 'How do IB students apply to Hong Kong universities?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "IB students apply through the Non-JUPAS route, which means submitting applications directly to each university's online application system. JUPAS is reserved for local students with the Hong Kong Diploma of Secondary Education (HKDSE). There is no centralized platform — you must apply separately to each institution you are interested in. Source: Study in Hong Kong — How to Apply."
      }
    },
    {
      '@type': 'Question',
      name: 'What IB score do I need for Hong Kong universities?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'There is no single score requirement — it varies by university and programme. As a general guide: HKU and CUHK typically expect 30+ points for most programmes, with competitive programmes (Medicine, Dentistry) requiring 40+. HKUST generally requires 28+ points. Programme-specific subject requirements at Higher Level may also apply. Source: HKU Admissions — International Qualifications.'
      }
    },
    {
      '@type': 'Question',
      name: 'Do I need to speak Chinese to study in Hong Kong?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Not for most programmes. English is the primary medium of instruction at Hong Kong's UGC-funded universities, and many programmes are taught entirely in English. Some programmes — particularly in Chinese studies, education, or social work — may require Chinese language proficiency. English proficiency is typically demonstrated through IB English courses (Grade 4+ in English A or English B HL; Grade 5+ in English B SL). Source: HKU Admissions — International Qualifications."
      }
    },
    {
      '@type': 'Question',
      name: 'Are there tuition fees for international IB students in Hong Kong?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Non-local students at UGC-funded universities pay higher tuition fees than local students. Tuition fees for non-local undergraduate students are set by individual institutions. Many universities offer entrance scholarships for outstanding IB students, with some covering full tuition fees for students achieving IB scores of 40 or above. Source: Study in Hong Kong — Tuition Fee and Living Expenses.'
      }
    }
  ]
}

export default function StudyInHongKongPage() {
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
        <HongKongContent />
      </main>
      <StudentFooter />
    </>
  )
}
