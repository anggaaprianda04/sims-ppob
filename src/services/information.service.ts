import environment from "@/config/environment";
import instance from "@/libs/instance";

const informationServices = {
    service: (token: string) => instance.get(`${environment.API_URL}/services`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }),
}

export default informationServices;