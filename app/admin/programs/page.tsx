/**
 * Admin Programs List Page
 *
 * Displays all academic programs in a table with:
 * - Program name
 * - University
 * - Field of study
 * - Degree type & duration
 * - Min IB points
 * - Edit and delete actions
 */

import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Plus, BookOpen, Pencil, Building2, GraduationCap } from 'lucide-react'
import { ProgramDeleteButton } from '@/components/admin/programs/ProgramDeleteButton'

export default async function ProgramsPage() {
  const programs = await prisma.academicProgram.findMany({
    orderBy: [{ university: { name: 'asc' } }, { name: 'asc' }],
    include: {
      university: {
        include: {
          country: true
        }
      },
      fieldOfStudy: true,
      _count: {
        select: {
          courseRequirements: true,
          savedBy: true
        }
      }
    }
  })

  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Academic Programs</h1>
          <p className="mt-2 text-muted-foreground">
            Manage university programs and their IB requirements.
          </p>
        </div>
        <Link
          href="/admin/programs/new"
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Program
        </Link>
      </div>

      {/* Programs Table */}
      {programs.length === 0 ? (
        <div className="rounded-xl border bg-card p-12 text-center">
          <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No programs yet</h3>
          <p className="text-muted-foreground mb-6">
            Get started by adding your first academic program.
          </p>
          <Link
            href="/admin/programs/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Program
          </Link>
        </div>
      ) : (
        <div className="rounded-xl border bg-card overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
                  Program
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
                  University
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
                  Field of Study
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
                  Degree
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
                  Min IB Points
                </th>
                <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {programs.map((program) => (
                <tr key={program.id} className="hover:bg-muted/30">
                  {/* Program Name */}
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/programs/${program.id}`}
                      className="font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {program.name}
                    </Link>
                    <p className="text-xs text-muted-foreground mt-0.5">{program.duration}</p>
                  </td>

                  {/* University */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-foreground">{program.university.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {program.university.country.flagEmoji} {program.university.city}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Field of Study */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {program.fieldOfStudy.name}
                      </span>
                    </div>
                  </td>

                  {/* Degree Type */}
                  <td className="px-4 py-3">
                    <span className="inline-flex px-2 py-1 text-xs font-medium bg-muted rounded-full">
                      {program.degreeType}
                    </span>
                  </td>

                  {/* Min IB Points */}
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {program.minIBPoints ? (
                      <span className="font-medium text-foreground">{program.minIBPoints}</span>
                    ) : (
                      <span className="text-muted-foreground/60">—</span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/programs/${program.id}/edit`}
                        className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <ProgramDeleteButton programId={program.id} programName={program.name} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Stats */}
      {programs.length > 0 && (
        <div className="mt-4 text-sm text-muted-foreground">
          Showing {programs.length} program{programs.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  )
}
