import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/operate/user.service";
import {NzMessageService} from "ng-zorro-antd";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  constructor(private user_service: UserService,
              private message: NzMessageService,
              private router: Router) { }

  username

  password

  ngOnInit() {

  }

  login(): void {
    if (!this.username) {
      this.message.create('error', '请输入用户名')
      return
    }
    if (!this.password) {
      this.message.create('error', '请输入密码')
      return
    }
    let params = {
      username: this.username,
      password: this.password
    }

    this.user_service.login(params).subscribe(data => {

      if (data && data.status && data.status.code === '50000') {
        this.message.create('error', data.status.message[0])
      } else {
        localStorage.setItem('user_session_key', data.user.user_session_key);
        localStorage.setItem('user', JSON.stringify(data.user));
        this.router.navigate(['/dashboard']);
      }

    })
  }

}
