import environment from "@/config/environment";
import axios from "axios";
import { getSession, signOut } from "next-auth/react";
import { SessionExtended } from "@/types/Auth";

const headers = {
    "Content-Type": "application/json",
}

const instance = axios.create({
    baseURL: environment.API_URL,
    headers: headers,
    timeout: 60 * 1000,
});

instance.interceptors.request.use(
    async (request) => {
        const session: SessionExtended | null = await getSession();
        if (session && session.accessToken) {
            console.log("Session found:", session);  // Debugging log
            request.headers.Authorization = `Bearer ${session.accessToken}`;
        } else {
            console.warn("No session or access token found");
        }
        return request;
    },
    (error) => Promise.reject(error)
)

instance.interceptors.response.use(
    async (response) => {
        return response;
    },
    async (error) => {
        if (error.response && error.response.status === 401) {
            console.error("Unauthorized error. Signing out...");
            await signOut({ callbackUrl: "/login" });  // Redirect ke halaman login
        }
        return Promise.reject(error);
    }
)

export default instance;