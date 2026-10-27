import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import Resend from 'next-auth/providers/resend'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { render } from '@react-email/components'
import { env } from '@/lib/env'
import { logger } from '@/lib/logger'
import { signInMessage } from '@/emails/magic-link'
import { coordinatorSignInMessage } from '@/emails/coordinator-magic-link'
import { prisma } from '@/lib/prisma'
import { SIGN_IN_LINK_MAX_AGE } from './sign-in-link'
import { readRoleAndMarkActive } from './last-active'

/** How long a role claim in the JWT is trusted before being re-read. */
const ROLE_REFRESH_MS = 5 * 60 * 1000

// The adapter types its argument as the `PrismaClient` from `@prisma/client`, which the
// `prisma-client` generator no longer fills (the client is in app/generated/prisma). It only
// calls the model delegates (`prisma.user`, `prisma.session`, …), which are the same.
type AdapterClient = Parameters<typeof PrismaAdapter>[0]

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma as unknown as AdapterClient),
  // Auth.js v5 does not read host trust from NEXTAUTH_URL (that is the v4
  // name); it auto-trusts only in development and on Vercel, so a production
  // build served anywhere else returned 500 on every /api/auth/* route unless
  // AUTH_TRUST_HOST was set. Trusting the host is safe here because the app is
  // only ever served from its own known hosts behind Vercel, never from a
  // proxy that forwards an attacker-controlled Host header.
  trustHost: true,
  providers: [
    // Email provider (Magic Links via Resend with custom template)
    Resend({
      apiKey: env.RESEND_API_KEY,
      from: env.EMAIL_FROM,
      // A link works for 10 minutes, as every text says (lib/auth/sign-in-link.ts)
      maxAge: SIGN_IN_LINK_MAX_AGE,
      async sendVerificationRequest({ identifier: email, url, provider }) {
        try {
          // Check if this email belongs to a coordinator (existing user or pending invitation)
          const [existingUser, pendingInvitation] = await Promise.all([
            prisma.user.findUnique({
              where: { email: email.toLowerCase() },
              select: { role: true }
            }),
            prisma.invitation.findFirst({
              where: {
                email: email.toLowerCase(),
                status: 'PENDING',
                role: 'COORDINATOR'
              }
            })
          ])

          const isCoordinator =
            existingUser?.role === 'COORDINATOR' ||
            existingUser?.role === 'PLATFORM_ADMIN' ||
            pendingInvitation !== null

          // The subject, HTML and plain text, in the design the emails are in (rebranding 4.7)
          const { subject, react, text } = (
            isCoordinator ? coordinatorSignInMessage : signInMessage
          )({ url })
          const html = await render(react)

          const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${provider.apiKey}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              from: provider.from,
              to: email,
              subject,
              html,
              text
            })
          })

          if (!response.ok) {
            const errorData = await response.json()
            throw new Error(`Resend error: ${JSON.stringify(errorData)}`)
          }
        } catch (error) {
          logger.error('Failed to send magic link email', {
            error: error instanceof Error ? error.message : 'Unknown error'
          })
          throw error
        }
      }
    }),
    // Google OAuth
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET
    })
  ],
  pages: {
    signIn: '/auth/signin',
    verifyRequest: '/auth/verify-request',
    error: '/auth/error'
  },
  session: {
    strategy: 'jwt',
    // Explicit rather than inherited. This was previously unset, which meant
    // the 30-day default applied by accident. Role changes no longer wait for
    // expiry - see the jwt callback below - so this is a session-length
    // preference, not a security control.
    maxAge: 30 * 24 * 60 * 60
  },
  callbacks: {
    async jwt({ token, user }) {
      // On initial sign-in, fetch and attach role to the token, and record the day (MAINT 7.6)
      if (user?.id) {
        token.role = (await readRoleAndMarkActive(user.id)) || 'STUDENT'
        token.roleCheckedAt = Date.now()
        return token
      }

      // Re-read the role periodically. Previously it was read only at sign-in,
      // so demoting an admin or deactivating a coordinator had no effect until
      // their token expired - up to 30 days. Falling back to STUDENT means a
      // deleted account loses its privileges rather than keeping them. The same read records the
      // day the user was active, written at most once a day (lib/auth/last-active.ts).
      const lastChecked = token.roleCheckedAt ?? 0
      if (token.sub && Date.now() - lastChecked > ROLE_REFRESH_MS) {
        token.role = (await readRoleAndMarkActive(token.sub)) || 'STUDENT'
        token.roleCheckedAt = Date.now()
      }

      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub as string
        session.user.role = token.role || 'STUDENT'
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // Allow relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`
      // Allow callback URLs on the same origin
      if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  },
  events: {
    async signIn({ user, account, isNewUser }) {
      // Record initial consent ONLY for NEW users who sign up
      // The sign-in page displays "By continuing, you agree to our Terms and Privacy Policy"
      // We only set versions for brand new users - existing users keep their accepted versions
      // When terms are updated, the ReconsentChecker will prompt users to re-accept
      if (isNewUser && (account?.provider === 'google' || account?.provider === 'resend')) {
        if (user.id) {
          try {
            // Check current published versions from the CMS
            const [termsDoc, privacyDoc] = await Promise.all([
              prisma.legalDocument.findUnique({
                where: { type: 'TERMS_OF_SERVICE' },
                include: { publishedVersion: { select: { versionLabel: true } } }
              }),
              prisma.legalDocument.findUnique({
                where: { type: 'PRIVACY_POLICY' },
                include: { publishedVersion: { select: { versionLabel: true } } }
              })
            ])

            const termsVersion = termsDoc?.publishedVersion?.versionLabel || null
            const privacyVersion = privacyDoc?.publishedVersion?.versionLabel || null

            // Only update if we have published versions
            if (termsVersion || privacyVersion) {
              await prisma.user.update({
                where: { id: user.id },
                data: {
                  ...(termsVersion && {
                    termsAcceptedAt: new Date(),
                    termsVersion
                  }),
                  ...(privacyVersion && {
                    privacyAcceptedAt: new Date(),
                    privacyPolicyVersion: privacyVersion
                  })
                }
              })
            }
          } catch (error) {
            // Log but don't fail - consent recording is non-blocking
            logger.error('Failed to record initial consent for new user', {
              userId: user.id?.slice(0, 8),
              error: error instanceof Error ? error.message : 'Unknown error'
            })
          }
        }
      }
    }
  }
})
