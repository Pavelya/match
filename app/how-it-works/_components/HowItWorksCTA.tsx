import Link from 'next/link'
import { ArrowRight, Search } from 'lucide-react'

export function HowItWorksCTA() {
  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Ready to Find Your Match?
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Now that you know how it works, why not give it a try? Enter your IB profile and
            discover programs that fit you perfectly.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/auth/signin"
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-200 hover:-translate-y-0.5"
            >
              Get Started — It&apos;s Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/programs/search"
              className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-8 py-3.5 text-base font-semibold text-gray-900 shadow-sm hover:bg-gray-50 transition-all duration-200"
            >
              <Search className="mr-2 h-4 w-4" />
              Explore Programs
            </Link>
          </div>

          <p className="mt-8 text-sm text-gray-500">
            100% free for students. No credit card required.
          </p>
        </div>
      </div>
    </section>
  )
}
