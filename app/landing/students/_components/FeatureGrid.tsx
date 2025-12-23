import { BookOpen, Globe, Target, Zap } from 'lucide-react'

const features = [
  {
    name: 'IB-Specific Matching',
    description:
      'Our algorithm understands the difference between HL and SL, and how TOK/EE points contribute to your total.',
    icon: BookOpen
  },
  {
    name: 'Growing Database',
    description:
      "We're building a curated collection of programs that specifically value IB students. New universities added regularly as we grow.",
    icon: Globe
  },
  {
    name: 'Clear Match Insights',
    description:
      'See which programs match your profile — with clear explanations of how well you fit each one.',
    icon: Target
  },
  {
    name: 'Instant Results',
    description:
      'No more scouring websites. Enter your grades once and get matched with suitable programs in seconds.',
    icon: Zap
  }
]

export function FeatureGrid() {
  return (
    <section className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">Why IB Match?</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Built exclusively for the IB Diploma
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Generic university search tools don&apos;t understand the nuances of the IB. We do. We
            help you leverage your hard work to find the best opportunities.
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
