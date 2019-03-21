import { Component, OnInit } from '@angular/core';
import {BrandsService} from "../../services/operate/brands.service";
import {GlobalService} from "../../services/global.service";
import {Brand} from "../../../model/common/brand";
import {DataHelper} from "../../../helper/data.helper";

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
})
export class BrandComponent implements OnInit {

  brands = []
  total_count

  visible = false;
  brand = new Brand();
  option = 'Create'
  update_index;

  constructor(private brand_service: BrandsService,
              private global_service: GlobalService,
              public data_helper: DataHelper
              ) { }

  ngOnInit() {
    this.loadBrands()
  }

  loadBrands() {
    let search_params = {
      'search[user_id]': this.global_service.$current_user.id
    }
    this.brand_service.brands(search_params).subscribe(data => {
      if (data) {
        this.brands = data.models || []
        this.total_count = data.total_count
      }
    })
  }

  open(): void {
    this.option = 'Create'
    this.visible = true;
  }

  close(): void {
    this.brand = new Brand();
    this.visible = false;
  }

  submit(): void {
    if (this.brand.id) {
      this.updateData()
    } else {
      this.createData()
    }
  }

  updateData(): void {
    let update_params = {
      update: {
        ...this.brand
      }
    }
    this.brand_service.update(this.brand.id, update_params).subscribe(data => {
      if (data) {
        this.brands[this.update_index] = data
      }
      this.visible = false;
    })
  }

  createData(): void {
    let create_params = {
      create: {
        ...this.brand,
        user_id: this.global_service.$current_user.id
      }
    }
    this.brand_service.create(create_params).subscribe(data => {
      if (data) {
        this.brands.push(data)
      }
      this.visible = false;
    })
  }

  update(i: number): void {
    this.update_index = i
    this.option = 'Update'
    this.brand = this.data_helper.deepCopy(this.brands[i])
    this.visible = true;
  }

  remove(i: number): void {
    this.brand_service.delete(this.brands[i].id).subscribe(data => {
      this.brands.splice(i, 1)
    })
  }

}
