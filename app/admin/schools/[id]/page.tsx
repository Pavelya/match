/**
 * Admin School Detail Page
 *
 * Shows full school details with navigation to edit.
 */

import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import {
  ArrowLeft,
  Pencil,
  Crown,
  MapPin,
  Mail,
  Phone,
  Users,
  GraduationCap,
  CheckCircle2,
  XCircle,
  Globe,
  ExternalLink
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function SchoolDetailPage({ params }: PageProps) {
  const { id } = await params

  const school = await prisma.iBSchool.findUnique({
    where: { id },
    include: {
      country: true,
      coordinators: {
        include: {
          user: {
            select: { id: true, email: true, name: true, image: true }
          }
        }
      },
      _count: {
        select: {
          coordinators: true,
          students: true
        }
      }
    }
  })

  if (!school) {
    notFound()
  }

  return (
    <div className="p-8 max-w-4xl">
      {/* Back link */}
      <Link
        href="/admin/schools"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Schools
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-foreground">{school.name}</h1>
            <span
              className={cn(
                'inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full',
                school.subscriptionTier === 'VIP'
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-muted text-muted-foreground'
              )}
            >
              {school.subscriptionTier === 'VIP' && <Crown className="h-3 w-3" />}
              {school.subscriptionTier}
            </span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="mr-1">{school.country.flagEmoji}</span>
            {school.city}, {school.country.name}
          </div>
        </div>
        <Link
          href={`/admin/schools/${school.id}/edit`}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Pencil className="h-4 w-4" />
          Edit School
        </Link>
      </div>

      {/* Details Grid */}
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        {/* Status Card */}
        <div className="rounded-xl border bg-card p-5">
          <h3 className="font-medium text-foreground mb-4">Subscription Status</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Tier</span>
              <span className="text-sm font-medium">{school.subscriptionTier}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Status</span>
              <span
                className={cn(
                  'inline-flex px-2 py-0.5 text-xs font-medium rounded-full',
                  school.subscriptionStatus === 'ACTIVE'
                    ? 'bg-green-100 text-green-700'
                    : school.subscriptionStatus === 'INACTIVE'
                      ? 'bg-gray-100 text-gray-600'
                      : 'bg-red-100 text-red-700'
                )}
              >
                {school.subscriptionStatus}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Verified</span>
              <span className="text-sm">
                {school.isVerified ? (
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-muted-foreground" />
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Contact Card */}
        <div className="rounded-xl border bg-card p-5">
          <h3 className="font-medium text-foreground mb-4">Contact Information</h3>
          <div className="space-y-3">
            {school.websiteUrl && (
              <div className="flex items-center gap-2 text-sm">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <a
                  href={school.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline flex items-center gap-1"
                >
                  {school.websiteUrl.replace(/^https?:\/\//, '')}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              {school.email || <span className="text-muted-foreground">Not provided</span>}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              {school.phone || <span className="text-muted-foreground">Not provided</span>}
            </div>
          </div>
        </div>

        {/* Members Card */}
        <div className="rounded-xl border bg-card p-5">
          <h3 className="font-medium text-foreground mb-4">Members</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                Coordinators
              </div>
              <span className="text-sm font-medium">{school._count.coordinators}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <GraduationCap className="h-4 w-4" />
                Students
              </div>
              <span className="text-sm font-medium">{school._count.students}</span>
            </div>
          </div>
        </div>

        {/* Logo Card */}
        <div className="rounded-xl border bg-card p-5">
          <h3 className="font-medium text-foreground mb-4">Logo</h3>
          {school.logo ? (
            <Image
              src={school.logo}
              alt={`${school.name} logo`}
              width={64}
              height={64}
              className="h-16 w-auto object-contain"
              unoptimized
            />
          ) : (
            <p className="text-sm text-muted-foreground">No logo uploaded</p>
          )}
        </div>
      </div>

      {/* Coordinators List */}
      {school.coordinators.length > 0 && (
        <div className="rounded-xl border bg-card p-5">
          <h3 className="font-medium text-foreground mb-4">Coordinators</h3>
          <div className="divide-y">
            {school.coordinators.map((coordinator) => (
              <div key={coordinator.id} className="py-3 first:pt-0 last:pb-0">
                <div className="text-sm font-medium">
                  {coordinator.user.name || coordinator.user.email}
                </div>
                <div className="text-xs text-muted-foreground">{coordinator.user.email}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
