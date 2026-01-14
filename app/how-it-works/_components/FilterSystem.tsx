import { Globe, BookOpen, GraduationCap, Filter } from 'lucide-react'

const filters = [
  {
    name: '30+ Countries',
    description:
      'From the UK to Canada, Netherlands to Australia — find programs in your dream destinations.',
    icon: Globe
  },
  {
    name: '30+ Fields of Study',
    description:
      'Engineering, Medicine, Business, Arts, Sciences — we cover all major academic disciplines.',
    icon: BookOpen
  },
  {
    name: 'IB Points Range',
    description:
      'Filter by minimum IB points required. Find programs that match your predicted or final scores.',
    icon: GraduationCap
  },
  {
    name: 'Smart Combinations',
    description:
      'All filters work together. Study Medicine in Canada? Engineering in the UK? Just select and search.',
    icon: Filter
  }
]

export function FilterSystem() {
  return (
    <section className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">Filter System</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Find Exactly What You&apos;re Looking For
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Not sure where to start? Use our filters to narrow down programs by location, field of
            study, and IB requirements. The more specific you are, the better your matches.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {filters.map((filter) => (
              <div key={filter.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <filter.icon className="h-5 w-5 flex-none text-blue-600" aria-hidden="true" />
                  {filter.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{filter.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
