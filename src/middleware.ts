import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@/lib/auth'

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isOnLoginPage = req.nextUrl.pathname.startsWith('/login')
  const isOnPublicRoute = [
    '/api/auth',
    '/_next',
    '/images',
    '/favicon.ico',
  ].some(path => req.nextUrl.pathname.startsWith(path))

  // Redirect logged-in users away from login page
  if (isLoggedIn && isOnLoginPage) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }

  // Allow access to public routes
  if (isOnPublicRoute) {
    return NextResponse.next()
  }

  // Redirect non-logged-in users to login page
  if (!isLoggedIn && !isOnLoginPage) {
    const loginUrl = new URL('/login', req.nextUrl)
    loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
})

// Optionally configure protected routes
export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico).*)'],
}
