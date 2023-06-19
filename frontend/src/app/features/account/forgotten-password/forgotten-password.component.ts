import { Component } from '@angular/core';

import { AccountService } from '@shared/services/account.service';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.css']
})
export class ForgottenPasswordComponent {
  email: string;

  errors: string[];
  messages: string[];

  constructor(private accountService: AccountService) { }

  send_email() {
    this.errors = [];
    this.messages = [];

    this.accountService.forgotten_password(this.email).then(
      (_response) => this.messages.push('Proverite Vaš i-mejl, link je poslat.'),
      (error) => this.errors = error.error
    );
  }
}
