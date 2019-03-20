import { Injectable } from '@angular/core';
import {HttpHelper} from "../../helper/http.helper";
import {Observable} from "rxjs";

@Injectable()
export class GlobalService {

  constructor(public http: HttpHelper) { }

  public get $current_user(): any {
    let user = localStorage.getItem('user');
    user = JSON.parse(user);
    return user;
  }

  public system_languages(search_params = {}): Observable<any> {
    return this.http.AUTH_HTTP_GET('api/system_languages.json', search_params)
  }

}
