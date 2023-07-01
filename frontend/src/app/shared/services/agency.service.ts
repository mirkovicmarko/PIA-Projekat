import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { WEBSITE_URL } from '@shared/consts';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {

  private endpoint_address: string = WEBSITE_URL + "/agencies";
  
  constructor(private http: HttpClient) { }

  get_all() {
    const get = this.http.get(this.endpoint_address + '/get_all');

    return firstValueFrom(get);
  }

  get(id: string) {
    const params = {
      'id': id
    };
    const get = this.http.get(this.endpoint_address + '/get', { params: params, withCredentials: true });

    return firstValueFrom(get);
  }

  async request_job(object_id: string, agency_id: string, start_date: Date, end_date: Date) {
    const post_body = {
      object_id: object_id,
      agency_id: agency_id,
      start_date: start_date,
      end_date: end_date
    };

    const post = this.http.post(
      this.endpoint_address + '/request_job',
      post_body,
      { withCredentials: true }
    );

    await firstValueFrom(post);
  }
  
}
