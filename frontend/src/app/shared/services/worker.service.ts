import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { WEBSITE_URL } from '@shared/consts';
import { Worker } from '@shared/models/user';


@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  private endpoint_address: string = WEBSITE_URL + "/workers";

  constructor(private http: HttpClient) { }

  async insert(worker: Worker) {
    const post_body = {
      worker: worker
    };

    const post = this.http.post(
      this.endpoint_address + '/insert',
      post_body,
      { withCredentials: true }
    );

    await firstValueFrom(post);
  }

  async edit(worker: Worker) {
    const post_body = {
      worker: worker
    };

    const post = this.http.post(
      this.endpoint_address + '/edit',
      post_body,
      { withCredentials: true }
    );

    await firstValueFrom(post);
  }

  get_all(allocated: boolean = undefined) {
    const params = {};

    if(allocated !== undefined) {
      params['allocated'] = allocated;
    }

    const get = this.http.get(this.endpoint_address + '/get_all', { withCredentials: true, params: params });

    return firstValueFrom(get);
  }

  get(id: string) {
    const params = {
      'id': id
    };
    const get = this.http.get(this.endpoint_address + '/get', { params: params, withCredentials: true });

    return firstValueFrom(get);
  }

  async erase(id: string) {
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

  async more_workers(number: number) {
    const post_body = {
      number: number
    };

    const post = this.http.post(
      this.endpoint_address + '/more_workers',
      post_body,
      { withCredentials: true }
    );

    await firstValueFrom(post);
  }

}
