/**
 * Publish Confirmation Modal Component
 *
 * Modal dialog for confirming document publication.
 * Shows version info, effective date option, and confirm/cancel actions.
 */

'use client'

import { useState } from 'react'
import { Send, Calendar, AlertTriangle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog'

interface PublishConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (effectiveDate: Date) => Promise<void>
  documentTitle: string
  versionNumber: number
  versionLabel: string
  isPublishing: boolean
}

export function PublishConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  documentTitle,
  versionNumber,
  versionLabel,
  isPublishing
}: PublishConfirmModalProps) {
  const [effectiveNow, setEffectiveNow] = useState(true)
  const [scheduledDate, setScheduledDate] = useState(
    new Date().toISOString().slice(0, 16) // YYYY-MM-DDTHH:mm format
  )

  const handleConfirm = async () => {
    const effectiveDate = effectiveNow ? new Date() : new Date(scheduledDate)
    await onConfirm(effectiveDate)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Send className="h-5 w-5 text-primary" />
            Publish Document
          </DialogTitle>
          <DialogDescription>
            You are about to publish this document. This will make it visible to all users.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Version Info */}
          <div className="rounded-lg border bg-muted/50 p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Document</span>
              <span className="font-medium">{documentTitle}</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-muted-foreground">Version</span>
              <span className="font-medium">
                v{versionNumber} ({versionLabel})
              </span>
            </div>
          </div>

          {/* Effective Date Options */}
          <div className="space-y-3">
            <label className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              When should this take effect?
            </label>

            <div className="space-y-2">
              <label className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors">
                <input
                  type="radio"
                  name="effectiveDate"
                  checked={effectiveNow}
                  onChange={() => setEffectiveNow(true)}
                  className="h-4 w-4 text-primary"
                />
                <div>
                  <span className="font-medium">Immediately</span>
                  <p className="text-sm text-muted-foreground">
                    The document will be live as soon as you publish
                  </p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors">
                <input
                  type="radio"
                  name="effectiveDate"
                  checked={!effectiveNow}
                  onChange={() => setEffectiveNow(false)}
                  className="h-4 w-4 text-primary"
                />
                <div className="flex-1">
                  <span className="font-medium">Schedule for later</span>
                  <p className="text-sm text-muted-foreground mb-2">Set a future effective date</p>
                  {!effectiveNow && (
                    <input
                      type="datetime-local"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      min={new Date().toISOString().slice(0, 16)}
                      className="w-full px-3 py-2 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  )}
                </div>
              </label>
            </div>
          </div>

          {/* Warning */}
          <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-50 border border-amber-200">
            <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-sm text-amber-800">
              <p className="font-medium">Important</p>
              <p>
                Publishing will archive the current version and make this the active document. Users
                who have accepted previous versions may need to re-accept.
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isPublishing}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={isPublishing}>
            {isPublishing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Publishing...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Publish Now
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
