import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationComponent } from './account/registration/registration.component';
import { HeaderComponent } from './header/header.component';
import { HeaderModule } from './header/header.module';
import { RegistrationModule } from './account/registration/registration.module';
import { LoginModule } from './account/login/login.module';


@NgModule({
  declarations: [],
  imports: [
    HeaderModule,
    CommonModule,
    RegistrationModule,
    LoginModule
  ],
  exports: [
    RegistrationComponent,
    HeaderComponent
  ]
})
export class FeaturesModule { }
