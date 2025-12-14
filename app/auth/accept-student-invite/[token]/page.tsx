/**
 * Student Invitation Acceptance Page
 *
 * Validates student invitation token and shows consent screen.
 * Students must explicitly consent to coordinator access before account creation.
 *
 * Part of Task 4.4: Student Invitation System
 */

import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import { AcceptStudentInviteForm } from './AcceptStudentInviteForm'

interface PageProps {
  params: Promise<{ token: string }>
}

export default async function AcceptStudentInvitePage({ params }: PageProps) {
  const { token } = await params

  // Validate token
  const invitation = await prisma.invitation.findUnique({
    where: { token },
    include: {
      school: {
        select: {
          id: true,
          name: true,
          city: true,
          country: {
            select: { name: true, flagEmoji: true }
          }
        }
      },
      invitedBy: {
        select: { name: true }
      }
    }
  })

  // Token not found
  if (!invitation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
        <div className="w-full max-w-md text-center">
          <div className="rounded-xl border bg-card p-8">
            <div className="flex justify-center mb-6">
              <Image
                src="/logo-restored.svg"
                alt="IB Match"
                width={48}
                height={48}
                className="rounded-lg"
              />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-4">Invalid Invitation</h1>
            <p className="text-muted-foreground mb-6">
              This invitation link is invalid or has already been used.
            </p>
            <Link href="/auth/signin" className="text-primary hover:underline font-medium">
              Go to Sign In
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Check if expired
  if (invitation.expiresAt < new Date()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
        <div className="w-full max-w-md text-center">
          <div className="rounded-xl border bg-card p-8">
            <div className="flex justify-center mb-6">
              <Image
                src="/logo-restored.svg"
                alt="IB Match"
                width={48}
                height={48}
                className="rounded-lg"
              />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-4">Invitation Expired</h1>
            <p className="text-muted-foreground mb-6">
              This invitation has expired. Please contact your coordinator for a new invitation.
            </p>
            <Link href="/auth/signin" className="text-primary hover:underline font-medium">
              Go to Sign In
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Check if already accepted
  if (invitation.status === 'ACCEPTED') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
        <div className="w-full max-w-md text-center">
          <div className="rounded-xl border bg-card p-8">
            <div className="flex justify-center mb-6">
              <Image
                src="/logo-restored.svg"
                alt="IB Match"
                width={48}
                height={48}
                className="rounded-lg"
              />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-4">Already Accepted</h1>
            <p className="text-muted-foreground mb-6">
              This invitation has already been accepted. You can sign in to your account.
            </p>
            <Link
              href="/auth/signin"
              className="inline-block px-6 py-2.5 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Check if cancelled
  if (invitation.status === 'CANCELLED') {
    notFound()
  }

  // Must be STUDENT role
  if (invitation.role !== 'STUDENT') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
        <div className="w-full max-w-md text-center">
          <div className="rounded-xl border bg-card p-8">
            <div className="flex justify-center mb-6">
              <Image
                src="/logo-restored.svg"
                alt="IB Match"
                width={48}
                height={48}
                className="rounded-lg"
              />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-4">Invalid Invitation Type</h1>
            <p className="text-muted-foreground mb-6">
              This is not a student invitation. Please use the correct invitation link.
            </p>
            <Link href="/auth/signin" className="text-primary hover:underline font-medium">
              Go to Sign In
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-lg">
        <div className="rounded-xl border bg-card p-8">
          <AcceptStudentInviteForm
            token={token}
            email={invitation.email}
            school={{
              id: invitation.school!.id,
              name: invitation.school!.name,
              city: invitation.school!.city,
              countryName: invitation.school!.country.name,
              countryFlag: invitation.school!.country.flagEmoji
            }}
            coordinatorName={invitation.invitedBy.name}
          />
        </div>
      </div>
    </div>
  )
}
