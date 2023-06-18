import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import User from '@shared/models/user';
import { WEBSITE_URL, USER_TYPES } from '@shared/consts';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  user_type: string = USER_TYPES.none;
  user_id: number = -1;
  user_change: EventEmitter<string> = new EventEmitter();

  private endpoint_address: string = WEBSITE_URL + "/users";

  constructor(private http: HttpClient) { }

  set_user(id:number = -1, type: string = USER_TYPES.none) {
    this.user_type = type;
    this.user_id = id;
    this.user_change.emit(this.user_type);
  }

  async check_login() {
    let post = this.http.post(
      this.endpoint_address + '/check_login',
      {},
      { withCredentials: true }
    );

    await firstValueFrom(post).then(
      (response) => this.set_user(response['user_id'], response['user_type']),
      (error: HttpErrorResponse) => {
        this.set_user();
        if (error.status != 401) throw error;
      }
    );
  }

  async login(username: string, password: string) {
    let post = this.http.post(
      this.endpoint_address + '/login',
      { username: username, password: password },
      { withCredentials: true }
    );

    await firstValueFrom(post).then(
      (response) => this.set_user(response['user_id'], response['user_type']),
      (error: HttpErrorResponse) => { this.set_user(); throw error; }
    );
  }

  async register(user: User) {
    let post_body = {
      user: user
    };

    let post = this.http.post(
      this.endpoint_address + '/register',
      post_body
    );

    // TODO check
    await firstValueFrom(post);
  }

  async change_info(user: User) {
    let post_body = {
      user: user
    };

    let post = this.http.post(
      this.endpoint_address + '/change_info',
      post_body,
      { withCredentials: true }
    );

    await firstValueFrom(post);
  }

  async get_info() {
    let post = this.http.post(
      this.endpoint_address + '/get_info',
      { },
      { withCredentials: true }
    );

    firstValueFrom(post).then(
      (response) => response
    );
  }

  async forgotten_password(email) {
    let post = this.http.post(
      this.endpoint_address + '/forgotten_password',
      { email: email }
    );

    await firstValueFrom(post);
  }

  async change_user_password(old_password: string, new_password: string) {
    let post = this.http.post(
      this.endpoint_address + '/change_user_password',
      { old_password: old_password, new_password: new_password },
      { withCredentials: true }
    );

    await firstValueFrom(post);
  }

  async change_forgotten_password(verification_code: string, new_password: string) {
    let post = this.http.post(
      this.endpoint_address + '/change_password',
      { verification_code: verification_code, new_password: new_password },
      { withCredentials: true }
    );

    await firstValueFrom(post);
  }

  async logout() {
    let post = this.http.post(
      this.endpoint_address + '/logout',
      { },
      { withCredentials: true }
    );

    await firstValueFrom(post).then(
      () => this.set_user(),
      (error: HttpErrorResponse) => { this.set_user(); throw error; }
    );
  }

}
