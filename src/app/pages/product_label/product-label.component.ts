import { Component, OnInit } from '@angular/core';
import {ProductLabelService} from "../../services/operate/product-label.service";
import {GlobalService} from "../../services/global.service";

@Component({
  selector: 'app-product-label',
  templateUrl: './product-label.component.html',
})
export class ProductLabelComponent implements OnInit {

  constructor(private product_label_service: ProductLabelService,
              private global_service: GlobalService
              ) { }

  product_labels = []
  total_count

  ngOnInit() {
    this.loadProductLabel();
  }

  loadProductLabel(): void {
    let search_params = {
      'search[user_id]': this.global_service.$current_user.id
    }

    this.product_label_service.product_labels(search_params).subscribe(data => {
      if (data) {
        this.product_labels = data.models || []
        this.total_count = data.total_count
      }
    })
  }

}
