/**
 * Accept Student Invite Form Component
 *
 * Client-side form for accepting a student invitation.
 * Shows consent information and requires explicit checkbox confirmation
 * before account creation.
 *
 * Part of Task 4.4: Student Invitation System
 */

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { School, Check, Eye, Edit, FileText, Loader2 } from 'lucide-react'
import { SIGN_IN_TO_ACCEPT_HREF, acceptStudentInvite } from '@/lib/auth/accept-student-invite'

interface AcceptStudentInviteFormProps {
  token: string
  email: string
  school: {
    id: string
    name: string
    city: string
    countryName: string
    countryFlag: string | null
  }
  coordinatorName?: string | null
  /** From the server, which knows the design (rebranding 1.3) */
  logo: React.ReactNode
}

export function AcceptStudentInviteForm({
  token,
  email,
  school,
  coordinatorName,
  logo
}: AcceptStudentInviteFormProps) {
  const [consentChecked, setConsentChecked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<{
    text: string
    link?: { href: string; label: string }
  } | null>(null)

  const handleAccept = async () => {
    if (!consentChecked) return

    setIsLoading(true)
    setError(null)

    // The account, then the sign-in link to the invited address (MAINT 5.21 and 5.22)
    const outcome = await acceptStudentInvite(token, email)
    switch (outcome.kind) {
      case 'sent':
        // An address Auth.js decides, so through the browser rather than the router
        window.location.href = outcome.url
        return
      case 'not-sent':
        setError({
          text: `Your account is ready, but we couldn't send the sign-in link. Sign in with ${email} to continue.`,
          link: { href: '/auth/signin', label: 'Go to Sign In' }
        })
        break
      case 'exists':
        setError({
          text: `You already have an IB Match account with ${email}. Sign in, and the invitation will be waiting.`,
          link: { href: SIGN_IN_TO_ACCEPT_HREF, label: 'Sign in to accept it' }
        })
        break
      case 'try-later':
        setError({ text: 'Too many attempts. Please wait a moment and try again.' })
        break
      case 'failed':
        setError({ text: outcome.message || 'Failed to accept invitation. Please try again.' })
        break
    }
    setIsLoading(false)
  }

  return (
    <div>
      {/* Logo */}
      <div className="flex justify-center mb-6">{logo}</div>

      {/* Header */}
      <h1 className="text-2xl font-bold text-foreground text-center mb-2">Join {school.name}</h1>
      <p className="text-center text-muted-foreground mb-6">
        {coordinatorName ? `${coordinatorName} has` : 'Your coordinator has'} invited you to link
        your IB Match account to their school.
      </p>

      {/* School Info */}
      <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <School className="h-5 w-5" />
        </div>
        <div>
          <p className="font-medium text-foreground">{school.name}</p>
          <p className="text-sm text-muted-foreground">
            {school.countryFlag} {school.city}, {school.countryName}
          </p>
        </div>
      </div>

      {/* Consent Information */}
      <div className="rounded-lg border bg-blue-50 p-4 mb-6">
        <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <FileText className="h-4 w-4 text-primary" />
          What coordinators can access
        </h2>
        <p className="text-sm text-muted-foreground mb-3">
          By accepting this invitation, you allow coordinators at {school.name} to:
        </p>
        <ul className="space-y-2.5">
          <li className="flex items-start gap-2.5 text-sm">
            <Eye className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <span>View your academic profile (courses, grades, TOK/EE)</span>
          </li>
          <li className="flex items-start gap-2.5 text-sm">
            <Eye className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <span>View your program matches and saved programs</span>
          </li>
          <li className="flex items-start gap-2.5 text-sm">
            <Edit className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <span>Help manage your academic data</span>
          </li>
        </ul>
      </div>

      {/* Consent Checkbox */}
      <label className="flex items-start gap-3 p-4 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors mb-6">
        <input
          type="checkbox"
          checked={consentChecked}
          onChange={(e) => setConsentChecked(e.target.checked)}
          className="mt-0.5 h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
        />
        <span className="text-sm">
          I understand and consent to <strong>{school.name}</strong> coordinators accessing my
          account data as described above.
        </span>
      </label>

      {/* Error Message */}
      {error && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700 mb-4">
          {error.text}
          {error.link && (
            <>
              {' '}
              <Link href={error.link.href} className="font-medium underline">
                {error.link.label}
              </Link>
            </>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <button
        onClick={handleAccept}
        disabled={!consentChecked || isLoading}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Creating Account...
          </>
        ) : (
          <>
            <Check className="h-4 w-4" />
            Accept &amp; Create Account
          </>
        )}
      </button>

      {/* Decline Option */}
      <div className="mt-4 text-center">
        <p className="text-sm text-muted-foreground mb-2">Don&apos;t want to link your account?</p>
        <Link
          href="/auth/signin?declineInvite=true"
          className="text-sm text-primary hover:underline"
        >
          Create a regular account instead
        </Link>
      </div>

      {/* Account Info */}
      <div className="mt-6 pt-6 border-t text-center">
        <p className="text-sm text-muted-foreground">
          Your account will be created with: <strong>{email}</strong>
        </p>
      </div>
    </div>
  )
}
