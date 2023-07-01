import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { ItemModule } from './item/item.module';
import { SharedModule } from '@shared/shared.module';



@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ItemModule
  ]
})
export class ListModule { }
