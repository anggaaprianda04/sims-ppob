import environment from "@/config/environment";
import instance from "@/libs/instance";

const transactionServices = {
    balance: (token: string) => instance.get(`${environment.API_URL}/balance`, {   // Menggunakan path relatif
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }),
};

export default transactionServices;