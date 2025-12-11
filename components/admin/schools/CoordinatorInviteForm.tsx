/**
 * Coordinator Invite Form Component
 *
 * Client component for inviting coordinators to a school.
 * Features:
 * - Email input with validation
 * - School context display (name, tier, location)
 * - Loading and error states
 * - Success message display
 *
 * Uses Lucide React icons (per icons-reference.md)
 * Part of Task 3.3: Coordinator Invitation System
 */

'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Mail,
  GraduationCap,
  Crown,
  Users,
  MapPin,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Send
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface School {
  id: string
  name: string
  subscriptionTier: 'VIP' | 'REGULAR'
  city: string
  countryName: string
  countryFlag: string
}

interface CoordinatorInviteFormProps {
  school: School
}

export function CoordinatorInviteForm({ school }: CoordinatorInviteFormProps) {
  const [email, setEmail] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    setError(null)
    setSuccess(false)

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      setSending(false)
      return
    }

    try {
      const res = await fetch('/api/admin/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          schoolId: school.id,
          role: 'COORDINATOR'
        })
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to send invitation')
      }

      setSuccess(true)
      setEmail('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send invitation')
    } finally {
      setSending(false)
    }
  }

  function handleSendAnother() {
    setSuccess(false)
    setEmail('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Back link */}
      <Link
        href={`/admin/schools/${school.id}`}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to School Details
      </Link>

      {/* Error display */}
      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive flex items-center gap-2">
          <AlertCircle className="h-5 w-5 shrink-0" />
          {error}
        </div>
      )}

      {/* Success display */}
      {success && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-green-700">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            <span className="font-medium">Invitation sent successfully!</span>
          </div>
          <p className="text-sm text-green-600 mb-3">
            The coordinator will receive an email with a link to create their account.
          </p>
          <button
            type="button"
            onClick={handleSendAnother}
            className="text-sm font-medium text-green-700 hover:text-green-800 underline"
          >
            Send another invitation
          </button>
        </div>
      )}

      {/* School Info Section */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            School
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            The coordinator will be linked to this school.
          </p>
        </div>

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
                school.subscriptionTier === 'VIP'
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-muted text-muted-foreground'
              )}
            >
              {school.subscriptionTier === 'VIP' ? (
                <Crown className="h-3 w-3" />
              ) : (
                <Users className="h-3 w-3" />
              )}
              {school.subscriptionTier}
            </span>
          </div>
        </div>
      </div>

      {/* Email Input Section */}
      {!success && (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Coordinator Email
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Enter the email address of the coordinator you want to invite.
            </p>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
              Email Address <span className="text-destructive">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                placeholder="coordinator@school.edu"
                required
                disabled={sending}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1.5">
              An invitation email will be sent with a secure link to create their account.
            </p>
          </div>
        </div>
      )}

      {/* Submit */}
      {!success && (
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Link
            href={`/admin/schools/${school.id}`}
            className="px-6 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={sending || !email.trim()}
            className={cn(
              'flex items-center gap-2 px-6 py-2.5 text-sm font-medium rounded-lg transition-colors',
              'bg-primary text-primary-foreground hover:bg-primary/90',
              (sending || !email.trim()) && 'opacity-50 cursor-not-allowed'
            )}
          >
            {sending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Send Invitation
              </>
            )}
          </button>
        </div>
      )}
    </form>
  )
}
