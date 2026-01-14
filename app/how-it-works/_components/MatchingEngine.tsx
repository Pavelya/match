import { Calculator, Target, TrendingUp, CheckCircle2 } from 'lucide-react'

const scoringFactors = [
  {
    name: 'Academic Match',
    weight: '60%',
    description: 'How well your IB points and subjects meet program requirements',
    icon: Calculator
  },
  {
    name: 'Location Match',
    weight: '30%',
    description: 'Whether the program is in one of your preferred countries',
    icon: Target
  },
  {
    name: 'Field Match',
    weight: '10%',
    description: 'Whether the program is in one of your preferred study areas',
    icon: TrendingUp
  }
]

const matchCategories = [
  {
    name: 'SAFETY',
    color: 'bg-green-100 text-green-800',
    description: 'Strong chance of admission'
  },
  { name: 'MATCH', color: 'bg-blue-100 text-blue-800', description: 'Good fit for your profile' },
  {
    name: 'REACH',
    color: 'bg-amber-100 text-amber-800',
    description: 'Aspirational but achievable'
  },
  { name: 'UNLIKELY', color: 'bg-gray-100 text-gray-800', description: 'Significant gaps exist' }
]

export function MatchingEngine() {
  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center mb-16">
          <h2 className="text-base font-semibold leading-7 text-blue-600">Matching Engine</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Three-Factor Compatibility Scoring
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Every program gets a compatibility score from 0 to 100%. We calculate this using a
            weighted formula that prioritizes what matters most: your academic fit.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Scoring Factors */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">How We Score</h3>
            <div className="space-y-6">
              {scoringFactors.map((factor) => (
                <div
                  key={factor.name}
                  className="relative rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
                      <factor.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-gray-900">{factor.name}</h4>
                        <span className="text-lg font-bold text-blue-600">{factor.weight}</span>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">{factor.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Match Categories & Details */}
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Match Categories</h3>
            <p className="text-gray-600 mb-6">
              Based on your score, we put each program in a category so you know what to expect:
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {matchCategories.map((category) => (
                <div key={category.name} className="text-center p-4 rounded-lg bg-gray-50">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${category.color}`}
                  >
                    {category.name}
                  </span>
                  <p className="mt-2 text-xs text-gray-600">{category.description}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl bg-blue-50 p-6">
              <h4 className="font-semibold text-gray-900 mb-3">What We Check</h4>
              <ul className="space-y-2">
                {[
                  'Total IB points vs minimum requirements',
                  'HL/SL subject matches with grade thresholds',
                  'Critical subject requirements (must-haves)',
                  'Near-miss detection for close matches'
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
