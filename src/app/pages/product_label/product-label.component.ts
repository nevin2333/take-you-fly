import { Component, OnInit } from '@angular/core';
import {ProductLabelService} from "../../services/operate/product-label.service";
import {GlobalService} from "../../services/global.service";
import {ProductLabel} from "../../../model/common/product-label";
import {DataHelper} from "../../../helper/data.helper";

@Component({
  selector: 'app-product-label',
  templateUrl: './product-label.component.html',
})
export class ProductLabelComponent implements OnInit {

  constructor(private product_label_service: ProductLabelService,
              private global_service: GlobalService,
              public data_helper: DataHelper
              ) { }

  product_labels = []
  total_count

  visible = false;
  product_label = new ProductLabel();
  option = 'Create'
  update_index;

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

  open(): void {
    this.option = 'Create'
    this.visible = true;
  }

  close(): void {
    this.product_label = new ProductLabel();
    this.visible = false;
  }

  submit(): void {
    if (this.product_label.id) {
      this.updateData()
    } else {
      this.createData()
    }
  }

  updateData(): void {
    let update_params = {
      update: {
        ...this.product_label
      }
    }
    this.product_label_service.update(this.product_label.id, update_params).subscribe(data => {
      if (data) {
        this.product_labels[this.update_index] = data
      }
      this.visible = false;
    })
  }

  createData(): void {
    let create_params = {
      create: {
        ...this.product_label,
        user_id: this.global_service.$current_user.id
      }
    }
    this.product_label_service.create(create_params).subscribe(data => {
      if (data) {
        this.product_labels.push(data)
      }
      this.visible = false;
    })
  }

  update(i: number): void {
    this.update_index = i
    this.option = 'Update'
    this.product_label = this.data_helper.deepCopy(this.product_labels[i])
    this.visible = true;
  }

  remove(i: number): void {
    this.product_label_service.delete(this.product_labels[i].id).subscribe(data => {
      this.product_labels.splice(i, 1)
    })
  }

}
