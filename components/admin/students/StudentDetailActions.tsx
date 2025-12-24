/**
 * Student Detail Actions Component (Client)
 *
 * Client-side actions for the student detail page,
 * including the delete student dialog.
 */

'use client'

import { AlertTriangle } from 'lucide-react'
import { DeleteStudentDialog } from './DeleteStudentDialog'
import { InfoCard } from '@/components/admin/shared'

interface StudentDetailActionsProps {
  studentId: string
  studentName: string | null
  studentEmail: string
}

export function StudentDetailActions({
  studentId,
  studentName,
  studentEmail
}: StudentDetailActionsProps) {
  return (
    <InfoCard title="Danger Zone" icon={AlertTriangle} className="border-destructive/30">
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Permanently delete this student account and all associated data. This action cannot be
          undone.
        </p>
        <DeleteStudentDialog
          studentId={studentId}
          studentName={studentName}
          studentEmail={studentEmail}
        />
      </div>
    </InfoCard>
  )
}
