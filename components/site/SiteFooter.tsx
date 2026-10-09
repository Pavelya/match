import { ThemeSwitch } from '@/components/ds/ThemeSwitch'
import { cn } from '@/lib/utils'
import { CurrentLink } from './CurrentLink'
import { FOOTER_GROUPS } from './nav'
import { SiteLogo } from './SiteLogo'
import { containerClass } from './styles'

const linkClass = [
  'self-start rounded-[0.25rem] text-body text-muted-foreground underline-offset-3 max-md:flex max-md:min-h-11 max-md:items-center',
  'transition-colors duration-180 ease-standard hover:text-foreground hover:underline active:text-foreground active:underline active:opacity-80',
  'aria-[current=page]:font-semibold aria-[current=page]:text-foreground'
].join(' ')

/**
 * One footer on every student-facing page, signed in or out (D2.13): the logo, three link groups
 * and Appearance. Rendered into the page's HTML, prebuilt pages included. The group names label
 * their navs and are not headings, so the footer adds nothing to a page's heading outline.
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div
        className={cn(
          containerClass,
          'flex flex-col gap-5 px-4 pt-7 pb-8 md:gap-9 md:px-6 md:pt-12 md:pb-7'
        )}
      >
        <div className="grid grid-cols-2 gap-x-4 gap-y-5 md:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))] md:gap-8">
          <div className="col-span-2 flex flex-col gap-1.5 md:col-span-1 md:gap-3">
            <SiteLogo href="/" label="IB Match home" size={26} className="self-start" />
            <p className="max-w-75 text-body text-muted-foreground">
              Discover university programs that match your IB profile.
            </p>
          </div>
          {FOOTER_GROUPS.map((group) => {
            const id = `footer-${group.label.toLowerCase()}`
            const legal = group.label === 'Legal'
            return (
              <nav
                key={group.label}
                aria-labelledby={id}
                className={cn('flex flex-col', legal && 'col-span-2 md:col-span-1')}
              >
                <span id={id} className="mb-1 text-label text-ink-3">
                  {group.label}
                </span>
                {/* Legal sits in one row on a phone; every group is a column from 768px */}
                <div className={cn('flex md:flex-col md:gap-2', legal ? 'gap-5' : 'flex-col')}>
                  {group.links.map((link) => (
                    <CurrentLink
                      key={link.href}
                      href={link.href}
                      match="page"
                      className={linkClass}
                    >
                      {link.label}
                    </CurrentLink>
                  ))}
                </div>
              </nav>
            )
          })}
        </div>
        <div className="flex flex-col gap-5 border-t border-border pt-4 md:flex-row-reverse md:items-center md:justify-between md:pt-5">
          <ThemeSwitch variant="icons" />
          {/* A prebuilt page keeps the year it was built in until the next build */}
          <p
            suppressHydrationWarning
            className="text-small font-normal text-muted-foreground tabular-nums"
          >
            © {new Date().getFullYear()} IB Match
          </p>
        </div>
      </div>
    </footer>
  )
}
