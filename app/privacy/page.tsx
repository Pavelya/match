import type { Metadata } from 'next'
import { PageContainer } from '@/components/layout/PageContainer'
import { StudentFooter } from '@/components/layout/StudentFooter'
import { StudentHeader } from '@/components/layout/StudentHeader'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'
import { auth } from '@/lib/auth/config'
import { getAvatarColor, getAvatarInitial } from '@/lib/avatar-utils'
import { getPublishedDocument } from '@/lib/legal-documents'
import { MarkdownContent } from '@/components/shared/MarkdownContent'

// ISR - page fetches CMS content and is cached for 1 hour
export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how IB Match collects, uses, and protects your personal data.'
}

// Hardcoded fallback content
const FALLBACK_CONTENT = `# Privacy Policy

## 1. Introduction

IB Match ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our university program matching platform.

By using IB Match, you agree to the collection and use of information in accordance with this policy.

## 2. Information We Collect

### Information You Provide

- **Account Information**: Email address, name (optional)
- **Academic Profile**: IB courses, predicted/actual scores, field of study preferences
- **Preferences**: Location preferences, language preferences, program interests

### Information Collected Automatically

- **Usage Data**: Pages visited, features used, search queries
- **Device Information**: Browser type, device type, operating system
- **Log Data**: IP address, access times, referring URLs

## 3. How We Use Your Information

We use your information to:

- Provide personalized program recommendations
- Improve our matching algorithms
- Send important service updates
- Respond to your inquiries
- Analyze usage patterns to improve the Service

## 4. Information Sharing

We do not sell your personal information. We may share information with:

- **Service Providers**: Third parties that help us operate the Service
- **Legal Requirements**: When required by law or to protect our rights
- **Business Transfers**: In connection with a merger or acquisition

## 5. Cookies and Tracking

We use essential cookies for:

- Authentication and session management
- Security (CSRF protection)
- Remembering your preferences

We do not currently use advertising or tracking cookies.

## 6. Data Security

We implement appropriate security measures to protect your information, including:

- Encryption of data in transit (HTTPS)
- Secure password hashing
- Access controls and authentication
- Regular security reviews

## 7. Data Retention

We retain your data for as long as your account is active or as needed to provide services. You may request deletion of your data at any time.

## 8. Your Rights

You have the right to:

- Access your personal data
- Correct inaccurate data
- Delete your account and data
- Export your data
- Withdraw consent

## 9. International Data Transfers

Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place.

## 10. Children's Privacy

The Service is intended for users 13 years and older. We do not knowingly collect information from children under 13.

## 11. Changes to This Policy

We may update this Privacy Policy from time to time. We will notify you of significant changes via email or through the Service.

## 12. Contact Us

If you have questions about this Privacy Policy, please contact us:
- Email: privacy@ibmatch.com
`

export default async function PrivacyPolicyPage() {
  const session = await auth()
  const isLoggedIn = !!session

  // Compute avatar values server-side
  const avatarColor = session ? getAvatarColor(session.user?.email) : ''
  const initial = session ? getAvatarInitial(session.user?.email, session.user?.name) : ''

  // Fetch content from CMS
  const cmsContent = await getPublishedDocument('PRIVACY_POLICY')

  // Use CMS content or fallback
  const content = cmsContent?.content || FALLBACK_CONTENT
  const lastUpdated = cmsContent?.effectiveDate
    ? new Date(cmsContent.effectiveDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'December 9, 2025'

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
          <h1 className="mb-2 text-3xl font-bold">Privacy Policy</h1>
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
