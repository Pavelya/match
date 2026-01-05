import Link from 'next/link'
import { Coffee, Heart, Rocket, Mail } from 'lucide-react'

const donationTiers = [
  {
    icon: Coffee,
    amount: '$5',
    label: 'Buy us a coffee',
    impact: 'Covers 1 week of email service',
    color: 'bg-blue-50 border-blue-200 hover:border-blue-300'
  },
  {
    icon: Heart,
    amount: '$15',
    label: 'Show your love',
    impact: 'Covers 1 month of search API',
    color: 'bg-blue-50 border-blue-200 hover:border-blue-300',
    featured: true
  },
  {
    icon: Rocket,
    amount: '$50',
    label: 'Fuel our growth',
    impact: 'Helps add 10 new university programs',
    color: 'bg-blue-50 border-blue-200 hover:border-blue-300'
  }
]

export function DonationOptions() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">Make a Difference</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Choose Your Level of Support
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Every contribution, no matter the size, helps us maintain and improve IB Match for
            students around the world.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-3 lg:max-w-4xl">
          {donationTiers.map((tier) => (
            <Link
              key={tier.amount}
              href="https://ko-fi.com/ibmatch"
              target="_blank"
              rel="noopener noreferrer"
              className={`relative rounded-2xl border-2 p-6 text-center transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${tier.color} ${tier.featured ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
            >
              {tier.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white">
                  Most Popular
                </span>
              )}
              <tier.icon
                className={`mx-auto h-10 w-10 ${tier.featured ? 'text-blue-600' : 'text-gray-600'}`}
              />
              <p className="mt-4 text-3xl font-bold text-gray-900">{tier.amount}</p>
              <p className="mt-2 text-sm font-semibold text-gray-700">{tier.label}</p>
              <p className="mt-4 text-sm text-gray-600">{tier.impact}</p>
            </Link>
          ))}
        </div>

        {/* Monthly giving option */}
        <div className="mx-auto mt-12 max-w-2xl text-center">
          <div className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-6 ring-1 ring-blue-100">
            <p className="text-sm font-semibold text-blue-600">💖 Become a Monthly Supporter</p>
            <p className="mt-2 text-gray-600">
              Monthly donations help us plan ahead and build new features with confidence.
            </p>
            <Link
              href="https://ko-fi.com/ibmatch"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-500"
            >
              Set up monthly support on Ko-fi
              <span aria-hidden="true" className="ml-1">
                →
              </span>
            </Link>
          </div>
        </div>

        {/* Alternative contact */}
        <div className="mx-auto mt-8 max-w-2xl text-center">
          <p className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Mail className="h-4 w-4" />
            For sponsorship or partnership inquiries, contact us at{' '}
            <a
              href="mailto:universities@ibmatch.com"
              className="font-medium text-gray-700 underline"
            >
              universities@ibmatch.com
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
