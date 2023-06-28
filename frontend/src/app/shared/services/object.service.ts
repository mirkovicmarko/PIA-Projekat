import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WEBSITE_URL } from '@shared/consts';

import Object from '@shared/models/object';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ObjectService {

  private endpoint_address: string = WEBSITE_URL + "/objects";

  constructor(private http: HttpClient) { }

  async make(object: Object) {
    const post_body = {
      object: object
    };

    const post = this.http.post(
      this.endpoint_address + '/make',
      post_body,
      { withCredentials: true }
    );

    await firstValueFrom(post);
  }

  async change(object: Object) {
    const post_body = {
      object: object
    };

    const post = this.http.post(
      this.endpoint_address + '/change',
      post_body,
      { withCredentials: true }
    );

    await firstValueFrom(post);
  }

  async erase(id: number) {
    const post_body = {
      id: id
    };

    const post = this.http.post(
      this.endpoint_address + '/erase',
      post_body,
      { withCredentials: true }
    );

    await firstValueFrom(post);
  }

  get_all() {
    const get = this.http.get(
      this.endpoint_address + '/get_all',
      { withCredentials: true }
    );

    return firstValueFrom(get);
  }

  get(id: number) {
    const params = {
      'id': id
    };

    const get = this.http.get(
      this.endpoint_address + '/get',
      { withCredentials: true, params: params }
    );

    return firstValueFrom(get);
  }
}
