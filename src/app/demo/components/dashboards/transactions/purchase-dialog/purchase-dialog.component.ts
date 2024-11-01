import { CurrencyPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { SecurityResponse } from 'src/app/demo/api/security-response';
import { PortfolioService } from 'src/app/demo/service/portfolio.service';

@Component({
    selector: 'app-purchase-security',
    standalone: true,
    imports: [
        InputNumberModule,
        ButtonModule,
        ReactiveFormsModule,
        NgIf,
        CurrencyPipe,
        ToastModule,
    ],
    templateUrl: './purchase-dialog.component.html',
    styleUrl: './purchase-dialog.component.scss',
})
export class PurchaseDialogComponent implements OnInit {
    symbol: string;
    form: FormGroup;

    security: SecurityResponse;
    loading = false;

    constructor(
        private ref: DynamicDialogRef,
        private config: DynamicDialogConfig,
        private portfolioService: PortfolioService,
        private fb: FormBuilder
    ) {
        this.symbol = this.config.data.symbol;
    }

    ngOnInit() {
        this.loading = true;
        this.form = this.fb.group({
            shares: [null],
        });

        this.portfolioService.getSecurity(this.symbol).subscribe({
            next: (response) => {
                this.security = response;
                this.loading = false;
            },
            error: () => {
                this.loading = false;
            },
        });
    }

    hideDialog() {
        this.ref.close('close');
    }

    purchase() {
        this.portfolioService
            .purchase({
                symbol: this.symbol,
                quantity: this.form.value.shares,
            })
            .subscribe({
                next: () => {
                    this.ref.close(true);
                },
                error: () => {
                   this.ref.close(false);
                },
            });
    }
}
