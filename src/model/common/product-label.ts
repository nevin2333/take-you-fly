export class ProductLabel {
  id: number
  name: string
  name_en: string
  status: string
  user_id: number
  created_at: string
  updated_at: string

  constructor() {
    this.status = 'active'
  }

}
