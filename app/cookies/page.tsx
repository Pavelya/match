import type { Metadata } from 'next'
import { PageContainer } from '@/components/layout/PageContainer'
import { StudentFooter } from '@/components/layout/StudentFooter'
import { StudentHeader } from '@/components/layout/StudentHeader'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'
import { auth } from '@/lib/auth/config'
import { getAvatarColor, getAvatarInitial } from '@/lib/avatar-utils'
import { getPublishedDocument } from '@/lib/legal-documents'
import { MarkdownContent } from '@/components/shared/MarkdownContent'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Learn about how IB Match uses cookies and your privacy choices.'
}

// Hardcoded fallback content
const FALLBACK_CONTENT = `# Cookie Policy

## What Are Cookies?

Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences and provide a better experience.

This Cookie Policy applies to all users of IB Match, including IB Students, IB Coordinators, University Agents, and Platform Administrators. The same cookies are used regardless of your role on the platform.

## How We Use Cookies

### Essential Cookies (Always Active)

These cookies are necessary for the website to function and cannot be disabled:

- **Session Cookies** (\`next-auth.session-token\`): Keep you logged in while using the app
- **CSRF Protection** (\`next-auth.csrf-token\`): Protect against cross-site request forgery attacks
- **Callback URL** (\`next-auth.callback-url\`): Remember where to redirect you after login

### Analytics Cookies (Optional)

Currently, we do not use analytics cookies. If we add them in the future, they would help us understand how visitors use our site to improve the experience.

### Preference Cookies (Optional)

Currently not used. These would remember your settings and preferences across visits.

### Marketing Cookies (Optional)

Currently not used. These would be used for advertising and retargeting purposes.

## Your Cookie Choices

When you first visit IB Match, you'll see a cookie banner where you can:

- **Accept All**: Enable all cookie categories
- **Essential Only**: Use only the cookies required for the app to work
- **Customize**: Choose which categories to enable

You can change your preferences at any time by clearing your browser cookies and visiting the site again.

## How to Manage Cookies in Your Browser

Most browsers allow you to:

- View what cookies are stored
- Delete individual or all cookies
- Block cookies from specific sites
- Block all third-party cookies

Check your browser's help documentation for specific instructions.

## Contact Us

If you have questions about our use of cookies, please contact us at:
- Email: privacy@ibmatch.com

## Updates to This Policy

We may update this Cookie Policy from time to time. Changes will be posted on this page with an updated effective date.
`

export default async function CookiePolicyPage() {
  const session = await auth()
  const isLoggedIn = !!session

  // Compute avatar values server-side
  const avatarColor = session ? getAvatarColor(session.user?.email) : ''
  const initial = session ? getAvatarInitial(session.user?.email, session.user?.name) : ''

  // Fetch content from CMS
  const cmsContent = await getPublishedDocument('COOKIE_POLICY')

  // Use CMS content or fallback
  const content = cmsContent?.content || FALLBACK_CONTENT
  const lastUpdated = cmsContent?.effectiveDate
    ? new Date(cmsContent.effectiveDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'December 26, 2025'

  return (
    <>
      <StudentHeader
        isLoggedIn={isLoggedIn}
        user={
          session
            ? {
                image: session.user?.image,
                name: session.user?.name,
                avatarColor,
                initial
              }
            : null
        }
      />
      <PageContainer>
        <div className="mx-auto max-w-3xl py-12">
          <h1 className="mb-2 text-3xl font-bold">Cookie Policy</h1>
          <p className="mb-8 text-muted-foreground">Last updated: {lastUpdated}</p>

          <MarkdownContent content={content} />

          {cmsContent && (
            <p className="mt-8 pt-4 border-t text-sm text-muted-foreground">
              Version {cmsContent.versionLabel}
            </p>
          )}
        </div>
      </PageContainer>
      <StudentFooter />
      <MobileBottomNav isLoggedIn={isLoggedIn} />
    </>
  )
}
