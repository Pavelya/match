import { Metadata } from 'next'
import { StudentFooter } from '@/components/layout/StudentFooter'
import { SingaporeContent } from './SingaporeContent'

export const dynamic = 'force-static'
export const revalidate = 604800 // 7 days

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ibmatch.com'

export const metadata: Metadata = {
  title: 'Study in Singapore with IB Diploma | Official University Guide (2026)',
  description:
    'Learn how Singapore universities (NUS, NTU, SMU) recognize the IB Diploma. Admission rules, grade expectations, and MTL requirements for the 2026 intake.',
  keywords: [
    'study in singapore with ib diploma',
    'ib diploma singapore university admission',
    'nus ib diploma requirements',
    'ntu ib diploma requirements',
    'smu ib diploma admission',
    'singapore university ib points',
    'ib diploma recognition singapore'
  ],
  openGraph: {
    title: 'Study in Singapore with IB Diploma | Official University Guide (2026)',
    description:
      'Learn how Singapore universities (NUS, NTU, SMU) recognize the IB Diploma. Admission rules, grade expectations, and MTL requirements for the 2026 intake.',
    type: 'website',
    url: `${baseUrl}/study-in-singapore-with-ib-diploma`,
    siteName: 'IB Match'
  },
  twitter: {
    card: 'summary_large_image'
  },
  alternates: {
    canonical: `${baseUrl}/study-in-singapore-with-ib-diploma`
  },
  robots: {
    index: true,
    follow: true
  }
}

export default function StudyInSingaporePage() {
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Study in Singapore with the IB Diploma',
    description:
      'Complete guide on how to apply to universities in Singapore using the International Baccalaureate Diploma. Evaluated by official sources including NUS, NTU, and SMU.',
    url: `${baseUrl}/study-in-singapore-with-ib-diploma`,
    isPartOf: { '@type': 'WebSite', name: 'IB Match', url: baseUrl },
    about: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'International Baccalaureate Diploma',
      description: 'University admission requirements for IB Diploma holders in Singapore'
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

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Study in Singapore with the IB Diploma',
    description:
      'Learn how public and private universities in Singapore map and recognize IB Diploma grades for undergraduate programs.',
    datePublished: '2026-02-26',
    dateModified: new Date().toISOString().split('T')[0],
    author: { '@type': 'Organization', name: 'IB Match', url: baseUrl },
    publisher: {
      '@type': 'Organization',
      name: 'IB Match',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo.png`
      }
    },
    about: [
      { '@type': 'Thing', name: 'International Baccalaureate' },
      { '@type': 'Place', name: 'Singapore' },
      { '@type': 'EducationalOccupationalCredential', name: 'IB Diploma' }
    ]
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Do autonomous universities in Singapore accept the IB Diploma?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Major publicly funded universities, including NUS, NTU, SMU, and SUTD, accept the IB Diploma as a qualification for undergraduate programs. Source: National University of Singapore (NUS) and Nanyang Technological University (NTU).'
        }
      },
      {
        '@type': 'Question',
        name: 'What IB score is required for admission to NUS or NTU?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'There is no universal minimum score, but admission is highly competitive. Universities conduct holistic reviews and expect a strong combination of grades, typically 5s, 6s, and 7s in Higher Level and Standard Level subjects, including good grades in EE and TOK. Source: Nanyang Technological University (NTU).'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I apply with predicted IB scores if I take the May exams?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, if you are taking the May examinations, you can often apply with predicted scores for the initial application window (around December to February/March). However, actual IB results must be submitted promptly upon release in July. Source: National University of Singapore (NUS).'
        }
      },
      {
        '@type': 'Question',
        name: 'Is the IB Diploma alone sufficient for university entry in Singapore?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, the IB Diploma is sufficient and no additional local diploma is required. However, applicants must meet specific programme prerequisites (such as Mathematics or science subjects at HL) and language requirements. Source: Nanyang Technological University (NTU).'
        }
      },
      {
        '@type': 'Question',
        name: 'What is the Mother Tongue Language (MTL) requirement?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The MTL requirement applies primarily to Singapore Citizens and Permanent Residents. It can be fulfilled by achieving specific grades in IB Diploma Language A or Language B (Standard or Higher Level) or other MOE-approved qualifications. International students typically fulfill English proficiency requirements instead. Source: Singapore Management University (SMU).'
        }
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main className="flex min-h-screen flex-col">
        <SingaporeContent />
      </main>
      <StudentFooter />
    </>
  )
}
