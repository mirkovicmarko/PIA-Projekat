import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationComponent } from '@features/account/registration/registration.component';
import { HeaderComponent } from '@features/header/header.component';
import { HeaderModule } from './header/header.module';
import { RegistrationModule } from './account/registration/registration.module';


@NgModule({
  declarations: [],
  imports: [
    HeaderModule,
    RegistrationModule,
    CommonModule
  ],
  exports: [
    RegistrationComponent,
    HeaderComponent
  ]
})
export class FeaturesModule { }
