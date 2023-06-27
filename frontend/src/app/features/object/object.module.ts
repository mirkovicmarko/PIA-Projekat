import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ObjectRoutingModule } from './object-routing.module';
import { NewModule } from './new/new.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ObjectRoutingModule,
    NewModule
  ]
})
export class ObjectModule { }
