import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgencyRoutingModule } from './agency-routing.module';
import { ListModule } from './list/list.module';
import { ShowModule } from './show/show.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AgencyRoutingModule,
    ListModule,
    ShowModule
  ]
})
export class AgencyModule { }
