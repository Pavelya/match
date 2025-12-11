/**
 * University Delete Button Component
 *
 * Client component for deleting universities with confirmation dialog.
 * Prevents deletion if university has programs or agents.
 */

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2, Loader2, AlertCircle, X } from 'lucide-react'

interface UniversityDeleteButtonProps {
  universityId: string
  universityName: string
  hasPrograms: boolean
  hasAgents: boolean
}

export function UniversityDeleteButton({
  universityId,
  universityName,
  hasPrograms,
  hasAgents
}: UniversityDeleteButtonProps) {
  const router = useRouter()
  const [showConfirm, setShowConfirm] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const canDelete = !hasPrograms && !hasAgents

  async function handleDelete() {
    setDeleting(true)
    setError(null)

    try {
      const res = await fetch(`/api/admin/universities/${universityId}`, {
        method: 'DELETE'
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to delete university')
      }

      setShowConfirm(false)
      router.push('/admin/universities')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete university')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        disabled={!canDelete}
        className={`p-2 rounded-lg transition-colors ${
          canDelete
            ? 'text-muted-foreground hover:text-destructive hover:bg-destructive/10'
            : 'text-muted-foreground/40 cursor-not-allowed'
        }`}
        title={canDelete ? 'Delete' : 'Cannot delete: university has programs or agents'}
      >
        <Trash2 className="h-4 w-4" />
      </button>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-background rounded-xl shadow-lg w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Delete University</h3>
              <button
                onClick={() => setShowConfirm(false)}
                className="p-2 hover:bg-muted rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-foreground mb-2">
              Are you sure you want to delete <strong>{universityName}</strong>?
            </p>
            <p className="text-sm text-muted-foreground mb-4">This action cannot be undone.</p>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors disabled:opacity-50"
              >
                {deleting && <Loader2 className="h-4 w-4 animate-spin" />}
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
