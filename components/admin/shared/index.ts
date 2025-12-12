/**
 * Shared Dashboard Components
 *
 * Reusable components for dashboard interfaces.
 * These components ensure consistent UX/UI across:
 * - Platform Admin Dashboard
 * - IB Coordinator Dashboard (VIP and Regular tiers)
 * - University Agent Dashboard (future)
 *
 * Components are designed to be role-agnostic and can be used by any
 * authenticated dashboard by simply importing from this module.
 *
 * For Coordinator Dashboard Adaptation:
 * - StatCard: Display school-level metrics (total students, avg IB score, etc.)
 * - DataTable: List students linked to the school
 * - SearchFilterBar: Search/filter students
 * - InfoCard: Display school info, coordinator info, subscription status
 * - PageHeader: Consistent headers with coordinator-specific actions
 * - DetailPageLayout: Student detail views, school profile views
 *
 * VIP vs Regular Schools:
 * - Components accept optional props for showing "upgrade" prompts
 * - Use conditional rendering to lock features for Regular tier schools
 */

// Layout Components
export { PageHeader, type PageHeaderProps, type PageAction } from './PageHeader'
export { PageContainer, type PageContainerProps, type MaxWidthOption } from './PageContainer'
export {
  DetailPageLayout,
  DetailSection,
  QuickStat,
  type DetailPageLayoutProps,
  type DetailSectionProps,
  type QuickStatProps
} from './DetailPageLayout'
export {
  FormPageLayout,
  FormSection,
  FormDivider,
  FormActions,
  type FormPageLayoutProps,
  type FormSectionProps,
  type FormActionsProps
} from './FormPageLayout'

// Navigation Components
export {
  Breadcrumbs,
  generateBreadcrumbs,
  type BreadcrumbsProps,
  type BreadcrumbItem
} from './Breadcrumbs'

// Data Display Components
export { StatCard, type StatCardProps } from './StatCard'
export { DataTable, type DataTableProps, type Column } from './DataTable'
export { TableEmptyState, type TableEmptyStateProps } from './TableEmptyState'
export {
  InfoCard,
  InfoRow,
  type InfoCardProps,
  type InfoRowProps,
  type InfoCardAction
} from './InfoCard'

// Filter Components
export { SearchFilterBar, type SearchFilterBarProps } from './SearchFilterBar'
export { FilterChip, type FilterChipProps } from './FilterChip'

// Skeleton Components (Loading States)
export {
  StatCardSkeleton,
  StatCardSkeletonRow,
  type StatCardSkeletonProps,
  type StatCardSkeletonRowProps
} from './StatCardSkeleton'
export { TableSkeleton, SearchBarSkeleton, type TableSkeletonProps } from './TableSkeleton'

// Tier-based Access Control Components
export { UpgradePromptBanner, type UpgradePromptBannerProps } from './UpgradePromptBanner'
