/**
 * Program Copy Button Component
 *
 * Client component for copying programs with confirmation dialog.
 * Creates a server-side copy and redirects to the new program's detail page.
 */

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Copy, Loader2, AlertCircle, X } from 'lucide-react'

interface ProgramCopyButtonProps {
  programId: string
  programName: string
}

export function ProgramCopyButton({ programId, programName }: ProgramCopyButtonProps) {
  const router = useRouter()
  const [showConfirm, setShowConfirm] = useState(false)
  const [copying, setCopying] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleCopy() {
    setCopying(true)
    setError(null)

    try {
      const res = await fetch(`/api/admin/programs/${programId}/copy`, {
        method: 'POST'
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to copy program')
      }

      const { id } = await res.json()

      setShowConfirm(false)
      router.push(`/admin/programs/${id}`)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to copy program')
    } finally {
      setCopying(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium border rounded-lg hover:bg-muted transition-colors"
        title="Copy Program"
      >
        <Copy className="h-4 w-4" />
        Copy Program
      </button>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-background rounded-xl shadow-lg w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Copy Program</h3>
              <button
                onClick={() => setShowConfirm(false)}
                className="p-2 hover:bg-muted rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-foreground mb-2">
              Create a copy of <strong>{programName}</strong>?
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              This will duplicate all program details and IB course requirements. The copy will be
              named <strong>COPY_{programName}</strong> and you can edit it afterwards.
            </p>

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
                onClick={handleCopy}
                disabled={copying}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {copying && <Loader2 className="h-4 w-4 animate-spin" />}
                {copying ? 'Copying...' : 'Copy'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
