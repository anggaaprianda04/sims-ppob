// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { JWTExtended } from "./types/Auth";

export async function middleware(request: NextRequest) {
    const token: JWTExtended | null = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });
    const { pathname } = request.nextUrl;
    console.log('aa', token);
    // Jika ada accessToken, redirect ke halaman utama
    if (!token?.user?.accessToken) {
        if (pathname !== "/auth/login" && pathname !== "/auth/register") {
            return NextResponse.redirect(new URL("/auth/login", request.url)); // Redirect ke login
        }
    } else {
        if (pathname === "/auth/login" || pathname === "/auth/register") {
            return NextResponse.redirect(new URL("/", request.url)); // Redirect ke halaman utama
        }
    }
}
export const config = {
    matcher: ["/auth/:path*"],
}