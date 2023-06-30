import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpsertComponent } from './upsert.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UpsertComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class UpsertModule { }
