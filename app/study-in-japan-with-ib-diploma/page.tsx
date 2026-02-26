/**
 * Study in Japan with IB Diploma - SEO Landing Page
 *
 * This page provides comprehensive information for IB Diploma students
 * seeking university admission in Japan. Content is based on
 * official Japanese government and educational institution sources.
 *
 * Official sources used:
 * - studyinjapan.go.jp (JASSO — official government portal for international students)
 * - jasso.go.jp (Japan Student Services Organization — EJU administration)
 * - mext.go.jp (Ministry of Education, Culture, Sports, Science and Technology)
 * - waseda.jp (Waseda University — example of IB-accepting institution)
 */
import { Metadata } from 'next'
import { JapanContent } from './JapanContent'
import { StudentFooter } from '@/components/layout/StudentFooter'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ibmatch.com'

export const dynamic = 'force-static'
export const revalidate = 604800 // 7 days

export const metadata: Metadata = {
  title: 'Study in Japan with IB Diploma | Guide (2026)',
  description:
    'Official guide for IB students applying to Japanese universities. MEXT recognition, EJU exam, English-taught programs, and application process (2026).',
  keywords: [
    'study in japan with ib diploma',
    'ib diploma japan university admission',
    'japan ib recognition',
    'ib points japanese universities',
    'japanese university entrance ib diploma',
    'ib students japan requirements',
    'eju exam ib students japan',
    'english taught programs japan ib'
  ],
  openGraph: {
    title: 'Study in Japan with IB Diploma | Guide (2026)',
    description:
      'Complete guide for IB Diploma students on university admission in Japan. MEXT recognition, EJU exam, English-taught programs, and decentralized application process.',
    type: 'website',
    url: `${baseUrl}/study-in-japan-with-ib-diploma`,
    siteName: 'IB Match'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Study in Japan with IB Diploma | Guide 2026',
    description:
      'Official guide for IB students: Japanese university admission, EJU exam, English-taught programs, and MEXT recognition.'
  },
  alternates: {
    canonical: `${baseUrl}/study-in-japan-with-ib-diploma`
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
  name: 'Study in Japan with the IB Diploma',
  description:
    'Authoritative guide for IB Diploma students on university admission in Japan, including MEXT recognition, EJU examination, English-taught programs, and decentralized application process.',
  url: `${baseUrl}/study-in-japan-with-ib-diploma`,
  isPartOf: {
    '@type': 'WebSite',
    name: 'IB Match',
    url: baseUrl
  },
  about: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'International Baccalaureate Diploma',
    description: 'University admission requirements for IB Diploma holders in Japan'
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
  headline: 'Study in Japan with the IB Diploma: Official Guide',
  description:
    'Comprehensive guide explaining how the IB Diploma is recognized in Japan, the EJU examination, English-taught degree programs, and decentralized university admission process.',
  url: `${baseUrl}/study-in-japan-with-ib-diploma`,
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
  mainEntityOfPage: `${baseUrl}/study-in-japan-with-ib-diploma`,
  about: [
    {
      '@type': 'Thing',
      name: 'University Admissions in Japan',
      description:
        'Decentralized admission system managed by individual universities, with MEXT oversight'
    },
    {
      '@type': 'Thing',
      name: 'International Baccalaureate Diploma',
      description: 'International secondary school qualification'
    },
    {
      '@type': 'Country',
      name: 'Japan'
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
      name: 'Is the IB Diploma recognized for university admission in Japan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The Japanese Ministry of Education (MEXT) has recognized the IB Diploma as a valid university admission qualification since 1979. IB Diploma holders are explicitly listed as eligible applicants alongside holders of the Abitur, Baccalauréat, and GCE A-Levels. Source: Study in Japan — Universities (Undergraduate).'
      }
    },
    {
      '@type': 'Question',
      name: 'Do IB students need to take the EJU exam in Japan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It depends on the program. Many Japanese-taught programs require the Examination for Japanese University Admission (EJU), which assesses Japanese language skills and academic abilities. However, English-taught degree programs generally do not require the EJU and accept IB scores directly alongside English proficiency tests. Source: JASSO — EJU Overview.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can I study in Japan in English with an IB Diploma?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. A growing number of Japanese universities offer degree programs taught entirely in English. These programs typically accept IB scores directly and require English proficiency evidence (TOEFL or IELTS) rather than Japanese language ability. Source: Study in Japan — Degree Programs in English.'
      }
    },
    {
      '@type': 'Question',
      name: 'How do Japanese universities evaluate IB scores?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'There is no national IB-to-Japanese grade conversion. Each university determines independently how to assess IB Diploma results. Universities may consider total IB points, individual subject scores, the Extended Essay, and Theory of Knowledge as part of their holistic review. Source: Study in Japan — Universities (Undergraduate).'
      }
    },
    {
      '@type': 'Question',
      name: 'What documents do IB students need to apply to Japanese universities?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Typical requirements include: IB Diploma and transcript, passport or ID, proof of English or Japanese proficiency, a university-specific application form, a letter of recommendation, and a personal statement or essay. Requirements vary by institution. Source: Study in Japan — Universities (Undergraduate).'
      }
    }
  ]
}

export default function StudyInJapanPage() {
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
        <JapanContent />
      </main>
      <StudentFooter />
    </>
  )
}
