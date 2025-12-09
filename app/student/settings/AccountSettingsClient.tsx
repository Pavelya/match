/**
 * Account Settings Client Component
 *
 * Interactive client component for account settings.
 * Handles:
 * - Profile editing (name)
 * - Sign out
 * - Data export (placeholder for Task 2.2)
 * - Account deletion (placeholder for Task 2.1)
 */

'use client'

import { useState, useTransition } from 'react'
import { signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

interface AccountSettingsClientProps {
  user: {
    id: string
    email: string
    name: string | null
    image: string | null
    createdAt: string
  }
}

export function AccountSettingsClient({ user }: AccountSettingsClientProps) {
  const [isPending, startTransition] = useTransition()

  // Profile form state
  const [name, setName] = useState(user.name || '')
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState<{
    type: 'success' | 'error'
    text: string
  } | null>(null)

  // Data export state
  const [isExporting, setIsExporting] = useState(false)

  // Account deletion state
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [deleteConfirmText, setDeleteConfirmText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  // Format date for display
  const memberSince = new Date(user.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  // Handle profile save
  const handleSaveProfile = async () => {
    setIsSaving(true)
    setSaveMessage(null)

    try {
      const response = await fetch('/api/students/account/update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim() || null })
      })

      if (response.ok) {
        setSaveMessage({ type: 'success', text: 'Profile updated successfully!' })
      } else {
        const data = await response.json()
        setSaveMessage({ type: 'error', text: data.error || 'Failed to update profile' })
      }
    } catch {
      setSaveMessage({ type: 'error', text: 'An error occurred. Please try again.' })
    } finally {
      setIsSaving(false)
    }
  }

  // Handle sign out
  const handleSignOut = () => {
    startTransition(() => {
      signOut({ callbackUrl: '/' })
    })
  }

  // Handle data export
  const handleExportData = async () => {
    setIsExporting(true)

    try {
      const response = await fetch('/api/students/account/export')

      if (response.ok) {
        const data = await response.json()
        // Create and download JSON file
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `ibmatch-data-export-${new Date().toISOString().split('T')[0]}.json`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      } else {
        alert('Failed to export data. Please try again.')
      }
    } catch {
      alert('An error occurred. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  // Handle account deletion
  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== 'DELETE') return

    setIsDeleting(true)

    try {
      const response = await fetch('/api/students/account/delete', {
        method: 'DELETE'
      })

      if (response.ok) {
        // Sign out and redirect
        signOut({ callbackUrl: '/' })
      } else {
        const data = await response.json()
        alert(data.error || 'Failed to delete account')
        setIsDeleting(false)
      }
    } catch {
      alert('An error occurred. Please try again.')
      setIsDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Profile Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your personal information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Email - Read Only */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={user.email}
              disabled
              className="bg-muted cursor-not-allowed"
            />
            <p className="text-xs text-muted-foreground">
              Your email address cannot be changed. It is used for authentication.
            </p>
          </div>

          {/* Name - Editable */}
          <div className="space-y-2">
            <Label htmlFor="name">Display Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              maxLength={100}
            />
          </div>

          {/* Member Since */}
          <div className="space-y-2">
            <Label>Member Since</Label>
            <p className="text-sm text-muted-foreground">{memberSince}</p>
          </div>

          {/* Save Message */}
          {saveMessage && (
            <p
              className={`text-sm ${saveMessage.type === 'success' ? 'text-green-600' : 'text-red-600'}`}
            >
              {saveMessage.text}
            </p>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveProfile} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </CardFooter>
      </Card>

      {/* Session Card */}
      <Card>
        <CardHeader>
          <CardTitle>Session</CardTitle>
          <CardDescription>Manage your current session.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Signing out will end your current session. You can sign back in anytime using your email
            address.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" onClick={handleSignOut} disabled={isPending}>
            {isPending ? 'Signing out...' : 'Sign Out'}
          </Button>
        </CardFooter>
      </Card>

      {/* Data & Privacy Card */}
      <Card>
        <CardHeader>
          <CardTitle>Data & Privacy</CardTitle>
          <CardDescription>
            Manage your personal data. You have the right to access and delete your data.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Export Data */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">Export Your Data</h4>
              <p className="text-sm text-muted-foreground">
                Download a copy of all your personal data in JSON format.
              </p>
            </div>
            <Button variant="outline" onClick={handleExportData} disabled={isExporting}>
              {isExporting ? 'Exporting...' : 'Export Data'}
            </Button>
          </div>

          {/* Delete Account */}
          <div className="flex items-center justify-between p-4 border border-destructive/20 rounded-lg bg-destructive/5">
            <div>
              <h4 className="font-medium text-destructive">Delete Account</h4>
              <p className="text-sm text-muted-foreground">
                Permanently delete your account and all associated data.
              </p>
            </div>
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="destructive">Delete Account</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Account</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete your account and
                    remove all your data from our servers, including:
                  </DialogDescription>
                </DialogHeader>
                <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1">
                  <li>Your profile information</li>
                  <li>Your academic profile and grades</li>
                  <li>Your saved programs</li>
                  <li>Your preferences and settings</li>
                </ul>
                <div className="space-y-2 pt-4">
                  <Label htmlFor="delete-confirm">
                    Type <strong>DELETE</strong> to confirm
                  </Label>
                  <Input
                    id="delete-confirm"
                    type="text"
                    value={deleteConfirmText}
                    onChange={(e) => setDeleteConfirmText(e.target.value)}
                    placeholder="Type DELETE"
                  />
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleDeleteAccount}
                    disabled={deleteConfirmText !== 'DELETE' || isDeleting}
                  >
                    {isDeleting ? 'Deleting...' : 'Permanently Delete'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
