export interface TransactionResponse {
    symbol: string;
    operation: string;
    quantity: number;
    priceAtTransaction: number;
    transactionDate: Date;
}