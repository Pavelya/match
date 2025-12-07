/**
 * ProgramDetails Component
 *
 * Displays complete information about a university program including:
 * - Hero section with university image and program name
 * - Quick info bar (field, duration, degree, points)
 * - Full description
 * - IB course requirements
 * - University details
 * - Link to official program page
 */

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  GraduationCap,
  Clock,
  MapPin,
  ExternalLink,
  Building2,
  Users,
  BookOpen,
  Circle
} from 'lucide-react'
import { FieldIcon } from '@/lib/icons'
import { cn } from '@/lib/utils'

interface CourseRequirement {
  id: string
  ibCourse: {
    id: string
    name: string
    code: string
  }
  requiredLevel: string
  minGrade: number
  isCritical: boolean
}

interface ProgramDetailsProps {
  program: {
    id: string
    name: string
    description: string
    degreeType: string
    duration: string
    minIBPoints: number | null
    programUrl: string | null
    university: {
      id: string
      name: string
      abbreviatedName: string | null
      description: string
      city: string
      classification: string
      studentPopulation: number | null
      image: string | null
      websiteUrl: string
      country: {
        id: string
        name: string
        code: string
        flagEmoji: string
      }
    }
    fieldOfStudy: {
      id: string
      name: string
      iconName: string | null
      description: string | null
    }
    courseRequirements: CourseRequirement[]
  }
}

export function ProgramDetails({ program }: ProgramDetailsProps) {
  const { university, fieldOfStudy, courseRequirements } = program

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        {/* University Image */}
        <div className="shrink-0 w-full md:w-auto">
          <div className="relative aspect-[16/9] md:aspect-square w-full md:h-64 md:w-64 overflow-hidden rounded-2xl bg-muted">
            {university.image ? (
              <Image
                src={university.image}
                alt={university.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                <GraduationCap className="h-16 w-16 text-primary/30" />
              </div>
            )}
          </div>
        </div>

        {/* Program Header */}
        <div className="flex-1 space-y-4">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
              {program.name}
            </h1>
            <p className="text-lg text-muted-foreground flex items-center gap-2">
              <span>{university.name}</span>
              <span className="text-xl">{university.country.flagEmoji}</span>
            </p>
            <p className="text-muted-foreground flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {university.city}, {university.country.name}
            </p>
          </div>

          {/* Quick Info Bar */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl bg-muted/50 px-4 py-3 text-sm">
            <span className="flex items-center gap-1.5 text-foreground">
              <FieldIcon fieldName={fieldOfStudy.name} className="h-4 w-4 text-muted-foreground" />
              {fieldOfStudy.name}
            </span>
            <span className="flex items-center gap-1.5 text-foreground">
              <Clock className="h-4 w-4 text-muted-foreground" />
              {program.duration}
            </span>
            <span className="flex items-center gap-1.5 text-foreground">
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
              {program.degreeType}
            </span>
            {program.minIBPoints && (
              <span className="flex items-center gap-1.5 text-green-600 font-medium">
                <Circle className="h-4 w-4 fill-current" />
                {program.minIBPoints} IB Points
              </span>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3">
            {program.programUrl && (
              <Button asChild>
                <a href={program.programUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit Official Page
                </a>
              </Button>
            )}
            {university.websiteUrl && (
              <Button variant="outline" asChild>
                <a href={university.websiteUrl} target="_blank" rel="noopener noreferrer">
                  <Building2 className="h-4 w-4 mr-2" />
                  University Website
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <Card>
        <CardContent className="p-5 sm:p-6">
          <h2 className="text-lg font-semibold mb-3">About This Program</h2>
          <p className="text-muted-foreground whitespace-pre-line">{program.description}</p>
        </CardContent>
      </Card>

      {/* IB Requirements */}
      {(program.minIBPoints || courseRequirements.length > 0) && (
        <Card>
          <CardContent className="p-5 sm:p-6 space-y-4">
            <h2 className="text-lg font-semibold">IB Requirements</h2>

            {/* Points Requirement */}
            {program.minIBPoints && (
              <div className="flex items-center gap-4 rounded-xl border-2 border-primary/20 bg-primary/5 p-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Minimum IB Points</p>
                  <p className="text-2xl font-bold text-primary">{program.minIBPoints}</p>
                </div>
              </div>
            )}

            {/* Course Requirements */}
            {courseRequirements.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-medium text-sm text-muted-foreground">Subject Requirements</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {courseRequirements.map((req) => (
                    <div
                      key={req.id}
                      className={cn(
                        'flex items-center gap-3 rounded-xl border-2 p-4',
                        req.isCritical
                          ? 'border-amber-500/30 bg-amber-50 dark:bg-amber-950/20'
                          : 'border-muted bg-muted/30'
                      )}
                    >
                      <div
                        className={cn(
                          'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg',
                          req.isCritical ? 'bg-amber-500/20' : 'bg-muted'
                        )}
                      >
                        <BookOpen
                          className={cn(
                            'h-5 w-5',
                            req.isCritical ? 'text-amber-600' : 'text-muted-foreground'
                          )}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{req.ibCourse.name}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span
                            className={cn(
                              'px-1.5 py-0.5 rounded text-xs font-medium',
                              req.requiredLevel === 'HL'
                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                            )}
                          >
                            {req.requiredLevel}
                          </span>
                          <span>Grade {req.minGrade}+</span>
                          {req.isCritical && (
                            <span className="text-amber-600 font-medium">Critical</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* University Info */}
      <Card>
        <CardContent className="p-5 sm:p-6 space-y-4">
          <h2 className="text-lg font-semibold">About {university.name}</h2>

          <div className="flex flex-wrap gap-4 text-sm">
            <span className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {university.city}, {university.country.name}
            </span>
            <span className="flex items-center gap-2 text-muted-foreground">
              <Building2 className="h-4 w-4" />
              {university.classification === 'PUBLIC' ? 'Public University' : 'Private University'}
            </span>
            {university.studentPopulation && (
              <span className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                {university.studentPopulation.toLocaleString()} students
              </span>
            )}
          </div>

          <p className="text-muted-foreground">{university.description}</p>
        </CardContent>
      </Card>

      {/* Back Link */}
      <div className="pt-4">
        <Button variant="ghost" asChild>
          <Link href="/programs/search">← Back to Search</Link>
        </Button>
      </div>
    </div>
  )
}
