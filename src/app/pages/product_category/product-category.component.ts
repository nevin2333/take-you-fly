import { Component, OnInit } from '@angular/core';
import {GlobalService} from "../../services/global.service";
import {ProductCategoryService} from "../../services/operate/product-category.service";
import {ProductCategory} from "../../../model/common/product-category";
import {DataHelper} from "../../../helper/data.helper";

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
})
export class ProductCategoryComponent implements OnInit {

  product_category_levels = []
  product_category = new ProductCategory()

  // 记录每一层的Pid
  pids = []

  edit_index
  edit_level
  option = 'Create'
  visible = false

  level = 1;
  pid

  constructor(private product_category_service: ProductCategoryService,
              private global_service: GlobalService,
              public data_helper: DataHelper
  ) { }

  ngOnInit() {
    this.loadProductCategory()
  }

  loadProductCategory() {
    let search_params = {
      'search[user_id]': this.global_service.$current_user.id,
      'search[level]': this.level,
      'search[pid]': this.pid,
      'page': 1,
      'per': 10000
    }
    this.product_category_service.product_categories(search_params).subscribe(data => {
      if (data) {
        this.product_category_levels[this.level - 1] = data.models || []
      }
    })
  }

  edit(level: number, i: number): void {
    this.edit_level = level
    this.edit_index = i
    this.option = 'Update'
    this.product_category = this.data_helper.deepCopy(this.product_category_levels[level][i])
    this.visible = true;
  }

  remove(level: number, i: number): void {
    this.product_category_service.delete(this.product_category_levels[level][i].id).subscribe(data => {
      this.product_category_levels[level].splice(i, 1)
    })
  }

  close(): void {
    this.product_category = new ProductCategory();
    this.visible = false;
  }

  submit(): void {
    if (this.product_category.id) {
      this.updateData()
    } else {
      this.createData()
    }
  }

  updateData(): void {
    let update_params = {
      update: {
        ...this.product_category
      }
    }
    this.product_category_service.update(this.product_category.id, update_params).subscribe(data => {
      if (data) {
        this.product_category_levels[this.edit_level][this.edit_index] = data
      }
      this.visible = false;
    })
  }

  createData(): void {
    let create_params = {
      create: {
        level: this.level,
        pid: this.pids[this.level - 1],
        ...this.product_category,
        user_id: this.global_service.$current_user.id
      }
    }
    this.product_category_service.create(create_params).subscribe(data => {
      if (data) {
        this.product_category_levels[this.edit_level].push(data)
      }
      this.visible = false;
    })
  }

  loadChildren(level: number, i: number): void {
    this.pids[level + 1] = this.product_category_levels[level][i].id
    this.pid = this.product_category_levels[level][i].id
    this.level = level + 1 + 1;
    this.loadProductCategory()
  }

  open(level: number): void {
    this.edit_level = level
    this.option = 'Create'
    this.visible = true;
  }

}
