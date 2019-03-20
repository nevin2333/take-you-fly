import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpHelper} from "../../../helper/http.helper";

@Injectable()
export class ProductCategoryService {

  constructor(public http: HttpHelper) { }

  public product_categories(search_params = {}): Observable<any> {
    return this.http.AUTH_HTTP_GET('api/product_categories.json', search_params)
  }


}
