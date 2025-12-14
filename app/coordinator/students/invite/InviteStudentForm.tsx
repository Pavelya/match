/**
 * Invite Student Form Component
 *
 * Client-side form for inviting students.
 * Calls the API and shows success/error messages.
 */

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FormSection } from '@/components/admin/shared'
import { Send, Loader2, CheckCircle2, AlertCircle, Info } from 'lucide-react'

interface InviteStudentFormProps {
  schoolName: string
  remainingInvites: number | null // null = unlimited
  hasFullAccess: boolean
}

export function InviteStudentForm({
  schoolName,
  remainingInvites,
  hasFullAccess
}: InviteStudentFormProps) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [studentName, setStudentName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch('/api/coordinator/students/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          studentName: studentName.trim() || undefined
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to send invitation')
      }

      setSuccess(`Invitation sent to ${email}`)
      setEmail('')
      setStudentName('')

      // Refresh the page after a short delay to show updated counts
      setTimeout(() => {
        router.refresh()
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <FormSection title="Student Email">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Remaining invites notice for freemium */}
        {!hasFullAccess && remainingInvites !== null && (
          <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-50 border border-blue-100">
            <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium">
                {remainingInvites} invitation{remainingInvites !== 1 ? 's' : ''} remaining
              </p>
              <p className="text-blue-700">
                Free accounts can invite up to 10 students.{' '}
                <a
                  href="/coordinator/settings/subscription"
                  className="underline font-medium hover:text-blue-900"
                >
                  Upgrade for unlimited invites
                </a>
              </p>
            </div>
          </div>
        )}

        {/* Email input */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
            placeholder="student@example.com"
            className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-50"
          />
          <p className="text-sm text-muted-foreground mt-2">
            The student will receive an email with an invitation link.
          </p>
        </div>

        {/* Optional student name */}
        <div>
          <label htmlFor="studentName" className="block text-sm font-medium mb-2">
            Student Name <span className="text-muted-foreground">(optional)</span>
          </label>
          <input
            type="text"
            id="studentName"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            disabled={isLoading}
            placeholder="John Doe"
            className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-50"
          />
          <p className="text-sm text-muted-foreground mt-2">
            This helps you identify the invitation in your pending list.
          </p>
        </div>

        {/* Consent notice */}
        <div className="p-4 rounded-lg bg-muted/50 border">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Important:</strong> The student must consent to
            coordinator access before their account is linked to {schoolName}. They will see a clear
            explanation of what data coordinators can access.
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="flex items-start gap-3 p-4 rounded-lg bg-red-50 border border-red-200">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Success message */}
        {success && (
          <div className="flex items-start gap-3 p-4 rounded-lg bg-green-50 border border-green-200">
            <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-green-700">
              <p className="font-medium">{success}</p>
              <p>The student will receive an email with instructions to accept.</p>
            </div>
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={isLoading || !email.trim()}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
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
      </form>
    </FormSection>
  )
}
