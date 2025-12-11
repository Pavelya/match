/**
 * Admin University Detail Page
 *
 * Shows university details with:
 * - Full information display
 * - Programs count
 * - Agents list
 * - Edit and delete actions
 */

import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import {
  ArrowLeft,
  Pencil,
  Building2,
  MapPin,
  Globe,
  Mail,
  Phone,
  Users,
  BookOpen,
  ExternalLink
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { UniversityDeleteButton } from '@/components/admin/universities/UniversityDeleteButton'

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
    <div className="p-8">
      {/* Back link */}
      <Link
        href="/admin/universities"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Universities
      </Link>

      {/* Header with Actions */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-start gap-4">
          {university.logo ? (
            <Image
              src={university.logo}
              alt={university.name}
              width={80}
              height={80}
              className="rounded-lg object-contain bg-muted"
            />
          ) : (
            <div className="h-20 w-20 rounded-lg bg-muted flex items-center justify-center">
              <Building2 className="h-8 w-8 text-muted-foreground" />
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold text-foreground">{university.name}</h1>
            {university.abbreviatedName && (
              <p className="text-muted-foreground">{university.abbreviatedName}</p>
            )}
            <div className="flex items-center gap-2 mt-2 text-muted-foreground">
              <span>{university.country.flagEmoji}</span>
              <span>
                {university.city}, {university.country.name}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/universities/${university.id}/edit`}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium border rounded-lg hover:bg-muted transition-colors"
          >
            <Pencil className="h-4 w-4" />
            Edit
          </Link>
          <UniversityDeleteButton
            universityId={university.id}
            universityName={university.name}
            hasPrograms={university._count.programs > 0}
            hasAgents={university._count.agents > 0}
          />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div className="rounded-xl border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">About</h2>
            <p className="text-muted-foreground whitespace-pre-wrap">{university.description}</p>
          </div>

          {/* Contact Info */}
          <div className="rounded-xl border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Contact Information</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <a
                  href={university.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline flex items-center gap-1"
                >
                  {university.websiteUrl}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              {university.email && (
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <a href={`mailto:${university.email}`} className="text-primary hover:underline">
                    {university.email}
                  </a>
                </div>
              )}
              {university.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <span className="text-muted-foreground">{university.phone}</span>
                </div>
              )}
            </div>
          </div>

          {/* Agents */}
          {university.agents.length > 0 && (
            <div className="rounded-xl border bg-card p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">University Agents</h2>
              <div className="space-y-3">
                {university.agents.map((agent) => (
                  <div key={agent.id} className="flex items-center gap-3">
                    {agent.user.image ? (
                      <Image
                        src={agent.user.image}
                        alt={agent.user.name || 'Agent'}
                        width={36}
                        height={36}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center">
                        <Users className="h-4 w-4 text-muted-foreground" />
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
            </div>
          )}
        </div>

        {/* Right Column - Stats */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="rounded-xl border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Quick Stats</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <BookOpen className="h-4 w-4" />
                  <span>Programs</span>
                </div>
                <span className="font-medium text-foreground">{university._count.programs}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>Agents</span>
                </div>
                <span className="font-medium text-foreground">{university._count.agents}</span>
              </div>
              {university.studentPopulation && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>Student Population</span>
                  </div>
                  <span className="font-medium text-foreground">
                    {university.studentPopulation.toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Classification */}
          <div className="rounded-xl border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Classification</h2>
            <span
              className={cn(
                'inline-flex px-3 py-1.5 text-sm font-medium rounded-full',
                university.classification === 'PUBLIC'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-purple-100 text-purple-700'
              )}
            >
              {university.classification}
            </span>
          </div>

          {/* Location */}
          <div className="rounded-xl border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Location</h2>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">
                  {university.country.flagEmoji} {university.city}
                </p>
                <p className="text-sm text-muted-foreground">{university.country.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
