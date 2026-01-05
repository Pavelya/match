import Link from 'next/link'
import { Heart, Share2 } from 'lucide-react'

export function SupportCTA() {
  return (
    <section className="bg-blue-600 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Heart className="mx-auto h-12 w-12 text-blue-200" />
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Every Contribution Makes a Difference
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
            Thank you for considering supporting IB Match. Together, we&apos;re helping IB students
            around the world find their perfect university match.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <Link
              href="https://ko-fi.com/ibmatch"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white px-8 py-3.5 text-base font-semibold text-blue-600 shadow-sm hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-200 hover:-translate-y-0.5 flex items-center"
              aria-label="Support IB Match on Ko-fi"
            >
              <Heart className="mr-2 h-4 w-4" />
              Support on Ko-fi
            </Link>
          </div>
          <p className="mt-8 flex items-center justify-center gap-2 text-sm text-blue-200">
            <Share2 className="h-4 w-4" />
            Can&apos;t donate? Share IB Match with a friend who might need it!
          </p>
        </div>
      </div>
    </section>
  )
}
