import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import {NzMessageService} from "ng-zorro-antd";

@Injectable()
export class CmsAccountInterceptor implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const user = localStorage.getItem('user');

    if (!user) {
      this.nz_message_service.create('error', '请先登录')
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }

  constructor(public router: Router,
              public nz_message_service: NzMessageService
  ) {
  }
}
