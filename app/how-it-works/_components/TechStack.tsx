import { Server, Shield, Zap, Globe, Database, Lock } from 'lucide-react'

const technologies = [
  {
    name: 'Next.js 16',
    description: 'Modern React framework for lightning-fast page loads and smooth navigation.',
    icon: Zap
  },
  {
    name: 'PostgreSQL',
    description: 'Enterprise-grade database trusted by companies like Instagram and Spotify.',
    icon: Database
  },
  {
    name: 'Algolia Search',
    description: 'Industry-leading search infrastructure — the same tech behind Stripe and Slack.',
    icon: Server
  },
  {
    name: 'Redis Caching',
    description: 'In-memory data store for instant results. Your matches load in milliseconds.',
    icon: Zap
  },
  {
    name: 'Global Edge Network',
    description: 'Deployed worldwide for low latency. Fast access wherever you are.',
    icon: Globe
  },
  {
    name: 'GDPR Compliant',
    description: 'Privacy-first design. Your data is encrypted, protected, and never sold.',
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
            Built with Industry-Leading Tools
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We use the same technologies trusted by the world&apos;s best companies. This means
            fast, reliable, and secure experiences for every student.
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
            <span>Your data is encrypted at rest and in transit</span>
          </div>
        </div>
      </div>
    </section>
  )
}
