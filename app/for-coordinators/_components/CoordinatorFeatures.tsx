import { CheckCircle2, MessageSquareQuote } from 'lucide-react'

const quotes = [
  'With 60-80 students in our IB cohort, individual university guidance is challenging.',
  'Students need help understanding how their IB grades translate to university admissions.',
  "I'm balancing academic guidance with increasing mental health support needs.",
  "Most university tools don't understand IB requirements—students get confused."
]

const benefits = [
  'Empowers students to self-serve university research using IB-specific criteria',
  'Reduces your workload by automating initial university matching',
  'Provides students with clear IB-based admission requirements',
  'Lets you focus on high-touch guidance and mental health support'
]

export function CoordinatorFeatures() {
  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center mb-16">
          <h2 className="text-base font-semibold leading-7 text-blue-600">Why Partner With Us?</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Managing university guidance shouldn&apos;t be another overwhelming task
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* What We Hear (Quotes) */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              What We Hear from Coordinators
            </h3>
            <div className="grid gap-4">
              {quotes.map((quote, idx) => (
                <div
                  key={idx}
                  className="relative rounded-xl border border-gray-200 bg-gray-50 p-6 shadow-sm transition-all hover:shadow-md"
                >
                  <MessageSquareQuote className="absolute top-6 left-6 h-6 w-6 text-blue-200" />
                  <p className="pl-10 text-gray-700 italic">&ldquo;{quote}&rdquo;</p>
                </div>
              ))}
            </div>
          </div>

          {/* How IB Match Helps (Checklist) */}
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">How IB Match Helps</h3>
            <ul className="space-y-6">
              {benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                  </div>
                  <span className="text-lg text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="mt-12 rounded-2xl bg-blue-50 p-8">
              <h4 className="font-semibold text-gray-900 mb-2">
                We need coordinator expertise to build this right
              </h4>
              <p className="text-gray-600 mb-6">
                We&apos;re looking for experienced IB coordinators to become early partners. Your
                insights will directly shape our platform.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
