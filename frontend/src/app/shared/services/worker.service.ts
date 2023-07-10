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

  async insert(worker: Worker, agency_id: string = undefined) {
    const body = {
      worker: worker
    };

    if(agency_id !== undefined) {
      body['agency_id'] = agency_id;
    }

    const post = this.http.post(
      this.endpoint_address + '/insert',
      body,
      { withCredentials: true }
    );

    await firstValueFrom(post);
  }

  async edit(worker: Worker, agency_id: string = undefined) {
    const body = {
      worker: worker
    };

    if(agency_id !== undefined) {
      body['agency_id'] = agency_id;
    }

    const post = this.http.post(
      this.endpoint_address + '/edit',
      body,
      { withCredentials: true }
    );

    await firstValueFrom(post);
  }

  get_all(allocated: boolean = undefined, agency_id: string = undefined) {
    const params = {};

    if(allocated !== undefined) {
      params['allocated'] = allocated;
    }

    if(agency_id !== undefined) {
      params['agency_id'] = agency_id;
    }

    const get = this.http.get(this.endpoint_address + '/get_all', { withCredentials: true, params: params });

    return firstValueFrom(get);
  }

  get(id: string, agency_id: string = undefined) {
    const params = {
      'id': id
    };

    if(agency_id !== undefined) {
      params['agency_id'] = agency_id;
    }

    const get = this.http.get(this.endpoint_address + '/get', { params: params, withCredentials: true });

    return firstValueFrom(get);
  }

  async erase(id: string, agency_id: string = undefined) {
    const body = {
      id: id
    };

    if(agency_id !== undefined) {
      body['agency_id'] = agency_id;
    }
    
    const post = this.http.post(
      this.endpoint_address + '/erase',
      body,
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
