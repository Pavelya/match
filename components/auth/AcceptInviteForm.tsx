/**
 * Accept Invite Form Component
 *
 * Client component for accepting coordinator invitations.
 * Collects coordinator name and creates account.
 *
 * Uses Lucide React icons (per icons-reference.md)
 * Part of Task 3.3: Coordinator Invitation System
 */

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  User,
  GraduationCap,
  MapPin,
  Crown,
  Users,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Mail
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface School {
  id: string
  name: string
  city: string
  tier: 'VIP' | 'REGULAR'
  countryName: string
  countryFlag: string
}

interface AcceptInviteFormProps {
  token: string
  email: string
  school: School | null
}

export function AcceptInviteForm({ token, email, school }: AcceptInviteFormProps) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [accepting, setAccepting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setAccepting(true)
    setError(null)

    if (!name.trim()) {
      setError('Please enter your name')
      setAccepting(false)
      return
    }

    try {
      const res = await fetch('/api/auth/accept-invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          name: name.trim()
        })
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to accept invitation')
      }

      setSuccess(true)

      // Redirect to coordinator sign-in after 2 seconds
      setTimeout(() => {
        router.push('/auth/coordinator')
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to accept invitation')
    } finally {
      setAccepting(false)
    }
  }

  if (success) {
    return (
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Welcome to IB Match!</h1>
        <p className="text-muted-foreground mb-4">
          Your coordinator account has been created successfully.
        </p>
        <p className="text-sm text-muted-foreground">Redirecting to sign in...</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground mb-2">Accept Invitation</h1>
        <p className="text-muted-foreground">Complete your coordinator account setup</p>
      </div>

      {/* Error display */}
      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive flex items-center gap-2 text-sm">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      {/* School Info */}
      {school && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            School
          </label>
          <div className="rounded-lg border bg-muted/30 p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-medium text-foreground">{school.name}</div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{school.countryFlag}</span>
                  {school.city}, {school.countryName}
                </div>
              </div>
              <span
                className={cn(
                  'inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full',
                  school.tier === 'VIP'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-muted text-muted-foreground'
                )}
              >
                {school.tier === 'VIP' ? (
                  <Crown className="h-3 w-3" />
                ) : (
                  <Users className="h-3 w-3" />
                )}
                {school.tier}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Email (read-only) */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground flex items-center gap-2">
          <Mail className="h-4 w-4" />
          Email
        </label>
        <div className="px-4 py-2.5 border rounded-lg bg-muted/30 text-muted-foreground">
          {email}
        </div>
        <p className="text-xs text-muted-foreground">This will be your login email</p>
      </div>

      {/* Name Input */}
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-foreground flex items-center gap-2"
        >
          <User className="h-4 w-4" />
          Your Name <span className="text-destructive">*</span>
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2.5 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
          placeholder="Enter your full name"
          required
          disabled={accepting}
          autoFocus
        />
      </div>

      {/* Terms notice */}
      <p className="text-xs text-muted-foreground text-center">
        By accepting, you agree to our{' '}
        <a href="/terms" className="text-primary hover:underline">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="/privacy" className="text-primary hover:underline">
          Privacy Policy
        </a>
      </p>

      {/* Submit */}
      <button
        type="submit"
        disabled={accepting || !name.trim()}
        className={cn(
          'w-full flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-lg transition-colors',
          'bg-primary text-primary-foreground hover:bg-primary/90',
          (accepting || !name.trim()) && 'opacity-50 cursor-not-allowed'
        )}
      >
        {accepting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Creating Account...
          </>
        ) : (
          'Accept Invitation'
        )}
      </button>
    </form>
  )
}
