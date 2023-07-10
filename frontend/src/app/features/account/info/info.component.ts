import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { USER_TYPES } from '@shared/consts';

import User from '@shared/models/user';
import { AccountService } from '@shared/services/account.service';
import { UtilService } from '@shared/services/util.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  public get USER_TYPES() {
    return USER_TYPES; 
  }

  user: User;

  errors: string[] = [];
  messages: string[] = [];

  edit_mode: boolean = false;
  info_loaded: boolean = false;

  requested_user_id: string;

  constructor(private accountService: AccountService, private router: Router, private utilService: UtilService, private activedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.requested_user_id = this.activedRoute.snapshot.queryParams['id'];

    this.accountService.get_info(this.requested_user_id).then(
        (response: User) => {
          this.user = response;
          this.info_loaded = true;
        },
        (error: HttpErrorResponse) => {
          this.errors.push(error.error);
        }
      );
  }

  change_profile_picture(event) {
    this.utilService.image_file_to_base64(event.target.files[0]).then(
      (image: string) => {
        this.user.profile_picture = image;
      }
    );
  }

  async change_info_or_mode() {
    if (!this.edit_mode) {
      this.messages = [];
      this.edit_mode = true;
      return;
    }

    this.errors = [];
    this.messages = [];

    try {
      await this.accountService.change_info(this.user, this.requested_user_id);
    }
    catch (error) {
      this.errors = error.error;
      return;
    }

    this.messages.push('Podaci su uspešno izmenjeni.');
    this.edit_mode = false;
  }

}
