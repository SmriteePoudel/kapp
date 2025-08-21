import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, getAuthToken } from '@/lib/auth';

export function middleware(request: NextRequest) {
  const token = getAuthToken(request);
  
  
  if (request.nextUrl.pathname.startsWith('/_next') || 
      request.nextUrl.pathname.startsWith('/images') ||
      request.nextUrl.pathname.startsWith('/favicon.ico') ||
      request.nextUrl.pathname.endsWith('.png') ||
      request.nextUrl.pathname.endsWith('.jpg') ||
      request.nextUrl.pathname.endsWith('.jpeg') ||
      request.nextUrl.pathname.endsWith('.gif') ||
      request.nextUrl.pathname.endsWith('.svg') ||
      request.nextUrl.pathname.endsWith('.ico') ||
      request.nextUrl.pathname.endsWith('.webp')) {
    return NextResponse.next();
  }
  
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }
    
    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }
    
    
    if (!payload.roles || !payload.roles.includes('ADMIN')) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  
  
  if (request.nextUrl.pathname.startsWith('/api')) {
    const publicApiRoutes = [
      '/api/auth/signin',
      '/api/auth/register',
      '/api/auth/logout',
      '/api/auth/signout',
      '/api/members',
      '/api/featured',
      '/api/portfolio',
      '/api/test-auth',
      '/api/auth/home',
      '/api/upload-profile',
    ];
    
    const isPublicRoute = publicApiRoutes.some(route => 
      request.nextUrl.pathname.startsWith(route)
    );
    
    if (!isPublicRoute) {
      if (!token) {
        return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
      }
      
      const payload = verifyToken(token);
      if (!payload) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
      }
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/:path*'
  ],
};