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
  
}
