import { ChevronDown } from 'lucide-react'
import { EXPLORE_QUESTIONS } from '@/lib/explore/questions'

/**
 * The questions at the end of Explore (rebranding 2.3, board "D4.7 Explore"): the eight the
 * page's structured data answers, collapsed, in the server HTML, so what search engines read
 * is on the page (Definition of done 12).
 */
export function ExploreQuestions() {
  return (
    <section
      aria-labelledby="explore-questions"
      className="mt-6 flex max-w-[52.5rem] flex-col gap-2 md:mt-11 md:gap-3"
    >
      <h2 id="explore-questions" className="text-h2">
        Questions about Explore
      </h2>
      <div className="border-t border-border">
        {EXPLORE_QUESTIONS.map(({ question, answer }) => (
          <details key={question} className="group border-b border-border">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 rounded-chip py-2 text-[0.9375rem] leading-5 font-semibold md:gap-4 md:leading-6 [&::-webkit-details-marker]:hidden">
              {question}
              <ChevronDown
                aria-hidden="true"
                size={16}
                strokeWidth={2}
                className="shrink-0 text-muted-foreground transition-transform duration-180 ease-standard group-open:rotate-180"
              />
            </summary>
            <p className="mb-4 max-w-[72ch] text-body text-muted-foreground">{answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
