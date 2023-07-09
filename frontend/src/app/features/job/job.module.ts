import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobRoutingModule } from './job-routing.module';
import { ListModule } from './list/list.module';
import { WorkerAllocationModule } from './worker-allocation/worker-allocation.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    JobRoutingModule,
    ListModule,
    WorkerAllocationModule
  ]
})
export class JobModule { }
