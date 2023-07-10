import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { USER_TYPES } from '@shared/consts';
import User from '@shared/models/user';
import { AccountService } from '@shared/services/account.service';
import { UtilService } from '@shared/services/util.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public get USER_TYPES() {
    return USER_TYPES; 
  }

  user: User = new User();
  password_confirmation: string = "";

  errors: string[] = [];
  messages: string[] = [];

  admin: boolean = false;

  constructor(private accountService: AccountService, private utilService: UtilService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.admin = this.accountService.user_type === USER_TYPES.admin;
  }

  set_profile_picture(event) {
    this.utilService.image_file_to_base64(event.target.files[0]).then(
      (image: string) => {
        this.user.profile_picture = image;
      }
    );
  }

  change_user_type() {
    this.user.type = this.user.type == USER_TYPES.client ? this.USER_TYPES.agency : this.USER_TYPES.client;
  }

  async register() {
    this.errors = [];
    this.messages = [];

    if (this.user.password.localeCompare(this.password_confirmation) != 0) {
      this.errors.push('Lozinke se ne poklapaju.');
      return;
    }

    // Don't send data that has to do anything with other user types.
    for(let type of Object.keys(USER_TYPES)) {
      if(type.localeCompare(this.user.type) != 0) {
        this.user[type] = undefined;
      }
    }

    await this.accountService.register(this.user).then(
      () => {
        if(this.admin) {
          this.messages.push('Novi korisnik je uspešno kreiran.');
        }
        else {
          this.messages.push('Zahtev za registracijom je uspešno poslat.');
        }
      },
      (error: HttpErrorResponse) => this.errors = error.error
    );
  }

}
