export interface Transactions{
    id?: number;
    type?: boolean;
    categoria_id?: string;
    transacaoDescricao?: string;
    transacaoTipo?: {};
    transacaoMotivo?: string;
    conta?: {
        saldo_actual: number;
    }
    valor?: number;
    estado?: number;
    created_At?: string;
}

export interface TransactionModel{
    data:Transactions[],
    page: number,
    perPage: number,
    lastPage: number,
    total: number,
    Transactionobj?:Transactions,
    errormessage?:string
}