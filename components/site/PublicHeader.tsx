import Link from 'next/link'
import { ButtonLink } from '@/components/ds/ButtonLink'
import { cn } from '@/lib/utils'
import { CurrentLink } from './CurrentLink'
import { PUBLIC_LINKS, SIGN_IN_HREF } from './nav'
import { SiteLogo } from './SiteLogo'
import { SiteMenu } from './SiteMenu'
import { headerClass, headerRowClass, navLinkClass } from './styles'

/**
 * The signed-out header (D2.12). Prebuilt public pages show it to everyone, because they never
 * read the session; nothing here calls auth(), cookies() or headers(). Every link is a public
 * page, and only "Sign in" and "Get my matches" lead to sign-in. Below 1024px the links move
 * into Menu; below 768px "Get my matches" does too.
 */
export function PublicHeader() {
  return (
    <header className={headerClass}>
      <div className={cn(headerRowClass, 'lg:gap-7')}>
        <SiteLogo href="/" label="IB Match home" className="mr-auto lg:mr-0" />
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {PUBLIC_LINKS.map((link) => (
            <CurrentLink
              key={link.href}
              href={link.href}
              section={link.section}
              className={navLinkClass}
            >
              {link.label}
            </CurrentLink>
          ))}
        </nav>
        <div className="flex items-center gap-0.5 md:gap-2 lg:ml-auto">
          <Link
            href={SIGN_IN_HREF}
            prefetch={false}
            className={cn(navLinkClass, 'h-11 text-foreground md:h-9')}
          >
            Sign in
          </Link>
          <ButtonLink
            href={SIGN_IN_HREF}
            prefetch={false}
            size="sm"
            className="hidden md:inline-flex"
          >
            Get my matches
          </ButtonLink>
          <SiteMenu className="lg:hidden" />
        </div>
      </div>
    </header>
  )
}
