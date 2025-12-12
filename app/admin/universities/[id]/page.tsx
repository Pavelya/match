/**
 * Admin University Detail Page
 *
 * Shows university details with two-column layout:
 * - Left (2/3): About, Contact Information, Agents list
 * - Right (1/3): Quick Stats, Classification, Location, Logo
 */

import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import {
  Pencil,
  Building2,
  MapPin,
  Globe,
  Mail,
  Phone,
  Users,
  BookOpen,
  ExternalLink,
  GraduationCap,
  Landmark,
  Building
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { UniversityDeleteButton } from '@/components/admin/universities/UniversityDeleteButton'
import {
  PageContainer,
  PageHeader,
  DetailPageLayout,
  InfoCard,
  QuickStat,
  Breadcrumbs
} from '@/components/admin/shared'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function UniversityDetailPage({ params }: PageProps) {
  const { id } = await params

  const university = await prisma.university.findUnique({
    where: { id },
    include: {
      country: true,
      agents: {
        include: {
          user: {
            select: { id: true, email: true, name: true, image: true }
          }
        }
      },
      _count: {
        select: {
          programs: true,
          agents: true
        }
      }
    }
  })

  if (!university) {
    notFound()
  }

  return (
    <PageContainer>
      <PageHeader
        backHref="/admin/universities"
        backLabel="Back to Universities"
        title={university.name}
        icon={Building2}
        description={university.abbreviatedName ? `(${university.abbreviatedName})` : undefined}
        actions={[
          {
            label: 'Edit',
            href: `/admin/universities/${university.id}/edit`,
            icon: Pencil,
            variant: 'primary'
          }
        ]}
      />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Universities', href: '/admin/universities' },
          { label: university.abbreviatedName || university.name }
        ]}
        className="mb-6 -mt-4"
      />

      {/* University Info Bar */}
      <div className="flex flex-wrap items-center gap-4 mb-6 -mt-4">
        <span
          className={cn(
            'inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full',
            university.classification === 'PUBLIC'
              ? 'bg-blue-100 text-blue-700'
              : 'bg-purple-100 text-purple-700'
          )}
        >
          {university.classification === 'PUBLIC' ? (
            <Landmark className="h-3 w-3" />
          ) : (
            <Building className="h-3 w-3" />
          )}
          {university.classification}
        </span>
        <div className="flex items-center gap-1 text-muted-foreground text-sm">
          <MapPin className="h-4 w-4" />
          <span className="mr-1">{university.country.flagEmoji}</span>
          {university.city}, {university.country.name}
        </div>
      </div>

      <DetailPageLayout
        sidebar={
          <>
            {/* Quick Stats Card */}
            <InfoCard title="Quick Stats" padding="compact">
              <div className="space-y-1">
                <QuickStat
                  label="Programs"
                  value={university._count.programs}
                  icon={<BookOpen className="h-4 w-4" />}
                />
                <QuickStat
                  label="Agents"
                  value={university._count.agents}
                  icon={<Users className="h-4 w-4" />}
                />
                {university.studentPopulation && (
                  <QuickStat
                    label="Student Population"
                    value={university.studentPopulation.toLocaleString()}
                    icon={<GraduationCap className="h-4 w-4" />}
                  />
                )}
              </div>
            </InfoCard>

            {/* Classification Card */}
            <InfoCard title="Classification" padding="compact">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-lg',
                    university.classification === 'PUBLIC' ? 'bg-blue-100' : 'bg-purple-100'
                  )}
                >
                  {university.classification === 'PUBLIC' ? (
                    <Landmark className="h-5 w-5 text-blue-600" />
                  ) : (
                    <Building className="h-5 w-5 text-purple-600" />
                  )}
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">
                    {university.classification === 'PUBLIC'
                      ? 'Public University'
                      : 'Private University'}
                  </div>
                  <div className="text-xs text-muted-foreground">Institutional type</div>
                </div>
              </div>
            </InfoCard>

            {/* Location Card */}
            <InfoCard title="Location" padding="compact">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">
                    {university.country.flagEmoji} {university.city}
                  </div>
                  <div className="text-xs text-muted-foreground">{university.country.name}</div>
                </div>
              </div>
            </InfoCard>

            {/* Logo Card */}
            <InfoCard title="Logo" padding="compact">
              <div className="flex justify-center py-2">
                {university.logo ? (
                  <Image
                    src={university.logo}
                    alt={university.name}
                    width={80}
                    height={80}
                    className="h-20 w-auto object-contain rounded-lg"
                  />
                ) : (
                  <div className="h-20 w-20 rounded-lg bg-muted flex items-center justify-center">
                    <Building2 className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
              </div>
            </InfoCard>

            {/* Delete Action */}
            <div className="rounded-xl border border-red-200 bg-red-50 p-4">
              <h3 className="text-sm font-medium text-red-800 mb-2">Danger Zone</h3>
              <p className="text-xs text-red-600 mb-3">
                Permanently delete this university and all associated data.
              </p>
              <UniversityDeleteButton
                universityId={university.id}
                universityName={university.name}
                hasPrograms={university._count.programs > 0}
                hasAgents={university._count.agents > 0}
              />
            </div>
          </>
        }
      >
        {/* About Card */}
        <InfoCard title="About">
          <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
            {university.description || 'No description provided.'}
          </p>
        </InfoCard>

        {/* Contact Information Card */}
        <InfoCard title="Contact Information" padding="compact">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Globe className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <div className="text-xs text-muted-foreground mb-1">Website</div>
                <a
                  href={university.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  {university.websiteUrl.replace(/^https?:\/\//, '')}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
            {university.email && (
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Email</div>
                  <a
                    href={`mailto:${university.email}`}
                    className="text-sm text-primary hover:underline"
                  >
                    {university.email}
                  </a>
                </div>
              </div>
            )}
            {university.phone && (
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Phone</div>
                  <div className="text-sm">{university.phone}</div>
                </div>
              </div>
            )}
          </div>
        </InfoCard>

        {/* Agents Card */}
        <InfoCard title="University Agents" padding="compact">
          {university.agents.length > 0 ? (
            <div className="divide-y">
              {university.agents.map((agent) => (
                <div key={agent.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                  {agent.user.image ? (
                    <Image
                      src={agent.user.image}
                      alt={agent.user.name || 'Agent'}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                      <Users className="h-5 w-5 text-muted-foreground" />
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {agent.user.name || 'Unnamed Agent'}
                    </p>
                    <p className="text-xs text-muted-foreground">{agent.user.email}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <Users className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No agents assigned</p>
            </div>
          )}
        </InfoCard>

        {/* Programs Link */}
        {university._count.programs > 0 && (
          <Link
            href={`/admin/programs?university=${university.id}`}
            className="block rounded-xl border bg-card p-5 hover:bg-muted/50 transition-colors group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    View {university._count.programs} Program
                    {university._count.programs !== 1 ? 's' : ''}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Browse all programs offered by this university
                  </div>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </Link>
        )}
      </DetailPageLayout>
    </PageContainer>
  )
}
