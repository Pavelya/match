import { Server, Shield, Zap, Globe, Database, Lock } from 'lucide-react'

const technologies = [
  {
    name: 'Next.js 16',
    description: 'Modern React framework for fast page loads and smooth navigation.',
    icon: Zap
  },
  {
    name: 'PostgreSQL',
    description: 'A widely used open-source database.',
    icon: Database
  },
  {
    name: 'Algolia Search',
    description: 'A widely used hosted search service that forgives typos.',
    icon: Server
  },
  {
    name: 'Redis Caching',
    description: 'Matches are cached, so coming back is quick.',
    icon: Zap
  },
  {
    name: 'Hosting',
    description: 'Hosted in Europe (Frankfurt), with pages delivered through a global network.',
    icon: Globe
  },
  {
    name: 'Your data',
    description: 'Your data is never sold. Download or delete it any time in Settings.',
    icon: Shield
  }
]

export function TechStack() {
  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center mb-16">
          <h2 className="text-base font-semibold leading-7 text-blue-600">Technology Stack</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Built with Widely Used Tools
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We build on widely used services and open-source tools, so pages stay quick and reliable
            for every student.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="relative rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                  <tech.icon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{tech.name}</h3>
                  <p className="mt-1 text-sm text-gray-600">{tech.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm text-green-700">
            <Lock className="h-4 w-4" />
            <span>
              Your account and profile are stored encrypted, and every connection uses HTTPS
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
