import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { HeaderModule } from './header/header.module';
import { AccountModule } from './account/account.module';
import { AgencyModule } from './agency/agency.module';
import { ObjectModule } from './object/object.module';
import { WorkerModule } from './worker/worker.module';


@NgModule({
  declarations: [],
  imports: [
    HeaderModule,
    CommonModule,
    AccountModule,
    AgencyModule,
    ObjectModule,
    WorkerModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class FeaturesModule { }
