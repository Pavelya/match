'use client'

/**
 * Contact Form Component
 *
 * Client-side form for submitting support tickets.
 * Features:
 * - Category selection with descriptions
 * - Subject and message input with validation
 * - Character counters
 * - Loading and success states
 */

import { useState } from 'react'
import { MessageSquare, CheckCircle, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

// Category options with descriptions
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
    label: 'Matching Question',
    description: 'How matching works or results questions'
  },
  { value: 'DATA_PRIVACY', label: 'Data & Privacy', description: 'GDPR requests or data concerns' },
  {
    value: 'FEATURE_REQUEST',
    label: 'Feature Request',
    description: 'Suggestions for new features'
  },
  { value: 'OTHER', label: 'General Inquiry', description: 'Other questions or feedback' }
]

interface ContactFormProps {
  isAuthenticated: boolean
  userName?: string | null
}

export function ContactForm({ isAuthenticated, userName }: ContactFormProps) {
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

    if (!isAuthenticated) {
      setSubmitResult({ success: false, error: 'Please sign in to submit a support request.' })
      return
    }

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
        // Clear form on success
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
      <div className="rounded-2xl bg-green-50 p-8 text-center ring-1 ring-green-100">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-7 w-7 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">Thank You!</h3>
        <p className="mt-2 text-gray-600">Your support request has been submitted successfully.</p>
        <div className="mt-4 inline-block rounded-lg bg-white px-6 py-3 ring-1 ring-gray-200">
          <p className="text-sm text-gray-500">Your Ticket Number</p>
          <p className="text-2xl font-bold text-blue-600">{submitResult.ticketNumber}</p>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          We&apos;ve sent a confirmation email with your ticket details. We typically respond within
          24-48 hours.
        </p>
        <button
          onClick={() => setSubmitResult(null)}
          className="mt-6 text-sm font-medium text-blue-600 hover:text-blue-500"
        >
          Submit Another Request
        </button>
      </div>
    )
  }

  // Not authenticated state
  if (!isAuthenticated) {
    return (
      <div className="rounded-2xl bg-gray-50 p-8 text-center ring-1 ring-gray-100">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 ring-1 ring-blue-100">
          <MessageSquare className="h-7 w-7 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">Sign In to Contact Us</h3>
        <p className="mt-2 text-gray-600">
          Please sign in to submit a support request. This helps us respond to you more quickly.
        </p>
        <a
          href="/auth/signin"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
        >
          Sign In
        </a>
        <p className="mt-4 text-sm text-gray-500">
          Or email us directly at{' '}
          <a href="mailto:support@ibmatch.com" className="text-blue-600 hover:underline">
            support@ibmatch.com
          </a>
        </p>
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

      {/* Greeting */}
      {userName && (
        <p className="text-gray-600">
          Hi <span className="font-medium">{userName}</span>, how can we help you?
        </p>
      )}

      {/* Category Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
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
                  ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              )}
            >
              <span
                className={cn(
                  'font-medium',
                  category === cat.value ? 'text-blue-700' : 'text-gray-900'
                )}
              >
                {cat.label}
              </span>
              <span
                className={cn(
                  'text-sm mt-0.5',
                  category === cat.value ? 'text-blue-600' : 'text-gray-500'
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
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
            Subject <span className="text-red-500">*</span>
          </label>
          <span
            className={cn('text-xs', subjectLength > maxSubject ? 'text-red-500' : 'text-gray-400')}
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
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
          required
          minLength={5}
          maxLength={maxSubject}
        />
      </div>

      {/* Message */}
      <div>
        <div className="flex justify-between items-baseline mb-2">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Message <span className="text-red-500">*</span>
          </label>
          <span
            className={cn('text-xs', messageLength > maxMessage ? 'text-red-500' : 'text-gray-400')}
          >
            {messageLength}/{maxMessage}
          </span>
        </div>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value.slice(0, maxMessage))}
          placeholder="Please describe your issue or question in detail. Include any relevant information that might help us assist you."
          rows={6}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none"
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
          'w-full rounded-full py-3 px-6 font-semibold text-white transition-all',
          isSubmitting || !category || subjectLength < 5 || messageLength < 20
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-500 shadow-sm'
        )}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Request'}
      </button>

      <p className="text-center text-sm text-gray-500">
        We typically respond within 24-48 hours during business days.
      </p>
    </form>
  )
}
