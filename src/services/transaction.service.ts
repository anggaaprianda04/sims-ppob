import environment from "@/config/environment";
import instance from "@/libs/instance";
import { ITopup } from "@/types/Transaction";

const transactionServices = {
    balance: (token: string) => instance.get(`${environment.API_URL}/balance`, {   // Menggunakan path relatif
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }),
    topup: (token: string, payload: ITopup) => instance.post(`${environment.API_URL}/topup`, payload, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }),
};

export default transactionServices;