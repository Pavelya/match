/**
 * Access Toggle Button Component
 *
 * Toggles coordinator access between active and revoked.
 * Part of Task 3.3: Coordinator Invitation System
 */

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, ShieldOff, ShieldCheck, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AccessToggleButtonProps {
  coordinatorId: string
  isActive: boolean
}

export function AccessToggleButton({ coordinatorId, isActive }: AccessToggleButtonProps) {
  const router = useRouter()
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showConfirm, setShowConfirm] = useState(false)

  async function handleToggle() {
    setUpdating(true)
    setError(null)

    try {
      const res = await fetch(`/api/admin/coordinators/${coordinatorId}/access`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !isActive })
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to update')
      }

      setShowConfirm(false)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update')
    } finally {
      setUpdating(false)
    }
  }

  if (showConfirm && isActive) {
    return (
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-800 mb-2">Revoke coordinator access?</p>
            <p className="text-sm text-amber-700 mb-4">
              This coordinator will no longer be able to access the coordinator dashboard. You can
              restore access later.
            </p>
            {error && <p className="text-sm text-destructive mb-3">{error}</p>}
            <div className="flex gap-2">
              <button
                onClick={handleToggle}
                disabled={updating}
                className={cn(
                  'flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors',
                  'bg-amber-600 text-white hover:bg-amber-700',
                  updating && 'opacity-50 cursor-not-allowed'
                )}
              >
                {updating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ShieldOff className="h-4 w-4" />
                )}
                Revoke Access
              </button>
              <button
                onClick={() => setShowConfirm(false)}
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
    <div className="space-y-2">
      {error && <p className="text-sm text-destructive">{error}</p>}
      <button
        onClick={() => (isActive ? setShowConfirm(true) : handleToggle())}
        disabled={updating}
        className={cn(
          'flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors',
          isActive
            ? 'border border-amber-300 text-amber-700 hover:bg-amber-50'
            : 'bg-green-600 text-white hover:bg-green-700',
          updating && 'opacity-50 cursor-not-allowed'
        )}
      >
        {updating ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {isActive ? 'Revoking...' : 'Restoring...'}
          </>
        ) : isActive ? (
          <>
            <ShieldOff className="h-4 w-4" />
            Revoke Access
          </>
        ) : (
          <>
            <ShieldCheck className="h-4 w-4" />
            Restore Access
          </>
        )}
      </button>
    </div>
  )
}
