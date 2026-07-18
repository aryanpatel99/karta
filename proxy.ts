import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export default clerkMiddleware(async (auth, request) => {
    const { userId, orgId } = await auth();
    const { pathname } = request.nextUrl;

    // defining the public routes
    const isPublicRoute = 
        pathname === "/" || 
        pathname.startsWith("/sign-in") ||
        pathname.startsWith("/sign-up");

    // if the user is logged in and trying to access the landing page ('/'),
    // redirect them to their organization or the select-org page
    if (userId && pathname === '/') {
        let path = '/select-org';
        if (orgId) {
            path = `/organization/${orgId}`;
        }
        const orgSelection = new URL(path, request.url);
        return NextResponse.redirect(orgSelection);
    }

    // protect the non public routes
    if (!isPublicRoute) {
        await auth.protect();
    }
});

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
        '/__clerk/:path*',
    ],
};
