import {NextResponse} from "next/server";

export async function middleware(req) {

    const url = req.url
    const pathname = req.nextUrl.pathname

    if (pathname.startsWith('/profile')) {

    }
    if (pathname.startsWith('/admin')) {
        console.log('admin req')

    }

}

export const config = {
    matcher: ['/admin:path*', '/profile:path*']
}