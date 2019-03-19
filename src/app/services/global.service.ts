import { Injectable } from '@angular/core';

@Injectable()
export class GlobalService {

  constructor() { }

  public get $current_user(): any {
    let user = localStorage.getItem('user');
    user = JSON.parse(user);
    return user;
  }

}
