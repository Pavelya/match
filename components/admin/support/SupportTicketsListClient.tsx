'use client'

/**
 * Support Tickets List Client Component
 *
 * Client-side component for displaying and managing support tickets.
 * Features:
 * - Filter by status, category, user role
 * - Search by ticket number, subject, email
 * - Sortable columns
 * - Pagination
 * - Quick status badges and priority indicators
 */

import { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  ExternalLink,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  Loader2
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Types for ticket data
interface Ticket {
  id: string
  ticketNumber: string
  category: string
  subject: string
  status: string
  priority: string
  userRole: string
  createdAt: string
  updatedAt: string
  resolvedAt: string | null
  user: {
    id: string
    email: string
    name: string | null
  }
  school: {
    id: string
    name: string
  } | null
}

interface Pagination {
  total: number
  page: number
  limit: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

// Status color mapping
const statusColors: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
  OPEN: { bg: 'bg-blue-100', text: 'text-blue-700', icon: <Clock className="h-3 w-3" /> },
  IN_PROGRESS: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-700',
    icon: <Loader2 className="h-3 w-3" />
  },
  RESOLVED: {
    bg: 'bg-green-100',
    text: 'text-green-700',
    icon: <CheckCircle className="h-3 w-3" />
  },
  CLOSED: { bg: 'bg-gray-100', text: 'text-gray-700', icon: <XCircle className="h-3 w-3" /> }
}

// Priority color mapping
const priorityColors: Record<string, string> = {
  LOW: 'text-gray-500',
  NORMAL: 'text-blue-600',
  HIGH: 'text-orange-600',
  URGENT: 'text-red-600'
}

// Category labels
const categoryLabels: Record<string, string> = {
  ACCOUNT_ISSUE: 'Account',
  TECHNICAL_PROBLEM: 'Technical',
  MATCHING_QUESTION: 'Matching',
  SUBSCRIPTION_BILLING: 'Billing',
  DATA_PRIVACY: 'Privacy',
  FEATURE_REQUEST: 'Feature',
  OTHER: 'Other'
}

export function SupportTicketsListClient() {
  const router = useRouter()
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [pagination, setPagination] = useState<Pagination | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Filter state
  const [status, setStatus] = useState('')
  const [category, setCategory] = useState('')
  const [userRole, setUserRole] = useState('')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)

  // Fetch tickets
  const fetchTickets = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams()
      if (status) params.set('status', status)
      if (category) params.set('category', category)
      if (userRole) params.set('userRole', userRole)
      if (search) params.set('search', search)
      params.set('page', page.toString())
      params.set('limit', '20')

      const response = await fetch(`/api/admin/support?${params.toString()}`)
      const data = await response.json()

      if (response.ok) {
        setTickets(data.tickets)
        setPagination(data.pagination)
      } else {
        setError(data.error || 'Failed to fetch tickets')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [status, category, userRole, search, page])

  useEffect(() => {
    fetchTickets()
  }, [fetchTickets])

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1)
  }, [status, category, userRole, search])

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getTimeAgo = (date: string) => {
    const now = new Date()
    const created = new Date(date)
    const diffMs = now.getTime() - created.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffHours / 24)

    if (diffDays > 0) return `${diffDays}d ago`
    if (diffHours > 0) return `${diffHours}h ago`
    return 'Just now'
  }

  return (
    <div className="space-y-4">
      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search tickets, subjects, emails..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          />
        </div>

        {/* Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={cn(
            'inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors',
            showFilters
              ? 'bg-primary text-primary-foreground border-primary'
              : 'bg-background border-input hover:bg-muted'
          )}
        >
          <Filter className="h-4 w-4" />
          Filters
          {(status || category || userRole) && (
            <span className="bg-primary/20 text-primary text-xs px-1.5 py-0.5 rounded-full">
              {[status, category, userRole].filter(Boolean).length}
            </span>
          )}
        </button>

        {/* Refresh */}
        <button
          onClick={fetchTickets}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-input bg-background text-sm font-medium hover:bg-muted transition-colors"
        >
          <RefreshCw className={cn('h-4 w-4', isLoading && 'animate-spin')} />
          Refresh
        </button>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="flex flex-wrap gap-4 p-4 rounded-lg bg-muted/50 border border-input">
          {/* Status Filter */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-muted-foreground">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="px-3 py-1.5 rounded-md border border-input bg-background text-sm"
            >
              <option value="">All Statuses</option>
              <option value="OPEN">Open</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-muted-foreground">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-3 py-1.5 rounded-md border border-input bg-background text-sm"
            >
              <option value="">All Categories</option>
              <option value="ACCOUNT_ISSUE">Account Issue</option>
              <option value="TECHNICAL_PROBLEM">Technical Problem</option>
              <option value="MATCHING_QUESTION">Matching Question</option>
              <option value="SUBSCRIPTION_BILLING">Subscription & Billing</option>
              <option value="DATA_PRIVACY">Data & Privacy</option>
              <option value="FEATURE_REQUEST">Feature Request</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          {/* User Role Filter */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-muted-foreground">User Role</label>
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              className="px-3 py-1.5 rounded-md border border-input bg-background text-sm"
            >
              <option value="">All Roles</option>
              <option value="STUDENT">Student</option>
              <option value="COORDINATOR">Coordinator</option>
            </select>
          </div>

          {/* Clear Filters */}
          {(status || category || userRole) && (
            <button
              onClick={() => {
                setStatus('')
                setCategory('')
                setUserRole('')
              }}
              className="self-end px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground"
            >
              Clear all
            </button>
          )}
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="rounded-lg bg-red-50 p-4 flex items-center gap-3 text-red-700">
          <AlertCircle className="h-5 w-5" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && tickets.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No tickets found</p>
          <p className="text-sm text-muted-foreground mt-1">
            Try adjusting your filters or search query
          </p>
        </div>
      )}

      {/* Tickets Table */}
      {!isLoading && !error && tickets.length > 0 && (
        <div className="rounded-lg border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left font-medium px-4 py-3">Ticket</th>
                  <th className="text-left font-medium px-4 py-3">User</th>
                  <th className="text-left font-medium px-4 py-3">Category</th>
                  <th className="text-left font-medium px-4 py-3">Status</th>
                  <th className="text-left font-medium px-4 py-3">Priority</th>
                  <th className="text-left font-medium px-4 py-3">Created</th>
                  <th className="text-left font-medium px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => {
                  const statusStyle = statusColors[ticket.status] || statusColors.OPEN
                  const priorityColor = priorityColors[ticket.priority] || priorityColors.NORMAL

                  return (
                    <tr
                      key={ticket.id}
                      className="border-b hover:bg-muted/30 cursor-pointer transition-colors"
                      onClick={() => router.push(`/admin/support/${ticket.id}`)}
                    >
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-mono text-xs text-muted-foreground">
                            {ticket.ticketNumber}
                          </p>
                          <p className="font-medium text-foreground line-clamp-1 max-w-xs">
                            {ticket.subject}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium">{ticket.user.name || ticket.user.email}</p>
                          <p className="text-xs text-muted-foreground">
                            {ticket.userRole === 'COORDINATOR' ? 'Coordinator' : 'Student'}
                            {ticket.school && ` · ${ticket.school.name}`}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-muted-foreground">
                          {categoryLabels[ticket.category] || ticket.category}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={cn(
                            'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium',
                            statusStyle.bg,
                            statusStyle.text
                          )}
                        >
                          {statusStyle.icon}
                          {ticket.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={cn('font-medium', priorityColor)}>{ticket.priority}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="text-muted-foreground">{getTimeAgo(ticket.createdAt)}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(ticket.createdAt)}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/admin/support/${ticket.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 text-primary hover:underline text-sm"
                        >
                          View
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t bg-muted/50">
              <p className="text-sm text-muted-foreground">
                Showing {(pagination.page - 1) * pagination.limit + 1} -{' '}
                {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
                {pagination.total}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={!pagination.hasPrev}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-input bg-background text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </button>
                <span className="text-sm text-muted-foreground">
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={!pagination.hasNext}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-input bg-background text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Stats Summary */}
      {pagination && (
        <div className="text-sm text-muted-foreground text-center">
          Total: {pagination.total} ticket{pagination.total !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  )
}
