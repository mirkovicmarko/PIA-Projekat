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

  async accept(id: string, amount: number) {
    const post_body = {
      id: id,
      amount: amount
    };

    const post = this.http.post(
      this.endpoint_address + '/accept',
      post_body,
      { withCredentials: true }
    );

    await firstValueFrom(post);
  }

  async decline(id: string) {
    const post_body = {
      id: id
    };

    const post = this.http.post(
      this.endpoint_address + '/decline',
      post_body,
      { withCredentials: true }
    );

    await firstValueFrom(post);
  }
}
