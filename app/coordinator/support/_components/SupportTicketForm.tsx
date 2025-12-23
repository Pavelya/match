'use client'

/**
 * Coordinator Support Ticket Form Component
 *
 * Client-side form for coordinators to submit support tickets.
 * Similar to student form but includes coordinator-specific category (SUBSCRIPTION_BILLING).
 */

import { useState } from 'react'
import { CheckCircle, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

// Category options with descriptions - includes SUBSCRIPTION_BILLING for coordinators
const categories = [
  {
    value: 'ACCOUNT_ISSUE',
    label: 'Account Issue',
    description: 'Login, profile, or account settings'
  },
  {
    value: 'TECHNICAL_PROBLEM',
    label: 'Technical Problem',
    description: 'Bugs, errors, or app not working'
  },
  {
    value: 'MATCHING_QUESTION',
    label: 'Student Matching',
    description: 'Questions about student matches'
  },
  {
    value: 'SUBSCRIPTION_BILLING',
    label: 'Subscription & Billing',
    description: 'Subscription, payment, or billing'
  },
  { value: 'DATA_PRIVACY', label: 'Data & Privacy', description: 'GDPR requests or data concerns' },
  {
    value: 'FEATURE_REQUEST',
    label: 'Feature Request',
    description: 'Suggestions for new features'
  },
  { value: 'OTHER', label: 'General Inquiry', description: 'Other questions or feedback' }
]

interface SupportTicketFormProps {
  userName?: string | null
  schoolName?: string | null
}

export function SupportTicketForm({ userName, schoolName }: SupportTicketFormProps) {
  const [category, setCategory] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<{
    success: boolean
    ticketNumber?: string
    error?: string
  } | null>(null)

  const subjectLength = subject.length
  const messageLength = message.length
  const maxSubject = 200
  const maxMessage = 5000

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!category || !subject.trim() || !message.trim()) {
      setSubmitResult({ success: false, error: 'Please fill in all required fields.' })
      return
    }

    if (subject.length < 5) {
      setSubmitResult({ success: false, error: 'Subject must be at least 5 characters.' })
      return
    }

    if (message.length < 20) {
      setSubmitResult({ success: false, error: 'Message must be at least 20 characters.' })
      return
    }

    setIsSubmitting(true)
    setSubmitResult(null)

    try {
      const response = await fetch('/api/support/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, subject: subject.trim(), message: message.trim() })
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitResult({ success: true, ticketNumber: data.ticketNumber })
        setCategory('')
        setSubject('')
        setMessage('')
      } else {
        setSubmitResult({
          success: false,
          error: data.error || 'Failed to submit. Please try again.'
        })
      }
    } catch {
      setSubmitResult({
        success: false,
        error: 'Network error. Please check your connection and try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Success state
  if (submitResult?.success) {
    return (
      <div className="rounded-xl bg-green-50 p-8 text-center ring-1 ring-green-100">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-7 w-7 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">Thank You!</h3>
        <p className="mt-2 text-gray-600">Your support request has been submitted successfully.</p>
        <div className="mt-4 inline-block rounded-lg bg-white px-6 py-3 ring-1 ring-gray-200">
          <p className="text-sm text-gray-500">Your Ticket Number</p>
          <p className="text-2xl font-bold text-primary">{submitResult.ticketNumber}</p>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          We&apos;ve sent a confirmation email with your ticket details. We typically respond within
          24-48 hours.
        </p>
        <button
          onClick={() => setSubmitResult(null)}
          className="mt-6 text-sm font-medium text-primary hover:underline"
        >
          Submit Another Request
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error message */}
      {submitResult?.error && (
        <div className="rounded-lg bg-red-50 p-4 flex items-start gap-3 ring-1 ring-red-100">
          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{submitResult.error}</p>
        </div>
      )}

      {/* Context info */}
      <div className="rounded-lg bg-muted/50 p-4">
        <div className="text-sm text-muted-foreground">
          {userName && (
            <p>
              Submitting as: <span className="font-medium text-foreground">{userName}</span>
            </p>
          )}
          {schoolName && (
            <p>
              School: <span className="font-medium text-foreground">{schoolName}</span>
            </p>
          )}
        </div>
      </div>

      {/* Category Selection */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Category <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {categories.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => setCategory(cat.value)}
              className={cn(
                'flex flex-col items-start p-4 rounded-lg border-2 text-left transition-all',
                category === cat.value
                  ? 'border-primary bg-primary/5 ring-1 ring-primary'
                  : 'border-border hover:border-muted-foreground/30 hover:bg-muted/50'
              )}
            >
              <span
                className={cn(
                  'font-medium',
                  category === cat.value ? 'text-primary' : 'text-foreground'
                )}
              >
                {cat.label}
              </span>
              <span
                className={cn(
                  'text-sm mt-0.5',
                  category === cat.value ? 'text-primary/80' : 'text-muted-foreground'
                )}
              >
                {cat.description}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Subject */}
      <div>
        <div className="flex justify-between items-baseline mb-2">
          <label htmlFor="subject" className="block text-sm font-medium text-foreground">
            Subject <span className="text-red-500">*</span>
          </label>
          <span
            className={cn(
              'text-xs',
              subjectLength > maxSubject ? 'text-red-500' : 'text-muted-foreground'
            )}
          >
            {subjectLength}/{maxSubject}
          </span>
        </div>
        <input
          type="text"
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value.slice(0, maxSubject))}
          placeholder="Brief summary of your issue"
          className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          required
          minLength={5}
          maxLength={maxSubject}
        />
      </div>

      {/* Message */}
      <div>
        <div className="flex justify-between items-baseline mb-2">
          <label htmlFor="message" className="block text-sm font-medium text-foreground">
            Message <span className="text-red-500">*</span>
          </label>
          <span
            className={cn(
              'text-xs',
              messageLength > maxMessage ? 'text-red-500' : 'text-muted-foreground'
            )}
          >
            {messageLength}/{maxMessage}
          </span>
        </div>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value.slice(0, maxMessage))}
          placeholder="Please describe your issue or question in detail..."
          rows={6}
          className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
          required
          minLength={20}
          maxLength={maxMessage}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || !category || subjectLength < 5 || messageLength < 20}
        className={cn(
          'w-full rounded-lg py-3 px-6 font-semibold text-primary-foreground transition-all',
          isSubmitting || !category || subjectLength < 5 || messageLength < 20
            ? 'bg-muted-foreground/30 cursor-not-allowed'
            : 'bg-primary hover:bg-primary/90 shadow-sm'
        )}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Support Request'}
      </button>

      <p className="text-center text-sm text-muted-foreground">
        We typically respond within 24-48 hours during business days.
      </p>
    </form>
  )
}
