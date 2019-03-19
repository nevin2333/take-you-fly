import {Inject, Injectable, PLATFORM_ID} from "@angular/core";
import {Response, Headers, Http, RequestOptions, URLSearchParams} from '@angular/http'
import {HttpClient, HttpHeaders, HttpParams, HttpUrlEncodingCodec} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {isPlatformBrowser} from "@angular/common";

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
              public http_client: HttpClient,
              @Inject(PLATFORM_ID) private platformId: Object) {

  }

  // 存储token
  private _access_token: string;

  get access_token(): string {
    return isPlatformBrowser(this.platformId) ? (this._access_token || localStorage.getItem('access_token')) : '';
  }

  set access_token(value: string) {
    this._access_token = value;
    isPlatformBrowser(this.platformId) ? localStorage.setItem('access_token', value) : '';
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

  public AUTH_HTTP_DELETE(url: any, params = {}, headers = new HttpHeaders({'Content-Type': 'application/json'})): Observable<any> {
    return this.http_client.delete<any>(url, {
      params: new HttpParams({
        encoder: new MyHttpUrlEncodingCodec(),
        fromObject: params
      })
    });
  }

  public AUTH_HTTP_POST(url: string, body: Object, headers = new HttpHeaders({'Content-Type': 'application/json'})): Observable<any> {
    const options = {headers};
    return this.http_client.post<any>(url, body, options);
  }

}
