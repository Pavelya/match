/**
 * Study in Portugal with IB Diploma - SEO Landing Page
 *
 * This page provides comprehensive information for IB Diploma students
 * seeking university admission in Portugal. Content is based on
 * official Portuguese government and educational institution sources.
 *
 * Official sources used:
 * - dge.mec.pt (Direção-Geral da Educação — equivalency of foreign qualifications)
 * - dges.gov.pt (Direção-Geral do Ensino Superior — higher education access & NARIC centre)
 */
import { Metadata } from 'next'
import { PortugalContent } from './PortugalContent'
import { StudentFooter } from '@/components/layout/StudentFooter'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ibmatch.com'

export const dynamic = 'force-static'
export const revalidate = 604800 // 7 days

export const metadata: Metadata = {
  title: 'Study in Portugal with IB Diploma | Guide (2026)',
  description:
    'Official guide for IB students applying to Portuguese universities. DGE equivalency, Concurso Especial admission, entrance exams, and language requirements (2026).',
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
    title: 'Study in Portugal with IB Diploma | Guide (2026)',
    description:
      'Complete guide for IB Diploma students on university admission in Portugal. DGE equivalency process, Concurso Especial for international students, and the binary higher education system.',
    type: 'website',
    url: `${baseUrl}/study-in-portugal-with-ib-diploma`,
    siteName: 'IB Match'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Study in Portugal with IB Diploma | Guide 2026',
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
        text: 'Yes. The IB Diploma is recognized in Portugal through a formal equivalency process managed by the Direção-Geral da Educação (DGE). Under Decreto-Lei 227/2005, IB Diploma holders can obtain equivalency to Portuguese secondary education (ensino secundário), which then qualifies them to apply for higher education. The process is free of charge and can be requested at any time. Source: DGE — Equivalências Estrangeiras.'
      }
    },
    {
      '@type': 'Question',
      name: 'How do international IB students apply to Portuguese universities?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'International students (non-EU/non-Portuguese nationals) apply through the Concurso Especial para Estudantes Internacionais, a special competition established by Decreto-Lei 36/2014. Each university manages its own admission under this framework, setting specific deadlines and requirements. EU/EEA students may apply through the national general competition (concurso nacional de acesso) or other special competitions. Source: DGES — Acesso ao Ensino Superior.'
      }
    },
    {
      '@type': 'Question',
      name: 'Do IB students need to take Portuguese entrance exams (Provas de Ingresso)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It depends on the admission route. Students applying through the national general competition (concurso nacional de acesso) typically need to take Provas de Ingresso. International students applying through the Concurso Especial may not need national exams — universities may use IB scores directly or administer their own admission tests. Requirements vary by institution and programme. Source: DGES — Acesso ao Ensino Superior.'
      }
    },
    {
      '@type': 'Question',
      name: 'What language proficiency is required to study in Portugal?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "For Portuguese-taught programmes, proficiency in Portuguese is required, typically at B1–B2 level. For the growing number of English-taught programmes (especially at Master's level), English proficiency at B2 level is generally required (e.g., IELTS 6.0–6.5, Cambridge B2 First). IB English A or B courses may satisfy English requirements at some institutions — verify directly. Source: DGES — Portuguese Higher Education System."
      }
    },
    {
      '@type': 'Question',
      name: 'What is the difference between universities and polytechnics in Portugal?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Portugal operates a binary higher education system. Universities focus on research and academic knowledge, offering Licenciatura (Bachelor's, 3–4 years), Mestrado (Master's, 1.5–2 years), and Doutoramento (PhD). Polytechnics emphasize applied research and practical professional training, offering Licenciatura and Mestrado degrees. Both types accept IB Diploma holders. Source: DGES — Portuguese Higher Education System."
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
