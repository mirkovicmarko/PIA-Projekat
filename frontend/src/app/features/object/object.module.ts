import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ObjectRoutingModule } from './object-routing.module';
import { UpsertModule } from './upsert/upsert.module';
import { ListModule } from './list/list.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ObjectRoutingModule,
    UpsertModule,
    ListModule
  ]
})
export class ObjectModule { }
