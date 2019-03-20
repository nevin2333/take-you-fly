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

  public AUTH_HTTP_UPLOAD_PUT(url: string, body: Object, prefix = 'update', headers = new HttpHeaders()) {
    const token = JSON.parse(isPlatformBrowser(this.platformId) ? localStorage.getItem('access_token') : this.access_token) || null;
    // headers.append('Content-Type', 'multipart/form-data');
    headers.set('Accept', 'application/json');
    headers.set('encrypt', 'multipart/form-data');
    const options = {headers};
    const formData: FormData = this.objectToFormData(body, new FormData());
    return this.http_client.put<any>(url, formData, options);
  }

  public AUTH_HTTP_UPLOAD_POST(url: string, body: Object, prefix = 'update', headers = new HttpHeaders()) {
    const token = JSON.parse(isPlatformBrowser(this.platformId) ? localStorage.getItem('access_token') : this.access_token) || null;
    // headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    const options = {headers};
    const formData: FormData = this.objectToFormData(body, new FormData());
    return this.http_client.post<any>(url, formData, options);
  }

  // 将对象或数组转换成formdata的格式
  objectToFormData(obj: any, form: FormData, namespace = '') {
    const fd = form || new FormData();
    let formKey;
    if (obj instanceof Array) {
      for (const item of obj) {
        if (typeof item === 'object' && !(item instanceof File)) {
          this.objectToFormData(item, fd, `${namespace}[]`);
        } else {
          fd.append(`${namespace}[]`, item);
        }
      }
    } else {
      for (const property in obj) {
        if (obj.hasOwnProperty(property)) {

          if (namespace) {
            formKey = namespace + '[' + property + ']';
          } else {
            formKey = property;
          }

          // if the property is an object, but not a File,
          // use recursivity.
          if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {

            this.objectToFormData(obj[property], fd, formKey);
          } else {

            // if it's a string or a File object
            fd.append(formKey, obj[property]);
          }

        }
      }
    }
    return fd;

  }

}
