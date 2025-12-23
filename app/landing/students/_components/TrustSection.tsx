import { Heart } from 'lucide-react'

export function TrustSection() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {/* Founder note card */}
          <div className="relative rounded-2xl bg-gradient-to-br from-blue-50 to-white p-8 sm:p-10 ring-1 ring-inset ring-blue-100">
            <div className="absolute -top-4 left-8 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
              <Heart className="h-4 w-4" />
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">A Note from the Founder</h2>

            <div className="space-y-4 text-base leading-7 text-gray-600">
              <p>
                I built IB Match because I remember how overwhelming the university search was
                during my own IB years. Generic search tools didn&apos;t understand that my HL
                Physics meant something different than just &quot;Physics&quot;. I wanted to create
                the tool I wished I had.
              </p>
              <p>
                We&apos;re still growing our database and improving every day. If you don&apos;t
                find your perfect match yet, check back soon — or tell us which universities
                you&apos;d like to see added.
              </p>
            </div>

            <p className="mt-6 text-sm font-medium text-gray-900">— Tal, IB Diploma Graduate</p>
          </div>

          {/* Simple stats - honest numbers */}
          <div className="mt-12 grid grid-cols-2 gap-6 text-center">
            <div className="rounded-xl bg-gray-50 p-6">
              <p className="text-2xl font-bold text-gray-900">Growing Daily</p>
              <p className="mt-1 text-sm text-gray-600">New programs added regularly</p>
            </div>
            <div className="rounded-xl bg-gray-50 p-6">
              <p className="text-2xl font-bold text-gray-900">100% Free</p>
              <p className="mt-1 text-sm text-gray-600">Always free for students</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
