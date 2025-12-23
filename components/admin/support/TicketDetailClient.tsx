'use client'

/**
 * Ticket Detail Client Component
 *
 * Displays full ticket information and allows admins to:
 * - View ticket details
 * - Update status and priority
 * - Add response and resolve ticket
 */

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Clock,
  User,
  Building,
  Mail,
  AlertCircle,
  CheckCircle,
  Send,
  Loader2
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface TicketDetail {
  id: string
  ticketNumber: string
  category: string
  subject: string
  message: string
  status: string
  priority: string
  userRole: string
  adminResponse: string | null
  createdAt: string
  updatedAt: string
  resolvedAt: string | null
  user: {
    id: string
    email: string
    name: string | null
    role: string
    createdAt: string
  }
  school: {
    id: string
    name: string
    subscriptionTier: string
  } | null
  resolvedBy: {
    id: string
    name: string | null
    email: string
  } | null
}

interface TicketDetailClientProps {
  initialTicket: TicketDetail
}

// Category labels
const categoryLabels: Record<string, string> = {
  ACCOUNT_ISSUE: 'Account Issue',
  TECHNICAL_PROBLEM: 'Technical Problem',
  MATCHING_QUESTION: 'Matching Question',
  SUBSCRIPTION_BILLING: 'Subscription & Billing',
  DATA_PRIVACY: 'Data & Privacy',
  FEATURE_REQUEST: 'Feature Request',
  OTHER: 'General Inquiry'
}

// Status options
const statusOptions = [
  { value: 'OPEN', label: 'Open', color: 'bg-blue-100 text-blue-700' },
  { value: 'IN_PROGRESS', label: 'In Progress', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'RESOLVED', label: 'Resolved', color: 'bg-green-100 text-green-700' },
  { value: 'CLOSED', label: 'Closed', color: 'bg-gray-100 text-gray-700' }
]

// Priority options
const priorityOptions = [
  { value: 'LOW', label: 'Low', color: 'text-gray-500' },
  { value: 'NORMAL', label: 'Normal', color: 'text-blue-600' },
  { value: 'HIGH', label: 'High', color: 'text-orange-600' },
  { value: 'URGENT', label: 'Urgent', color: 'text-red-600' }
]

export function TicketDetailClient({ initialTicket }: TicketDetailClientProps) {
  const router = useRouter()
  const [ticket, setTicket] = useState(initialTicket)
  const [status, setStatus] = useState(ticket.status)
  const [priority, setPriority] = useState(ticket.priority)
  const [adminResponse, setAdminResponse] = useState(ticket.adminResponse || '')
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const isResolved = ticket.status === 'RESOLVED' || ticket.status === 'CLOSED'

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleSave = async (resolveTicket: boolean = false) => {
    if (resolveTicket && !adminResponse.trim()) {
      setSaveError('Please provide a response before resolving the ticket.')
      return
    }

    setIsSaving(true)
    setSaveError(null)
    setSaveSuccess(false)

    try {
      const updateData: { status?: string; priority?: string; adminResponse?: string } = {}

      if (priority !== ticket.priority) {
        updateData.priority = priority
      }

      if (resolveTicket) {
        updateData.status = 'RESOLVED'
        updateData.adminResponse = adminResponse.trim()
      } else if (status !== ticket.status) {
        updateData.status = status
      }

      if (Object.keys(updateData).length === 0) {
        setSaveSuccess(true)
        setTimeout(() => setSaveSuccess(false), 2000)
        setIsSaving(false)
        return
      }

      const response = await fetch(`/api/admin/support/${ticket.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      })

      const data = await response.json()

      if (response.ok) {
        setTicket(data)
        setStatus(data.status)
        setPriority(data.priority)
        setAdminResponse(data.adminResponse || '')
        setSaveSuccess(true)
        setTimeout(() => setSaveSuccess(false), 2000)
      } else {
        setSaveError(data.error || 'Failed to update ticket')
      }
    } catch {
      setSaveError('Network error. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => router.push('/admin/support')}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to tickets
      </button>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <p className="text-sm font-mono text-muted-foreground">{ticket.ticketNumber}</p>
          <h1 className="text-2xl font-bold text-foreground mt-1">{ticket.subject}</h1>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className="text-sm text-muted-foreground">
              {categoryLabels[ticket.category] || ticket.category}
            </span>
            <span className="text-muted-foreground">·</span>
            <span className="text-sm text-muted-foreground">
              Created {formatDate(ticket.createdAt)}
            </span>
          </div>
        </div>

        {/* Status and Priority Controls */}
        <div className="flex items-center gap-3">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            disabled={isResolved}
            className="px-3 py-1.5 rounded-md border border-input bg-background text-sm disabled:opacity-50"
          >
            {priorityOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            disabled={isResolved}
            className="px-3 py-1.5 rounded-md border border-input bg-background text-sm disabled:opacity-50"
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {!isResolved && (status !== ticket.status || priority !== ticket.priority) && (
            <button
              onClick={() => handleSave(false)}
              disabled={isSaving}
              className="px-4 py-1.5 rounded-md bg-muted hover:bg-muted/80 text-sm font-medium transition-colors"
            >
              Save
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Message */}
          <div className="rounded-xl border bg-card p-6">
            <h2 className="font-semibold text-foreground mb-4">Message</h2>
            <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-wrap">
              {ticket.message}
            </div>
          </div>

          {/* Existing Response */}
          {ticket.adminResponse && ticket.resolvedBy && (
            <div className="rounded-xl border bg-green-50 p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <h2 className="font-semibold text-green-800">Resolution</h2>
              </div>
              <div className="prose prose-sm max-w-none text-green-700 whitespace-pre-wrap mb-4">
                {ticket.adminResponse}
              </div>
              <p className="text-sm text-green-600">
                Resolved by {ticket.resolvedBy.name || ticket.resolvedBy.email}
                {ticket.resolvedAt && ` on ${formatDate(ticket.resolvedAt)}`}
              </p>
            </div>
          )}

          {/* Response Form */}
          {!isResolved && (
            <div className="rounded-xl border bg-card p-6">
              <h2 className="font-semibold text-foreground mb-4">Respond & Resolve</h2>

              {saveError && (
                <div className="rounded-lg bg-red-50 p-4 flex items-center gap-3 mb-4">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <p className="text-sm text-red-700">{saveError}</p>
                </div>
              )}

              {saveSuccess && (
                <div className="rounded-lg bg-green-50 p-4 flex items-center gap-3 mb-4">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <p className="text-sm text-green-700">Changes saved successfully</p>
                </div>
              )}

              <textarea
                value={adminResponse}
                onChange={(e) => setAdminResponse(e.target.value)}
                placeholder="Write your response to the user..."
                rows={6}
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none mb-4"
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => handleSave(true)}
                  disabled={isSaving || !adminResponse.trim()}
                  className={cn(
                    'inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-colors',
                    isSaving || !adminResponse.trim()
                      ? 'bg-muted text-muted-foreground cursor-not-allowed'
                      : 'bg-green-600 text-white hover:bg-green-500'
                  )}
                >
                  {isSaving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  Resolve Ticket
                </button>
              </div>

              <p className="text-sm text-muted-foreground mt-3">
                Resolving will send an email notification to the user with your response.
              </p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* User Info */}
          <div className="rounded-xl border bg-card p-6">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <User className="h-4 w-4" />
              User Details
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground">Name</p>
                <p className="font-medium">{ticket.user.name || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Email</p>
                <a
                  href={`mailto:${ticket.user.email}`}
                  className="font-medium text-primary hover:underline inline-flex items-center gap-1"
                >
                  <Mail className="h-3 w-3" />
                  {ticket.user.email}
                </a>
              </div>
              <div>
                <p className="text-muted-foreground">Role</p>
                <p className="font-medium">
                  {ticket.userRole === 'COORDINATOR' ? 'Coordinator' : 'Student'}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Account Created</p>
                <p className="font-medium">{formatDate(ticket.user.createdAt)}</p>
              </div>
            </div>
          </div>

          {/* School Info (for coordinators) */}
          {ticket.school && (
            <div className="rounded-xl border bg-card p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Building className="h-4 w-4" />
                School
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Name</p>
                  <p className="font-medium">{ticket.school.name}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Tier</p>
                  <span
                    className={cn(
                      'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
                      ticket.school.subscriptionTier === 'VIP'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-gray-100 text-gray-700'
                    )}
                  >
                    {ticket.school.subscriptionTier}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Timeline */}
          <div className="rounded-xl border bg-card p-6">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Timeline
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground">Created</p>
                <p className="font-medium">{formatDate(ticket.createdAt)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Last Updated</p>
                <p className="font-medium">{formatDate(ticket.updatedAt)}</p>
              </div>
              {ticket.resolvedAt && (
                <div>
                  <p className="text-muted-foreground">Resolved</p>
                  <p className="font-medium">{formatDate(ticket.resolvedAt)}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
