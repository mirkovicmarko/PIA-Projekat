import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestJobComponent } from './request-job.component';
import { ListModule } from './list/list.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    RequestJobComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ListModule
  ]
})
export class RequestJobModule { }
