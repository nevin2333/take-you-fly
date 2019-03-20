import { Component, OnInit } from '@angular/core';
import {GlobalService} from "../../services/global.service";
import {ProductCategoryService} from "../../services/operate/product-category.service";

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
})
export class ProductCategoryComponent implements OnInit {

  product_categories = []
  total_count

  constructor(private product_category_service: ProductCategoryService,
              private global_service: GlobalService
  ) { }

  ngOnInit() {
    this.loadProductCategory()
  }

  loadProductCategory() {
    let search_params = {
      'search[user_id]': this.global_service.$current_user.id
    }
    this.product_category_service.product_categories(search_params).subscribe(data => {
      if (data) {
        this.product_categories = data.models || []
        this.total_count = data.total_count
      }
    })
  }

}
