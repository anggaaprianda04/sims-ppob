interface IBalance {
    balance: number;
}

interface ITopup {
    top_up_amount: number,
}

interface ITransaction {
    service_code: string,
}

export type { IBalance, ITopup, ITransaction }