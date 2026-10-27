/**
 * Coordinator Sign-In Page
 *
 * Dedicated sign-in page for IB Coordinators.
 * - Magic link only (no Google OAuth)
 * - Every address gets the same outcome, the link and "Check your email", so the page says nothing
 *   about which addresses have accounts (SEC-5). The email is the student's or the coordinator's by
 *   role (lib/auth/config.ts), and a student who signs in here lands on their own Matches (proxy.ts)
 *
 * Part of Task 3.3: Coordinator Invitation System
 */

'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { AlertCircle, GraduationCap } from 'lucide-react'

/** The coordinator sign-in card. `logo` comes from the server, which knows the design (rebranding 1.3). */
export function CoordinatorSignIn({ logo }: { logo: React.ReactNode }) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // Proceed with magic link sign-in
      const result = await signIn('resend', {
        email: email.trim().toLowerCase(),
        callbackUrl: '/coordinator/dashboard',
        redirect: false
      })

      if (result?.error) {
        setError('Unable to send magic link. Please try again.')
        setIsLoading(false)
      } else if (result?.url) {
        // NextAuth returns an absolute URL that it decides itself, and for
        // other providers it can point off-origin, so it must go through the
        // browser rather than the router.
        window.location.href = result.url
      } else {
        router.push('/auth/verify-request')
      }
    } catch {
      // Handle network/rate limit errors
      setError('Too many sign-in attempts. Please wait a moment and try again.')
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <Link href="/" className="mb-4 inline-flex justify-center">
            {logo}
          </Link>
          <div className="flex items-center justify-center gap-2 mb-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary">IB Coordinator Portal</span>
          </div>
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>Sign in to manage your school and students</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Error display */}
          {error && (
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive flex items-start gap-2 text-sm">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Magic Link Form */}
          <form onSubmit={handleMagicLink} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="coordinator@school.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send magic link'}
            </Button>
          </form>

          <p className="text-center text-xs text-muted-foreground">
            By continuing, you agree to our{' '}
            <Link href="/terms" className="underline hover:text-foreground">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="underline hover:text-foreground">
              Privacy Policy
            </Link>
          </p>

          {/* Link to student sign-in */}
          <div className="pt-4 border-t text-center">
            <p className="text-sm text-muted-foreground">
              Are you a student?{' '}
              <Link href="/auth/signin" className="text-primary hover:underline font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
