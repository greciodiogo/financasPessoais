export interface Transactions{
    id?: number;
    type?: boolean;
    categoria_id?: string;
    transacaoDescricao?: string;
    transacaoTipo?: {};
    transacaoMotivo?: string;
    transacao_estado?: string;
    transacao_author?: string;
    conta?: {
        saldo_actual: number;
    }
    valor?: number;
    estado?: number;
    created_At?: string;
    saldo_actual?: number;
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