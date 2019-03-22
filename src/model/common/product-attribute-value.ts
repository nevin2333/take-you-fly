
export class ProductAttributeValue {
  id: string
  name: string
  name_en: string
  seq: number
  product_attribute_id: number
  status: string
  created_at: string
  updated_at: string

  constructor() {
    this.status = 'active'
  }

}
