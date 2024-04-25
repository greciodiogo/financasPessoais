
export interface Transaction {
    type: boolean;
    categoria_id: string;
    transacaoDescricao: string;
    transacaoTipos: [];
    transacaoMotivo: string;
    valor: number;
    estado: number;
    created_At: string;
}
