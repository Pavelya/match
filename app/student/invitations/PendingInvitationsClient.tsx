/**
 * Pending Invitations Client Component
 *
 * Shows pending school invitations and allows students to accept or decline.
 * Includes consent information before accepting.
 */

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { School, Eye, Edit, Info, Loader2, CheckCircle2, X } from 'lucide-react'

interface Invitation {
  id: string
  token: string
  school: {
    id: string
    name: string
    logo: string | null
    city: string
    countryName: string
    countryFlag: string | null
  } | null
  coordinatorName: string | null
  expiresAt: string
  createdAt: string
}

interface PendingInvitationsClientProps {
  invitations: Invitation[]
}

export function PendingInvitationsClient({ invitations }: PendingInvitationsClientProps) {
  const router = useRouter()
  const [selectedInvitation, setSelectedInvitation] = useState<Invitation | null>(null)
  const [consentChecked, setConsentChecked] = useState(false)
  const [isAccepting, setIsAccepting] = useState(false)
  const [isDeclining, setIsDeclining] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAccept = async () => {
    if (!selectedInvitation || !consentChecked) return

    setIsAccepting(true)
    setError(null)

    try {
      const response = await fetch('/api/students/invitations/accept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ invitationId: selectedInvitation.id })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to accept invitation')
      }

      // Refresh and redirect to settings
      router.push('/student/settings')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
      setIsAccepting(false)
    }
  }

  const handleDecline = async (invitation: Invitation) => {
    setIsDeclining(true)
    setError(null)

    try {
      const response = await fetch('/api/students/invitations/decline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ invitationId: invitation.id })
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to decline invitation')
      }

      // Refresh to remove the invitation
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setIsDeclining(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  if (invitations.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <School className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No pending invitations</h3>
            <p className="text-muted-foreground">
              You don&apos;t have any school connection requests at the moment.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <div className="space-y-4">
        {invitations.map((invitation) => (
          <Card key={invitation.id}>
            <CardHeader>
              <div className="flex items-start gap-4">
                {invitation.school?.logo ? (
                  <Image
                    src={invitation.school.logo}
                    alt={invitation.school.name}
                    width={48}
                    height={48}
                    className="rounded-lg object-cover"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <School className="h-6 w-6" />
                  </div>
                )}
                <div className="flex-1">
                  <CardTitle className="text-lg">
                    {invitation.school?.name || 'Unknown School'}
                  </CardTitle>
                  <CardDescription>
                    {invitation.school?.countryFlag} {invitation.school?.city},{' '}
                    {invitation.school?.countryName}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {invitation.coordinatorName
                  ? `${invitation.coordinatorName} has invited you`
                  : 'A coordinator has invited you'}{' '}
                to connect your account with their school.
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                Invited on {formatDate(invitation.createdAt)} · Expires{' '}
                {formatDate(invitation.expiresAt)}
              </p>

              <div className="flex items-center gap-3">
                <Button onClick={() => setSelectedInvitation(invitation)}>Accept Invitation</Button>
                <Button
                  variant="outline"
                  onClick={() => handleDecline(invitation)}
                  disabled={isDeclining}
                >
                  {isDeclining ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <X className="h-4 w-4 mr-1" />
                      Decline
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Accept Invitation Dialog */}
      <Dialog
        open={!!selectedInvitation}
        onOpenChange={() => {
          setSelectedInvitation(null)
          setConsentChecked(false)
          setError(null)
        }}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              Connect with {selectedInvitation?.school?.name}
            </DialogTitle>
            <DialogDescription>
              By accepting this invitation, you allow coordinators at this school to access your
              data.
            </DialogDescription>
          </DialogHeader>

          {/* Consent Information */}
          <div className="rounded-lg border bg-blue-50 p-4">
            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Info className="h-4 w-4 text-primary" />
              What coordinators can access
            </h4>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2.5 text-sm">
                <Eye className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span>View your academic profile (courses, grades, TOK/EE)</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm">
                <Eye className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span>View your program matches and saved programs</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm">
                <Edit className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Help manage your academic data</span>
              </li>
            </ul>
          </div>

          {/* Consent Checkbox */}
          <label className="flex items-start gap-3 p-4 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors">
            <input
              type="checkbox"
              checked={consentChecked}
              onChange={(e) => setConsentChecked(e.target.checked)}
              className="mt-0.5 h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span className="text-sm">
              I understand and consent to <strong>{selectedInvitation?.school?.name}</strong>{' '}
              coordinators accessing my account data as described above.
            </span>
          </label>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
              {error}
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedInvitation(null)
                setConsentChecked(false)
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleAccept} disabled={!consentChecked || isAccepting}>
              {isAccepting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Connecting...
                </>
              ) : (
                'Accept & Connect'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
