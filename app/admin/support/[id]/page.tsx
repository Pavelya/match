/**
 * Admin Support Ticket Detail Page
 *
 * Shows full ticket details and allows admins to respond and resolve.
 */

import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { PageContainer } from '@/components/admin/shared'
import { TicketDetailClient } from '@/components/admin/support/TicketDetailClient'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function AdminSupportTicketPage({ params }: PageProps) {
  const { id } = await params

  // Fetch ticket with all details
  const ticket = await prisma.supportTicket.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true
        }
      },
      school: {
        select: {
          id: true,
          name: true,
          subscriptionTier: true
        }
      },
      resolvedBy: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    }
  })

  if (!ticket) {
    notFound()
  }

  // Transform dates to strings for client component
  const ticketData = {
    ...ticket,
    createdAt: ticket.createdAt.toISOString(),
    updatedAt: ticket.updatedAt.toISOString(),
    resolvedAt: ticket.resolvedAt?.toISOString() || null,
    user: {
      ...ticket.user,
      createdAt: ticket.user.createdAt.toISOString()
    }
  }

  return (
    <PageContainer>
      <TicketDetailClient initialTicket={ticketData} />
    </PageContainer>
  )
}
