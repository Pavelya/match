/**
 * Admin Students List Page
 *
 * Displays all students with:
 * - Stats summary row
 * - Search and filter capabilities
 * - Student name, email, school, profile status
 * - View profile action
 */

import { prisma } from '@/lib/prisma'
import { Users } from 'lucide-react'
import { PageContainer, PageHeader, TableEmptyState } from '@/components/admin/shared'
import { StudentsListClient } from '@/components/admin/students/StudentsListClient'

export default async function StudentsPage() {
  // Fetch all students with their profiles
  const students = await prisma.user.findMany({
    where: {
      role: 'STUDENT'
    },
    include: {
      studentProfile: {
        include: {
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
  const formattedStudents = students.map((student) => ({
    id: student.id,
    email: student.email,
    name: student.name,
    image: student.image,
    createdAt: student.createdAt.toISOString(),
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
    withSchool: formattedStudents.filter((s) => s.profile?.school).length
  }

  return (
    <PageContainer>
      <PageHeader
        title="Students"
        icon={Users}
        description="View and manage student accounts and profiles."
      />

      {formattedStudents.length === 0 ? (
        <TableEmptyState
          icon={Users}
          title="No students yet"
          description="Students will appear here once they sign up."
        />
      ) : (
        <StudentsListClient students={formattedStudents} stats={stats} />
      )}
    </PageContainer>
  )
}
