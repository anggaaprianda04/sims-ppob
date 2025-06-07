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
    // console.log('aa', token?.email);
    if (!token?.user?.accessToken) {
        if (
            pathname !== "/auth/login" &&
            pathname !== "/auth/register"
        ) {
            const loginUrl = new URL("/auth/login", request.url);
            return NextResponse.redirect(loginUrl);
        }
    } else {
        if (
            pathname === "/auth/login" ||
            pathname === "/auth/register"
        ) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }
    return NextResponse.next();
}
export const config = {
    matcher: ["/((?!_next|api|auth/login|auth/register).*)"],
}