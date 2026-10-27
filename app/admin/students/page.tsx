/**
 * Admin Students List Page
 *
 * Displays all students with:
 * - Stats summary row
 * - Search and filter capabilities
 * - Student name, email, school, profile status
 * - When each was last active, and which are silent (MAINT 7.6)
 * - View profile action
 */

import { prisma } from '@/lib/prisma'
import { Users } from 'lucide-react'
import { PageContainer, PageHeader, TableEmptyState } from '@/components/admin/shared'
import { StudentsListClient } from '@/components/admin/students/StudentsListClient'
import { isSilent } from '@/lib/account/inactivity'
import { requireAdmin } from '@/lib/auth/guards'

interface PageProps {
  searchParams: Promise<{ filter?: string }>
}

export default async function StudentsPage({ searchParams }: PageProps) {
  await requireAdmin()
  // The dashboard's "Silent" count links here with ?filter=silent
  const { filter } = await searchParams

  // Fetch all students with their profiles
  const students = await prisma.user.findMany({
    where: {
      role: 'STUDENT'
    },
    select: {
      id: true,
      email: true,
      name: true,
      image: true,
      createdAt: true,
      lastActiveAt: true,
      studentProfile: {
        select: {
          id: true,
          totalIBPoints: true,
          school: {
            select: {
              id: true,
              name: true,
              subscriptionTier: true
            }
          },
          _count: {
            select: {
              courses: true,
              savedPrograms: true
            }
          }
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  })

  // Format data for client component
  const now = new Date()
  const formattedStudents = students.map((student) => ({
    id: student.id,
    email: student.email,
    name: student.name,
    image: student.image,
    createdAt: student.createdAt.toISOString(),
    lastActiveAt: student.lastActiveAt?.toISOString() ?? null,
    isSilent: isSilent(student, now),
    hasProfile: !!student.studentProfile,
    profile: student.studentProfile
      ? {
          id: student.studentProfile.id,
          totalIBPoints: student.studentProfile.totalIBPoints,
          coursesCount: student.studentProfile._count.courses,
          savedProgramsCount: student.studentProfile._count.savedPrograms,
          school: student.studentProfile.school
        }
      : null
  }))

  // Calculate stats
  const stats = {
    total: formattedStudents.length,
    withProfile: formattedStudents.filter((s) => s.hasProfile).length,
    withoutProfile: formattedStudents.filter((s) => !s.hasProfile).length,
    withSchool: formattedStudents.filter((s) => s.profile?.school).length,
    silent: formattedStudents.filter((s) => s.isSilent).length
  }

  return (
    <PageContainer>
      <PageHeader
        title="Students"
        icon={Users}
        description="View and manage student accounts and profiles."
        actions={[
          { label: 'Inactive accounts', href: '/admin/students/inactive', variant: 'secondary' }
        ]}
      />

      {formattedStudents.length === 0 ? (
        <TableEmptyState
          icon={Users}
          title="No students yet"
          description="Students will appear here once they sign up."
        />
      ) : (
        <StudentsListClient
          students={formattedStudents}
          stats={stats}
          initialFilter={filter === 'silent' ? 'silent' : null}
        />
      )}
    </PageContainer>
  )
}
