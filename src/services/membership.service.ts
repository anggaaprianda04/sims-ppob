import environment from "@/config/environment";
import instance from "@/libs/instance";
import { ILogin, IRegister, UpdateProfilePayload } from "@/types/Auth";

const membershipServices = {
    login: (payload: ILogin) => instance.post(`${environment.API_URL}/login`, payload),
    register: (payload: IRegister) => instance.post(`${environment.API_URL}/registration`, payload),
    getProfile: (token: string) => instance.get(`${environment.API_URL}/profile`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }),
    updateProfile: (token: string, payload: UpdateProfilePayload) => instance.put(`${environment.API_URL}/profile/update`, payload, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

export default membershipServices;