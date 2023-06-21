import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { HeaderModule } from './header/header.module';
import { AccountModule } from './account/account.module';
import { AgencyModule } from './agency/agency.module';


@NgModule({
  declarations: [],
  imports: [
    HeaderModule,
    CommonModule,
    AccountModule,
    AgencyModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class FeaturesModule { }
