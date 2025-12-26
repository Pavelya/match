import type { Metadata } from 'next'
import { PageContainer } from '@/components/layout/PageContainer'
import { StudentFooter } from '@/components/layout/StudentFooter'
import { StudentHeader } from '@/components/layout/StudentHeader'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'
import { auth } from '@/lib/auth/config'
import { getAvatarColor, getAvatarInitial } from '@/lib/avatar-utils'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how IB Match collects, uses, and protects your personal data.'
}

export default async function PrivacyPolicyPage() {
  const session = await auth()

  // Compute avatar values server-side
  const avatarColor = session ? getAvatarColor(session.user?.email) : ''
  const initial = session ? getAvatarInitial(session.user?.email, session.user?.name) : ''

  const lastUpdated = 'December 9, 2025'

  return (
    <>
      {session && (
        <StudentHeader
          user={{
            image: session.user?.image,
            name: session.user?.name,
            avatarColor,
            initial
          }}
        />
      )}
      <PageContainer>
        <div className="mx-auto max-w-3xl py-12">
          <h1 className="mb-2 text-3xl font-bold">Privacy Policy</h1>
          <p className="mb-8 text-muted-foreground">Last updated: {lastUpdated}</p>

          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-xl font-semibold">1. Introduction</h2>
              <p>
                IB Match (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to
                protecting your privacy. This Privacy Policy explains how we collect, use, disclose,
                and safeguard your information when you use our university program matching
                platform.
              </p>
              <p>
                By using IB Match, you agree to the collection and use of information in accordance
                with this policy. If you do not agree with our policies and practices, please do not
                use our services.
              </p>
            </section>

            {/* Data Controller */}
            <section>
              <h2 className="text-xl font-semibold">2. Data Controller</h2>
              <p>
                IB Match is the data controller responsible for your personal data. If you have any
                questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <ul className="list-disc pl-6">
                <li>
                  Email: <a href="mailto:privacy@ibmatch.com">privacy@ibmatch.com</a>
                </li>
              </ul>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-xl font-semibold">3. Information We Collect</h2>

              <h3 className="mt-4 font-medium">3.1 Information You Provide</h3>
              <ul className="list-disc pl-6">
                <li>
                  <strong>Account Information:</strong> Email address, name, and profile picture
                  (when using Google Sign-In)
                </li>
                <li>
                  <strong>Academic Profile:</strong> IB course selections, grades (1-7), TOK and EE
                  grades, total IB points
                </li>
                <li>
                  <strong>Preferences:</strong> Preferred fields of study, preferred countries for
                  university study
                </li>
                <li>
                  <strong>Saved Programs:</strong> University programs you save for later reference
                </li>
              </ul>

              <h3 className="mt-4 font-medium">3.2 Information Collected Automatically</h3>
              <ul className="list-disc pl-6">
                <li>
                  <strong>Usage Data:</strong> Pages visited, features used, search queries
                </li>
                <li>
                  <strong>Device Information:</strong> Browser type, IP address, device identifiers
                </li>
                <li>
                  <strong>Cookies:</strong> Session cookies for authentication (see Section 7)
                </li>
              </ul>
            </section>

            {/* How We Use Your Information */}
            <section>
              <h2 className="text-xl font-semibold">4. How We Use Your Information</h2>
              <p>We use your personal data for the following purposes:</p>
              <ul className="list-disc pl-6">
                <li>
                  <strong>Matching Services:</strong> To calculate compatibility scores between your
                  academic profile and university programs
                </li>
                <li>
                  <strong>Account Management:</strong> To create and maintain your account, and
                  authenticate your identity
                </li>
                <li>
                  <strong>Personalization:</strong> To remember your preferences and saved programs
                </li>
                <li>
                  <strong>Communication:</strong> To send you magic link emails for authentication
                  and important service updates
                </li>
                <li>
                  <strong>Service Improvement:</strong> To analyze usage patterns and improve our
                  platform
                </li>
              </ul>
            </section>

            {/* Legal Basis */}
            <section>
              <h2 className="text-xl font-semibold">5. Legal Basis for Processing (GDPR)</h2>
              <p>
                Under the General Data Protection Regulation (GDPR), we process your data based on:
              </p>
              <ul className="list-disc pl-6">
                <li>
                  <strong>Contract Performance:</strong> Processing necessary to provide our
                  matching services to you
                </li>
                <li>
                  <strong>Consent:</strong> Where you have given explicit consent (e.g., saving your
                  academic profile)
                </li>
                <li>
                  <strong>Legitimate Interests:</strong> For service improvement and security, where
                  such interests are not overridden by your rights
                </li>
              </ul>
            </section>

            {/* Data Sharing */}
            <section>
              <h2 className="text-xl font-semibold">6. Data Sharing and Third Parties</h2>
              <p>We share your data with the following third-party service providers:</p>
              <ul className="list-disc pl-6">
                <li>
                  <strong>Google (Authentication):</strong> For Google Sign-In functionality.
                  Subject to{' '}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google&apos;s Privacy Policy
                  </a>
                </li>
                <li>
                  <strong>Algolia (Search):</strong> Program search functionality. Data is
                  anonymized. Subject to{' '}
                  <a
                    href="https://www.algolia.com/policies/privacy/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Algolia&apos;s Privacy Policy
                  </a>
                </li>
                <li>
                  <strong>Upstash (Caching):</strong> For performance optimization. Subject to{' '}
                  <a href="https://upstash.com/privacy" target="_blank" rel="noopener noreferrer">
                    Upstash&apos;s Privacy Policy
                  </a>
                </li>
                <li>
                  <strong>Resend (Email):</strong> For sending magic link authentication emails.
                  Subject to{' '}
                  <a
                    href="https://resend.com/legal/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Resend&apos;s Privacy Policy
                  </a>
                </li>
              </ul>
              <p className="mt-4">
                We do not sell your personal data to third parties. We do not share your academic
                data with universities unless you explicitly request it.
              </p>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-xl font-semibold">7. Cookies</h2>
              <p>We use the following types of cookies:</p>
              <ul className="list-disc pl-6">
                <li>
                  <strong>Essential Cookies:</strong> Required for authentication and security.
                  These cannot be disabled.
                </li>
              </ul>
              <p className="mt-4">
                We do not use advertising or tracking cookies. Third-party analytics cookies are not
                currently used.
              </p>
            </section>

            {/* Data Retention */}
            <section>
              <h2 className="text-xl font-semibold">8. Data Retention</h2>
              <p>We retain your personal data for as long as your account is active, plus:</p>
              <ul className="list-disc pl-6">
                <li>
                  <strong>Account Data:</strong> Deleted within 30 days of account deletion request
                </li>
                <li>
                  <strong>Academic Profile:</strong> Deleted immediately upon account deletion
                </li>
                <li>
                  <strong>Usage Logs:</strong> Retained for up to 90 days for security purposes
                </li>
              </ul>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-xl font-semibold">9. Your Rights (GDPR)</h2>
              <p>Under GDPR, you have the following rights:</p>
              <ul className="list-disc pl-6">
                <li>
                  <strong>Right of Access:</strong> Request a copy of your personal data
                </li>
                <li>
                  <strong>Right to Rectification:</strong> Request correction of inaccurate data
                </li>
                <li>
                  <strong>Right to Erasure:</strong> Request deletion of your personal data
                </li>
                <li>
                  <strong>Right to Data Portability:</strong> Request your data in a structured,
                  machine-readable format
                </li>
                <li>
                  <strong>Right to Restrict Processing:</strong> Request limitation of data
                  processing
                </li>
                <li>
                  <strong>Right to Object:</strong> Object to processing based on legitimate
                  interests
                </li>
                <li>
                  <strong>Right to Withdraw Consent:</strong> Withdraw consent at any time where
                  processing is based on consent
                </li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us at{' '}
                <a href="mailto:privacy@ibmatch.com">privacy@ibmatch.com</a>. We will respond within
                30 days.
              </p>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="text-xl font-semibold">10. Data Security</h2>
              <p>We implement appropriate security measures including:</p>
              <ul className="list-disc pl-6">
                <li>Encryption of data in transit (HTTPS/TLS)</li>
                <li>Encryption of data at rest</li>
                <li>Regular security assessments</li>
                <li>Access controls and authentication</li>
                <li>Rate limiting to prevent abuse</li>
              </ul>
            </section>

            {/* International Transfers */}
            <section>
              <h2 className="text-xl font-semibold">11. International Data Transfers</h2>
              <p>
                Your data may be transferred to and processed in countries outside your country of
                residence. We ensure appropriate safeguards are in place, including:
              </p>
              <ul className="list-disc pl-6">
                <li>Standard Contractual Clauses approved by the European Commission</li>
                <li>Adequacy decisions where applicable</li>
              </ul>
            </section>

            {/* Children */}
            <section>
              <h2 className="text-xl font-semibold">12. Children&apos;s Privacy</h2>
              <p>
                IB Match is intended for IB students typically aged 16-19. We do not knowingly
                collect personal data from children under 13. If you are under 16, please obtain
                parental consent before using our services.
              </p>
            </section>

            {/* Changes */}
            <section>
              <h2 className="text-xl font-semibold">13. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any
                changes by posting the new Privacy Policy on this page and updating the &quot;Last
                updated&quot; date. Continued use of IB Match after changes constitutes acceptance
                of the updated policy.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-xl font-semibold">14. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or wish to exercise your rights,
                please contact us:
              </p>
              <ul className="list-disc pl-6">
                <li>
                  Email: <a href="mailto:privacy@ibmatch.com">privacy@ibmatch.com</a>
                </li>
              </ul>
              <p className="mt-4">
                You also have the right to lodge a complaint with your local data protection
                authority.
              </p>
            </section>
          </div>
        </div>
      </PageContainer>
      <StudentFooter />
      {session && <MobileBottomNav />}
    </>
  )
}
