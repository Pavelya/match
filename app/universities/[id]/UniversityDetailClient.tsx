/**
 * University Detail Client Component
 *
 * Displays university information in a clean, modern layout.
 * Consistent with the ProgramCard detail variant styling.
 */

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Building2,
  MapPin,
  Users,
  Globe,
  Mail,
  Phone,
  ExternalLink,
  GraduationCap,
  Landmark,
  Building,
  BookOpen,
  ArrowLeft
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { FieldIcon } from '@/lib/icons'

interface Program {
  id: string
  name: string
  degreeType: string
  duration: string
  minIBPoints: number | null
  fieldOfStudy: {
    id: string
    name: string
  }
}

interface UniversityData {
  id: string
  name: string
  abbreviatedName: string | null
  description: string
  city: string
  country: {
    id: string
    name: string
    code: string
    flagEmoji: string | null
  }
  classification: 'PUBLIC' | 'PRIVATE'
  studentPopulation: number | null
  image: string | null
  websiteUrl: string
  email: string | null
  phone: string | null
  programCount: number
  programs: Program[]
}

interface UniversityDetailClientProps {
  university: UniversityData
}

export function UniversityDetailClient({ university }: UniversityDetailClientProps) {
  const handleBack = () => {
    // Use browser history to go back to the previous page (program detail)
    if (typeof window !== 'undefined' && window.history.length > 1) {
      window.history.back()
    } else {
      // Fallback to search if no history
      window.location.href = '/programs/search'
    }
  }

  return (
    <div className="space-y-8">
      {/* Back Link */}
      <button
        onClick={handleBack}
        className="text-primary hover:underline text-sm inline-flex items-center gap-1"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to program
      </button>

      {/* Hero Section */}
      <div className="flex flex-col sm:flex-row gap-6">
        {/* University Image */}
        <div className="shrink-0 w-full sm:w-auto">
          <div className="relative aspect-[16/9] sm:aspect-[4/3] w-full sm:h-56 sm:w-72 overflow-hidden rounded-xl bg-muted">
            {university.image ? (
              <Image
                src={university.image}
                alt={university.name}
                fill
                className="object-cover"
                priority
                unoptimized
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                <Building2 className="h-16 w-16 text-primary/30" />
              </div>
            )}
          </div>
        </div>

        {/* University Info */}
        <div className="flex-1 space-y-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">{university.name}</h1>
            {university.abbreviatedName && (
              <p className="text-lg text-muted-foreground">({university.abbreviatedName})</p>
            )}
            <div className="flex items-center gap-2 mt-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>
                {university.country.flagEmoji} {university.city}, {university.country.name}
              </span>
            </div>
          </div>

          {/* Quick Info Bar */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl bg-muted/50 px-4 py-3 text-sm">
            <span className="flex items-center gap-1.5 text-foreground">
              {university.classification === 'PUBLIC' ? (
                <Landmark className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Building className="h-4 w-4 text-muted-foreground" />
              )}
              {university.classification === 'PUBLIC' ? 'Public University' : 'Private University'}
            </span>
            {university.studentPopulation && (
              <span className="flex items-center gap-1.5 text-foreground">
                <Users className="h-4 w-4 text-muted-foreground" />
                {university.studentPopulation.toLocaleString('en-US')} students
              </span>
            )}
            <span className="flex items-center gap-1.5 text-foreground">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              {university.programCount} program{university.programCount !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button size="sm" asChild className="gap-2">
              <a href={university.websiteUrl} target="_blank" rel="noopener noreferrer">
                <Globe className="h-4 w-4" />
                Visit Website
                <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
            {university.email && (
              <Button variant="outline" size="sm" asChild className="gap-2">
                <a href={`mailto:${university.email}`}>
                  <Mail className="h-4 w-4" />
                  Contact
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* About Section */}
      {university.description && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">About</h2>
          <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
            {university.description}
          </p>
        </div>
      )}

      {/* Contact Information */}
      {(university.email || university.phone) && (
        <Card className="border-0 bg-muted/30 shadow-none">
          <CardContent className="p-5">
            <h3 className="font-semibold mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <a
                  href={university.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline flex items-center gap-1"
                >
                  {university.websiteUrl.replace(/^https?:\/\//, '')}
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
                  <span>{university.phone}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Programs Section */}
      {university.programs.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">
            Programs at {university.abbreviatedName || university.name}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {university.programs.slice(0, 6).map((program) => (
              <Link key={program.id} href={`/programs/${program.id}`} className="block">
                <Card className="h-full hover:bg-muted/50 transition-colors cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={cn(
                          'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10'
                        )}
                      >
                        <FieldIcon
                          fieldName={program.fieldOfStudy.name}
                          className="h-5 w-5 text-primary"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm leading-tight line-clamp-2">
                          {program.name}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {program.fieldOfStudy.name}
                        </p>
                        <div className="flex items-center flex-wrap gap-x-2 gap-y-1 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <GraduationCap className="h-3 w-3" />
                            {program.degreeType}
                          </span>
                          <span>•</span>
                          <span>{program.duration}</span>
                          {program.minIBPoints && (
                            <>
                              <span>•</span>
                              <span>{program.minIBPoints} IB pts</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          {university.programs.length > 6 && (
            <div className="text-center pt-2">
              <Link
                href={`/programs/search?q=${encodeURIComponent(university.name)}`}
                className="inline-flex items-center gap-2 text-primary hover:underline text-sm font-medium"
              >
                View all {university.programCount} programs from{' '}
                {university.abbreviatedName || university.name}
                <ArrowLeft className="h-4 w-4 rotate-180" />
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
