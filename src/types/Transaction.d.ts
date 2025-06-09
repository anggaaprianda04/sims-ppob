interface IBalance {
    balance: number;
}

interface ITopup {
    top_up_amount: number,
}

interface ITransaction {
    service_code: string,
}

interface IHistoryTransaction {
    invoice_number: string,
    transaction_type: string,
    description: string,
    total_amount: number,
    created_on: string,
}

export type { IBalance, ITopup, ITransaction, IHistoryTransaction }