export interface TransactionSummaryResponse {
    transaction: string;
    amount: number;
    date: Date;
    operation: string;

    // transaction: 'New 8 user to #5849',
    // amount: '+$50.00',
    // date: 'June 12, 2020 02:56 PM',
    // icon: PrimeIcons.PLUS,
    // iconColor: '#0BD18A',
    // amountColor: '#0BD18A',
}
