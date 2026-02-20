/**
 * Study in the USA with IB Diploma - SEO Landing Page
 *
 * This page provides comprehensive information for IB Diploma students
 * seeking university admission in the United States. Content is based on
 * official US government, IBO, and institutional sources.
 *
 * Official sources used:
 * - ibo.org — IB recognition database (770+ US universities)
 * - commonapp.org — centralized application platform (1,000+ colleges)
 * - admission.universityofcalifornia.edu — UC IB credit policies
 * - educationusa.state.gov — US Department of State student resources
 * - bigfuture.collegeboard.org — college planning and search tool
 */
import { Metadata } from 'next'
import { USAContent } from './USAContent'
import { StudentFooter } from '@/components/layout/StudentFooter'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ibmatch.com'

export const metadata: Metadata = {
  title: 'Study in the USA with IB Diploma | Official Guide (2027)',
  description:
    'Official guide for IB students applying to US universities. Holistic admissions, college credit policies, Common App process, and application deadlines (2027).',
  keywords: [
    'study in usa with ib diploma',
    'ib diploma us university admission',
    'us university ib credit',
    'ib diploma usa recognition',
    'ib students usa requirements',
    'ib diploma usa 2027',
    'common app ib diploma',
    'us college ib credit policy',
    'ib higher level credit usa',
    'holistic admissions ib diploma'
  ],
  openGraph: {
    title: 'Study in the USA with IB Diploma | Official Guide (2027)',
    description:
      'Complete guide for IB Diploma students on university admission in the USA. Holistic admissions, credit policies, Common App, and application deadlines.',
    type: 'website',
    url: `${baseUrl}/study-in-usa-with-ib-diploma`,
    siteName: 'IB Match'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Study in the USA with IB Diploma | Guide 2027',
    description:
      'Official guide for IB students: US university admission, college credit, Common App process, and application deadlines.'
  },
  alternates: {
    canonical: `${baseUrl}/study-in-usa-with-ib-diploma`
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
  name: 'Study in the USA with the IB Diploma',
  description:
    'Authoritative guide for IB Diploma students on university admission in the United States, including holistic admissions, credit policies, and the Common App process.',
  url: `${baseUrl}/study-in-usa-with-ib-diploma`,
  isPartOf: {
    '@type': 'WebSite',
    name: 'IB Match',
    url: baseUrl
  },
  about: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'International Baccalaureate Diploma',
    description: 'University admission and credit policies for IB Diploma holders in the USA'
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

// EducationalArticle schema
const educationalArticleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Study in the USA with the IB Diploma: Official Guide',
  description:
    'Comprehensive guide explaining how the IB Diploma is recognized by US universities, holistic admissions, credit policies, and the Common App process.',
  url: `${baseUrl}/study-in-usa-with-ib-diploma`,
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
  mainEntityOfPage: `${baseUrl}/study-in-usa-with-ib-diploma`,
  about: [
    {
      '@type': 'Thing',
      name: 'University Admissions in the United States',
      description: 'Holistic university admission system in the USA'
    },
    {
      '@type': 'Thing',
      name: 'International Baccalaureate Diploma',
      description: 'International secondary school qualification'
    },
    {
      '@type': 'Country',
      name: 'United States'
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
      name: 'Is the IB Diploma recognized by US universities?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Over 770 US universities officially recognize the IB Diploma. US admissions are holistic — there is no single minimum IB score, but the IB curriculum is viewed as rigorous, college-level preparation. Source: IBO Recognition Database.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can I get college credit for IB courses in the USA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Most US universities award college credit for Higher Level (HL) IB exams, typically requiring scores of 5, 6, or 7. The University of California system, for example, awards 8 quarter units per HL exam with 5+ and 6 additional units for a full diploma with 30+ total. Credit policies vary by institution. Source: University of California Admissions.'
      }
    },
    {
      '@type': 'Question',
      name: 'How do IB students apply to US universities?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most US universities accept applications through the Common Application (commonapp.org), which supports over 1,000 colleges. IB students submit predicted grades, transcripts, essays, recommendation letters, and extracurricular information. Some universities also accept the Coalition Application. Source: Common App.'
      }
    },
    {
      '@type': 'Question',
      name: 'What are the application deadlines for US universities?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Early Decision/Action deadlines are typically November 1–15. Regular Decision deadlines are usually January 1–15. The Common App opens on August 1 each year. Decisions are released in mid-December for early rounds and March–April for regular decision. Source: Common App.'
      }
    },
    {
      '@type': 'Question',
      name: 'Do US universities require SAT/ACT for IB students?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Many US universities have adopted test-optional policies, meaning SAT/ACT scores are not required. In test-optional contexts, strong IB coursework and predicted grades can effectively take the place of standardized test scores. Check each university's specific policy. Source: Common App, individual university admissions websites."
      }
    }
  ]
}

export default function StudyInUSAPage() {
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
        <USAContent />
      </main>
      <StudentFooter />
    </>
  )
}
