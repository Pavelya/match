'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FAQ {
  question: string
  answer: string
}

interface FAQAccordionProps {
  faqs: FAQ[]
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white">
      {faqs.map((faq, index) => (
        <div key={index}>
          <button
            onClick={() => toggleQuestion(index)}
            className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset"
            aria-expanded={openIndex === index}
            aria-controls={`faq-answer-${index}`}
          >
            <span className="text-base font-medium text-gray-900 pr-4">{faq.question}</span>
            <ChevronDown
              className={`h-5 w-5 flex-shrink-0 text-gray-400 transition-transform duration-200 ${
                openIndex === index ? 'rotate-180' : ''
              }`}
            />
          </button>
          <div
            id={`faq-answer-${index}`}
            className={`overflow-hidden transition-all duration-200 ease-in-out ${
              openIndex === index ? 'max-h-96' : 'max-h-0'
            }`}
          >
            <div className="px-6 pb-5 text-gray-600 leading-relaxed">{faq.answer}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
