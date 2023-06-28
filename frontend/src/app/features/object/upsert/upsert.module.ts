import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpsertComponent } from './upsert.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';



@NgModule({
  declarations: [
    UpsertComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  exports: [
    UpsertComponent
  ]
})
export class UpsertModule { }
