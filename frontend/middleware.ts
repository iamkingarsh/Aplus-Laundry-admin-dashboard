import { is, tr } from 'date-fns/locale';
import { NextRequest, NextResponse } from 'next/server';

// Variable to track login status (initially set to true)
let isLoggedIn: boolean = false;

export function middleware(request: NextRequest) {
    // Access and potentially modify isLoggedIn within your middleware logic

    // Example usage:
    if (isLoggedIn) {
        // Allow access to protected routes
        console.log(request.url)
        if (request.url.includes('/login')) {
            return NextResponse.redirect(new URL('/dashboard', request.url));

        }

        return NextResponse.next();
    } else {
        console.log(request.url)

        // Redirect to login page if not logged in, but allow access to login page itself
        if (request.url.includes('/login')) {
            return NextResponse.next();
        }
        return NextResponse.redirect(new URL('/login', request.url));

    }
}

// Adjust the matcher to target routes within the routes folder

//get all the routes inside the (routes) organizational folder and subfolders
export const config = {
    matcher: [
        '/dashboard/:path*',
        '/(routes)/:path*',
        '/login',
        '/acceptInvite/:path*',

    ],
};
