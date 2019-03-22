import { Component, OnInit } from '@angular/core';
import {GlobalService} from "../../services/global.service";
import {ProductCategoryService} from "../../services/operate/product-category.service";
import {ProductCategory} from "../../../model/common/product-category";
import {DataHelper} from "../../../helper/data.helper";
import {ProductAttributeService} from "../../services/operate/product-attribute.service";
import {NzMessageService} from "ng-zorro-antd";
import {ProductAttribute} from "../../../model/common/product-attribute";
import {ProductAttributeValueService} from "../../services/operate/product-attribute-value.service";

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
})
export class ProductCategoryComponent implements OnInit {

  product_category_levels = []
  product_category = new ProductCategory()

  // 记录每一层的Pid
  pids = []
  pid_names = []

  edit_index
  edit_level = 1
  option = 'Create'
  visible = false
  childrenVisible = false

  pid

  // 商品属性
  product_attribute_name

  // 商品属性值
  product_attribute_value_name

  edit_attribute_index
  product_attribute = new ProductAttribute()

  constructor(private product_category_service: ProductCategoryService,
              private global_service: GlobalService,
              public data_helper: DataHelper,
              private product_attribute_service: ProductAttributeService,
              public nz_message_service: NzMessageService,
              private product_attribute_value_service: ProductAttributeValueService
  ) { }

  ngOnInit() {
    this.loadProductCategory(1)
  }

  loadProductCategory(level: number) {
    let search_params = {
      'search[user_id]': this.global_service.$current_user.id,
      'search[pid]': this.pid,
      'search[level]': level,
      'search[order]': 'product_categories.seq asc',
      'page': 1,
      'per': 10000
    }
    this.product_category_service.product_categories(search_params).subscribe(data => {
      if (data) {
        this.product_category_levels[level - 1] = data.models || []
        this.product_category_levels.splice(level, 100)
      }
    })
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

  edit(level: number, i: number): void {
    this.edit_level = level + 1
    this.edit_index = i
    this.option = 'Update'
    this.product_category = this.data_helper.deepCopy(this.product_category_levels[level][i])
    this.visible = true;
  }

  updateData(): void {
    let update_params = {
      update: {
        ...this.product_category
      }
    }
    this.product_category_service.update(this.product_category.id, update_params).subscribe(data => {
      if (data) {
        this.product_category_levels[this.edit_level - 1][this.edit_index] = data
      }
      this.visible = false;
    })
  }

  openCreate(level: number): void {
    this.product_category = new ProductCategory();
    this.edit_level = level + 1
    this.option = 'Create'
    this.visible = true;
  }

  createData(): void {
    let create_params = {
      create: {
        level: this.edit_level,
        pid: this.pids[this.edit_level - 1],
        ...this.product_category,
        user_id: this.global_service.$current_user.id
      }
    }
    this.product_category_service.create(create_params).subscribe(data => {
      if (data) {
        this.product_category_levels[this.edit_level - 1].push(data)
      }
      this.visible = false;
    })
  }

  loadChildren(level: number, i: number): void {
    this.pids[level + 1] = this.product_category_levels[level][i].id
    this.pid_names[level + 1] = this.product_category_levels[level][i].name
    this.pid = this.product_category_levels[level][i].id
    this.edit_level = level + 1;
    this.loadProductCategory(this.edit_level + 1)
  }

  openChildren(j: number): void {
    this.edit_attribute_index = j;
    this.product_attribute = this.data_helper.deepCopy(this.product_category.product_attributes[j])
    this.childrenVisible = true;
  }

  closeChildren(): void {
    this.childrenVisible = false;
  }

  addProductAttribute(): void {
    if (!this.product_category.id) {
      this.nz_message_service.create('error', 'please submit and create product category first')
      return
    }
    if (!this.product_attribute_name) {
      return
    }
    let create_params = {
      create: {
        name: this.product_attribute_name,
        product_category_id: this.product_category.id,
        is_sku: false,
        required: false,
      }
    }
    this.product_attribute_service.create(create_params).subscribe(data => {
      if (data) {
        this.product_category.product_attributes.push(data)
        this.product_category_levels[this.edit_level - 1][this.edit_index].product_attributes.push(data)
      }
    })
  }

  updateProductAttribute(): void {
    let update_params = {
      update: {
        ...this.product_attribute
      }
    }
    this.product_attribute_service.update(this.product_attribute.id, update_params).subscribe(data => {
      this.product_category_levels[this.edit_level - 1][this.edit_index].product_attributes[this.edit_attribute_index] = data
      this.product_category.product_attributes[this.edit_attribute_index] = data
      this.closeChildren()
    })
  }

  removeProductAttribute(): void {
    this.product_attribute_service.delete(this.product_attribute.id).subscribe(data => {
      this.product_category.product_attributes.splice(this.edit_attribute_index, 1)
      this.product_category_levels[this.edit_level - 1][this.edit_index].product_attributes.splice(this.edit_attribute_index, 1)
      this.closeChildren()
    })
  }

  addProductAttributeValue(): void {
    if (!this.product_attribute_value_name) {
      return
    }
    let create_params = {
      create: {
        name: this.product_attribute_value_name,
        product_attribute_id: this.product_attribute.id,
        status: 'active'
      }
    }
    this.product_attribute_value_service.create(create_params).subscribe(data => {
      this.product_attribute.product_attribute_values.push(data)
      this.product_category.product_attributes[this.edit_attribute_index].product_attribute_values.push(data)
      this.product_category_levels[this.edit_level - 1][this.edit_index].product_attributes[this.edit_attribute_index].product_attribute_values.push(data)
    })
  }

  removeAttributeValue(k: number, id: string): void {
    this.product_attribute_value_service.delete(id).subscribe(data => {
      this.product_attribute.product_attribute_values.splice(k, 1)
      this.product_category.product_attributes[this.edit_attribute_index].product_attribute_values.splice(k, 1)
      this.product_category_levels[this.edit_level - 1][this.edit_index].product_attributes[this.edit_attribute_index].product_attribute_values.splice(k, 1)
    })
  }

}
