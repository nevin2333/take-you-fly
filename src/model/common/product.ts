export class Product {
  id: number
  name: string
  name_en: string
  description: string
  link: string
  status: string
  art_no: string
  product_category_id: number
  product_measurement_id: number
  brand_id: string
  shop_id: string
  pid: number

  product_label_ids
  pictures
  picture_ids
  path: string

  created_at: string
  updated_at: string

  constructor() {
    this.product_label_ids = []
    this.pictures = []
  }

}
