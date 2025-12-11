/**
 * Field Icon Mapping
 *
 * Maps field names and IB subject groups to professional Lucide React icons.
 * Returns JSX elements to satisfy ESLint static-components rule.
 *
 * Supports optional iconKey override - if a field has a custom iconKey set,
 * it will use that instead of the default name-based mapping.
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
  Music,
  type LucideIcon
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Icon key to component mapping (for custom icon selection)
const iconKeyMap: Record<string, LucideIcon> = {
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
}

// Available icons for field of study selection in admin UI
export const AVAILABLE_FIELD_ICONS: { key: string; icon: LucideIcon; label: string }[] = [
  { key: 'Briefcase', icon: Briefcase, label: 'Business' },
  { key: 'Cog', icon: Cog, label: 'Engineering' },
  { key: 'Stethoscope', icon: Stethoscope, label: 'Medicine' },
  { key: 'Laptop', icon: Laptop, label: 'Technology' },
  { key: 'Scale', icon: Scale, label: 'Law' },
  { key: 'Palette', icon: Palette, label: 'Arts' },
  { key: 'Microscope', icon: Microscope, label: 'Sciences' },
  { key: 'Users', icon: Users, label: 'Social' },
  { key: 'Building2', icon: Building2, label: 'Architecture' },
  { key: 'Leaf', icon: Leaf, label: 'Environment' },
  { key: 'BookOpen', icon: BookOpen, label: 'General' },
  { key: 'Brain', icon: Brain, label: 'Psychology' },
  { key: 'Atom', icon: Atom, label: 'Physics' },
  { key: 'Calculator', icon: Calculator, label: 'Mathematics' },
  { key: 'Languages', icon: Languages, label: 'Languages' },
  { key: 'Music', icon: Music, label: 'Music' }
]

// Field of Study default name-based mapping (fallback when no iconKey is set)
const fieldIconMap: Record<string, LucideIcon> = {
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
const subjectGroupIconMap: Record<number, LucideIcon> = {
  1: BookOpen, // Group 1: Studies in language and literature
  2: Languages, // Group 2: Language acquisition
  3: Brain, // Group 3: Individuals and societies
  4: Atom, // Group 4: Sciences
  5: Calculator, // Group 5: Mathematics
  6: Music // Group 6: The arts
}

// Render a field icon as JSX
// Priority: iconKey (if provided) -> fieldName mapping -> default BookOpen
export function FieldIcon({
  fieldName,
  iconKey,
  className
}: {
  fieldName: string
  iconKey?: string | null
  className?: string
}) {
  // First try iconKey if provided
  if (iconKey && iconKeyMap[iconKey]) {
    const IconComponent = iconKeyMap[iconKey]
    return <IconComponent className={cn('h-5 w-5', className)} />
  }
  // Fall back to name-based mapping
  const IconComponent = fieldIconMap[fieldName] || BookOpen
  return <IconComponent className={cn('h-5 w-5', className)} />
}

// Render a subject group icon as JSX
export function SubjectGroupIcon({ groupId, className }: { groupId: number; className?: string }) {
  const IconComponent = subjectGroupIconMap[groupId] || BookOpen
  return <IconComponent className={cn('h-5 w-5', className)} />
}

// Get icon component for a field (with optional iconKey override)
export function getFieldIcon(fieldName: string, iconKey?: string | null) {
  if (iconKey && iconKeyMap[iconKey]) {
    return iconKeyMap[iconKey]
  }
  return fieldIconMap[fieldName] || BookOpen
}

// Get icon component for an IB subject group (for advanced use cases)
export function getSubjectGroupIcon(group: number) {
  return subjectGroupIconMap[group] || BookOpen
}
