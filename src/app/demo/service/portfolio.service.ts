import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { SecurityResponse } from '../api/security-response';
import { SearchParams } from '../api/params/search-params';
import {
    getPaginatedResult,
    getPaginationHeaders,
} from 'src/app/_helpers/pagination.helper';
import { SecurityRequest } from '../api/security-request';
import { TransactionResponse } from '../api/transaction-response';
import { PurchaseRequest } from '../api/purchase-request';
import { SellRequest } from '../api/sell-request';
import { TransactionSummaryResponse } from '../api/transaction-summary-response';
import { PositionResponse } from '../api/position-response';

@Injectable({
    providedIn: 'root',
})
export class PortfolioService {
    public apiUrl: string = '';

    constructor(private http: HttpClient, @Inject('API_URL') apiUrl: string) {
        this.apiUrl = apiUrl;
    }

    getSecurity(symbol: string) {
        return this.http.get<SecurityResponse>(
            `${this.apiUrl}Portfolio/securities/${symbol}`
        );
    }

    getSecurities(assetPrams: SearchParams) {
        let params = getPaginationHeaders(
            assetPrams.pageNumber,
            assetPrams.pageSize
        );

        params = params.append('tickerSymbol', assetPrams.tickerSymbol);

        return getPaginatedResult<SecurityResponse[]>(
            `${this.apiUrl}Portfolio/securities`,
            params,
            this.http
        );
    }

    getRecentTransactions() {
        return this.http.get<TransactionSummaryResponse[]>(
            `${this.apiUrl}Portfolio/transactions/recent`
        );
    }

    getPositions() {
        return this.http.get<PositionResponse[]>(
            `${this.apiUrl}Portfolio/positions/`
        );
    }

    getTransactions(searchParams: SearchParams) {
        let params = getPaginationHeaders(
            searchParams.pageNumber,
            searchParams.pageSize
        );

        params = params.append('tickerSymbol', searchParams.tickerSymbol);

        return getPaginatedResult<TransactionResponse[]>(
            `${this.apiUrl}Portfolio/transactions`,
            params,
            this.http
        );
    }

    purchase(request: PurchaseRequest) {
        return this.http.post<PurchaseRequest>(
            `${this.apiUrl}Portfolio/buy`,
            request,
            {
                observe: 'response',
            }
        );
    }

    sell(security: SellRequest) {
        return this.http.post<SellRequest>(
            `${this.apiUrl}Portfolio/sell`,
            security,
            {
                observe: 'response',
            }
        );
    }
}
