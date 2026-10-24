import { BarChart3, Users, Mail, FileText } from 'lucide-react'

const features = [
  {
    name: 'School-level Analytics',
    description:
      'Understand student university interests and trends at a glance. Advanced analytics are on paid and VIP plans.',
    icon: BarChart3
  },
  {
    name: 'Student Overview',
    description: "See each linked student's profile, matches and saved programs.",
    icon: Users
  },
  {
    name: 'Student Invitations',
    description: "Invite students by email and see who hasn't accepted yet.",
    icon: Mail
  },
  {
    name: 'Data Export',
    description: 'Export your student list as a CSV (paid or VIP plan).',
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
            The coordinator portal gives you a view of your school&apos;s students and what
            they&apos;re exploring.
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
                <strong>Early adopter schools</strong> get full access at no cost. Any school can
                link up to 10 students for free.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
