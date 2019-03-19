import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpHelper} from "../../../helper/http.helper";

@Injectable()
export class UserService {

  constructor(public http: HttpHelper) { }

  public login(search_params = {}): Observable<any> {
    return this.http.AUTH_HTTP_GET('api/users/sign_in.json', search_params)
  }

}
