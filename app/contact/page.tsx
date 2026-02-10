import type { Metadata } from 'next'
import Link from 'next/link'
import { MessageSquare, Mail } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer'
import { StudentFooter } from '@/components/layout/StudentFooter'
import { ContactForm } from './_components/ContactForm'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ibmatch.com'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with the IB Match team. Submit a support request, report an issue, or provide feedback. We typically respond within 24-48 hours.',
  keywords: [
    'IB Match contact',
    'IB Match support',
    'help',
    'report issue',
    'feedback',
    'contact form'
  ],
  openGraph: {
    title: 'Contact Us | IB Match',
    description:
      'Get in touch with the IB Match team. Submit a support request or provide feedback.',
    type: 'website',
    url: `${baseUrl}/contact`
  },
  alternates: {
    canonical: `${baseUrl}/contact`
  }
}

export default async function ContactPage() {
  // Check authentication
  const session = await auth()
  let userName: string | null = null

  if (session?.user?.id) {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { name: true }
    })
    userName = user?.name || null
  }

  return (
    <>
      <PageContainer>
        <div className="mx-auto max-w-2xl py-12 sm:py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 ring-1 ring-blue-100">
              <MessageSquare className="h-7 w-7 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Contact Us
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Have a question or need help? We&apos;re here for you.
            </p>
          </div>

          {/* Contact Form */}
          <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-sm ring-1 ring-gray-100">
            <ContactForm isAuthenticated={!!session?.user?.id} userName={userName} />
          </div>

          {/* Alternative contact methods */}
          <div className="mt-12 rounded-2xl bg-gray-50 p-6 text-center">
            <h2 className="text-lg font-semibold text-gray-900">Other Ways to Reach Us</h2>
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:support@ibmatch.com"
                className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
              >
                <Mail className="mr-2 h-4 w-4" />
                support@ibmatch.com
              </a>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              Check our{' '}
              <Link href="/faqs" className="text-blue-600 hover:underline">
                FAQs
              </Link>{' '}
              for quick answers to common questions.
            </p>
          </div>

          {/* Back link */}
          <div className="mt-12 border-t pt-8">
            <Link href="/" className="text-primary hover:underline">
              ← Back to Home
            </Link>
          </div>
        </div>
      </PageContainer>
      <StudentFooter />
    </>
  )
}
