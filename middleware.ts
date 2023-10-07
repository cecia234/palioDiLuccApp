import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebaseConfig';

export function middleware(request: NextRequest) {

    if ((request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/signup'))) {
        if (isAuthenticated()) {
            // return NextResponse.redirect(new URL('/home', request.url))
        }
    } else {
        if (!isAuthenticated()) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }
    return NextResponse.next();
}

function isAuthenticated() {
    return onAuthStateChanged(auth, (user) => {
        return !!user;
    });
}

export const config = { matcher: '/((?!.*\\.).*)' }