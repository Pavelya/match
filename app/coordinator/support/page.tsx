/**
 * Coordinator Support Page
 *
 * Support ticket submission page for coordinators.
 * Accessible from the coordinator dashboard sidebar.
 */

import { HelpCircle, Mail, MessageSquare } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/admin/shared'
import { SupportTicketForm } from './_components/SupportTicketForm'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export default async function CoordinatorSupportPage() {
  // Get session and verify coordinator
  const session = await auth()

  if (!session?.user?.id) {
    redirect('/auth/coordinator/signin')
  }

  // Fetch coordinator info with school
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      name: true,
      role: true,
      coordinatorProfile: {
        select: {
          school: {
            select: {
              name: true
            }
          }
        }
      }
    }
  })

  if (user?.role !== 'COORDINATOR') {
    redirect('/')
  }

  const schoolName = user.coordinatorProfile?.school?.name || null

  return (
    <PageContainer>
      <PageHeader title="Support" description="Get help from the IB Match team" icon={HelpCircle} />

      <div className="max-w-2xl">
        {/* Support Form Card */}
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <MessageSquare className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Submit a Support Request</h2>
              <p className="text-sm text-muted-foreground">
                We&apos;ll get back to you as soon as possible
              </p>
            </div>
          </div>

          <SupportTicketForm userName={user.name} schoolName={schoolName} />
        </div>

        {/* Alternative contact */}
        <div className="mt-6 rounded-xl border bg-muted/30 p-6 text-center">
          <p className="text-sm text-muted-foreground">
            You can also reach us directly at{' '}
            <a
              href="mailto:support@ibmatch.com"
              className="inline-flex items-center gap-1 text-primary hover:underline font-medium"
            >
              <Mail className="h-4 w-4" />
              support@ibmatch.com
            </a>
          </p>
        </div>
      </div>
    </PageContainer>
  )
}
