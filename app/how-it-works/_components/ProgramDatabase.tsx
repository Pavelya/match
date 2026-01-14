import { Database, Search, Zap, RefreshCw } from 'lucide-react'

const features = [
  {
    name: 'Curated Program Data',
    description:
      'Every program is manually reviewed for accurate IB requirements — minimum points, required subjects, and grade thresholds.',
    icon: Database
  },
  {
    name: 'Blazing Fast Search',
    description:
      'Powered by Algolia, the same search infrastructure used by Stripe, Slack, and Medium. Results in under 50 milliseconds.',
    icon: Search
  },
  {
    name: 'Typo Tolerance',
    description:
      'Misspell "psychology" as "psycology"? No problem. Our search understands what you mean and finds the right programs.',
    icon: Zap
  },
  {
    name: 'Real-Time Sync',
    description:
      'When we add new programs or update requirements, your search results update instantly. Always fresh data.',
    icon: RefreshCw
  }
]

export function ProgramDatabase() {
  return (
    <section className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">Program Database</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Thousands of Programs, Instant Results
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We maintain a growing database of university programs from around the world, each with
            detailed IB-specific admission requirements. Search through them all in milliseconds.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <feature.icon className="h-5 w-5 flex-none text-blue-600" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
