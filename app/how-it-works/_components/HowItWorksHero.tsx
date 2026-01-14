'use client'

import { Cpu, Sparkles } from 'lucide-react'

export function HowItWorksHero() {
  return (
    <section className="relative overflow-hidden bg-white pt-16 pb-20 lg:pt-24 lg:pb-28">
      <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-full -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white opacity-70" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 mb-6">
            <Cpu className="h-3 w-3 mr-2" />
            Under the Hood
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Built Smart, <span className="text-blue-600">Engineered for IB</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Curious how we match you with university programs? Here&apos;s a peek behind the curtain
            at the technology that powers your personalized recommendations.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-y-4 sm:flex-row sm:gap-x-8">
            <div className="flex items-center gap-x-2 text-sm text-gray-600">
              <Sparkles className="h-4 w-4 text-blue-500" />
              <span>Fast, accurate matching</span>
            </div>
            <div className="flex items-center gap-x-2 text-sm text-gray-600">
              <Sparkles className="h-4 w-4 text-blue-500" />
              <span>Transparent algorithm</span>
            </div>
            <div className="flex items-center gap-x-2 text-sm text-gray-600">
              <Sparkles className="h-4 w-4 text-blue-500" />
              <span>Privacy-first design</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
