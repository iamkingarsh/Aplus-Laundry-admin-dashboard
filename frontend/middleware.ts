import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    // Variable to track login status (initially set to true)
    let isLoggedIn = request.cookies.get('AplusToken')?.value ? true : false;

    // Check if user is logged in
    if (isLoggedIn) {
        // Allow access to protected routes
        if (request.url.includes('/login') || request.url === '/') {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }

        return NextResponse.next();
    } else {
        // Redirect to login page if not logged in, but allow access to the login page itself
        if (request.url.includes('/login')) {
            return NextResponse.next();
        }

        return NextResponse.redirect(new URL('/login', request.url));
    }
}

// Adjust the matcher to target routes within the routes folder
export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
