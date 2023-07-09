import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkerAllocationComponent } from './worker-allocation.component';
import { SharedModule } from '@shared/shared.module';



@NgModule({
  declarations: [
    WorkerAllocationComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class WorkerAllocationModule { }
