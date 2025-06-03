import environment from "@/config/environment";
import instance from "@/libs/instance";
import { ILogin } from "@/types/Auth";

const authServices = {
    login: (payload: ILogin) => instance.post(`${environment.API_URL}/login`, payload),
}

export default authServices;