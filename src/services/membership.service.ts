import environment from "@/config/environment";
import instance from "@/libs/instance";
import { ILogin, IRegister } from "@/types/Auth";

const membershipServices = {
    login: (payload: ILogin) => instance.post(`${environment.API_URL}/login`, payload),
    register: (payload: IRegister) => instance.post(`${environment.API_URL}/registration`, payload),
    getProfile: (token: string) => instance.get(`${environment.API_URL}/profile`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }),
}

export default membershipServices;