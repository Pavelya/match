/**
 * University Edit Form Component
 *
 * Client component for editing existing universities.
 * Features:
 * - Pre-populated with current university data
 * - Logo and campus image file uploads (500KB max)
 * - PATCH request on submit
 * - Success redirect to detail page
 *
 * Uses Lucide React icons (per icons-reference.md)
 */

'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  Building2,
  MapPin,
  Mail,
  Phone,
  Loader2,
  AlertCircle,
  Globe,
  Users,
  Landmark,
  Building,
  CheckCircle2,
  Upload,
  X,
  ImageIcon
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const MAX_IMAGE_SIZE = 500 * 1024 // 500KB

interface Country {
  id: string
  name: string
  code: string
  flagEmoji: string
}

interface University {
  id: string
  name: string
  abbreviatedName: string | null
  description: string
  countryId: string
  city: string
  classification: 'PUBLIC' | 'PRIVATE'
  studentPopulation: number | null
  logo: string | null
  image: string | null
  websiteUrl: string
  email: string | null
  phone: string | null
}

interface UniversityEditFormProps {
  university: University
  countries: Country[]
}

export function UniversityEditForm({ university, countries }: UniversityEditFormProps) {
  const router = useRouter()
  const logoInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Form state initialized with current university data
  const [formData, setFormData] = useState({
    name: university.name,
    abbreviatedName: university.abbreviatedName || '',
    description: university.description,
    countryId: university.countryId,
    city: university.city,
    classification: university.classification,
    studentPopulation: university.studentPopulation?.toString() || '',
    logo: university.logo || '',
    image: university.image || '',
    websiteUrl: university.websiteUrl,
    email: university.email || '',
    phone: university.phone || ''
  })

  async function handleImageChange(
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'logo' | 'image'
  ) {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }

    // Validate file size
    if (file.size > MAX_IMAGE_SIZE) {
      setError(`Image must be less than ${MAX_IMAGE_SIZE / 1024}KB`)
      return
    }

    // Convert to base64
    const reader = new FileReader()
    reader.onloadend = () => {
      setFormData({ ...formData, [field]: reader.result as string })
      setError(null)
    }
    reader.onerror = () => {
      setError('Failed to read image file')
    }
    reader.readAsDataURL(file)
  }

  function handleRemoveImage(field: 'logo' | 'image') {
    setFormData({ ...formData, [field]: '' })
    const inputRef = field === 'logo' ? logoInputRef : imageInputRef
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSuccess(false)

    try {
      const res = await fetch(`/api/admin/universities/${university.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to update university')
      }

      setSuccess(true)
      // Redirect to detail page after short delay to show success message
      setTimeout(() => {
        router.push(`/admin/universities/${university.id}`)
        router.refresh()
      }, 1000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update university')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Error display */}
      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive flex items-center gap-2">
          <AlertCircle className="h-5 w-5 shrink-0" />
          {error}
        </div>
      )}

      {/* Success display */}
      {success && (
        <div className="rounded-lg border border-green-500/50 bg-green-50 p-4 text-green-700 flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          University updated successfully! Redirecting...
        </div>
      )}

      {/* Basic Info Section */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            University Information
          </h3>
          <p className="text-sm text-muted-foreground mt-1">Basic details about the university.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Name */}
          <div className="sm:col-span-2">
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
              University Name <span className="text-destructive">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              placeholder="e.g., University of Oxford"
              required
            />
          </div>

          {/* Abbreviated Name */}
          <div className="sm:col-span-2">
            <label
              htmlFor="abbreviatedName"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Abbreviated Name
            </label>
            <input
              id="abbreviatedName"
              type="text"
              value={formData.abbreviatedName}
              onChange={(e) => setFormData({ ...formData, abbreviatedName: e.target.value })}
              className="w-full px-4 py-2.5 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              placeholder="e.g., Oxford"
            />
          </div>

          {/* Description */}
          <div className="sm:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-foreground mb-1">
              Description <span className="text-destructive">*</span>
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-2.5 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
              placeholder="Brief description of the university, its history, and what makes it unique..."
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
                placeholder="e.g., Oxford"
                required
              />
            </div>
          </div>

          {/* Website URL */}
          <div className="sm:col-span-2">
            <label htmlFor="websiteUrl" className="block text-sm font-medium text-foreground mb-1">
              Website URL <span className="text-destructive">*</span>
            </label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                id="websiteUrl"
                type="url"
                value={formData.websiteUrl}
                onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                placeholder="https://www.university.edu"
                required
              />
            </div>
          </div>

          {/* Logo Upload */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-1">
              University Logo
            </label>
            <div className="flex items-start gap-4">
              {/* Logo Preview */}
              <div className="shrink-0 h-20 w-20 rounded-lg border bg-muted/30 flex items-center justify-center overflow-hidden">
                {formData.logo ? (
                  <Image
                    src={formData.logo}
                    alt="University logo"
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
                      ref={logoInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, 'logo')}
                      className="sr-only"
                    />
                  </label>
                  {formData.logo && (
                    <button
                      type="button"
                      onClick={() => handleRemoveImage('logo')}
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

          {/* Campus Image Upload */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-1">Campus Image</label>
            <div className="flex items-start gap-4">
              {/* Image Preview */}
              <div className="shrink-0 h-20 w-32 rounded-lg border bg-muted/30 flex items-center justify-center overflow-hidden">
                {formData.image ? (
                  <Image
                    src={formData.image}
                    alt="Campus image"
                    width={128}
                    height={80}
                    className="h-full w-full object-cover"
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
                    {formData.image ? 'Change Image' : 'Upload Image'}
                    <input
                      ref={imageInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, 'image')}
                      className="sr-only"
                    />
                  </label>
                  {formData.image && (
                    <button
                      type="button"
                      onClick={() => handleRemoveImage('image')}
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

      {/* Classification Section */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-foreground">
            Classification <span className="text-destructive">*</span>
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Select whether this is a public or private institution.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Public */}
          <button
            type="button"
            onClick={() => setFormData({ ...formData, classification: 'PUBLIC' })}
            className={cn(
              'relative flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all text-left',
              formData.classification === 'PUBLIC'
                ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                : 'border-border hover:border-primary/50 hover:bg-muted/50'
            )}
          >
            <div
              className={cn(
                'flex h-12 w-12 items-center justify-center rounded-full',
                formData.classification === 'PUBLIC'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              )}
            >
              <Landmark className="h-6 w-6" />
            </div>
            <div className="text-center">
              <div className="font-semibold text-foreground">Public</div>
              <div className="text-sm text-muted-foreground mt-1">
                Government-funded institution
              </div>
            </div>
            {formData.classification === 'PUBLIC' && (
              <div className="absolute top-3 right-3 h-3 w-3 rounded-full bg-primary" />
            )}
          </button>

          {/* Private */}
          <button
            type="button"
            onClick={() => setFormData({ ...formData, classification: 'PRIVATE' })}
            className={cn(
              'relative flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all text-left',
              formData.classification === 'PRIVATE'
                ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                : 'border-border hover:border-primary/50 hover:bg-muted/50'
            )}
          >
            <div
              className={cn(
                'flex h-12 w-12 items-center justify-center rounded-full',
                formData.classification === 'PRIVATE'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              )}
            >
              <Building className="h-6 w-6" />
            </div>
            <div className="text-center">
              <div className="font-semibold text-foreground">Private</div>
              <div className="text-sm text-muted-foreground mt-1">Privately-funded institution</div>
            </div>
            {formData.classification === 'PRIVATE' && (
              <div className="absolute top-3 right-3 h-3 w-3 rounded-full bg-primary" />
            )}
          </button>
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-foreground">Additional Information</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Optional details about the university.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Student Population */}
          <div className="sm:col-span-2">
            <label
              htmlFor="studentPopulation"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Student Population
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                id="studentPopulation"
                type="number"
                value={formData.studentPopulation}
                onChange={(e) => setFormData({ ...formData, studentPopulation: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                placeholder="e.g., 25000"
                min="0"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info Section */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-foreground">Contact Information</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Optional contact details for the university.
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
                placeholder="admissions@university.edu"
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
                placeholder="+44 1234 567890"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <Link
          href={`/admin/universities/${university.id}`}
          className="px-6 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={saving || success}
          className={cn(
            'flex items-center gap-2 px-6 py-2.5 text-sm font-medium rounded-lg transition-colors',
            'bg-primary text-primary-foreground hover:bg-primary/90',
            (saving || success) && 'opacity-50 cursor-not-allowed'
          )}
        >
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  )
}
