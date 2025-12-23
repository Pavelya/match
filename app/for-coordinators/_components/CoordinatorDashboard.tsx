import { BarChart3, Users, Upload, FileText } from 'lucide-react'

const features = [
  {
    name: 'School-level Analytics',
    description: 'Understand student university interests and trends at a glance.',
    icon: BarChart3
  },
  {
    name: 'Student Progress Tracking',
    description: 'Monitor university searching and application planning progress.',
    icon: Users
  },
  {
    name: 'Bulk Management',
    description: 'Easily manage student invitations and accounts in bulk.',
    icon: Upload
  },
  {
    name: 'Data Export',
    description: 'Export data for your existing guidance workflows.',
    icon: FileText
  }
]

export function CoordinatorDashboard() {
  return (
    <section className="overflow-hidden bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Coordinator Dashboard
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Based on coordinator feedback, we&apos;re building school management features to help
            you work more efficiently.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-white">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-300">{feature.description}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-16 text-center">
            <div className="inline-block rounded-xl bg-blue-500/10 px-6 py-4 border border-blue-500/20">
              <p className="text-sm text-blue-200">
                <strong>Early Adopter Benefit:</strong> Get full access to these features for free
                and help shape their development.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
