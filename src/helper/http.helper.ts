import {Injectable} from "@angular/core";
import {Response, Headers, Http, RequestOptions, URLSearchParams} from '@angular/http'
import {HttpClient, HttpHeaders, HttpParams, HttpUrlEncodingCodec} from "@angular/common/http";
import {Observable} from "rxjs/index";

var _ = require('lodash')
// custom serialize encoder
export class MyHttpUrlEncodingCodec extends HttpUrlEncodingCodec {

  encodeKey(k) {
    return encodeURIComponent(k);
  }

  encodeValue(v) {
    return encodeURIComponent(this.serializeValue(v));
  }

  serializeValue(v) {
    if (_.isObject(v)) {
      return _.isDate(v) ? v.toISOString() : JSON.stringify(v);
    }
    if (v === null || _.isUndefined(v)) {
      return "";
    }
    return v;
  }

}


@Injectable()
export class HttpHelper {
  constructor(public http: Http,
              public http_client: HttpClient){

  }

  /**
   * 获取response里的data 并且转换成JSON 并且进行status 处理
   * @param res
   * @returns {any}
   */
  public extractData(res: Response) {
    let body = res.json();
    if (body.status && body.status.code === "40100") {
      localStorage.clear()
      return {}
    }
    if (body.status && body.status.code !== "20000") {
      return {}
    } else {
      return body.data || body || {code: body.status.code};
    }

  }

  public AUTH_HTTP_GET(url: any, params = {}, headers = new HttpHeaders({'Content-Type': 'application/json'})): Observable<any> {
    let options = {headers: headers}
    return this.http_client.get<any>(url, {
      params: new HttpParams({
        encoder: new MyHttpUrlEncodingCodec(),
        fromObject: params,
      })
    })
  }

  public AUTH_HTTP_PUT(url: string, body: Object, headers = new Headers({'Content-Type': 'application/json'})){
    let options = new RequestOptions({headers: headers});
    return this.http.put(url, JSON.stringify(body), options)
  }

}
