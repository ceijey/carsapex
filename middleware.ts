import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Authentication check for protected routes
  // In a real app, you'd check for a session token/JWT
  const isAuthenticated = request.cookies.get('auth-token')?.value

  // Protected routes that require authentication
  const protectedRoutes = ['/reserve']
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  // Redirect to login if accessing protected route without auth
  if (isProtectedRoute && !isAuthenticated) {
    // For demo purposes, we'll allow access but you can uncomment below to enforce auth
    // const loginUrl = new URL('/login', request.url)
    // loginUrl.searchParams.set('from', pathname)
    // return NextResponse.redirect(loginUrl)
  }

  // Locale-based redirection (example)
  const locale = request.cookies.get('preferred-locale')?.value || 'en'
  
  // Add custom headers
  const response = NextResponse.next()
  response.headers.set('x-custom-locale', locale)
  response.headers.set('x-pathname', pathname)

  // Rate limiting headers (example)
  const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? 'unknown'
  response.headers.set('x-visitor-ip', ip)

  return response
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.svg|.*\\.gif).*)',
  ],
}
