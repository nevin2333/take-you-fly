import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { from as observableFrom, throwError as observableThrowError } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { api_config } from '../constant/api.config';

const _ = require('lodash');

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  apiConfig: any;

  skip_url = ['https://atyun-api-sit.oss-cn-shanghai.aliyuncs.com',
              'https://atyun-api-prod.oss-cn-shanghai.aliyuncs.com'];

  constructor(public http: HttpClient,
              public router: Router,
              @Inject(PLATFORM_ID) private platformId: Object) {

    this.apiConfig = api_config;

  }

  // 存储token
  private _access_token: string;

  get access_token(): any {
    return isPlatformBrowser(this.platformId) ? (this._access_token || localStorage.getItem('access_token')) : '';
  }

  set access_token(value: any) {
    this._access_token = value;
    isPlatformBrowser(this.platformId) ? localStorage.setItem('access_token', value) : '';
  }

  getToken(): any {
    const token_url = '/api/oauth/token.json';
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const options = {headers};
    const uid = this.apiConfig.apiUid;
    const secret = this.apiConfig.apiSecret;
    const body = JSON.stringify({client_secret: secret, client_id: uid, grant_type: 'client_credentials'});
    return this.http.post(token_url, body, options);
  }

  public handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return observableThrowError(errMsg);
  }

  isRequestAliOss(url) {
    let result = false;
    this.skip_url.forEach(skip => {
      if (url.startsWith(skip)) {
        result = true;
      }
    });
    return result;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.info('Enter Token interceptor');
    if (req.url.indexOf('/api/oauth/token.json') !== -1 || this.isRequestAliOss(req.url)) {
      return next.handle(req);
    } else {
      // check if token exist
      const token = JSON.parse(isPlatformBrowser(this.platformId) ? localStorage.getItem('access_token') : this.access_token) || null;
      // need get token first
      if (token == null || token.var3 + token.var2 < new Date().getTime() / 1000 || this.access_token == '{}' || token == {}) {
        const observer: Observable<any> = observableFrom(this.getToken().toPromise()).pipe(switchMap((data: any) => {
          this.access_token = JSON.stringify({
            session_key: data.access_token,
            var2: data.expires_in,
            var3: data.created_at
          }) as any;
          return this.handleTokenReq(next, req);
        }));
        return observer;
      } else {
        return this.handleTokenReq(next, req);
      }

    }

  }

  handleTokenReq(next, req: HttpRequest<any>) {
    const token = {
      access_token: JSON.parse(this.access_token).session_key,
      user_session_key: localStorage.getItem('user_session_key')
    };
    const update_params: any = {};

    // check if it is get
    if (req.method == 'GET') {
      update_params.setParams = {...token};
    }
    // check if it is form data
    if (req.body instanceof FormData) {
      const body = req.body;
      body.append('access_token', token.access_token);
      body.append('user_session_key', token.user_session_key);
      update_params.body = body;
    } else {
      update_params.body = {...req.body, ...token};
    }

    // its ok send it
    const secureReq = req.clone({
      ...update_params
    });
    return next.handle(secureReq);
  }

}
