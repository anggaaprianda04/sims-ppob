// middleware.ts
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { JWTExtended } from "./types/Auth";

export async function middleware(request: NextRequest) {
    const token: JWTExtended | null = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });
    const { pathname } = request.nextUrl;

    // Jika ada accessToken, redirect ke halaman utama
    if (token) {
        if (pathname === "/auth/login" || pathname === "/auth/register") {
            // Jika pengguna sudah login, jangan izinkan mereka mengakses /auth/login
            return NextResponse.redirect(new URL("/", request.url));
        }
    } else {
        if (pathname !== "/auth/login" && pathname !== "/auth/register") {
            // Jika tidak ada accessToken, arahkan ke halaman login
            return NextResponse.redirect(new URL("/auth/login", request.url));
        }
    }

    return NextResponse.next();
}
