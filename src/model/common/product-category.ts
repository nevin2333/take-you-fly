import {ProductAttribute} from "./product-attribute";

export class ProductCategory {
  id: number
  name: string
  name_en: string
  pid: number
  path: string
  level: number
  link: string
  seq: number
  icon: string
  image: string
  status: string
  user_id: number
  created_at: string
  updated_at: string
  product_attributes: ProductAttribute[]

  constructor() {
    this.status = 'active'
  }

}
