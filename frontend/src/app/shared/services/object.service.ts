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
      post_body
    );

    await firstValueFrom(post);
  }
}
