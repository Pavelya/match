/**
 * SearchFilterBar Component
 *
 * Unified search and filter bar for admin list pages.
 * Features:
 * - Full-width search input with filter toggle button
 * - Collapsible filter panel below search
 * - Filter chips organized by category
 * - Clear all button
 *
 * Uses Lucide icons per icons-reference.md.
 */

'use client'

import { useState, useEffect, useCallback, type ReactNode } from 'react'
import { Search, X, SlidersHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface SearchFilterBarProps {
  /** Search input placeholder text */
  placeholder?: string
  /** Current search value (controlled) */
  searchValue?: string
  /** Callback when search value changes (debounced) */
  onSearchChange?: (value: string) => void
  /** Debounce delay in milliseconds (default: 300) */
  debounceMs?: number
  /** Filter chips to display (shown in collapsible panel) */
  children?: ReactNode
  /** Callback when "Clear all" is clicked */
  onClearAll?: () => void
  /** Whether there are any active filters */
  hasActiveFilters?: boolean
  /** Number of active filters (shown on toggle button) */
  activeFilterCount?: number
  /** Additional CSS classes for the container */
  className?: string
}

export function SearchFilterBar({
  placeholder = 'Search...',
  searchValue = '',
  onSearchChange,
  debounceMs = 300,
  children,
  onClearAll,
  hasActiveFilters = false,
  activeFilterCount = 0,
  className
}: SearchFilterBarProps) {
  const [localValue, setLocalValue] = useState(searchValue)
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  // Sync local value with controlled prop
  useEffect(() => {
    setLocalValue(searchValue)
  }, [searchValue])

  // Debounced search callback
  useEffect(() => {
    if (!onSearchChange) return

    const timer = setTimeout(() => {
      if (localValue !== searchValue) {
        onSearchChange(localValue)
      }
    }, debounceMs)

    return () => clearTimeout(timer)
  }, [localValue, searchValue, onSearchChange, debounceMs])

  const handleClear = useCallback(() => {
    setLocalValue('')
    onSearchChange?.('')
  }, [onSearchChange])

  const showClearAll = hasActiveFilters || localValue.length > 0

  // Only show filter toggle if there are children (filters)
  const hasFilters = !!children

  return (
    <div className={cn('mb-6', className)}>
      {/* Search Row */}
      <div className="flex gap-3">
        {/* Search Input - Full Width */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-12 pr-12 py-3 text-base bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-background transition-all"
          />
          {localValue && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Filter Toggle Button */}
        {hasFilters && (
          <button
            type="button"
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className={cn(
              'flex items-center justify-center w-12 h-12 rounded-xl border transition-all',
              isFiltersOpen || hasActiveFilters
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-muted/50 text-muted-foreground border-border hover:bg-muted hover:text-foreground'
            )}
            aria-expanded={isFiltersOpen}
            aria-label="Toggle filters"
          >
            <SlidersHorizontal className="h-5 w-5" />
            {activeFilterCount > 0 && !isFiltersOpen && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                {activeFilterCount}
              </span>
            )}
          </button>
        )}
      </div>

      {/* Collapsible Filters Panel */}
      {hasFilters && isFiltersOpen && (
        <div className="mt-4 p-5 bg-muted/30 border border-border rounded-xl animate-in slide-in-from-top-2 duration-200">
          {/* Filter Chips */}
          <div className="flex flex-wrap gap-2">{children}</div>

          {/* Clear All Button */}
          {showClearAll && onClearAll && (
            <div className="mt-4 pt-4 border-t border-border">
              <button
                type="button"
                onClick={onClearAll}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
