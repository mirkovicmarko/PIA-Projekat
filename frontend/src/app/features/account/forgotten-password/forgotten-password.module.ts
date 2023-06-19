import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { ForgottenPasswordComponent } from './forgotten-password.component';


@NgModule({
  declarations: [
    ForgottenPasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ForgottenPasswordModule { }
