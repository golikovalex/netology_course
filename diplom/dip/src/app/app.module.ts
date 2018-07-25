import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { HttpClientModule } from '@angular/common/http'; 
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ClientModule } from './client/client.module';
import { KitchenModule } from './kitchen/kitchen.module';
import { ClientComponentComponent } from './client/client-component/client-component.component';
import { KitchenComponent } from './kitchen/kitchen-component/kitchen-component.component';


const appRoutes: Routes = [
	{ path: '', component: ClientComponentComponent },
	{ path: 'kitchen', component: KitchenComponent }
];


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
	ClientModule,
	KitchenModule,
	MaterializeModule,
	HttpClientModule,
	RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
