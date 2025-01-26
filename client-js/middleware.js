import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export function middleware(request) {



    const authToken = request.cookies.get("auth_token") || cookies().get('auth_token')?.value;

    const { pathname } = request.nextUrl;


    console.log("authToken: " + authToken);


    // Protected routes
    // const protectedPaths = ['/Trips', '/CreateTrip'];
    // const isProtectedRoute = protectedPaths.some(path => pathname.startsWith(path));

    // // Auth paths
    // const authPaths = ['/auth/login', '/auth/register'];
    // const isAuthPath = authPaths.some(path => pathname.startsWith(path));


    // // Redirect to login if accessing protected route without token
    // if (isProtectedRoute && !authToken) {
    //     return NextResponse.redirect(new URL('/auth/login', request.url));
    // }

    // // Redirect to trips if accessing auth pages with token
    // if (isAuthPath && authToken) {
    //     return NextResponse.redirect(new URL('/trips', request.url));
    // }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/Trips/:path*',
        '/CreateTrip',
        '/auth/:path*'
    ]
};