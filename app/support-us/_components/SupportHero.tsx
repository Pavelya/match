import Link from 'next/link'
import { Heart, ArrowRight } from 'lucide-react'

export function SupportHero() {
  return (
    <section className="relative overflow-hidden bg-white pt-16 pb-20 lg:pt-24 lg:pb-28">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-full -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white opacity-70" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 mb-6">
            <Heart className="h-3 w-3 mr-2 fill-blue-600" />
            Community-powered project
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Help Us Keep IB Match <span className="text-blue-600">Free for All Students</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            IB Match was built by an IB graduate who wished this tool existed. We&apos;re committed
            to keeping it free for students — forever. Your support helps us cover infrastructure
            costs and continue improving the platform.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="https://ko-fi.com/ibmatch"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-200 hover:-translate-y-0.5"
              aria-label="Support IB Match on Ko-fi"
            >
              <Heart className="mr-2 h-4 w-4" />
              Support on Ko-fi
            </Link>
            <Link
              href="#how-funds-are-used"
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors"
            >
              See how funds are used <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-y-4 sm:flex-row sm:gap-x-8">
            <div className="flex items-center gap-x-2 text-sm text-gray-600">
              <ArrowRight className="h-4 w-4 text-blue-500" />
              <span>100% goes to platform costs</span>
            </div>
            <div className="flex items-center gap-x-2 text-sm text-gray-600">
              <ArrowRight className="h-4 w-4 text-blue-500" />
              <span>Non-commercial project</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
