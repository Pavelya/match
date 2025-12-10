import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import {
  Building2,
  BookOpen,
  GraduationCap,
  Users,
  UserCog,
  UsersRound,
  type LucideIcon
} from 'lucide-react'

export default async function AdminDashboardPage() {
  // Fetch basic stats for the dashboard
  const [userCount, programCount, universityCount, schoolCount, studentCount, coordinatorCount] =
    await Promise.all([
      prisma.user.count(),
      prisma.academicProgram.count(),
      prisma.university.count(),
      prisma.iBSchool.count(),
      prisma.user.count({ where: { role: 'STUDENT' } }),
      prisma.user.count({ where: { role: 'COORDINATOR' } })
    ])

  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <StatCard
          title="Universities"
          value={universityCount}
          icon={Building2}
          href="/admin/universities"
        />
        <StatCard title="Programs" value={programCount} icon={BookOpen} href="/admin/programs" />
        <StatCard
          title="IB Schools"
          value={schoolCount}
          icon={GraduationCap}
          href="/admin/schools"
        />
        <StatCard
          title="Coordinators"
          value={coordinatorCount}
          icon={UserCog}
          href="/admin/coordinators"
        />
        <StatCard title="Students" value={studentCount} icon={Users} href="/admin/students" />
        <StatCard title="Total Users" value={userCount} icon={UsersRound} />
      </div>

      {/* Additional Dashboard Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Placeholder for future analytics */}
        <div className="rounded-xl border bg-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Student Profile Completion</h2>
          <div className="rounded-lg border border-dashed border-muted-foreground/25 p-8 text-center">
            <p className="text-muted-foreground text-sm">
              Analytics charts will be added in upcoming phases.
            </p>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Top Preferred Study Locations
          </h2>
          <div className="rounded-lg border border-dashed border-muted-foreground/25 p-8 text-center">
            <p className="text-muted-foreground text-sm">
              Location analytics will be added in upcoming phases.
            </p>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Most Popular Fields of Study
          </h2>
          <div className="rounded-lg border border-dashed border-muted-foreground/25 p-8 text-center">
            <p className="text-muted-foreground text-sm">
              Field analytics will be added in upcoming phases.
            </p>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Total Matches</h2>
          <div className="rounded-lg border border-dashed border-muted-foreground/25 p-8 text-center">
            <p className="text-muted-foreground text-sm">
              Match statistics will be added in upcoming phases.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

interface StatCardProps {
  title: string
  value: number
  icon: LucideIcon
  href?: string
}

function StatCard({ title, value, icon: Icon, href }: StatCardProps) {
  const content = (
    <div className="rounded-xl border bg-card p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <span className="text-xs font-medium text-muted-foreground">{title}</span>
        <Icon className="h-5 w-5 text-muted-foreground" />
      </div>
      <p className="text-2xl font-bold text-foreground">{value.toLocaleString()}</p>
      {href && <p className="text-xs text-primary mt-1 hover:underline">View all</p>}
    </div>
  )

  if (href) {
    return <Link href={href}>{content}</Link>
  }

  return content
}
