/**
 * DataTable Component
 *
 * Unified table component for admin list pages.
 * Provides consistent styling and behavior for data tables.
 *
 * Features:
 * - Declarative column definitions
 * - Row click support
 * - Consistent styling (header, rows, hover states)
 * - Responsive overflow handling
 *
 * Uses Lucide icons per icons-reference.md.
 */

'use client'

import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface Column<T> {
  /** Unique key for the column */
  key: string
  /** Column header text */
  header: string
  /** Alignment: 'left' (default), 'center', 'right' */
  align?: 'left' | 'center' | 'right'
  /** Width constraint (e.g., 'w-32', 'w-48', 'min-w-[200px]') */
  width?: string
  /** Render function for the cell content */
  render: (item: T, index: number) => ReactNode
}

export interface DataTableProps<T> {
  /** Column definitions */
  columns: Column<T>[]
  /** Data array to display */
  data: T[]
  /** Function to get unique key for each row */
  getRowKey: (item: T) => string
  /** Optional click handler for rows */
  onRowClick?: (item: T) => void
  /** Additional CSS classes for the container */
  className?: string
}

export function DataTable<T>({
  columns,
  data,
  getRowKey,
  onRowClick,
  className
}: DataTableProps<T>) {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  }

  return (
    <div className={cn('rounded-xl border bg-card overflow-hidden', className)}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    'px-4 py-3 text-sm font-medium text-muted-foreground',
                    alignmentClasses[column.align || 'left'],
                    column.width
                  )}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {data.map((item, rowIndex) => (
              <tr
                key={getRowKey(item)}
                className={cn(
                  'hover:bg-muted/30 transition-colors',
                  onRowClick && 'cursor-pointer'
                )}
                onClick={onRowClick ? () => onRowClick(item) : undefined}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={cn(
                      'px-4 py-3',
                      alignmentClasses[column.align || 'left'],
                      column.width
                    )}
                  >
                    {column.render(item, rowIndex)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
