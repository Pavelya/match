import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import { CookieConsentBanner } from '@/components/shared/CookieConsentBanner'
import { CountryFlagPolyfill } from '@/components/shared/CountryFlagPolyfill'
import { NewUiPreviewBar } from '@/components/shared/NewUiPreviewBar'
import { ToastProvider } from '@/components/providers/toast-provider'
import { newUiForEveryone, showsNewUi } from '@/lib/new-ui'
import { THEME_SCRIPT } from '@/lib/theme'
import { cn } from '@/lib/utils'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

// The new design's display face (rebranding 1.1): Newsreader 500, the only weight its styles
// use, cut at optical size 36 for headings from 30 to 56px. A static cut keeps the font budget
// (the variable font with its opsz axis is 132 KB for latin alone), and it is self-hosted because
// next/font/google can't pin an optical size. Latin-ext loads only for names that need it, as
// Google's subsets do. Not preloaded, so today's pages never download either file.
const newsreader = localFont({
  src: './fonts/newsreader/newsreader-500-opsz36-latin.woff2',
  weight: '500',
  variable: '--font-newsreader',
  preload: false,
  adjustFontFallback: 'Times New Roman',
  declarations: [
    {
      prop: 'unicode-range',
      value:
        'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD'
    }
  ]
})

// The type styles in globals.css list this face before the latin one. In the other order the latin
// face's size-adjusted Times New Roman fallback would catch latin-ext letters first.
const newsreaderLatinExt = localFont({
  src: './fonts/newsreader/newsreader-500-opsz36-latin-ext.woff2',
  weight: '500',
  variable: '--font-newsreader-ext',
  preload: false,
  adjustFontFallback: false,
  declarations: [
    {
      prop: 'unicode-range',
      value:
        'U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF'
    }
  ]
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ibmatch.com'),
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

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ibmatch.com'

  // Which design this request gets (rebranding task 0.1). `data-ui="next"` is the hook for the
  // new design's scoped tokens; for everyone else `<html>` stays exactly as it is.
  const newUi = await showsNewUi()

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
    <html
      lang="en"
      className={newUi ? undefined : 'light'}
      style={newUi ? undefined : { colorScheme: 'light' }}
      data-ui={newUi ? 'next' : undefined}
      suppressHydrationWarning={newUi}
    >
      {/*
       * The new design follows the OS, or the student's choice (rebranding 1.4). The script sets
       * data-theme before first paint; it is the reason for suppressHydrationWarning. Today's
       * design stays forced light until release, or its screens would change on a dark OS.
       */}
      {newUi && (
        <head>
          <meta name="color-scheme" content="light dark" />
          <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        </head>
      )}
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          newUi && [newsreader.variable, newsreaderLatinExt.variable],
          'antialiased'
        )}
      >
        {newUi && !newUiForEveryone() && <NewUiPreviewBar />}
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
