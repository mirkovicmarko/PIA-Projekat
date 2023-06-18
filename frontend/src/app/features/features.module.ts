import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from '@features/account/registration/registration.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    RegistrationComponent
  ]
})
export class FeaturesModule { }
