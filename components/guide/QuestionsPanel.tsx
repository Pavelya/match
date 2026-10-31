import type { ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

/*
 * Questions, collapsed, in one panel (rebranding 4.2, board "D4.12 Country guide", as on Explore's
 * D4.7): each a details element whose summary is the question as a heading, the answer in the
 * server HTML for the FAQPage JSON-LD and speakable selectors that describe it. The guides, the
 * requirements hub (D4.13) and the FAQs page (D4.14) share it. A server component.
 */

export const disclosureChevron =
  'shrink-0 text-muted-foreground transition-transform duration-180 ease-standard group-open:rotate-180'

export interface PanelQuestion {
  question: string
  answer: ReactNode
  /** Under the answer: a guide's source */
  after?: ReactNode
}

export function QuestionsPanel({
  items,
  heading: Heading = 'h3',
  questionClassName,
  className
}: {
  items: PanelQuestion[]
  /** h3 under a section's h2; h2 where the questions are the page (FAQs) */
  heading?: 'h2' | 'h3'
  /** FAQs' speakable selector, `faq-question` */
  questionClassName?: string
  className?: string
}) {
  return (
    <div className={cn('rounded-card border border-border bg-card', className)}>
      {items.map((item) => (
        <details key={item.question} className="group not-first:border-t not-first:border-border">
          <summary className="grid min-h-14 cursor-pointer list-none grid-cols-[minmax(0,1fr)_1.25rem] items-start gap-x-4 px-4 py-3.5 group-first:rounded-t-card focus-visible:outline-offset-[-2px] md:px-5 md:py-4 [&::-webkit-details-marker]:hidden">
            <Heading className={cn('text-h3', questionClassName)}>{item.question}</Heading>
            <ChevronDown
              aria-hidden="true"
              size={20}
              strokeWidth={2}
              className={cn('mt-0.5', disclosureChevron)}
            />
          </summary>
          <div className="flex flex-col gap-2.5 px-4 pb-4 group-open:disclose md:pr-14 md:pb-5 md:pl-5">
            <p className="faq-answer text-body-l">{item.answer}</p>
            {item.after}
          </div>
        </details>
      ))}
    </div>
  )
}
