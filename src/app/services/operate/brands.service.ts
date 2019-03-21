import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpHelper} from "../../../helper/http.helper";

@Injectable()
export class BrandsService {

  constructor(public http: HttpHelper) { }

  public brands(search_params = {}): Observable<any> {
    return this.http.AUTH_HTTP_GET('api/brands.json', search_params)
  }

  public update(id: any, update_params: any): Observable<any> {
    return this.http.AUTH_HTTP_UPLOAD_PUT('api/brands/' + id + '.json', update_params);
  }

  public delete(id: string): Observable<any> {
    const params = {shop_id: id};
    return this.http.AUTH_HTTP_DELETE('api/brands/' + id + '.json', params);
  }

  public create(create_params: any = {}): Observable<any> {
    return this.http.AUTH_HTTP_UPLOAD_POST('api/brands.json', create_params);
  }

}
