import {
  BookOpen,
  Briefcase,
  Building2,
  Cog,
  Laptop,
  Leaf,
  Microscope,
  Newspaper,
  Palette,
  Presentation,
  Scale,
  Stethoscope,
  Users,
  type LucideIcon
} from 'lucide-react'

/*
 * A distinct icon for each field in the new design (rebranding 3.1, "D2.6 Checkbox rows and
 * grid"): today's map in lib/icons.tsx, with Presentation for Education and Newspaper for Media,
 * which both fall back to Book open there. Kept apart until cleanup (R.2) merges it into
 * lib/icons.tsx, so today's pages, the prebuilt requirements hub among them, keep their icons and
 * their download. The stored iconName values are emoji and are ignored; the names decide.
 */
const FIELD_ICONS: Record<string, LucideIcon> = {
  Architecture: Building2,
  'Arts & Humanities': Palette,
  'Business & Economics': Briefcase,
  'Computer Science': Laptop,
  Education: Presentation,
  Engineering: Cog,
  'Environmental Studies': Leaf,
  Law: Scale,
  Media: Newspaper,
  'Medicine & Health': Stethoscope,
  'Natural Sciences': Microscope,
  'Social Sciences': Users
}

export function fieldIcon(fieldName: string): LucideIcon {
  return FIELD_ICONS[fieldName] ?? BookOpen
}
