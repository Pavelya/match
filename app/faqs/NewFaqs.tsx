import { CircleHelp } from 'lucide-react'
import { ButtonLink } from '@/components/ds/ButtonLink'
import { buttonVariants } from '@/components/ds/button-variants'
import { EmptyState } from '@/components/ds/EmptyState'
import { QuestionsPanel } from '@/components/guide/QuestionsPanel'
import { TextBody, TextHero } from '@/components/text-page/TextPage'

/*
 * FAQs in the new design (rebranding 4.3, boards "D4.14 Text pages" and "… · phone", approved 19
 * October 2026): one panel of questions, collapsed, as on the guides and Explore, then "Still have
 * questions?" as D2.11's panel. The questions come from page.tsx's one list, which its FAQPage
 * JSON-LD reads too; three answers change on release day, in the go-live pull request (#127), not
 * here. Prebuilt with today's hourly revalidate, and no JavaScript of its own.
 */
export function NewFaqs({
  faqs,
  updated
}: {
  faqs: { question: string; answer: string }[]
  /** "23 February 2026", when the FAQ document is published in the admin */
  updated: string | null
}) {
  return (
    <main>
      <TextHero
        title="Frequently asked questions"
        intro="Find answers to common questions about using IB Match."
      />
      <TextBody>
        <div className="flex max-w-210 flex-col gap-6 md:gap-8">
          <div className="flex flex-col gap-3">
            <QuestionsPanel items={faqs} heading="h2" questionClassName="faq-question" />
            {updated && (
              <p className="text-small font-normal text-muted-foreground">Last updated {updated}</p>
            )}
          </div>
          <EmptyState
            icon={CircleHelp}
            tone="brand"
            title="Still have questions?"
            live={false}
            actions={
              <>
                <ButtonLink href="/contact">Contact support</ButtonLink>
                <a
                  href="mailto:support@ibmatch.com"
                  className={buttonVariants({ variant: 'secondary' })}
                >
                  Email us
                </a>
              </>
            }
          >
            Can’t find the answer you’re looking for? Our support team is here to help.
          </EmptyState>
        </div>
      </TextBody>
    </main>
  )
}
