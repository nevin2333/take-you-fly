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

  listOfData = [
    {
      key    : '1',
      name   : 'John Brown',
      age    : 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      key    : '2',
      name   : 'Jim Green',
      age    : 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key    : '3',
      name   : 'Joe Black',
      age    : 32,
      address: 'Sidney No. 1 Lake Park'
    }
  ];

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
      console.log(data)
      if (data && data.data) {
        this.brands = data.data.models || []
        this.total_count = data.data.total_count
      }
    })
  }

}
