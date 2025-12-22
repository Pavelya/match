/**
 * Student Footer Component
 *
 * Lightweight footer for all student pages.
 * Features:
 * - Navigation links matching brand design
 * - Dynamic year for copyright
 * - Minimal styling with light top border
 * - Responsive layout (stacks on mobile)
 */

import Link from 'next/link'

// Footer navigation links
const footerLinks = [
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/faqs', label: 'FAQs' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
  { href: '/for-coordinators', label: 'For Coordinators' }
]

export function StudentFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background mb-16 md:mb-0">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 md:h-14 gap-3 md:gap-0">
          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">© {currentYear} IB Match</p>
        </div>
      </div>
    </footer>
  )
}
