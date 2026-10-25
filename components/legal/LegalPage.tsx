import Link from 'next/link'
import Markdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ChevronDown, Info, List } from 'lucide-react'
import { disclosureChevron } from '@/components/guide/QuestionsPanel'
import { ExternalAnchor } from '@/components/guide/RichText'
import { containerClass } from '@/components/site/styles'
import { legalSections } from '@/lib/legal/sections'
import { cn } from '@/lib/utils'

/*
 * The legal pages in the new design (rebranding 4.3, board "D4.14 Legal pages", approved 19
 * October 2026): Privacy, Terms and Cookies on one template, the guides' layout (D4.12). Links
 * between the three above the h1; the version and its date under it; "On this page" from the
 * document's own "##" headings, a sticky column from 1024px and a closed disclosure below; one
 * 720px column. The numbered headings are clauses read as a document, so they are Geist, not the
 * guides' serif. No lime band. The Markdown is rendered here, on the server, so the pages send no
 * JavaScript of their own, and from release day they are prebuilt (4.5): this branch never asks
 * for the session. The words are the owner's, from the admin's legal content (MAINT 7.4).
 */

export type LegalKind = 'privacy' | 'terms' | 'cookies'

const DOCUMENTS: Record<LegalKind, { title: string; href: string }> = {
  privacy: { title: 'Privacy policy', href: '/privacy' },
  terms: { title: 'Terms of service', href: '/terms' },
  cookies: { title: 'Cookie policy', href: '/cookies' }
}

const container = cn(containerClass, 'px-4 md:px-6')

interface LegalPageProps {
  kind: LegalKind
  markdown: string
  /** When it took effect: { iso: '2026-02-23', text: '23 February 2026' } */
  updated: { iso: string; text: string }
  /** The published version's label; none for the text in code */
  version: string | null
}

export function LegalPage({ kind, markdown, updated, version }: LegalPageProps) {
  const { opening, sections } = legalSections(markdown)
  return (
    // A quiet page: the header's season accessory hides on it (D1.7, app/globals.css)
    <main data-quiet="">
      <div className={cn(container, 'pt-6 md:pt-12')}>
        <header className="flex flex-col gap-4 pb-6 md:gap-5 md:pb-8">
          <nav aria-label="Legal" className="flex flex-wrap gap-2">
            {(Object.keys(DOCUMENTS) as LegalKind[]).map((key) => (
              <Link
                key={key}
                href={DOCUMENTS[key].href}
                aria-current={key === kind ? 'page' : undefined}
                className={cn(
                  'inline-flex min-h-9 items-center rounded-control border px-3 text-[0.9375rem] leading-5 whitespace-nowrap',
                  'transition-colors duration-180 ease-standard',
                  key === kind
                    ? 'border-line-3 bg-card font-semibold text-foreground dark:bg-border'
                    : 'border-border font-medium text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                {DOCUMENTS[key].title}
              </Link>
            ))}
          </nav>
          <h1 className="text-display-l">{DOCUMENTS[kind].title}</h1>
          <p className="text-body text-muted-foreground tabular-nums">
            Last updated <time dateTime={updated.iso}>{updated.text}</time>
            {version && ` · Version ${version}`}
          </p>
        </header>
      </div>

      <div
        className={cn(
          container,
          'pb-14 md:pb-18 lg:grid lg:grid-cols-[15.5rem_minmax(0,45rem)] lg:items-start lg:gap-x-12 xl:gap-x-20'
        )}
      >
        <div className="max-lg:hidden lg:self-stretch">
          <nav aria-labelledby="legal-contents" className="sticky top-24 flex flex-col gap-2.5">
            <h2 id="legal-contents" className="text-label text-ink-3">
              On this page
            </h2>
            <ol className="flex flex-col">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="-ml-3 flex min-h-9 items-center rounded-[0.5rem] px-3 py-1.5 text-body leading-5 text-muted-foreground transition-colors duration-180 ease-standard hover:bg-muted hover:text-foreground"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        <details className="group mb-2 rounded-card border border-border bg-card lg:hidden">
          <summary className="flex min-h-13 cursor-pointer list-none items-center gap-3 rounded-card px-4 [&::-webkit-details-marker]:hidden">
            <List aria-hidden="true" size={20} className="shrink-0 text-muted-foreground" />
            <span className="flex-1 text-body font-semibold">On this page</span>
            <span className="text-small font-normal text-muted-foreground tabular-nums">
              {sections.length} sections
            </span>
            <ChevronDown
              aria-hidden="true"
              size={20}
              strokeWidth={2}
              className={disclosureChevron}
            />
          </summary>
          <nav aria-label="On this page" className="border-t border-border">
            <ol>
              {sections.map((section) => (
                <li key={section.id} className="not-first:border-t not-first:border-border">
                  <a
                    href={`#${section.id}`}
                    className="flex min-h-11 items-center px-4 py-2.5 text-body leading-5 text-foreground"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </details>

        <article className="min-w-0 lg:border-t lg:border-border">
          {opening && (
            <div className="flex flex-col gap-4 pt-8 md:pt-10">
              <LegalMarkdown markdown={opening} />
            </div>
          )}
          {sections.map((section, i) => (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-heading`}
              className={cn(
                'content-section flex scroll-mt-14 flex-col gap-4 pt-8 pb-9 md:scroll-mt-16 md:pt-10 md:pb-11',
                (i > 0 || opening) && 'border-t border-border'
              )}
            >
              <h2 id={`${section.id}-heading`} className="text-h2">
                {section.title}
              </h2>
              <LegalMarkdown markdown={section.body} />
            </section>
          ))}
        </article>
      </div>
    </main>
  )
}

const list = 'flex flex-col gap-2 pl-5.5 text-body-l marker:text-ink-3 [&>li]:pl-0.5'

/** A section's body: Body L, plain bullets, the tables as D4.12's, a quote as a note */
function LegalMarkdown({ markdown }: { markdown: string }) {
  const captions = tableCaptions(markdown)
  let table = 0

  const components: Components = {
    // The page has one h1, its own
    h1: ({ children }) => <h3 className="-mb-1 mt-2 text-h3">{children}</h3>,
    h3: ({ children }) => <h3 className="-mb-1 mt-2 text-h3">{children}</h3>,
    h4: ({ children }) => <h4 className="-mb-1 mt-1 text-body font-semibold">{children}</h4>,
    p: ({ children }) => <p className="text-body-l text-pretty">{children}</p>,
    ul: ({ children }) => <ul className={cn(list, 'list-disc')}>{children}</ul>,
    ol: ({ children }) => <ol className={cn(list, 'list-decimal')}>{children}</ol>,
    strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
    // The system's monospace: Geist Mono leaves with the new design (04 §2)
    code: ({ children }) => (
      <code className="font-[ui-monospace,SFMono-Regular,Menlo,Consolas,monospace] text-[0.9em]">
        {children}
      </code>
    ),
    a: ({ href = '', children }) => {
      if (href.startsWith('/')) {
        return (
          <Link
            href={href}
            className="rounded-chip font-semibold text-primary underline underline-offset-3 hover:text-brand-hover pressed:text-brand-ink pressed:underline"
          >
            {children}
          </Link>
        )
      }
      if (/^https?:/.test(href)) {
        return <ExternalAnchor href={href} label={String(children)} />
      }
      // mailto: a plain link
      return (
        <a
          href={href}
          className="rounded-chip font-medium text-primary underline underline-offset-3 hover:text-brand-hover pressed:text-brand-ink pressed:underline"
        >
          {children}
        </a>
      )
    },
    blockquote: ({ children }) => (
      <div
        role="note"
        aria-label="Note"
        className="grid grid-cols-[1.25rem_minmax(0,1fr)] items-start gap-x-3 rounded-card border border-transparent bg-muted px-4 py-3.5 md:px-5 md:py-4 [&_p]:text-body"
      >
        <Info
          aria-hidden="true"
          size={20}
          strokeWidth={2}
          className="mt-0.5 text-muted-foreground"
        />
        <div className="flex flex-col gap-2">{children}</div>
      </div>
    ),
    table: ({ children }) => {
      const caption = captions[table++]
      return (
        <div className="min-w-0 overflow-x-auto rounded-card border border-border bg-card">
          <table className="w-full border-collapse text-left">
            {caption && (
              <caption className="caption-top border-b border-border px-4 py-3.5 text-left text-body font-semibold">
                {caption}
              </caption>
            )}
            {children}
          </table>
        </div>
      )
    },
    th: ({ children, scope }) =>
      scope === 'row' ? (
        <th scope="row" className="px-4 py-3 align-top text-body font-semibold">
          {children}
        </th>
      ) : (
        <th
          scope="col"
          className="border-b border-border bg-muted px-4 py-3 text-label text-muted-foreground"
        >
          {children}
        </th>
      ),
    tr: ({ children }) => (
      <tr className="not-first:border-t not-first:border-border">{children}</tr>
    ),
    td: ({ children }) => <td className="px-4 py-3 align-top text-body">{children}</td>
  }

  return (
    <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rowHeaders]} components={components}>
      {markdown}
    </Markdown>
  )
}

/** Each table's caption: the last subheading above it ("Sub-Processors"), if there is one */
function tableCaptions(markdown: string): (string | undefined)[] {
  const captions: (string | undefined)[] = []
  let heading: string | undefined
  let inTable = false
  for (const line of markdown.split('\n')) {
    const subheading = /^#{3,6} (.+)/.exec(line)
    if (subheading) heading = subheading[1].trim()
    const row = line.trimStart().startsWith('|')
    if (row && !inTable) captions.push(heading)
    inTable = row
  }
  return captions
}

/** The first cell of each body row names the row: a row header, as D4.12's tables have */
function rowHeaders() {
  return (tree: TreeNode) => markRowHeaders(tree)
}

/** The little of a rehype tree this needs */
interface TreeNode {
  type: string
  tagName?: string
  properties?: Record<string, unknown>
  children?: TreeNode[]
}

function markRowHeaders(node: TreeNode) {
  for (const child of node.children ?? []) {
    if (child.type !== 'element') continue
    if (child.tagName !== 'tbody') {
      markRowHeaders(child)
      continue
    }
    for (const row of child.children ?? []) {
      if (row.tagName !== 'tr') continue
      const first = row.children?.find((cell) => cell.type === 'element')
      if (first?.tagName === 'td') {
        first.tagName = 'th'
        first.properties = { ...first.properties, scope: 'row' }
      }
    }
  }
}

/** "23 February 2026", from the published version's date or the text in code's */
export function updatedOn(date: Date | string | null | undefined, fallbackIso: string) {
  const day = date ? new Date(date) : new Date(`${fallbackIso}T00:00:00Z`)
  return {
    iso: day.toISOString().slice(0, 10),
    text: day.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC'
    })
  }
}
