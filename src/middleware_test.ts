import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest): Promise<NextResponse> {
    const session = request.cookies.get('session')?.value;

    const currentUrl = new URL(request.url);
    if (!session && currentUrl.pathname !== '/auth/login') {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    // If session exists, continue the request
    return NextResponse.next();
}
