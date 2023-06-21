import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './item.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ItemComponent
  ]
})
export class ItemModule { }
