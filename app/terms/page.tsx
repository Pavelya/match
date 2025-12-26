import type { Metadata } from 'next'
import { PageContainer } from '@/components/layout/PageContainer'
import { StudentFooter } from '@/components/layout/StudentFooter'
import { StudentHeader } from '@/components/layout/StudentHeader'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'
import { auth } from '@/lib/auth/config'
import { getAvatarColor, getAvatarInitial } from '@/lib/avatar-utils'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms and conditions for using the IB Match university program matching platform.'
}

export default async function TermsOfServicePage() {
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
          <h1 className="mb-2 text-3xl font-bold">Terms of Service</h1>
          <p className="mb-8 text-muted-foreground">Last updated: {lastUpdated}</p>

          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-xl font-semibold">1. Agreement to Terms</h2>
              <p>
                By accessing or using IB Match (&quot;the Service&quot;), you agree to be bound by
                these Terms of Service (&quot;Terms&quot;). If you disagree with any part of these
                terms, you may not access the Service.
              </p>
              <p>
                These Terms apply to all visitors, users, and others who access or use the Service.
              </p>
            </section>

            {/* Description of Service */}
            <section>
              <h2 className="text-xl font-semibold">2. Description of Service</h2>
              <p>
                IB Match is a university program matching platform designed for International
                Baccalaureate (IB) students. The Service provides:
              </p>
              <ul className="list-disc pl-6">
                <li>Program matching based on your academic profile and preferences</li>
                <li>University program search and discovery tools</li>
                <li>Program saving and comparison features</li>
                <li>Information about university programs and requirements</li>
              </ul>
              <p className="mt-4">
                The Service is provided for informational purposes only. Match scores and
                recommendations are estimates and do not guarantee admission to any program.
              </p>
            </section>

            {/* User Eligibility */}
            <section>
              <h2 className="text-xl font-semibold">3. User Eligibility</h2>
              <p>By using the Service, you represent and warrant that:</p>
              <ul className="list-disc pl-6">
                <li>You are at least 16 years of age</li>
                <li>
                  If you are under 18, you have obtained parental or guardian consent to use the
                  Service
                </li>
                <li>You have the legal capacity to enter into these Terms</li>
                <li>You are not prohibited from using the Service under applicable laws</li>
              </ul>
            </section>

            {/* User Accounts */}
            <section>
              <h2 className="text-xl font-semibold">4. User Accounts</h2>
              <p>
                When you create an account, you agree to provide accurate, complete, and current
                information. You are responsible for:
              </p>
              <ul className="list-disc pl-6">
                <li>Maintaining the security of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized use of your account</li>
              </ul>
              <p className="mt-4">
                We reserve the right to suspend or terminate your account if you violate these Terms
                or engage in fraudulent, abusive, or illegal activity.
              </p>
            </section>

            {/* Acceptable Use */}
            <section>
              <h2 className="text-xl font-semibold">5. Acceptable Use</h2>
              <p>You agree NOT to:</p>
              <ul className="list-disc pl-6">
                <li>Provide false or misleading information about your academic credentials</li>
                <li>Use the Service for any illegal purpose</li>
                <li>Attempt to gain unauthorized access to the Service or its related systems</li>
                <li>Interfere with or disrupt the Service or servers</li>
                <li>
                  Use automated tools (bots, scrapers) to access the Service without our permission
                </li>
                <li>Reverse engineer, decompile, or disassemble any part of the Service</li>
                <li>
                  Share your account credentials with others or allow others to access your account
                </li>
                <li>Use the Service to harvest or collect user information</li>
              </ul>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="text-xl font-semibold">6. Intellectual Property</h2>
              <p>
                The Service and its original content, features, and functionality are owned by IB
                Match and are protected by international copyright, trademark, patent, trade secret,
                and other intellectual property laws.
              </p>
              <p className="mt-4">
                You retain ownership of any content you provide (such as your academic profile). By
                providing content, you grant us a non-exclusive, worldwide, royalty-free license to
                use, process, and display that content solely for the purpose of providing the
                Service.
              </p>
            </section>

            {/* Third-Party Content */}
            <section>
              <h2 className="text-xl font-semibold">7. Third-Party Content</h2>
              <p>
                The Service may display information about universities and programs sourced from
                third parties. We make reasonable efforts to ensure accuracy but:
              </p>
              <ul className="list-disc pl-6">
                <li>
                  We do not guarantee the accuracy, completeness, or timeliness of this information
                </li>
                <li>Program requirements and details may change without notice</li>
                <li>
                  You should verify all information directly with the relevant university before
                  making decisions
                </li>
              </ul>
            </section>

            {/* Disclaimer of Warranties */}
            <section>
              <h2 className="text-xl font-semibold">8. Disclaimer of Warranties</h2>
              <p>
                THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT
                WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
              </p>
              <ul className="list-disc pl-6">
                <li>Implied warranties of merchantability or fitness for a particular purpose</li>
                <li>Warranties that the Service will be uninterrupted, secure, or error-free</li>
                <li>Warranties regarding the accuracy of match scores or recommendations</li>
                <li>Warranties that you will be admitted to any university program</li>
              </ul>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="text-xl font-semibold">9. Limitation of Liability</h2>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, IB MATCH SHALL NOT BE LIABLE FOR ANY
                INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT
                LIMITED TO:
              </p>
              <ul className="list-disc pl-6">
                <li>Loss of profits, data, or opportunities</li>
                <li>Failure to gain admission to a university program</li>
                <li>Reliance on match scores or recommendations</li>
                <li>Unauthorized access to your account or data</li>
              </ul>
              <p className="mt-4">
                Our total liability for any claims arising from or related to the Service shall not
                exceed the amount you paid us (if any) in the 12 months preceding the claim.
              </p>
            </section>

            {/* Indemnification */}
            <section>
              <h2 className="text-xl font-semibold">10. Indemnification</h2>
              <p>
                You agree to indemnify, defend, and hold harmless IB Match and its officers,
                directors, employees, and agents from any claims, damages, losses, liabilities, and
                expenses (including legal fees) arising from:
              </p>
              <ul className="list-disc pl-6">
                <li>Your use of the Service</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any rights of another party</li>
                <li>Any content you provide through the Service</li>
              </ul>
            </section>

            {/* Termination */}
            <section>
              <h2 className="text-xl font-semibold">11. Termination</h2>
              <p>
                You may terminate your account at any time by contacting us or using the account
                deletion feature (when available).
              </p>
              <p className="mt-4">
                We may terminate or suspend your account immediately, without prior notice, for any
                reason, including if you breach these Terms. Upon termination:
              </p>
              <ul className="list-disc pl-6">
                <li>Your right to use the Service will immediately cease</li>
                <li>We may delete your account and all associated data</li>
                <li>Provisions that should survive termination will remain in effect</li>
              </ul>
            </section>

            {/* Changes to Terms */}
            <section>
              <h2 className="text-xl font-semibold">12. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. We will notify you of
                material changes by:
              </p>
              <ul className="list-disc pl-6">
                <li>Posting the updated Terms on this page</li>
                <li>Updating the &quot;Last updated&quot; date</li>
                <li>Sending you an email notification for significant changes</li>
              </ul>
              <p className="mt-4">
                Your continued use of the Service after changes constitutes acceptance of the
                updated Terms.
              </p>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="text-xl font-semibold">13. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the
                jurisdiction in which IB Match operates, without regard to conflict of law
                provisions.
              </p>
              <p className="mt-4">
                Any disputes arising from these Terms or your use of the Service shall be resolved
                through good-faith negotiation first. If negotiation fails, disputes shall be
                resolved through binding arbitration or in the courts of competent jurisdiction.
              </p>
            </section>

            {/* Severability */}
            <section>
              <h2 className="text-xl font-semibold">14. Severability</h2>
              <p>
                If any provision of these Terms is found to be unenforceable or invalid, that
                provision shall be limited or eliminated to the minimum extent necessary, and the
                remaining provisions shall remain in full force and effect.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-xl font-semibold">15. Contact Us</h2>
              <p>If you have any questions about these Terms, please contact us:</p>
              <ul className="list-disc pl-6">
                <li>
                  Email: <a href="mailto:legal@ibmatch.com">legal@ibmatch.com</a>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </PageContainer>
      <StudentFooter />
      {session && <MobileBottomNav />}
    </>
  )
}
