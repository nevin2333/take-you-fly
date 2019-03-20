import { Component, OnInit } from '@angular/core';
import {GlobalService} from "../../services/global.service";
import {ProductService} from "../../services/operate/product.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {

  products = []
  total_count

  constructor(private product_service: ProductService,
              private global_service: GlobalService
  ) { }

  ngOnInit() {
    this.loadProduct()
  }

  loadProduct() {
    let search_params = {
      'search[user_id]': this.global_service.$current_user.id
    }
    this.product_service.products(search_params).subscribe(data => {
      if (data) {
        this.products = data.models || []
        this.total_count = data.total_count
      }
    })
  }

}
