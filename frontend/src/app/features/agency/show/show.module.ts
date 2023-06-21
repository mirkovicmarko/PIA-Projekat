import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowComponent } from './show.component';
import { SharedModule } from '@shared/shared.module';



@NgModule({
  declarations: [
    ShowComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ShowModule { }
