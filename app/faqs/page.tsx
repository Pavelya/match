import type { Metadata } from 'next'
import Link from 'next/link'
import { HelpCircle, Mail } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer'
import { FAQAccordion } from './_components/FAQAccordion'
import { StudentFooter } from '@/components/layout/StudentFooter'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ibmatch.com'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description:
    'Find answers to common questions about IB Match - how it works, predicted grades, university matching, and more. Get help with your IB university search.',
  keywords: [
    'IB Match FAQ',
    'IB diploma questions',
    'university matching help',
    'IB predicted grades',
    'how does IB Match work',
    'IB student support'
  ],
  openGraph: {
    title: 'Frequently Asked Questions | IB Match',
    description:
      'Find answers to common questions about IB Match - how it works, predicted grades, and university matching.',
    type: 'website',
    url: `${baseUrl}/faqs`
  },
  alternates: {
    canonical: `${baseUrl}/faqs`
  }
}

// FAQ data with structured content for SEO
const faqs = [
  {
    question: 'How does IB Match work?',
    answer:
      'IB Match uses your predicted IB grades, subject choices (HL/SL), preferred fields of study, and location preferences to match you with university programs worldwide. We understand the IB system — including how TOK and EE points contribute to your total — and find programs whose requirements align with your profile.'
  },
  {
    question: 'Is IB Match free to use?',
    answer:
      'Yes! IB Match is 100% free for students. You can browse programs, create your academic profile, see your matches, and save your favorites — all at no cost.'
  },
  {
    question: 'How accurate are the program recommendations?',
    answer:
      "Our matching algorithm considers your total IB points, specific course grades, HL/SL levels, preferred fields of study, location preferences, and whether you meet each program's requirements. We show you a clear breakdown of how well you match each program, so you can make informed decisions."
  },
  {
    question: 'Can I apply to universities through IB Match?',
    answer:
      "No, IB Match is a discovery and matching tool, not an application portal. Once you find programs you're interested in, you'll apply directly through each university's own admission process. We provide links to official program pages to help you get started."
  },
  {
    question: 'How do I update my predicted grades?',
    answer:
      'You can update your predicted grades anytime from your Academic Profile. Just click "Academic Profile" in the header (or "Academic" in the bottom navigation on mobile) to access and update your grades. Your matches will automatically recalculate to reflect your changes.'
  },
  {
    question: "What if I'm not sure about my predicted grades?",
    answer:
      "That's okay! You can enter your best estimate and update it later as you receive more feedback from teachers. Many students refine their predictions throughout the year. IB Match will recalculate your matches each time you update."
  },
  {
    question: 'How many programs will I be matched with?',
    answer:
      'The number of matches depends on your profile and preferences. We show your top recommendations first, but you can also browse and search our full database to discover more options. New programs are added regularly as we grow.'
  },
  {
    question: 'Can coordinators at my school see my information?',
    answer:
      'Only if you accept an invitation to link your account with your school. If you do, your IB coordinator can view your academic profile to help guide you. You can unlink at any time from your settings. Your data is never shared without your consent.'
  },
  {
    question: 'What should I do if I find incorrect program information?',
    answer:
      'Please contact us if you notice any errors. We work hard to keep our database accurate, but universities sometimes change their requirements. Your feedback helps us improve!'
  }
]

// JSON-LD structured data for FAQ page (helps with Google rich snippets)
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }))
}

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageContainer>
        <div className="mx-auto max-w-3xl py-12 sm:py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 ring-1 ring-blue-100">
              <HelpCircle className="h-7 w-7 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Find answers to common questions about using IB Match
            </p>
          </div>

          {/* FAQ Accordion */}
          <FAQAccordion faqs={faqs} />

          {/* Still have questions section */}
          <div className="mt-16 rounded-2xl bg-gray-50 p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900">Still have questions?</h2>
            <p className="mt-2 text-gray-600">
              Can&apos;t find the answer you&apos;re looking for? Our support team is here to help.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
              >
                Contact Support
              </Link>
              <a
                href="mailto:support@ibmatch.com"
                className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
              >
                <Mail className="mr-2 h-4 w-4" />
                Email Us
              </a>
            </div>
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
