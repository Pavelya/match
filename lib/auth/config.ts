import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import Resend from 'next-auth/providers/resend'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import { render } from '@react-email/components'
import { env } from '@/lib/env'
import { logger } from '@/lib/logger'
import MagicLinkEmail from '@/emails/magic-link'
import CoordinatorMagicLinkEmail from '@/emails/coordinator-magic-link'

const prisma = new PrismaClient()

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    // Email provider (Magic Links via Resend with custom template)
    Resend({
      apiKey: env.RESEND_API_KEY,
      from: env.EMAIL_FROM,
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

          // Choose the appropriate email template
          const EmailTemplate = isCoordinator ? CoordinatorMagicLinkEmail : MagicLinkEmail
          const html = await render(EmailTemplate({ url }))

          const text = isCoordinator
            ? `Sign in to IB Match Coordinator Dashboard\n\nClick the link below to sign in:\n${url}\n\nThis link will expire in 10 minutes.\n\nIf you didn't request this, you can safely ignore this email.`
            : `Sign in to IB Match\n\nClick the link below to sign in:\n${url}\n\nThis link will expire in 10 minutes.\n\nIf you didn't request this, you can safely ignore this email.`

          const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${provider.apiKey}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              from: provider.from,
              to: email,
              subject: 'Sign in to IB Match',
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
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }) {
      // On initial sign-in, fetch and attach role to the token
      if (user?.id) {
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { role: true }
        })
        token.role = dbUser?.role || 'STUDENT'
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
