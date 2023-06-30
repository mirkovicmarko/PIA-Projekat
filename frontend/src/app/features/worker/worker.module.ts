import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkerRoutingModule } from './worker-routing.module';
import { UpsertModule } from './upsert/upsert.module';
import { AllModule } from './all/all.module';
import { RequestMoreModule } from './request-more/request-more.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    WorkerRoutingModule,
    UpsertModule,
    AllModule,
    RequestMoreModule
  ]
})
export class WorkerModule { }
