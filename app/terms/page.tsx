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
  title: 'Terms of Service',
  description: 'Terms and conditions for using the IB Match university program matching platform.'
}

// Hardcoded fallback content (used when CMS content is not available)
const FALLBACK_CONTENT = `# Terms of Service

## 1. Agreement to Terms

By accessing or using IB Match ("the Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you may not access the Service.

These Terms apply to all visitors, users, and others who access or use the Service.

## 2. Description of Service

IB Match is a university program matching platform designed for International Baccalaureate (IB) students. The Service provides:

- Program matching based on your academic profile and preferences
- University program search and discovery tools
- Program saving and comparison features
- Information about university programs and requirements

The Service is provided for informational purposes only. Match scores and recommendations are estimates and do not guarantee admission to any program.

## 3. User Eligibility

By using the Service, you represent and warrant that:

- You are at least 13 years of age
- You are capable of forming a binding contract
- You will provide accurate and complete information
- You will maintain the security of your account credentials

## 4. User Accounts

When you create an account, you are responsible for:

- Maintaining the confidentiality of your account credentials
- All activities that occur under your account
- Notifying us immediately of any unauthorized use

We reserve the right to suspend or terminate accounts that violate these Terms.

## 5. Acceptable Use

You agree not to:

- Use the Service for any illegal purpose
- Share your account with others
- Attempt to gain unauthorized access to any part of the Service
- Use automated means to access the Service without permission
- Interfere with or disrupt the Service
- Collect or harvest user data without consent

## 6. Intellectual Property

The Service and its original content, features, and functionality are owned by IB Match and are protected by international copyright, trademark, and other intellectual property laws.

## 7. User Content

By submitting content to the Service (such as your academic profile), you grant us a non-exclusive, worldwide, royalty-free license to use, store, and process that content solely for the purpose of providing the Service.

## 8. Privacy

Your use of the Service is also governed by our Privacy Policy. Please review our Privacy Policy to understand our practices.

## 9. Disclaimers

THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.

We do not warrant that:
- The Service will be uninterrupted or error-free
- Match scores or recommendations are accurate or guarantee admission
- Program information is complete or up-to-date

## 10. Limitation of Liability

IN NO EVENT SHALL IB MATCH BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SERVICE.

## 11. Changes to Terms

We reserve the right to modify these Terms at any time. We will notify users of significant changes via email or through the Service. Your continued use of the Service after such modifications constitutes acceptance of the updated Terms.

## 12. Termination

We may terminate or suspend your access to the Service immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to others or the Service.

## 13. Governing Law

These Terms shall be governed by and construed in accordance with the laws of the applicable jurisdiction, without regard to its conflict of law provisions.

## 14. Contact

If you have any questions about these Terms, please contact us:
- Email: legal@ibmatch.com
`

export default async function TermsOfServicePage() {
  const session = await auth()
  const isLoggedIn = !!session

  // Compute avatar values server-side
  const avatarColor = session ? getAvatarColor(session.user?.email) : ''
  const initial = session ? getAvatarInitial(session.user?.email, session.user?.name) : ''

  // Fetch content from CMS
  const cmsContent = await getPublishedDocument('TERMS_OF_SERVICE')

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
          <h1 className="mb-2 text-3xl font-bold">Terms of Service</h1>
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
