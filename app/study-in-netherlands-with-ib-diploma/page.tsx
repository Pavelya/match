/**
 * Study in the Netherlands with IB Diploma - SEO Landing Page
 *
 * This page provides comprehensive information for IB Diploma students
 * seeking university admission in the Netherlands. Content is based on
 * official Dutch government and educational institution sources.
 *
 * Official sources used:
 * - studyinnl.org (Nuffic's official portal for international students)
 * - nuffic.nl (Dutch organisation for internationalisation in education / NARIC)
 * - studielink.nl (national application and enrolment portal)
 */
import { Metadata } from 'next'
import { NetherlandsContent } from './NetherlandsContent'
import { StudentFooter } from '@/components/layout/StudentFooter'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ibmatch.com'

export const dynamic = 'force-static'
export const revalidate = 604800 // 7 days

export const metadata: Metadata = {
  title: 'Study in Netherlands with IB Diploma | Guide (2026)',
  description:
    'Official guide for IB students applying to Dutch universities. VWO equivalence, Studielink application, Numerus Fixus, and Nuffic recognition (2026).',
  keywords: [
    'study in netherlands with ib diploma',
    'ib diploma netherlands university admission',
    'netherlands ib recognition',
    'ib diploma dutch university',
    'dutch university entrance ib diploma',
    'nuffic ib diploma vwo',
    'studielink ib application',
    'numerus fixus ib students'
  ],
  openGraph: {
    title: 'Study in Netherlands with IB Diploma | Guide (2026)',
    description:
      'Complete guide for IB Diploma students on university admission in the Netherlands. VWO equivalence via Nuffic, Studielink application, and Numerus Fixus selection.',
    type: 'website',
    url: `${baseUrl}/study-in-netherlands-with-ib-diploma`,
    siteName: 'IB Match'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Study in Netherlands with IB Diploma | Guide 2026',
    description:
      'Official guide for IB students: Dutch university admission, Nuffic VWO equivalence, Studielink application, and Numerus Fixus process.'
  },
  alternates: {
    canonical: `${baseUrl}/study-in-netherlands-with-ib-diploma`
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
  name: 'Study in the Netherlands with the IB Diploma',
  description:
    'Authoritative guide for IB Diploma students on university admission in the Netherlands, including Nuffic VWO equivalence, Studielink application, and Numerus Fixus selection.',
  url: `${baseUrl}/study-in-netherlands-with-ib-diploma`,
  isPartOf: {
    '@type': 'WebSite',
    name: 'IB Match',
    url: baseUrl
  },
  about: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'International Baccalaureate Diploma',
    description: 'University admission requirements for IB Diploma holders in the Netherlands'
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
  headline: 'Study in the Netherlands with the IB Diploma: Official Guide',
  description:
    'Comprehensive guide explaining how the IB Diploma is recognized in the Netherlands, Nuffic VWO equivalence, Studielink application process, and Numerus Fixus selection.',
  url: `${baseUrl}/study-in-netherlands-with-ib-diploma`,
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
  mainEntityOfPage: `${baseUrl}/study-in-netherlands-with-ib-diploma`,
  about: [
    {
      '@type': 'Thing',
      name: 'University Admissions in the Netherlands',
      description: 'Decentralized admission system with applications via Studielink'
    },
    {
      '@type': 'Organization',
      name: 'Nuffic',
      description:
        'Dutch organisation for internationalisation in education and NARIC centre for the Netherlands'
    },
    {
      '@type': 'Thing',
      name: 'International Baccalaureate Diploma',
      description: 'International secondary school qualification'
    },
    {
      '@type': 'Country',
      name: 'Netherlands'
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
      name: 'Is the IB Diploma recognized for university admission in the Netherlands?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Nuffic (the Dutch NARIC) has determined that the IB Diploma is equivalent to the Dutch VWO diploma (Voorbereidend Wetenschappelijk Onderwijs), which is the qualification required for admission to Dutch research universities (WO). The IB Career-related Programme (CP) is comparable to the HAVO diploma with vocational subjects. Source: Nuffic — International Baccalaureate.'
      }
    },
    {
      '@type': 'Question',
      name: 'How do IB students apply to Dutch universities?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most applications to Dutch higher education institutions go through Studielink (studielink.nl), the national online enrolment portal. You create an account, select your programme, and submit your application. Some institutions may also require a separate direct application. Check with your chosen institution whether Studielink applies to international applicants. Source: Study in NL — How to Apply.'
      }
    },
    {
      '@type': 'Question',
      name: 'What is a Numerus Fixus programme and how does it affect IB students?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Numerus Fixus programmes have a limited number of places. If more students apply than there are places, a selection procedure takes place. The application deadline for Numerus Fixus programmes is 15 January (23:59 CET). You can apply to a maximum of two Numerus Fixus programmes per academic year. Medicine, Dentistry, Dental Hygiene, and Physiotherapy are further restricted to one application per programme. Source: Study in NL — How to Apply.'
      }
    },
    {
      '@type': 'Question',
      name: 'Do I need to speak Dutch to study in the Netherlands?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Not necessarily. The Netherlands offers a large number of English-taught programmes, especially at the Master's level but increasingly at Bachelor's level too. For English-taught programmes, you need to demonstrate English proficiency through tests such as IELTS, TOEFL, or Cambridge. For Dutch-taught programmes, you must demonstrate Dutch language proficiency. Source: Study in NL — Admission Requirements."
      }
    },
    {
      '@type': 'Question',
      name: 'What are tuition fees for IB students in the Netherlands?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'EU/EEA students pay the statutory tuition fee (wettelijk collegegeld), which is set annually by the Dutch government. Non-EU/EEA students pay the institutional tuition fee, which is set by each institution individually and is typically higher. Various scholarships are available, including the Holland Scholarship for non-EU/EEA students. Source: Study in NL — Finances.'
      }
    }
  ]
}

export default function StudyInNetherlandsPage() {
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
        <NetherlandsContent />
      </main>
      <StudentFooter />
    </>
  )
}
