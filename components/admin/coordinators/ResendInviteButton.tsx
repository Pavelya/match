/**
 * Resend Invite Button Component
 *
 * Client component for resending pending invitations.
 * Part of Task 3.3: Coordinator Invitation System
 */

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Send, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ResendInviteButtonProps {
  invitationId: string
}

export function ResendInviteButton({ invitationId }: ResendInviteButtonProps) {
  const router = useRouter()
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleResend() {
    setSending(true)
    setError(null)
    setSuccess(false)

    try {
      const res = await fetch('/api/admin/invite/resend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ invitationId })
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to resend')
      }

      setSuccess(true)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resend')
    } finally {
      setSending(false)
    }
  }

  if (success) {
    return (
      <div className="flex items-center gap-2 text-green-600">
        <CheckCircle2 className="h-5 w-5" />
        <span className="text-sm font-medium">Invitation resent successfully!</span>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {error && <p className="text-sm text-destructive">{error}</p>}
      <button
        onClick={handleResend}
        disabled={sending}
        className={cn(
          'flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors',
          'bg-primary text-primary-foreground hover:bg-primary/90',
          sending && 'opacity-50 cursor-not-allowed'
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
            Resend Invitation
          </>
        )}
      </button>
    </div>
  )
}
