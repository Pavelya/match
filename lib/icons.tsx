/**
 * Field Icon Mapping
 *
 * Maps field names and IB subject groups to professional Lucide React icons.
 * Returns JSX elements to satisfy ESLint static-components rule.
 */

import {
  Briefcase,
  Cog,
  Stethoscope,
  Laptop,
  Scale,
  Palette,
  Microscope,
  Users,
  Building2,
  Leaf,
  BookOpen,
  Languages,
  Brain,
  Atom,
  Calculator,
  Music
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Field of Study icon mapping
const fieldIconMap: Record<string, typeof Briefcase> = {
  'Business & Economics': Briefcase,
  Engineering: Cog,
  'Medicine & Health': Stethoscope,
  'Computer Science': Laptop,
  Law: Scale,
  'Arts & Humanities': Palette,
  'Natural Sciences': Microscope,
  'Social Sciences': Users,
  Architecture: Building2,
  'Environmental Studies': Leaf
}

// IB Subject Group icon mapping
const subjectGroupIconMap: Record<number, typeof BookOpen> = {
  1: BookOpen, // Group 1: Studies in language and literature
  2: Languages, // Group 2: Language acquisition
  3: Brain, // Group 3: Individuals and societies
  4: Atom, // Group 4: Sciences
  5: Calculator, // Group 5: Mathematics
  6: Music // Group 6: The arts
}

// Render a field icon as JSX
export function FieldIcon({ fieldName, className }: { fieldName: string; className?: string }) {
  const IconComponent = fieldIconMap[fieldName] || BookOpen
  return <IconComponent className={cn('h-5 w-5', className)} />
}

// Render a subject group icon as JSX
export function SubjectGroupIcon({ groupId, className }: { groupId: number; className?: string }) {
  const IconComponent = subjectGroupIconMap[groupId] || BookOpen
  return <IconComponent className={cn('h-5 w-5', className)} />
}

// Get icon component for a field name (for advanced use cases)
export function getFieldIcon(fieldName: string) {
  return fieldIconMap[fieldName] || BookOpen
}

// Get icon component for an IB subject group (for advanced use cases)
export function getSubjectGroupIcon(group: number) {
  return subjectGroupIconMap[group] || BookOpen
}
