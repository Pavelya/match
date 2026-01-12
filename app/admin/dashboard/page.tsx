import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import {
  Building2,
  BookOpen,
  GraduationCap,
  Users,
  UserCog,
  UsersRound,
  Briefcase,
  Plus,
  ArrowRight,
  LayoutDashboard
} from 'lucide-react'
import { PageContainer, PageHeader, StatCard, InfoCard } from '@/components/admin/shared'
import { FadeIn } from '@/components/ui/fade-in'

export default async function AdminDashboardPage() {
  // Fetch basic stats for the dashboard
  const [
    userCount,
    programCount,
    universityCount,
    schoolCount,
    studentCount,
    coordinatorCount,
    agentCount
  ] = await Promise.all([
    prisma.user.count(),
    prisma.academicProgram.count(),
    prisma.university.count(),
    prisma.iBSchool.count(),
    prisma.user.count({ where: { role: 'STUDENT' } }),
    prisma.user.count({ where: { role: 'COORDINATOR' } }),
    prisma.user.count({ where: { role: 'UNIVERSITY_AGENT' } })
  ])

  return (
    <PageContainer>
      {/* Animated Header */}
      <FadeIn direction="down" duration={300}>
        <PageHeader
          title="Admin Dashboard"
          icon={LayoutDashboard}
          description="Overview of your platform's key metrics and quick actions."
        />
      </FadeIn>

      {/* Hero Stats Row - Primary KPIs */}
      <FadeIn direction="up" delay={100} duration={400}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Universities"
            value={universityCount}
            icon={Building2}
            href="/admin/universities"
            variant="horizontal"
            iconColor="blue"
          />
          <StatCard
            title="Programs"
            value={programCount}
            icon={BookOpen}
            href="/admin/programs"
            variant="horizontal"
            iconColor="purple"
          />
          <StatCard
            title="IB Schools"
            value={schoolCount}
            icon={GraduationCap}
            href="/admin/schools"
            variant="horizontal"
            iconColor="amber"
          />
          <StatCard
            title="Total Users"
            value={userCount}
            icon={UsersRound}
            variant="horizontal"
            iconColor="green"
          />
        </div>
      </FadeIn>

      {/* Secondary Stats Row - User Breakdown */}
      <FadeIn direction="up" delay={200} duration={400}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatCard title="Students" value={studentCount} icon={Users} href="/admin/students" />
          <StatCard
            title="Coordinators"
            value={coordinatorCount}
            icon={UserCog}
            href="/admin/coordinators"
          />
          <StatCard title="Agents" value={agentCount} icon={Briefcase} href="/admin/agents" />
        </div>
      </FadeIn>

      {/* Quick Actions & Analytics Section */}
      <FadeIn direction="up" delay={300} duration={400}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <InfoCard title="Quick Actions" icon={Plus}>
            <div className="space-y-3">
              <QuickActionLink
                href="/admin/universities/new"
                label="Add University"
                icon={Building2}
              />
              <QuickActionLink href="/admin/programs/new" label="Add Program" icon={BookOpen} />
              <QuickActionLink href="/admin/schools/new" label="Add School" icon={GraduationCap} />
              <QuickActionLink
                href="/admin/schools"
                label="Invite Coordinator"
                icon={UserCog}
                description="From a school page"
              />
            </div>
          </InfoCard>

          {/* Platform Health */}
          <InfoCard title="Platform Overview">
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-border/50">
                <span className="text-sm text-muted-foreground">Programs per University</span>
                <span className="text-sm font-medium">
                  {universityCount > 0
                    ? `${Math.round((programCount / universityCount) * 100) / 100} avg`
                    : '—'}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border/50">
                <span className="text-sm text-muted-foreground">Students per School</span>
                <span className="text-sm font-medium">
                  {schoolCount > 0 ? `${Math.round(studentCount / schoolCount)} avg` : '—'}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-muted-foreground">Student to Coordinator Ratio</span>
                <span className="text-sm font-medium">
                  {coordinatorCount > 0 ? `${Math.round(studentCount / coordinatorCount)}:1` : '—'}
                </span>
              </div>
            </div>
          </InfoCard>
        </div>
      </FadeIn>
    </PageContainer>
  )
}

// Quick Action Link Component
function QuickActionLink({
  href,
  label,
  icon: Icon,
  description
}: {
  href: string
  label: string
  icon: typeof Building2
  description?: string
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between p-3 -mx-3 rounded-lg hover:bg-muted/50 transition-colors group"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        <div>
          <span className="text-sm font-medium text-foreground">{label}</span>
          {description && <p className="text-xs text-muted-foreground">{description}</p>}
        </div>
      </div>
      <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
    </Link>
  )
}
