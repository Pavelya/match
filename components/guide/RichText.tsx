import type { ReactNode } from 'react'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { isInternalHref, parseRich, type RichNode } from '@/lib/guides/rich-text'
import { cn } from '@/lib/utils'

/*
 * A guide's rich text on the server (rebranding 4.2): bold at 600 in ink, italic, and links. A
 * link to another site opens in a new tab, says so to screen readers and carries Lucide's
 * ExternalLink, which never parts from the last word.
 */

export const linkClass =
  'rounded-chip font-medium text-primary underline underline-offset-3 transition-colors duration-180 ease-standard hover:text-brand-hover'

export function RichText({ text }: { text: string }) {
  return <Nodes nodes={parseRich(text)} />
}

function Nodes({ nodes }: { nodes: RichNode[] }) {
  return nodes.map((node, i) => <Node key={i} node={node} />)
}

function Node({ node }: { node: RichNode }) {
  if (typeof node === 'string') return node
  if (node.kind === 'bold') {
    return (
      <strong className="font-semibold text-foreground">
        <Nodes nodes={node.children} />
      </strong>
    )
  }
  if (node.kind === 'italic') {
    return (
      <em>
        <Nodes nodes={node.children} />
      </em>
    )
  }
  if (isInternalHref(node.href)) {
    return (
      <Link href={node.href} className={cn(linkClass, 'font-semibold')}>
        <Nodes nodes={node.children} />
      </Link>
    )
  }
  return <ExternalAnchor href={node.href} nodes={node.children} />
}

/** A link to another site, from its words as rich text or plain */
export function ExternalAnchor({
  href,
  nodes,
  label,
  className
}: {
  href: string
  nodes?: RichNode[]
  label?: string
  className?: string
}) {
  const words = nodes ?? [label ?? href]
  const last = words[words.length - 1]
  const icon = (
    <>
      <span className="sr-only"> (opens in a new tab)</span>
      <ExternalLink
        aria-hidden="true"
        size={14}
        strokeWidth={2}
        className="ml-1.25 inline-block align-[-2px]"
      />
    </>
  )
  // The icon holds on to the last word, so it never wraps onto a line of its own
  let tail: ReactNode = icon
  let head = words
  if (typeof last === 'string') {
    const cut = last.lastIndexOf(' ')
    head = [...words.slice(0, -1), last.slice(0, cut + 1)]
    tail = (
      <>
        {last.slice(cut + 1)}
        {icon}
      </>
    )
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cn(linkClass, className)}>
      <Nodes nodes={head} />
      <span className="whitespace-nowrap">{tail}</span>
    </a>
  )
}
