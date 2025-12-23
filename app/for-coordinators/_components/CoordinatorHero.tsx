import Link from 'next/link'
import { Calendar } from 'lucide-react'
import Image from 'next/image'

export function CoordinatorHero() {
  return (
    <section className="relative overflow-hidden bg-white pt-16 pb-20 lg:pt-24 lg:pb-28">
      <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-full -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white opacity-70" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-8">
          {/* Text Content */}
          <div className="max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
              Partner with us
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Help Your Students Navigate University Admissions with{' '}
              <span className="text-blue-600">Confidence</span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              As an IB coordinator, you understand the unique challenges your students face. IB
              Match provides IB-specific university matching that speaks their language—HL, SL,
              predicted grades, and all.
            </p>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                href="https://calendly.com/ibmatch/feedback-call-with-ib-coordinator"
                target="_blank"
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-200 hover:-translate-y-0.5"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Schedule a 15-min feedback call
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="relative aspect-[4/3] w-full lg:aspect-square">
              <Image
                src="/images/landing/coordinator-hero.png"
                alt="IB Coordinator guiding a student"
                width={800}
                height={600}
                className="object-contain drop-shadow-xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
