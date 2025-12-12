/**
 * Admin School Detail Page
 *
 * Shows full school details with two-column layout:
 * - Left (2/3): Contact info, Coordinators list
 * - Right (1/3): Status, Members, Logo
 */

import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import {
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
  ExternalLink,
  UserPlus
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  PageContainer,
  PageHeader,
  DetailPageLayout,
  InfoCard,
  InfoRow,
  QuickStat,
  Breadcrumbs
} from '@/components/admin/shared'

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
    <PageContainer>
      <PageHeader
        backHref="/admin/schools"
        backLabel="Back to Schools"
        title={school.name}
        icon={GraduationCap}
        actions={[
          {
            label: 'Invite Coordinator',
            href: `/admin/schools/${school.id}/invite-coordinator`,
            icon: UserPlus,
            variant: 'secondary'
          },
          {
            label: 'Edit School',
            href: `/admin/schools/${school.id}/edit`,
            icon: Pencil,
            variant: 'primary'
          }
        ]}
      />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[{ label: 'Schools', href: '/admin/schools' }, { label: school.name }]}
        className="mb-6 -mt-4"
      />

      {/* School Info Bar */}
      <div className="flex flex-wrap items-center gap-4 mb-6 -mt-4">
        <span
          className={cn(
            'inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full',
            school.subscriptionTier === 'VIP'
              ? 'bg-amber-100 text-amber-700'
              : 'bg-muted text-muted-foreground'
          )}
        >
          {school.subscriptionTier === 'VIP' && <Crown className="h-3 w-3" />}
          {school.subscriptionTier}
        </span>
        <div className="flex items-center gap-1 text-muted-foreground text-sm">
          <MapPin className="h-4 w-4" />
          <span className="mr-1">{school.country.flagEmoji}</span>
          {school.city}, {school.country.name}
        </div>
      </div>

      <DetailPageLayout
        sidebar={
          <>
            {/* Status Card */}
            <InfoCard title="Status & Verification" padding="compact">
              <div className="space-y-3">
                <InfoRow label="Tier">
                  <span
                    className={cn(
                      'inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full',
                      school.subscriptionTier === 'VIP'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-muted text-muted-foreground'
                    )}
                  >
                    {school.subscriptionTier === 'VIP' && <Crown className="h-3 w-3" />}
                    {school.subscriptionTier}
                  </span>
                </InfoRow>
                <InfoRow label="Status">
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
                </InfoRow>
                <InfoRow label="Verified">
                  {school.isVerified ? (
                    <span className="flex items-center gap-1 text-green-600">
                      <CheckCircle2 className="h-4 w-4" />
                      <span className="text-xs font-medium">Verified</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <XCircle className="h-4 w-4" />
                      <span className="text-xs">Not verified</span>
                    </span>
                  )}
                </InfoRow>
              </div>
            </InfoCard>

            {/* Members Card */}
            <InfoCard title="Members" padding="compact">
              <div className="space-y-1">
                <QuickStat
                  label="Coordinators"
                  value={school._count.coordinators}
                  icon={<Users className="h-4 w-4" />}
                />
                <QuickStat
                  label="Students"
                  value={school._count.students}
                  icon={<GraduationCap className="h-4 w-4" />}
                />
              </div>
            </InfoCard>

            {/* Logo Card */}
            <InfoCard title="Logo" padding="compact">
              <div className="flex justify-center py-2">
                {school.logo ? (
                  <Image
                    src={school.logo}
                    alt={`${school.name} logo`}
                    width={80}
                    height={80}
                    className="h-20 w-auto object-contain rounded-lg"
                    unoptimized
                  />
                ) : (
                  <div className="h-20 w-20 rounded-lg bg-muted flex items-center justify-center">
                    <GraduationCap className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
              </div>
            </InfoCard>
          </>
        }
      >
        {/* Contact Information Card */}
        <InfoCard title="Contact Information" padding="compact">
          <div className="space-y-4">
            {school.websiteUrl && (
              <div className="flex items-start gap-3">
                <Globe className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Website</div>
                  <a
                    href={school.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline flex items-center gap-1"
                  >
                    {school.websiteUrl.replace(/^https?:\/\//, '')}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            )}
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <div className="text-xs text-muted-foreground mb-1">Email</div>
                <div className="text-sm">
                  {school.email || <span className="text-muted-foreground">Not provided</span>}
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <div className="text-xs text-muted-foreground mb-1">Phone</div>
                <div className="text-sm">
                  {school.phone || <span className="text-muted-foreground">Not provided</span>}
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <div className="text-xs text-muted-foreground mb-1">Location</div>
                <div className="text-sm">
                  {school.country.flagEmoji} {school.city}, {school.country.name}
                </div>
              </div>
            </div>
          </div>
        </InfoCard>

        {/* Coordinators List Card */}
        <InfoCard
          title="Coordinators"
          padding="compact"
          action={
            school.coordinators.length > 0
              ? {
                  label: 'Invite',
                  href: `/admin/schools/${school.id}/invite-coordinator`,
                  icon: UserPlus
                }
              : undefined
          }
        >
          {school.coordinators.length > 0 ? (
            <div className="divide-y">
              {school.coordinators.map((coordinator) => (
                <Link
                  key={coordinator.id}
                  href={`/admin/coordinators/${coordinator.id}`}
                  className="flex items-center justify-between py-3 first:pt-0 last:pb-0 hover:bg-muted/50 -mx-2 px-2 rounded-lg transition-colors"
                >
                  <div>
                    <div className="text-sm font-medium text-foreground">
                      {coordinator.user.name || coordinator.user.email}
                    </div>
                    <div className="text-xs text-muted-foreground">{coordinator.user.email}</div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <Users className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground mb-3">No coordinators yet</p>
              <Link
                href={`/admin/schools/${school.id}/invite-coordinator`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                <UserPlus className="h-4 w-4" />
                Invite a coordinator
              </Link>
            </div>
          )}
        </InfoCard>
      </DetailPageLayout>
    </PageContainer>
  )
}
