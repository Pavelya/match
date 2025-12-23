import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-16 pb-20 lg:pt-24 lg:pb-28">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-full -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white opacity-70" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-8">
          {/* Text Content */}
          <div className="max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
              Built by a former IB student who wished this existed
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Find Your Perfect <br className="hidden lg:block" />
              <span className="text-blue-600">University Match</span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Use your predicted IB grades to discover university programs that match your profile.
              We understand the IB system — HL vs SL, TOK/EE, and how it all adds up.
            </p>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                href="/auth/signin"
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-200 hover:-translate-y-0.5"
                aria-label="Find your university match - Sign in to get started"
              >
                Find My Match
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="#how-it-works"
                className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors"
              >
                How it works <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="mt-10 flex flex-col items-center gap-y-4 sm:flex-row sm:gap-x-8 lg:justify-start">
              <div className="flex items-center gap-x-2 text-sm text-gray-600">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>100% Free for Students</span>
              </div>
              <div className="flex items-center gap-x-2 text-sm text-gray-600">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>Global University Database</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="relative aspect-[4/3] w-full lg:aspect-square">
              <Image
                src="/images/landing/hero.png"
                alt="Students connecting with global universities"
                width={1024}
                height={1024}
                quality={95}
                priority
                className="object-contain drop-shadow-2xl"
              />
              {/* Floating UI Elements for decoration (optional, can be CSS or smaller images) */}
              <div className="absolute -bottom-6 -left-6 -z-10 h-72 w-72 rounded-full bg-blue-100 blur-3xl opacity-50"></div>
              <div className="absolute -top-6 -right-6 -z-10 h-72 w-72 rounded-full bg-purple-100 blur-3xl opacity-50"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
