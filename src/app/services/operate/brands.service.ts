import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpHelper} from "../../../helper/http.helper";

@Injectable()
export class BrandsService {

  constructor(public http: HttpHelper) { }

  public brands(search_params = {}): Observable<any> {
    return this.http.AUTH_HTTP_GET('api/brands.json', search_params)
  }



}
