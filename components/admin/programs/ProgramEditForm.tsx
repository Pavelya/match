/**
 * Program Edit Form Component
 *
 * Client component for editing existing academic programs.
 * Features:
 * - Pre-populated with current program data
 * - Full OR-group support for course requirements
 * - Visual color-coding of OR-groups
 */

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  BookOpen,
  Building2,
  GraduationCap,
  Clock,
  Target,
  Globe,
  Loader2,
  AlertCircle,
  Plus,
  Trash2,
  ChevronDown,
  CheckCircle2,
  Link2,
  Unlink
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface University {
  id: string
  name: string
  country: { flagEmoji: string; name: string }
}

interface FieldOfStudy {
  id: string
  name: string
}

interface IBCourse {
  id: string
  name: string
  code: string
  group: number
}

interface CourseRequirement {
  id: string
  ibCourseId: string
  requiredLevel: 'HL' | 'SL'
  minGrade: number
  isCritical: boolean
  orGroupId: string | null
}

interface Program {
  id: string
  name: string
  description: string
  universityId: string
  fieldOfStudyId: string
  degreeType: string
  duration: string
  minIBPoints: number | null
  programUrl: string | null
  courseRequirements: {
    id: string
    ibCourseId: string
    requiredLevel: string
    minGrade: number
    isCritical: boolean
    orGroupId: string | null
  }[]
}

interface ProgramEditFormProps {
  program: Program
  universities: University[]
  fieldsOfStudy: FieldOfStudy[]
  ibCourses: IBCourse[]
}

const DEGREE_TYPES = ['Bachelor', 'Master', 'PhD', 'Diploma', 'Certificate']

const GROUP_NAMES: Record<number, string> = {
  1: 'Group 1: Studies in Language and Literature',
  2: 'Group 2: Language Acquisition',
  3: 'Group 3: Individuals and Societies',
  4: 'Group 4: Sciences',
  5: 'Group 5: Mathematics',
  6: 'Group 6: The Arts'
}

const OR_GROUP_COLORS = [
  'border-l-blue-500 bg-blue-50',
  'border-l-green-500 bg-green-50',
  'border-l-purple-500 bg-purple-50',
  'border-l-orange-500 bg-orange-50',
  'border-l-pink-500 bg-pink-50',
  'border-l-cyan-500 bg-cyan-50'
]

export function ProgramEditForm({
  program,
  universities,
  fieldsOfStudy,
  ibCourses
}: ProgramEditFormProps) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    name: program.name,
    description: program.description,
    universityId: program.universityId,
    fieldOfStudyId: program.fieldOfStudyId,
    degreeType: program.degreeType,
    duration: program.duration,
    minIBPoints: program.minIBPoints?.toString() || '',
    programUrl: program.programUrl || ''
  })

  const [requirements, setRequirements] = useState<CourseRequirement[]>(
    program.courseRequirements.map((r) => ({
      id: r.id,
      ibCourseId: r.ibCourseId,
      requiredLevel: r.requiredLevel as 'HL' | 'SL',
      minGrade: r.minGrade,
      isCritical: r.isCritical,
      orGroupId: r.orGroupId
    }))
  )

  const orGroups = [...new Set(requirements.map((r) => r.orGroupId).filter(Boolean))] as string[]

  const coursesByGroup = ibCourses.reduce(
    (acc, course) => {
      if (!acc[course.group]) acc[course.group] = []
      acc[course.group].push(course)
      return acc
    },
    {} as Record<number, IBCourse[]>
  )

  function addRequirement() {
    setRequirements([
      ...requirements,
      {
        id: crypto.randomUUID(),
        ibCourseId: '',
        requiredLevel: 'HL',
        minGrade: 5,
        isCritical: false,
        orGroupId: null
      }
    ])
  }

  function addOrAlternative(existingReq: CourseRequirement) {
    const orGroupId = existingReq.orGroupId || crypto.randomUUID()
    const updatedRequirements = requirements.map((r) =>
      r.id === existingReq.id ? { ...r, orGroupId } : r
    )
    const newReq: CourseRequirement = {
      id: crypto.randomUUID(),
      ibCourseId: '',
      requiredLevel: 'HL',
      minGrade: 5,
      isCritical: existingReq.isCritical,
      orGroupId
    }
    setRequirements([...updatedRequirements, newReq])
  }

  function removeFromOrGroup(reqId: string) {
    setRequirements(requirements.map((r) => (r.id === reqId ? { ...r, orGroupId: null } : r)))
  }

  function removeRequirement(id: string) {
    const reqToRemove = requirements.find((r) => r.id === id)
    if (reqToRemove?.orGroupId) {
      const groupMembers = requirements.filter((r) => r.orGroupId === reqToRemove.orGroupId)
      if (groupMembers.length === 2) {
        setRequirements(
          requirements
            .filter((r) => r.id !== id)
            .map((r) => (r.orGroupId === reqToRemove.orGroupId ? { ...r, orGroupId: null } : r))
        )
        return
      }
    }
    setRequirements(requirements.filter((r) => r.id !== id))
  }

  function updateRequirement(id: string, updates: Partial<CourseRequirement>) {
    setRequirements(requirements.map((r) => (r.id === id ? { ...r, ...updates } : r)))
  }

  function getOrGroupColor(orGroupId: string | null): string {
    if (!orGroupId) return ''
    const index = orGroups.indexOf(orGroupId)
    return OR_GROUP_COLORS[index % OR_GROUP_COLORS.length]
  }

  function getOrGroupLabel(orGroupId: string | null): string {
    if (!orGroupId) return ''
    const index = orGroups.indexOf(orGroupId)
    return `OR Group ${index + 1}`
  }

  // Group requirements for display
  const groupedRequirements: { orGroupId: string | null; items: CourseRequirement[] }[] = []
  const processedOrGroups = new Set<string>()

  requirements.forEach((req) => {
    if (req.orGroupId) {
      if (!processedOrGroups.has(req.orGroupId)) {
        processedOrGroups.add(req.orGroupId)
        const groupItems = requirements.filter((r) => r.orGroupId === req.orGroupId)
        groupedRequirements.push({ orGroupId: req.orGroupId, items: groupItems })
      }
    } else {
      groupedRequirements.push({ orGroupId: null, items: [req] })
    }
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSuccess(false)

    try {
      const validRequirements = requirements.filter((r) => r.ibCourseId)

      const res = await fetch(`/api/admin/programs/${program.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          courseRequirements: validRequirements.map((r) => ({
            ibCourseId: r.ibCourseId,
            requiredLevel: r.requiredLevel,
            minGrade: r.minGrade,
            isCritical: r.isCritical,
            orGroupId: r.orGroupId
          }))
        })
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to update program')
      }

      setSuccess(true)
      setTimeout(() => {
        router.push(`/admin/programs/${program.id}`)
        router.refresh()
      }, 1000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update program')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive flex items-center gap-2">
          <AlertCircle className="h-5 w-5 shrink-0" />
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-lg border border-green-500/50 bg-green-50 p-4 text-green-700 flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          Program updated successfully! Redirecting...
        </div>
      )}

      {/* Basic Info Section */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Program Information
          </h3>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
              Program Name <span className="text-destructive">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-foreground mb-1">
              Description <span className="text-destructive">*</span>
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-2.5 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              University <span className="text-destructive">*</span>
            </label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <select
                value={formData.universityId}
                onChange={(e) => setFormData({ ...formData, universityId: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 border rounded-lg bg-background appearance-none"
                required
              >
                {universities.map((uni) => (
                  <option key={uni.id} value={uni.id}>
                    {uni.country.flagEmoji} {uni.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Field of Study <span className="text-destructive">*</span>
            </label>
            <div className="relative">
              <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <select
                value={formData.fieldOfStudyId}
                onChange={(e) => setFormData({ ...formData, fieldOfStudyId: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 border rounded-lg bg-background appearance-none"
                required
              >
                {fieldsOfStudy.map((field) => (
                  <option key={field.id} value={field.id}>
                    {field.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Degree Type <span className="text-destructive">*</span>
            </label>
            <select
              value={formData.degreeType}
              onChange={(e) => setFormData({ ...formData, degreeType: e.target.value })}
              className="w-full px-4 py-2.5 border rounded-lg bg-background"
              required
            >
              {DEGREE_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Duration <span className="text-destructive">*</span>
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 border rounded-lg bg-background"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Minimum IB Points
            </label>
            <div className="relative">
              <Target className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="number"
                value={formData.minIBPoints}
                onChange={(e) => setFormData({ ...formData, minIBPoints: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 border rounded-lg bg-background"
                min="24"
                max="45"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Program URL</label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="url"
                value={formData.programUrl}
                onChange={(e) => setFormData({ ...formData, programUrl: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 border rounded-lg bg-background"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Course Requirements */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-foreground">IB Course Requirements</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Use the link icon to create OR alternatives (student needs ONE).
            </p>
          </div>
          <button
            type="button"
            onClick={addRequirement}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium border rounded-lg hover:bg-muted"
          >
            <Plus className="h-4 w-4" />
            Add Requirement
          </button>
        </div>

        {requirements.length === 0 ? (
          <div className="border-2 border-dashed rounded-lg p-8 text-center">
            <p className="text-muted-foreground">No course requirements.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {groupedRequirements.map((group) => (
              <div
                key={group.orGroupId || group.items[0].id}
                className={cn(
                  'border rounded-lg overflow-hidden',
                  group.orGroupId && 'border-l-4',
                  group.orGroupId && getOrGroupColor(group.orGroupId)
                )}
              >
                {group.orGroupId && (
                  <div className="px-4 py-2 bg-muted/50 border-b flex items-center gap-2">
                    <Link2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{getOrGroupLabel(group.orGroupId)}</span>
                    <span className="text-xs text-muted-foreground">
                      (Student needs ONE of these)
                    </span>
                  </div>
                )}

                <div className={cn(group.orGroupId && 'divide-y')}>
                  {group.items.map((req, index) => (
                    <div key={req.id} className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-sm font-medium text-muted-foreground">
                          {group.orGroupId ? `Option ${index + 1}` : 'Requirement'}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => addOrAlternative(req)}
                            className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded"
                            title="Add OR alternative"
                          >
                            <Link2 className="h-4 w-4" />
                          </button>
                          {group.orGroupId && (
                            <button
                              type="button"
                              onClick={() => removeFromOrGroup(req.id)}
                              className="p-1.5 text-muted-foreground hover:text-orange-600 hover:bg-orange-50 rounded"
                              title="Remove from OR group"
                            >
                              <Unlink className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => removeRequirement(req.id)}
                            className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-4">
                        <div className="sm:col-span-2">
                          <label className="block text-sm font-medium text-foreground mb-1">
                            IB Course
                          </label>
                          <select
                            value={req.ibCourseId}
                            onChange={(e) =>
                              updateRequirement(req.id, { ibCourseId: e.target.value })
                            }
                            className="w-full px-3 py-2 border rounded-lg bg-background text-sm"
                          >
                            <option value="">Select a course</option>
                            {Object.entries(coursesByGroup).map(([group, courses]) => (
                              <optgroup key={group} label={GROUP_NAMES[parseInt(group)]}>
                                {courses.map((course) => (
                                  <option key={course.id} value={course.id}>
                                    {course.name} ({course.code})
                                  </option>
                                ))}
                              </optgroup>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1">
                            Level
                          </label>
                          <select
                            value={req.requiredLevel}
                            onChange={(e) =>
                              updateRequirement(req.id, {
                                requiredLevel: e.target.value as 'HL' | 'SL'
                              })
                            }
                            className="w-full px-3 py-2 border rounded-lg bg-background text-sm"
                          >
                            <option value="HL">Higher Level (HL)</option>
                            <option value="SL">Standard Level (SL)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1">
                            Min Grade
                          </label>
                          <select
                            value={req.minGrade}
                            onChange={(e) =>
                              updateRequirement(req.id, { minGrade: parseInt(e.target.value) })
                            }
                            className="w-full px-3 py-2 border rounded-lg bg-background text-sm"
                          >
                            {[1, 2, 3, 4, 5, 6, 7].map((g) => (
                              <option key={g} value={g}>
                                {g}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`critical-${req.id}`}
                          checked={req.isCritical}
                          onChange={(e) =>
                            updateRequirement(req.id, { isCritical: e.target.checked })
                          }
                          className="h-4 w-4 rounded border-gray-300 text-primary"
                        />
                        <label
                          htmlFor={`critical-${req.id}`}
                          className="text-sm text-muted-foreground"
                        >
                          Critical requirement
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {requirements.length > 0 && (
          <div className="text-xs text-muted-foreground bg-muted/50 rounded-lg p-3">
            <strong>Tip:</strong> Click <Link2 className="h-3 w-3 inline-block mx-0.5" /> to add OR
            alternatives. Grouped requirements share colors.
          </div>
        )}
      </div>

      {/* Submit */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <Link
          href={`/admin/programs/${program.id}`}
          className="px-6 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={saving || success}
          className={cn(
            'flex items-center gap-2 px-6 py-2.5 text-sm font-medium rounded-lg',
            'bg-primary text-primary-foreground hover:bg-primary/90',
            (saving || success) && 'opacity-50 cursor-not-allowed'
          )}
        >
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  )
}
