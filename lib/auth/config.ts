import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import Resend from 'next-auth/providers/resend'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import { env } from '@/lib/env'
import { logger } from '@/lib/logger'

const prisma = new PrismaClient()

// Current policy versions - update these when policies change
const CURRENT_TERMS_VERSION = '2025-12-09'
const CURRENT_PRIVACY_VERSION = '2025-12-09'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    // Email provider (Magic Links via Resend)
    Resend({
      apiKey: env.RESEND_API_KEY,
      from: env.EMAIL_FROM
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
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub as string
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // Allow relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`
      // Allow callback URLs on the same origin
      if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    async signIn({ user, account }) {
      // Only handle students (Google OAuth and email magic links)
      // Coordinators and agents use invitation-only flow (handled separately)

      if (account?.provider === 'google' || account?.provider === 'resend') {
        // Record consent on sign-in (user agreed by clicking sign-in button)
        // The sign-in page displays "By continuing, you agree to our Terms and Privacy Policy"
        if (user.id) {
          try {
            await prisma.user.update({
              where: { id: user.id },
              data: {
                termsAcceptedAt: new Date(),
                termsVersion: CURRENT_TERMS_VERSION,
                privacyAcceptedAt: new Date(),
                privacyPolicyVersion: CURRENT_PRIVACY_VERSION
              }
            })
          } catch {
            // Don't block sign-in if consent recording fails
            logger.error('Failed to record consent on sign-in', { userId: user.id?.slice(0, 8) })
          }
        }
        return true
      }

      return true
    }
  }
})
