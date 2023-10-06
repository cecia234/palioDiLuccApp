import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
    // Call our authentication function to check the request
    if (!isAuthenticated(request)) {
        // Respond with JSON indicating an error message
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

function isAuthenticated(rquest: NextRequest) {
    return true;
}