import environment from "@/config/environment";
import instance from "@/libs/instance";
import { ITopup, ITransaction } from "@/types/Transaction";

const transactionServices = {
    balance: (token: string) => instance.get(`${environment.API_URL}/balance`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }),
    topup: (token: string, payload: ITopup) => instance.post(`${environment.API_URL}/topup`, payload, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }),
    transaction: (token: string, payload: ITransaction) => instance.post(`${environment.API_URL}/transaction`, payload, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }),
    history: (token: string, params: string) => instance.get(`${environment.API_URL}/transaction/history/?${params}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )
};

export default transactionServices;