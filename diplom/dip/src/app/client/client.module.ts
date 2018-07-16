import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { ClientComponentComponent } from './client-component/client-component.component';
import { EntertoComponent } from './client-component/enterto/enterto.component';
import { AccountInfoComponent } from './client-component/account-info/account-info.component';
import { MenuDisplayComponent } from './client-component/menu-display/menu-display.component';

@NgModule({
  imports: [
    CommonModule,
	FormsModule,
	ReactiveFormsModule
  ],
  declarations: [ClientComponentComponent, EntertoComponent, AccountInfoComponent, MenuDisplayComponent],
  exports: [ClientComponentComponent]
})


export class ClientModule { }
