import { CheckCircle2 } from 'lucide-react'

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

        <div className="mx-auto max-w-3xl">
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
