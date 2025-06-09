interface IInformation {
    service_code: string,
    service_name: string,
    service_icon: string,
    service_tariff: number
}

interface IBanner {
    banner_name: string,
    banner_image: string,
    description: string,
}


export type { IInformation, IBanner }