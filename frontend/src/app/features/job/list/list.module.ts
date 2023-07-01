import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { SharedModule } from '@shared/shared.module';
import { ItemModule } from './item/item.module';



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
