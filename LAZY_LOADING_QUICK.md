# Lazy Loading Quick Reference

## When to Use Lazy Loading

### ✅ Lazy Load:
- Components below the fold
- Heavy libraries (charts, editors)
- Modal/dialog content
- Feature-flagged components
- Route-based pages

### ❌ Don't Lazy Load:
- Above-the-fold content
- Small components (<5KB)
- Critical path components
- Layout/providers

---

## Implementation Pattern

```typescript
// 1. Import lazy and Suspense
import { lazy, Suspense } from 'react'

// 2. Lazy load component
const HeavyComponent = lazy(() => import('./HeavyComponent'))

// 3. Wrap in Suspense with fallback
<Suspense fallback={<Loading />}>
  <HeavyComponent />
</Suspense>
```

---

## Current Implementation

### Homepage Components:
```
✅ Eager:  Header, HeroSection (above fold)
⚡ Lazy:   CarShowcase, CarDetails, CarGrid, Footer
```

### Other Pages:
```
✅ Eager:  Header, Main content
⚡ Lazy:   Footer
```

---

## Loading Components

### Route-level (automatic):
```typescript
// app/loading.tsx
export default function Loading() {
  return <LoadingSpinner fullScreen />
}
```

### Component-level (manual):
```typescript
<Suspense fallback={<LoadingSpinner message="Loading..." />}>
  <LazyComponent />
</Suspense>
```

---

## Utilities Available

```typescript
// Basic
const Comp = lazy(() => import('./Comp'))

// With preload
const Comp = lazyWithPreload(() => import('./Comp'))
Comp.preload() // Preload on demand

// With retry
const Comp = lazyWithRetry(() => import('./Comp'), 3)

// With delay (testing)
const Comp = lazyWithDelay(() => import('./Comp'), 1000)
```

---

## Testing Checklist

- [ ] Check loading states appear
- [ ] Verify no flash of content
- [ ] Test on slow connection
- [ ] Check bundle size reduction
- [ ] Run Lighthouse audit
- [ ] Verify no console errors

---

## Expected Improvements

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Initial Bundle | 150-200KB | 80-100KB | -50% |
| TTI | 2-3s | 1-1.5s | -50% |
| FCP | 2-3s | 1-1.5s | -50% |
| Lighthouse | 70-80 | 85-95 | +15pts |

---

## Common Patterns

### Pattern 1: Footer (every page)
```typescript
const Footer = lazy(() => import('@/components/footer'))

<Suspense fallback={<div className="h-20" />}>
  <Footer />
</Suspense>
```

### Pattern 2: Heavy Section
```typescript
const ChartSection = lazy(() => import('./ChartSection'))

<Suspense fallback={<LoadingSpinner message="Loading charts..." />}>
  <ChartSection />
</Suspense>
```

### Pattern 3: Modal Content
```typescript
const EditModal = lazy(() => import('./EditModal'))

{isOpen && (
  <Suspense fallback={<Spinner />}>
    <EditModal />
  </Suspense>
)}
```

---

## Debugging Tips

**Issue:** Loading state flashes too fast
**Fix:** Add minimum display time

**Issue:** Component undefined error
**Fix:** Check for window/document usage

**Issue:** Multiple rerenders
**Fix:** Define lazy outside component

**Issue:** Import fails
**Fix:** Use lazyWithRetry utility

---

## Build Analysis

```bash
# Check bundle sizes
npm run build

# Look for:
# - Route sizes
# - Chunk files
# - Bundle breakdown
```

---

## Resources

- Full docs: `LAZY_LOADING.md`
- Utilities: `lib/lazy-utils.ts`
- Loading component: `components/loading-spinner.tsx`
- Next.js docs: https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading
