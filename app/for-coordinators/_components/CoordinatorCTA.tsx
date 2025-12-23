import Link from 'next/link'
import { Calendar } from 'lucide-react'

export function CoordinatorCTA() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative isolate overflow-hidden bg-blue-600 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to help shape IB Match?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
            We&apos;re looking for experienced coordinators to provide feedback and help us build
            features that actually solve your challenges.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="https://calendly.com/ibmatch/feedback-call-with-ib-coordinator"
              target="_blank"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-base font-semibold text-blue-600 shadow-sm hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-200 hover:-translate-y-0.5"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Schedule a 15-minute call
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
