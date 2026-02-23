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

IB Match ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our university program matching and guidance platform.

This policy applies to all users of IB Match, including IB Students, IB Coordinators, University Agents, and Platform Administrators.

By using IB Match, you agree to the collection and use of information in accordance with this policy.

## 2. Information We Collect

### Information You Provide

The data we collect depends on your role on the platform:

- **All Users**: Email address, name (optional), avatar image (optional)
- **Students**: IB courses, predicted/actual scores, course levels (HL/SL), TOK and Extended Essay grades, field of study preferences, location preferences, saved programs
- **IB Coordinators**: School association, role within the school
- **University Agents**: University association, program management activity
- **Invitation Records**: When users invite others, we store the inviter's identity, the invitee's email, invitation status, and timestamp

### Information Collected Automatically

- **Usage Data**: Pages visited, features used, search queries
- **Device Information**: Browser type, device type, operating system
- **Log Data**: IP address, access times, referring URLs

### Payment Information

For schools with paid subscriptions, payments are processed by Stripe. We do not store credit card numbers or full payment details. We retain only Stripe customer and subscription identifiers to manage your subscription.

## 3. How We Use Your Information

We use your information to:

- Provide personalized program recommendations (students)
- Enable student management and university guidance tools (coordinators)
- Provide program analytics and recruitment insights (university agents)
- Manage platform operations and user accounts (administrators)
- Improve our matching algorithms
- Process subscription payments (Regular schools)
- Send important service updates and invitation emails
- Respond to your inquiries
- Analyze usage patterns to improve the Service
- Enforce our Terms of Service and prevent misuse

## 4. Data Sharing Between Roles

We do not sell your personal information. The following describes how data is shared between different user roles within the platform:

### 4.1. Coordinator Access to Student Data

IB Coordinators at a school can view and, where appropriate, edit academic data for students who are linked to their school. Specifically, coordinators may access:

- Student names and email addresses
- Academic profiles (IB courses, grades, levels, TOK/EE grades)
- Program match results and recommendations
- Saved programs

**Purpose limitation**: This access is strictly for providing university application guidance within the school context.

**Student control**: Students voluntarily link to a school. A student may unlink from a school at any time, which immediately revokes coordinator access to their data.

**Coordinator editing**: Coordinators may edit student academic data (courses, grades) for guidance purposes, with appropriate consent from the student or as part of the school's educational guidance process.

### 4.2. University Agent Access to Data

University Agents can view anonymized, aggregate statistics about students who match with their university's programs. This includes:

- Total match counts per program
- Field of study distribution of matched students
- Average predicted IB scores of matched students
- Geographic interest trends

University Agents cannot access individual student names, email addresses, or personal data.

### 4.3. Administrator Access

Platform Administrators have access to all platform data for operational, support, and compliance purposes.

## 5. External Data Sharing

We may share information with third parties only in the following circumstances:

- **Service Providers**: Third parties that help us operate the Service (see Section 10)
- **Legal Requirements**: When required by law or to protect our rights
- **Business Transfers**: In connection with a merger or acquisition

## 6. Cookies and Tracking

We use essential cookies for:

- Authentication and session management (all user roles)
- Security (CSRF protection)
- Remembering your preferences

For details, see our Cookie Policy.

## 7. Data Security

We implement appropriate security measures to protect your information, including:

- Encryption of data in transit (HTTPS/TLS)
- Role-based access controls ensuring users only access data permitted by their role
- Secure authentication (magic links, OAuth)
- Regular security reviews

## 8. Data Retention

- **Active accounts**: We retain your data for as long as your account is active or as needed to provide services.
- **Deleted accounts**: Upon account deletion, personal data is removed. Anonymized aggregate data may be retained.
- **School/university deletion**: When a deletion request is approved, all associated data is removed.
- **Invitation records**: Expired or declined invitation records are retained for 90 days for security purposes, then deleted.

You may request deletion of your data at any time.

## 9. Your Rights

Depending on your jurisdiction (including under GDPR), you have the right to:

- **Access** your personal data
- **Correct** inaccurate data
- **Delete** your account and data
- **Export** your data in a portable format
- **Withdraw** consent for non-essential data processing
- **Object** to processing based on legitimate interests

**For Students**: You may unlink from a school at any time to revoke coordinator access to your data, without deleting your account.

**For Coordinators and Agents**: You may request deletion of your associated school or university data through the platform. Such requests are reviewed by administrators.

To exercise your rights, contact us at privacy@ibmatch.com.

## 10. Data Processing Roles (GDPR)

### IB Match as Data Controller

IB Match acts as the data controller for user registration, operation of the matching algorithm, platform analytics, and direct communications with users.

### IB Match as Data Processor

When coordinators manage student data on behalf of their school, the school is the data controller and IB Match acts as a data processor. In this context, IB Match processes student data solely on the school's instructions.

### Sub-Processors

We use the following third-party service providers: Vercel (hosting), Stripe (payments), Resend (email), Algolia (search), and Upstash Redis (caching). All sub-processors are contractually bound to maintain appropriate security measures.

## 11. International Data Transfers

Your information may be transferred to and processed in countries other than your own. Where required, we ensure appropriate safeguards are in place, including Standard Contractual Clauses (SCCs) for transfers outside the EU/EEA.

## 12. Children's Privacy

The Service is intended for users 13 years and older. We do not knowingly collect information from children under 13.

## 13. Changes to This Policy

We may update this Privacy Policy from time to time. We will notify you of significant changes via email or through the Service.

## 14. Contact Us

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
