# UI Animation Tasks

**Related Document**: [UI_animation-strategy.md](./UI_animation-strategy.md)  
**Status**: Ready for Implementation  
**Created**: 2025-12-16

---

## Task Tracking Legend

- `[ ]` - Not started
- `[/]` - In progress  
- `[x]` - Completed
- `[-]` - Blocked/Skipped

---

## Phase 1: Foundation

### Task 1.1: Add Animation CSS Variables to globals.css

- [ ] **Add timing CSS custom properties**
  - **File**: `app/globals.css`
  - **Changes**: Add animation duration, easing, and distance variables to `:root`
  - **Code**:
    ```css
    :root {
      /* Existing variables... */
      
      /* Animation Durations */
      --duration-instant: 100ms;
      --duration-fast: 200ms;
      --duration-normal: 300ms;
      --duration-slow: 500ms;
      
      /* Animation Easings */
      --ease-out: cubic-bezier(0.33, 1, 0.68, 1);
      --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
      --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
      
      /* Animation Distances */
      --distance-sm: 4px;
      --distance-md: 8px;
      --distance-lg: 16px;
    }
    ```
  - **Acceptance**: Variables accessible in all components
  - **Test**: Inspect element in DevTools, verify variables exist

### Task 1.2: Add Reduced Motion Media Query

- [ ] **Implement prefers-reduced-motion support**
  - **File**: `app/globals.css`
  - **Changes**: Add media query that disables/simplifies animations
  - **Code**:
    ```css
    @media (prefers-reduced-motion: reduce) {
      *,
      *::before,
      *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    }
    ```
  - **Acceptance**: Animations disabled when OS setting enabled
  - **Test**: 
    1. Enable "Reduce motion" in macOS (System Preferences → Accessibility → Display)
    2. Verify animations are disabled
    3. Verify app remains functional

### Task 1.3: Create useReducedMotion Hook

- [ ] **Create hook to detect motion preference**
  - **File**: `lib/hooks/use-reduced-motion.ts`
  - **Code**:
    ```tsx
    'use client'
    
    import { useState, useEffect } from 'react'
    
    export function useReducedMotion(): boolean {
      const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
      
      useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
        setPrefersReducedMotion(mediaQuery.matches)
        
        const handler = (event: MediaQueryListEvent) => {
          setPrefersReducedMotion(event.matches)
        }
        
        mediaQuery.addEventListener('change', handler)
        return () => mediaQuery.removeEventListener('change', handler)
      }, [])
      
      return prefersReducedMotion
    }
    ```
  - **Acceptance**: Hook returns true when reduced motion preferred
  - **Test**: Toggle OS setting, hook value updates

### Task 1.4: Create PageLoader Component

- [ ] **Create unified page loading component**
  - **File**: `components/ui/page-loader.tsx`
  - **Props**:
    - `variant`: 'spinner' | 'skeleton-table' | 'skeleton-cards' | 'skeleton-form'
    - `message?`: string (optional loading message)
    - `count?`: number (for skeleton variants, how many items)
  - **Features**:
    - Spinner: Centered with pulsing animation
    - Skeleton variants: Match page layouts
    - Message: Appears below spinner
  - **Acceptance**: Consistent loading across app
  - **Test**: 
    1. Render each variant
    2. Verify animation smooth at 60fps
    3. Verify reduced motion fallback

### Task 1.5: Create LoadingWrapper Component

- [ ] **Create wrapper with loading state handling**
  - **File**: `components/ui/loading-wrapper.tsx`
  - **Props**:
    - `loading`: boolean
    - `skeleton?`: ReactNode (custom skeleton content)
    - `delay?`: number (ms before showing loader, default 200)
    - `minDuration?`: number (ms minimum loading display, default 0)
  - **Features**:
    - Delays showing loader to prevent flash
    - Optional minimum duration to prevent flicker
    - Smooth fade transition between states
  - **Acceptance**: No loading flash for fast responses
  - **Test**:
    1. Set delay to 500ms
    2. Resolve data in 100ms
    3. Verify no loader shown

---

## Phase 2: Interactive Feedback

### Task 2.1: Add Press Feedback to Button Component

- [ ] **Enhance Button with active state animation**
  - **File**: `components/ui/button.tsx`
  - **Changes**: Add active state transforms to buttonVariants
  - **Update base classes**:
    ```tsx
    const buttonVariants = cva(
      "inline-flex items-center justify-center gap-2 ... active:scale-[0.98] transition-transform duration-100",
      // ...existing variants
    )
    ```
  - **Acceptance**: All buttons have tactile press feedback
  - **Test**: Click button, verify subtle scale down

### Task 2.2: Create ButtonLoading Component

- [ ] **Create button variant with integrated loading state**
  - **File**: `components/ui/button-loading.tsx`
  - **Props**: Extends Button props plus:
    - `loading`: boolean
    - `loadingText?`: string (optional text during loading)
  - **Features**:
    - Shows spinner when loading
    - Maintains button width during loading
    - Disabled state while loading
    - Preserves icon position
  - **Code Pattern**:
    ```tsx
    export function ButtonLoading({ children, loading, loadingText, ...props }) {
      return (
        <Button disabled={loading} {...props}>
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {loadingText || children}
            </>
          ) : (
            children
          )}
        </Button>
      )
    }
    ```
  - **Acceptance**: Consistent loading state for async buttons
  - **Test**: Set loading=true, verify spinner appears

### Task 2.3: Enhance Card Hover Effects

- [ ] **Add hover animation to Card component**
  - **File**: `components/ui/card.tsx`
  - **Changes**: Add interactive hover state
  - **New variant**: `interactive` for clickable cards
  - **Update**:
    ```tsx
    const cardVariants = cva(
      "rounded-xl border bg-card text-card-foreground shadow-sm",
      {
        variants: {
          interactive: {
            true: "cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5",
            false: ""
          }
        },
        defaultVariants: {
          interactive: false
        }
      }
    )
    ```
  - **Acceptance**: Clickable cards have lift effect on hover
  - **Test**: Hover over interactive card, verify lift + shadow

### Task 2.4: Update ProgramCard Hover State

- [ ] **Apply enhanced hover to ProgramCard**
  - **File**: `components/student/ProgramCard.tsx`
  - **Changes**: Use Card's interactive variant or add hover styles
  - **Current**: `hover:shadow-lg` exists
  - **Enhance with**: `hover:-translate-y-1 transition-all duration-200`
  - **Acceptance**: Program cards feel more interactive
  - **Test**: Hover over program card on matches page

### Task 2.5: Enhance Input Focus Animation

- [ ] **Add smooth focus transitions to Input**
  - **File**: `components/ui/input.tsx`
  - **Changes**: Enhance transition on focus
  - **Add**:
    ```tsx
    // In className
    "transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
    ```
  - **Acceptance**: Inputs have smooth focus transition
  - **Test**: Tab through form, verify smooth transitions

### Task 2.6: Add Save Button Animation

- [ ] **Animate save/bookmark button in ProgramCard**
  - **File**: `components/student/ProgramCard.tsx`
  - **Changes**: Add animation when saving/unsaving
  - **Features**:
    - Scale pop on save
    - Heart fill animation (if using heart icon)
    - Color transition
  - **Code**:
    ```tsx
    <button
      className={cn(
        "transition-all duration-200",
        isSaved 
          ? "text-primary scale-110" 
          : "text-muted-foreground hover:text-primary hover:scale-110"
      )}
    >
      ...
    </button>
    ```
  - **Acceptance**: Save action feels satisfying
  - **Test**: Click save button, see animation

---

## Phase 3: Content Animations

### Task 3.1: Create FadeIn Animation Component

- [ ] **Create reusable entrance animation wrapper**
  - **File**: `components/ui/fade-in.tsx`
  - **Props**:
    - `direction`: 'up' | 'down' | 'left' | 'right' | 'none' (default: 'up')
    - `delay`: number in ms (default: 0)
    - `duration`: number in ms (default: 300)
    - `className`: string
    - `children`: ReactNode
  - **Implementation approach**: CSS animations with inline animation-delay
  - **Code Structure**:
    ```tsx
    'use client'
    
    import { cn } from '@/lib/utils'
    
    interface FadeInProps {
      direction?: 'up' | 'down' | 'left' | 'right' | 'none'
      delay?: number
      duration?: number
      className?: string
      children: React.ReactNode
    }
    
    export function FadeIn({
      direction = 'up',
      delay = 0,
      duration = 300,
      className,
      children
    }: FadeInProps) {
      const directionClasses = {
        up: 'animate-in fade-in slide-in-from-bottom-2',
        down: 'animate-in fade-in slide-in-from-top-2',
        left: 'animate-in fade-in slide-in-from-right-2',
        right: 'animate-in fade-in slide-in-from-left-2',
        none: 'animate-in fade-in'
      }
      
      return (
        <div
          className={cn(directionClasses[direction], className)}
          style={{
            animationDelay: `${delay}ms`,
            animationDuration: `${duration}ms`,
            animationFillMode: 'backwards'
          }}
        >
          {children}
        </div>
      )
    }
    ```
  - **Acceptance**: Reusable component for entrance animations
  - **Test**: Wrap content, verify animation plays on mount

### Task 3.2: Create StaggerChildren Component

- [ ] **Create container for staggered child animations**
  - **File**: `components/ui/stagger-children.tsx`
  - **Props**:
    - `staggerDelay`: number in ms (default: 50)
    - `initialDelay`: number in ms (default: 0)
    - `direction`: 'up' | 'down' | 'left' | 'right' (default: 'up')
    - `className`: string
    - `children`: ReactNode
  - **Implementation**: Uses React.Children to add delay to each child
  - **Code Structure**:
    ```tsx
    'use client'
    
    import React from 'react'
    import { cn } from '@/lib/utils'
    
    interface StaggerChildrenProps {
      staggerDelay?: number
      initialDelay?: number
      direction?: 'up' | 'down' | 'left' | 'right'
      className?: string
      children: React.ReactNode
    }
    
    export function StaggerChildren({
      staggerDelay = 50,
      initialDelay = 0,
      direction = 'up',
      className,
      children
    }: StaggerChildrenProps) {
      const directionClasses = {
        up: 'animate-in fade-in slide-in-from-bottom-2',
        down: 'animate-in fade-in slide-in-from-top-2',
        left: 'animate-in fade-in slide-in-from-right-2',
        right: 'animate-in fade-in slide-in-from-left-2'
      }
      
      return (
        <div className={className}>
          {React.Children.map(children, (child, index) => {
            if (!React.isValidElement(child)) return child
            
            return (
              <div
                className={directionClasses[direction]}
                style={{
                  animationDelay: `${initialDelay + index * staggerDelay}ms`,
                  animationDuration: '300ms',
                  animationFillMode: 'backwards'
                }}
              >
                {child}
              </div>
            )
          })}
        </div>
      )
    }
    ```
  - **Acceptance**: Children animate in sequence
  - **Test**: Render list of 5 items, verify stagger effect

### Task 3.3: Apply Animations to Student Matches Page

- [ ] **Integrate animation components in RecommendationsClient**
  - **File**: `app/student/matches/RecommendationsClient.tsx`
  - **Changes**:
    1. Use `PageLoader` for loading state
    2. Wrap header in `FadeIn`
    3. Wrap program list in `StaggerChildren`
  - **Before**:
    ```tsx
    {matches.matches.map((match) => (
      <ProgramCard key={match.programId} ... />
    ))}
    ```
  - **After**:
    ```tsx
    <StaggerChildren staggerDelay={60} className="space-y-4">
      {matches.matches.map((match) => (
        <ProgramCard key={match.programId} ... />
      ))}
    </StaggerChildren>
    ```
  - **Acceptance**: Matches page feels polished
  - **Test**: Load matches page, verify staggered card appearance

### Task 3.4: Apply Animations to Saved Programs Page

- [ ] **Integrate animation components in SavedProgramsClient**
  - **File**: `app/student/saved/SavedProgramsClient.tsx`
  - **Changes**: Similar to Task 3.3
  - **Acceptance**: Consistent with matches page
  - **Test**: Navigate to saved programs, verify animations

### Task 3.5: Apply Animations to Onboarding

- [ ] **Add animations to FieldSelectorClient**
  - **File**: `app/student/onboarding/FieldSelectorClient.tsx`
  - **Changes**:
    1. Stagger field cards on step 1
    2. Stagger country cards on step 2
    3. Fade in each step content on step change
  - **Acceptance**: Onboarding feels dynamic
  - **Test**: Go through onboarding flow, verify animations

### Task 3.6: Add Match Score Animation

- [ ] **Animate match score progress bar fill**
  - **File**: `components/student/ProgramCard.tsx`
  - **Changes**: Add CSS animation to score bar
  - **Current**: `transition-all duration-500` exists
  - **Enhance**: Add initial width of 0, animate to final width
  - **Implementation**:
    ```tsx
    <div
      className="h-full bg-primary transition-all duration-700 ease-out"
      style={{ 
        width: `${Math.round(overallScore * 100)}%`,
        animationDelay: '200ms' // Delay for stagger effect
      }}
    />
    ```
  - **Acceptance**: Score bars fill progressively
  - **Test**: Load matches, see bars animate

---

## Phase 4: Admin & Coordinator Enhancements

### Task 4.1: Add Shimmer Effect to Skeletons

- [ ] **Enhance skeleton animations with shimmer**
  - **Files**: 
    - `components/admin/shared/TableSkeleton.tsx`
    - `components/admin/shared/StatCardSkeleton.tsx`
  - **Changes**: Add shimmer animation overlay
  - **CSS** (add to globals.css):
    ```css
    @keyframes shimmer {
      0% {
        background-position: -200% 0;
      }
      100% {
        background-position: 200% 0;
      }
    }
    
    .animate-shimmer {
      background: linear-gradient(
        90deg,
        hsl(var(--muted)) 25%,
        hsl(var(--muted-foreground) / 0.05) 50%,
        hsl(var(--muted)) 75%
      );
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
    }
    ```
  - **Update skeleton classes**: Replace `animate-pulse` with `animate-shimmer`
  - **Acceptance**: Skeletons have modern shimmer effect
  - **Test**: Load admin page, verify shimmer animation

### Task 4.2: Apply PageLoader to Admin Pages

- [ ] **Use unified PageLoader in admin list pages**
  - **Files**:
    - `app/admin/schools/page.tsx`
    - `app/admin/programs/page.tsx`
    - `app/admin/universities/page.tsx`
    - `app/admin/coordinators/page.tsx`
  - **Changes**: Replace custom loading states with PageLoader
  - **Acceptance**: Consistent admin loading experience
  - **Test**: Navigate to each admin page, verify loading state

### Task 4.3: Add Form Success Animation

- [ ] **Create success feedback for form submissions**
  - **Implementation Options**:
    1. Flash green border briefly on form container
    2. Show checkmark icon animation next to save button
    3. Button text momentarily changes to "Saved!"
  - **Files**: All admin form components
  - **Recommended approach**: Button text change with checkmark
  - **Code**:
    ```tsx
    const [saved, setSaved] = useState(false)
    
    const handleSubmit = async () => {
      await save()
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }
    
    <Button>
      {saved ? (
        <>
          <CheckCircle className="h-4 w-4" />
          Saved
        </>
      ) : (
        <>
          <Save className="h-4 w-4" />
          Save Changes
        </>
      )}
    </Button>
    ```
  - **Acceptance**: Clear feedback on successful save
  - **Test**: Save form, see success state

### Task 4.4: Apply Animations to Coordinator Pages

- [ ] **Add animations to coordinator dashboard**
  - **Files**:
    - `app/coordinator/dashboard/page.tsx`
    - `app/coordinator/students/page.tsx`
  - **Changes**: Apply FadeIn, StaggerChildren as appropriate
  - **Acceptance**: Coordinator experience matches student polish
  - **Test**: Navigate coordinator pages, verify animations

---

## Phase 5: Advanced Animations

### Task 5.1: Create Toast Notification Component

- [ ] **Create toast notification system**
  - **File**: `components/ui/toast.tsx`
  - **Features**:
    - Slide in from bottom-right
    - Auto-dismiss after 3-5 seconds
    - Progress bar showing time remaining
    - Variants: success (green), error (red), info (blue), warning (yellow)
    - Stack multiple toasts
    - Dismiss on click
  - **Hook**: `useToast()` for triggering toasts
  - **File**: `lib/hooks/use-toast.ts`
  - **Context Provider**: `components/providers/toast-provider.tsx`
  - **Acceptance**: Global notification system
  - **Test**: Trigger toast, verify animation and auto-dismiss

### Task 5.2: Create AnimatedNumber Component

- [ ] **Create number counter animation**
  - **File**: `components/ui/animated-number.tsx`
  - **Props**:
    - `value`: number
    - `duration`: number in ms (default: 500)
    - `format?`: (n: number) => string (optional formatter)
  - **Implementation**: Use requestAnimationFrame for smooth counting
  - **Code Structure**:
    ```tsx
    'use client'
    
    import { useEffect, useState, useRef } from 'react'
    
    interface AnimatedNumberProps {
      value: number
      duration?: number
      format?: (n: number) => string
    }
    
    export function AnimatedNumber({
      value,
      duration = 500,
      format = (n) => n.toString()
    }: AnimatedNumberProps) {
      const [displayValue, setDisplayValue] = useState(0)
      const startTime = useRef<number | null>(null)
      const startValue = useRef(0)
      
      useEffect(() => {
        startValue.current = displayValue
        startTime.current = null
        
        const animate = (timestamp: number) => {
          if (!startTime.current) startTime.current = timestamp
          const progress = Math.min((timestamp - startTime.current) / duration, 1)
          
          // Ease out curve
          const eased = 1 - Math.pow(1 - progress, 3)
          const current = startValue.current + (value - startValue.current) * eased
          
          setDisplayValue(current)
          
          if (progress < 1) {
            requestAnimationFrame(animate)
          }
        }
        
        requestAnimationFrame(animate)
      }, [value, duration])
      
      return <span>{format(Math.round(displayValue))}</span>
    }
    ```
  - **Acceptance**: Numbers count up smoothly
  - **Test**: Change value prop, verify smooth transition

### Task 5.3: Apply AnimatedNumber to Stats

- [ ] **Integrate AnimatedNumber in admin dashboard**
  - **Files**:
    - `components/admin/shared/StatCard.tsx` (or wherever stats are displayed)
  - **Changes**: Wrap stat values in AnimatedNumber
  - **Acceptance**: Stats feel dynamic on load
  - **Test**: Load admin dashboard, see numbers count up

### Task 5.4: Create Skeleton Shimmer Animation Class

- [ ] **Add shimmer keyframes to globals.css**
  - **File**: `app/globals.css`
  - **Code**:
    ```css
    @keyframes shimmer {
      0% {
        background-position: -200% 0;
      }
      100% {
        background-position: 200% 0;
      }
    }
    
    .shimmer {
      background: linear-gradient(
        90deg,
        hsl(var(--muted)) 0%,
        hsl(var(--muted)) 40%,
        hsl(var(--muted-foreground) / 0.1) 50%,
        hsl(var(--muted)) 60%,
        hsl(var(--muted)) 100%
      );
      background-size: 200% 100%;
      animation: shimmer 1.5s ease-in-out infinite;
    }
    ```
  - **Acceptance**: `.shimmer` class available for any skeleton
  - **Test**: Apply class to div, verify shimmer effect

---

## Testing Checklist

### Performance Testing

- [ ] **Run Lighthouse audit** - Performance score should not decrease
- [ ] **Check Chrome DevTools Performance tab** - No paint storms
- [ ] **Test with 4x CPU throttling** - Animations remain smooth
- [ ] **Test on mobile device** - No jank on lower-powered devices

### Accessibility Testing

- [ ] **Enable "Reduce motion" in OS**
  - macOS: System Preferences → Accessibility → Display → Reduce motion
  - Windows: Settings → Ease of Access → Display → Show animations
- [ ] **Verify all animations disabled** when preference set
- [ ] **Verify app remains fully functional** with reduced motion
- [ ] **Test focus indicators** - Still visible and clear

### Cross-Browser Testing

- [ ] **Chrome** - Primary development target
- [ ] **Safari** - macOS users
- [ ] **Firefox** - Alternative browser
- [ ] **Edge** - Windows users

### Responsive Testing

- [ ] **Mobile viewport** (375px) - Animations work on touch
- [ ] **Tablet viewport** (768px) - Animations appropriate
- [ ] **Desktop viewport** (1280px+) - Full animation experience

---

## Notes for Implementers

### CSS Animation Classes Available (tw-animate-css)

Already available in the project:
- `animate-in` / `animate-out`
- `fade-in` / `fade-out`
- `slide-in-from-top-*` / `slide-in-from-bottom-*` / etc.
- `zoom-in-*` / `zoom-out-*`
- `spin-in-*` / `spin-out-*`

### Common Animation Patterns

```tsx
// Fade in from bottom
className="animate-in fade-in slide-in-from-bottom-2 duration-300"

// Scale in
className="animate-in zoom-in-95 duration-200"

// Fade out
className="animate-out fade-out duration-200"
```

### Inline Animation Delay

```tsx
style={{ animationDelay: '100ms', animationFillMode: 'backwards' }}
```

The `animationFillMode: 'backwards'` is important to apply the starting state before the animation begins (prevents flash of final state).

---

## Completion Tracking

| Phase | Total Tasks | Completed | Status |
|-------|-------------|-----------|--------|
| 1 - Foundation | 5 | 0 | Not Started |
| 2 - Interactive Feedback | 6 | 0 | Not Started |
| 3 - Content Animations | 6 | 0 | Not Started |
| 4 - Admin Enhancements | 4 | 0 | Not Started |
| 5 - Advanced | 4 | 0 | Not Started |
| **Total** | **25** | **0** | **Not Started** |
