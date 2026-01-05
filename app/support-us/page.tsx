import type { Metadata } from 'next'
import { SupportHero } from './_components/SupportHero'
import { WhySupport } from './_components/WhySupport'
import { WhoCanSupport } from './_components/WhoCanSupport'
import { HowFundsAreUsed } from './_components/HowFundsAreUsed'
import { ProgramRequest } from './_components/ProgramRequest'
import { DonationOptions } from './_components/DonationOptions'
import { SupportCTA } from './_components/SupportCTA'
import { StudentFooter } from '@/components/layout/StudentFooter'

// Static generation - page is pre-rendered at build time
// Revalidate every hour to pick up any changes
export const dynamic = 'force-static'
export const revalidate = 3600

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ibmatch.com'

export const metadata: Metadata = {
  title: 'Support Us - Help Keep IB Match Free',
  description:
    'IB Match is a non-commercial project committed to helping IB students find their perfect university match. Your support helps cover infrastructure costs and keeps the platform free for all students.',
  keywords: [
    'support IB Match',
    'donate to IB Match',
    'help IB students',
    'education donation',
    'non-profit education',
    'IB university matching support',
    'sponsor IB Match'
  ],
  openGraph: {
    title: 'Support Us | IB Match',
    description:
      'Help us keep IB Match free for all students. Your donation supports infrastructure, development, and growth.',
    type: 'website',
    url: `${baseUrl}/support-us`,
    siteName: 'IB Match'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Support Us | IB Match',
    description: 'Help us keep IB Match free for all students.'
  },
  alternates: {
    canonical: `${baseUrl}/support-us`
  }
}

// JSON-LD structured data for SEO and AI search
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Support IB Match',
  description:
    'Donation page for IB Match - a non-commercial project helping IB students find university programs.',
  url: `${baseUrl}/support-us`,
  isPartOf: {
    '@type': 'WebSite',
    name: 'IB Match',
    url: baseUrl
  },
  about: {
    '@type': 'Organization',
    name: 'IB Match',
    description:
      'A community-powered platform connecting IB Diploma students with university programs worldwide.',
    url: baseUrl,
    nonprofitStatus: 'NonprofitType'
  },
  potentialAction: {
    '@type': 'DonateAction',
    name: 'Support IB Match',
    recipient: {
      '@type': 'Organization',
      name: 'IB Match'
    },
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://ko-fi.com/ibmatch'
    }
  }
}

export default function SupportUsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex min-h-screen flex-col">
        <SupportHero />
        <WhySupport />
        <WhoCanSupport />
        <HowFundsAreUsed />
        <ProgramRequest />
        <DonationOptions />
        <SupportCTA />
      </main>
      <StudentFooter />
    </>
  )
}
