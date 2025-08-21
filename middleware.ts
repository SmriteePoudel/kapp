import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, getAuthToken } from '@/lib/auth';

function getBearerToken(request: NextRequest): string | undefined {
  const authHeader = request.headers.get('authorization') || request.headers.get('Authorization');
  if (!authHeader) return undefined;
  const [scheme, token] = authHeader.split(' ');
  if (!scheme || scheme.toLowerCase() !== 'bearer' || !token) return undefined;
  return token;
}

export function middleware(request: NextRequest) {
  const cookieToken = getAuthToken(request);
  
  
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!cookieToken) {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }
    
    const payload = verifyToken(cookieToken);
    if (!payload || !payload.roles || !Array.isArray(payload.roles)) {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }
    
    
    if (!payload.roles.includes('ADMIN')) {
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
      const bearerToken = getBearerToken(request);
      const cookiePayload = cookieToken ? verifyToken(cookieToken) : null;
      const bearerPayload = bearerToken ? verifyToken(bearerToken) : null;

      if (!cookiePayload && !bearerPayload) {
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