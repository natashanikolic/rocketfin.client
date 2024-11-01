import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', data: {breadcrumb: 'Transaction History'}, loadChildren: () => import('./homepage/homepage.module').then(m => m.HomepageModule) },
        { path: 'dashboard/portfolio', data: { breadcrumb: 'Portfolio' }, loadChildren: () => import('../dashboards/portfolio/portfolio.module').then(m => m.PortfolioModule) },
        { path: 'dashboard/transactions/:symbolParam', data: { breadcrumb: 'Transactions' }, loadChildren: () => import('../dashboards/transactions/transactions.module').then(m => m.TransactionsModule) },
        { path: 'dashboard/transactions', data: { breadcrumb: 'Transactions' }, loadChildren: () => import('../dashboards/transactions/transactions.module').then(m => m.TransactionsModule) },
    ])],
    exports: [RouterModule]
})
export class DashboardsRoutingModule { }
