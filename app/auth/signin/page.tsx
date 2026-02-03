'use client'

import { useState, Suspense } from 'react'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'
import { Info, AlertCircle } from 'lucide-react'

function SignInForm() {
  const searchParams = useSearchParams()
  const declineInvite = searchParams.get('declineInvite') === 'true'

  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const result = await signIn('resend', {
        email,
        callbackUrl: '/student',
        redirect: false
      })

      if (result?.error) {
        // Handle NextAuth errors
        setError('Unable to send magic link. Please try again.')
        setIsLoading(false)
      } else if (result?.url) {
        // Success - redirect to verify-request page
        window.location.href = result.url
      } else {
        // Fallback - redirect to verify-request
        window.location.href = '/auth/verify-request'
      }
    } catch {
      // Handle network/rate limit errors
      setError('Too many sign-in attempts. Please wait a moment and try again.')
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setError(null)
    try {
      await signIn('google', { callbackUrl: '/student' })
    } catch {
      setError('Too many sign-in attempts. Please wait a moment and try again.')
    }
  }

  return (
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
        <CardTitle className="text-2xl">
          {declineInvite ? 'Create Your Account' : 'Welcome to IB Match'}
        </CardTitle>
        <CardDescription>
          {declineInvite
            ? 'Create a regular account to use IB Match'
            : "Whether you're new or returning, we'll get you started"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Decline Invite Info Banner */}
        {declineInvite && (
          <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-50 border border-blue-100 mb-2">
            <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Creating a regular account</p>
              <p className="text-blue-700">
                Your account will not be linked to any school. You can still use IB Match to explore
                universities and track your program matches independently.
              </p>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-sm text-destructive">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Google OAuth - Following Google Branding Guidelines */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="flex w-full items-center justify-center gap-3 rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Sign in with Google
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or continue with email</span>
          </div>
        </div>

        {/* Magic Link */}
        <form onSubmit={handleMagicLink} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
            <p className="text-xs text-muted-foreground">
              No password needed—we&apos;ll email you a secure link that expires in 10 minutes.
            </p>
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
      </CardContent>
    </Card>
  )
}

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <Suspense
        fallback={
          <Card className="w-full max-w-md">
            <CardHeader className="space-y-1 text-center">
              <div className="mb-4 inline-flex justify-center">
                <div className="h-16 w-16 rounded-lg bg-muted animate-pulse" />
              </div>
              <div className="h-8 bg-muted rounded animate-pulse mb-2" />
              <div className="h-4 bg-muted rounded animate-pulse w-3/4 mx-auto" />
            </CardHeader>
          </Card>
        }
      >
        <SignInForm />
      </Suspense>
    </div>
  )
}
