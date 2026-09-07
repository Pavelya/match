# Icon System Reference

## Overview

This project uses **Lucide React icons** exclusively. **Do NOT use emojis** for icons in components or UI elements.

On **lucide-react 1.x**. Two things follow from the v1 release:

- **There are no brand icons.** GitHub, Facebook, Figma, Slack and the rest were removed
  in v1 over trademark concerns. Use an official SVG from the brand, or Simple Icons.
- **The old v0 names still work.** `AlertCircle`, `CheckCircle2`, `XCircle` and the
  `*Icon` suffixed forms are re-exported as aliases of their canonical names
  (`CircleAlert`, `CircleCheck`, `CircleX`). Prefer the canonical name in new code.

## Icon Sources

### 1. General UI Icons
Import from `lucide-react`:
```tsx
import { Plus, Pencil, Trash2, BookOpen } from 'lucide-react'
```

### 2. Field of Study Icons
Use the `FieldIcon` component and related utilities from `lib/icons.tsx`:
```tsx
import { FieldIcon, AVAILABLE_FIELD_ICONS, getFieldIcon } from '@/lib/icons'
```

**Key exports:**
- `FieldIcon` - React component that renders field icons
- `AVAILABLE_FIELD_ICONS` - Array of available icons for dropdowns
- `fieldIconMap` - Maps field names to icons (e.g., "Engineering" → Cog)
- `iconKeyMap` - Maps icon keys to Lucide components

**Icon resolution priority:**
1. If `iconKey` prop is provided → use `iconKeyMap` lookup
2. Otherwise → use `fieldIconMap` name-based lookup
3. Fallback → `BookOpen` icon

### 3. Country Flags
Country flags use **emoji flags** (the only place emojis are used):
- Generated automatically from ISO country codes
- See `lib/country-utils.ts` → `countryCodeToFlag()`
- Stored in `Country.flagEmoji` database field

## Database Fields

| Model | Field | Purpose |
|-------|-------|---------|
| `FieldOfStudy` | `iconName` | Lucide icon key (e.g., "Briefcase", "Laptop") |
| `Country` | `flagEmoji` | Unicode flag emoji (e.g., "🇺🇸") |

## Common Mistakes to Avoid

❌ **Do NOT** store emoji characters in `FieldOfStudy.iconName`  
✅ **DO** store Lucide icon keys like "Briefcase", "GraduationCap"

❌ **Do NOT** use emojis for UI icons  
✅ **DO** use `<IconName className="h-4 w-4" />` from lucide-react

❌ **Do NOT** create new icon mappings  
✅ **DO** use existing `AVAILABLE_FIELD_ICONS` for selection UIs
