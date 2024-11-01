import { Component, OnDestroy, OnInit } from '@angular/core';
import { SecurityResponse } from 'src/app/demo/api/security-response';
import { Pagination } from 'src/app/demo/api/models/pagination';
import { SearchParams } from 'src/app/demo/api/params/search-params';
import { PortfolioService } from 'src/app/demo/service/portfolio.service';
import { TransactionSummaryResponse } from 'src/app/demo/api/transaction-summary-response';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { PurchaseDialogComponent } from '../transactions/purchase-dialog/purchase-dialog.component';

@Component({
    templateUrl: './homepage.component.html',
    providers: [MessageService, DialogService],

})
export class HomepageComponent implements OnInit, OnDestroy {
    transactions: TransactionSummaryResponse[] = [];
    securities: SecurityResponse[] = [];
    assetParams: SearchParams = new SearchParams();

    loading: boolean = false;
    pagination?: Pagination;
    totalRecords: number = 0;

    buyDialogRef: DynamicDialogRef | undefined;

    constructor(
        private portfolioService: PortfolioService,
        public dialogService: DialogService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.loadTransactionHistory();
        this.loadInstruments();
    }

    loadTransactionHistory() {
        this.portfolioService.getRecentTransactions().subscribe({
            next: (response) => {
                this.transactions = response;
            },
            error: () => {},
        });
    }

    loadInstruments(query: string = 'AAPL,BTC-USD,EURUSD=X') {
        this.loading = true;

        this.assetParams.tickerSymbol = query;

        this.portfolioService.getSecurities(this.assetParams).subscribe({
            next: (response) => {
                this.securities = response.result ?? [];
                this.pagination = response.pagination;
                this.totalRecords = this.pagination?.totalItems ?? 0;
                this.loading = false;
            },
            error: () => {
                this.loading = false;
            },
        });
    }

    buy(symbol: string) {
        this.buyDialogRef = this.dialogService.open(PurchaseDialogComponent, {
            header: 'Purchase',
            data: {
                symbol: symbol,
            },
        });

        this.buyDialogRef.onClose.subscribe((result) => {
            if (result !== 'close') {
                if (result) {
                    this.loadTransactionHistory();
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Purchase successful',
                        life: 3000,
                    });
                } else {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Unsuccessul',
                        detail: 'Purchase unsuccessful',
                        life: 3000,
                    });
                }
            }
        });
    }

    ngOnDestroy(): void {}
}
