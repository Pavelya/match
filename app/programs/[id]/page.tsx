/**
 * Program Detail Page
 *
 * Displays detailed information about a specific university program.
 * Includes personalized match score for logged-in students.
 */

import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth/config'
import { PageContainer } from '@/components/layout/PageContainer'
import { ProgramDetails } from '@/components/programs/ProgramDetails'
import { PersonalizedMatch } from '@/components/programs/PersonalizedMatch'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params

  const program = await prisma.academicProgram.findUnique({
    where: { id },
    include: {
      university: true
    }
  })

  if (!program) {
    return {
      title: 'Program Not Found | IB Match'
    }
  }

  return {
    title: `${program.name} at ${program.university.name} | IB Match`,
    description: program.description.slice(0, 160)
  }
}

export default async function ProgramDetailPage({ params }: PageProps) {
  const { id } = await params

  // Fetch program with all related data
  const program = await prisma.academicProgram.findUnique({
    where: { id },
    include: {
      university: {
        include: {
          country: true
        }
      },
      fieldOfStudy: true,
      courseRequirements: {
        include: {
          ibCourse: true
        }
      }
    }
  })

  if (!program) {
    notFound()
  }

  // Check if user is logged in
  const session = await auth()
  const isLoggedIn = !!session?.user?.id

  return (
    <PageContainer>
      <ProgramDetails program={program} />

      {isLoggedIn && session.user && (
        <PersonalizedMatch programId={program.id} userId={session.user.id!} />
      )}
    </PageContainer>
  )
}
