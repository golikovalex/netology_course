import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KitchenComponent } from './kitchen-component/kitchen-component.component';
import { MyOrdersComponent } from './kitchen-component/my-orders/my-orders.component';
import { IsCookingComponent } from './kitchen-component/is-cooking/is-cooking.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [KitchenComponent, MyOrdersComponent, IsCookingComponent],
  exports: [KitchenComponent]
})
export class KitchenModule { }
