import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '@features/account/login/login.component';
import { RegistrationComponent } from '@features/account/registration/registration.component';

const routes: Routes = [
  {
    path: "account/register",
    component: RegistrationComponent
  },
  {
    path: "account/login",
    component: LoginComponent
  },
  {
    path: "account/login_admin",
    component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeaderRoutingModule { }
