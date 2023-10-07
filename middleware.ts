import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebaseConfig';

export function middleware(request: NextRequest) {
    // Call our authentication function to check the request
    if (!request.nextUrl.pathname.startsWith('/login') && !isAuthenticated()) {
        // Respond with JSON indicating an error message
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next();
}

function isAuthenticated() {
    return onAuthStateChanged(auth, (user) => {
        return !!user;
    });
}

export const config = { matcher: '/((?!.*\\.).*)' }