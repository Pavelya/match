# Subscription & Access Model

This document explains the subscription tiers, access levels, and freemium model for IB Match coordinators.

## School Tiers

IB Schools have a `subscriptionTier` field with two possible values:

| Tier | Description |
|------|-------------|
| **VIP** | Special partnership schools, always have full access (free) |
| **REGULAR** | Standard schools, access depends on subscription status |

## Subscription Status

Regular schools have a `subscriptionStatus` field:

| Status | Description |
|--------|-------------|
| **ACTIVE** | Has paid subscription, full access enabled |
| **INACTIVE** | No subscription (freemium), limited access |
| **CANCELLED** | Previously subscribed, now treated as freemium |

## Access Levels

Access level is determined by combining tier and status:

```
┌─────────────────────────────────────────────────────────────────┐
│                       ACCESS DECISION TREE                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Is school tier VIP?                                             │
│    ├── YES → FULL ACCESS (always, free)                         │
│    └── NO (REGULAR) → Check subscription status                 │
│                          ├── ACTIVE → FULL ACCESS (paid)        │
│                          └── INACTIVE/CANCELLED → FREEMIUM      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Summary Table

| Tier | Subscription Status | Access Level | UI Display |
|:-----|:--------------------|:-------------|:-----------|
| **VIP** | (ignored) | Full Access | 👑 VIP badge |
| **REGULAR** | ACTIVE | Full Access | "Subscribed" badge |
| **REGULAR** | INACTIVE | Freemium | "Subscribe for full access" link |
| **REGULAR** | CANCELLED | Freemium | "Subscribe for full access" link |

> **Key insight**: A REGULAR school with an ACTIVE subscription has the same access as a VIP school. The difference is VIP never needs to pay.

## Access Control Code

The access logic is centralized in `lib/auth/access-control.ts`:

```typescript
import { getCoordinatorAccess, FREEMIUM_MAX_STUDENTS } from '@/lib/auth/access-control'

const school = await prisma.iBSchool.findUnique({ where: { id: schoolId } })
const access = getCoordinatorAccess(school)

if (access.hasFullAccess) {
  // VIP or subscribed REGULAR - show all features
} else {
  // Freemium - show limited features
}
```

### CoordinatorAccessResult

The `getCoordinatorAccess()` function returns:

```typescript
interface CoordinatorAccessResult {
  accessLevel: 'full' | 'freemium'
  hasFullAccess: boolean           // true if VIP or subscribed
  isVIP: boolean                   // true only for VIP tier
  hasActiveSubscription: boolean   // true if REGULAR + ACTIVE
  maxStudents: number | null       // null = unlimited, 10 for freemium
  canInviteStudents: (currentCount: number) => boolean
  canEditStudentData: boolean
  canAccessAdvancedAnalytics: boolean
  canInviteCoordinators: boolean
  canBulkExport: boolean
}
```

## Freemium Limitations

Schools without full access (freemium) have these limitations:

| Feature | Freemium | Full Access |
|---------|----------|-------------|
| **Student Invites** | Max 10 students | Unlimited |
| **Edit Student Data** | ❌ Blocked | ✅ Allowed |
| **Advanced Analytics** | ❌ Blocked | ✅ Allowed |
| **Invite Coordinators** | ❌ Blocked | ✅ Allowed |
| **Bulk Export** | ❌ Blocked | ✅ Allowed |
| **View Student Matches** | ✅ Allowed | ✅ Allowed |
| **View Student Profiles** | ✅ Allowed | ✅ Allowed |

### Student Limit

```typescript
export const FREEMIUM_MAX_STUDENTS = 10
```

When counting students:
- Count linked students (`StudentProfile.schoolId = school.id`)
- Plus pending invitations (`Invitation.status = 'PENDING'`)
- Total must be < 10 for freemium to invite more

## Stripe Integration

Subscription management uses Stripe:

### Subscription Flow

1. Coordinator clicks "Subscribe" → `/coordinator/settings/subscription`
2. Click "Subscribe Now" → Creates Stripe checkout session
3. Complete payment on Stripe → Webhook fires
4. Webhook updates school: `subscriptionStatus = 'ACTIVE'`
5. Coordinator now has full access

### Cancellation Flow

1. Coordinator accesses Stripe Customer Portal
2. Cancels subscription in Stripe
3. Webhook fires with `customer.subscription.deleted`
4. Webhook updates school: `subscriptionStatus = 'CANCELLED'`
5. Coordinator reverts to freemium

### Environment Variables

```env
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_PRODUCT_ID=prod_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## Database Fields

### IBSchool Model

```prisma
model IBSchool {
  subscriptionTier       SubscriptionTier   @default(REGULAR)
  subscriptionStatus     SubscriptionStatus @default(INACTIVE)
  stripeCustomerId       String?
  stripeSubscriptionId   String?
}

enum SubscriptionTier {
  VIP
  REGULAR
}

enum SubscriptionStatus {
  ACTIVE
  INACTIVE
  CANCELLED
}
```

## UI Components

### Sidebar Badge

In `CoordinatorSidebar.tsx`:
- VIP schools: Show crown icon with "VIP" badge
- Subscribed REGULAR: Show "Subscribed" badge
- Freemium: Show "Subscribe for full access" link

### Feature Locking

For features locked to full access:
- Show a 🔒 lock icon next to the feature
- On click, redirect to subscription page or show upgrade prompt

## Related Files

| File | Purpose |
|------|---------|
| `lib/auth/access-control.ts` | Access logic functions |
| `app/api/subscriptions/create-checkout/route.ts` | Create Stripe checkout |
| `app/api/subscriptions/create-portal/route.ts` | Create Stripe portal |
| `app/api/webhooks/stripe/route.ts` | Handle Stripe webhooks |
| `app/coordinator/settings/subscription/page.tsx` | Subscription UI |
| `components/coordinator/CoordinatorSidebar.tsx` | Sidebar with access badges |

## Quick Reference

```
VIP = Always full access (free partnership)
REGULAR + ACTIVE subscription = Full access (paid)
REGULAR + INACTIVE/CANCELLED = Freemium (limited)

hasFullAccess = isVIP || (isREGULAR && subscriptionStatus === 'ACTIVE')
```
