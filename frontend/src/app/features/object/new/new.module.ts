import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewComponent } from './new.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';



@NgModule({
  declarations: [
    NewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  exports: [
    NewComponent
  ]
})
export class NewModule { }
