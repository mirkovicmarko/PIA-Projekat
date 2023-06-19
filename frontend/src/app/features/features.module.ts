import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { HeaderModule } from './header/header.module';
import { AccountModule } from './account/account.module';


@NgModule({
  declarations: [],
  imports: [
    HeaderModule,
    CommonModule,
    AccountModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class FeaturesModule { }
