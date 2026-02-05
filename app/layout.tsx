import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { CookieConsentBanner } from '@/components/shared/CookieConsentBanner'
import { CountryFlagPolyfill } from '@/components/shared/CountryFlagPolyfill'
import { ToastProvider } from '@/components/providers/toast-provider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: {
    template: '%s | IB Match',
    default: 'IB Match - Find Your Perfect University Program'
  },
  description:
    'Discover university programs that match your IB profile. Get personalized recommendations based on your subjects, grades, and preferences.',
  keywords: [
    'IB',
    'International Baccalaureate',
    'university matching',
    'program finder',
    'college admissions',
    'university programs',
    'IB diploma',
    'higher education'
  ],
  authors: [{ name: 'IB Match Team' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://ibmatch.com'),
  openGraph: {
    title: 'IB Match - Find Your Perfect University Program',
    description:
      'Discover university programs that match your IB profile. Get personalized recommendations based on your subjects, grades, and preferences.',
    type: 'website',
    locale: 'en_US',
    siteName: 'IB Match',
    images: [
      {
        url: '/og-image.png',
        width: 1024,
        height: 1024,
        alt: 'IB Match - Find Your Perfect University Program'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IB Match - Find Your Perfect University Program',
    description:
      'Discover university programs that match your IB profile. Get personalized recommendations.',
    images: ['/og-image.png']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  icons: {
    icon: { url: '/favicon.svg', type: 'image/svg+xml' },
    shortcut: '/favicon.svg',
    apple: '/favicon.svg'
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ibmatch.com'

  // Centralized Organization schema for consistent E-E-A-T signals across the site
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: 'IB Match',
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/og-image.png`,
      width: 1024,
      height: 1024
    },
    image: `${baseUrl}/og-image.png`,
    description:
      'University matching platform for International Baccalaureate students. Find programs that match your IB grades, subjects, and preferences.',
    foundingDate: '2025',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'support@ibmatch.com',
      availableLanguage: ['English']
    },
    sameAs: [],
    knowsAbout: [
      'International Baccalaureate',
      'IB Diploma Programme',
      'University Admissions',
      'Higher Level subjects',
      'Standard Level subjects',
      'TOK',
      'Extended Essay'
    ]
  }

  return (
    <html lang="en" className="light" style={{ colorScheme: 'light' }}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Centralized Organization schema for AI search engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <CountryFlagPolyfill />
        <ToastProvider>
          {children}
          <CookieConsentBanner />
        </ToastProvider>
      </body>
    </html>
  )
}
