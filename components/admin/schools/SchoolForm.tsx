/**
 * School Form Component (Create)
 *
 * Client component for creating new IB schools.
 * Features:
 * - Name, country, city fields (required)
 * - Tier selection (VIP/REGULAR) with prominent styling
 * - Logo file upload (500KB max)
 * - Website URL
 * - Optional contact info (email, phone)
 * - Loading and error states
 * - Success redirect
 *
 * Uses Lucide React icons (per icons-reference.md)
 */

'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  GraduationCap,
  MapPin,
  Mail,
  Phone,
  Crown,
  Users,
  Loader2,
  AlertCircle,
  Globe,
  ArrowLeft,
  Upload,
  X,
  ImageIcon
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const MAX_LOGO_SIZE = 500 * 1024 // 500KB

interface Country {
  id: string
  name: string
  code: string
  flagEmoji: string
}

interface SchoolFormProps {
  countries: Country[]
}

export function SchoolForm({ countries }: SchoolFormProps) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    countryId: '',
    city: '',
    subscriptionTier: 'REGULAR' as 'VIP' | 'REGULAR',
    email: '',
    phone: '',
    websiteUrl: '',
    logo: ''
  })

  async function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }

    // Validate file size
    if (file.size > MAX_LOGO_SIZE) {
      setError(`Logo must be less than ${MAX_LOGO_SIZE / 1024}KB`)
      return
    }

    // Convert to base64
    const reader = new FileReader()
    reader.onloadend = () => {
      setFormData({ ...formData, logo: reader.result as string })
      setError(null)
    }
    reader.onerror = () => {
      setError('Failed to read image file')
    }
    reader.readAsDataURL(file)
  }

  function handleRemoveLogo() {
    setFormData({ ...formData, logo: '' })
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      const res = await fetch('/api/admin/schools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to create school')
      }

      // Success - redirect to schools list
      router.push('/admin/schools')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create school')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Back link */}
      <Link
        href="/admin/schools"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Schools
      </Link>

      {/* Error display */}
      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive flex items-center gap-2">
          <AlertCircle className="h-5 w-5 shrink-0" />
          {error}
        </div>
      )}

      {/* Basic Info Section */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            School Information
          </h3>
          <p className="text-sm text-muted-foreground mt-1">Basic details about the IB school.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Name */}
          <div className="sm:col-span-2">
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
              School Name <span className="text-destructive">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              placeholder="e.g., International School of Geneva"
              required
            />
          </div>

          {/* Country */}
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-foreground mb-1">
              Country <span className="text-destructive">*</span>
            </label>
            <select
              id="country"
              value={formData.countryId}
              onChange={(e) => setFormData({ ...formData, countryId: e.target.value })}
              className="w-full px-4 py-2.5 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              required
            >
              <option value="">Select a country</option>
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.flagEmoji} {country.name}
                </option>
              ))}
            </select>
          </div>

          {/* City */}
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-foreground mb-1">
              City <span className="text-destructive">*</span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                id="city"
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                placeholder="e.g., Geneva"
                required
              />
            </div>
          </div>

          {/* Website URL */}
          <div className="sm:col-span-2">
            <label htmlFor="websiteUrl" className="block text-sm font-medium text-foreground mb-1">
              Website URL
            </label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                id="websiteUrl"
                type="url"
                value={formData.websiteUrl}
                onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                placeholder="https://www.school-website.edu"
              />
            </div>
          </div>

          {/* Logo Upload */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-1">School Logo</label>
            <div className="flex items-start gap-4">
              {/* Logo Preview */}
              <div className="shrink-0 h-20 w-20 rounded-lg border bg-muted/30 flex items-center justify-center overflow-hidden">
                {formData.logo ? (
                  <Image
                    src={formData.logo}
                    alt="School logo"
                    width={80}
                    height={80}
                    className="h-full w-full object-contain"
                    unoptimized
                  />
                ) : (
                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                )}
              </div>

              {/* Upload Controls */}
              <div className="flex-1 space-y-2">
                <div className="flex gap-2">
                  <label className="flex items-center gap-2 px-4 py-2 text-sm font-medium border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                    <Upload className="h-4 w-4" />
                    {formData.logo ? 'Change Logo' : 'Upload Logo'}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="sr-only"
                    />
                  </label>
                  {formData.logo && (
                    <button
                      type="button"
                      onClick={handleRemoveLogo}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-destructive border border-destructive/30 rounded-lg hover:bg-destructive/10 transition-colors"
                    >
                      <X className="h-4 w-4" />
                      Remove
                    </button>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Max file size: 500KB. Supported formats: JPG, PNG, GIF, WebP
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Tier Section */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-foreground">
            Subscription Tier <span className="text-destructive">*</span>
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Choose the access level for this school&apos;s coordinators.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* VIP Tier */}
          <button
            type="button"
            onClick={() => setFormData({ ...formData, subscriptionTier: 'VIP' })}
            className={cn(
              'relative flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all text-left',
              formData.subscriptionTier === 'VIP'
                ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                : 'border-border hover:border-primary/50 hover:bg-muted/50'
            )}
          >
            <div
              className={cn(
                'flex h-12 w-12 items-center justify-center rounded-full',
                formData.subscriptionTier === 'VIP'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              )}
            >
              <Crown className="h-6 w-6" />
            </div>
            <div className="text-center">
              <div className="font-semibold text-foreground">VIP</div>
              <div className="text-sm text-muted-foreground mt-1">Full access for free</div>
            </div>
            {formData.subscriptionTier === 'VIP' && (
              <div className="absolute top-3 right-3 h-3 w-3 rounded-full bg-primary" />
            )}
          </button>

          {/* Regular Tier */}
          <button
            type="button"
            onClick={() => setFormData({ ...formData, subscriptionTier: 'REGULAR' })}
            className={cn(
              'relative flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all text-left',
              formData.subscriptionTier === 'REGULAR'
                ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                : 'border-border hover:border-primary/50 hover:bg-muted/50'
            )}
          >
            <div
              className={cn(
                'flex h-12 w-12 items-center justify-center rounded-full',
                formData.subscriptionTier === 'REGULAR'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              )}
            >
              <Users className="h-6 w-6" />
            </div>
            <div className="text-center">
              <div className="font-semibold text-foreground">Regular</div>
              <div className="text-sm text-muted-foreground mt-1">Freemium with upgrade option</div>
            </div>
            {formData.subscriptionTier === 'REGULAR' && (
              <div className="absolute top-3 right-3 h-3 w-3 rounded-full bg-primary" />
            )}
          </button>
        </div>
      </div>

      {/* Contact Info Section */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-foreground">Contact Information</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Optional contact details for the school.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                placeholder="info@school.edu"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">
              Phone
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                placeholder="+41 22 123 4567"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <Link
          href="/admin/schools"
          className="px-6 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={saving}
          className={cn(
            'flex items-center gap-2 px-6 py-2.5 text-sm font-medium rounded-lg transition-colors',
            'bg-primary text-primary-foreground hover:bg-primary/90',
            saving && 'opacity-50 cursor-not-allowed'
          )}
        >
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          {saving ? 'Creating...' : 'Create School'}
        </button>
      </div>
    </form>
  )
}
