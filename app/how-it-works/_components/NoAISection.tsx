import { Calculator, CheckCircle2, Eye, ThumbsUp } from 'lucide-react'

const benefits = [
  {
    title: 'Deterministic Results',
    description: 'Same input always gives the same output. No randomness, no surprises.',
    icon: Calculator
  },
  {
    title: 'Fully Explainable',
    description: 'Every match can be explained step-by-step. See exactly why you got each score.',
    icon: Eye
  },
  {
    title: 'No Black Boxes',
    description: 'Our algorithm is rules-based, not a neural network. Predictable and trustworthy.',
    icon: CheckCircle2
  },
  {
    title: 'No Hallucinations',
    description: "AI can make things up. Math doesn't. Your matches are based on real data.",
    icon: ThumbsUp
  }
]

export function NoAISection() {
  return (
    <section className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 mb-4">
            <span className="font-mono">f(x) = result</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            No AI. Just Good Old-Fashioned Math.
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            While everyone&apos;s training LLMs and chasing the AI hype, we&apos;re doing something
            different: <span className="font-semibold">math that works</span>. Our matching
            algorithm is deterministic, transparent, and explainable.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md mb-4">
                <benefit.icon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-sm text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 mx-auto max-w-2xl">
          <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-200">
            <p className="text-center text-gray-700 italic">
              &ldquo;We believe students deserve to understand <em>why</em> they got matched with a
              program. Not &apos;the AI thinks so&apos; — but clear, logical reasons they can verify
              themselves.&rdquo;
            </p>
            <p className="text-center text-sm text-gray-500 mt-4">— The IB Match Team</p>
          </div>
        </div>
      </div>
    </section>
  )
}
