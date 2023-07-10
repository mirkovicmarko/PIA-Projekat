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
  user_id: string = null;
  user_change: EventEmitter<string> = new EventEmitter();

  private endpoint_address: string = WEBSITE_URL + "/users";

  constructor(private http: HttpClient) { }

  set_user(id:string = null, type: string = USER_TYPES.none) {
    this.user_type = type;
    this.user_id = id;
    this.user_change.emit(this.user_type);
  }

  async check_login() {
    const post = this.http.post(
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

  async login(username: string, password: string, admin: boolean) {
    const post = this.http.post(
      this.endpoint_address + '/login' + (admin ? '_admin' : ''),
      { username: username, password: password },
      { withCredentials: true }
    );

    await firstValueFrom(post).then(
      (response) => this.set_user(response['user_id'], response['user_type']),
      (error: HttpErrorResponse) => { this.set_user(); throw error; }
    );
  }

  async register(user: User) {
    const body = {
      user: user
    };

    const post = this.http.post(
      this.endpoint_address + '/register',
      body,
      { withCredentials: true }
    );

    await firstValueFrom(post);
  }

  async change_info(user: User, id: string) {
    const body = {
      user: user
    };

    if(id !== undefined) {
      body['id'] = id;
    }

    const post = this.http.post(
      this.endpoint_address + '/change_info',
      body,
      { withCredentials: true }
    );

    await firstValueFrom(post);
  }

  get_info(id: string) {
    const body = {};

    if(id !== undefined) {
      body['id'] = id;
    }

    const post = this.http.post(
      this.endpoint_address + '/get_info',
      body,
      { withCredentials: true }
    );

    return firstValueFrom(post);
  }

  async forgotten_password(email: string) {
    const post = this.http.post(
      this.endpoint_address + '/forgotten_password',
      { email: email }
    );

    await firstValueFrom(post);
  }

  async change_password(old_password: string, new_password: string) {
    const post = this.http.post(
      this.endpoint_address + '/change_password',
      { old_password: old_password, new_password: new_password },
      { withCredentials: true }
    );

    await firstValueFrom(post);
  }

  async change_forgotten_password(verification_code: string, new_password: string) {
    const post = this.http.post(
      this.endpoint_address + '/change_forgotten_password',
      { verification_code: verification_code, new_password: new_password },
      { withCredentials: true }
    );

    await firstValueFrom(post);
  }

  async logout() {
    const post = this.http.post(
      this.endpoint_address + '/logout',
      { },
      { withCredentials: true }
    );

    await firstValueFrom(post).then(
      () => this.set_user(),
      (error: HttpErrorResponse) => { this.set_user(); throw error; }
    );
  }

  get_all() {
    const get = this.http.get(
      this.endpoint_address + '/get_all',
      { withCredentials: true }
    );

    return firstValueFrom(get);
  }

  async ban(id: string) {
    const post = this.http.post(
      this.endpoint_address + '/ban',
      { id: id },
      { withCredentials: true }
    );

    await firstValueFrom(post).then(
      () => this.set_user(),
      (error: HttpErrorResponse) => { this.set_user(); throw error; }
    );
  }

  async allow(id: string) {
    const post = this.http.post(
      this.endpoint_address + '/allow',
      { id: id },
      { withCredentials: true }
    );

    await firstValueFrom(post).then(
      () => this.set_user(),
      (error: HttpErrorResponse) => { this.set_user(); throw error; }
    );
  }

}
