import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AccountService } from '@shared/services/account.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  old_password: string;
  new_password: string;
  new_password_again: string;

  verification_code: string = null;

  errors: string[] = [];
  messages: string[] = [];

  constructor(private activeRoute: ActivatedRoute, private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.verification_code = this.activeRoute.snapshot.queryParams['verification_code'];
    if(!this.verification_code) {
      this.verification_code = null;
    }
  }

  async change_password() {
    this.errors = [];
    this.messages = [];

    if(!this.new_password || !this.new_password_again) {
      this.errors.push('Unesite novu lozinku.');
      return;
    }

    if(this.new_password.localeCompare(this.new_password_again) != 0) {
      this.errors.push('Lozinke se ne poklapaju.');
      return;
    }

    if(this.verification_code != null) {
      this.accountService.change_forgotten_password(this.verification_code, this.new_password).then(
        (_response) => {
          this.router.navigate(['/account/login']);
        },
        (error: HttpErrorResponse) => this.errors = error.error
      );
    }
    else {
      this.accountService.change_password(this.old_password, this.new_password).then(
        (_response) => {
          this.accountService.logout();
          this.router.navigate(['/account/login']);
        },
        (error: HttpErrorResponse) => this.errors = error.error
      );
    }
  }
}
