import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { LoginModule } from './login/login.module';
import { RegistrationModule } from './registration/registration.module';
import { ForgottenPasswordModule } from './forgotten-password/forgotten-password.module';
import { ChangePasswordModule } from './change-password/change-password.module';
import { InfoModule } from './info/info.module';
import { ListModule } from './list/list.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AccountRoutingModule,
    LoginModule,
    RegistrationModule,
    ForgottenPasswordModule,
    ChangePasswordModule,
    InfoModule,
    ListModule
  ]
})
export class AccountModule { }
