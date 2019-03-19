import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/operate/user.service";
import {NzMessageService} from "ng-zorro-antd";
import {Route, Router} from "@angular/router";
import {GlobalService} from "../../services/global.service";
import {ShopService} from "../../services/operate/shop.service";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
})
export class ShopComponent implements OnInit {

  constructor(private user_service: UserService,
              private message: NzMessageService,
              private router: Router,
              private global_service: GlobalService,
              private shop_service: ShopService) { }

  ngOnInit() {
    this.loadShop();
  }

  loadShop(): void {
    this.shop_service.shops().subscribe(data => {

    })
  }

}
