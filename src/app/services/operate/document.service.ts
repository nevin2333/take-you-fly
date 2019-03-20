import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpHelper} from "../../../helper/http.helper";

@Injectable()
export class DocumentService {

  constructor(public http: HttpHelper) { }

  public documents(search_params = {}): Observable<any> {
    return this.http.AUTH_HTTP_GET('api/documents.json', search_params)
  }


}
