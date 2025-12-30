/**
 * Coordinator Sign-In Page
 *
 * Dedicated sign-in page for IB Coordinators.
 * - Magic link only (no Google OAuth)
 * - Validates that email belongs to a coordinator
 * - Redirects students to student sign-in with friendly message
 *
 * Part of Task 3.3: Coordinator Invitation System
 */

'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'
import { AlertCircle, GraduationCap } from 'lucide-react'

export default function CoordinatorSignInPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isStudentEmail, setIsStudentEmail] = useState(false)

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setIsStudentEmail(false)

    try {
      // First, check if this email belongs to a coordinator
      const checkRes = await fetch('/api/auth/check-role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase() })
      })

      const checkData = await checkRes.json()

      if (checkRes.ok) {
        // Email found in system
        if (checkData.role === 'STUDENT') {
          // This is a student email - show friendly redirect
          setIsStudentEmail(true)
          setIsLoading(false)
          return
        } else if (checkData.role !== 'COORDINATOR' && checkData.role !== 'PLATFORM_ADMIN') {
          // Some other role that shouldn't use this page
          setError('This sign-in page is for IB Coordinators only.')
          setIsLoading(false)
          return
        }
        // COORDINATOR or PLATFORM_ADMIN - proceed with sign-in
      } else if (checkRes.status === 429) {
        // Rate limit exceeded
        setError('Too many sign-in attempts. Please wait a moment and try again.')
        setIsLoading(false)
        return
      } else if (checkRes.status === 404) {
        // Email not found - could be a new coordinator who hasn't accepted invite yet
        // Show error asking them to use the invitation link
        setError(
          'No coordinator account found with this email. Please use the invitation link sent to your email to create your account.'
        )
        setIsLoading(false)
        return
      }

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
        window.location.href = result.url
      } else {
        window.location.href = '/auth/verify-request'
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
            <Image
              src="/logo-restored.svg"
              alt="IB Match"
              width={64}
              height={64}
              className="rounded-lg"
            />
          </Link>
          <div className="flex items-center justify-center gap-2 mb-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary">IB Coordinator Portal</span>
          </div>
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>Sign in to manage your school and students</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Student email redirect notice */}
          {isStudentEmail && (
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-blue-800 mb-1">
                    This looks like a student account
                  </p>
                  <p className="text-sm text-blue-700 mb-3">
                    The email you entered is registered as a student account. Please use the student
                    sign-in page instead.
                  </p>
                  <Link
                    href="/auth/signin"
                    className="inline-flex items-center text-sm font-medium text-blue-700 hover:text-blue-800 underline"
                  >
                    Go to Student Sign In →
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Error display */}
          {error && !isStudentEmail && (
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive flex items-start gap-2 text-sm">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Magic Link Form */}
          {!isStudentEmail && (
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
          )}

          {/* Reset form if student email */}
          {isStudentEmail && (
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => {
                setIsStudentEmail(false)
                setEmail('')
              }}
            >
              Try a different email
            </Button>
          )}

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
