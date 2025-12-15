/**
 * Invite Coordinator Form Component
 *
 * Client-side form for inviting coordinators.
 * Calls the API and shows success/error messages.
 */

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FormSection } from '@/components/admin/shared'
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'

interface InviteCoordinatorFormProps {
  schoolName: string
}

export function InviteCoordinatorForm({ schoolName }: InviteCoordinatorFormProps) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [coordinatorName, setCoordinatorName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch('/api/coordinator/team/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          coordinatorName: coordinatorName.trim() || undefined
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to send invitation')
      }

      setSuccess(`Invitation sent to ${email}`)
      setEmail('')
      setCoordinatorName('')

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
    <FormSection title="Coordinator Email">
      <form onSubmit={handleSubmit} className="space-y-6">
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
            placeholder="coordinator@example.com"
            className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-50"
          />
          <p className="text-sm text-muted-foreground mt-2">
            The coordinator will receive an email with an invitation link.
          </p>
        </div>

        {/* Optional coordinator name */}
        <div>
          <label htmlFor="coordinatorName" className="block text-sm font-medium mb-2">
            Coordinator Name <span className="text-muted-foreground">(optional)</span>
          </label>
          <input
            type="text"
            id="coordinatorName"
            value={coordinatorName}
            onChange={(e) => setCoordinatorName(e.target.value)}
            disabled={isLoading}
            placeholder="Jane Smith"
            className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-50"
          />
          <p className="text-sm text-muted-foreground mt-2">
            This helps identify the invitation in your pending list.
          </p>
        </div>

        {/* Permissions notice */}
        <div className="p-4 rounded-lg bg-muted/50 border">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Coordinator Access:</strong> New coordinators will
            have full access to view and edit student profiles at {schoolName}. They can also view
            analytics and invite other coordinators.
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
              <p>They will receive an email with instructions to join your team.</p>
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
