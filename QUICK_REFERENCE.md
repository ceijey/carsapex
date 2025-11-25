# Quick Reference: Data Fetching Patterns

## When to Use Each Strategy

### ✅ Use SSG (Static Site Generation)
```typescript
// app/page.tsx
export default function Page() {
  return <div>Static content</div>
}
```
**When:**
- Content doesn't change often
- Same for all users
- SEO is important
- Maximum performance needed

**Examples:** About, Contact, Product listings

---

### ✅ Use SSG + generateStaticParams
```typescript
// app/posts/[id]/page.tsx
export async function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }]
}

export default function Page({ params }) {
  return <div>Post {params.id}</div>
}
```
**When:**
- Dynamic routes with known paths
- Content rarely changes
- Pre-generate all possible pages

**Examples:** Blog posts, Product pages, Car models

---

### ✅ Use ISR (Incremental Static Regeneration)
```typescript
// app/products/[id]/page.tsx
export const revalidate = 3600 // 1 hour

export default async function Page({ params }) {
  const data = await fetchData()
  return <div>{data}</div>
}
```
**When:**
- Content updates periodically
- Want static speed + fresh data
- Can tolerate slight staleness

**Examples:** Inventory, Prices, Stock levels

---

### ✅ Use SSR (Server-Side Rendering)
```typescript
// app/profile/page.tsx
export default async function Page() {
  const data = await fetch('...', { cache: 'no-store' })
  return <div>{data}</div>
}
```
**When:**
- Content changes per request
- User-specific data
- Real-time requirements
- Can't cache

**Examples:** Dashboards, User profiles, Personalized feeds

---

### ✅ Use Client Components
```typescript
// components/interactive.tsx
"use client"

import { useState } from 'react'

export default function Interactive() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```
**When:**
- User interactions needed
- Browser APIs (localStorage, window)
- Real-time updates (WebSockets)
- Form state management

**Examples:** Forms, Modals, Carousels, Counters

---

## Current Implementation

| Page | Strategy | Reasoning |
|------|----------|-----------|
| `/` | Client (SSG data) | Interactive hero/carousel |
| `/models` | SSG | Static list, perfect for CDN |
| `/models/[id]` | SSG + ISR | Pre-render all, revalidate daily |
| `/brands` | SSG | Static content, SEO optimized |
| `/categories` | SSG | Static content, SEO optimized |
| `/about` | SSG | Rarely changes, perfect for SSG |
| `/reserve` | Client | Form interactions needed |
| `/login` | Client | Form + auth logic |

---

## Fetch Options Reference

### Force Cache (SSG)
```typescript
fetch(url, { cache: 'force-cache' }) // Default
```

### Revalidate (ISR)
```typescript
fetch(url, { next: { revalidate: 3600 } })
```

### No Store (SSR)
```typescript
fetch(url, { cache: 'no-store' })
```

### Tag-based Revalidation
```typescript
fetch(url, { next: { tags: ['cars'] } })

// Later, revalidate all 'cars' tagged requests
revalidateTag('cars')
```

---

## Common Patterns

### Pattern 1: Static Page with Metadata
```typescript
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description',
}

export default function Page() {
  return <div>Content</div>
}
```

### Pattern 2: Dynamic Page with Static Params
```typescript
export async function generateStaticParams() {
  const items = await getItems()
  return items.map(item => ({ id: item.id }))
}

export async function generateMetadata({ params }) {
  const item = await getItem(params.id)
  return { title: item.name }
}

export const revalidate = 3600

export default async function Page({ params }) {
  const item = await getItem(params.id)
  return <div>{item.name}</div>
}
```

### Pattern 3: Hybrid (Server + Client)
```typescript
// app/page.tsx (Server Component)
export default function Page() {
  const data = getStaticData() // Runs on server
  
  return (
    <div>
      <ServerContent data={data} />
      <ClientInteractive /> {/* Client component */}
    </div>
  )
}

// components/client.tsx
"use client"
export default function ClientInteractive() {
  const [state, setState] = useState()
  return <button onClick={...}>Click</button>
}
```

---

## Performance Checklist

- [ ] Remove `"use client"` from non-interactive pages
- [ ] Add `generateStaticParams` for dynamic routes
- [ ] Add `metadata` export for SEO
- [ ] Use `revalidate` for ISR when needed
- [ ] Keep client components small and focused
- [ ] Fetch data in server components, pass to client
- [ ] Use proper cache strategies for fetch calls
- [ ] Verify build output shows ○ (static) or ● (SSG)

---

## Build Output Legend

```
○  (Static)   - Pre-rendered at build time (SSG)
●  (SSG)      - Pre-rendered with generateStaticParams
ƒ  (Dynamic)  - Rendered per request (SSR)
ƒ  Proxy      - Middleware/Proxy
```

---

## Need Help?

- Read `DATA_FETCHING.md` for detailed explanation
- Check Next.js docs: https://nextjs.org/docs/app/building-your-application/data-fetching
- Test with `npm run build` to see strategy applied
