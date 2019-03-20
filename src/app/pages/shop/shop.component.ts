import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/operate/user.service";
import {NzMessageService} from "ng-zorro-antd";
import {Route, Router} from "@angular/router";
import {GlobalService} from "../../services/global.service";
import {ShopService} from "../../services/operate/shop.service";
import {Shop} from "../../../model/common/shop";
import {DataHelper} from "../../../helper/data.helper";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
})
export class ShopComponent implements OnInit {

  shops = []
  total_count
  visible = false;
  shop = new Shop();
  option = 'Create'
  update_index;
  system_languages = []

  constructor(private user_service: UserService,
              private message: NzMessageService,
              private router: Router,
              private global_service: GlobalService,
              private shop_service: ShopService,
              public data_helper: DataHelper) { }

  ngOnInit() {
    this.loadShop();
    this.loadLanguage();
  }

  loadLanguage(): void {
    let search_params = {
      'page': 1,
      'per': 1000
    }
    this.global_service.system_languages(search_params).subscribe(data => {
      this.system_languages = data.models
    })
  }

  loadShop(): void {
    let search_params = {
      'search[user_id]': this.global_service.$current_user.id
    }

    this.shop_service.shops(search_params).subscribe(data => {
      if (data) {
        this.shops = data.models || []
        this.total_count = data.total_count
      }
    })
  }

  open(): void {
    this.option = 'Create'
    this.visible = true;
  }

  close(): void {
    this.shop = new Shop();
    this.visible = false;
  }

  submit(): void {
    if (this.shop.id) {
      this.updateData()
    } else {
      this.createData()
    }
  }

  updateData(): void {
    let update_params = {
      update: {
        ...this.shop
      }
    }
    this.shop_service.update(this.shop.id, update_params).subscribe(data => {
      if (data) {
        this.shops[this.update_index] = data
      }
      this.visible = false;
    })
  }

  createData(): void {
    let create_params = {
      create: {
        ...this.shop,
        user_id: this.global_service.$current_user.id
      }
    }
    this.shop_service.create(create_params).subscribe(data => {
      if (data) {
        this.shops.push(data)
      }
      this.visible = false;
    })
  }

  update(i: number): void {
    this.update_index = i
    this.option = 'Update'
    this.shop = this.data_helper.deepCopy(this.shops[i])
    this.shop.system_language_id = this.shop.system_language_id.toString();
    this.visible = true;
  }

  remove(i: number): void {
    this.shop_service.delete(this.shops[i].id).subscribe(data => {
      this.shops.splice(i, 1)
    })
  }

}
