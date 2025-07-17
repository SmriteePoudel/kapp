import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  
  if (pathname.startsWith('/admin')) {
    
    const isAdmin = !!request.cookies.get('admin-auth');
    if (!isAdmin) {
      const loginUrl = new URL('/auth/signin', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
}; 