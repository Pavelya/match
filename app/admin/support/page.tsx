/**
 * Admin Support Tickets List Page
 *
 * Main page for administrators to view and manage support tickets.
 * Features:
 * - Ticket list with filters and search
 * - Status, category, and priority badges
 * - Click through to ticket detail page
 */

import { Ticket } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/admin/shared'
import { SupportTicketsListClient } from '@/components/admin/support/SupportTicketsListClient'

export default function AdminSupportPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Support Tickets"
        icon={Ticket}
        description="View and respond to user support requests."
      />

      <SupportTicketsListClient />
    </PageContainer>
  )
}
