import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Trading',
                icon: 'pi pi-home',
                items: [
                    {
                        label: 'Homepage',
                        icon: 'pi pi-fw pi-calendar',
                        routerLink: ['/'],
                    },
                    {
                        label: 'Portfolio',
                        icon: 'pi pi-fw pi-id-card',
                        routerLink: ['/dashboard/portfolio'],
                    },
                    {
                        label: 'Transactions',
                        icon: 'pi pi-fw pi-list',
                        routerLink: ['/dashboard/transactions'],
                    },
                ],
            },
        ];
    }
}
