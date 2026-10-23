import { Heart } from 'lucide-react'

export function CoordinatorStory() {
  return (
    <section className="bg-blue-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm">
            <Heart className="h-6 w-6" />
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">
            Started by a former IB student who understands your challenges
          </h2>

          <div className="space-y-6 text-lg leading-8 text-gray-600">
            <p>
              IB Match was started by Tal, an IB Diploma graduate who lived through the IB
              experience: the stress of predicting grades, the confusion of translating IB scores to
              university requirements, and the overwhelming task of finding the right programs. It
              is built together with Pavel.
            </p>
            <p>
              Now, as we build this platform, we keep both sides in mind: the student stress and
              your coordinator workload. Whether you&apos;re managing 25 or 80 IB students,
              providing quality individual university guidance is time-intensive work.
            </p>
            <p className="font-medium text-gray-900">
              That&apos;s why we want to build IB Match with coordinators as partners, not just
              users. We&apos;re looking for coordinators who will tell us what would help.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
