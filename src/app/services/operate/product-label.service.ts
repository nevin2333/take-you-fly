import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpHelper} from "../../../helper/http.helper";

@Injectable()
export class ProductLabelService {

  constructor(public http: HttpHelper) { }

  public product_labels(search_params = {}): Observable<any> {
    return this.http.AUTH_HTTP_GET('api/product_labels.json', search_params)
  }

  public update(id: any, update_params: any): Observable<any> {
    return this.http.AUTH_HTTP_UPLOAD_PUT('api/product_labels/' + id + '.json', update_params);
  }

  public delete(id: string): Observable<any> {
    const params = {shop_id: id};
    return this.http.AUTH_HTTP_DELETE('api/product_labels/' + id + '.json', params);
  }

  public create(create_params: any = {}): Observable<any> {
    return this.http.AUTH_HTTP_UPLOAD_POST('api/product_labels.json', create_params);
  }

}
