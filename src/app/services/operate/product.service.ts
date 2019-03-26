import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpHelper} from "../../../helper/http.helper";

@Injectable()
export class ProductService {

  constructor(public http: HttpHelper) { }

  public products(search_params = {}): Observable<any> {
    return this.http.AUTH_HTTP_GET('api/products.json', search_params)
  }

  public update(id: any, update_params: any): Observable<any> {
    return this.http.AUTH_HTTP_UPLOAD_PUT('api/products/' + id + '.json', update_params);
  }

  public delete(id: string): Observable<any> {
    const params = {shop_id: id};
    return this.http.AUTH_HTTP_DELETE('api/products/' + id + '.json', params);
  }

  public create(create_params: any = {}): Observable<any> {
    return this.http.AUTH_HTTP_UPLOAD_POST('api/products.json', create_params);
  }

  public add_variant_property(create_params: any = {}): Observable<any> {
    return this.http.AUTH_HTTP_UPLOAD_POST('api/products/add_variant_property.json', create_params);
  }

  public get_variant_properties(search_params = {}): Observable<any> {
    return this.http.AUTH_HTTP_GET('api/products/search_variant_property.json', search_params)
  }

}
