# Middleware Documentation

## Overview

This Next.js application implements middleware (proxy) for advanced routing logic, authentication checks, and request processing.

## Implementation Details

### File Location
- `middleware.ts` - Root-level middleware file that runs on matching routes

### Features Implemented

#### 1. **Authentication Protection**
- Protected routes: `/reserve`
- Checks for `auth-token` cookie
- Can redirect unauthenticated users to `/login` (currently disabled for demo)
- Preserves original destination URL for post-login redirect

#### 2. **Custom Headers**
- `x-custom-locale`: Adds locale preference from cookies (default: 'en')
- `x-pathname`: Current request pathname for logging/analytics
- `x-visitor-ip`: Client IP address from headers

#### 3. **Route Matching**
- Middleware runs on all routes except:
  - API routes (`/api/*`)
  - Static files (`/_next/static/*`)
  - Image optimization (`/_next/image/*`)
  - Public assets (images, favicon, etc.)

### Usage

#### To Enable Authentication:
Uncomment lines 18-21 in `middleware.ts`:
```typescript
if (isProtectedRoute && !isAuthenticated) {
  const loginUrl = new URL('/login', request.url)
  loginUrl.searchParams.set('from', pathname)
  return NextResponse.redirect(loginUrl)
}
```

#### To Add More Protected Routes:
```typescript
const protectedRoutes = ['/reserve', '/profile', '/dashboard']
```

#### To Add Locale-Based Redirection:
```typescript
if (pathname === '/' && locale === 'fr') {
  return NextResponse.redirect(new URL('/fr', request.url))
}
```

### Login Page
- Location: `app/login/page.tsx`
- Sets `auth-token` cookie on successful login
- Redirects to original destination using `from` query parameter

### Testing

1. **Test Authentication Flow:**
   ```
   1. Visit http://localhost:3000/reserve (or any protected route)
   2. Enable auth check in middleware
   3. You'll be redirected to /login
   4. Login and you'll be redirected back to /reserve
   ```

2. **Check Middleware Headers:**
   Open browser DevTools > Network tab and inspect response headers

### Production Considerations

For production use, replace the demo authentication with:

1. **Session Management:**
   ```typescript
   import { getSession } from '@/lib/auth'
   const session = await getSession(request)
   ```

2. **JWT Verification:**
   ```typescript
   import { verifyJWT } from '@/lib/jwt'
   const token = request.cookies.get('auth-token')?.value
   const isValid = token && await verifyJWT(token)
   ```

3. **Database Session Check:**
   ```typescript
   const sessionId = request.cookies.get('session-id')?.value
   const session = await db.session.findUnique({ where: { id: sessionId } })
   ```

### Middleware Performance

- Middleware runs on every matching request
- Keep middleware logic lightweight
- Avoid heavy computations or database queries
- Use edge runtime for better performance (optional):
  ```typescript
  export const config = {
    runtime: 'edge',
    matcher: [...]
  }
  ```

### Error Handling

The middleware includes safe defaults:
- Falls back to 'unknown' for missing IP
- Defaults to 'en' locale if not set
- Continues to next middleware if no conditions match

## Additional Resources

- [Next.js Middleware Docs](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [NextRequest API](https://nextjs.org/docs/app/api-reference/functions/next-request)
- [NextResponse API](https://nextjs.org/docs/app/api-reference/functions/next-response)
