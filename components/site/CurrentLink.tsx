'use client'

import type { ComponentProps } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LinkPending } from '@/components/ds/LinkPending'
import { isCurrentPage, isInSection } from './nav'

interface CurrentLinkProps extends ComponentProps<typeof Link> {
  href: string
  /** `page`: current only on the page it goes to (footer). `section`: below it too (header). */
  match?: 'page' | 'section'
  section?: readonly string[]
}

/**
 * A link that says when it is the current page, with aria-current, which its classes style, and
 * keeps its pressed look while the page it opens loads (D1.6).
 */
export function CurrentLink({
  href,
  match = 'section',
  section,
  children,
  ...props
}: CurrentLinkProps) {
  const pathname = usePathname()
  const current =
    match === 'page' ? isCurrentPage(href, pathname) : isInSection({ href, section }, pathname)
  return (
    <Link href={href} aria-current={current ? 'page' : undefined} {...props}>
      {children}
      <LinkPending />
    </Link>
  )
}
