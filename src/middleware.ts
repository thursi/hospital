// import type { NextRequest } from 'next/server';
// import { NextResponse } from 'next/server';
// import { toast } from 'sonner';

// const protectedRoutes = ['/admin', '/doctor'];

// const authRoutes = ['/auth', '/auth'];
// // const authRoutes = ['/auth?mode=signin', '/auth?mode=signup'];


// export function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;
//   if (authRoutes.some((route) => pathname.startsWith(route))) {
//     const userRole = req.cookies.get('token')?.value;
//     if (!userRole) {
//       return;
//     }

//     const loginDetails = JSON.parse(userRole);
//     if (loginDetails.role === 'ADMIN') {
//       return NextResponse.redirect(new URL('/admin/dashboard', req.url));
//     }

//     if (loginDetails.role === 'USER') {
//       return NextResponse.redirect(new URL('/', req.url));
//     }
//   }
//   if (protectedRoutes.some((route) => pathname.startsWith(route))) {
//     const userRole = req.cookies.get('token')?.value;

//     if (!userRole) {
//       return NextResponse.redirect(new URL('/unavailable', req.url));
//     }

//     const loginDetails = JSON.parse(userRole);

//     if (pathname.startsWith('/admin') && loginDetails.role !== 'ADMIN') {
//       toast.error("You don't have access to this page!");
//       return NextResponse.redirect(new URL('/unavailable', req.url));
//     }

//     if (pathname.startsWith('/doctor') && loginDetails.role !== 'DOCTOR') {
//       toast.error("You don't have access to this page!");
//       return NextResponse.redirect(new URL('/', req.url));
//     }
//   }
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/admin/:path*', '/doctor/:path*', '/auth', '/auth'],
// };

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { toast } from 'sonner';

const protectedRoutes = ['/admin', '/doctor','/Appointments'];

const authRoutes = ['/auth', '/auth'];
// const authRoutes = ['/auth?mode=signin', '/auth?mode=signup'];


export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (authRoutes.some((route) => pathname.startsWith(route))) {
    const userRole = req.cookies.get('token')?.value;
    if (!userRole) {
      return;
    }

    const loginDetails = JSON.parse(userRole);
    if (loginDetails.role === 'ADMIN') {
      return NextResponse.redirect(new URL('/admin/dashboard', req.url));
    }

    if (loginDetails.role === 'USER') {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const userRole = req.cookies.get('token')?.value;

    if (!userRole) {
      return NextResponse.redirect(new URL('/unavailable', req.url));
    }

    const loginDetails = JSON.parse(userRole);

    if (pathname.startsWith('/admin') && loginDetails.role !== 'ADMIN') {
      toast.error("You don't have access to this page!");
      return NextResponse.redirect(new URL('/unavailable', req.url));
    }

    if (pathname.startsWith('/doctor') && loginDetails.role !== 'DOCTOR') {
      toast.error("You don't have access to this page!");
      return NextResponse.redirect(new URL('/', req.url));
    }

    if (pathname.startsWith('/Appointments') && !loginDetails.role) {
      toast.error("You don't have access to this pagethusi!");
      return NextResponse.next();
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/doctor/:path*', '/Appointments/:path*', '/auth', '/auth'],
};
