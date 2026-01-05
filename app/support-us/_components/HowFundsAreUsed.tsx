const fundCategories = [
  {
    name: 'Infrastructure',
    description: 'Hosting, databases, CDN',
    percentage: 60,
    color: 'bg-blue-500'
  },
  {
    name: 'Search & APIs',
    description: 'Algolia, matching engine',
    percentage: 20,
    color: 'bg-blue-400'
  },
  {
    name: 'Development',
    description: 'Features, improvements',
    percentage: 15,
    color: 'bg-blue-300'
  },
  {
    name: 'Growth',
    description: 'Outreach, new universities',
    percentage: 5,
    color: 'bg-blue-200'
  }
]

export function HowFundsAreUsed() {
  return (
    <section id="how-funds-are-used" className="bg-gray-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">Transparency</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Where Your Support Goes
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We believe in complete transparency. Here&apos;s how donations are allocated to keep IB
            Match running and growing.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-3xl">
          {/* Visual bar showing fund allocation */}
          <div className="mb-8 flex h-8 w-full overflow-hidden rounded-full">
            {fundCategories.map((category) => (
              <div
                key={category.name}
                className={`${category.color} flex items-center justify-center text-xs font-medium text-white`}
                style={{ width: `${category.percentage}%` }}
              >
                {category.percentage}%
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {fundCategories.map((category) => (
              <div key={category.name} className="flex flex-col">
                <div className="flex items-center gap-2">
                  <div className={`h-3 w-3 rounded-full ${category.color}`}></div>
                  <span className="text-sm font-semibold text-gray-900">{category.name}</span>
                </div>
                <p className="mt-1 text-sm text-gray-600">{category.description}</p>
                <p className="mt-1 text-lg font-bold text-gray-900">{category.percentage}%</p>
              </div>
            ))}
          </div>

          {/* Commitment note */}
          <div className="mt-12 rounded-xl bg-white p-6 ring-1 ring-gray-200">
            <p className="text-center text-sm text-gray-600">
              <span className="font-semibold text-gray-900">Our commitment:</span> We&apos;re a
              non-profit initiative. No salaries, no fancy offices — just students helping students.
              Every donation goes directly to keeping the platform alive and free.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
