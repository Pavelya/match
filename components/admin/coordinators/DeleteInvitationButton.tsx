/**
 * Delete Invitation Button Component
 *
 * Button with confirmation modal for cancelling/deleting pending invitations.
 * Part of Task 3.3: Coordinator Invitation System
 */

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Trash2, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DeleteInvitationButtonProps {
  invitationId: string
  email: string
}

export function DeleteInvitationButton({ invitationId, email }: DeleteInvitationButtonProps) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showConfirm, setShowConfirm] = useState(false)

  async function handleDelete() {
    setDeleting(true)
    setError(null)

    try {
      const res = await fetch(`/api/admin/invite/${invitationId}`, {
        method: 'DELETE'
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to delete')
      }

      // Redirect to coordinators list
      router.push('/admin/coordinators')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete')
      setDeleting(false)
    }
  }

  if (showConfirm) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-red-800 mb-2">Cancel this invitation?</p>
            <p className="text-sm text-red-700 mb-3">
              This will permanently delete the invitation for <strong>{email}</strong>. They will no
              longer be able to use the invitation link.
            </p>
            {error && <p className="text-sm text-red-800 font-medium mb-3">{error}</p>}
            <div className="flex gap-2">
              <button
                onClick={handleDelete}
                disabled={deleting}
                className={cn(
                  'flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors',
                  'bg-red-600 text-white hover:bg-red-700',
                  deleting && 'opacity-50 cursor-not-allowed'
                )}
              >
                {deleting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4" />
                    Delete Invitation
                  </>
                )}
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                disabled={deleting}
                className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
    >
      <Trash2 className="h-4 w-4" />
      Delete Invitation
    </button>
  )
}
