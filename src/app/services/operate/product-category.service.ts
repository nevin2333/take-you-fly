import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpHelper} from "../../../helper/http.helper";

@Injectable()
export class ProductCategoryService {

  constructor(public http: HttpHelper) { }

  public product_categories(search_params = {}): Observable<any> {
    return this.http.AUTH_HTTP_GET('api/product_categories.json', search_params)
  }

  public update(id: any, update_params: any): Observable<any> {
    return this.http.AUTH_HTTP_UPLOAD_PUT('api/product_categories/' + id + '.json', update_params);
  }

  public delete(id: string): Observable<any> {
    const params = {shop_id: id};
    return this.http.AUTH_HTTP_DELETE('api/product_categories/' + id + '.json', params);
  }

  public create(create_params: any = {}): Observable<any> {
    return this.http.AUTH_HTTP_UPLOAD_POST('api/product_categories.json', create_params);
  }

}
