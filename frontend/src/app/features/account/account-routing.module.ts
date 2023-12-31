import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ForgottenPasswordComponent } from './forgotten-password/forgotten-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { InfoComponent } from './info/info.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: 'account',
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'login_admin',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegistrationComponent
      },
      {
        path: 'forgotten_password',
        component: ForgottenPasswordComponent
      },
      {
        path: 'change_password',
        component: ChangePasswordComponent
      },
      {
        path: 'info',
        component: InfoComponent
      },
      {
        path: 'list',
        component: ListComponent
      },
      {
        path: 'edit',
        component: InfoComponent
      },
      {
        path: 'new',
        component: RegistrationComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
