import environment from "@/config/environment";
import instance from "@/libs/instance";
import { ILogin } from "@/types/Auth";

const authServices = {
    login: (payload: ILogin) => instance.post(`${environment.API_URL}/login`, payload),  // Menggunakan path relatif
    getProfile: (token: string) => instance.get(`${environment.API_URL}/profile`, {   // Menggunakan path relatif
        headers: {
            Authorization: `Bearer ${token}`,  // Menambahkan token pada header
        },
    }),
}

export default authServices;