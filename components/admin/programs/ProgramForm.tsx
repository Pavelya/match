/**
 * Program Form Component (Create)
 *
 * Client component for creating new academic programs.
 * Features:
 * - Basic info: name, description, university, field of study
 * - Program details: degree type, duration, min IB points
 * - Course requirements with OR groups support
 * - Loading and error states
 *
 * OR-Groups: Requirements with the same orGroupId are alternatives.
 * Student only needs to fulfill ONE requirement in an OR-group.
 *
 * Uses Lucide React icons (per icons-reference.md)
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
  ArrowLeft,
  Plus,
  Trash2,
  ChevronDown,
  Link2,
  Unlink
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface University {
  id: string
  name: string
  country: {
    flagEmoji: string
    name: string
  }
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

interface ProgramFormProps {
  universities: University[]
  fieldsOfStudy: FieldOfStudy[]
  ibCourses: IBCourse[]
}

const DEGREE_TYPES = ['Bachelor', 'Master', 'PhD', 'Diploma', 'Certificate']

// IB course group names
const GROUP_NAMES: Record<number, string> = {
  1: 'Group 1: Studies in Language and Literature',
  2: 'Group 2: Language Acquisition',
  3: 'Group 3: Individuals and Societies',
  4: 'Group 4: Sciences',
  5: 'Group 5: Mathematics',
  6: 'Group 6: The Arts'
}

// Colors for OR-groups
const OR_GROUP_COLORS = [
  'border-l-blue-500 bg-blue-50',
  'border-l-green-500 bg-green-50',
  'border-l-purple-500 bg-purple-50',
  'border-l-orange-500 bg-orange-50',
  'border-l-pink-500 bg-pink-50',
  'border-l-cyan-500 bg-cyan-50'
]

export function ProgramForm({ universities, fieldsOfStudy, ibCourses }: ProgramFormProps) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    universityId: '',
    fieldOfStudyId: '',
    degreeType: '',
    duration: '',
    minIBPoints: '',
    programUrl: ''
  })

  // Course requirements state
  const [requirements, setRequirements] = useState<CourseRequirement[]>([])

  // Track active OR-groups for visual grouping
  const orGroups = [...new Set(requirements.map((r) => r.orGroupId).filter(Boolean))] as string[]

  // Group courses by their IB group for easier selection
  const coursesByGroup = ibCourses.reduce(
    (acc, course) => {
      if (!acc[course.group]) {
        acc[course.group] = []
      }
      acc[course.group].push(course)
      return acc
    },
    {} as Record<number, IBCourse[]>
  )

  function addRequirement() {
    const newReq: CourseRequirement = {
      id: crypto.randomUUID(),
      ibCourseId: '',
      requiredLevel: 'HL',
      minGrade: 5,
      isCritical: false,
      orGroupId: null
    }
    setRequirements([...requirements, newReq])
  }

  function addOrAlternative(existingReq: CourseRequirement) {
    // Create a new requirement in the same OR-group
    const orGroupId = existingReq.orGroupId || crypto.randomUUID()

    // Update existing requirement to have the orGroupId if it doesn't have one
    const updatedRequirements = requirements.map((r) =>
      r.id === existingReq.id ? { ...r, orGroupId } : r
    )

    const newReq: CourseRequirement = {
      id: crypto.randomUUID(),
      ibCourseId: '',
      requiredLevel: 'HL',
      minGrade: 5,
      isCritical: existingReq.isCritical, // Inherit critical status
      orGroupId
    }

    setRequirements([...updatedRequirements, newReq])
  }

  function removeFromOrGroup(reqId: string) {
    setRequirements(
      requirements.map((r) => {
        if (r.id === reqId) {
          return { ...r, orGroupId: null }
        }
        return r
      })
    )
  }

  function removeRequirement(id: string) {
    const reqToRemove = requirements.find((r) => r.id === id)
    if (reqToRemove?.orGroupId) {
      // Check if this is the last item in the OR-group
      const groupMembers = requirements.filter((r) => r.orGroupId === reqToRemove.orGroupId)
      if (groupMembers.length === 2) {
        // Only 2 members, removing one means the other should lose its orGroupId
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      // Filter out incomplete requirements
      const validRequirements = requirements.filter((r) => r.ibCourseId)

      const res = await fetch('/api/admin/programs', {
        method: 'POST',
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
        throw new Error(data.error || 'Failed to create program')
      }

      // Success - redirect to programs list
      router.push('/admin/programs')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create program')
    } finally {
      setSaving(false)
    }
  }

  // Group requirements for display - OR-groups should be visually grouped
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

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Back link */}
      <Link
        href="/admin/programs"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Programs
      </Link>

      {/* Error display */}
      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive flex items-center gap-2">
          <AlertCircle className="h-5 w-5 shrink-0" />
          {error}
        </div>
      )}

      {/* Basic Info Section */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Program Information
          </h3>
          <p className="text-sm text-muted-foreground mt-1">Basic details about the program.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Name */}
          <div className="sm:col-span-2">
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
              Program Name <span className="text-destructive">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              placeholder="e.g., Computer Science"
              required
            />
          </div>

          {/* Description */}
          <div className="sm:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-foreground mb-1">
              Description <span className="text-destructive">*</span>
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-2.5 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
              placeholder="Brief description of the program, career outcomes, and unique features..."
              required
            />
          </div>

          {/* University */}
          <div>
            <label htmlFor="university" className="block text-sm font-medium text-foreground mb-1">
              University <span className="text-destructive">*</span>
            </label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <select
                id="university"
                value={formData.universityId}
                onChange={(e) => setFormData({ ...formData, universityId: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors appearance-none"
                required
              >
                <option value="">Select a university</option>
                {universities.map((uni) => (
                  <option key={uni.id} value={uni.id}>
                    {uni.country.flagEmoji} {uni.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* Field of Study */}
          <div>
            <label
              htmlFor="fieldOfStudy"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Field of Study <span className="text-destructive">*</span>
            </label>
            <div className="relative">
              <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <select
                id="fieldOfStudy"
                value={formData.fieldOfStudyId}
                onChange={(e) => setFormData({ ...formData, fieldOfStudyId: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors appearance-none"
                required
              >
                <option value="">Select a field</option>
                {fieldsOfStudy.map((field) => (
                  <option key={field.id} value={field.id}>
                    {field.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* Degree Type */}
          <div>
            <label htmlFor="degreeType" className="block text-sm font-medium text-foreground mb-1">
              Degree Type <span className="text-destructive">*</span>
            </label>
            <select
              id="degreeType"
              value={formData.degreeType}
              onChange={(e) => setFormData({ ...formData, degreeType: e.target.value })}
              className="w-full px-4 py-2.5 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              required
            >
              <option value="">Select degree type</option>
              {DEGREE_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Duration */}
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-foreground mb-1">
              Duration <span className="text-destructive">*</span>
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                id="duration"
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                placeholder="e.g., 3 years"
                required
              />
            </div>
          </div>

          {/* Min IB Points */}
          <div>
            <label htmlFor="minIBPoints" className="block text-sm font-medium text-foreground mb-1">
              Minimum IB Points
            </label>
            <div className="relative">
              <Target className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                id="minIBPoints"
                type="number"
                value={formData.minIBPoints}
                onChange={(e) => setFormData({ ...formData, minIBPoints: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                placeholder="e.g., 36"
                min="24"
                max="45"
              />
            </div>
          </div>

          {/* Program URL */}
          <div>
            <label htmlFor="programUrl" className="block text-sm font-medium text-foreground mb-1">
              Program URL
            </label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                id="programUrl"
                type="url"
                value={formData.programUrl}
                onChange={(e) => setFormData({ ...formData, programUrl: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                placeholder="https://university.edu/program"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Course Requirements Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-foreground">IB Course Requirements</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Specify which IB courses are required. Use &quot;Add OR alternative&quot; to create
              alternative requirements (student needs to meet ONE).
            </p>
          </div>
          <button
            type="button"
            onClick={addRequirement}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium border rounded-lg hover:bg-muted transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Requirement
          </button>
        </div>

        {requirements.length === 0 ? (
          <div className="border-2 border-dashed rounded-lg p-8 text-center">
            <BookOpen className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-muted-foreground">No course requirements added yet.</p>
            <button
              type="button"
              onClick={addRequirement}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:underline"
            >
              <Plus className="h-4 w-4" />
              Add first requirement
            </button>
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
                {/* OR-Group Header */}
                {group.orGroupId && (
                  <div className="px-4 py-2 bg-muted/50 border-b flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Link2 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">
                        {getOrGroupLabel(group.orGroupId)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        (Student needs to meet ONE of these)
                      </span>
                    </div>
                  </div>
                )}

                {/* Requirements in this group */}
                <div className={cn(group.orGroupId && 'divide-y')}>
                  {group.items.map((req, index) => (
                    <div key={req.id} className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {group.orGroupId && (
                            <span className="text-xs font-medium text-muted-foreground">
                              Option {index + 1}
                            </span>
                          )}
                          {!group.orGroupId && (
                            <span className="text-sm font-medium text-muted-foreground">
                              Requirement
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          {/* Add OR alternative button */}
                          <button
                            type="button"
                            onClick={() => addOrAlternative(req)}
                            className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded transition-colors"
                            title="Add OR alternative"
                          >
                            <Link2 className="h-4 w-4" />
                          </button>
                          {/* Remove from OR group */}
                          {group.orGroupId && (
                            <button
                              type="button"
                              onClick={() => removeFromOrGroup(req.id)}
                              className="p-1.5 text-muted-foreground hover:text-orange-600 hover:bg-orange-50 rounded transition-colors"
                              title="Remove from OR group"
                            >
                              <Unlink className="h-4 w-4" />
                            </button>
                          )}
                          {/* Delete */}
                          <button
                            type="button"
                            onClick={() => removeRequirement(req.id)}
                            className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded transition-colors"
                            title="Delete requirement"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-4">
                        {/* Course Select */}
                        <div className="sm:col-span-2">
                          <label className="block text-sm font-medium text-foreground mb-1">
                            IB Course
                          </label>
                          <select
                            value={req.ibCourseId}
                            onChange={(e) =>
                              updateRequirement(req.id, { ibCourseId: e.target.value })
                            }
                            className="w-full px-3 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm"
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

                        {/* Level */}
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
                            className="w-full px-3 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm"
                          >
                            <option value="HL">Higher Level (HL)</option>
                            <option value="SL">Standard Level (SL)</option>
                          </select>
                        </div>

                        {/* Min Grade */}
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1">
                            Min Grade
                          </label>
                          <select
                            value={req.minGrade}
                            onChange={(e) =>
                              updateRequirement(req.id, { minGrade: parseInt(e.target.value) })
                            }
                            className="w-full px-3 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm"
                          >
                            {[1, 2, 3, 4, 5, 6, 7].map((grade) => (
                              <option key={grade} value={grade}>
                                {grade}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Critical flag */}
                      <div className="mt-3 flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`critical-${req.id}`}
                          checked={req.isCritical}
                          onChange={(e) =>
                            updateRequirement(req.id, { isCritical: e.target.checked })
                          }
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label
                          htmlFor={`critical-${req.id}`}
                          className="text-sm text-muted-foreground"
                        >
                          Mark as critical requirement (must be met for admission)
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Help text */}
        {requirements.length > 0 && (
          <div className="text-xs text-muted-foreground bg-muted/50 rounded-lg p-3">
            <strong>Tip:</strong> Click the <Link2 className="h-3 w-3 inline-block mx-0.5" /> icon
            to add an alternative option (OR condition). Requirements in the same OR group are
            color-coded together.
          </div>
        )}
      </div>

      {/* Submit */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <Link
          href="/admin/programs"
          className="px-6 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={saving}
          className={cn(
            'flex items-center gap-2 px-6 py-2.5 text-sm font-medium rounded-lg transition-colors',
            'bg-primary text-primary-foreground hover:bg-primary/90',
            saving && 'opacity-50 cursor-not-allowed'
          )}
        >
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          {saving ? 'Creating...' : 'Create Program'}
        </button>
      </div>
    </form>
  )
}
