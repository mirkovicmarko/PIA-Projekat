import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '@features/account/login/login.component';
import { RegistrationComponent } from '@features/account/registration/registration.component';
import { ForgottenPasswordComponent } from '@features/account/forgotten-password/forgotten-password.component';

const routes: Routes = [
  {
    path: "account/register",
    component: RegistrationComponent
  },
  
  {
    path: "account/login_admin",
    component: LoginComponent
  },
  {
    path: "account/forgotten_password",
    component: ForgottenPasswordComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeaderRoutingModule { }
