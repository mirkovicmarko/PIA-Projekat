import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllComponent } from './all.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AllComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class AllModule { }
