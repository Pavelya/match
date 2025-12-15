/**
 * Student Profile Form Component
 *
 * Client-side form for editing student academic data.
 * Handles IB courses, grades, and preferences with auto-calculation of total points.
 *
 * Part of Task 4.6.3: Build student profile editor
 */

'use client'

import { useState, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { FormSection, FormDivider, FormActions } from '@/components/admin/shared'
import { BookOpen, Target, Plus, Trash2, Loader2, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Course {
  courseId: string
  level: 'HL' | 'SL'
  grade: number
}

interface IBCourse {
  id: string
  name: string
  code: string
  group: number
}

interface FieldOfStudy {
  id: string
  name: string
}

interface Country {
  id: string
  name: string
  flagEmoji: string | null
}

interface StudentData {
  id: string
  userId: string
  name: string
  email: string
  totalIBPoints: number | null
  tokGrade: string | null
  eeGrade: string | null
  courses: Course[]
  preferredFields: string[]
  preferredCountries: string[]
}

interface StudentProfileFormProps {
  student: StudentData
  coursesByGroup: Record<number, IBCourse[]>
  fieldsOfStudy: FieldOfStudy[]
  countries: Country[]
}

const GRADES = ['A', 'B', 'C', 'D', 'E']
const GRADE_POINTS: Record<string, number> = { A: 3, B: 2, C: 1, D: 0, E: 0 }
const GROUP_NAMES: Record<number, string> = {
  1: 'Language & Literature',
  2: 'Language Acquisition',
  3: 'Individuals & Societies',
  4: 'Sciences',
  5: 'Mathematics',
  6: 'The Arts'
}

export function StudentProfileForm({
  student,
  coursesByGroup,
  fieldsOfStudy,
  countries
}: StudentProfileFormProps) {
  const router = useRouter()

  // Form state
  const [courses, setCourses] = useState<Course[]>(student.courses)
  const [tokGrade, setTokGrade] = useState<string>(student.tokGrade || '')
  const [eeGrade, setEeGrade] = useState<string>(student.eeGrade || '')
  const [manualPoints, setManualPoints] = useState<string>(student.totalIBPoints?.toString() || '')
  const [useManualPoints, setUseManualPoints] = useState(false)
  const [selectedFields, setSelectedFields] = useState<string[]>(student.preferredFields)
  const [selectedCountries, setSelectedCountries] = useState<string[]>(student.preferredCountries)

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Calculate total IB points
  const calculatedPoints = useMemo(() => {
    const coursePoints = courses.reduce((sum, c) => sum + c.grade, 0)
    const tokPoints = GRADE_POINTS[tokGrade] || 0
    const eePoints = GRADE_POINTS[eeGrade] || 0
    // TOK + EE combined gives 0-3 bonus points (simplified calculation)
    const bonusPoints = Math.min(tokPoints + eePoints, 3)
    return coursePoints + bonusPoints
  }, [courses, tokGrade, eeGrade])

  const totalIBPoints = useManualPoints ? parseInt(manualPoints) || 0 : calculatedPoints

  // Add a course
  const addCourse = useCallback(() => {
    if (courses.length >= 6) return
    setCourses([...courses, { courseId: '', level: 'HL', grade: 7 }])
  }, [courses])

  // Remove a course
  const removeCourse = useCallback((index: number) => {
    setCourses((prev) => prev.filter((_, i) => i !== index))
  }, [])

  // Update a course
  const updateCourse = useCallback((index: number, field: keyof Course, value: string | number) => {
    setCourses((prev) =>
      prev.map((course, i) => (i === index ? { ...course, [field]: value } : course))
    )
  }, [])

  // Toggle field selection
  const toggleField = useCallback((fieldId: string) => {
    setSelectedFields((prev) =>
      prev.includes(fieldId) ? prev.filter((id) => id !== fieldId) : [...prev, fieldId]
    )
  }, [])

  // Toggle country selection
  const toggleCountry = useCallback((countryId: string) => {
    setSelectedCountries((prev) =>
      prev.includes(countryId) ? prev.filter((id) => id !== countryId) : [...prev, countryId]
    )
  }, [])

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch(`/api/coordinator/students/${student.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courses: courses.filter((c) => c.courseId), // Only include valid courses
          totalIBPoints: totalIBPoints,
          tokGrade: tokGrade || null,
          eeGrade: eeGrade || null,
          preferredFields: selectedFields,
          preferredCountries: selectedCountries
        })
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to save changes')
      }

      router.push(`/coordinator/students/${student.id}`)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save changes')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-red-700">{error}</div>
        </div>
      )}

      {/* IB Courses Section */}
      <FormSection
        title="IB Courses"
        description="Add the student's IB courses with level (HL/SL) and predicted/final grade"
      >
        <div className="space-y-4">
          {courses.map((course, index) => (
            <div key={index} className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
              {/* Course Select */}
              <div className="flex-1">
                <select
                  value={course.courseId}
                  onChange={(e) => updateCourse(index, 'courseId', e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">Select course...</option>
                  {Object.entries(coursesByGroup).map(([group, groupCourses]) => (
                    <optgroup key={group} label={`Group ${group}: ${GROUP_NAMES[parseInt(group)]}`}>
                      {groupCourses.map((c) => (
                        <option
                          key={c.id}
                          value={c.id}
                          disabled={courses.some((sc) => sc.courseId === c.id && sc !== course)}
                        >
                          {c.name}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              {/* Level Select */}
              <select
                value={course.level}
                onChange={(e) => updateCourse(index, 'level', e.target.value as 'HL' | 'SL')}
                className="h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-20"
              >
                <option value="HL">HL</option>
                <option value="SL">SL</option>
              </select>

              {/* Grade Select */}
              <select
                value={course.grade}
                onChange={(e) => updateCourse(index, 'grade', parseInt(e.target.value))}
                className="h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-20"
              >
                {[7, 6, 5, 4, 3, 2, 1].map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>

              {/* Remove Button */}
              <button
                type="button"
                onClick={() => removeCourse(index)}
                className="h-10 w-10 flex items-center justify-center rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-colors"
                title="Remove course"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}

          {courses.length < 6 && (
            <button
              type="button"
              onClick={addCourse}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Add Course
            </button>
          )}

          {courses.length === 0 && (
            <div className="text-center py-6 text-muted-foreground">
              <BookOpen className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No courses added. Click &quot;Add Course&quot; to begin.</p>
            </div>
          )}
        </div>
      </FormSection>

      <FormDivider />

      {/* TOK & EE Grades */}
      <FormSection
        title="Core Components"
        description="Theory of Knowledge and Extended Essay grades"
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">TOK Grade</label>
            <select
              value={tokGrade}
              onChange={(e) => setTokGrade(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Not set</option>
              {GRADES.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">EE Grade</label>
            <select
              value={eeGrade}
              onChange={(e) => setEeGrade(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Not set</option>
              {GRADES.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
        </div>
      </FormSection>

      <FormDivider />

      {/* Total IB Points */}
      <FormSection title="Total IB Points" description="Auto-calculated or enter manually">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
              <Target className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="text-2xl font-bold">{totalIBPoints}</div>
                <div className="text-xs text-muted-foreground">
                  {useManualPoints ? 'Manual override' : 'Auto-calculated'}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={useManualPoints}
                onChange={(e) => setUseManualPoints(e.target.checked)}
                className="rounded border-gray-300"
              />
              Override manually
            </label>
            {useManualPoints && (
              <input
                type="number"
                min="0"
                max="45"
                value={manualPoints}
                onChange={(e) => setManualPoints(e.target.value)}
                className="h-10 w-24 px-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="0-45"
              />
            )}
          </div>
        </div>
      </FormSection>

      <FormDivider />

      {/* Preferred Fields of Study */}
      <FormSection
        title="Preferred Fields of Study"
        description="Select the fields this student is interested in"
      >
        <div className="flex flex-wrap gap-2">
          {fieldsOfStudy.map((field) => (
            <button
              key={field.id}
              type="button"
              onClick={() => toggleField(field.id)}
              className={cn(
                'px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
                selectedFields.includes(field.id)
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              )}
            >
              {field.name}
            </button>
          ))}
        </div>
        {selectedFields.length > 0 && (
          <p className="text-xs text-muted-foreground mt-2">
            {selectedFields.length} field{selectedFields.length !== 1 ? 's' : ''} selected
          </p>
        )}
      </FormSection>

      <FormDivider />

      {/* Preferred Countries */}
      <FormSection
        title="Preferred Countries"
        description="Select the countries this student prefers for their studies"
      >
        <div className="flex flex-wrap gap-2">
          {countries.map((country) => (
            <button
              key={country.id}
              type="button"
              onClick={() => toggleCountry(country.id)}
              className={cn(
                'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
                selectedCountries.includes(country.id)
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              )}
            >
              {country.flagEmoji && <span>{country.flagEmoji}</span>}
              {country.name}
            </button>
          ))}
        </div>
        {selectedCountries.length > 0 && (
          <p className="text-xs text-muted-foreground mt-2">
            {selectedCountries.length} {selectedCountries.length === 1 ? 'country' : 'countries'}{' '}
            selected
          </p>
        )}
      </FormSection>

      <FormActions>
        <button
          type="button"
          onClick={() => router.back()}
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Changes'
          )}
        </button>
      </FormActions>
    </form>
  )
}
