import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpHelper} from "../../../helper/http.helper";

@Injectable()
export class ProductAttributeValueService {

  constructor(public http: HttpHelper) { }

  public product_attribute_values(search_params = {}): Observable<any> {
    return this.http.AUTH_HTTP_GET('api/product_attribute_values.json', search_params)
  }

  public update(id: any, update_params: any): Observable<any> {
    return this.http.AUTH_HTTP_UPLOAD_PUT('api/product_attribute_values/' + id + '.json', update_params);
  }

  public delete(id: string): Observable<any> {
    const params = {shop_id: id};
    return this.http.AUTH_HTTP_DELETE('api/product_attribute_values/' + id + '.json', params);
  }

  public create(create_params: any = {}): Observable<any> {
    return this.http.AUTH_HTTP_UPLOAD_POST('api/product_attribute_values.json', create_params);
  }

}
