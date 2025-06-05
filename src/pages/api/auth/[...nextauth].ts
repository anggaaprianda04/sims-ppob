import authServices from "@/services/auth.service";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWTExtended, SessionExtended, UserExtended } from "@/types/Auth";

export default NextAuth({
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24,
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" },
            },
            async authorize(
                credentials: Record<"email" | "password", string> | undefined
            ): Promise<UserExtended | null> {
                const { email, password } = credentials as {
                    email: string;
                    password: string;
                }

                const result = await authServices.login({
                    email,
                    password,
                });

                const accessToken = result.data.data.token;
                const me = await authServices.getProfile(accessToken);
                const user = me.data.data;

                if (accessToken && result.status === 200 && user.email && me.data.status === 0) {
                    user.accessToken = accessToken;
                    return user;
                } else {
                    return null;
                }
            }
        }),
    ],
    callbacks: {
        async jwt({ token, user }: { token: JWTExtended; user: UserExtended | null; }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
        async session({ session, token }: { session: SessionExtended; token: JWTExtended; }) {
            session.user = token.user;
            session.accessToken = token.user?.accessToken;
            return session;
        }
    },
});