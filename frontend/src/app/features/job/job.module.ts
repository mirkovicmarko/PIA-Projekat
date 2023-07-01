import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobRoutingModule } from './job-routing.module';
import { ListModule } from './list/list.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    JobRoutingModule,
    ListModule
  ]
})
export class JobModule { }
