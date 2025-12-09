import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { CookieConsentBanner } from '@/components/shared/CookieConsentBanner'

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
    siteName: 'IB Match'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IB Match - Find Your Perfect University Program',
    description:
      'Discover university programs that match your IB profile. Get personalized recommendations.'
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
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' }
    ],
    apple: '/favicon.svg'
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="light" style={{ colorScheme: 'light' }}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <CookieConsentBanner />
      </body>
    </html>
  )
}
