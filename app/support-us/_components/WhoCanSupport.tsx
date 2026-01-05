import Link from 'next/link'
import { GraduationCap, Users, Building2 } from 'lucide-react'

const audiences = [
  {
    title: 'Students',
    icon: GraduationCap,
    description:
      'We keep IB Match completely free for you. If the platform helped you find your path, consider buying us a coffee as a thank you!',
    cta: 'Every coffee counts ☕',
    color: 'bg-blue-50 border-blue-100 hover:border-blue-200',
    iconColor: 'text-blue-600',
    href: 'https://ko-fi.com/ibmatch',
    external: true
  },
  {
    title: 'IB Coordinators',
    icon: Users,
    description:
      'Your schools use our platform to guide students through university selection. Help us grow our database and build features that support your work.',
    cta: 'Schedule a call with us →',
    color: 'bg-green-50 border-green-100 hover:border-green-200',
    iconColor: 'text-green-600',
    href: 'https://calendly.com/ibmatch/feedback-call-with-ib-coordinator',
    external: true
  },
  {
    title: 'Universities',
    icon: Building2,
    description:
      'Invest in the next generation of students. Partner with us or sponsor development to help students discover your programs.',
    cta: 'Contact us for partnerships →',
    color: 'bg-purple-50 border-purple-100 hover:border-purple-200',
    iconColor: 'text-purple-600',
    href: 'mailto:universities@ibmatch.com',
    external: false
  }
]

export function WhoCanSupport() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">Who Can Help?</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Support Comes in Many Forms
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Whether you&apos;re a student who found your match, a coordinator guiding the next
            generation, or a university looking to connect with IB talent — there&apos;s a way for
            you to help.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
          {audiences.map((audience) => (
            <Link
              key={audience.title}
              href={audience.href}
              target={audience.external ? '_blank' : undefined}
              rel={audience.external ? 'noopener noreferrer' : undefined}
              className={`block rounded-2xl border p-8 ${audience.color} transition-all duration-200 hover:shadow-lg hover:-translate-y-1`}
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-lg bg-white shadow-sm ${audience.iconColor}`}
              >
                <audience.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">{audience.title}</h3>
              <p className="mt-4 text-base leading-7 text-gray-600">{audience.description}</p>
              <p className="mt-6 text-sm font-medium text-gray-900">{audience.cta}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
