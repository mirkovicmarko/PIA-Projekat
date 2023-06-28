import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './item.component';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    ItemComponent
  ]
})
export class ItemModule { }
