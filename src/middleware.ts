// ========================================
// Next.js Middleware — Route Protection
// Protects /admin/* and mutation APIs
// ========================================

import { NextRequest, NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { sessionOptions, SessionData } from './lib/session';

// Routes that require admin authentication
const PROTECTED_PAGE_ROUTES = ['/admin/dashboard'];
const PROTECTED_API_ROUTES = ['/api/projects', '/api/messages'];
const MUTATION_METHODS = ['POST', 'PUT', 'DELETE', 'PATCH'];

// Public routes that should never be blocked
const PUBLIC_ROUTES = [
  '/admin/login',
  '/api/auth',
  '/api/contact', // Contact form POST is always public
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method;

  // Allow public routes
  if (PUBLIC_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Check if this route needs protection
  const isProtectedPage = PROTECTED_PAGE_ROUTES.some((route) =>
    pathname.startsWith(route)
  );
  const isProtectedApi =
    PROTECTED_API_ROUTES.some((route) => pathname.startsWith(route)) &&
    MUTATION_METHODS.includes(method);

  if (!isProtectedPage && !isProtectedApi) {
    return NextResponse.next();
  }

  // Validate session
  try {
    const response = NextResponse.next();
    const session = await getIronSession<SessionData>(
      request,
      response,
      sessionOptions
    );

    if (!session.isAdmin || !session.address) {
      // API routes return 401, page routes redirect
      if (pathname.startsWith('/api/')) {
        return NextResponse.json(
          { error: 'Unauthorized — admin session required' },
          { status: 401 }
        );
      }

      // Redirect to admin login
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Verify the session address matches owner wallet
    const ownerWallet = process.env.NEXT_PUBLIC_OWNER_WALLET?.toLowerCase();
    if (ownerWallet && session.address.toLowerCase() !== ownerWallet) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json(
          { error: 'Forbidden — not the owner wallet' },
          { status: 403 }
        );
      }
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    return response;
  } catch (error) {
    console.error('Middleware auth error:', error);
    if (pathname.startsWith('/api/')) {
      return NextResponse.json(
        { error: 'Authentication error' },
        { status: 500 }
      );
    }
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
}

export const config = {
  matcher: [
    '/admin/dashboard/:path*',
    '/api/projects/:path*',
    '/api/messages/:path*',
  ],
};
