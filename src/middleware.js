import { getToken } from 'next-auth/jwt';
export { default } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export async function middleware(request) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;
  // console.log(token)
  // Redirect to dashboard if the user is already authenticated
  // and trying to access sign-in, sign-up, or home page
  if (
    token &&
    (url.pathname.startsWith('/sign-in') ||
      url.pathname.startsWith('/sign-up')
    )
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!token && 
    (url.pathname.startsWith('/dashboard') ||
      url.pathname.startsWith('/cv-build') ||
      url.pathname.startsWith('/template')
    )
  ) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: ['/dashboard/:path*', '/sign-in', '/sign-up', '/cv-build/:path*', '/template/:path*'],
};