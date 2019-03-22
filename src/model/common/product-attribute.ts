import {ProductAttributeValue} from "./product-attribute-value";

export class ProductAttribute {
  id: string
  name: string
  name_en: string
  product_category_id: number
  required: boolean
  visible: boolean
  is_sku: boolean
  units: string
  status: string
  created_at: string
  updated_at: string
  product_attribute_values: ProductAttributeValue[]

  constructor() {
    this.status = 'active'
  }

}
