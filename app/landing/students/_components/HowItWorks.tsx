import { Compass, MapPin, GraduationCap } from 'lucide-react'

const steps = [
  {
    id: 1,
    title: 'Choose Your Fields',
    description: 'Select the study areas that interest you most — from Engineering to Arts.',
    icon: Compass
  },
  {
    id: 2,
    title: 'Set Your Locations',
    description: 'Pick the countries where you want to study. Go local or explore the world.',
    icon: MapPin
  },
  {
    id: 3,
    title: 'Add Your IB Profile',
    description:
      'Enter your predicted (or final) IB grades, courses, and levels. We will find your matches.',
    icon: GraduationCap
  }
]

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24 sm:py-32 bg-white"
      aria-labelledby="how-it-works-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center mb-16">
          <h2
            id="how-it-works-heading"
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Match in 3 Simple Steps
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Tell us about yourself and we will show you programs that fit your profile.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-12 left-10 right-10 h-0.5 bg-gray-200 -z-10" />

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.id}
                className="relative flex flex-col items-center text-center bg-white p-4"
              >
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-50 border-4 border-white shadow-lg mb-6">
                  <step.icon className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold leading-7 text-gray-900 mb-2">{step.title}</h3>
                <p className="text-base leading-7 text-gray-600 max-w-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
