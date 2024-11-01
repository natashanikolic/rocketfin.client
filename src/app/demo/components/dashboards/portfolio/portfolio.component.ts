import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { PortfolioService } from 'src/app/demo/service/portfolio.service';
import { PositionResponse } from 'src/app/demo/api/position-response';
import { Router } from '@angular/router';

@Component({
    templateUrl: './portfolio.component.html',
    providers: [MessageService, ConfirmationService],
})
export class PortfolioComponent implements OnInit {

    positions: PositionResponse[] = [];

    submitted: boolean = false;

    rowsPerPageOptions = [5, 10, 20];

    constructor(
        public router: Router,
        private portfolioService: PortfolioService,
    ) {}

    ngOnInit() {
        this.portfolioService.getPositions().subscribe({
            next: (response) => {
                this.positions = response;
            },
            error: () => {},
        });
    }

    viewSecurityTransactions(symbol: string) {

    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }
}
