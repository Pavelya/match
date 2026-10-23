import type { Metadata } from 'next'
import { SupportHero } from './_components/SupportHero'
import { WhySupport } from './_components/WhySupport'
import { WhoCanSupport } from './_components/WhoCanSupport'
import { ProgramRequest } from './_components/ProgramRequest'
import { DonationOptions } from './_components/DonationOptions'
import { SupportCTA } from './_components/SupportCTA'
import { StudentFooter } from '@/components/layout/StudentFooter'
import { showsNewUi } from '@/lib/new-ui'
import { NewSupportUs } from './NewSupportUs'

// Static generation - page is pre-rendered at build time
// Revalidate every hour to pick up any changes
export const dynamic = 'force-static'
export const revalidate = 3600

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ibmatch.com'

export const metadata: Metadata = {
  title: 'Support Us - Help Keep IB Match Free',
  description:
    'IB Match is an independent project that helps IB students find their perfect university match. It is free for students; your support helps pay for hosting, the database, search and email.',
  keywords: [
    'support IB Match',
    'donate to IB Match',
    'help IB students',
    'education donation',
    'IB university matching support',
    'sponsor IB Match'
  ],
  openGraph: {
    title: 'Support Us | IB Match',
    description:
      'Help us keep IB Match free for all students. Your donation helps pay for hosting, the database, search and email.',
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
    'Donation page for IB Match - an independent project helping IB students find university programs.',
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
    url: baseUrl
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

export default async function SupportUsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {(await showsNewUi()) ? <NewSupportUs /> : <TodaysSupportUs />}
    </>
  )
}

/** Today's page, until release (rebranding 4.3) */
function TodaysSupportUs() {
  return (
    <>
      <main className="flex min-h-screen flex-col">
        <SupportHero />
        <WhySupport />
        <WhoCanSupport />
        <ProgramRequest />
        <DonationOptions />
        <SupportCTA />
      </main>
      <StudentFooter />
    </>
  )
}
