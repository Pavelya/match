import { Server, Search, Sparkles, Heart } from 'lucide-react'

const reasons = [
  {
    name: 'Infrastructure Costs',
    description:
      'Hosting, databases, and CDN services cost money. As our user base grows, so do these costs.',
    icon: Server
  },
  {
    name: 'Search & Matching',
    description:
      'Our matching algorithm and search APIs require ongoing investment to deliver instant results for students.',
    icon: Search
  },
  {
    name: 'Continuous Improvement',
    description:
      "We're constantly adding new universities, improving the algorithm, and building features you request.",
    icon: Sparkles
  },
  {
    name: 'Free for Students',
    description:
      'We believe every IB student deserves access to quality university guidance, regardless of their financial situation.',
    icon: Heart
  }
]

export function WhySupport() {
  return (
    <section className="bg-gray-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">Why Support Us?</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            A Non-Commercial Project with Real Costs
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            IB Match is built with love, not profit motives. We don&apos;t show ads, sell your data,
            or charge students. But running a platform that serves students worldwide comes with
            real expenses.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {reasons.map((reason) => (
              <div key={reason.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <reason.icon className="h-5 w-5 flex-none text-blue-600" aria-hidden="true" />
                  {reason.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{reason.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
