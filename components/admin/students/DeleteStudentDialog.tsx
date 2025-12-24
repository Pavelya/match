/**
 * Delete Student Dialog Component
 *
 * Confirmation dialog for deleting a student account from admin.
 * Shows student info and warns about permanent deletion.
 */

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2, AlertTriangle, Loader2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface DeleteStudentDialogProps {
  studentId: string
  studentName: string | null
  studentEmail: string
  onDeleted?: () => void
  trigger?: React.ReactNode
}

export function DeleteStudentDialog({
  studentId,
  studentName,
  studentEmail,
  onDeleted,
  trigger
}: DeleteStudentDialogProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDelete = async () => {
    setIsDeleting(true)
    setError(null)

    try {
      const response = await fetch(`/api/admin/students/${studentId}`, {
        method: 'DELETE'
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete student')
      }

      setOpen(false)

      if (onDeleted) {
        onDeleted()
      } else {
        // Redirect to students list
        router.push('/admin/students')
        router.refresh()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="destructive" size="sm">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Account
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Delete Student Account
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. The student will receive an email notification about the
            deletion.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="rounded-lg bg-muted p-4 space-y-2">
            <div className="text-sm">
              <span className="text-muted-foreground">Name: </span>
              <span className="font-medium">{studentName || 'Unnamed Student'}</span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Email: </span>
              <span className="font-medium">{studentEmail}</span>
            </div>
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            <p className="font-medium text-foreground mb-2">The following will be deleted:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>User account and login credentials</li>
              <li>Student profile and IB course data</li>
              <li>Saved programs and preferences</li>
              <li>Support tickets</li>
            </ul>
          </div>

          {error && (
            <div className="mt-4 text-sm text-destructive bg-destructive/10 rounded-lg p-3">
              {error}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isDeleting}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Account
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
