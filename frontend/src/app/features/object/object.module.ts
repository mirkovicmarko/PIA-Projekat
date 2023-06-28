import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ObjectRoutingModule } from './object-routing.module';
import { NewModule } from './new/new.module';
import { ListModule } from './list/list.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ObjectRoutingModule,
    NewModule,
    ListModule
  ]
})
export class ObjectModule { }
