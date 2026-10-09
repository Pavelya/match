import { BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AccountMenu, type AccountUser } from './AccountMenu'
import { CurrentLink } from './CurrentLink'
import { APP_LINKS, GUIDES_LINK } from './nav'
import { SiteLogo } from './SiteLogo'
import { headerClass, headerRowClass, navLinkClass } from './styles'

/**
 * The signed-in header (D2.12): Matches, Explore, Shortlist, Academic and Guides, then the
 * avatar and its account panel. From 768 to 1023px the wordmark hides so everything fits. On a
 * phone the tab bar carries the four places, and the header keeps Guides and the avatar.
 */
export function AppHeader({ user }: { user: AccountUser }) {
  return (
    <header className={headerClass}>
      <div className={cn(headerRowClass, 'md:gap-6 md:pr-4 lg:gap-7 lg:pr-6')}>
        <SiteLogo
          href="/student/matches"
          label="IB Match, your matches"
          wordmarkClassName="md:max-lg:hidden"
          className="mr-auto md:mr-0"
        />
        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {APP_LINKS.map((link) => (
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
        <CurrentLink
          href={GUIDES_LINK.href}
          section={GUIDES_LINK.section}
          className={cn(navLinkClass, 'h-11 text-foreground md:hidden')}
        >
          <BookOpen aria-hidden="true" size={18} strokeWidth={1.75} />
          {GUIDES_LINK.label}
        </CurrentLink>
        <AccountMenu user={user} className="ml-1.5 md:ml-auto" />
      </div>
    </header>
  )
}
