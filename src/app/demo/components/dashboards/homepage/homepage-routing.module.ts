import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomepageComponent as HomepageComponent } from './homepage.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: HomepageComponent }
	])],
	exports: [RouterModule]
})
export class HomepageRoutingModule { }
