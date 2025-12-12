/**
 * Admin Agents List Page
 *
 * Displays all university agents with:
 * - Stats summary row
 * - Search and filter capabilities
 * - Agent name, email, university, joined date
 * - View details action
 */

import { prisma } from '@/lib/prisma'
import { Handshake, Users } from 'lucide-react'
import { PageContainer, PageHeader, TableEmptyState } from '@/components/admin/shared'
import { AgentsListClient } from '@/components/admin/agents/AgentsListClient'

export default async function AgentsPage() {
  // Fetch all agents with their profiles
  const agents = await prisma.universityAgentProfile.findMany({
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
          image: true,
          createdAt: true
        }
      },
      university: {
        select: {
          id: true,
          name: true,
          abbreviatedName: true,
          classification: true,
          city: true,
          country: {
            select: { name: true, flagEmoji: true }
          }
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  })

  // Format data for client component
  const formattedAgents = agents.map((agent) => ({
    id: agent.id,
    userId: agent.user.id,
    email: agent.user.email,
    name: agent.user.name,
    image: agent.user.image,
    createdAt: agent.createdAt.toISOString(),
    userCreatedAt: agent.user.createdAt.toISOString(),
    university: {
      id: agent.university.id,
      name: agent.university.name,
      abbreviatedName: agent.university.abbreviatedName,
      classification: agent.university.classification as 'PUBLIC' | 'PRIVATE',
      city: agent.university.city,
      country: agent.university.country
    }
  }))

  // Get unique universities for filter
  const universities = [
    ...new Map(formattedAgents.map((a) => [a.university.id, a.university])).values()
  ]

  // Calculate stats
  const stats = {
    total: formattedAgents.length,
    publicUniversities: formattedAgents.filter((a) => a.university.classification === 'PUBLIC')
      .length,
    privateUniversities: formattedAgents.filter((a) => a.university.classification === 'PRIVATE')
      .length,
    uniqueUniversities: universities.length
  }

  return (
    <PageContainer>
      <PageHeader
        title="University Agents"
        icon={Handshake}
        description="View and manage university agent accounts."
      />

      {formattedAgents.length === 0 ? (
        <TableEmptyState
          icon={Users}
          title="No agents yet"
          description="University agents will appear here once they are invited."
        />
      ) : (
        <AgentsListClient agents={formattedAgents} stats={stats} universities={universities} />
      )}
    </PageContainer>
  )
}
