'use client'

import { useState } from 'react'
import { Send, Lightbulb, ExternalLink } from 'lucide-react'

export function ProgramRequest() {
  const [programUrl, setProgramUrl] = useState('')
  const [details, setDetails] = useState('')

  const generateMailtoLink = () => {
    const subject = encodeURIComponent('New Program Submission Request')
    const body = encodeURIComponent(
      `Hi IB Match Team,

I'd like to suggest adding the following program to the platform:

Program URL: ${programUrl || '[Please add program URL]'}

Additional Details:
${details || '[Please add any additional details about the program]'}

Thank you for considering this request!`
    )
    return `mailto:admin@ibmatch.com?subject=${subject}&body=${body}`
  }

  return (
    <section className="bg-gray-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <Lightbulb className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="mt-4 text-base font-semibold leading-7 text-blue-600">Help Us Grow</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Suggest a Program
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Know a university program that should be on IB Match? Tell us about it! Your
              suggestion helps other IB students discover more opportunities.
            </p>
          </div>

          <div className="mt-10 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
            <div className="space-y-6">
              {/* Program URL field */}
              <div>
                <label
                  htmlFor="program-url"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Program URL <span className="text-gray-500">(required)</span>
                </label>
                <div className="mt-2">
                  <input
                    type="url"
                    id="program-url"
                    name="program-url"
                    placeholder="https://university.edu/program-page"
                    value={programUrl}
                    onChange={(e) => setProgramUrl(e.target.value)}
                    className="block w-full rounded-lg border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Link to the official program page on the university website
                </p>
              </div>

              {/* Details field */}
              <div>
                <label
                  htmlFor="details"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Additional Details <span className="text-gray-500">(optional)</span>
                </label>
                <div className="mt-2">
                  <textarea
                    id="details"
                    name="details"
                    rows={4}
                    placeholder="Program name, why you think it should be added, any IB requirements you know about..."
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    className="block w-full rounded-lg border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {/* Submit button */}
              <div>
                <a
                  href={generateMailtoLink()}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-200"
                >
                  <Send className="h-4 w-4" />
                  Open Email to Submit
                  <ExternalLink className="h-3 w-3 opacity-70" />
                </a>
                <p className="mt-3 text-center text-xs text-gray-500">
                  This will open your email client with a pre-filled message
                </p>
              </div>
            </div>

            {/* Community note */}
            <div className="mt-8 rounded-lg bg-blue-50 p-4">
              <p className="text-sm text-blue-800">
                <span className="font-semibold">🌟 Community-powered:</span> Many of our programs
                were added thanks to student suggestions. Your recommendation could help hundreds of
                other IB students find their perfect match!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
