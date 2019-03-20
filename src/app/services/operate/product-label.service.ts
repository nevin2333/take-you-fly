import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpHelper} from "../../../helper/http.helper";

@Injectable()
export class ProductLabelService {

  constructor(public http: HttpHelper) { }

  public product_labels(search_params = {}): Observable<any> {
    return this.http.AUTH_HTTP_GET('api/product_labels.json', search_params)
  }


}
