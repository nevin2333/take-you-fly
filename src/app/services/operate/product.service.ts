import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpHelper} from "../../../helper/http.helper";

@Injectable()
export class ProductService {

  constructor(public http: HttpHelper) { }

  public products(search_params = {}): Observable<any> {
    return this.http.AUTH_HTTP_GET('api/products.json', search_params)
  }


}
