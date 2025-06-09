import { User, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
interface IUser {
    accessToken: string;
    email: string;
    first_name: string;
    last_name: string;
    profile_image: string;
}

interface ILogin {
    email: string,
    password: string,
}

interface IRegister {
    email: string,
    first_name: string,
    last_name: string,
    password: string,
}

interface UserExtended extends User {
    accessToken?: string;
}

interface SessionExtended extends Session {
    accessToken?: string;
}

interface JWTExtended extends JWT {
    user?: UserExtended;
}

type UpdateProfilePayload = Pick<IUser, "first_name" | "last_name">;

export type { SessionExtended, ILogin, IRegister, User, JWTExtended, UserExtended, IUser, UpdateProfilePayload };