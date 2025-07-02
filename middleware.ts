import { type NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { updateSession } from './utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  const publicPaths = ['/login', '/signup'];
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname);

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll() {}, // No-op for middleware check
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (isPublicPath) {
    // If user is logged in, redirect to home
    if (user) {
      const url = request.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
    // Allow access to public path
    return NextResponse.next();
  } else {
    // For all other routes, require authentication
    // if (!user) {
    //   const url = request.nextUrl.clone();
    //   url.pathname = '/login';
    //   return NextResponse.redirect(url);
    // }
    // User is authenticated, continue
    return await updateSession(request);
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}