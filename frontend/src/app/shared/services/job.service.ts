import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WEBSITE_URL } from '@shared/consts';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private endpoint_address: string = WEBSITE_URL + "/jobs";
  
  constructor(private http: HttpClient) { }

  get_all() {
    const get = this.http.get(this.endpoint_address + '/get_all', { withCredentials: true });

    return firstValueFrom(get);
  }

  get(id: string) {
    const params = {
      id: id
    };

    const get = this.http.get(this.endpoint_address + '/get', { withCredentials: true, params: params });

    return firstValueFrom(get);
  }

  async request(object_id: string, agency_id: string, start_date: Date, end_date: Date) {
    const body = {
      object_id: object_id,
      agency_id: agency_id,
      start_date: start_date,
      end_date: end_date
    };

    const post = this.http.post(
      this.endpoint_address + '/request',
      body,
      { withCredentials: true }
    );

    await firstValueFrom(post);
  }

  async offer(id: string, amount: number) {
    const body = {
      id: id,
      amount: amount
    };

    const post = this.http.post(
      this.endpoint_address + '/offer',
      body,
      { withCredentials: true }
    );

    await firstValueFrom(post);
  }

  async decline_request(id: string) {
    const body = {
      id: id
    };

    const post = this.http.post(
      this.endpoint_address + '/decline_request',
      body,
      { withCredentials: true }
    );

    await firstValueFrom(post);
  }

  async accept_offer(id: string) {
    const body = {
      id: id
    };

    const post = this.http.post(
      this.endpoint_address + '/accept_offer',
      body,
      { withCredentials: true }
    );

    await firstValueFrom(post);
  }

  async decline_offer(id: string) {
    const body = {
      id: id
    };

    const post = this.http.post(
      this.endpoint_address + '/decline_offer',
      body,
      { withCredentials: true }
    );

    await firstValueFrom(post);
  }

  async allocate_workers(job_id: string, workers_allocation: string) {
    const body = {
      job_id: job_id,
      workers_allocation: workers_allocation
    };

    const post = this.http.post(
      this.endpoint_address + '/allocate_workers',
      body,
      { withCredentials: true }
    );

    await firstValueFrom(post);
  }

  async update_object_status(object_id: string, rooms_ids: string[]) {
    const body = {
      object_id: object_id,
      rooms_ids: rooms_ids
    };

    const post = this.http.post(
      this.endpoint_address + '/update_object_status',
      body,
      { withCredentials: true }
    );

    await firstValueFrom(post);
  }

  async pay(id: string) {
    const body = {
      id: id
    };

    const post = this.http.post(
      this.endpoint_address + '/pay',
      body,
      { withCredentials: true }
    );

    await firstValueFrom(post);
  }

  async cancellation_request(id: string, message: string) {
    const body = {
      id: id,
      message: message
    };

    const post = this.http.post(
      this.endpoint_address + '/cancellation_request',
      body,
      { withCredentials: true }
    );

    await firstValueFrom(post);
  }
}
