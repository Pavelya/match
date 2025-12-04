'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { IB_SUBJECT_GROUPS, type IBSubjectGroup } from '@/lib/constants/ib-groups'
import { ChevronLeft } from 'lucide-react'

interface IBCourse {
  id: string
  name: string
  code: string
  group: number
}

interface CourseSelection {
  courseId: string
  courseName: string
  level: 'HL' | 'SL'
  grade: number
}

interface SubjectSelectorDialogProps {
  courses: IBCourse[]
  existingSelections: CourseSelection[]
  onAddSubject: (selection: CourseSelection) => void
}

export function SubjectSelectorDialog({
  courses,
  existingSelections,
  onAddSubject
}: SubjectSelectorDialogProps) {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<'group' | 'subject' | 'details'>('group')
  const [selectedGroup, setSelectedGroup] = useState<IBSubjectGroup | null>(null)
  const [selectedCourse, setSelectedCourse] = useState<IBCourse | null>(null)
  const [selectedLevel, setSelectedLevel] = useState<'HL' | 'SL' | null>(null)
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null)

  const selectedCourseIds = existingSelections.map((s) => s.courseId)
  const GRADES = [7, 6, 5, 4, 3, 2, 1]

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      // Reset state when closing
      setStep('group')
      setSelectedGroup(null)
      setSelectedCourse(null)
      setSelectedLevel(null)
      setSelectedGrade(null)
    }
    setOpen(newOpen)
  }

  const handleGroupSelect = (group: IBSubjectGroup) => {
    setSelectedGroup(group)
    setStep('subject')
  }

  const handleSubjectSelect = (course: IBCourse) => {
    setSelectedCourse(course)
    setStep('details')
  }

  const handleAddSubject = () => {
    if (selectedCourse && selectedLevel && selectedGrade !== null) {
      onAddSubject({
        courseId: selectedCourse.id,
        courseName: selectedCourse.name,
        level: selectedLevel,
        grade: selectedGrade
      })
      handleOpenChange(false)
    }
  }

  const handleBack = () => {
    if (step === 'subject') {
      setStep('group')
      setSelectedGroup(null)
    } else if (step === 'details') {
      setStep('subject')
      setSelectedCourse(null)
      setSelectedLevel(null)
      setSelectedGrade(null)
    }
  }

  const coursesInSelectedGroup = selectedGroup
    ? courses.filter((c) => c.group === selectedGroup.id && !selectedCourseIds.includes(c.id))
    : []

  const canAddSubject = selectedCourse && selectedLevel && selectedGrade !== null

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        size="lg"
        className="w-full"
        disabled={existingSelections.length >= 6}
      >
        + Add a Subject
      </Button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {step !== 'group' && (
                <button onClick={handleBack} className="mr-2 rounded-full p-1 hover:bg-muted">
                  <ChevronLeft className="h-5 w-5" />
                </button>
              )}
              Select a Subject
            </DialogTitle>
            <p className="text-sm text-muted-foreground">
              {step === 'group' && 'Step 1: Choose a subject group'}
              {step === 'subject' && 'Step 2: Choose a subject'}
              {step === 'details' && 'Step 3: Set level and grade'}
            </p>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Step 1: Subject Group Selection */}
            {step === 'group' && (
              <div className="grid gap-3">
                {IB_SUBJECT_GROUPS.map((group) => (
                  <button
                    key={group.id}
                    onClick={() => handleGroupSelect(group)}
                    className="flex items-center gap-3 rounded-lg border-2 border-muted p-4 text-left transition-all hover:border-primary hover:bg-primary/5"
                  >
                    <span className="text-3xl">{group.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-semibold">{group.name}</h3>
                      <p className="text-sm text-muted-foreground">{group.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Step 2: Subject Selection */}
            {step === 'subject' && (
              <div className="max-h-[400px] space-y-2 overflow-y-auto">
                {coursesInSelectedGroup.length === 0 ? (
                  <p className="text-center text-sm text-muted-foreground">
                    All subjects in this group have been selected or no subjects available.
                  </p>
                ) : (
                  coursesInSelectedGroup.map((course) => (
                    <button
                      key={course.id}
                      onClick={() => handleSubjectSelect(course)}
                      className="w-full rounded-lg border-2 border-muted p-4 text-left transition-all hover:border-primary hover:bg-primary/5"
                    >
                      <h3 className="font-medium">{course.name}</h3>
                    </button>
                  ))
                )}
              </div>
            )}

            {/* Step 3: Level and Grade Selection */}
            {step === 'details' && selectedCourse && (
              <div className="space-y-6">
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-sm font-medium">Selected Subject:</p>
                  <p className="text-lg font-semibold">{selectedCourse.name}</p>
                </div>

                {/* Level Selection */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Level:</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {(['SL', 'HL'] as const).map((level) => (
                      <button
                        key={level}
                        onClick={() => setSelectedLevel(level)}
                        className={cn(
                          'rounded-lg border-2 p-4 font-semibold transition-all',
                          selectedLevel === level
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-muted hover:border-primary/50 hover:bg-muted'
                        )}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grade Selection */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Predicted Grade:</Label>
                  <div className="grid grid-cols-7 gap-2">
                    {GRADES.map((grade) => (
                      <button
                        key={grade}
                        onClick={() => setSelectedGrade(grade)}
                        className={cn(
                          'rounded-lg border-2 p-3 font-semibold transition-all',
                          selectedGrade === grade
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-muted hover:border-primary/50 hover:bg-muted'
                        )}
                      >
                        {grade}
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleAddSubject}
                  disabled={!canAddSubject}
                  size="lg"
                  className="w-full"
                >
                  Add Subject
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
