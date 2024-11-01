import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SearchParams } from 'src/app/demo/api/params/search-params';
import { Pagination } from 'src/app/demo/api/models/pagination';
import { PurchaseDialogComponent } from './purchase-dialog/purchase-dialog.component';
import { TransactionResponse } from 'src/app/demo/api/transaction-response';
import { SellDialogComponent } from './sell-dialog/sell-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { PortfolioService } from 'src/app/demo/service/portfolio.service';

@Component({
    templateUrl: './transactions.component.html',
    providers: [MessageService, ConfirmationService, DialogService],
})
export class TransactionsComponent implements OnInit {
    transactions: TransactionResponse[] = [];

    loading: boolean = true;
    pagination?: Pagination;
    totalRecords: number = 0;

    assetParams: SearchParams = new SearchParams();

    buyDialogRef: DynamicDialogRef | undefined;
    sellDialogRef: DynamicDialogRef | undefined;

    @ViewChild(Table) dt?: Table;

    symbol: string;

    constructor(
        private route: ActivatedRoute,
        private portfolioService: PortfolioService,
        public dialogService: DialogService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.route.params.subscribe(
            (params) => {
                this.symbol = params['symbolParam'];
                if (!this.symbol) {
                    this.load();
                } else {
                    this.load(this.symbol);
                }
            },
            () => this.load()
        );
    }

    load(query: string = 'AAPL') {
        this.loading = true;

        this.assetParams.tickerSymbol = query;
        this.symbol = query;

        this.portfolioService.getTransactions(this.assetParams).subscribe({
            next: (response) => {
                this.transactions = response.result ?? [];
                this.pagination = response.pagination;
                this.totalRecords = this.pagination?.totalItems ?? 0;
                this.loading = false;
            },
            error: () => {
                this.loading = false;
            },
        });
    }

    clear() {
        this.dt?.clearState();
    }

    buy() {
        this.buyDialogRef = this.dialogService.open(PurchaseDialogComponent, {
            header: 'Purchase',
            data: {
                symbol: this.symbol,
            },
        });

        this.buyDialogRef.onClose.subscribe((result) => {
            if (result !== 'close') {
                if (result) {
                    this.load(this.symbol);
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

    sell() {
        this.sellDialogRef = this.dialogService.open(SellDialogComponent, {
            header: 'Sell',
            data: {
                symbol: this.symbol,
            },
        });

        this.sellDialogRef.onClose.subscribe((result) => {
            if (result !== 'close') {
                if (result.success) {
                    this.load(this.symbol);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Sell successful',
                        life: 3000,
                    });
                } else if (!result.success && result.message !== '') {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Unsuccessul',
                        detail: 'Sell unsuccessful' + result.message,
                        life: 3000,
                    });
                }
            }
        });
    }
}
