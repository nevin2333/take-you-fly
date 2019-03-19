import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpHelper} from "../../../helper/http.helper";

@Injectable()
export class ShopService {

  constructor(public http: HttpHelper) { }

  public shops(search_params = {}): Observable<any> {
    return this.http.AUTH_HTTP_GET('api/shops.json', search_params)
  }



}
