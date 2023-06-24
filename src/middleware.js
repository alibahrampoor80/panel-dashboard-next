import {NextResponse} from "next/server";

export async function middleware(req) {

    const url = req.url
    const pathname = req.nextUrl.pathname

    if (pathname.startsWith('/')) {
        // return NextResponse.redirect(new URL('/login', url))
    }


}

export const config = {
    matcher: ['/', '/users:path*', '/admin']
}