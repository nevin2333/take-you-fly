import { Component, OnInit } from '@angular/core';
import {BrandsService} from "../../services/operate/brands.service";
import {GlobalService} from "../../services/global.service";

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
})
export class BrandComponent implements OnInit {

  brands = []
  total_count

  constructor(private brand_service: BrandsService,
              private global_service: GlobalService
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

}
