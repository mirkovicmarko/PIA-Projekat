import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './item.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';



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
