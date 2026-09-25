/**
 * Study in Portugal with IB Diploma - SEO Landing Page
 *
 * This page provides comprehensive information for IB Diploma students
 * seeking university admission in Portugal. Content is based on
 * official Portuguese government and educational institution sources.
 *
 * Official sources used:
 * - dge.mec.pt (Direção-Geral da Educação — equivalency of foreign qualifications)
 * - dges.gov.pt (Instituto para o Ensino Superior, formerly DGES — higher education access & NARIC centre)
 */
import { Metadata } from 'next'
import { PortugalContent } from './PortugalContent'
import { StudentFooter } from '@/components/layout/StudentFooter'
import { pageDates } from '@/lib/page-dates'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ibmatch.com'

export const dynamic = 'force-static'
export const revalidate = 604800 // 7 days

export const metadata: Metadata = {
  title: 'Study in Portugal with IB Diploma | Guide (2027)',
  description:
    'Official guide for IB students applying to Portuguese universities. DGE equivalency, Concurso Especial admission, entrance exams, and language requirements (2027).',
  keywords: [
    'study in portugal with ib diploma',
    'ib diploma portugal university admission',
    'portugal ib recognition',
    'ib diploma portuguese university requirements',
    'portugal concurso especial ib students',
    'ib students portugal admission',
    'dge equivalency ib diploma portugal',
    'portugal ib grade conversion'
  ],
  openGraph: {
    title: 'Study in Portugal with IB Diploma | Guide (2027)',
    description:
      'Complete guide for IB Diploma students on university admission in Portugal. DGE equivalency process, Concurso Especial for international students, and the binary higher education system.',
    type: 'website',
    url: `${baseUrl}/study-in-portugal-with-ib-diploma`,
    siteName: 'IB Match'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Study in Portugal with IB Diploma | Guide 2027',
    description:
      'Official guide for IB students: Portuguese university admission, DGE equivalency, entrance exams, and direct application.'
  },
  alternates: {
    canonical: `${baseUrl}/study-in-portugal-with-ib-diploma`
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
  name: 'Study in Portugal with the IB Diploma',
  description:
    'Authoritative guide for IB Diploma students on university admission in Portugal, including DGE equivalency, Concurso Especial admission, and the binary higher education system.',
  url: `${baseUrl}/study-in-portugal-with-ib-diploma`,
  isPartOf: {
    '@type': 'WebSite',
    name: 'IB Match',
    url: baseUrl
  },
  about: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'International Baccalaureate Diploma',
    description: 'University admission requirements for IB Diploma holders in Portugal'
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
  headline: 'Study in Portugal with the IB Diploma: Official Guide',
  description:
    'Comprehensive guide explaining how the IB Diploma is recognized in Portugal through DGE equivalency, Concurso Especial admission for international students, and the binary university/polytechnic system.',
  url: `${baseUrl}/study-in-portugal-with-ib-diploma`,
  ...pageDates('/study-in-portugal-with-ib-diploma'),
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
  mainEntityOfPage: `${baseUrl}/study-in-portugal-with-ib-diploma`,
  about: [
    {
      '@type': 'Thing',
      name: 'University Admissions in Portugal',
      description: 'Concurso Especial admission system for international students'
    },
    {
      '@type': 'Thing',
      name: 'Direção-Geral da Educação (DGE)',
      description:
        'Portuguese Directorate-General for Education responsible for equivalency of foreign qualifications'
    },
    {
      '@type': 'Thing',
      name: 'Direção-Geral do Ensino Superior (DGES)',
      description: 'Portuguese Directorate-General for Higher Education and ENIC-NARIC centre'
    },
    {
      '@type': 'Thing',
      name: 'International Baccalaureate Diploma',
      description: 'International secondary school qualification'
    },
    {
      '@type': 'Country',
      name: 'Portugal'
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
      name: 'Is the IB Diploma recognized for university admission in Portugal?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Under Decree-Law 227/2005, the IB Diploma can be made equivalent to Portuguese secondary education, which you need for the national competition. The equivalence is free, can be requested at any time, and the Directorate-General for Education (DGE) is responsible for IB qualifications. Source: DGE — FAQ: Equivalence of Foreign Qualifications.'
      }
    },
    {
      '@type': 'Question',
      name: 'How do international IB students apply to Portuguese universities?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Students without Portuguese or EU/EEA nationality usually apply through the special competition for international students (Decree-Law 36/2014). You apply to each institution directly, and each sets its own places, deadlines and selection criteria. A qualification that gives access to higher education in the country where it was issued is enough to apply. Source: DGES/IES — Special competition for international students (in Portuguese).'
      }
    },
    {
      '@type': 'Question',
      name: 'Do IB students need to take Portuguese entrance exams (Provas de Ingresso)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In the national competition, yes, but you can replace them with IB exams that the National Access Commission (CNAES) lists as equivalent, such as IB Biology SL or HL for Biology and Geology. You also need a certificate of equivalence of your IB Diploma. In the special competition for international students, each institution sets its own selection criteria. Source: DGES/IES — Students with foreign secondary education (in Portuguese).'
      }
    },
    {
      '@type': 'Question',
      name: 'What language proficiency is required to study in Portugal?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Each institution sets its own language requirements, as part of its autonomy over the conditions of entry to its programmes. Check the level and the certificates your programme accepts, for Portuguese-taught and English-taught programmes alike. Source: DGES/IES — Portuguese Higher Education System.'
      }
    },
    {
      '@type': 'Question',
      name: 'What is the difference between universities and polytechnics in Portugal?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Portugal operates a binary higher education system. Universities focus on research and academic knowledge, offering Licenciatura (Bachelor's, 3–4 years), Mestrado (Master's, 1.5–2 years), and Doutoramento (PhD). Polytechnics emphasize applied research and practical professional training, offering Licenciatura and Mestrado degrees. Both types accept IB Diploma holders. Source: DGES/IES — Portuguese Higher Education System."
      }
    }
  ]
}

export default function StudyInPortugalPage() {
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
        <PortugalContent />
      </main>
      <StudentFooter />
    </>
  )
}
