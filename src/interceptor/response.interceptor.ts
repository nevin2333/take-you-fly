import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { filter } from 'rxjs/operators';
import {NzMessageService} from "ng-zorro-antd";

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  skip_urls = ['/atyun/users/sign_in', '/atyun/users/reset_pwd_email'];

  constructor(private message_service: NzMessageService, private router: Router) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(filter((event: any) => (event instanceof HttpResponse)),
      map((event: any) => {
        if (this.skip_urls.find(url => event.url.indexOf(url) != -1)) {
          return event;
        } else {
          return event.clone({body: this.handleResponse(event)});
        }
      })
    );
  }

  handleResponse(event: HttpResponse<any>) {
    const body: any = event.body;
    let clone_body: any = body;
    if (body.status && body.status.code === '40100') {
      localStorage.clear();
      this.message_service.create('warning', 'for account safety, please login again');
      this.router.navigate(['/login']);
      clone_body = {};
    }
    if (body.status && body.status.code === '40200') {
      this.message_service.create('warning', body.status.message);
    }
    if (body.status && body.status.code !== '20000') {
      clone_body = body;
    } else {
      clone_body = body.data || body || {code: body.status.code};
    }
    return clone_body;
  }

}
