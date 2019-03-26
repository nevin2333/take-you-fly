import {Component, OnInit, ViewChild} from '@angular/core';
import {GlobalService} from "../../services/global.service";
import {ProductService} from "../../services/operate/product.service";
import {Product} from "../../../model/common/product";
import {ActivatedRoute, Params} from "@angular/router";
import {ProductCategoryService} from "../../services/operate/product-category.service";
import {ProductLabelService} from "../../services/operate/product-label.service";
import {BrandsService} from "../../services/operate/brands.service";
import {ShopService} from "../../services/operate/shop.service";
import {NzMessageService, UploadFile} from "ng-zorro-antd";
import {AtUploadComponent} from "../../upload";
import {ProductCategory} from "../../../model/common/product-category";
import {ProductAttribute} from "../../../model/common/product-attribute";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
})
export class ProductEditComponent implements OnInit {

  product = new Product()
  resource

  product_category_levels = []

  level_results = []

  current = 0;

  index = 'First-content';

  parent_id

  product_labels = []

  brands = []

  shops = []

  previewVisible = false;
  previewImage: string | undefined = '';
  showUploadList = {
    showPreviewIcon: true,
    showRemoveIcon: true,
    hidePreviewIconInNonImage: true
  };

  product_category = new ProductCategory()
  product_attribute_id

  product_attribute
  product_attribute_value_ids = []

  sku_attributes = []
  normal_attributes = []
  product_sku_properties = []

  // 商品sku属性值
  product_variant_properties

  constructor(private product_service: ProductService,
              private global_service: GlobalService,
              private active_route: ActivatedRoute,
              private product_category_service: ProductCategoryService,
              private product_label_service: ProductLabelService,
              private brand_service: BrandsService,
              private shop_service: ShopService,
              private nz_message_service: NzMessageService
  ) { }

  ngOnInit(): void {
    this.loadProductCategory(1)
    this.loadShop()
    this.loadBrand()
    this.loadProductLabel()
    this.loadProduct()
    this.loadProductVariantProperties()
  }

  loadProductCategory(level): void {
    let search_params = {
      'search[user_id]': this.global_service.$current_user.id,
      'search[level]': level,
      'search[pid]': this.parent_id,
    }

    this.product_category_service.product_categories(search_params).subscribe(data => {
      if (data) {
        this.product_category_levels[level - 1] = data.models
        this.product_category_levels.splice(level, 10)
        this.level_results.splice(level - 1 , 10)
      }
    })
  }

  selectNextLevel(i: number): void {
    this.parent_id = this.level_results[i]
    this.loadProductCategory(i + 2)
  }

  loadProduct(): void {
    this.active_route.queryParams.subscribe((params: Params) => {
      if (params.id) {
        let search_params = {
          'search[id]': params.id,
        }
        this.product_service.products(search_params).subscribe(data => {
          if (data) {
            this.product = data.models[0] || new Product()
            this.resource = {
              resource_type: 'Product',
              resource_id: this.product.id
            }
          }
          if (this.product.path) {
            this.loadChildProductCategory(this.product.path)
          }
        })
      }
    })
  }

  loadChildProductCategory(path: string): void {
    let ids = []
    path.split(',').forEach(id => {
      if (id) {
        ids.push(id)
        this.level_results.push(id)
      }
    })

    this.level_results.push(this.product.product_category_id.toString())

    ids.forEach((id, index) => {
      let search_params = {
        'search[pid]': id,
      }
      this.product_category_service.product_categories(search_params).subscribe(data => {
        if (data) {
          this.product_category_levels[index + 1] = data.models
        }
      })
    })
  }

  loadProductLabel(): void {
    let search_params = {
      'search[user_id]': this.global_service.$current_user.id,
      'page': 1,
      'per': 1000
    }
    this.product_label_service.product_labels(search_params).subscribe(data => {
      if (data) {
        this.product_labels = data.models
      }
    })
  }

  loadBrand(): void {
    let search_params = {
      'search[user_id]': this.global_service.$current_user.id,
      'page': 1,
      'per': 1000
    }
    this.brand_service.brands(search_params).subscribe(data => {
      if (data) {
        this.brands = data.models
      }
    })
  }

  loadShop(): void {
    let search_params = {
      'search[user_id]': this.global_service.$current_user.id,
      'page': 1,
      'per': 1000
    }
    this.shop_service.shops(search_params).subscribe(data => {
      if (data) {
        this.shops = data.models
        if (this.shops.length === 1) {
          this.product.shop_id = this.shops[0].id.toString()
        }
      }
    })
  }

  CreateOrUpdateProduct(): void {
    if (this.product.id) {
      this.updateProduct()
    } else {
      this.createProduct()
    }
  }

  updateProduct(): void {
    let update_params = {
      update: {
        ...this.product,
        product_category_id: this.level_results[this.level_results.length - 1]
      }
    }
    this.product_service.update(this.product.id, update_params).subscribe(data => {
      this.product.product_category_id = this.level_results[this.level_results.length - 1]
    })
  }

  createProduct(): void {
    let create_params = {
      create: {
        ...this.product,
        product_category_id: this.level_results[this.level_results.length - 1]
      }
    }
    this.product_service.create(create_params).subscribe(data => {
      if (data) {
        this.product = data
        this.resource = {
          resource_type: 'Product',
          resource_id: this.product.id
        }
      }
    })
  }

  pre(): void {
    this.current -= 1;
    this.CreateOrUpdateProduct()
    this.changeContent();
  }

  next(): void {
    this.current += 1;
    this.CreateOrUpdateProduct()
    this.changeContent();
  }

  done(): void {
    console.log('done');
  }

  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.index = 'category';
        break;
      }
      case 1: {
        this.index = 'properties';
        break;
      }
      case 2: {
        this.index = 'sku';
        this.loadProductCategorySKU()
        break;
      }
      default: {
        this.index = 'error';
      }
    }
  }

  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  };

  handleRemove = (file: UploadFile) => {
    if (file.id) {
      this.global_service.deleteImage(file.id).subscribe(data => {
        this.nz_message_service.create('success', 'delete successful')
      })
    }
    return true
  }

  loadProductCategorySKU(): void {
    let search_params = {
      'search[id]': this.product.product_category_id
    }
    this.product_category_service.product_categories(search_params).subscribe(data => {
      if (data && data.models) {
        this.product_category = data.models[0]

        this.sku_attributes = this.product_category.product_attributes.filter(item => {
          return item.is_sku
        })

        this.normal_attributes = this.product_category.product_attributes.filter(item => {
          return !item.is_sku
        })

        this.sku_attributes.forEach((item, index) => {
          const temp = this.product_variant_properties.filter(property => {
            return property.product_attribute_id === item.id
          })
          this.product_sku_properties[index] = temp
        })
      }
    })
  }

  loadProductVariantProperties(): void {
    let search_params = {
      'search[product_id]': this.product.id
    }
    this.product_service.get_variant_properties(search_params).subscribe(data => {
      if (data) {
        this.product_variant_properties = data.models || []
        console.log(this.product_variant_properties)
      }
    })
  }

  addSKU(index: number): void {
    const product_attribute_value = this.sku_attributes[index].product_attribute_values.find(item => {
      return item.id.toString() === this.product_attribute_value_ids[index]
    })

    const temp = []

    this.product_sku_properties[index].forEach(item => {
      temp.push(item.value)
    })

    if (temp.indexOf(product_attribute_value.name) !== -1) {
      this.nz_message_service.create('error', 'you have already add this property')
      return
    }

    let create_params = {
      create: {
        name: this.sku_attributes[index].name,
        name_en: this.sku_attributes[index].name_en,
        value: product_attribute_value.name,
        seq: index,
        product_attribute_id: this.sku_attributes[index].id,
        product_attribute_value_id: product_attribute_value.id,
        product_id: this.product.id
      }
    }
    this.product_service.add_variant_property(create_params).subscribe(data => {
      this.product_sku_properties[index].push(data)
    })
  }

}
